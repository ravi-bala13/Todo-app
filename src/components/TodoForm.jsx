import { nanoid } from 'nanoid';
import React, {useState, useEffect, useRef} from 'react'


function TodoForm(props) {
    const [input, setInput] = useState(props.edit ? props.edit.value : '')

    const inputRef = useRef(null)

    useEffect(() => {
        inputRef.current.focus()
    })

    const handleChange = e =>{
        setInput(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault();

        props.onSubmit({
            id: nanoid(4),
            text: input
        })

        setInput('')
    }

    return (
        <div>
            
            <form onSubmit={handleSubmit} className='todo-form'>
                {props.edit ? (
                    <>
                        <input 
                            type="text"
                            placeholder='Update todo'
                            value={input}
                            name='text'
                            className='todo-input edit'
                            onChange={handleChange}
                            ref={inputRef}
                        />
                        <button className='todo-button'>update</button>
                    </>
                    ) :
                    (
                        <>
                            <input 
                                type="text"
                                placeholder='Add todo'
                                value={input}
                                name='text'
                                className='todo-input'
                                onChange={handleChange}
                                ref={inputRef}
                            />
                            <button className='todo-button'>Add</button>
                        </>
                    )
                }
            </form>

        </div>
    )
}

export default TodoForm
