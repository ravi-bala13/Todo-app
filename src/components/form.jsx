import { useEffect, useState } from "react"
import { nanoid } from "nanoid"
import styled from "styled-components"

const Each_task = styled.div`
    // background-color: ;
`

export const Form = () => {
    const [t_status, setT_status] = useState("false")
    const [task, setTask] = useState({
        title: "",
        status: ""
    })

    // useEffect({

    // },[])

    const [t_list, setT_list] = useState([])
    // console.log('t_list:', t_list)

    const changeHandler = (e) => {
        setTask({
            title: e.target.value,
            status: "false"
        })
        // console.log('Task:', task)
        
    }

    const handleDelete = (key) =>{
        
        
        let temp = t_list.filter((item, i) => {
            return i !== key-1;            
        })

        setT_list(temp)
    }
    
    const handleToggle = (key) =>{
                
        t_list.forEach((item, i) => {
            if(i == key-1){
                
                item.status = item.status == "true" ? "false" : "true";
                let temp = item.status == "true" ? "false" : "true";
                setT_status(temp)
                // setT_list(t_status)
                // console.log('key:', item.status)
            }
      
            
        })
        let temp = t_list;
        // console.log('temp:', temp)
        setT_list(temp);

        
        
    }

    const submit = (e) =>{
        e.preventDefault()
        var tem = t_list
        tem.push(task)
        setT_list(tem)
        setTask({
            title: "",
            status: ""
        })


    }

    return <div className="App">
        <form action="">
            <input onChange={changeHandler} type="text" value={task.title}  placeholder="Enter task"/>
            <input onClick={submit} type="submit" />
        </form>

        <div>
        {/* <Each_task> */}
            <table>
                <thead>
                    <tr>
                        <td>S.NO</td>
                        <td>Title</td>
                        <td>Status</td>
                        <td></td>
                    </tr>
                </thead>
                
                <tbody>
                    {t_list.map((e, i) => (                                
                        <tr className="each-task">
                            <td>{i+1}</td>
                            <td>{e.title}</td>
                            <td><button onClick={() => handleToggle(i+1)}>{e.status}</button></td>
                            <td><button onClick={() => handleDelete(i+1)}>Delete</button></td>
                        </tr>    
                          
                    ))}
                </tbody>
                
                
                
            </table>
            {/* </Each_task> */}
        </div>


    </div>
}