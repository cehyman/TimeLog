import React, { useState, useEffect } from 'react';
import styles from '../styles/timeclock.module.css';

const TimeClock = () => {
  const [clockedIn, setClockedIn] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [hoursWorked, setHoursWorked] = useState(0);
  const [timeLogs, setTimeLogs] = useState([]);

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

  useEffect(() => {
    fetchTimeLogs();
  }, []);

  const fetchTimeLogs = async () => {
    try {
      const response = await fetch('/api/clock');
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      const data = await response.json();
      console.log("Fetched time logs:", data); // Debugging log
      setTimeLogs(data);
    } catch (error) {
      console.error('Error fetching time logs:', error);
      window.alert('Error occurred while fetching time logs.');
    }
  };

  const handleClockIn = async () => {
    setClockedIn(true);
    const userId = 1;
    const clockInTimeForBackend = new Date().toISOString().replace('T', ' ').replace(/\..+/, '');
    const clockInTimeForFrontend = new Date().toLocaleString();
    setStartTime(clockInTimeForFrontend);

    await fetch('/api/clock', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ clockInTime: clockInTimeForBackend, type: 'clock-in', userId }),
    });

    window.alert("You have clocked in.");
    fetchTimeLogs(); // Refresh time logs
  };

  const handleClockOut = async () => {
    if (startTime) {
      const clockOutTimeForBackend = new Date().toISOString().replace('T', ' ').replace(/\..+/, '');
      const userId = 1;

      await fetch('/api/clock', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ clockInTime: clockOutTimeForBackend, type: 'clock-out', userId }),
      });

      window.alert("You have clocked out. Total hours worked: " + hoursWorked.toFixed(2));
    }
    setClockedIn(false);
    setStartTime(null);
    fetchTimeLogs(); // Refresh time logs
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
            value={hoursWorked.toFixed(2)}
            disabled={true}
          />
        </div>
      </section>

      <section className={styles.recentActivity}>
        <h2>Recent Activity</h2>
        <ul>
          {timeLogs[0] && timeLogs[0]
            .slice(0, 5) // Get only the first five elements
            .map(log => (
              <li key={log.id}>
                {new Date(log.clock_in).toLocaleString()} -
                {log.clock_out ? new Date(log.clock_out).toLocaleString() : 'In Progress'}
              </li>
            ))
          }
        </ul>
      </section>


    </div>
  );
};

export default TimeClock;
