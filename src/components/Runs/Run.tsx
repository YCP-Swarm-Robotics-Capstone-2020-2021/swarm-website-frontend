import React, {useEffect, useState} from "react";
import {Container, Row, Col, Spinner} from "react-bootstrap";

import './styles/Run.css';

interface runProps {
    id: string,
    changeView: (view: string) => void
}

const Run: React.FC<runProps> = (props: runProps) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            //TOOD: fetch run data from /api/run/{props.id} or /api/run?id={props.id}
            //set a placeholder timeout to show loading spinner
            setTimeout(() => {
                setLoading(false);
            }, 1500)
        }
        load();
    }, [])

    return(
        <Container id={'runContainer'}>
            <Row className={'justify-content-center'}>
                <Col className={'text-center'}>
                    {
                        loading ? <Spinner animation={'border'}/> : <h3>{props.id}</h3>
                    }
                </Col>
            </Row>
        </Container>
    )
}

export default Run;