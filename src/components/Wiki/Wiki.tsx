import React from 'react';
import {Redirect, RouteComponentProps} from "react-router";
import {wikiData} from "../../utils/getInterfaces/wikiData";
import {userData} from "../../utils/getInterfaces/userData";
import {Spinner} from 'react-bootstrap';

import './Wiki.css';
import backgroundImageStyling from "../../styles/backgroundImageStyling";

import MainNavbar from "../../utils/MainNavbar";
import EntryMenu from "./EntryMenu/EntryMenu";
import Landing from "./Landing/Landing";
import Entry from "./Entry/Entry";
import verifyUserIsLoggedIn from "../../utils/verifiyUserIsLoggedIn/verifyLoggedIn";
import {cookies} from "../../utils/Cookies";
import {getWiki, getUser} from './apiCalls';

//get navbar logo
const logo = require('../../images/swarmLogoIcon.png');
const background = backgroundImageStyling();

interface wikiState{
    view: string;
    data: wikiData;
    redirect: boolean;
    currentUser: userData;
}

interface wikiProps extends RouteComponentProps<{id: string}>{}

/**
 * route: /wiki/{id}
 * 
 * Initial landing screen for viewing a specific wiki, will redirect
 * to <WikiNotFound/> when the given {id} is not valid on data fetching
 * 
 * Display the <EntryMenu/> component to switch between <Landing/> and <Entry/> components
 */
class Wiki extends React.Component<wikiProps, wikiState>{
    constructor(props: wikiProps) {
        super(props);

        verifyUserIsLoggedIn().then((value => {
            if(value){
                props.history.push('/');
            }
        })).catch((error) => {
            console.log("There was a problem loading the page: " + error);
        });

        this.state = {
            view: "landing",
            data: {id: 0, title: '', briefDescription: '', entries: []},
            redirect: false,
            currentUser: {id: 0, username: '', email: '', accountLevel: 0}
        }
    }

    /**
     * Clear 'data' state var and recall getWiki()
     * Used for when a entry/comment/etc. is added and wiki needs to reload,
     * 
     * Gets passed down to child components to be called
     */
    reloadWiki = () => {
        this.setState({
            data: {id: 0, title: '', briefDescription: '', entries: []}
        }, () => {
            this.getWiki();
        })
    }

    /**
     * Passed down to <EntryMenu/> component to handle switching between <Entry/> and <Landing/> in the #rightPane div
     * in the render function below
     */
    rightPaneHandler = (entryId: string) => {
        this.setState({
            view: entryId
        })
    }

    /**
     * Attempt fetching wiki's data based on {id} from route params
     * 
     * If the response is not ok, set redirect flag to be true, flag is used in render function
     * If successfully fetched, sort entries in newest->oldest, and set full json as wikiData interface
     */
    getWiki = async () => {
        let id = this.props.match.params.id;
        let response = await getWiki(id);

        if(!response.ok){
            this.setState({
                redirect: true
            });
        }else{
            return response.json().then(json => {
                json['entries'] = json['entries'].sort();
                this.setState({data: json as wikiData});
            })
        }
    }

    /**
     * Attempt fetching current user data based on their username stored in cookies
     * Fetched data is passed down to children components for entry creation, commenting, etc.
     */
    getUser = async () => {
        let username = cookies.get("username");
        let response = await getUser(username);

        if(!response.ok){
            console.log("Issue fetching user data...");
        }else{
            return response.json().then(json => {
                this.setState({currentUser: json[0] as userData});
            })
        }
    }

    componentDidMount() {
        // @ts-ignore, object could possibly be null
        document.getElementsByTagName("BODY")[0].classList.add('wikiBody');

        this.getWiki();
        this.getUser();
    }

    render(){
        if(this.state.redirect) {
            return <Redirect to='/wikinotfound'/>;
        }

        let rightPaneComponent;
        this.state.view === "landing" ? rightPaneComponent = <Landing entries={this.state.data.entries} wikiDescription={this.state.data.briefDescription}/> : rightPaneComponent = <Entry id={this.state.view} currentUser={this.state.currentUser} wiki={this.state.data} reloadWiki={this.reloadWiki}/>
        
        //if 'data' state var's id is still 0, we are still waiting for data fetch, so display <Spinner/>s to denote loading to user
        return(
            <section style={background}>
                <MainNavbar logo={logo} />
                <div id='contentWiki'>
                    {this.state.data.id !== 0 ? <EntryMenu action={this.rightPaneHandler} wikiTitle={this.state.data.title} wikiId={this.state.data.id} entries={this.state.data.entries} currentUser={this.state.currentUser} reloadWiki={this.reloadWiki}/> : <Spinner animation='border'/>}
                  <div id='rightPane' className="bg-dark">
                      {this.state.data.id !== 0 ? rightPaneComponent : <Spinner animation='border'/>}
                  </div>
                </div>
            </section>
        );
    }
}

export default Wiki