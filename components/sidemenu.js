import React from 'react';
import { signOut } from 'next-auth/react';
import styles from '../styles/sidemenu.module.css'; // Importing CSS module

const SideMenu = ({ userRole }) => {
  const handleLogout = () => {
    signOut({ callbackUrl: '/' }); // Redirects to the home page after sign out
  };

  return (
    <nav className={styles.sidebar}>
      <ul className={styles.sidebarNav}>
        {/* Conditional rendering based on user role */}
        {userRole === 'manager' && (
          <li className={styles.navItem}>
            <a href="/admin">Admin</a>
          </li>
        )}
        {/* Existing navigation items */}
        <li className={styles.navItem}>
          <a href="/timeclock">Time Clock</a>
        </li>
        <li className={styles.navItem}>
          <a href="/reports">Reports</a>
        </li>
        <li className={styles.navItem}>
          <a href="/settings">Settings</a>
        </li>
        {/* Log out button */}
        <li>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Log Out
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default SideMenu;