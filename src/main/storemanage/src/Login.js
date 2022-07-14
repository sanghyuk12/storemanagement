import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import {useState} from "react";
import axios from "axios";
import AuthenticationSerivce from "./service/AuthenticationSerivce";

const Login = (props) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onChangeUserId = (e) => {
        setUsername(e.target.value);
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }
    const onSubmit = () => {

        AuthenticationSerivce.executeJwtAuthenticationService(username, password)
        .then((res) => {
            AuthenticationSerivce.registerSuccessfulLoginForJwt(username, res.data.token);
            window.location.href = '/';
        }).catch((err) => {
           console.log(err);
        });
    }

    return (
        <div>
            <Container className="panel">
                <Form>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Col sm>
                            <Form.Control placeholder="UserID" value={username} onChange={onChangeUserId}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Col sm>
                            <Form.Control type="password" placeholder="Password" value={password} onChange={onChangePassword}/>
                        </Col>
                    </Form.Group>

                    <div className="d-grid gap-1 mb-3">
                        <Button variant="secondary" onClick={onSubmit}>
                            Log In
                        </Button>
                    </div>

                    <div className="d-grid gap-1">
                        <Button variant="secondary" type="submit" href="/join">
                            Sign In
                        </Button>
                    </div>
                </Form>
            </Container>
        </div>
    );
}

export default Login