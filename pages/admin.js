// AdminPage.js
import React, { useEffect, useState } from "react";
import styles from "../styles/admin.module.css";
import { useSession, signIn } from "next-auth/react";
import ManageUsers from "../components/adminUsers"; 
import Reports from "../components/adminReports"; 
import TabNavigation from "@/components/tab";

const AdminPage = () => {
  const { data: session, status } = useSession();
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("manageUsers"); 

  const [newUserData, setNewUserData] = useState({
    username: "",
    password: "",
    role: "",
  });
  const [updateUserData, setUpdateUserData] = useState({
    id: "",
    username: "",
    password: "",
    role: "",
  });
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    if (status === "authenticated") {
      fetchUsers();
    } else if (status === "unauthenticated") {
      signIn();
    }
  }, [status, activeTab]);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/admin/manageUsers", {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) throw new Error("Fetch failed");
      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const response = await fetch("/api/admin/manageUsers", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ id: userId }),
      });
      if (!response.ok) throw new Error("Fetch failed");
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const generateReport = async () => {

    const response = await fetch(`/api/report?startDate=${startDate}&endDate=${endDate}&userId=${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      setReportData(data);
    } else {
      console.error("Error fetching report data");
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-header">Admin Dashboard</h1>
      <p>Welcome to the Admin Dashboard. Here you can manage users and generate reports.</p>

      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "manageUsers" && <ManageUsers />}
      {activeTab === "reports" && <Reports />}
    </div>
  );
};

export default AdminPage;
