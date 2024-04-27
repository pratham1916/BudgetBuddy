import axios from "axios";
import { DELETE_TRANSACTION, LOGIN_FAIL, LOGIN_LOADING, LOGIN_SUCCESS, REGISTER_FAIL, REGISTER_LOADING, REGISTER_SUCCESS, TRACKER_FAIL, TRACKER_SUCCESS, TRANSACTION_FAIL, TRANSACTION_SUCCESS, USER_PRESENT } from "./actionTypes";

export const LoginUser = (email, password, toast) => async (dispatch) => {
  dispatch({ type: LOGIN_LOADING });
  try {
    const res = await axios.get("https://expense-tracker-api-9ua0.onrender.com/users");
    const user = res.data.filter(user => user.email === email && user.password === password);

    if (user.length == 1) {
      localStorage.setItem("Users", JSON.stringify(user[0]));
      dispatch({ type: LOGIN_SUCCESS });
      toast({
        title: "Login Successful",
        description: "You're now logged in.",
        position: 'top',
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      dispatch({ type: LOGIN_FAIL });
      toast({
        title: "Account not found",
        description: "Please check your credentials and try again.",
        position: 'top',
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  } catch (error) {
    console.log("Error:", error);
    dispatch({ type: LOGIN_FAIL });
    toast({
      title: "An error occurred.",
      description: "Unable to log in. Please try again later.",
      status: "error",
      position: 'top',
      duration: 3000,
      isClosable: true,
    });
  }
};

export const RegisterUser = ({ fullname, email, password }, toast) => async (dispatch) => {
  try {
    const res = await axios.get("https://expense-tracker-api-9ua0.onrender.com/users");
    const user = res.data.filter(user => {
      if (user?.email && user.email === email) {
        return true;
      }
    });
    if (user.length == 1) {
      dispatch({ type: USER_PRESENT })
      toast({
        title: "User Already Exist",
        description: "Please try with new email!",
        position: 'top',
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    } else {
      dispatch({ type: REGISTER_LOADING });
      await axios.post('https://expense-tracker-api-9ua0.onrender.com/users', { fullname, email, password })
        .then((res) => {
          dispatch({ type: REGISTER_SUCCESS })
          toast({
            title: "Registration successful!",
            description: "You can Login Now!",
            position: 'top',
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        })
        .catch(err => {
          dispatch({ type: REGISTER_FAIL }),
            toast({
              title: "Register Unsuccessful!",
              description: "Please check your credentials and try again.",
              position: 'top',
              status: "error",
              duration: 3000,
              isClosable: true,
            });
        })
    }
  } catch (error) {
    dispatch({ type: REGISTER_FAIL }),
      toast({
        title: "An error occurred.",
        description: "Unable to Register! Please try again later.",
        position: 'top',
        status: "error",
        duration: 3000,
        isClosable: true,
      });
  }
}

export const TrackerSubmit = (formData, toast) => async (dispatch) => {
  const { type, category, amount, date } = formData;
  try {
    const userid = JSON.parse(localStorage.getItem("Users")).id;
    const id =  Date.now();
    
    const response = await axios.post('https://expense-tracker-api-9ua0.onrender.com/expenses', { id, userid, type, category, amount, date });
    dispatch({ type: TRACKER_SUCCESS });
    toast({
      title: "Expenses Input successful!",
      description: "Your entry has been added successfully!",
      position: 'top',
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  } catch (error) {
    dispatch({ type: TRACKER_FAIL });
    toast({
      title: "Expense Input Unsuccessful!",
      description: error.response?.data?.message || "Please check your entries and try again.",
      position: 'top',
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  }
}

export const GetTransaction = (userId,toast)=> async (dispatch)=> {
  try {
    const response = await axios.get(`https://expense-tracker-api-9ua0.onrender.com/expenses?userid=${userId}`);
    console.log(response);
    dispatch({type :TRANSACTION_SUCCESS , payload : response.data})
  } 
  catch (error) {
    dispatch({type:TRANSACTION_FAIL});
    toast({
      title: "Expense Input Unsuccessful!",
      description: error.response?.data?.message || "Please check your entries and try again.",
      position: 'top',
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  }
}

export const DeleteTransaction = (id,toast)=> async (dispatch)=> {
  try {
    await axios.delete(`https://expense-tracker-api-9ua0.onrender.com/expenses/${id}`);
    dispatch({type :DELETE_TRANSACTION , payload : id})
    toast({
      title: "Success",
      description: "Transaction deleted successfully.",
      status: "success",
      duration: 5000,
      isClosable: true,
  });
  } 
  catch (error) {
    dispatch({type:TRANSACTION_FAIL});
    toast({
      title: "Expense Input Unsuccessful!",
      description: error.response?.data?.message || "Please check your entries and try again.",
      position: 'top',
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  }
}

export const UpdateTransaction = (id, transactionData, toast) => async dispatch => {
  try {
      const response = await axios.put(`https://expense-tracker-api-9ua0.onrender.com/expenses/${id}`, transactionData);
      dispatch({
          type: 'UPDATE_TRANSACTION_SUCCESS',
          payload: response.data
      });
      toast({
          title: "Success",
          description: "Transaction updated successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
      });
  } catch (error) {
      toast({
          title: "Error",
          description: "Failed to update transaction",
          status: "error",
          duration: 3000,
          isClosable: true,
      });
      console.error('Error updating transaction:', error);
  }
};


