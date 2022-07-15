import React from "react";
import AuthenticationSerivce from "./service/AuthenticationSerivce";

const Logout = () => {

    AuthenticationSerivce.logout();

}

export default Logout;