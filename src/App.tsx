import React from 'react';
import {Switch, Route} from "react-router";


import LogIn from './components/LogIn/LogIn';
import Wiki from './components/Wiki/Wiki';
import HomePage from "./components/Home/HomePage";
import Error from './components/Error/Error';
import PersonalPage from './components/PersonalPage/PersonalPage';

function  App(){
    return(
        <main>
            <Switch>
                <Route path='/' component={LogIn} exact/>
                <Route path='/wiki/:id' component={Wiki} />
                <Route path='/home' component={HomePage} exact/>
                <Route path='/personalpage' component={PersonalPage} exact/>
                <Route component={Error} />
            </Switch>
        </main>
    )
 }

 export default App