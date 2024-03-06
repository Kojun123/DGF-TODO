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
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        this.handleInitInfo();
    }

    handleInitInfo() {
        fetch("/api/posts")
            .then(res => res.json())
            .then(todos => this.setState({ todos: todos }))
            .catch(err => console.log(err));
    }

    handleCreate(inputValue) {
        const { todos } = this.state;
        if (inputValue === "") {
            alert("오늘 할 일을 입력해주세요!");
            return;
        }
        const lastId = todos.length > 0 ? todos[todos.length - 1].id : -1;
        const nextId = lastId + 1;
        this.setState({
            todos: todos.concat({
                id: nextId,
                content: inputValue,
                isComplete: false
            })
        });
        const param = {
            "content": inputValue,
            "isComplete": false
        }
        const data = {
            body: JSON.stringify(param),
            headers: { 'Content-Type': 'application/json' },
            method: 'post'
        }
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

    handleToggle(id) {
        const { todos } = this.state;
        const selectedTodo = todos.find(todo => todo.id === id);
        this.openModal(selectedTodo);
    }

    handleRemove(id) {
        const { todos } = this.state;
        const removeContent = todos.find(todo => todo.id === id).content;
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

    openModal(selectedTodo) {
        this.setState({
            showModal: true,
            selectedTodo: selectedTodo
        });
    }

    closeModal() {
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
                        onClose={this.closeModal}
                    />
                )}
            </div>
        );
    }
}

export default App;
