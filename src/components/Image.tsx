import React from 'react';

//props for component to use
interface Props{
    src: string;
    id: string;
}

export const Image: React.FC<Props> = ({src, id}) => {
    return(
        <div>
            <img id ={id} src={src}></img>
        </div>
    );
};