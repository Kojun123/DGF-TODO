import React from 'react';
import TodoListTemplate from './components/js/TodoListTemplate';
import Form from './components/js/Form';
import TodoItemList from './components/js/TodoItemList';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from "react-bootstrap";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            todos : [

            ]
        }
        // this.handleChange = this.handleChange.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        // this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleInitInfo = this.handleInitInfo.bind(this);
    }


    componentDidMount() {
        this.handleInitInfo()
    }


    handleInitInfo() {
        fetch("/api/posts")
            .then(res => res.json())
            .then(todos => this.setState({todos : todos}))
            .catch(err => console.log(err))
    }


    // *** Form.js 에서 Hook(useState) 사용으로 인해 제거
    // input 값 변경
    // handleChange(event) {
    //     this.setState({
    //         input: event.target.value
    //     });
    // }


    // *** Form.js 에서 Hook(useState) 사용으로 인해 state 에서 input 을 제외하고
    // parameter 로 받는다.
    // 등록
    handleCreate(inputValue) {
        const { todos } = this.state;
        if (inputValue === "") {
            alert("오늘 할 일을 입력해주세요!");
            return;
        }

        // 마지막 할 일의 id 값 가져오기
        const lastId = todos.length > 0 ? todos[todos.length - 1].id : -1;
        // 다음 id 값 설정
        const nextId = lastId + 1;

        // 화면에서 먼저 변경사항을 보여주는 방법으로 이용
        this.setState({
            // input: "",
            // concat 을 사용하여 배열에 추가
            todos: todos.concat({
                id: nextId,
                content: inputValue,
                isComplete: false
            })
        });

        const param = {
            "content" : inputValue
            ,"isComplete" : false
        }

        // 처리
        const data = {
            body: JSON.stringify(param),
            headers: {'Content-Type': 'application/json'},
            method: 'post'
        }
        console.log('save보낼 data', data);
        fetch("/api/posts", data)
            .then(res => {
                if(!res.ok) {
                    throw new Error(res.status);
                } else {
                    return this.handleInitInfo();
                }
            })
            .catch(err => console.log(err));
    }


    // *** Form.js 에서 Hook(useState) 사용으로 인해 제거
    // Enter Key 이벤트
    // handleKeyPress(event) {
    //     if (event.key === "Enter") {
    //         this.handleCreate();
    //     }
    // }


    // 수정
    handleToggle(id) {
        const { todos } = this.state;

        const isComplete = todos.find(todo => todo.id === id).isComplete;
        if(!window.confirm(isComplete ? "미완료 처리 하시겠습니까?" : "완료 처리 하시겠습니까?")) {
            return;
        }

        // 파라미터로 받은 id 를 가지고 몇 번째 아이템인지 찾는다.
        const index = todos.findIndex(todo => todo.id === id);

        // 선택한 객체를 저장한다.
        const selected = todos[index];

        // 배열을 복사한다.
        const nextTodos = [...todos];

        // 기존의 값을 복사하고 isComplete 값을 덮어쓴다.
        nextTodos[index] = {
            ...selected,
            isComplete : !selected.isComplete
        };

        this.setState({
            todos : nextTodos
        });

        const param = {
            isComplete : !isComplete
        }

        const data = {
            body : JSON.stringify(param),
            headers: {'Content-Type':'application/json'},
            method: 'put'
        }
        console.log('UPDATE DATA', data);
        fetch("/api/posts/"+id, data)
            .then(res => {
                if(!res.ok) {
                    throw new Error(res.status);
                } else {
                    return this.handleInitInfo();
                }
            })
            .catch(err => console.log(err));
    }


    // 삭제
    handleRemove(id) {
        const { todos } = this.state;

        const removeContent = todos.find(todo => todo.id === id).content;
        if(!window.confirm("'" + removeContent + "' 을 삭제하시겠습니까?")) {
            return;
        }

        this.setState({
            todos : todos.filter(todo => todo.id !== id)
        });

        const data = {
            headers: {'Content-Type':'application/json'},
            method: 'delete'
        }
        fetch("http://localhost:8080/api/posts/" + id, data)
            .then(res => {
                if(!res.ok) {
                    throw new Error(res.status);
                } else {
                    return this.handleInitInfo();
                }
            })
            .catch(err => console.log(err));
    }


    render() {
        return (
            <TodoListTemplate form={(
                <Form
                    // *** Form.js 에서 Hook(useState) 사용으로 인해 제거
                    // value={this.state.input}
                    // onChange={this.handleChange}
                    // onCreate={this.handleCreate}
                    // onKeyPress={this.handleKeyPress}
                    onCreate={this.handleCreate}
                />
            )}>
                <TodoItemList
                    todos={this.state.todos}
                    onToggle={this.handleToggle}
                    onRemove={this.handleRemove} />
                <Button variant="primary">Boot strap</Button>
            </TodoListTemplate>
        );
    }
}

export default App;