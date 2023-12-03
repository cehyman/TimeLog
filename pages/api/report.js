// pages/api/report.js
import db from '../../lib/db'; // Adjust the path to your db.js file

export default async (req, res) => {
  if (req.method === "GET") {
    // New logic for generating report based on date range
    const { startDate, endDate } = req.query;

    try {
      const [report] = await db.query(
        "SELECT * FROM time_logs WHERE DATE(clock_in) BETWEEN ? AND ? ORDER BY clock_in ASC",
        [startDate, endDate]
      );
      res.status(200).json(report);
    } catch (error) {
      console.error("Error fetching report:", error);
      res
        .status(500)
        .json({ message: "An error occurred while generating the report" });
    }
  } else {
    // Handling other types of requests or missing parameters
    res.setHeader("Allow", ["POST", "GET"]);
    res
      .status(405)
      .json({
        message: `Method ${req.method} Not Allowed or missing parameters`,
      });
  }
};
