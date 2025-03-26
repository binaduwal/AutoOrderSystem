import React from 'react'
import ModalWrapper from './ModalWrapper'
import EditRoute from '../company/route/EditRoute'

const EditRouteModal = ({ isOpen, onClose, routeData, onUpdated }) => (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <EditRoute routeData={routeData} onClose={onClose} onUpdated={onUpdated} />
    </ModalWrapper>
  )
  
export default EditRouteModal