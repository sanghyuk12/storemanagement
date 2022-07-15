import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Join(){
    const navigate = useNavigate();
    const [userId,setUserId] = useState('');
    const [storeName,setStoreName] = useState('');
    const [password,setPassword] = useState('');
    const [passwordCheck,setPasswordCheck] = useState('');
    const [passwordError,setPasswordError] = useState(false);


    const onSubmit = (e) => {
        e.preventDefault();

        if(password !== passwordCheck){
            return setPasswordError(true);
        }

        const formData = new FormData;

        formData.append("userId", userId);
        formData.append("storeNm", storeName);
        formData.append("password", password);

        axios.post("api/joinMember", formData)
            .then(res => alert("회원가입이 완료되었습니다."))
            .catch(error => console.log(error));
        navigate('/login');

    };

    // Coustom Hook 이전
    const onChangeId = (e) => {
        setUserId(e.target.value);
    };
    const onChangeNick = (e) => {
        setStoreName(e.target.value);
    };
    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };
    const onChangePasswordChk = (e) => {
        //비밀번호를 입력할때마다 password 를 검증하는 함수
        setPasswordError(e.target.value !== password);
        setPasswordCheck(e.target.value);
    };

    return (
        <div>
            <Container className="panel">
                <Form>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Col sm>
                            <Form.Control placeholder="UserID" value={userId} onChange={onChangeId}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Col sm>
                            <Form.Control placeholder="StoreName" value={storeName} onChange={onChangeNick}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Col sm>
                            <Form.Control type="password" placeholder="Password" value={password} onChange={onChangePassword}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Col sm>
                            <Form.Control type="password" placeholder="Confirm Password" value={passwordCheck} onChange={onChangePasswordChk}/>
                            {passwordError && <div style={{color : 'red'}}> 비밀번호가 일치하지 않습니다. </div>}
                        </Col>
                    </Form.Group>

                    <br/>

                    <div className="d-grid gap-1">
                        <Button variant="secondary" type="submit" onClick={onSubmit} >
                            Sign Up
                        </Button>
                    </div>
                </Form>
            </Container>
        </div>
    );
}

export default Join