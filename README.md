#User Role Based Access Permission
#Author
[Galaxy Weblinks Ltd](https://www.galaxyweblinks.com/)

#Description
This project demonstrates the implementation of a Role Based Access Permission(URBAP) system using modern web development technologies like Next.js, Tailwind CSS, and MongoDB. It includes the following functionalities:

Role-Based User Management
Allows a super admin to create and manage users by assigning specific roles (e.g., Admin, Student, Teacher, Parent).
Ensures a structured approach to managing user access and capabilities.
Permission Control
Provides a mechanism for the super admin to manually define and manage permissions stored in the database.
Restricts user actions (e.g., viewing, editing, or accessing sections) based on their assigned roles and permissions.

#Installation
Follow the steps below to run the project locally:

#Prerequisites
Ensure you have Node.js and MongoDB installed on your system.
Steps
Clone the repository

git clone <repository_url>
cd <repository_name>

#Set environment variables

Create a .env.local file in the root directory and add the following environment variables:

MONGODB_URI=mongodb://localhost:27017/user-role-based-permission
JWT_SECRET=@@123445566@
NEXT_PUBLIC_API_URL=http://localhost:3000/api

#Install dependencies
Run the following command to install the required dependencies:
npm install

##Run the development server
Start the development server with:
npm run dev

The application should now be running at http://localhost:3000.

##Features
Role management for various user types.
Fine-grained permission control.
Dynamic access restrictions based on roles and permissions.

