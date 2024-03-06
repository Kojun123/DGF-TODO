import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class Detail extends React.Component {
    render() {
        const { selectedTodo, onClose } = this.props;
        console.log('MODAL 진입', selectedTodo);

        return (
            <Modal show={true} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Todo Detail</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>ID: {selectedTodo.id}</p>
                    <p>Content: {selectedTodo.content}</p>
                    <p>Is Complete: {selectedTodo.isComplete ? 'Yes' : 'No'}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default Detail;
