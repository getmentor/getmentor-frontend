import React from 'react';
import { Modal } from 'react-bootstrap';

import SpecAutocomplete from './SpecAutocomplete.jsx';

export default function SpecializationsModal({ showModal, hideModal, handleAddTag, specList }) {

  return (
    <Modal show={showModal} onHide={hideModal}>
        <Modal.Header closeButton>
          <Modal.Title className="formHeader">Выберите нужный тег</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SpecAutocomplete options={specList} onSubmit={handleAddTag} />
        </Modal.Body>
    </Modal>
  )
}
