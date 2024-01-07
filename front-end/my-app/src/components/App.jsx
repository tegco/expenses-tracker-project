import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Heading from "./Other/Heading";
import Footer from "./Other/Footer";
import Login from "./Authentication/Login";
import ExpenseList from "./Expense/ExpenseList";
import NewExpense from "./Expense/NewExpense";
import ShowExpense from "./Expense/ShowExpense";
import DashBoard from "./Other/Dashboard";
import MonthlyTotals from "./Other/MonthlyTotals";

function App() {
  return (
    <Router>
      <div>
        <Heading />
        <Login />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/expenses" element={<ExpenseList />} />
          {/* Add other routes for different views */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
