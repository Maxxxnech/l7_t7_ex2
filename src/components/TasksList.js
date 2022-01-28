import React, { PureComponent } from "react";
import Task from "./Task";
import "./css/TaskList.css";

export default class TaskList extends PureComponent {
  constructor(props) {
    super(props);
    // Для вывода отфильтрованных значений используется массив tasks
    // Для хранения значений используется массив storedData
    // При сокращении строки поиска данные берутся из storedData -> поиск обратимый
    // Добавления /удаления / изменения элементов дублируются в tasks и storedData 
    // Это позволяет искать по новым / измененным элементам
    this.state = { tasks: [], storedData: []};
    this.inputRef = React.createRef();
    this.searchRef = React.createRef();

    this.addTask = this.addTask.bind(this);
    this.remTask = this.remTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.searchTask = this.searchTask.bind(this);
  }
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((data) => data.json())
      .then((data) => {
        data = data.slice(0, 7);
        this.setState({ tasks: data , storedData: data});
      });
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.tasks?.map((task) => (
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
          <label htmlFor="searchInput">Поиск задачи: </label>
          <input id="searchInput" type="text" placeholder="" onChange={this.searchTask}></input>
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
    this.setState((prevState) => {
      const newValue =  [
        ...prevState.tasks,
        { id: prevState.tasks.length + 1, title, completed: false },
      ];
     return {
      tasks: [...newValue],
      storedData: [...newValue]
    }});
    this.inputRef.current.value = "";
  }

  remTask() {
    this.setState((prevState) => {
      const newValue = prevState.tasks.slice(0, prevState.tasks.length - 1);
      return {
        tasks: [...newValue],
        storedData: [...newValue],
    }});
  }

  updateTask(id) {
    this.setState((prevState) => {
      const newValue = prevState.tasks.map(task => task.id === id? {...task, completed: !task.completed} : task)
      return  {
        tasks: [...newValue],
        storedData: [...newValue],
    }});
  }

  searchTask(e){
      const find = e.target.value?.toLowerCase();
      this.setState((prevState) => ({
        tasks: prevState.storedData.filter(task => task.title?.toLowerCase().includes(find)),
      }));
  }
}
