import React from 'react';

import './LogRow.css';

interface LogRowProps{

}

interface LogRowState{

}


class LogRow extends React.Component<LogRowProps, LogRowState>{
    constructor(props: LogRowProps){
        super(props);
    }

    render(){
        return(
            <p>Hello There</p>
        )
    }
}

export default LogRow