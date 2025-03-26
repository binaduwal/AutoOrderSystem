import React from 'react'
import ModalWrapper from './ModalWrapper'
import CreateRoute from '../company/route/CreateRoute'

const CreateRouteModal = ({ isOpen, onClose, onCreated }) => (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <CreateRoute onClose={onClose} onCreated={onCreated} />
    </ModalWrapper>
  )
  
export default CreateRouteModal