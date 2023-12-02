// components/sidebar.tsx

import React from 'react';
import styles from '../styles/sidebar.module.css'; // Corrected import statement

const SidebarMenu: React.FC = () => {
  return (
    <nav className={styles.sidebar}>
      <ul className={styles.sidebarNav}>
        <li className={styles.navItem}>
          <a href="/dashboard">Dashboard</a>
        </li>
        {/* ... other list items ... */}
      </ul>
    </nav>
  );
}

export default SidebarMenu;
