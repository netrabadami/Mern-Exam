import React,{useState,useEffect} from 'react'
import axios from 'axios';
import {navigate} from '@reach/router';
import {FormControl,Paper,InputLabel,OutlinedInput,Button } from '@material-ui/core';
import '../bootstrap.css';
import '../style.css';

const styles = {
    paper: {
        width: "30rem", padding: "2rem",marginLeft:"23.5rem",height:"20rem auto",backgroundColor:"lightyellow"
    },
    input: {
        marginBottom: "1rem",margin: "0.5rem",width:"20rem"
    },
    button: {
        width: "100%"
    },

}

const AddTask = props =>{
    const [taskName, setTaskName] = useState("");
    const [taskDate, setTaskDate] = useState("");
    const [errors, setErrors] = useState({})

    const onSubmitHandler = e => {
        console.log("Inside onSubmitHandler")
        e.preventDefault();
        axios.post(`http://localhost:8000/api/task/create`,{
            taskName,
            taskDate
        })
        .then(res => {
            if(res.data.errors){
                setErrors({
                    taskName:res.data.errors.taskName ? res.data.errors.taskName.message :"",
                    taskDate:res.data.errors.taskDate ? res.data.errors.taskDate.message :""
                })
            } else{
                navigate("/")
            }
        })
        .catch(err => console.log(err))
    }

    return(
        <div className="container-fluid">
            <Paper elevation={5} style={styles.paper}>
                <h4>Add Project</h4>
            {taskName.length > 0 && taskName.length < 3 || taskName.errorName?
            <p className="red">Task must be atleast 3 characters long</p>:<p></p>}
            <p className="red">{errors.taskName}</p>
            <p className="red">{errors.taskDate}</p>
            <form onSubmit={onSubmitHandler}>

                <FormControl variant="outlined" style={styles.input}>
                    <InputLabel>Project</InputLabel>
                    <OutlinedInput type="text" onChange={e => setTaskName(e.target.value)}/>
                </FormControl>
                <FormControl variant="outlined" style={styles.input}>
                    {/* <InputLabel>Task Date</InputLabel> */}
                    <OutlinedInput type="date" onChange={e => setTaskDate(e.target.value)}/>
                    {/* <input placeholder="Date" class="textbox-n" type="text" onfocus="(this.type='date')" onblur="(this.type='text')" id="date" /> */}
                </FormControl>
                <FormControl variant="outlined" style={styles.input}>
                    <Button type="submit" variant="contained" color="secondary">
                        Submit
                    </Button>
                </FormControl>
            </form>
            </Paper>
        </div>
    )
//End of File    
}

export default AddTask;