import React, { useState } from 'react';
import styles from '../styles/reports.module.css';

const Reports = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchReportData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/report?startDate=${startDate}&endDate=${endDate}`);
      if (response.ok) {
        const data = await response.json();
        setReportData(data);
      } else {
        console.error('Failed to fetch report data');
      }
    } catch (error) {
      console.error('Error fetching report data:', error);
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = () => {
    const fileName = `report_${startDate}_to_${endDate}.json`;
    const json = JSON.stringify(reportData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  };

  return (
    <div className={styles.reportsContainer}>
      <h1>Reports</h1>
      <div className={styles.reportSection}>
        <div className={styles.datePicker}>
          <label>
            Start Date:
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </label>
          <label>
            End Date:
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </label>
          <button onClick={fetchReportData} disabled={!startDate || !endDate || loading}>
            Generate Report
          </button>
        </div>
        {loading && <p>Loading report...</p>}
        {reportData && (
          <div>
            <div className={styles.reportResults}>
              {/* Render your report data here */}
              <pre>{JSON.stringify(reportData, null, 2)}</pre>
            </div>
            <button onClick={downloadReport} className={styles.downloadButton}>
              Download Report
            </button>
          </div>
        )}
      </div>
      {/* Add more sections as needed */}
    </div>
  );
};

export default Reports;
