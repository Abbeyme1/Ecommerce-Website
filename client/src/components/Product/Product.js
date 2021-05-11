import React from "react";
import { Card } from "react-bootstrap";
import Rating from "../Rating/Rating";
import { Link } from "react-router-dom";
import style from "./Product.module.css";

const Product = ({ product }) => {
  return (
    <Card className={`my-3 p-3 rounded ${style.card}`}>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} varient="top" />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="p">
            <p style={{ fontSize: "1.1rem" }}>{product.name}</p>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>
        <Card.Text as="h3">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
