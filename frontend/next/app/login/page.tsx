import { FC } from "react";
import LoginCard from "./components/login-card";
import { Metadata } from "next";
type Props = {

};

export const metadata: Metadata = {
    title: "Login"
  };
  

const Login: FC<Props> = () => {
    return (
        <LoginCard />
    )
}

export default Login