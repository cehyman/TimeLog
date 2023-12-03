import db from '../../lib/db';
import PDFDocument from 'pdfkit';
import { join } from 'path';
import { getSession } from 'next-auth/react';

export default async (req, res) => {
  const session = await getSession({ req });
  const currentUserId = session?.user?.id;

  if (req.method === 'GET') {
    if (!currentUserId) {
      res.status(401).json({ message: "Unauthorized: User must be logged in." });
      return;
    }

    const { startDate, endDate } = req.query;

    try {
      const [report] = await db.query(
        'SELECT * FROM time_logs WHERE user_id = ? AND DATE(clock_in) BETWEEN ? AND ? ORDER BY clock_in ASC',
        [currentUserId, startDate, endDate]
      );

      const doc = new PDFDocument();
      doc.fontSize(12);
      let buffers = [];
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', async () => {
        let pdfData = Buffer.concat(buffers);
        await writeFile(reportFullPath, pdfData);
        res.status(200).json({ message: 'Report generated successfully', filename: reportFilename });
      });


      // Add title
      doc.text(`Time Log Report for User ID: ${currentUserId} from ${startDate} to ${endDate}`, { underline: true }).moveDown(2);
      
      // Add table headers
      const startX = doc.x;
      const startY = doc.y;
      const columnWidth = 200; // Adjust column width as needed
      
      doc.text('Clock In', startX, startY, { width: columnWidth, align: 'left' })
         .text('Clock Out', startX + columnWidth, startY, { align: 'left' })
         .moveDown(2);
      
      // Add rows
      report.forEach(log => {
        let y = doc.y;
        doc.text(log.clock_in, startX, y, { width: columnWidth, align: 'left' })
           .text(log.clock_out, startX + columnWidth, y, { align: 'left' })
           .moveDown(1);
      });
      
      // Finalize PDF file
      res.setHeader('Content-Type', 'application/pdf');
      doc.pipe(res);

      doc.end();

    } catch (error) {
      console.error('Error generating report:', error);
      res.status(500).json({ message: 'An error occurred while generating the report' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
};