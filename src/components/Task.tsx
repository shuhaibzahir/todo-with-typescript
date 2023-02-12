import React, { useRef, useState } from 'react'
import { TaskType } from '../models'
import {MdModeEditOutline, MdDelete} from 'react-icons/md'
import {IoMdDoneAll} from 'react-icons/io'
import {TiTick} from 'react-icons/ti'
interface Props{
    task: TaskType,
    setTodo:React.Dispatch<React.SetStateAction<TaskType[]>>,
    setDoneTasks:React.Dispatch<React.SetStateAction<TaskType[]>>
}
const Task = ({task, setTodo, setDoneTasks}:Props) => {
    const [edit,setEdit] = useState<Boolean>(false)
    const inputTask:React.Ref<any> = useRef(null)
    const [editTask, setEditTask] = useState(task)
    const handlSave: Function = ():void => {
        setEdit(false)
        setTodo((prev: TaskType[]) => prev.map((task:TaskType)=> task.id === editTask.id ? editTask : task ))
    }
    const handleEdit = () =>{
        inputTask.current?.focus();
        setEdit(true)
    }

    const handleDelete = () =>{
        setTodo((prev: TaskType[])=> prev.filter((task: TaskType)=> task.id !== editTask.id))
    }

    const handleDone = () => {
        setDoneTasks((prev: TaskType[]) => [...prev, {...task,isDone: true}])
        handleDelete()
    }
  return (
    <div className='task'>
        <input ref={inputTask} value={editTask.title} readOnly={!edit} 
        onChange={(e) =>{ setEditTask({...editTask, title: e.target.value})}}/>
        {
            edit ? <TiTick className='button' onClick={()=>{handlSave()}}/> : <MdModeEditOutline className='button' 
                onClick={()=>{
                    handleEdit()
                }}/>
        }
        <MdDelete className='button' onClick={()=>{handleDelete()}}/>
        {
            !task.isDone ? <span className='button round' onClick={() => {handleDone()}}>
            <IoMdDoneAll/>
            </span> : ""
        }

    </div>
  )
}
 
export default Task