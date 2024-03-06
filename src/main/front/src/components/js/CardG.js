import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import TodoItem from "./TodoItem";

class CardG extends React.Component {
    render() {
        const { todos, onToggle, onRemove, openModal } = this.props;
        const todoCards = todos.map(({ id, content, isComplete }) => (
            <Col key={id}>
                <Card onClick={() => openModal({ id, content, isComplete })}>
                    <Card.Body>
                        <Card.Title>{content}</Card.Title>
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
