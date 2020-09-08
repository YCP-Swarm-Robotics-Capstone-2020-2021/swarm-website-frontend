import React from 'react';

import './Wiki.css';

import EntryMenu from "./EntryMenu";

class Wiki extends React.Component{
    componentDidMount() {
        // @ts-ignore, object could possibly be null
        document.getElementsByTagName("BODY")[0].classList.add('wikiBody');
    }

    render(){
        return(
          <div id='content'>
              <EntryMenu />
          </div>
        );
    }
}

export default Wiki