import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, Input } from '@mui/material';
import toast from 'react-hot-toast';
import { User } from '@/models';
import { users } from '@/data/users';
import { useNavigate } from 'react-router-dom';

interface LoginFormInputs {
  email: string;
  password: string;
}

const schema = yup
  .object({
    email: yup.string().email('Email invalido').required('Email es requerido'),
    password: yup
      .string()
      .min(6, 'La contraseña debe tener minimo 6 caracteres')
      .required('La contraseña es requerida'),
  })
  .required();

interface LoginProps {
  addUser: (user: User) => void;
}

export const Login = ({ addUser }: LoginProps) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    const userFound: User = users.find((user) => user.email === data.email);

    if (!userFound) {
      toast.error('Usuario no encontrado', {
        duration: 4000,
        position: 'top-center',
        id: 'error-user-not-found',
      });
      return;
    }

    addUser(userFound);

    toast.success(`Bienvenido ${userFound?.role}`, {
      duration: 4000,
      position: 'top-center',
      id: 'success-login',
    });

    if (userFound?.role === 'admin') {
      navigate('/solicitudes');
    } else {
      navigate('/qr-reader');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <Input
              {...register('email')}
              placeholder="Email"
              className="w-full border border-gray-300 rounded-md p-2"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-4">
            <Input
              {...register('password')}
              type="password"
              placeholder="Password"
              className="w-full border border-gray-300 rounded-md p-2"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="w-full"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
