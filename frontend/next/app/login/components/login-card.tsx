"use client"
import Button from "design-system/components/Button";
import Card from "design-system/components/Card";
import Form from "design-system/components/Form";
import FormItem from "design-system/components/FormItem";
import Input from "design-system/components/Input";
import Link from "design-system/components/Link";
import Title from "design-system/components/Title";
import { useRouter } from "next/navigation";

interface FormValues {
    email: string;
    password: string;
}

const LoginCard: React.FC = () => {
    const router = useRouter()
    const handleSubmit = (values: FormValues) => {
        console.log('Valores do formulário:', values);
    };

    const handleRegister = () => {
        router.push('/register')
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-full max-w-md p-6 shadow-lg">
                <Title level={1} className="mb-4 text-center">Login</Title>
                <Form onFinish={handleSubmit} layout="vertical">
                    <FormItem
                        label="E-mail"
                        name="email"
                        rules={[{ required: true, message: 'Por favor, insira seu e-mail!' }]}
                    >
                        <Input required placeholder="Insira seu e-mail..." />
                    </FormItem>
                    <FormItem
                        label="Senha"
                        name="password"
                        rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}
                    >
                        <Input type="password" required placeholder="Insira sua senha..." />
                    </FormItem>
                    <div className="flex flex-col items-center">
                        <Button type="primary" htmlType="submit" className="w-full m-4">
                            Entrar
                        </Button>
                        <Link className="w-full text-center" onClick={handleRegister}>
                            Não possui uma conta? Crie uma
                        </Link>
                    </div>
                </Form>
            </Card>
        </div>
    );
};

export default LoginCard;