import React from "react";
import './AdminPage.css'
import {Container, Row, Col} from 'react-bootstrap'

class AdminDashboard extends React.Component<any, any>{
    render() {
        return(
            <div>
                <Container className={'dashboardContainer'}>
                    <Row>
                        <Col sm={3}>
                            <div className={'sideDashboard'}>
                                <div className={'sideHeaders'}>
                                    <h4><a href={'/'}>Users</a></h4>
                                    <h4><a href={'/'}>Visualization</a></h4>
                                    <h4><a href={'/'}>Statistics</a></h4>
                                    <h4><a href={'/'}>Verify</a></h4>
                                    <h4><a href={'/'}>Settings</a></h4>
                                </div>
                            </div>
                        </Col>
                        <Col sm={9}>
                            <div className={'adminDashboardMain'}>
                                hello world Admin Dashboard
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default AdminDashboard