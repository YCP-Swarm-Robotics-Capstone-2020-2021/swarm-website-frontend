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
                                hello world Side Dashboard
                            </div>
                        </Col>
                        <Col sm={9}>
                            <div>
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