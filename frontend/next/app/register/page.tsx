import { Metadata } from "next";
import RegisterCard from "./components/register-card"


export const metadata: Metadata = {
    title: "Criar Conta"
  };

const Register: React.FC = () => {
    return (
        <RegisterCard />
    )
}

export default Register