import React, { useState, useEffect } from 'react';
import styles from '../styles/reports.module.css';

const Reports = () => {
  const [timeLogs, setTimeLogs] = useState([]);
  const [groupedLogs, setGroupedLogs] = useState({});

  useEffect(() => {
    fetchTimeLogs();
  }, []);

  useEffect(() => {
    // Group logs by date
    const logsByDate = timeLogs.reduce((acc, log) => {
      const date = new Date(log.clock_in).toDateString();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(log);
      return acc;
    }, {});

    setGroupedLogs(logsByDate);
  }, [timeLogs]);

  const fetchTimeLogs = async () => {
    try {
      const response = await fetch('/api/clock');
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      const data = await response.json();
      setTimeLogs(data[0]); // Adjust based on your data structure
    } catch (error) {
      console.error('Error fetching time logs:', error);
      window.alert('Error occurred while fetching time logs.');
    }
  };

  return (
    <div className={styles.reportsContainer}>
      <h1>Reports</h1>
      {Object.keys(groupedLogs).map(date => (
        <section key={date} className={styles.dailyLogs}>
          <button className={styles.dropdownButton} onClick={(e) => e.currentTarget.nextSibling.classList.toggle(styles.show)}>
            {date}
          </button>
          <ul className={styles.dropdownContent}>
            {groupedLogs[date].map(log => (
              <li key={log.id}>
                {new Date(log.clock_in).toLocaleTimeString()} -
                {log.clock_out ? new Date(log.clock_out).toLocaleTimeString() : 'In Progress'}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
};

export default Reports;
