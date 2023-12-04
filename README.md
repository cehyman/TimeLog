# TimeLog

Welcome to **TimeLog**, a comprehensive time tracking application designed to help you manage and report your work hours efficiently. This application is built using modern web technologies and offers a range of features for both individual users and administrators.

## Features

### User Features
- **Time Clock**: Users can clock in and out, tracking their work hours with ease.
- **Reports**: Generate detailed reports of work hours within a specified date range.

### Admin Features
- **Manage Users**: Administrators can create, update, and delete user accounts.
- **Admin Reports**: Generate comprehensive reports for all users, useful for managerial oversight.

## Technologies Used
- **Frontend**: React, Next.js
- **Backend**: Node.js, Express.js
- **Database**: MariaDB/MySQL
- **Authentication**: Next-Auth for secure login sessions.

## Getting Started
To get started with TimeLog:

Before you begin, make sure you have the following installed on your machine:
- Node.js
- npm
- MariaDB/MySQL

Also be sure to have a user setup in your mariadb/mysql when running the application for the first time. The application will prompt you to enter your database credentials when you first run it.

1. Clone the repository.
2. Run in your terminal:
    ```bash
   cd timelog
   chmod +x setup.sh
   ./setup.sh
   ```
3. The application should now be running. To run the application again use `npm run dev`.

To login as an employee, use the following credentials:
- **Username**: user1
- **Password**: pass1

To login as an manager, use the following credentials:
- **Username**: chris1
- **Password**: pass1