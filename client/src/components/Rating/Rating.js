import React from "react";
import PropTypes from "prop-types";
import { Badge } from "react-bootstrap";

const Rating = ({ value, text, color = "#f8e825" }) => {
  return (
    <span className="rating">
      {
        <Badge
          pill
          variant={value >= 4 ? "success" : value >= 3 ? "warning" : "danger"}
          style={{ fontSize: "0.8rem" }}
        >
          {value} <i className="fas fa-star"></i>
        </Badge>
      }

      <p>{text}</p>
    </span>
  );
};

Rating.prototype = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
};

export default Rating;
