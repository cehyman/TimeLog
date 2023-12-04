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

        {userRole === 'manager' && (
          <li className={styles.navItem}>
            <a href="/admin">Admin</a>
          </li>
        )}
        <li className={styles.navItem}>
          <a href="/timeclock">Time Clock</a>
        </li>
        <li className={styles.navItem}>
          <a href="/reports">Reports</a>
        </li>
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