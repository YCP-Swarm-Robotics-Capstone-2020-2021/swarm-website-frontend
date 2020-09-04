import React from 'react';
import './App.css';

//components
import {TextField} from "./components/TextField";
import {Image} from "./components/Image";

//images
const logo = require('./images/swarmLogoIcon.png');
let bgNum = Math.floor(Math.random() * 5) + 1

const sectionStyle = {
    backgroundImage: "url(" + require('./images/loginbgs/bg'+bgNum+'.jpg') + ")",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    minHeight: "100vh",
    overflow: "hidden"
};


const App: React.FC = () => {
    return(
        <section style={sectionStyle}>
            <div id='loginBox'>
                <Image id='logo' src={String(logo)} alt='Swarm Robotics Logo'/>
                <TextField placeholder='Username'/>
                <TextField placeholder='Password'/>
            </div>
        </section>
    );
};

export default App;