import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Heading from "./Other/Heading";
import Footer from "./Other/Footer";
import LoginComponent from "./Authentication/LoginComponent";
import FormComponent from "./Authentication/FormComponent";
import ExpenseList from "./Expense/ExpenseList";
import NewExpense from "./Expense/NewExpense";
import ShowExpense from "./Expense/ShowExpense";
import Dashboard from "./Other/Dashboard";
import MonthlyTotals from "./Other/MonthlyTotals";
import RegisterComponent from "./Authentication/RegisterComponent";

function App() {
  return (
    <Router>
      <div>
        <Heading />
        <Routes>
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/expenses" element={<ExpenseList />} />
          <Route path="/register" element={<RegisterComponent />} />

          {/* Add other routes for different views */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
