import React, { useState,useContext,useEffect } from "react";
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';
const Login = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext  = useContext(AuthContext);
  const {login, error, clearErrors,isAuthenticated} = authContext;
  const {setAlert} = alertContext;
  
  useEffect(() => {
    if(isAuthenticated){
      props.history.push('/');
    }
    if(error === 'Invalid Credentials'){
      setAlert(error,'danger');
      clearErrors();
    }
    //eslint-disable-next-line
  },[isAuthenticated,error,props.history])
  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  const { email, password } = user;

  const handleChange = e =>
    setUser({ ...user, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    if(email === '' || password === ''){
      setAlert('Please fill in all the fields','danger');
    }else{
      login({
        email,
        password
      })
    }
  };
  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Login</span>
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="submit"
            value="Login"
            className="btn btn-primary btn-block"
          />
        </div>
      </form>
    </div>
  );
};

export default Login;
