import React from 'react';

import './Wiki.css';
import backgroundImageStyling from "../../styles/backgroundImageStyling";

import MainNavbar from "../../utils/MainNavbar";
import EntryMenu from "./EntryMenu";
import WikiLanding from "./WikiLanding";

//TODO:
// [] remake with bootstrap components
// [] use states to switch between WikiLanding/WikiContent components in the rightPane div
// [] add crud interactions

//get navbar logo
const logo = require('../../images/swarmLogoIcon.png');
const background = backgroundImageStyling();

class Wiki extends React.Component{
    componentDidMount() {
        // @ts-ignore, object could possibly be null
        document.getElementsByTagName("BODY")[0].classList.add('wikiBody');
    }

    render(){
        return(
            <section style={background}>
                <MainNavbar logo={logo} />
                <div id='content'>

                  <EntryMenu />
                  <div id='rightPane'>
                      <WikiLanding />
                  </div>
                </div>
            </section>
        );
    }
}

export default Wiki