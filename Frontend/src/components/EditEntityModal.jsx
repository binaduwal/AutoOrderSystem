import React from 'react'
import ModalWrapper from './ModalWrapper'

const EditEntityModal = ({ isOpen, onClose, entityData, onUpdated, Component }) => (
  <ModalWrapper isOpen={isOpen} onClose={onClose}>
    <Component 
      entityData={entityData} 
      onClose={onClose} 
      onUpdated={onUpdated} 
    />
  </ModalWrapper>
)

export default EditEntityModal
