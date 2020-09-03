import React from 'react';
import './App.css';

//components
import {TextField} from "./components/TextField";
import {Image} from "./components/Image";

//images
const logo = require('./images/swarmLogoIcon.png')

const App: React.FC = () => {
    return(
        <div id='loginBox'>
            <Image id='logo' src={String(logo)}/>
            <TextField placeholder='Username'/>
            <TextField placeholder='Password'/>
        </div>
    );
};

export default App;