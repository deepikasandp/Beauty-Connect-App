import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

export const OrderConfirmationModal = (props) => {
    return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Order Process Confirmation Notice
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Thank you for purchasing with us!</h4>
            <p>
              You will receive your order receipt to your email <i>{props.contact}</i>. In case you didn't receive please contact our admin at 07440239187.<br/>

              Close the notification to return to products.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
}

OrderConfirmationModal.propTypes = {
    contact: PropTypes.string,
};

OrderConfirmationModal.defaultProps = {
    contact: '',
};

export default OrderConfirmationModal;
