import * as constants from "../constants/productConstants";
import axios from "axios";

export const listProducts = (keyword = "", pageNumber = 1) => {
  return (dispatch) => {
    dispatch({
      type: constants.PRODUCT_LIST_REQUEST,
    });
    axios
      .get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`)
      .then((response) => {
        dispatch({
          type: constants.PRODUCT_LIST_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: constants.PRODUCT_LIST_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      });
  };
};

export const listProductDetails = (id) => {
  return (dispatch) => {
    dispatch({
      type: constants.PRODUCT_DETAILS_REQUEST,
    });
    axios
      .get(`/api/products/${id}`)
      .then((response) => {
        // console.log(response);
        dispatch({
          type: constants.PRODUCT_DETAILS_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: constants.PRODUCT_DETAILS_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      });
  };
};

export const deleteProduct = (id) => {
  return (dispatch, getState) => {
    dispatch({
      type: constants.PRODUCT_DELETE_REQUEST,
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

    axios
      .delete(`/api/products/${id}`, config)
      .then((response) => {
        dispatch({
          type: constants.PRODUCT_DELETE_SUCCESS,
        });
      })
      .catch((error) => {
        dispatch({
          type: constants.PRODUCT_DELETE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      });
  };
};

export const createProduct = () => {
  return (dispatch, getState) => {
    dispatch({
      type: constants.PRODUCT_CREATE_REQUEST,
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

    axios
      .post(`/api/products`, {}, config)
      .then((response) => {
        dispatch({
          type: constants.PRODUCT_CREATE_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: constants.PRODUCT_CREATE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      });
  };
};

export const updateProduct = (product) => {
  return (dispatch, getState) => {
    dispatch({
      type: constants.PRODUCT_UPDATE_REQUEST,
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

    axios
      .put(`/api/products/${product._id}`, product, config)
      .then((response) => {
        dispatch({
          type: constants.PRODUCT_UPDATE_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: constants.PRODUCT_UPDATE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      });
  };
};

export const createProductReview = (review, id) => {
  return (dispatch, getState) => {
    dispatch({
      type: constants.PRODUCT_CREATE_REVIEW_REQUEST,
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

    axios
      .post(`/api/products/${id}/reviews`, review, config)
      .then((response) => {
        dispatch({
          type: constants.PRODUCT_CREATE_REVIEW_SUCCESS,
        });
      })
      .catch((error) => {
        dispatch({
          type: constants.PRODUCT_CREATE_REVIEW_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      });
  };
};

export const getTopRatedProducts = () => {
  return (dispatch, getState) => {
    dispatch({
      type: constants.PRODUCT_TOP_REQUEST,
    });

    axios
      .get(`/api/products/top`)
      .then((response) => {
        dispatch({
          type: constants.PRODUCT_TOP_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: constants.PRODUCT_TOP_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      });
  };
};
