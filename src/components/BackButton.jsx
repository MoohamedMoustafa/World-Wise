import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();
  function navigateBack(e) {
    e.preventDefault();
    navigate(-1);
  }
  return (
    <Button type="back" onClick={navigateBack}>
      &larr; Back
    </Button>
  );
}
