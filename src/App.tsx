 import React from 'react';
 import {Switch, Route} from "react-router";

 import LogIn from './components/LogIn/LogIn';

function  App(){
    return(
        <main>
            <Switch>
                <Route path='/' component={LogIn} />

            </Switch>
        </main>
    )
 }

 export default App