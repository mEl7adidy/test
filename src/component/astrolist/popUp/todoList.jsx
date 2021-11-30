import {useState } from "react";
import ChildCard from "./childCard/ChildCard";
import TodoListChild from "./childCard/todoListChild";

const TodoList = ({ todos, removeTodo,card }) => {
  const [showChild, setshowChild] = useState(false);

  const [width, setWidth] = useState(0);
  const [todosChild, settodosChild] = useState(
    JSON.parse(localStorage.getItem(`tasks-${card.id}`)) || []
  );
  const [tdId, setTdId] = useState();
  // const [res, setRes] = useState([]);

  const addTodoChild = (todo,id) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
    const newTodos = [todo, ...todosChild];
    localStorage.setItem(`tasks-${todo.id}`, JSON.stringify(newTodos));
    settodosChild(JSON.parse(localStorage.getItem(`tasks-${todo.id}`)));
    console.log(todo.id,"todo",id,"idddd");
  };
  const completeTodoChild = (resIndex,id,bIndex) => {
    let updatedTodos = todosChild.map((todo, index) => {
      if (index === resIndex) {
        todo.isComplete = !todo.isComplete;
        // bug
        const completed = JSON.stringify(todosChild).match(/true/g);
        console.log("1111111");
        console.log(`${index} of map`, resIndex + " coming from resindex",bIndex +' the bindex')
        if (completed && index === resIndex&& todo.id===id) {
          localStorage.setItem(`progressbar${todo.id}`,(completed.length / todosChild.length) * 100)
          setWidth(localStorage.getItem(`progressbar${todo.id}`));
          
          console.log("2222222");
        } else {
          setWidth(0);
          console.log("33333");
        }
      }
      console.log("4444");
      return todo;
    });

    localStorage.setItem(`compeletedTask-${resIndex}`, JSON.stringify(updatedTodos));
    settodosChild(updatedTodos);
  };

  const removeTodoChild = (resIndex) => {
    const removedArr = [...todosChild].filter((todo, index, arr) => {
      const completed = localStorage.getItem(`compeletedTask-${resIndex}`).match(/true/g);
      if (completed) {
        setWidth((completed.length / arr.length) * 100);
      } else {
        setWidth(0);
      }
      return resIndex !== index;
    });

    settodosChild(removedArr);
    localStorage.setItem(`tasks-${resIndex}`, JSON.stringify(removedArr));
  };
  return todos.map((todo, index) => (
    <div key={index}>
      <div className="list-child border py-4 px-3 mb-3 shadow-sm">
        <div key={todo.id}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-check2-square"
                  viewBox="0 0 16 16"
                >
                  <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z" />
                  <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
                </svg>
                <span className="ms-2">{todo.text}</span>
              </div>
            </div>
            <div>
              <span className="clear-icon" onClick={() => removeTodo(todo.id)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-x-lg"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"
                  />
                  <path
                    fillRule="evenodd"
                    d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"
                  />
                </svg>
              </span>
            </div>
          </div>
          <span>{width} %</span>
          <div className="progress w-100 mb-3" style={{ height: "10px" }}>
            <div
              className="progress-bar bg-info"
              role="progressbar"
              style={{ width: `${width}%`, height: "10px" }}
              aria-valuenow="50"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>

          <div className="row">
            <TodoListChild
              todos={todosChild}
              todoID={todo.id}
              bIndex={index}
              completeTodoChild={completeTodoChild}
              removeTodoChild={removeTodoChild}
            />
          </div>
        </div>

        <div className="d-flex justify-content-between">
          <button
            className="btn btn-primary"
            id={todo.id}
            type="button"
            onClick={(e) => {
              setTdId(+e.target.id);
              if (+e.target.id === todo.id) {
                setshowChild(true);
              }
            }}
          >
            Add an item
          </button>
        </div>
      </div>
      <ChildCard
        todoChild={todosChild}
        todoID={todo.id}
        tdId={tdId}
        trigger={showChild}
        setTrigger={setshowChild}
        onSubmit={addTodoChild}
      />
    </div>
  ));
};

export default TodoList;
