import React from 'react';
import backgroundImageStyling from '../../styles/backgroundImageStyling'
import * as wasm from "swarm-website-visualization"
import MainNavbar from "../../utils/MainNavbar";

const logo = require('../../images/swarmLogoIcon.png');
const background = backgroundImageStyling();



class Visualization extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
        wasm.init_visualization("canvas", "../../packages/resources");
    }

    render() {
        return (
            <section>
                <MainNavbar logo={logo}/>
                <p>Hi there</p>
                <canvas id="canvas" tabIndex={1} width="1280" height="720"/>
            </section>

        );
    }
}

export default Visualization