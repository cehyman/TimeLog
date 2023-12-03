import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import styles from "../styles/timeclock.module.css";

const TimeClock = () => {
  const { data: session, status } = useSession();
  const isLoadingSession = status === "loading";
  const userId = session?.user?.id;

  const [clockedIn, setClockedIn] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [hoursWorked, setHoursWorked] = useState(0);
  const [recentActivities, setRecentActivities] = useState([]);

  // Load persisted data on page load
  useEffect(() => {
    const persistedClockedIn = localStorage.getItem("clockedIn");
    const persistedUserId = localStorage.getItem("userId");

    if (persistedClockedIn && persistedUserId === userId) {
      setClockedIn(persistedClockedIn === "true");
    } else {
      // Reset the state if the user has changed
      setClockedIn(false);
      setStartTime(null);
      setHoursWorked(0);
    }
  }, [userId]);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("clockedIn", clockedIn.toString());
    localStorage.setItem("userId", userId); // Store the user ID

    if (clockedIn) {
      if (startTime) {
        localStorage.setItem("startTime", startTime.toISOString());
      } else {
        localStorage.removeItem("startTime"); // Remove the start time if not clocked in
      }
      localStorage.setItem("hoursWorked", hoursWorked.toString());
    } else {
      // Remove all data if not clocked in
      localStorage.removeItem("startTime");
      localStorage.removeItem("hoursWorked");
    }
  }, [clockedIn, startTime, hoursWorked, userId]);
  useEffect(() => {
    if (clockedIn && startTime) {
      const interval = setInterval(() => {
        const now = new Date();
        const duration = (now - startTime) / 1000; // Calculate duration in seconds
        setHoursWorked(duration);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [clockedIn, startTime]);

  useEffect(() => {
    const fetchRecentActivities = async () => {
      try {
        const response = await fetch(`/api/activity?userId=${userId}`);
        if (response.ok) {
          const responseData = await response.json();
          if (Array.isArray(responseData.data)) {
            // Access the 'data' property of the response
            setRecentActivities(responseData.data);
          } else {
            console.error(
              "Received data property is not an array:",
              responseData.data
            );
          }
        } else {
          console.error("Failed to fetch recent activities");
        }
      } catch (error) {
        console.error("Error fetching recent activities:", error);
      }
    };

    if (!isLoadingSession && userId) {
      fetchRecentActivities();
    }
  }, [userId, isLoadingSession]);

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const sec = Math.floor(seconds % 60);
    return `${hours}:${minutes.toString().padStart(2, "0")}:${sec
      .toString()
      .padStart(2, "0")}`;
  };

  const handleClockIn = async () => {
    if (!userId) {
      window.alert("You must be logged in to clock in.");
      return;
    }

    // Create a new Date object
    const clockInTime = new Date();
    setClockedIn(true);
    setStartTime(clockInTime);

    // Format the clockInTime in EST (Eastern Standard Time) as 'YYYY-MM-DD HH:MM:SS'
    const year = clockInTime.getFullYear();
    const month = String(clockInTime.getMonth() + 1).padStart(2, "0");
    const day = String(clockInTime.getDate()).padStart(2, "0");
    const hours = String(clockInTime.getHours()).padStart(2, "0");
    const minutes = String(clockInTime.getMinutes()).padStart(2, "0");
    const seconds = String(clockInTime.getSeconds()).padStart(2, "0");

    const formattedClockInTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    await fetch("/api/clock", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clockInTime: formattedClockInTime,
        type: "clock-in",
        userId,
      }),
    });
  };

  const handleClockOut = async () => {
    if (!userId) {
      window.alert("You must be logged in to clock out.");
      return;
    }

    // Create a new Date object for the current time in EST (Eastern Standard Time)
    const clockOutTime = new Date();

    // Extract components from the clockOutTime
    const year = clockOutTime.getFullYear();
    const month = String(clockOutTime.getMonth() + 1).padStart(2, "0");
    const day = String(clockOutTime.getDate()).padStart(2, "0");
    const hours = String(clockOutTime.getHours()).padStart(2, "0");
    const minutes = String(clockOutTime.getMinutes()).padStart(2, "0");
    const seconds = String(clockOutTime.getSeconds()).padStart(2, "0");

    // Format the clockOutTime in 'YYYY-MM-DD HH:MM:SS' format
    const formattedClockOutTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    await fetch("/api/clock", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clockInTime: formattedClockOutTime,
        type: "clock-out",
        userId,
      }),
    });

    window.alert(
      `You have clocked out. Total hours worked: ${formatDuration(hoursWorked)}`
    );
    setClockedIn(false);
    setStartTime(null);
    setHoursWorked(0);
  };

  if (isLoadingSession) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>You must be logged in to access this page.</div>;
  }

  return (
    <div className={styles.main}>
      <div className={styles.hoursWorkedDisplay}>
        <span>{formatDuration(hoursWorked)}</span>
      </div>
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
          <label>Time Worked: </label>
          <input
            type="text"
            value={formatDuration(hoursWorked)}
            disabled={true}
          />
        </div>
      </section>

      <section className={styles.recentActivity}>
        <h2>Recent Activity</h2>
        <ul>
          {recentActivities.map((activity, index) => (
            <li key={index}>
              Clock In: {new Date(activity.clock_in).toLocaleString()}, Clock
              Out:{" "}
              {activity.clock_out
                ? new Date(activity.clock_out).toLocaleString()
                : "Still clocked in"}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default TimeClock;
