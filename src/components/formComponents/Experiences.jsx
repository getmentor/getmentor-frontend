import React, { useState, useEffect } from 'react';
import axios from 'axios';
import routes from '../../server/routes';

import { Spinner } from '@nextui-org/react';
import { Form } from 'react-bootstrap';

const apiUrl = process.env.NEXT_PUBLIC_MENTORS_BACKEND_URL;

export default function Experiences({ formik, tag, onChange, onBlur, value }) {
  const [experiencesList, setExperiencesList] = useState(null);

  useEffect(() => {
    axios.get(`${apiUrl}${routes.experiencesPath()}`).then((res) => {
      const experiences = res.data.data.experiences;
      setExperiencesList(experiences);
    })
  }, []);

  if (experiencesList === null) {
    return <Spinner />;
  }

  const handleChange = (e) => {
    const { value } = e.target;
    formik.setFieldValue('experience', value);

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
      value={value}
      onBlur={onBlur}
      isInvalid={formik.touched.experience && formik.errors.experience}
      style={{ width: '100px' }}
      className="rounded-0 shadow-sm"
    >
      {experiencesList.map(({ id, name }) => (
        <option key={id} value={name}>
          {name}
        </option>
      ))}
    </Form.Control>
  );
}
