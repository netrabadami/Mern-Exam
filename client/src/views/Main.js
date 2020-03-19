import React, {useState, useEffect} from 'react';
import { Router, Link } from '@reach/router';
import AddTask from "../components/AddTask";
import DisplayTask from "../components/DisplayTask";


export default () =>{
    return(
        <Router>
            <AddTask path="/create"/>
            <DisplayTask path="/" />
        </Router>
    )

 //End of file   
}

