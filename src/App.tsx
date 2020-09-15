 import React from 'react';
 import {Switch, Route} from "react-router";

 import LogIn from './components/LogIn/LogIn';
 import HomePage from "./components/Home/HomePage";
import Error from './components/Error/Error';
 import SignUp from "./components/SignUp/SignUp";

function  App(){
    return(
        <main>
            <Switch>
                <Route path='/' component={LogIn} exact/>
                <Route path='/home' component={HomePage} exact/>
                <Route path='/signUp' component={SignUp}/>
                <Route component={Error} />
            </Switch>
        </main>
    )
 }

 export default App