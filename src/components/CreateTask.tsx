import React, { useState } from 'react'
import { TaskType } from '../models'
interface Props {
  setTodo:React.Dispatch<React.SetStateAction<TaskType[]>>
}
const CreateTask:React.FC<Props> = ({setTodo}) => {
  const [task,setTask] = useState<string>("")
  const handleSubmit: Function = ():void =>{
    const todo: TaskType = {
      id: Date.now(),
      title: task,
      isDone:false,
    }
    if(task.trim()){
      setTodo((prev:TaskType[]) => {
        const newData = [...prev, todo]
        localStorage.setItem("todo",JSON.stringify(newData))
        return newData
      })
    }
    setTask("")

  }
  return (
    <div className='create-task'>
        <input type="text" onKeyDown={(e)=>{e.key === "Enter"  && handleSubmit()}} value={task} onChange={(e)=>{setTask(e.target.value)}}/>
        <button onClick={()=> {handleSubmit()}}>Go</button>
    </div>
  )
}

export default CreateTask