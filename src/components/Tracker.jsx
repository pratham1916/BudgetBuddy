import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useToast } from '@chakra-ui/react';
import { TrackerSubmit } from '../Redux/action';
import "../Styles/tracker.css"

const Tracker = () => {
  const dispatch = useDispatch();
  const toast = useToast();

  const initialFormData = {
    type: '',
    category: '',
    amount: '',
    date: ''
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.type && formData.category && formData.amount && formData.date) {
      dispatch(TrackerSubmit(formData, toast));
    } else {
      toast({
        title: "Missing Fields",
        description: "Please fill out all the fields.",
        position: 'top',
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const renderCategoryOptions = () => {
    if (formData.type === 'Income') {
      return (
        <>
          <option value="" disabled>Select Category</option>
          <option value="Salary">Salary</option>
          <option value="Gifts">Gifts</option>
          <option value="Refunds">Refunds</option>
          <option value="Other">Other</option>
        </>
      );
    } else if (formData.type === 'Expense') {
      return (
        <>
          <option value="" disabled>Select Category</option>
          <option value="Food & Drinks">Food & Drinks</option>
          <option value="Shopping">Shopping</option>
          <option value="Housing">Housing</option>
          <option value="Bills">Bills</option>
          <option value="Vehicle & Transport">Vehicle & Transport</option>
          <option value="Lifestyle">Lifestyle</option>
        </>
      );
    }
    return null;
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Type</label>
          <select name="type" value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value, category: ''})} required>
            <option value="">Select</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        </div>
        <div className="form-group">
          <label>Category</label>
          <select name="category" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
            {renderCategoryOptions()}
          </select>
        </div>
        <div className="form-group">
          <label>Amount in Rupees</label>
          <input type="number" name="amount" value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} placeholder="Amount in Rupees" required />
        </div>
        <div className="form-group">
          <label>Date</label>
          <input type="date" name="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} required />
        </div>
        <button className="submit-button" type="submit">Create</button>
      </form>
    </div>
  );
}

export default Tracker;
