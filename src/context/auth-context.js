import React, {useState, useEffect} from "react";

const AuthContext = React.createContext({
    isLoggedIn : false,
    onLogout : ()=>{},
    onLogin : ()=>{}
})

export const AuthContextProvider = (props)=>{
    const [isLoggedIn, setIsLoggedIn] = useState(false);

  // using useEffect for cheking (only on first load ) is user is logged in or not
  useEffect(()=>{
    const userLoginInfo = localStorage.getItem('isLoggedIn')
    if(userLoginInfo === '1'){
      setIsLoggedIn(true)
    }
  },[])

  const loginHandler = (email, password) => {
    localStorage.setItem('isLoggedIn','1')
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn')
    setIsLoggedIn(false);
  };


    return <AuthContext.Provider value={{
        isLoggedIn : isLoggedIn , 
        onLogin : loginHandler , 
        onLogout : logoutHandler}}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContext;