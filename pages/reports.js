import React, { useState, useEffect } from "react";
import styles from "../styles/reports.module.css";
import { Worker, Viewer } from "@react-pdf-viewer/core";

// Import styles
import "@react-pdf-viewer/core/lib/styles/index.css";

const Reports = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    return () => {
      if (reportData) {
        window.URL.revokeObjectURL(reportData);
      }
    };
  }, [reportData]);

  const fetchReportData = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `/api/report?startDate=${startDate}&endDate=${endDate}`
      );
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        setReportData(url);
      } else {
        console.error("Failed to fetch report data");
        setError("Failed to fetch report data");
      }
    } catch (error) {
      console.error("Error fetching report data:", error);
      setError("Error fetching report data");
    } finally {
      setLoading(false);
    }
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
          <button
            onClick={fetchReportData}
            disabled={!startDate || !endDate || loading}
          >
            Generate Report
          </button>
        </div>
        {loading && <p>Loading report...</p>}
        {error && <p className={styles.error}>{error}</p>}
        {reportData && (
          <div>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.10.377/build/pdf.worker.min.js">
              <Viewer fileUrl={reportData} />
            </Worker>
          </div>
        )}
      </div>
      {/* Add more sections as needed */}
    </div>
  );
};

export default Reports;
