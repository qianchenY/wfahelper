import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'antd';

const Header = () =>{
    return (
        <div className="g-hd">
            <Row>
                <Col span={4}>
                    <p className="m-hdtt">
                        <Link to="/">wfaHelper</Link>    
                    </p> 
                </Col>
            </Row>
        </div>
    )
}

export default Header;