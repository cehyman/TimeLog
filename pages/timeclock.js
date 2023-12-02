import React, { useState, useEffect } from 'react';
import styles from '../styles/timeclock.module.css';

const TimeClock = () => {
  const [clockedIn, setClockedIn] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [hoursWorked, setHoursWorked] = useState(0);

  useEffect(() => {
    let interval = null;
  
    if (clockedIn) {
      interval = setInterval(() => {
        const now = new Date();
        const duration = (now - new Date(startTime)) / 1000 / 3600; // Calculate duration in hours
        setHoursWorked(isNaN(duration) ? 0 : duration);
      }, 1000);
    } else {
      clearInterval(interval);
    }
  
    return () => clearInterval(interval);
  }, [clockedIn, startTime]);
  

  const handleClockIn = async () => {
    setClockedIn(true);

    const userId = 1;
  
    // Backend-friendly format (MySQL format)
    const clockInTimeForBackend = new Date().toISOString().replace('T', ' ').replace(/\..+/, '');
  
    // Frontend-friendly format
    const clockInTimeForFrontend = new Date().toLocaleString();
  
    setStartTime(clockInTimeForFrontend); // Use the frontend-friendly format for display
  
    // Send data to server in the backend-friendly format
    await fetch('/api/clock', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ clockInTime: clockInTimeForBackend, type: 'clock-in', userId }),
    });
  
    window.alert("You have clocked in."); // Notification for clocking in
  };
  

  const handleClockOut = async () => {
    if (startTime) {
      const clockOutTimeForBackend = new Date().toISOString().replace('T', ' ').replace(/\..+/, '');
      const userId = 1; 
  
      // Send data to server for clocking out
      await fetch('/api/clock', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ clockInTime: clockOutTimeForBackend, type: 'clock-out', userId }),
      });
  
      window.alert("You have clocked out. Total hours worked: " + hoursWorked.toFixed(2)); // Notification for clocking out
    }
    setClockedIn(false);
    setStartTime(null); // Reset start time for the next session
  };
  

  return (
    <div className={styles.main}>
      <section className={styles.timeTracker}>
        <button 
          className={styles.clockInButton} 
          onClick={handleClockIn} 
          disabled={clockedIn}
        >
          Clock In
        </button>
        <button 
          className={styles.clockOutButton} 
          onClick={handleClockOut} 
          disabled={!clockedIn}
        >
          Clock Out
        </button>
      </section>

      <section className={styles.summary}>
        <h2>Today's Summary</h2>
        <div>
          <label>Hours Worked: </label>
          <input
            type="number"
            value={hoursWorked.toFixed(2)} // Display hours worked rounded to two decimal places
            disabled={true} // Make it read-only
          />
        </div>
      </section>

      <section className={styles.recentActivity}>
        <h2>Recent Activity</h2>
        {/* List recent time logs */}
      </section>
    </div>
  );
};

export default TimeClock;