import React from 'react'
import './AdminPage.css'
import MainNavbar from "../../utils/MainNavbar";
import AdminDashboard from "./AdminDashboard";
const logo = require('../../images/swarmLogoIcon.png');



class AdminPage extends React.Component<any, any>{

    render() {
        return (
            <body>
                <MainNavbar logo={logo}/>
                <AdminDashboard/>
            </body>
        );
    }
}

export default AdminPage