import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Error,
  Form,
  Input,
  Switcher,
  Title,
  Wrapper,
} from "../components/auth-components";
import GithubButton from "../components/github-btn";
import { auth } from "../firebase";
import GoogleButton from "../components/google-btn";

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>("");
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading || email === "" || password === "") return;

    try {
      //create account

      setIsLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (e) {
      // password invalid or email already exists
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <Title>Login</Title>
      <Form onSubmit={onSubmit}>
        <Input
          value={email}
          onChange={onChange}
          name="email"
          placeholder="email"
          type="email"
          required
        />
        <Input
          value={password}
          onChange={onChange}
          name="password"
          placeholder="password"
          type="password"
          required
        />
        <Input type="submit" value={isLoading ? "Loading..." : "Login"} />
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
      <Switcher>
        Don't have an account? <Link to="/create-account">Create Account</Link>
      </Switcher>
      <GithubButton />
      <GoogleButton />
    </Wrapper>
  );
}
