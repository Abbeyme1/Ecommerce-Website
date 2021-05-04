import * as constants from "../constants/userConstants.js";
import * as constant from "../constants/orderConstants.js";
import Axios from "axios";

export const userLogin = (email, password) => {
  return (dispatch) => {
    dispatch({
      type: constants.USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    Axios.post("/api/users/login", { email, password }, config)
      .then((response) => {
        dispatch({
          type: constants.USER_LOGIN_SUCCESS,
          payload: response.data,
        });

        localStorage.setItem("userInfo", JSON.stringify(response.data));
      })
      .catch((error) => {
        dispatch({
          type: constants.USER_LOGIN_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      });
  };
};

export const userLogout = () => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("cartItems");
  localStorage.removeItem("shippingAddress");
  localStorage.removeItem("paymentMethod");
  return (dispatch) => {
    dispatch({
      type: constants.USER_LOGOUT,
    });
    dispatch({
      type: constants.USER_DETAILS_RESET,
    });
    dispatch({
      type: constant.ORDER_LIST_MY_RESET,
    });
    dispatch({
      type: constants.USER_LIST_RESET,
    });
  };
  document.location.href = "/login";
};

export const userRegister = (name, email, password) => {
  return (dispatch) => {
    dispatch({
      type: constants.USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    Axios.post("/api/users", { name, email, password }, config)
      .then((response) => {
        dispatch({
          type: constants.USER_REGISTER_SUCCESS,
          payload: response.data,
        });

        dispatch({
          type: constants.USER_LOGIN_SUCCESS,
          payload: response.data,
        });

        localStorage.setItem("userInfo", JSON.stringify(response.data));
      })
      .catch((error) => {
        dispatch({
          type: constants.USER_REGISTER_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      });
  };
};

export const getUserDetails = (id) => {
  return (dispatch, getState) => {
    dispatch({
      type: constants.USER_DETAILS_REQUEST,
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
    Axios.get(`/api/users/${id}`, config)
      .then((response) => {
        dispatch({
          type: constants.USER_DETAILS_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: constants.USER_DETAILS_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      });
  };
};
export const updateUserProfile = (user) => {
  console.log("update user");
  return (dispatch, getState) => {
    dispatch({
      type: constants.USER_UPDATE_PROFILE_REQUEST,
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
    Axios.put(`/api/users/profile`, user, config)
      .then((response) => {
        dispatch({
          type: constants.USER_UPDATE_PROFILE_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: constants.USER_UPDATE_PROFILE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      });
  };
};

export const listUsers = () => {
  return (dispatch, getState) => {
    dispatch({
      type: constants.USER_LIST_REQUEST,
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

    Axios.get(`/api/users`, config)
      .then((response) => {
        dispatch({
          type: constants.USER_LIST_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: constants.USER_LIST_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      });
  };
};

export const deleteUser = (id) => {
  return (dispatch, getState) => {
    dispatch({
      type: constants.USER_DELETE_REQUEST,
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

    Axios.delete(`/api/users/${id}`, config)
      .then((response) => {
        dispatch({
          type: constants.USER_DELETE_SUCCESS,
        });
      })
      .catch((error) => {
        dispatch({
          type: constants.USER_DELETE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      });
  };
};

export const updateUser = (user) => {
  return (dispatch, getState) => {
    dispatch({
      type: constants.USER_UPDATE_REQUEST,
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
    Axios.put(`/api/users/${user._id}`, user, config)
      .then((response) => {
        dispatch({
          type: constants.USER_UPDATE_SUCCESS,
        });

        //! this woudn't have came in my mind
        dispatch({
          type: constants.USER_DETAILS_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: constants.USER_UPDATE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      });
  };
};
