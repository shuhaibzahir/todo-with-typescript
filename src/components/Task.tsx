import React, { useRef, useState } from 'react'
import { TaskType } from '../models'
import {MdModeEditOutline, MdDelete} from 'react-icons/md'
import {IoMdDoneAll} from 'react-icons/io'
import {TiTick} from 'react-icons/ti'
import { Draggable } from 'react-beautiful-dnd'
interface Props{
    index:number;
    task: TaskType;
    setTodo:React.Dispatch<React.SetStateAction<TaskType[]>>;
    setDoneTasks:React.Dispatch<React.SetStateAction<TaskType[]>>
}
const Task = ({task,index, setTodo, setDoneTasks}:Props) => {
    const [edit,setEdit] = useState<Boolean>(false)
    const inputTask:React.Ref<any> = useRef(null)
    const [editTask, setEditTask] = useState(task)
    const handlSave: Function = ():void => {
        setEdit(false)
        setTodo((prev: TaskType[]) => {
            const newData = prev.map((task:TaskType)=> task.id === editTask.id ? editTask : task)
            localStorage.setItem("todo",JSON.stringify(newData))
            return newData
        } )

    }
    const handleEdit = () =>{
        inputTask.current?.focus();
        setEdit(true)
    }

    const handleDelete = (isDone:boolean) =>{
        if(isDone){
            setDoneTasks((prev: TaskType[])=> {
                const newData=  prev.filter((task: TaskType)=> task.id !== editTask.id)
                localStorage.setItem("doneTasks",JSON.stringify(newData))
                return newData
             })
        }else{
            setTodo((prev: TaskType[])=> {
                const newData=  prev.filter((task: TaskType)=> task.id !== editTask.id)
                localStorage.setItem("todo",JSON.stringify(newData))
                return newData
             })
        }

    }

    const handleDone = () => {
        setDoneTasks((prev: TaskType[]) => {
            const newData = [...prev, {...task,isDone: true}]
            localStorage.setItem("doneTasks",JSON.stringify(newData))
            return newData
        })
        handleDelete(false)
    }
  return (
    <Draggable draggableId={task.id.toString()} index={index}>
        {
            ( provider)=>(   <div className={`${edit? 'active-input' :''} task`}    ref={provider.innerRef} 
            {...provider.draggableProps}
            {...provider.dragHandleProps}>
            <input ref={inputTask} value={editTask.title}   readOnly={!edit} 
            onChange={(e) =>{ setEditTask({...editTask, title: e.target.value})}}/>
            {
                edit ? <TiTick className='button' onClick={()=>{handlSave()}}/> : <MdModeEditOutline className='button' 
                    onClick={()=>{
                        handleEdit()
                    }}/>
            }
            <MdDelete className='button' onClick={()=>{handleDelete(true)}}/>
            {
                !task.isDone && !edit? <span className='button round' onClick={() => {handleDone()}}>
                <IoMdDoneAll/>
                </span> : ""
            }
    
        </div>)
        }
 
    </Draggable>
  )
}
 
export default Task