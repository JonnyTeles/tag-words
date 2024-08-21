"use client"
import { AxiosHttpClientAdapter, HttpClient } from "@/adapters/axios-adapter";
import Button from "design-system/components/Button";
import Card from "design-system/components/Card";
import Form from "design-system/components/Form";
import FormItem from "design-system/components/FormItem";
import Input from "design-system/components/Input";
import Title from "design-system/components/Title";
import { FormValues } from "../types/register-types";
import { login, register } from "./register-utils";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "design-system/components/Link";
import Notification from "design-system/components/Notification";


const httpClient = new AxiosHttpClientAdapter();

const RegisterCard: React.FC = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      await register(httpClient, values);
      const loggedUser = await login(httpClient, values);
      console.log(loggedUser);
      // router.push('/login');
    } catch (error: any) {
      console.error(error);
      Notification.error('Erro!', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    router.push('/login')
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <Title level={1} className="mb-4 text-center">Criar conta</Title>
        <Form layout="vertical" onFinish={handleSubmit}>
          <FormItem
            label="Nome"
            name="name"
            rules={[{ required: true, message: 'Por favor, insira seu nome!' }]}
          >
            <Input required placeholder="Insira seu nome..." />
          </FormItem>
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
          <FormItem
            label="Confirme sua senha"
            name="confirm"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Por favor, confirme sua senha!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('As senhas não coincidem!'));
                },
              }),
            ]}
          >
            <Input type="password" required placeholder="Confirme sua senha..." />
          </FormItem>
          <div className="flex flex-col items-center">
            <Button type="primary" htmlType="submit" className="w-full m-4" disabled={loading}>
              Criar conta
            </Button>
            <Link onClick={handleLogin}>
              Já possui uma conta? Faça login
            </Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default RegisterCard;