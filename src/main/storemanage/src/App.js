import React, { Component } from 'react';
import {BrowserRouter, Routes, Route, useHistory} from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./Login";
import Join from "./Join";
import AuthenticationSerivce from "./service/AuthenticationSerivce";
import Logout from "./Logout";


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
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;