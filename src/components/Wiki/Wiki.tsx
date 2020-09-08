import React from 'react';

import './Wiki.css';

import EntryMenu from "./EntryMenu";
import WikiLanding from "./WikiLanding";

/*use states to switch between WikiLanding/WikiContent components in the rightPane div*/

class Wiki extends React.Component{
    componentDidMount() {
        // @ts-ignore, object could possibly be null
        document.getElementsByTagName("BODY")[0].classList.add('wikiBody');
    }

    render(){
        return(
          <div id='content'>
              <EntryMenu />
              <div id='rightPane'>
                  <WikiLanding />
              </div>
          </div>
        );
    }
}

export default Wiki