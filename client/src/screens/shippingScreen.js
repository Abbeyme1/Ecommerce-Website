import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer/FormContainer";
import { saveShippingAddress } from "../actions/actions";
import CheckOutSteps from "../components/CheckoutSteps/CheckoutSteps";
import Meta from "../components/Meta/Meta";
const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [address, setAddress] = useState(
    shippingAddress ? shippingAddress.address : "",
  );
  const [postalCode, setPostalCode] = useState(
    shippingAddress ? shippingAddress.postalCode : "",
  );
  const [city, setCity] = useState(shippingAddress ? shippingAddress.city : "");
  const [country, setCountry] = useState(
    shippingAddress ? shippingAddress.country : "",
  );

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, postalCode, city, country }));
    history.push("/payment");
  };

  return (
    <>
      <Meta title="Shipping" />
      <FormContainer>
        <CheckOutSteps step1 step2 />
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Address"
              value={address ? address : ""}
              required
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter City"
              value={city ? city : ""}
              required
              onChange={(e) => setCity(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="postalCode">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Postal Code"
              value={postalCode ? postalCode : ""}
              required
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="country">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Country"
              value={country ? country : ""}
              required
              onChange={(e) => setCountry(e.target.value)}
            />
          </Form.Group>
          <Button type="submit" style={{ backgroundColor: "	#1E90FF" }}>
            Continue
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ShippingScreen;
