import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../src/styles.css";

const root = createRoot(document.getElementById("root"));
root.render(<App />);
