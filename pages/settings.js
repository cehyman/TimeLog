import React, { useState } from 'react';
import styles from '../styles/settings.module.css';

const Settings = () => {
  const [settings, setSettings] = useState({
    // Example settings
    darkMode: false,
    notifications: true,
    emailUpdates: false,
  });

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setSettings(prevSettings => ({
      ...prevSettings,
      [name]: checked,
    }));
  };

  return (
    <div className="settingsContainer">
      <h1>Settings</h1>
      <form>
        <div className="settingItem">
          <label>
            Dark Mode:
            <input 
              type="checkbox" 
              name="darkMode" 
              checked={settings.darkMode} 
              onChange={handleChange} 
            />
          </label>
        </div>
        <div className="settingItem">
          <label>
            Enable Notifications:
            <input 
              type="checkbox" 
              name="notifications" 
              checked={settings.notifications} 
              onChange={handleChange} 
            />
          </label>
        </div>
        <div className="settingItem">
          <label>
            Receive Email Updates:
            <input 
              type="checkbox" 
              name="emailUpdates" 
              checked={settings.emailUpdates} 
              onChange={handleChange} 
            />
          </label>
        </div>
        {/* Add more settings as needed */}
      </form>
    </div>
  );
};

export default Settings;
