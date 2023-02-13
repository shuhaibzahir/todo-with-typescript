import React, { useState } from "react";
import "./App.css";
import CreateTask from "./components/CreateTask";
import { TaskType } from "./models";
import TodoList from "./components/TodoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
const App: React.FC = () => {
  const todoJson = localStorage.getItem("todo") ? JSON.parse(localStorage.getItem("todo") || ""): []
  const doneTasksJosn = localStorage.getItem("doneTasks") ? JSON.parse(localStorage.getItem("doneTasks") || ""): []
  const [todo, setTodo] = useState<TaskType[]>(todoJson);
  const [doneTasks, setDoneTasks] = useState<TaskType[]>(doneTasksJosn);
  const completeHandle = (
    destinationIndex: number,
    sourceIndex: number,
    task: TaskType
  ) => {
    setDoneTasks((prev: TaskType[]) => {
      prev.splice(destinationIndex || 0, 0, { ...task, isDone: true });
      localStorage.setItem("doneTasks",JSON.stringify(prev))
      return prev;
    });
    setTodo((prev: TaskType[]) => {
      prev.splice(sourceIndex || 0, 1);
      localStorage.setItem("todo",JSON.stringify(prev))
      return prev;
    });
  };
  const nonCompleteHandle = (
    destinationIndex: number,
    sourceIndex: number,
    task: TaskType
  ) => {
    setDoneTasks((prev: TaskType[]) => {
      prev.splice(sourceIndex || 0, 1);
      localStorage.setItem("doneTasks",JSON.stringify(prev))
      return prev;
    });
    setTodo((prev: TaskType[]) => {
      prev.splice(destinationIndex || 0, 0, { ...task, isDone: false });
      localStorage.setItem("todo",JSON.stringify(prev))
      return prev;
    });
  };
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    if (
      result.destination.droppableId === result.source.droppableId &&
      result.destination.index === result.source.index
    ) {
      return;
    }
    if (
      result.destination?.droppableId === "TodoCompletedList" &&
      result.source.droppableId === "TodoList"
    ) {
      completeHandle(
        result.destination.index,
        result.source.index,
        todo[result.source.index]
      );
    } else if (
      result.destination?.droppableId === "TodoList" &&
      result.source.droppableId === "TodoCompletedList"
    ) {
      nonCompleteHandle(
        result.destination.index,
        result.source.index,
        doneTasks[result.source.index]
      );
    } else {
      if (result.source.droppableId === "TodoCompletedList") {
        const task = doneTasks[result.source.index]
        doneTasks.splice(result.source.index || 0, 1);
        doneTasks.splice(result.destination?.index || 0, 0, task);
        localStorage.setItem("doneTasks",JSON.stringify(doneTasks))
        setDoneTasks(doneTasks);
      } else {
        const task = todo[result.source.index]
        todo.splice(result.source.index || 0, 1);
        todo.splice(result.destination?.index || 0, 0, task);
        localStorage.setItem("todo",JSON.stringify(todo))
        setTodo(todo);
      }
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="main-container">
        <div className="heading-container">
          <h3 className="heaing">Time Booster</h3>
          <CreateTask setTodo={setTodo} />
        </div>
        <p className="info">Here, you can either drag and drop tasks to complete or vice versa.</p>
        <TodoList
          todo={todo}
          setTodo={setTodo}
          doneTasks={doneTasks}
          setDoneTasks={setDoneTasks}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
