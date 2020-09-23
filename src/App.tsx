import React from 'react';
import {Switch, Route} from "react-router";


import LogIn from './components/LogIn/LogIn';
import Wiki from './components/Wiki/Wiki';
import HomePage from "./components/Home/HomePage";
import Error from './components/Error/Error';
<<<<<<< HEAD
 import SignUp from "./components/SignUp/SignUp";
=======
import PersonalPage from './components/PersonalPage/PersonalPage';
>>>>>>> 037dc9cf85889aaef926a378a857826570e5281a

function  App(){
    return(
        <main>
            <Switch>
                <Route path='/' component={LogIn} exact/>
                <Route path='/wiki/:id' component={Wiki} />
                <Route path='/home' component={HomePage} exact/>
<<<<<<< HEAD
                <Route path='/signUp' component={SignUp}/>
=======
                <Route path='/personalpage' component={PersonalPage} exact/>
>>>>>>> 037dc9cf85889aaef926a378a857826570e5281a
                <Route component={Error} />
            </Switch>
        </main>
    )
 }

 export default App