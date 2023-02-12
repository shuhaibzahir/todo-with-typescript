import React, { useState } from "react";
import "./App.css";
import CreateTask from "./components/CreateTask";
import { TaskType } from "./models";
import TodoList from "./components/TodoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
const App: React.FC = () => {
  const [todo, setTodo] = useState<TaskType[]>([]);
  const [doneTasks, setDoneTasks] = useState<TaskType[]>([]);
  const completeHandle = (
    destinationIndex: number,
    sourceIndex: number,
    task: TaskType
  ) => {
    setDoneTasks((prev: TaskType[]) => {
      prev.splice(destinationIndex || 0, 0, { ...task, isDone: true });
      return prev;
    });
    setTodo((prev: TaskType[]) => {
      prev.splice(sourceIndex || 0, 1);
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
      return prev;
    });
    setTodo((prev: TaskType[]) => {
      prev.splice(destinationIndex || 0, 0, { ...task, isDone: false });
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
        setDoneTasks(doneTasks);
      } else {
        const task = todo[result.source.index]
        todo.splice(result.source.index || 0, 1);
        todo.splice(result.destination?.index || 0, 0, task);
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
