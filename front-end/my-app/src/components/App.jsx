import React from 'react';
import Heading from './Other/Heading';
import Footer from './Other/Footer';
import Login from './Authentication/Login';
import Register from './Authentication/Register';
import ExpenseList from './Expense/ExpenseList';
import NewExpense from './Expense/NewExpense';
import ShowExpense from './Expense/ShowExpense';
import DashBoard from './Other/DashBoard';
import MonthlyTotals from './Other/MonthlyTotals';


function App(){
    return (
        <div>
            <Heading/>
            <Login/>
            <Footer/>
        </div>
  

)}

export default App;