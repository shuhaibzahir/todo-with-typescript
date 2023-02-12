import React from 'react'
import Task from './Task'
import { TaskType } from '../models'
import { Droppable } from 'react-beautiful-dnd'
interface Props{
    todo:TaskType[],
    doneTasks:TaskType[],
    setDoneTasks: React.Dispatch<React.SetStateAction<TaskType[]>>,
    setTodo: React.Dispatch<React.SetStateAction<TaskType[]>>
}
const TodoList: React.FC<Props> = ({todo,setDoneTasks,setTodo, doneTasks}) => {
  return (
    <div className="task-section">
        <Droppable droppableId='TodoList'>
            {
                (provider:any )=><div className="tasks-container" 
                ref={provider.innerRef} 
                {...provider.droppableProps}
                >
                <h3 className="sub-heading">Completion of Outstanding Work</h3>
                {todo.length ? (
                  todo.map((task: TaskType, index:number) => (
                    <Task
                    index={index}
                      key={task.id}
                      setDoneTasks={setDoneTasks}
                      setTodo={setTodo}
                      task={task}
                    />
                  ))
                ) : (
                  <span className="sub-heading">No tasks here</span>
                )}
                {provider.placeholder}
              </div>
            }
    
    </Droppable>
    <Droppable droppableId='TodoCompletedList'>
        {
            (provider:any )=> <div className="tasks-container finished" ref={provider.innerRef} {...provider.droppableProps}>
            <h3 className="sub-heading">Accomplished Assignments</h3>
            {doneTasks.length ? (
              doneTasks.map((task: TaskType, index:number) => (
                <Task
                  index={index}
                  setDoneTasks={setDoneTasks}
                  key={task.id}
                  setTodo={setDoneTasks}
                  task={task}
                />
              ))
            ) : (
              <span className="sub-heading">No tasks here</span>
            )}
            {provider.placeholder}
          </div>
        }
   
    </Droppable>
  </div>
  )
}

export default TodoList