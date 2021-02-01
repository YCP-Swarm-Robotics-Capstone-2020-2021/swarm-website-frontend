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

//TODO:
// [x] remake with bootstrap components
// [x] use states to switch between Landing/Entry components in the rightPane div
// [x] flush out edit/comments tab
// [ ] add crud interactions

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

//component has no props, hence {}
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

    rightPaneHandler = (entryId: string) => {
        this.setState({
            view: entryId
        })
    }

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

    getUser = async () => {
        let username = cookies.get("username");
        let response = await getUser(username);

        if(!response.ok){
            console.log("Issue fetching user data...");
        }else{
            return response.json().then(json => {
                this.setState({currentUser: json[0] as userData});
                console.log(json[0]);
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
        this.state.view === "landing" ? rightPaneComponent = <Landing entries={this.state.data.entries} wikiDescription={this.state.data.briefDescription}/> : rightPaneComponent = <Entry id={this.state.view} currentUser={this.state.currentUser} wiki={this.state.data}/>
        
        return(
            <section style={background}>
                <MainNavbar logo={logo} />
                <div id='contentWiki'>
                    {this.state.data.id !== 0 ? <EntryMenu action={this.rightPaneHandler} wikiTitle={this.state.data.title} wikiId={this.state.data.id} entries={this.state.data.entries} currentUser={this.state.currentUser}/> : <Spinner animation='border'/>}
                  <div id='rightPane' className="bg-dark">
                      {rightPaneComponent}
                  </div>
                </div>
            </section>
        );
    }
}

export default Wiki