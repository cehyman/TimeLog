import React, { useState, useEffect } from 'react';
import styles from '../styles/timeclock.module.css';

const TimeClock: React.FC = () => {
    const [isClockedIn, setIsClockedIn] = useState(false);
    const [startTime, setStartTime] = useState<Date | null>(null);
    const [elapsedTime, setElapsedTime] = useState<number>(0);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isClockedIn && startTime) {
            interval = setInterval(() => {
                setElapsedTime(new Date().getTime() - startTime.getTime());
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isClockedIn, startTime]);

    const handleClockIn = () => {
        setStartTime(new Date());
        setIsClockedIn(true);
    };

    const handleClockOut = () => {
        setIsClockedIn(false);
        setElapsedTime(0);
    };

    const formatTime = (time: number) => {
        const seconds = Math.floor((time / 1000) % 60);
        const minutes = Math.floor((time / (1000 * 60)) % 60);
        const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

        const hoursStr = hours < 10 ? '0' + hours : hours;
        const minutesStr = minutes < 10 ? '0' + minutes : minutes;
        const secondsStr = seconds < 10 ? '0' + seconds : seconds;

        return `${hoursStr}:${minutesStr}:${secondsStr}`;
    };

    return (
        <div>
            <h2>Time Clock</h2>
            {isClockedIn ? (
                <div>
                    <p>Clocked In</p>
                    <p>Elapsed Time: {formatTime(elapsedTime)}</p>
                    <button className={styles.clockOutButton} onClick={handleClockOut}>Clock Out</button>
                </div>
            ) : (
                <div>
                    <p>Clocked Out</p>
                    <button className={styles.clockInButton} onClick={handleClockIn}>Clock In</button>
                </div>
            )}
        </div>
    );
};

export default TimeClock;
