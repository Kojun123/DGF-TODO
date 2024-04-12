import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function Detail({selectedTodo, onUpdate, onClose}) {
    const [showModal, setShowModal] = useState(true); // showModal 상태를 true로 초기화

    const handleClose = (event) => {
        setShowModal(false); // 모달을 닫음
        onClose(); // 부모 컴포넌트에서 전달받은 onClose 함수 호출
    }

    const handleSave = () => {
        // 수정된 내용을 전달
        onUpdate(selectedTodo.id, selectedTodo.title, selectedTodo.content);
        handleClose();
    };

    console.log('Detail 진입', selectedTodo);

    return (
        <>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>몇월 몇일자 TODO_</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            {/*<Form.Label>{selectedTodo.id}</Form.Label>*/}
                            <Form.Control
                                type="text"
                                placeholder="title"
                                value={selectedTodo.title}
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Control
                                as="textarea"
                                value={selectedTodo.content}
                                onChange={(e) => onUpdate(selectedTodo.id, e.target.value)} // 내용이 변경될 때 onUpdate 호출
                                rows={3}> </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleSave}>
                        Save Changes
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Detail;
