import React from 'react';
import backgroundImageStyling from "../../styles/backgroundImageStyling";
import MainNavbar from "../../utils/MainNavbar";

import './Dog.css';

const background = backgroundImageStyling();
const logo = require('../../images/swarmLogoIcon.png');

interface dogState{
    url: string
}

class Dog extends React.Component<{}, dogState>{
    constructor(props: {}) {
        super({});
        this.state = {
            url: ''
        }

    }

    getImage(){
        fetch("https://random.dog/woof.json")
            .then(response => response.json())
            .then(data => {
                if(data['url'].includes(".jpg") || data['url'].includes(".png")){
                    this.setState({
                        url: data['url']
                    })
                }else{
                    this.getImage();
                }
            })
    }

    componentDidMount() {
        this.getImage();
    }

    render(){
        return(
            <section style={background}>
                <MainNavbar logo={logo} />
                <div id='contentDog'>
                    <div>
                        <img src={this.state.url} alt='A dog'></img>
                    </div>
                </div>
            </section>
        )
    }

}

export default Dog;