import React from 'react';

//props for component to use
interface Props{
    src: string;
    alt: string;
    id: string;
}

class Image extends React.Component<Props>{
    render(){
        return(
            <div>
                <img id ={this.props.id} src={this.props.src} alt={this.props.alt}></img>
            </div>
        );
    }
}

export default Image