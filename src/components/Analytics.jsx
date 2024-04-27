import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

Chart.register(ArcElement, Tooltip, Legend);

const Analytics = () => {
  const [incomeData, setIncomeData] = useState(null);
  const [expenseData, setExpenseData] = useState(null);

  useEffect(() => {
    const storedIds = JSON.parse(localStorage.getItem("Users")).id;
    axios.get(`https://expense-tracker-api-9ua0.onrender.com/expenses?userid=${storedIds}`)
      .then(response => {
        const income = [];
        const expenses = [];
        

        response.data.forEach(item => {
            if (item.type === 'Income') {
              income.push(item);
            } else {
              expenses.push(item);
            }
        });

        if (income.length > 0) {
          setIncomeData(categorizeData(income));
        } else {
          setIncomeData(null);
        }

        if (expenses.length > 0) {
          setExpenseData(categorizeData(expenses));
        } else {
          setExpenseData(null);
        }
      })
      .catch(error => console.log(error));
  }, []);

  const categorizeData = (data) => {
    const categories = data.reduce((acc, item) => {
      const { category, amount } = item;
      acc[category] = acc[category] ? acc[category] + Number(amount) : Number(amount);
      return acc;
    }, {});

    return {
      labels: Object.keys(categories),
      datasets: [{
        label: 'Amount',
        data: Object.values(categories),
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
        ],
        hoverBackgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
        ]
      }]
    };
  };

  const renderChart = (data, title) => {
    if (!data) {
      return <p>No data available for {title}</p>;
    }
    return <Doughnut data={data} />;
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <div>
        <h2>Income Distribution</h2>
        {renderChart(incomeData, 'Income')}
      </div>
      <div>
        <h2>Expense Distribution</h2>
        {renderChart(expenseData, 'Expenses')}
      </div>
    </div>
  );
};

export default Analytics;
