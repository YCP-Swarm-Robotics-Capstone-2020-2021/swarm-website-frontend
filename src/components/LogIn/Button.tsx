import React from 'react';
import './Button.css';

//props for component to use
interface Props{
    id: string,
    type: "button" | "submit" | "reset",
    text: string
}

export const Button: React.FC<Props> = ({id, type, text}) => {
    return(
        <div>
            <button id={id} type={type} className={'fontFamily'}>{text}</button>
        </div>
    );
};