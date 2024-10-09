import React from "react";
import { useCallback, useState } from "react";
import doLogin from '../api/user.service'; // doLogin returns a Promise
import './loginform.css';
import { Input } from "../Input";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ username: false, password: false, login: false });
  const [viewPassword, setViewPassword] = useState(false);

  const onChange = useCallback((ev) => {
    setErrors({ ...errors, [ev.target.name]: false });
    if (ev.target.name === 'username') {
      setUsername(ev.target.value);
    } else {
      setPassword(ev.target.value);
    }
  }, [errors]);

  const isFormError = useCallback(() => {
    setErrors({ username: username.length < 1, password: password.length < 1 }); 
    return username.length < 1 || password.length < 1;
  }, [username, password]);

  const onSubmit = useCallback(async (event) => { 
    event.preventDefault();
    setErrors({username: false, password: false, login: false });
      setLoading(true);
  
      if (isFormError()) {
        setLoading(false);
        return;
      }

    try {
      await doLogin(username, password);
    } catch (error) {
      setErrors((prevErrors) => ({ ...prevErrors, login: true }));
    } finally {
      setLoading(false);
    }

  }, [username, password]);

  return (
    <div className="form_container">
      <form className="login_form" onSubmit={onSubmit}>
        <h1>Login</h1>

          <div className="login_item_container">
            <label>Username</label>
            <Input
              name="username"
              type="text"
              value={username}
              required={errors.username}
              onChange={(ev) => onChange(ev)}
            />
          </div>

          <div className="login_item_container">
            <label>Password</label>
            <Input
              name="password"
              type={viewPassword ? "text" : "password"}
              value={password}
              required={errors.password}
              onChange={(ev) => onChange(ev)}
            />
          </div>

          <div className="viewpass_container">
            <input
              type="checkbox"
              onChange={() => setViewPassword(!viewPassword)}
            />
            <label>View Password</label>
          </div>

          <div className="login_error_container">
            {errors.login && <span>Invalid username or password</span>}
          </div>

          <div className="login_item_container">
            <button type="submit" name={loading ? "loading" : "login"}>
              {loading ? "Loading" : "Login"}</button>
          </div>
 
      </form> 
    </div>
    
  );
};

export { LoginForm };
