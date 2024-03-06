import React from 'react';
import '../css/TodoItem.css';

class TodoItem extends React.Component {
    render() {
        const { content, isComplete, id, onToggle, onRemove } = this.props;
        return (
            <div className="todo-item" onClick={() => onToggle(id)}>
                <div className="todo-item-remove" onClick={(e) => {
                    e.stopPropagation(); // 부모 요소의 클릭 이벤트 전파 방지
                    onRemove(id);
                }}>
                    삭제
                </div>
                <div className={`todo-item-text ${isComplete && 'isComplete'}`}>
                    <div>
                        {content}
                    </div>
                </div>
                {
                    isComplete && (<div className="isComplete-mark">✓</div>)
                }
            </div>
        )
    }
}

export default TodoItem;
