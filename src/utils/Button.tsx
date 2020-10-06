import React from 'react';

//props for component to use
 interface Props{
     id: string,
     class: string,
     type: "button" | "submit" | "reset",
     text: string
}

class Button extends React.Component<Props>{
     render(){
         return(
             <div>
                 <button id={this.props.id} className={this.props.class} type={this.props.type}>{this.props.text}</button>
             </div>
         );
     }
}

export default Button