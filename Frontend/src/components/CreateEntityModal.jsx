import React from 'react';
import ModalWrapper from './ModalWrapper';

const CreateEntityModal = ({ isOpen, onClose, onCreated, Component }) => (
  <ModalWrapper isOpen={isOpen} onClose={onClose}>
    <Component onClose={onClose} onCreated={onCreated} />
  </ModalWrapper>
);

export default CreateEntityModal;
