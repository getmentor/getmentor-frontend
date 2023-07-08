import React, { useEffect, useState } from 'react';
import { Form, ListGroup, Button } from 'react-bootstrap';

import SpecializationsModal from './SpecializationsModal.jsx';
import specializationList from './specializationList.js';

function Tag({ name, onClick }) {
  return (
    <ListGroup.Item
      variant="warning"
      className="mb-2 ml-5 pl-5 border rounded-pill formLabel d-flex justify-content-between align-items-center"
      style={{ width: '300px', height: '30.5px', textIndent: '10px' }}
    >
      {name}
      <Button
        variant="white"
        className="rounded-pill"
        onClick={onClick}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
          <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
        </svg>
      </Button>
    </ListGroup.Item>
  )
}

export default function Specializations({ formik, tag }) {
  const [showModal, setShowModal] = useState(false);
  const [tags, setTags] = useState([]);
  const [specList, setSpecList] = useState([]);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleAddTag = (e) => {
    const tagName = e.target.textContent;
    formik.values.specializations = [...formik.values.specializations, tagName];

    setTags((prevTags) => {
      const newTags = [...prevTags, tagName];
      setSpecList((prevSpecList) => prevSpecList.filter((spec) => !newTags.includes(spec.name)));
      return newTags;
    });

    handleCloseModal();
  };

  const handleDeleteTag = (tagName) => {
    const filteredSpecs = formik.values.specializations.filter((spec) => spec !== tagName);
    formik.values.specializations = filteredSpecs;

    setTags((prevTags) => {
      const newTags = prevTags.filter((tag) => tag !== tagName);

      setSpecList((prevSpecList) => {
        const updatedSpecList = [...prevSpecList];
        const specToAdd = specializationList.find((spec) => spec.name === tagName);
        if (specToAdd) {
          updatedSpecList.push(specToAdd);
          updatedSpecList.sort((a, b) => a.name > b.name ? 1 : -1);
        }

        return updatedSpecList;
      });

      return newTags;
    });
  };

  useEffect(() => {
    setSpecList(specializationList);
  }, []);

  return (
    <Form.Group>
      <Form.Control
        as="elementType"
        id={tag}
        name={tag}
        onBlur={formik.handleBlur}
        value={formik.values.specializations}
        onChange={formik.handleChange}
        isInvalid={formik.touched.specializations && formik.errors.specializations}
        className={formik.touched.specializations && formik.errors.specializations ? "rounded-0" : "border-0"}
      >
        <Button variant="light border rounded-0" onClick={handleShowModal} className="mb-3">
          + добавить
        </Button>

        {tags && tags.map((tag) => (<Tag key={tag} name={tag} onClick={() => handleDeleteTag(tag)} />))}
      </Form.Control>

      <SpecializationsModal
        showModal={showModal}
        hideModal={handleCloseModal}
        handleAddTag={handleAddTag}
        specList={specList.sort((a, b) => a.name > b.name ? 1 : -1)}
      />

      <Form.Control.Feedback type="invalid" className="invalid-feedback text-center">
        {formik.errors.specializations || null}
      </Form.Control.Feedback>
    </Form.Group>
  );
}
