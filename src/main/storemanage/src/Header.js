import React, {Component} from "react";
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import AuthenticationSerivce from "./service/AuthenticationSerivce";

function Header(props) {
    if(!AuthenticationSerivce.isUserLoggedIn()) {
        return (

            <Navbar bg="light" expand="lg"  className="mb-5" >
                <Container>
                    <Navbar.Brand href="/">StoreManage</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto ">
                            <Nav.Link href="/login">Login/Regist</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    } else {
        return (
            <Navbar bg="light" expand="lg"  className="mb-5" >
                <Container>
                    <Navbar.Brand href="/">StoreManage</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/sales">판매관리</Nav.Link>
                            <Nav.Link href="/product">재료관리</Nav.Link>
                            <Nav.Link href="/menu">메뉴관리</Nav.Link>
                            <Nav.Link href="/fixed">고정지출관리</Nav.Link>
                            <Nav.Link href="/calculate">정산관리</Nav.Link>
                            <Nav.Link href="/logout">Logout</Nav.Link>
                            {/*<NavDropdown title="Dropdown" id="basic-nav-dropdown">*/}
                            {/*    <NavDropdown.Item href="#action/3.1">판매고</NavDropdown.Item>*/}
                            {/*    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>*/}
                            {/*    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>*/}
                            {/*    <NavDropdown.Divider />*/}
                            {/*    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>*/}
                            {/*</NavDropdown>*/}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }

}

export default Header;