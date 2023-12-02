// components/sidebar.js

import React from 'react';
import styles from '../styles/sidemenu.module.css'; // Importing CSS module

const SideMenu = () => {
  return (
    <nav className={styles.sidebar}>
      <ul className={styles.sidebarNav}>
        <li className={styles.navItem}>
          <a href="/">Dashboard</a>
        </li>
        <li className={styles.navItem}>
          <a href="/timeclock">Time Clock</a>
        </li>
        <li className={styles.navItem}>
          <a href="/reports">Reports</a>
        </li>
        <li className={styles.navItem}>
          <a href="/settings">Settings</a>
        </li>
        {/* Add more navigation items as needed */}
      </ul>
    </nav>
  );
}

export default SideMenu;

