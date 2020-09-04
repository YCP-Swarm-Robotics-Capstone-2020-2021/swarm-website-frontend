import React from 'react';
import './TextField.css';

//props for component to use
interface Props{
    placeholder: string;
    type: string
}

//TextField component(function component)
export const TextField: React.FC<Props> = ({placeholder, type}) => {
    return(
      <div>
          <input type={type} placeholder={placeholder} className='fontFamily'/>
      </div>
    );
};