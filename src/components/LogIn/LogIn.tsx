import React from 'react';
import './LogIn.css';

//components
import {LoginBox} from "./LoginBox";

//choose random background
let bgNum = Math.floor(Math.random() * 5) + 1

const sectionStyle = {
    backgroundImage: "url(" + require('../../images/loginbgs/bg'+bgNum+'.jpg') + ")",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    minHeight: "100vh",
    overflow: "hidden"
};


const LogIn: React.FC = () => {
    return(
        <section style={sectionStyle}>
            <LoginBox />
        </section>
    );
};

export default LogIn;