import React, { useState } from "react";
import "./App.css";
import CreateTask from "./components/CreateTask";
import Task from "./components/Task";
import { TaskType } from "./models";

const App: React.FC = () => {
  const [todo, setTodo] = useState<TaskType[]>([]);
  const [doneTasks, setDoneTasks] = useState<TaskType[]>([]);
  return (
    <div className="main-container">
      <div className="heading-container">
        <h3 className="heaing">Taskify</h3>
        <CreateTask setTodo={setTodo} />
      </div>
      <div className="task-section">
        <div className="tasks-container">
          <h3 className="sub-heading">Tasks to finish</h3>
          {todo.length ? (
            todo.map((task: TaskType) => (
              <Task
                key={task.id}
                setDoneTasks={setDoneTasks}
                setTodo={setTodo}
                task={task}
              />
            ))
          ) : (
            <span className="sub-heading">No tasks here</span>
          )}
        </div>

        <div className="tasks-container">
          <h3 className="sub-heading">Finished Tasks</h3>
          {doneTasks.length ? (
            doneTasks.map((task: TaskType) => (
              <Task
                setDoneTasks={setDoneTasks}
                key={task.id}
                setTodo={setDoneTasks}
                task={task}
              />
            ))
          ) : (
            <span className="sub-heading">No tasks here</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
