import React, { useState } from 'react';

const GenerateReport: React.FC = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reportData, setReportData] = useState<{ totalHours: number; detailedLogs: { date: string; hours: number; }[] } | null>(null);


    const handleGenerateReport = () => {
        // Logic to fetch or generate report data based on the selected dates
        // For demonstration, setting report data statically
        setReportData({
            totalHours: 40,
            detailedLogs: [
                // Example log data
                { date: '2023-03-01', hours: 8 },
                { date: '2023-03-02', hours: 8 },
                // more data...
            ],
        });
    };

    return (
        <div>
            <h2>Generate Report</h2>
            <div>
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
                <button onClick={handleGenerateReport}>Generate</button>
            </div>

            {reportData && (
                <div>
                    <h3>Report</h3>
                    <p>Total Hours: {reportData.totalHours}</p>
                    <ul>
                        {reportData.detailedLogs.map((log, index) => (
                            <li key={index}>
                                Date: {log.date}, Hours: {log.hours}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default GenerateReport;
