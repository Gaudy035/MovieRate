'use client';

import InputTemp from '../Components/Forms/InputTemp';
import ButtonTemp from '../Components/Forms/ButtonTemp';

export default function RegisterPage() {
  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col gap-4 justify-center items-center'
    >
      <h1 className='font-bold text-purple-900 text-2xl'>Zarejestruj się</h1>
      <InputTemp
        type='text'
        name='userName'
        placeholder='Nazwa uzytkownika'
        label='Nazwa uzytkownika'
      />
      <InputTemp
        type='email'
        name='userEmail'
        placeholder='Email'
        label='Adres e-mail'
      />
      <InputTemp
        type='password'
        name='userPassword'
        placeholder='Hasło'
        label='Hasło'
      />
      <ButtonTemp buttonText='Zarejestruj się' />
    </form>
  );
}
