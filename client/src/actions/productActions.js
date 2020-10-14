import * as constants from "../constants/productConstants";
import axios from "axios";

export const listProducts = () => {
  return (dispatch) => {
    dispatch({
      type: constants.PRODUCT_LIST_REQUEST,
    });
    axios
      .get("/api/products")
      .then((response) => {
        // console.log(response);
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
