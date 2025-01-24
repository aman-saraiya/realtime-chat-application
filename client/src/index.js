import "./index.css";
import "antd/dist/reset.css";
import "react-toastify/dist/ReactToastify.css";

import React from "react";

import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

// import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// reportWebVitals(console.log); // not using in our codebase

/*
reportWebVitals.js is a utility file that comes by default in a new Create React App project. 
It is used to measure the performance of your application in terms of metrics like page load time, 
how quickly it becomes interactive, etc. The data is typically reported to an analytics endpoint 
like Google Analytics, but the default setup just logs it to the console.

The core purpose of reportWebVitals.js is to give you a way to measure and track web vitals, 
which are performance metrics considered important for a good user experience. 
These include metrics like:

First Contentful Paint (FCP): How long it takes for the first piece of content to be visible to the user.
Largest Contentful Paint (LCP): How long it takes for the largest element (like an image or a block of text) to load and become visible.
Cumulative Layout Shift (CLS): Measures the visual stability of the page as content loads.
*/
