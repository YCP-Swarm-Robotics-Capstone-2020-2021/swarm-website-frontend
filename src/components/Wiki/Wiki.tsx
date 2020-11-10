import React from 'react';
import {Redirect, RouteComponentProps} from "react-router";
import {wikiData} from "../../utils/getInterfaces/wikiData";

import './Wiki.css';
import backgroundImageStyling from "../../styles/backgroundImageStyling";

import MainNavbar from "../../utils/MainNavbar";
import EntryMenu from "./EntryMenu/EntryMenu";
import Landing from "./Landing/Landing";
import Entry from "./Entry/Entry";
import verifyUserIsLoggedIn from "../../utils/verifiyUserIsLoggedIn/verifyLoggedIn";

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

        this.rightPaneHandler = this.rightPaneHandler.bind(this);

        this.state = {
            view: "landing",
            data: {id: 0, title: '', briefDescription: '', entries: []},
            redirect: false
        }
    }

    rightPaneHandler(entryId: string){
        this.setState({
            view: entryId
        });
    }

    componentDidMount() {
        // @ts-ignore, object could possibly be null
        document.getElementsByTagName("BODY")[0].classList.add('wikiBody');

        let id = this.props.match.params.id;
        fetch('http://localhost:8000/wiki/'+id,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if(!response.ok){
                    this.setState({redirect: true})
                }
                return response.json()
            })
            .then(data => {
                data['entries'] = data['entries'].sort();
                this.setState({data: data as wikiData});
            })
    }

    render(){
        if(this.state.redirect) {
            return <Redirect to='/wikinotfound'/>;
        }

        let rightPaneComponent;
        this.state.view === "landing" ? rightPaneComponent = <Landing entries={this.state.data.entries} wikiDescription={this.state.data.briefDescription}/> : rightPaneComponent = <Entry id={this.state.view}/>

        return(
            <section style={background}>
                <MainNavbar logo={logo} />
                <div id='contentWiki'>
                  <EntryMenu action={this.rightPaneHandler} wikiTitle={this.state.data.title} wikiId={this.state.data.id} entries={this.state.data.entries}/>
                  <div id='rightPane' className="bg-dark">
                      {rightPaneComponent}
                  </div>
                </div>
            </section>
        );
    }
}

export default Wiki