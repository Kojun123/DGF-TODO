import { Card, Col, Row } from 'react-bootstrap';
import React from 'react';
import TodoItem from "./TodoItem";
class CardG extends React.Component{

    render() {
        const {todos, onToggle, onRemove } = this.props;
        console.log('todos', todos);

        const todoCards = todos.map(
            ({ id, content, isComplete }) => (
                <Col key={id}>
                    <Card>
                        <Card.Img variant="top" src="holder.js/100px160"/>
                        <Card.Body>
                            <Card.Title>{content}</Card.Title>
                            <Card.Text> </Card.Text>
                            <TodoItem
                                id={id}
                                content={content}
                                isComplete={isComplete}
                                onToggle={onToggle}
                                onRemove={onRemove}
                                key={id}
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