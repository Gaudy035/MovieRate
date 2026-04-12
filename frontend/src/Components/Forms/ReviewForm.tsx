'use client';
import { apiFetch } from '@/lib/api';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ButtonTemp from './ButtonTemp';
import ReviewInput from './subcomponents/ReviewInput';
import ReviewTextArea from './subcomponents/ReviewTextArea';

interface ReviewFormProps {
  movieTitle?: string;
  movieId: number;
}

export default function ReviewForm({ movieTitle, movieId }: ReviewFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const payload = {
      ...Object.fromEntries(formData.entries()),
      movie_id: movieId,
    };

    try {
      const response = await apiFetch(`/reviews/add?movie_id=${movieId}`, {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      router.push(`/movies/${movieId}`);
      router.refresh();
    } catch (error: any) {
      console.log('API Error', error);
      setError(error?.message || 'Nie prawidlowe dane');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col justify-center items-center gap-4'
    >
      <h1 className='font-semibold text-2xl flex flex-col justify-center items-center gap-1'>
        Dodaj opinie do filmu:{' '}
        <span className='text-xl'>{movieTitle ? movieTitle : null}</span>
      </h1>
      <ReviewInput
        type='text'
        name='title'
        placeholder='Tytul'
        label='Tytul recenzji'
      />
      <ReviewTextArea name='body' placeholder='Tresc' label='Tresc recenzji' />
      {error ? <p className='text-red-600'>{error}</p> : null}
      <ButtonTemp buttonText='Zapisz' />
    </form>
  );
}
