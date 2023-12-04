// TabNavigation.js
import React, { useState } from "react";
import styles from "../styles/tab.module.css"; // Create a CSS file for styling

const TabNavigation = ({ activeTab, onTabChange }) => {
  return (
    <div className={styles.tabNavigation}>
      <button
        className={`${styles.tab} ${activeTab === "manageUsers" ? styles.activeTab : ""}`}
        onClick={() => onTabChange("manageUsers")}
      >
        Manage Users
      </button>
      <button
        className={`${styles.tab} ${activeTab === "reports" ? styles.activeTab : ""}`}
        onClick={() => onTabChange("reports")}
      >
        Reports
      </button>
    </div>
  );
};

export default TabNavigation;
