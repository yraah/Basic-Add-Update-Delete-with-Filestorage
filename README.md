# BPI Backend and Frontend

This project consists of two parts: the **BPI Backend** (Node.js/Express) and the **BPI Frontend** (React). Below are the steps to set up both parts and create the necessary table in PostgreSQL.


## Backend Setup (BPI Backend)
**RUN**
cd BpiBackend
npm install

The backend should now be running at http://localhost:5000.


**Set up your PostgreSQL database connection in the backend. You’ll need to configure your database connection in the .env file.** 

**RUN**
node index.js


## Frontend Setup (BPI Backend)
**RUN**
cd BpiFrontend
npm install
npm start


## Database Setup (pgAdmin)
To create the **user_accounts** table, follow these steps in pgAdmin:

Open **pgAdmin** and connect to your PostgreSQL database server.
Create a new database (if you haven't already):
Right-click **Databases → Create → Database.**
Enter a name for your database (e.g., bpiMsDatabase) and click **Save**.
Create the user_accounts table:

Open the Query Tool by right-clicking on your database and selecting Query Tool.
Run the Table.sql in BpiBackend Directory


## Additional Notes

Open Details in BpiBackend 
