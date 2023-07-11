import React, { useState, useEffect, useRef } from 'react';
import { ListGroup, Form } from 'react-bootstrap';

function getOptionsValues(options) {
  const newArr = [];

  options.forEach((option) => {
    const [, , name] = Object.values(option);
    newArr.push(name);
  });

  return newArr;
}

function SpecItem({ name, onSubmit }) {
  return (
    <ListGroup.Item
      as="li"
      action
      variant="light"
      className="mb-2 border rounded-0 formLabel"
      onClick={onSubmit}
    >
      {name}
    </ListGroup.Item>
  )
}

export default function Autocomplete({ options, onSubmit }) {
  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);
  const inputRef = useRef();

  const optionsValues = getOptionsValues(options);

  useEffect(() => {
    setFilteredOptions(
      optionsValues.filter((option) =>
        option.toLowerCase().includes(inputValue.toLowerCase())
      )
    );

    inputRef.current.focus();
  }, [inputValue, options]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleOptionClick = (option) => {
    setInputValue(option);
  };

  return (
    <div className="autocomplete">
      <Form.Control
        type="text"
        size="lg"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Поиск"
        className="mb-3 rounded-0 modalLabel"
        ref={inputRef}
      />
      {filteredOptions.length > 0 && (
        <ListGroup>
          {filteredOptions.map((option) => (
            <SpecItem key={option} onClick={() => handleOptionClick(option)} name={option} onSubmit={onSubmit} />
          ))}
        </ListGroup>
      )}
    </div>
  );
}
