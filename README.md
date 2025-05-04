How setup application and run it ...

## Frontend (React.js) 

Initialize a React app with vite ...
Run command 'npm create vite@latest your-app-name -- --template react'

In here tha React app is created in 'client' folder ...
So, Create a folder called 'client' and Run 'cd client' to go inside the folder 
Run 'npm create vite@latest ./ -- --template react' to configure a React app                       

Give 'React', and 'JavaScript' Options ...
Run 'npm install to install node_modules'

Install 'axios, bootstrap, lucide-react, react-router-dom, react-toastify, sweetalert2' packages ...
Run 'npm i axios bootstrap lucide-react react-router-dom react-toastify sweetalert2'

Use 'npm run dev' to run the application

## Backend (Node.js & Express.js)

Create a folder called 'server' ...
Go to 'server' folder by running 'cd server'
Run 'npm init -y' to configure a node.js project inside the server folder 

Run 'npm install' to install node_modules for the project

Create two JavaScript files named app.js and server.js and use the codes in this repository (app.js & server.js files) in those files ...

Install 'body-parser, cors, dotenv, express, mongoose, multer, nodemon, pdfkit' packages ...
Run 'npm i body-parser cors dotenv express mongoose multer nodemon pdfkit'

in 'package.json' use the 'start' tag and set command 'nodemon server.js' ...
This way -- "start": "nodemon server.js"

Use 'npm start' or 'nodemon server.js' to run the application

## Database (MongoDB)
Get a database connection string from 'MongoDB official site' or using 'MongoDB Compass'
Like 'mongodb://127.0.0.1:27017/your-app-name' or 'mongodb://localhost:27017/your-app-name'

use the mongoose package and the code in server.js file to connect with the database ...
