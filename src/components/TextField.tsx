import React from 'react';
import './TextField.css';

//props for component to use
interface Props{
    placeholder: string;
}

//TextField component(function component)
export const TextField: React.FC<Props> = ({placeholder}) => {
    return(
      <div>
          <input placeholder={placeholder} className='TextField'/>
      </div>
    );
};