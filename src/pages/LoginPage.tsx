import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TUserForm } from '../types';

const LoginPage = () => {

  const navigate = useNavigate();

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { register, handleSubmit, formState: { errors } } = useForm<TUserForm>({
    mode: "onChange"
  })

  const onSubmit: SubmitHandler<TUserForm> = (data) => {

    if (data.username === 'admin' && data.password === 'admin') {
      localStorage.setItem('isLoggedIn', 'true')
      navigate('/')
    } else {
      alert('Неверный логин или пароль!')
    }
  }

  return (
    <div className='tablet:p-10 tablet:w-[600px] bg-white tablet:mx-auto my-8 rounded-2xl phone:w-full phone:mx-3 phone:px-5 phone:py-10 custom-container'>
      <h1 className='text-center text-xl font-bold mb-6'>Страница входа</h1>
      <form
        className='max-w-[600px] mx-auto'
        onSubmit={handleSubmit(onSubmit)}>
        <Input
          label='логин'
          name="username"
          value={username}
          setUserChange={setUsername}
          register={register}
          errors={errors} />
        <Input
          label='пароль'
          name="password"
          value={password}
          setUserChange={setPassword}
          register={register}
          errors={errors} />
        <Button type="submit">
          Войти
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
