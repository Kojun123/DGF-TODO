import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editedContent: this.props.selectedTodo.content
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    handleInputChange(event) {
        this.setState({ editedContent: event.target.value });
    }

    handleSave() {
        // 서버로 데이터를 보내는 API 호출 수행
        fetch('http://localhost:8080/api/posts/' + this.props.selectedTodo.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: this.props.selectedTodo.id,
                content: this.state.editedContent
            })
        })
            .then(response => {
                // 응답 처리
                if (response.ok) {
                    console.log('수정 성공');
                    // 수정이 성공하면 onClose 호출하여 모달 닫기
                    this.props.onClose();
                } else {
                    console.error('수정 실패');
                }
            })
            .catch(error => {
                console.error('네트워크 오류:', error);
            });
    }

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
                    <input
                        value={this.state.editedContent}
                        placeholder="오늘 할 일을 입력하세요."
                        onChange={this.handleInputChange}
                    />
                    <p>Is Complete: {selectedTodo.isComplete ? 'Yes' : 'No'}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.handleSave}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default Detail;
