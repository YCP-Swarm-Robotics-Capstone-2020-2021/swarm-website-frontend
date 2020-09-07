import React from 'react';

//props for component to use
interface Props{
    id: string,
    class: string,
    name: string,
    placeholder: string,
    type: string,
}

//TextField component(function component)
class TextField extends React.Component<Props>{
    render(){
        return(
            <div>
                <input id={this.props.id} className={this.props.class} name={this.props.name} type={this.props.id} placeholder={this.props.placeholder}/>
            </div>
        );
    }
}

export default TextField