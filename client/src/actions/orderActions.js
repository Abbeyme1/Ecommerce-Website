import Axios from "axios";
import * as constants from "../constants/orderConstants";

export const createOrder = (order) => {
  // console.log("Order ", order);
  return (dispatch, getState) => {
    dispatch({
      type: constants.ORDER_CREATE_REQEUST,
    });

    const {
      userLogin: { userInfo },
    } = getState(); // comes from initState in store

    console.log(userInfo);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    Axios.post("/api/orders", order, config)
      .then((response) =>
        dispatch({
          type: constants.ORDER_CREATE_SUCCESS,
          payload: response.data,
        }),
      )
      .catch((error) =>
        dispatch({
          type: constants.ORDER_CREATE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        }),
      );
  };
};

export const orderDetails = (id) => {
  return (dispatch, getState) => {
    dispatch({
      type: constants.ORDER_DETAILS_REQEUST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    Axios.get(`/api/orders/${id}`, config)
      .then((response) => {
        dispatch({
          type: constants.ORDER_DETAILS_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: constants.ORDER_DETAILS_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      });
  };
};

export const payOrder = (orderId, paymentResult) => {
  return (dispatch, getState) => {
    dispatch({
      type: constants.ORDER_PAY_REQEUST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    Axios.put(`/api/orders/${orderId}/pay`, paymentResult, config)
      .then((response) => {
        dispatch({
          type: constants.ORDER_PAY_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: constants.ORDER_PAY_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      });
  };
};

export const listMyOrders = () => {
  return (dispatch, getState) => {
    dispatch({
      type: constants.ORDER_LIST_MY_REQEUST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    Axios.get(`/api/orders/myorders`, config)
      .then((response) => {
        dispatch({
          type: constants.ORDER_LIST_MY_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: constants.ORDER_LIST_MY_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      });
  };
};
