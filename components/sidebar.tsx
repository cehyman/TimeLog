// components/sidebar.tsx

import React from 'react';
import styles from '../styles/sidebar.module.css'; // Corrected import statement

const SidebarMenu: React.FC = () => {
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

export default SidebarMenu;

