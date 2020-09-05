import React from 'react';
import './TextField.css';

//props for component to use
interface Props{
    placeholder: string;
    type: string,
    name: string
}

//TextField component(function component)
export const TextField: React.FC<Props> = ({placeholder, type, name}) => {
    return(
      <div>
          <input name={name} type={type} placeholder={placeholder} className='fontFamily'/>
      </div>
    );
};