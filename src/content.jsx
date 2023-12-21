
import React from "react";
import ReactDOM from "react-dom/client";
import ContentApp from "./components/ContentApp";
import "./common.css";


const root = document.createElement("div");
root.id = "crx-root";
document.body.appendChild(root);


ReactDOM.createRoot(root).render(
    <React.StrictMode>
        <ContentApp />
    </React.StrictMode>

);
