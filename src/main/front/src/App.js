import React from 'react';
import TodoListTemplate from './components/js/TodoListTemplate';
import Form from './components/js/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import CardsG from "./components/js/CardG";
import Detail from "./components/js/Detail";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            selectedTodo: null,
            todos: []
        };
        this.handleCreate = this.handleCreate.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleInitInfo = this.handleInitInfo.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        this.handleInitInfo();
    }

    handleInitInfo() { // 조회
        fetch("/api/posts")
            .then(res => res.json())
            .then(todos => this.setState({ todos: todos }))
            .catch(err => console.log(err));
    }

    handleCreate(inputValue) { // 생성
        const { todos } = this.state;
        if (inputValue === "") {
            alert("오늘 할 일을 입력해주세요!");
            return;
        }
        const lastId = todos.length > 0 ? todos[todos.length - 1].id : -1; // todos에 값이 있다면 그 마지막 값의 id를, 없다면 -1을 부여.
        const nextId = lastId + 1;
        this.setState({
            todos: todos.concat({ // react에서는 상태를 직접 수정하거나 변경하면 안되고 새로운 상태를 생성해야 하기에 concat으로 새로운 배열을 반환하는 방식을 사용, 이러한 방식을 사용하면 React가 변경을 감지하고 UI를 업데이트 할 수 있음.
                id: nextId,
                title : inputValue,
                isComplete: false
            })
        });
        const param = {
            "id" : nextId,
            "title": inputValue,
            "isComplete": false
        }
        const data = {
            body: JSON.stringify(param),
            headers: { 'Content-Type': 'application/json' },
            method: 'post'
        }//axias
        fetch("/api/posts", data)
            .then(res => {
                if (!res.ok) {
                    throw new Error(res.status);
                } else {
                    return this.handleInitInfo();
                }
            })
            .catch(err => console.log(err));
    }

    handleToggle(id) { // 클릭시 이벤트
        const { todos } = this.state;
        const selectedTodo = todos.find(todo => todo.id === id);
        this.openModal(selectedTodo);
    }

    // 수정 메소드
    handleUpdate(id, title, content) {
        const { todos } = this.state;
        const updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                return {
                    ...todo,
                    title : title,
                    content: content
                };
            }
            return todo;
        });
        this.setState({
            todos: updatedTodos
        });
        // API 호출
        const param = {
            "id" : id,
            "title" : title,
            "content" : content
        }
        const data = {
            body: JSON.stringify(param),
            headers: { 'Content-Type': 'application/json' },
            method: 'put'
        }//axias
        fetch("/api/posts",id, data)
            .then(res => {
                if (!res.ok) {
                    throw new Error(res.status);
                } else {
                    return this.handleInitInfo();
                }
            })
            .catch(err => console.log(err));
    }

    handleRemove(id) { // 삭제 이벤트
        const { todos } = this.state;
        const removeContent = todos.find(todo => todo.id === id).title;
        if (!window.confirm("'" + removeContent + "' 을 삭제하시겠습니까?")) {
            return;
        }
        this.setState({
            todos: todos.filter(todo => todo.id !== id)
        });
        const data = {
            headers: { 'Content-Type': 'application/json' },
            method: 'delete'
        }
        fetch("http://localhost:8080/api/posts/" + id, data)
            .then(res => {
                if (!res.ok) {
                    throw new Error(res.status);
                } else {
                    return this.handleInitInfo();
                }
            })
            .catch(err => console.log(err));
    }

    openModal(selectedTodo) { // 모달 오픈
        console.log('Open Modal', selectedTodo);
        this.setState({
            showModal: true,
            selectedTodo: selectedTodo
        });
    }

    closeModal() { // 모달 닫기
        this.setState({
            showModal: false,
            selectedTodo: null
        });
    }

    render() {
        return (
            <div>
                <TodoListTemplate form={(
                    <Form
                        onCreate={this.handleCreate}
                    />
                )}>
                    <CardsG
                        todos={this.state.todos}
                        onToggle={this.handleToggle}
                        onRemove={this.handleRemove}
                        openModal={this.openModal}
                    />
                </TodoListTemplate>
                {this.state.showModal && (
                    <Detail
                        selectedTodo={this.state.selectedTodo}
                        onUpdate={this.handleUpdate}
                        onClose={this.closeModal}
                    />
                )}
            </div>
        );
    }
}

export default App;
