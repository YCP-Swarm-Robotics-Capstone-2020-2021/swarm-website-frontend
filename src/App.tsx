import React from 'react';
import {Switch, Route} from "react-router";


import LogIn from './components/LogIn/LogIn';
import Wiki from './components/Wiki/Wiki';
import HomePage from "./components/Home/HomePage";
import Error from './components/Error/Error';
import SignUp from "./components/SignUp/SignUp";
import PersonalPage from './components/PersonalPage/PersonalPage';
import WikiNotFound from './components/Wiki/WikiNotFound/WikiNotFound';
import Dog from './components/Dog/Dog';
import Visualization from "./components/Visualization/Visualization";
import Runs from "./components/Runs/Runs";

function  App(){
    return(
        <main>
            <Switch>
                <Route path='/' component={LogIn} exact/>
                <Route path='/wiki/:id' component={Wiki} />
                <Route path='/wikinotfound' component={WikiNotFound}/>
                <Route path='/home' component={HomePage} exact/>
                <Route path='/signup' component={SignUp}/>
                <Route path='/personalpage' component={PersonalPage} exact/>
                <Route path='/visualization' component={Visualization}/>
                <Route path='/dog' component={Dog} exact/>
                <Route path='/runs' component={Runs} />
                <Route component={Error} />
            </Switch>
        </main>
    )
 }

 export default App