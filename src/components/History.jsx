import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteTransaction, GetTransaction, UpdateTransaction } from '../Redux/action';
import {
  useToast,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
  Button,
  FormControl,
  FormLabel,
  Select
} from '@chakra-ui/react';
import "../Styles/history.css";

const History = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  const dispatch = useDispatch();
  const transactions = useSelector(state => state.transactions.items || []);
  const toast = useToast();
  const userId = JSON.parse(localStorage.getItem("Users")).id;

  useEffect(() => {
    if (userId) {
      dispatch(GetTransaction(userId, toast));
    }
  }, [dispatch, userId]);

  const handleDelete = (id) => {
    dispatch(DeleteTransaction(id, toast));
  };

  const openEditDrawer = (transaction) => {
    setSelectedTransaction({ ...transaction });
    onOpen();
  };

  const handleUpdate = () => {
    if (selectedTransaction) {
      dispatch(UpdateTransaction(selectedTransaction.id, selectedTransaction, toast))
        .then(() => {
          dispatch(GetTransaction(userId, toast));
        })
        .finally(() => {
          onClose();
        });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedTransaction(prev => ({ ...prev, [name]: value }));
    if (name === "type") {
      setSelectedTransaction(prev => ({ ...prev, category: '' }));
    }
  };

  const renderCategoryOptions = () => {
    if (selectedTransaction?.type === 'Income') {
      return (
        <>
          <option value="Salary">Salary</option>
          <option value="Gifts">Gifts</option>
          <option value="Refunds">Refunds</option>
          <option value="Other">Other</option>
        </>
      );
    } else if (selectedTransaction?.type === 'Expense') {
      return (
        <>
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

  const indexOfLastTransaction = currentPage * itemsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - itemsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(transactions.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <h1 style={{ fontSize: "20px" }}>History</h1>
      <div className="history-container">
        {transactions.length > 0 ? (
          <div className="transaction-list">
            {currentTransactions.map(transaction => (
              <div key={transaction.id} className="transaction-card">
                <p className="transaction-type">Type: {transaction.type}</p>
                <p className="transaction-category">Category: {transaction.category}</p>
                <p className="transaction-amount">Amount: ₹{transaction.amount}</p>
                <p className="transaction-date">Date: {transaction.date}</p>
                <button className="delete-button" onClick={() => handleDelete(transaction.id)}>Delete</button>
                <button className="edit-button" onClick={() => openEditDrawer(transaction)}>Edit</button>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-transactions">No transactions found.</p>
        )}

        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Edit Transaction</DrawerHeader>
            <DrawerBody>
              {selectedTransaction && (
                <form onSubmit={(e) => e.preventDefault()}>
                  <FormControl>
                    <FormLabel>Type</FormLabel>
                    <Select name="type" value={selectedTransaction.type} onChange={handleChange} placeholder="Select Type">
                      <option value="Income">Income</option>
                      <option value="Expense">Expense</option>
                    </Select>
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>Category</FormLabel>
                    <Select name="category" value={selectedTransaction.category} onChange={handleChange} placeholder="Select Category">
                      {renderCategoryOptions()}
                    </Select>
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>Amount</FormLabel>
                    <Input name="amount" type="number" value={selectedTransaction.amount} onChange={handleChange} />
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>Date</FormLabel>
                    <Input name="date" type="date" value={new Date(selectedTransaction.date).toISOString().slice(0, 10)} onChange={handleChange} />
                  </FormControl>
                  <Button mt={4} colorScheme="blue" onClick={handleUpdate}>Update</Button>
                </form>
              )}
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </div>

      <div className="pagination">
        {pageNumbers.map(number => (
          <button key={number} onClick={() => paginate(number)}>
            {number}
          </button>
        ))}
      </div>
    </>
  );
};

export default History;
