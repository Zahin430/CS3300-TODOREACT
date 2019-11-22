import React from "react";
import TodoItem from "../Todo-Item/Todo-Item";
import todosData from "../Todo-Data/Todo-Data";
import AddTodo from "../Add-Todo/Add-Todo";
import Alert from "../Alert/Alert";
import "./Main-Content.styles.scss";
import { Summary } from "../Summary/Summary";
import { format, isToday, isTomorrow, isThisWeek, isThisYear } from "date-fns";

import { MenuTodos } from "../MenuTodos/MenuTodos";
// import DateFilter from "../Todo/DateFilter/DateFilter";

class MainContent extends React.Component {
  constructor(props) {
    super(props);
    // State initialized here for todosData and Alert
    this.state = {
      todos: todosData,
      alert: null,
      today: false,
      tommorow: false
    };
  }

  // Update state so that the item with the given id flips changes from false to true
  // HandleChange function changes the state takes in previous state
  // Maps the todo my checking if id matches and then change the bool in complete in todo array
  handleChange = id => {
    this.setState(prevState => {
      const updatedTodos = prevState.todos.map(todo => {
        if (todo.id === id) {
          //spread operator
          return {
            ...todo,
            completed: !todo.completed
          };
        }
        return todo;
      });
      return {
        todos: updatedTodos // Sets todos as updated todos
      };
    });
  };

  // Adds Todo
  // Takes last object's id from the todos array in oldid
  // Increments it by 1
  // Creates new todo objet with id as newid, text from the state and completed default as false
  addTodo = (text, date, urgentLevel) => {
    let oldid = this.state.todos[this.state.todos.length - 1].id;
    let newid = oldid + 1;
    const newTodo = {
      id: newid,
      text: text,
      date: date,
      urgentLevel: urgentLevel,
      completed: false
    };
    // Sets State with todos as previous todos and then adding the new todo in the last of the array
    this.setState({ todos: [...this.state.todos, newTodo] });
  };

  // Deletes Todos
  // Sets state by using spread operator and then uses the filter function to check if the id of todo is of the current id
  deleteTodo = id => {
    this.setState({
      todos: [...this.state.todos.filter(todo => todo.id !== id)]
    });
  };

  // Sets alert when empty input field is submitted
  setAlert = msg => {
    // Sets state with the message passed into alert state
    this.setState({
      alert: { msg }
    });

    // Removes the alert component by setting it to null after 4 seconds
    setTimeout(() => {
      this.setState({ alert: null });
    }, 4000);
  };

  render() {
    // Destructuring the state
    const { todos, alert } = this.state;

    const todoItems = todos.map(item => (
      <TodoItem
        key={item.id}
        handleChange={this.handleChange}
        item={item}
        deleteTodo={this.deleteTodo}
      />
    ));

    const laterItems = todos.map(item => {
      if (isToday(item.date) === true) {
        return (
          <TodoItem
            key={item.id}
            handleChange={this.handleChange}
            item={item}
            deleteTodo={this.deleteTodo}
          />
        );
      } else if (isTomorrow(item.date) === true) {
        return (
          <TodoItem
            key={item.id}
            handleChange={this.handleChange}
            item={item}
            deleteTodo={this.deleteTodo}
          />
        );
      }
    });

    return (
      <div className="todo-list">
        <div className="row">
          <div className="col-md">
            <MenuTodos />{" "}
          </div>
          <div style={{ display: "flex" }}>
            <div className="summary">
              <h4>SUMMARY</h4>
              <Summary todos={todos} />
            </div>
            <div className="col-md todo">
              <Alert alert={alert} />
              <AddTodo addTodo={this.addTodo} setAlert={this.setAlert} />
              {todoItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MainContent;
