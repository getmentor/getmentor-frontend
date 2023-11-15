import React, { useState, useEffect } from 'react';
import { Form, ListGroup, Button } from 'react-bootstrap';
import axios from 'axios';
import routes from '../../server/routes';

import { Spinner } from '@nextui-org/react';
import SpecializationsModal from './SpecializationsModal.jsx';
import CloseButton from 'react-bootstrap/CloseButton';

import { useTranslation } from 'next-i18next';

function Tag({ name, onClick }) {
  return (
    <ListGroup.Item
      variant="warning"
      className="mb-2 ml-5 pl-5 border rounded-pill formLabel d-flex justify-content-between align-items-center"
      style={{ width: '300px', height: '30.5px', textIndent: '10px' }}
    >
      {name}
      <div className="d-flex mr-2">
        <CloseButton onClick={onClick} />
      </div>
    </ListGroup.Item>
  )
}

const apiUrl = process.env.NEXT_PUBLIC_MENTORS_BACKEND_URL;

export default function Specializations({ formik, tag }) {
  const [showModal, setShowModal] = useState(false);
  const [tags, setTags] = useState([]);
  const [specList, setSpecList] = useState(null);
  const [specListCopy, setSpecListCopy] = useState(null);

  useEffect(() => {
    axios.get(`${apiUrl}${routes.specializationsPath()}`).then((res) => {
      const specs = res.data.data.specializations;
      setSpecList(specs);
      setSpecListCopy(specs);
    })
  }, [setSpecList]);

  const { t } = useTranslation(['common', 'form', 'formErrors', 'toastify']);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleAddTag = (e) => {
    const tagName = e.target.textContent;
    formik.values.specializations = [...formik.values.specializations, tagName];

    setTags((prevTags) => {
      const newTags = [...prevTags, tagName];
      const filteredSpecList = specList.filter((spec) => !newTags.includes(spec.name));
      setSpecListCopy(filteredSpecList.sort((a, b) => a.name > b.name ? 1 : -1));

      return newTags;
    });

    handleCloseModal();
  };

  const handleDeleteTag = (tagName) => {
    const filteredSpecs = formik.values.specializations.filter((spec) => spec !== tagName);
    formik.values.specializations = filteredSpecs;

    setTags((prevTags) => {
      const newTags = prevTags.filter((tag) => tag !== tagName);

      setSpecListCopy((prevSpecList) => {
        const updatedSpecList = [...prevSpecList];
        const specToAdd = specList.find((spec) => spec.name === tagName);
        if (specToAdd) {
          updatedSpecList.push(specToAdd);
          updatedSpecList.sort((a, b) => a.name > b.name ? 1 : -1);
        }

        return updatedSpecList;
      });

      return newTags;
    });
  };

  if (specList === null) {
    return <Spinner />;
  }

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
        <Button variant="light border rounded-0" onClick={handleShowModal} className="mb-3" name="spec-add">
          + {t('specialization.specializationButton', { ns: 'form' })}
        </Button>

        {tags && tags.map((tag) => (<Tag key={tag} name={tag} onClick={() => handleDeleteTag(tag)} />))}
      </Form.Control>

      <SpecializationsModal
        showModal={showModal}
        hideModal={handleCloseModal}
        handleAddTag={handleAddTag}
        specList={specListCopy}
      />

      <Form.Control.Feedback type="invalid" className="invalid-feedback text-center">
        {formik.errors.specializations || null}
      </Form.Control.Feedback>
    </Form.Group>
  );
}
