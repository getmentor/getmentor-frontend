import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

export default function SubmitButton({ text }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const buttonStyle = {
    backgroundColor: isHovered ? "#ff6a3d" : "#fff",
    color: isHovered ? "#000" : "#0d6efd",
    padding: "10px 20px",
    borderRadius: "5px",
    transition: "all 0.2s ease-in-out",
    transform: isHovered ? "scale(1.1)" : "scale(1)",
  };

  return (
    <Button
      type="submit"
      size="lg"
      className="border-0 rounded-pill"
      style={buttonStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {text}
    </Button>
  );
}
