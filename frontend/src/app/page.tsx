'use client';

import MovieBlock from './Components/MovieBlock/MovieBlock';
import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';
import Movie from './Interfaces/Movie';

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    async function loadMovies() {
      try {
        const data = await apiFetch('/movies/getAll', { method: 'GET' });
        setMovies(data);
      } catch (error) {
        console.log('Failed to get movies', error);
      }
    }

    loadMovies();
  }, []);

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='flex justify-start items-start max-w-4xl w-full'>
        <h1 className='text-purple-900 font-bold text-2xl py-6'>
          Popularne filmy:
        </h1>
      </div>
      <div className='flex flex-col gap-6'>
        {movies.map((movie) => (
          <MovieBlock
            key={movie.movie_id}
            movieId={movie.movie_id}
            movieTitle={movie.title}
            movieDesc={movie.description}
            imgUrl={movie.poster_url}
            rating={5}
          />
        ))}
      </div>
    </div>
  );
}
