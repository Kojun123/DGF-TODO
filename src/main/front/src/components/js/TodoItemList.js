import React from 'react';
import TodoItem from './TodoItem';

class TodoItemList extends React.Component {

    // *** Form.js 에서 Hook(useState) 사용으로 인해 제거
    // shouldComponentUpdate(nextProps, nextState) {
    //     return this.props.todos !== nextProps.todos;
    // }

    render() {
        const { todos, onToggle, onRemove } = this.props;
        console.log(todos);

        const todoList = todos.map(
            ({ id, content, isComplete }) => (
                <TodoItem
                    id={id}
                    content={content}
                    isComplete={isComplete}
                    onToggle={onToggle}
                    onRemove={onRemove}
                    key={id} />
            )
        );

        return (
            <div>
                {todoList}
            </div>
        );
    }
}

export default TodoItemList;