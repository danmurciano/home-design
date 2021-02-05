import React from "react";
import { Button, Form, Icon, Message, Segment, Radio } from "semantic-ui-react";
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


  React.useEffect(() => {
    const isUser = Object.values(user).every(el => Boolean(el));
    isUser ? setDisabled(false) : setDisabled(true);
  }, [user]);

  function handleSelect(event) {
    if (signIn === true) {
      setSignIn(false);
    } else {
      setSignIn(true);
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
      console.log(response.data);
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
      <div class="signInHeader"> My Account </div>

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

        {signIn ? (

          <Form error={Boolean(error)} loading={loading} onSubmit={handleSignIn}>
            <Message error header="Oops!" content={error} />
              <Form.Input
                className="signInInput"
                icon="envelope"
                iconPosition="left"
                label="Email"
                placeholder="Email"
                name="email"
                type="email"
                value={user.email}
                onChange={handleChange}
              />
              <Form.Input
                className="signInInput"
                icon="lock"
                iconPosition="left"
                label="Password"
                placeholder="Password"
                name="password"
                type="password"
                value={user.password}
                onChange={handleChange}
              />
              <Button
                disabled={disabled || loading}
                type="submit"
                color="red"
                content="Sign In"
                size="big"
              />
          </Form>

        ) : (

          <Form error={Boolean(error)} loading={loading} onSubmit={handleSignUp}>
            <Message error header="Oops!" content={error} />
              <Form.Input
                className="signInInput"
                icon="user"
                iconPosition="left"
                label="Name"
                placeholder="Name"
                name="name"
                value={user.name}
                onChange={handleChange}
              />
              <Form.Input
                className="signInInput"
                icon="envelope"
                iconPosition="left"
                label="Email"
                placeholder="Email"
                name="email"
                type="email"
                value={user.email}
                onChange={handleChange}
              />
              <Form.Input
                className="signInInput"
                icon="lock"
                iconPosition="left"
                label="Password"
                placeholder="Password"
                name="password"
                type="password"
                value={user.password}
                onChange={handleChange}
              />
              <Button
                disabled={disabled || loading}
                type="submit"
                color="red"
                content="Signup"
                size="big"
              />
          </Form>

        )}

      </div>
    </div>
  );
}
