import React from 'react'
import './AdminPage.css'
import MainNavbar from "../../utils/MainNavbar";
const logo = require('../../images/swarmLogoIcon.png');



class AdminPage extends React.Component<any, any>{

    render() {
        return (
            <body>
                <MainNavbar logo={logo}/>
                <div>
                    Admin Dashboard
                </div>
            </body>
        );
    }
}

export default AdminPage