import React from "react";
import AuthenticationSerivce from "./service/AuthenticationSerivce";

const Logout = () => {

    AuthenticationSerivce.logout();
    window.location.href = '/';

}

export default Logout;