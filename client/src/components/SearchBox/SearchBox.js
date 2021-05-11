import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) history.push(`/search/${keyword}`);
    else history.push("/");
  };

  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type="text"
        name="Search"
        onChange={(e) => setKeyword(e.target.value)}
        className="mr-sm-2 ml-sm-5"
        placeholder="Search Products..."
      ></Form.Control>
      <Button type="submit" variant="outline-warning" className="p-2">
        <i className="fa fa-search" />
      </Button>
    </Form>
  );
};

export default SearchBox;
