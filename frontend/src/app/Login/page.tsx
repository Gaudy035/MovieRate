'use client';

import Link from 'next/link';
import InputTemp from '../Components/Forms/InputTemp';
import ButtonTemp from '../Components/Forms/ButtonTemp';

export default function LoginPage() {
  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col gap-4 justify-center items-center'
    >
      <h1 className='font-bold text-purple-900 text-2xl'>Zaloguj się</h1>
      <InputTemp
        type='email'
        name='userEmail'
        placeholder='Email'
        label='E-mail'
      />
      <InputTemp
        type='password'
        name='userPassword'
        placeholder='Haslo'
        label='Haslo'
      />
      <ButtonTemp buttonText='Zaloguj się' />

      <div className='flex flex-col justify-center items-center'>
        <span>Nie masz konta?</span>
        <Link href={'/Register'} className='underline text-purple-900'>
          Zarejestruj się!
        </Link>
      </div>
    </form>
  );
}
