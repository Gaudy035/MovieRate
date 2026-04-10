import Link from 'next/link';
import Movie from '@/Interfaces/Movie';
import { apiFetch } from '@/lib/api';

export default async function ReviewsPage({
  searchParams,
}: {
  searchParams: Promise<{ movie_id?: number }>;
}) {
  const { movie_id } = await searchParams;
  const movie: Movie = await apiFetch(`/movies/${movie_id}`);
  const avgRating = movie.average_rating;

  return (
    <div className='flex flex-col justify-center items-center py-8 px-16'>
      <div className='grid grid-cols-3 gap-12'>
        <img
          src={movie.poster_url}
          alt={`Plakat${movie.title}`}
          className='rounded-xl w-full h-auto'
        />
        <div className='col-span-2 py-8 flex flex-col justify-start items-start gap-2'>
          <h1 className='font-bold text-3xl'>{movie.title}</h1>
          <p className='font-semibold text-2xl'>
            {avgRating ? `Średnia ocen: ${avgRating} / 10` : 'Brak recenzji'}
          </p>
          <p className='font-semibold text-xl'>
            Czas Trwania: {movie.duration}
          </p>
          <p className='font-semibold text-xl'>Opis:</p>
          <p className='text-lg text-left'>{movie.description}</p>
        </div>
      </div>
    </div>
  );
}
