# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm install` 
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Project Architecture and State Management

- **Redux:** The project uses Redux for state management. All slices are organized inside the `redux` folder for better structure and maintainability.  
- **CSS Management:** Styles are separated by page to keep the CSS modular, clean, and easier to manage.  
- **API Integration:** Axios is used to fetch data from APIs. The fetched data is directly stored in the corresponding Redux slice and consumed from there.  
- **Cart Logic:** All cart-related logic is handled within the Redux slice. This centralization ensures the cart remains secure and makes it easier to update business logic in the future.

### You can view this project on vercel 

View Project [https://e-comm-yash.vercel.app/] (https://e-comm-yash.vercel.app/)