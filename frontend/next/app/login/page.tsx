import LoginCard from "./components/login-card";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login"
  };
  

const Login: React.FC = () => {
    return (
        <LoginCard />
    )
}

export default Login