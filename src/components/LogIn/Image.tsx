import React from 'react';

//props for component to use
interface Props{
    src: string;
    alt: string;
    id: string;
}

export const Image: React.FC<Props> = ({src, id, alt}) => {
    return(
        <div>
            <img id ={id} src={src} alt={alt}></img>
        </div>
    );
};