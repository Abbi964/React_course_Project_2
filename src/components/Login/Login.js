import React, { useContext, useEffect, useReducer, useState } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../context/auth-context';
import Input from '../UI/Input/Input';

const emailReducer = (state,action)=>{
  if (action.type === 'USER_INPUT'){
    return {value : action.value , isValid : action.value.includes('@')}
  }
  if ( action.type === 'INPUT_BLUR'){
    return {value : state.value , isValid : state.value.includes('@')}
  }
  return { value : '', isValid : false}
}

const passwordReducer = (state,action) =>{
  if (action.type === 'USER_INPUT'){
    return {value : action.value , isValid : +action.value > 6}
  }
  if ( action.type === 'INPUT_BLUR'){
    return {value : state.value , isValid : +state.value > 6}
  }
  return {value : '', isValid : false}
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [enteredCollege, setEnteredCollege] = useState('');
  const [collegeIsValid, setCollegeIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  // using reducer for email and password
  const [emailState , dispatchEmail] = useReducer(emailReducer,{value : '' , isValid : null})
  const [passwordState , dispatchPassword] = useReducer(passwordReducer,{value : '' , isValid : null})

  useEffect( () =>{
    const identifier = setTimeout(()=>{
      console.log('Checking form validity')
      setFormIsValid(
        passwordState.isValid && emailState.isValid && enteredCollege.trim().length > 0
      );
    },500)

    return ()=>{
      console.log('CLEANUP')
      clearTimeout(identifier)
    }
  },[emailState, passwordState, enteredCollege])

  // getting the authContext
  const authCtx = useContext(AuthContext)

  const emailChangeHandler = (event) => {
    dispatchEmail({type : 'USER_INPUT',value : event.target.value});
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type : 'USER_INPUT',value : event.target.value});
  };

  const collegeChangeHandler = (event) => {
    setEnteredCollege(event.target.value);
  };

  const validateEmailHandler = () => {
    dispatchEmail({type : 'INPUT_BLUR'});
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type : 'INPUT_BLUR'});
  };

  const validateCollegeHandler = () => {
    setCollegeIsValid(enteredCollege.trim().length > 0);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    authCtx.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input 
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
          id='email'
          type="email"
          label="E-Mail"
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input 
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
          type="password"
          id="password"
          value={passwordState.value}
          onChange={passwordChangeHandler}
           onBlur={validatePasswordHandler}
          label="Password"
        />
        <Input 
          className={`${classes.control} ${
            collegeIsValid === false ? classes.invalid : ''
          }`}
          type="text"
          id="college"
          label='College Name'
          value={enteredCollege}
          onChange={collegeChangeHandler}
          onBlur={validateCollegeHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
