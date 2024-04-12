import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import TodoItem from "./TodoItem";

class CardG extends React.Component {
    render() { 
        const { todos, onToggle, onRemove, openModal } = this.props; // 비구조화 할당 (순서대로, 이름은 동일 할 필요가 없다. 그러나 가독성이 향상됨.)
        const todoCards = todos.map(({ id, title, content, isComplete }) => (
            <Col key={id}>
                <Card onClick={() => openModal({ id, title, content, isComplete })}>
                    <Card.Body>
                        <Card.Title>{title}</Card.Title>
                        <Card.Text></Card.Text>
                        <TodoItem
                            id={id}
                            content={content}
                            isComplete={isComplete}
                            onToggle={onToggle}
                            onRemove={onRemove}
                        />
                    </Card.Body>
                </Card>
            </Col>
        ));
        return (
            <Row xs={1} md={3} className="g-4">
                {todoCards}
            </Row>
        );
    }
}

export default CardG;
