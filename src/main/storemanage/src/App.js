import React, { Component } from 'react';
import {BrowserRouter, Routes, Route, useHistory} from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./Login";
import Join from "./Join";
import AuthenticationSerivce from "./service/AuthenticationSerivce";
import Logout from "./Logout";
import Sales from "./pages/Sales";
import Product from "./pages/Product";
import Fixed from "./pages/Fixed";
import Calculate from "./pages/Calculate";
import Menu from "./pages/Menu";
import jQuery from "jquery";
import $ from "jquery";

const App = () => {
    AuthenticationSerivce.setupAxiosInterceptors();

    return (

    <div className='App'>
            <BrowserRouter>
                <Header className="mb-10" />
                <Routes>
                    <Route path="/" element={<Main />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/join" element={<Join />}></Route>
                    <Route path="/logout" element={<Logout/>}></Route>
                    <Route path="/sales" element={<Sales/>}></Route>
                    <Route path="/product" element={<Product/>}></Route>
                    <Route path="/menu" element={<Menu/>}></Route>
                    <Route path="/fixed" element={<Fixed/>}></Route>
                    <Route path="/calculate" element={<Calculate/>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;