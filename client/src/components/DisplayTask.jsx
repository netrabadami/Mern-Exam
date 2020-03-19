import React,{useState,useEffect} from 'react'
import axios from 'axios';
import {navigate ,Link} from '@reach/router';
import {Paper,Button } from '@material-ui/core';
import moment from 'moment';

import '../bootstrap.css';
import '../style.css';

const styles = {
    paper: {
        width: "30rem auto", padding: "2rem",marginLeft:"1rem",height:"20rem auto",
        backgroundColor:"lightyellow"
    },
    paper1:{
        width: "20rem", padding: "1rem",marginLeft:"1rem",height:"20rem auto",backgroundColor:"lightgreen"
        ,display:"inline-block",overflow:"scroll"
    },
    paper2:{
        width: "62rem", padding: "1rem",marginLeft:"1.9rem",marginBottom:"1rem",height:"3rem ",backgroundColor:"lightgreen"
        ,display:"block",marginTop:"1rem"
    },
    input: {
        marginBottom: "1rem",margin: "0.5rem",width:"20rem"
    },
    button: {
        width: "100%",color:"white"
    },

}

const DisplayTask = props => {
    const [tasks, setTasks] = useState([])
    const [updatedList, setUpdatedList] = useState(false);

    useEffect(() =>{
        axios.get("http://localhost:8000/api/task/")
        .then(res => setTasks(res.data))
        .catch(error=>console.log(error))
    },[updatedList])

    const onClickHandler = (e,task,action) =>{
        console.log("in on click")
        e.preventDefault();
        const taskList = {...task}
        taskList.taskStatus = action
        axios.put(`http://localhost:8000/api/task/${task._id}`, taskList)
        .then(res => setUpdatedList(!updatedList))
        .catch(err => console.log(err))
    }

    const deleteHandler = (e,taskComplete) =>{
        console.log("in delete")
        e.preventDefault();
        axios.delete(`http://localhost:8000/api/task/${taskComplete._id}`)
        .then(res => setUpdatedList(!updatedList))
        .catch(err => console.log(err))
    }
    return(
        <div className="container-fluid">
            <h1>Project Management</h1>
            <Paper elevation={5} style={styles.paper}>               
                <Paper elevation={7} style={styles.paper1}>
                    <div className="header">
                        <h4>BackLog</h4>
                    </div>
                    <div className="tabOne">
                        {
                            tasks.map((task,i) =>(                                
                                <div key={i}>
                                    {task.taskStatus === "pending" ?
                                        <div className="task">
                                            <h5 style={{fontWeight:"bold"}}> {task.taskName} </h5>
                                            <p style={{color: new Date(task.taskDate).getTime() - new Date().getTime() < 0 ? 'red' : 'black'}}>
                                                Due: {moment.utc(task.taskDate).format("MM/DD/YYYY")}</p>
                                            <Button type="submit" variant="contained" color="secondary" onClick={e=>onClickHandler(e,task,"active")}>Start Project</Button>  
                                        </div>:""

                                    }
                                </div>
                            ))
                        }
                    </div>
                    
                </Paper>
                <Paper elevation={7} style={styles.paper1}>
                    <div className="header1">
                        <h4>In Progress</h4>
                    </div>
                    <div className="tabOne">
                        {
                            tasks.map((task,i) =>(
                                <div key={i}>
                                    {task.taskStatus === "active" ?
                                        <div className="task">
                                            <h5 style={{fontWeight:"bold"}}> {task.taskName} </h5>
                                            <p style={{color: new Date(task.taskDate).getTime() - new Date().getTime() < 0 ? 'red' : 'black'}}>
                                                Due: {moment.utc(task.taskDate).format("MM/DD/YYYY")}</p>
                                            <Button type="submit"  variant="contained" color="secondary" onClick={(e) =>onClickHandler(e,task,"completed")}>Completed</Button> 
                                        </div>:""
                                    }
                                </div>
                            ))
                        }
                    </div>
                </Paper>
                <Paper elevation={7} style={styles.paper1}>
                    <div className="header2">
                        <h4>Completed</h4>
                    </div>
                    <div className="tabOne">
                        {
                            tasks.map((taskComplete,i) =>(
                                <div key={i}>
                                    {taskComplete.taskStatus === "completed" ?
                                        <div className="task">
                                            <h5 style={{fontWeight:"bold"}}>  {taskComplete.taskName} </h5>
                                            <p style={{color: new Date(taskComplete.taskDate).getTime() - new Date().getTime() < 0 ? 'red' : 'black'}}>
                                                Due: {moment.utc(taskComplete.taskDate).format("MM/DD/YYYY")}</p>
                                            <Button type="submit" onClick={(e) =>deleteHandler(e,taskComplete)} variant="contained" color="secondary">Remove Task</Button>
                                        </div>:""

                                    }
                                </div>
                            ))
                        }
                    </div>
                </Paper>
                <Paper elevation={7} style={styles.paper2}>
                    <h5><Link to="/create"> Add New Project </Link></h5>
                </Paper>
            </Paper>
        </div>
    )
//end of file    
}

export default DisplayTask;