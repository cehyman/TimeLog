#!/bin/bash

# TimeLog Setup Script

echo "Welcome to the TimeLog setup process!"

# Check if MariaDB/MySQL is installed
if ! command -v mysql &> /dev/null; then
    echo "MariaDB/MySQL is not installed on your system."
    read -p "Do you want to install MariaDB/MySQL? (y/n): " install_db
    if [ "$install_db" == "y" ]; then
        echo "Please install MariaDB/MySQL, create a superuser, and then manually and re-run this script."
        exit 1
    else
        echo "You chose not to install MariaDB/MySQL. Exiting setup."
        exit 1
    fi
fi

# Step 2: Install dependencies
echo "Step 2: Installing dependencies..."
npm install

# Step 3: Set up the database
echo "Step 3: Setting up the database..."

# Prompt for database credentials
read -p "Enter your MariaDB/MySQL username: " db_username
read -sp "Enter your MariaDB/MySQL password: " db_password
echo ""

# Step 4: Set up JWT_SECRET
echo "Step 4: Setting up JWT_SECRET..."
read -p "Enter your JWT_SECRET or press Enter to generate one: " jwt_secret

# Generate a random JWT_SECRET if not provided
if [ -z "$jwt_secret" ]; then
  jwt_secret=$(openssl rand -base64 32)
  echo "Generated JWT_SECRET: $jwt_secret"
fi

# Create or update .env.local file with database credentials and JWT_SECRET
echo "Setting up environment variables in .env.local..."
echo "JWT_SECRET=$jwt_secret" > .env.local
echo "MARIADB_HOST=127.0.0.1" >> .env.local
echo "MARIADB_USER=${db_username}" >> .env.local
echo "MARIADB_DATABASE=TimeLog" >> .env.local
echo "MARIADB_PASSWORD=${db_password}" >> .env.local

# Step 5: Import the database dump
echo "Step 5: Importing the database dump..."
mysql -u "${db_username}" -p"${db_password}" TimeLog < TimeLog_dump.sql

# Step 6: Run the application
echo "Step 6: Running the application..."
npm run dev

echo "TimeLog setup is complete! You can now access the application at http://localhost:3000."
