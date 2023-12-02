// timeclock.js

import React, { useState } from 'react';
import styles from '../styles/timeclock.module.css';

const TimeClock = () => {
  const [clockedIn, setClockedIn] = useState(false);

  const handleClockIn = () => {
    // Logic for clocking in
    setClockedIn(true);
    // You can also add timestamp logic here
  };

  const handleClockOut = () => {
    // Logic for clocking out
    setClockedIn(false);
    // You can also add timestamp logic here
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
        {/* Display summary of today's logged time */}
      </section>

      <section className={styles.recentActivity}>
        <h2>Recent Activity</h2>
        {/* List recent time logs */}
      </section>
    </div>
  );
};

export default TimeClock;
