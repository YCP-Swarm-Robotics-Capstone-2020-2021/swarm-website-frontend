import React from "react";
import MainNavbar from "../../../utils/MainNavbar";
import { Jumbotron } from "react-bootstrap";
import {Link} from "react-router-dom";
import {url} from "../../../utils/DetermineUrl";

import {wikiData} from "../../../utils/getInterfaces/wikiData";

import './WikiNotFound.css';
import backgroundImageStyling from "../../../styles/backgroundImageStyling";
import {cookies} from "../../../utils/Cookies";

//get navbar logo
const logo = require('../../../images/swarmLogoIcon.png');
const background = backgroundImageStyling();

interface wikiNotFoundState{
    data: wikiData[];
    wikiList: JSX.Element[];
}

class WikiNotFound extends React.Component<{}, wikiNotFoundState>{
    constructor(props: {}) {
        super({});
        this.state = {
            data: [],
            wikiList: []
        }
    }

    componentDidMount() {
        fetch(url+'/wiki',{
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + cookies.get("access"),
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    data: this.state.data.concat(data as wikiData),
                });

                this.state.data.forEach(wiki => {
                    this.setState({
                        wikiList: this.state.wikiList.concat(<Link to={'/wiki/'+wiki['id']}><li>{wiki['title']}</li></Link>)
                    })
                });
            })
    }

    render(){
        return(
            <section style={background}>
                <MainNavbar logo={logo} />
                <div id="contentWikiNotFound">
                    <Jumbotron id="errorJumbotron">
                        <h1>I can't find that wiki :(</h1>
                        <p>
                            You can find a list of valid wikis below:
                        </p>
                        <ul id='validWikiList'>
                            {this.state.wikiList}
                        </ul>
                    </Jumbotron>
                </div>
            </section>
        );
    }
}

export default WikiNotFound