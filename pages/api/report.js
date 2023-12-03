import db from "../../lib/db";
import PDFDocument from "pdfkit";
import { getSession } from "next-auth/react";

export default async (req, res) => {
  const session = await getSession({ req });
  const currentUserId = session?.user?.id;

  if (req.method === "GET") {
    if (!currentUserId) {
      res
        .status(401)
        .json({ message: "Unauthorized: User must be logged in." });
      return;
    }

    const { startDate, endDate } = req.query;

    try {
      const [report] = await db.query(
        'SELECT DATE_FORMAT(clock_in, "%Y-%m-%d") as date, DATE_FORMAT(clock_in, "%H:%i:%s") as time_in, DATE_FORMAT(clock_out, "%H:%i:%s") as time_out, TIMESTAMPDIFF(SECOND, clock_in, clock_out) AS time_worked FROM time_logs WHERE user_id = ? AND DATE(clock_in) BETWEEN ? AND ? ORDER BY clock_in ASC',
        [currentUserId, startDate, endDate]
      );

      const doc = new PDFDocument();
      doc.fontSize(12);
      // Date range at the top of the report
      doc.text(`Date Range: ${startDate} to ${endDate}`, 175, 50);
      // User ID in the top left corner
      doc.text(`User ID: ${currentUserId}`, 50, 50);

      // Function to format time worked
      const formatTimeWorked = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
      };

      // Headers
      const startX = 100;
      const startY = 100;
      const columnWidth = 100;
      doc
        .text("Date", startX, startY)
        .text("Clock In", startX + columnWidth, startY)
        .text("Clock Out", startX + 2 * columnWidth, startY)
        .text("Time Worked", startX + 3 * columnWidth, startY)
        .moveDown(2);

      // Draw a line under the header
      const lineY = startY + 15; // Adjust the Y-coordinate as needed
      doc
        .moveTo(startX - 20, lineY)
        .lineTo(startX + 4 * columnWidth, lineY) // Adjust line length as needed
        .stroke();

      const endY = startY + 20 * (report.length + 1); // Assuming report.length is the number of rows
      for (let i = 0; i <= 4; i++) {
        // 4 columns in total
        let xPosition = startX - 10 + i * columnWidth;
        doc
          .moveTo(xPosition, startY + 10)
          .lineTo(xPosition, endY)
          .stroke();
      }

      // Rows and calculate total time worked
      let totalSecondsWorked = 0;
      report.forEach((log, index) => {
        totalSecondsWorked += log.time_worked;
        let y = startY + 20 * (index + 1);
        doc
          .text(log.date, startX, y)
          .text(log.time_in, startX + columnWidth, y)
          .text(log.time_out, startX + 2 * columnWidth, y)
          .text(formatTimeWorked(log.time_worked), startX + 3 * columnWidth, y);
      });

      // Total time worked in the top right corner
      const totalFormattedTime = formatTimeWorked(totalSecondsWorked);
      doc.text(`TTW: ${totalFormattedTime}`, 450, 50, { align: "right" });

      // Finalize PDF file
      res.setHeader("Content-Type", "application/pdf");
      doc.pipe(res);

      doc.end();
    } catch (error) {
      console.error("Error generating report:", error);
      res
        .status(500)
        .json({ message: "An error occurred while generating the report" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
};
