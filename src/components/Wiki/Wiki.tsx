import React from 'react';
import { RouteComponentProps} from "react-router";

import './Wiki.css';
import backgroundImageStyling from "../../styles/backgroundImageStyling";

import MainNavbar from "../../utils/MainNavbar";
import EntryMenu from "./EntryMenu/EntryMenu";
import Landing from "./Landing/Landing";
import Entry from "./Entry/Entry";

//TODO:
// [x] remake with bootstrap components
// [x] use states to switch between Landing/Entry components in the rightPane div
// [x] flush out edit/comments tab
// [ ] add crud interactions

//get navbar logo
const logo = require('../../images/swarmLogoIcon.png');
const background = backgroundImageStyling();

export interface wikiData {
    title: string;
    briefDescription: string;
    entries: number[];
}

interface wikiState{
    view: string;
    data: wikiData;
}

interface wikiProps extends RouteComponentProps<{id: string}>{}

//component has no props, hence {}
class Wiki extends React.Component<wikiProps, wikiState>{
    constructor(props: wikiProps) {
        super(props);
        this.rightPaneHandler = this.rightPaneHandler.bind(this);
        this.state = {
            view: "landing",
            data: {title: '', briefDescription: '', entries: []}
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
            .then(response => response.json())
            .then(data => this.setState({data: data as wikiData}));
    }

    render(){
        let rightPaneComponent;
        this.state.view === "landing" ? rightPaneComponent = <Landing /> : rightPaneComponent = <Entry id={this.state.view}/>

        return(
            <section style={background}>
                <MainNavbar logo={logo} />
                <div id='content'>
                  <EntryMenu action={this.rightPaneHandler} wikiTitle={this.state.data.title} entries={this.state.data.entries}/>
                  <div id='rightPane' className="bg-dark">
                      {rightPaneComponent}
                  </div>
                </div>
            </section>
        );
    }
}

export default Wiki