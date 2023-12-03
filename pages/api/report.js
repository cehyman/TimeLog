import db from '../../lib/db';
import PDFDocument from 'pdfkit';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export default async (req, res) => {
  if (req.method === 'GET') {
    const { startDate, endDate } = req.query;
    const reportPath = join(process.cwd(), 'lib', 'reports');
    const reportFilename = `report_${startDate}_to_${endDate}.pdf`;
    const reportFullPath = join(reportPath, reportFilename);

    try {
      // Ensure the reports directory exists
      await mkdir(reportPath, { recursive: true });

      const [report] = await db.query(
        'SELECT * FROM time_logs WHERE DATE(clock_in) BETWEEN ? AND ? ORDER BY clock_in ASC',
        [startDate, endDate]
      );

      // Create a PDF document
      const doc = new PDFDocument();
      let buffers = [];
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', async () => {
        let pdfData = Buffer.concat(buffers);
        await writeFile(reportFullPath, pdfData);
        res.status(200).json({ message: 'Report generated successfully', filename: reportFilename });
      });

      // Add content to PDF
      doc.fontSize(12).text(`Time Log Report from ${startDate} to ${endDate}`, { underline: true }).moveDown();
      report.forEach(log => {
        doc.text(`User ID: ${log.user_id} - Clock In: ${log.clock_in} - Clock Out: ${log.clock_out}`).moveDown();
      });

      // Finalize PDF file
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
