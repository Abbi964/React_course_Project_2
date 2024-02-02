import React from "react";

const AuthComponent = React.createContext({
    isLoggedIn : false,
    onLogout : ''
})

export default AuthComponent;