import React, { useState } from "react";

function Calculator() {
  const [input, setInput] = useState(""); // For the input expression
  const [result, setResult] = useState(""); // For the result of the expression

  // Function to handle button clicks
  const handleClick = (value) => {
    if (value === "C") {
      setInput(""); // Clear the input
      setResult(""); // Clear the result
    } else if (value === "=") {
      try {
        const evaluatedResult = evaluateExpression(input);
        setResult(evaluatedResult); // Update the result
      } catch (error) {
        setResult("Error"); // Display "Error" for invalid input
      }
    } else {
      setInput((prev) => prev + value); // Append the clicked value to the input
    }
  };

  // Function to evaluate the mathematical expression
  const evaluateExpression = (expression) => {
    const sanitizedExpression = expression.replace(/[^0-9+\-*/().]/g, ""); // Sanitize input
    const result = Function(`"use strict"; return (${sanitizedExpression})`)();
    return result.toString(); // Return the result as a string
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>React Calculator</h1>
      {/* Input field */}
      <input
        type="text"
        value={input}
        readOnly
        style={{ width: "200px", textAlign: "right", marginBottom: "20px" }}
      />
      {/* Display the result below the input field */}
      <div>
        <h2> {result}</h2>
      </div>
      {/* Calculator buttons */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 50px)", gap: "10px", justifyContent: "center" }}>
        {["7", "8", "9", "+", "4", "5", "6", "-", "1", "2", "3", "*", "C", "0", "=", "/"].map((button) => (
          <button
            key={button}
            onClick={() => handleClick(button)}
            style={{ width: "50px", height: "50px", fontSize: "18px" }}
          >
            {button}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Calculator;
