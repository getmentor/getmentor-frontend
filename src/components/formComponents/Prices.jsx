import React, { useState, useEffect } from 'react';
import axios from 'axios';
import routes from '../../server/routes';

import { Spinner } from '@nextui-org/react';
import { Form } from 'react-bootstrap';

const apiUrl = process.env.NEXT_PUBLIC_MENTORS_BACKEND_URL;

export default function Prices({ formik, tag, onChange, onBlur }) {
  const [pricesList, setPricesList] = useState(null);

  useEffect(() => {
    axios.get(`${apiUrl}${routes.pricesPath()}`).then((res) => {
      const prices = res.data.data.prices;
      setPricesList(prices);
    })
  }, []);

  if (pricesList === null) {
    return <Spinner />;
  }

  const handleChange = (e) => {
    const { value } = e.target;
    formik.setFieldValue('price', value);

    if (onChange) {
      onChange(value);
    }
  };

  return (
    <Form.Control
    as="select"
    id={tag}
    name={tag}
    onChange={handleChange}
    value={formik.values.price}
    onBlur={onBlur}
    isInvalid={formik.touched.price && formik.errors.price}
    style={{ width: '200px' }}
    className="rounded-0 shadow-sm"
    >
      {pricesList.map(({ id, name }) => (
        <option key={id} value={name}>
          {name}
        </option>
      ))}
    </Form.Control>
  );
}
