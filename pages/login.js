import React from "react";
import { Button, Form, Icon, Message, Segment, Radio, Checkbox } from "semantic-ui-react";
import axios from "axios";
import catchErrors from "../utils/catchErrors";
import baseUrl from "../utils/baseUrl";
import { handleLogin } from "../utils/auth";

const INITIAL_USER = {
  email: "",
  password: ""
};

export default function Signup() {
  const [user, setUser] = React.useState(INITIAL_USER);
  const [disabled, setDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [signIn, setSignIn] = React.useState(true);
  const [showPassword, setShowPassword] = React.useState(false);


  React.useEffect(() => {
    const isUser = Object.values(user).every(el => Boolean(el));
    isUser ? setDisabled(false) : setDisabled(true);
  }, [user]);


  function handleSelect(event) {
    if (signIn === true) {
      setUser(INITIAL_USER);
      setShowPassword(false);
      setSignIn(false);
    } else {
      setUser(INITIAL_USER);
      setShowPassword(false);
      setSignIn(true);
    }
  }

  function handleShowPassword(event) {
    if (showPassword === true) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setUser(prevState => ({ ...prevState, [name]: value }));
  }


  async function handleSignIn(event) {
    event.preventDefault();
    try {
      setLoading(true);
      setError("");
      const url = `${baseUrl}/api/login`;
      const payload = { ...user };
      const response = await axios.post(url, payload);
      const { token, tokenAdmin, userRole } = response.data;
      handleLogin(token, tokenAdmin, userRole);
    } catch (error) {
      catchErrors(error, setError);
    } finally {
      setLoading(false);
    }
  }


  async function handleSignUp(event) {
    event.preventDefault();
    try {
      setLoading(true);
      setError("");
      const url = `${baseUrl}/api/signup`;
      const payload = { ...user };
      const response = await axios.post(url, payload);
      handleLogin(response.data);
    } catch (error) {
      catchErrors(error, setError);
    } finally {
      setLoading(false);
    }
  }


  return (
    <div class="container-fluid pageSignIn">
      <div class="signInBox">
        <Form>
          <Form.Field className="signInSelect"
            control={Radio}
            label='Sign In'
            value='Sign In'
            checked={signIn === true}
            onChange={handleSelect}
          />
          <Form.Field className="signInSelect"
            control={Radio}
            label='Create an Account'
            value='Create an Account'
            checked={signIn === false}
            onChange={handleSelect}
          />
        </Form>

        <Form error={Boolean(error)} loading={loading} onSubmit={signIn ? handleSignIn : handleSignUp}>
          <Message error header="Oops!" content={error} />
          {!signIn ? (
            <div class="signIn-field ">
              <Form.Input
                transparent
                className="top-searchbar-input"
                icon="user"
                iconPosition="left"
                placeholder="Name"
                name="name"
                value={user.name}
                onChange={handleChange}
              />
            </div>
          ) : (
            <> </>
          )}

           <div class="signIn-field ">
             <Form.Input
               transparent
               className="top-searchbar-input"
               icon="envelope"
               iconPosition="left"
               placeholder="Email"
               name="email"
               type="email"
               value={user.email}
               onChange={handleChange}
             />
            </div>
            <div class="signIn-field ">
              <Form.Input
                transparent
                className="top-searchbar-input"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={user.password}
                onChange={handleChange}
              />
            </div>
            <Form.Field
              control={Checkbox}
              label='Show Password'
              checked={showPassword === true}
              onChange={handleShowPassword}
            />
            <Button
              circular
              fluid
              className="login-button"
              disabled={disabled || loading}
              type="submit"
              color="instagram"
              content={signIn ? "Sign In" : "Signup"}
              size="big"
            />
        </Form>
      </div>
    </div>
  );
}
