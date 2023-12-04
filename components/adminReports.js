import React, { useState, useEffect } from "react";
import styles from "../styles/reports.module.css";
import { useSession } from "next-auth/react";

const Reports = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reportUrl, setReportUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { data: session } = useSession();
  const [currentUserId, setCurrentUserId] = useState(session?.user?.id);
  const [selectedUserId, setSelectedUserId] = useState(""); // Added state for selected userId

  useEffect(() => {
    return () => {
      if (reportUrl) {
        window.URL.revokeObjectURL(reportUrl);
      }
    };
  }, [reportUrl]);

  const formatTimeWorked = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const fetchReportData = async () => {
    setLoading(true);
    setError("");
    try {
      const userIdToUse = selectedUserId || currentUserId;
      const response = await fetch(
        `/api/admin/report?userId=${userIdToUse}&startDate=${startDate}&endDate=${endDate}`
      );
      if (response.ok) {
        const blob = new Blob([await response.blob()], {
          type: "application/pdf",
        });
        const url = window.URL.createObjectURL(blob);
        setReportUrl(url);
        setCurrentUserId(userIdToUse); // Update currentUserId with the selectedUserId or current user's ID
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
            User ID:
            <input
              type="text"
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
            />
          </label>
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
          <div className={styles.buttonContainer}>
            <button
              onClick={fetchReportData} // Trigger the fetchReportData function
              disabled={!startDate || !endDate || loading}
            >
              Generate Report
            </button>
            {loading && <p>Loading report...</p>}
            {error && <p className={styles.error}>{error}</p>}
            {reportUrl && (
              <div>
                <a
                  href={reportUrl}
                  download={`report_${currentUserId}_${startDate}_to_${endDate}.pdf`}
                >
                  <button className={styles.downloadButton}>
                    Download Report
                  </button>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Add more sections as needed */}
    </div>
  );
};

export default Reports;
