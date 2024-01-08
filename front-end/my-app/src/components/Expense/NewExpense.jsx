import React, { useState } from "react";
import api from "../../services/api";

/*
Form with fields for date, description, category, amount, etc.
"Add Expense" button.
*/

function NewExpense() {
  // State to manage form input values
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [expense_date, setExpenseDate] = useState("");
  const [payment_method_id, setPaymentMethodId] = useState(""); // Add payment method field
  const [category_id, setCategoryId] = useState(""); // Add category field

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input
    if (
      !description ||
      !amount ||
      !expense_date ||
      !payment_method_id ||
      !category_id
    ) {
      alert("Please fill in all fields");
      return;
    }

    // Create a new expense object
    const newExpense = {
      description,
      amount: parseFloat(amount),
      expense_date: new Date(expense_date).toISOString(),
      payment_method_id,
      category_id,
    };

    try {
      // Use the API service to create the expense using Axios
      //const createdExpense = await api.createExpense(newExpense);

      await api.createExpense(newExpense);

      // Pass the new expense to the parent component
      //onAddExpense(createdExpense);

      // Clear form fields
      setDescription("");
      setAmount("");
      setExpenseDate("");
      setPaymentMethodId("");
      setCategoryId("");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h4>New expense</h4>

        <form className="form-group" onSubmit={handleSubmit}>
          <label htmlFor="expenseDescription">Expense description:</label>
          <input
            type="text"
            id="expenseDescription"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={expense_date}
            onChange={(e) => setExpenseDate(e.target.value)}
          />

          <label htmlFor="paymentMethod">Payment Method:</label>
          <input
            type="text"
            id="paymentMethod"
            value={payment_method_id}
            onChange={(e) => setPaymentMethodId(e.target.value)}
          />

          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            value={category_id}
            onChange={(e) => setCategoryId(e.target.value)}
          />

          <div>
            <button type="submit">Add Expense</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewExpense;
