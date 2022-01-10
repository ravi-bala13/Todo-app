import React, {useState} from 'react'
import TodoForm from './TodoForm'
import {RiCloseCircleLine} from 'react-icons/ri'
import {TiEdit} from 'react-icons/ti'
import {nanoid} from 'nanoid'

function Todo({todos, completeTodo, removeTodo, updateTodo}) {
    const [edit, setEdit] = useState({
        id:null,
        value: '',
        // isComplete: false
    })

    const submitUpdate = value => {
        updateTodo(edit.id, value)
        setEdit({
            id: null,
            value: '',
            // isComplete: false
        })
    }

    if(edit.id){
        return <TodoForm edit={edit} onSubmit={submitUpdate} />
    }

    return todos.map((todo) => (
        <div className={todo.isComplete ? 'todo-row complete' : 'todo-row'} key={nanoid()}>

            <div key={todo.id} onClick={() => completeTodo(todo.id)}>
                {todo.text}
            </div>
            <div className='icons'>
                <RiCloseCircleLine onClick={() => removeTodo(todo.id)} className='delete-icon'/>
                <TiEdit onClick={() => setEdit({id: todo.id, value: todo.text})} className='edit-icon'/>
            </div>

        </div>
    ))
}

export default Todo
