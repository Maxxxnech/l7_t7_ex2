import React, { PureComponent } from "react";
import Task from "./Task";
import "./css/TaskList.css";

export default class TaskList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { tasks: [] };
    this.inputRef = React.createRef();
    this.addTask = this.addTask.bind(this);
    this.remTask = this.remTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
  }
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((data) => data.json())
      .then((data) => {
        data = data.slice(0, 7);
        this.setState({ tasks: data });
      });
  }

  render() {
    return (
      <div>
        <ul>
          {this.state?.tasks?.map((task) => (
            <Task key={task.id} {...task} clickHandler={this.updateTask}/>
          ))}
        </ul>
        <div className="menu">
          <div>
            <label htmlFor="taskInput">Новая задача: </label>
            <input id="taskInput" type="text" ref={this.inputRef} placeholder="Abeunt studia in mores"></input>
            <button onClick={this.addTask}>Добавить</button>
          </div>
          <button onClick={this.remTask}>Удалить последнюю задачу</button>
        </div>
      </div>
    );
  }
  addTask() {
    const title = this.inputRef.current.value;
    if (!title) {
      this.inputRef.current.focus();
      return;
    }
    this.setState((prevState) => ({
      tasks: [
        ...prevState.tasks,
        { id: prevState.tasks.length + 1, title, completed: false },
      ],
    }));
    this.inputRef.current.value = "";
  }

  remTask() {
    this.setState((prevState) => ({
      tasks: prevState.tasks.slice(0, prevState.tasks.length - 1),
    }));
  }

  updateTask(id) {
    this.setState((prevState) => ({
        tasks: prevState.tasks.map(task => task.id === id? {...task, completed: !task.completed} : task),
      }));
  }
}
