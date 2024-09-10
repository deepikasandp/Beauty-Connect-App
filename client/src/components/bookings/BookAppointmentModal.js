import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

export const BookAppointmentModal = (props) => {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Book Appointment
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>with {props.status} : {props.name}</h4>
          <p>
            Please contact <i>{props.contact}</i> to book appointment over phone.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
}

BookAppointmentModal.propTypes = {
    name: PropTypes.string,
    contact: PropTypes.string,
    status: PropTypes.string
};

BookAppointmentModal.defaultProps = {
    name: '',
    contact: '',
    status: ''
};

export default BookAppointmentModal;
