import Axios from "axios";
import * as constants from "../constants/carConstants";

export const addToCart = (id, qty) => {
  return (dispatch, getState) => {
    Axios.get(`/api/products/${id}`).then((product) => {
      dispatch({
        type: constants.CART_ADD_ITEM,
        payload: {
          product: product.data._id,
          name: product.data.name,
          image: product.data.image,
          price: product.data.price,
          countInStock: product.data.countInStock,
          qty,
        },
      });

      localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cart.cartItems),
      );
    });
  };
};

export const removeFromCart = (id) => {
  return (dispatch, getState) => {
    dispatch({
      type: constants.CART_REMOVE_ITEM,
      payload: id,
    });

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems),
    );
  };
};

export const saveShippingAddress = (data) => {
  return (dispatch, getState) => {
    dispatch({
      type: constants.CART_SAVE_SHIPPING_ADDRESS,
      payload: data,
    });

    localStorage.setItem("shippingAddress", JSON.stringify(data));
  };
};
