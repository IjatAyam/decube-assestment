import { Inter } from 'next/font/google';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });
const cn = (...classes: string[]) => classes.filter(Boolean).join(' ');

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT!}/3/movie/popular`, {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`,
          },
        });

        setMovies(data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, []);
  return (
    <main className={cn('min-h-screen flex flex-col items-center justify-center p-24 gap-4', inter.className)}>
      <h1 className="text-2xl font-bold">Movie list</h1>
      <ul className="grid grid-cols-3 gap-4">
        {movies.map(movie => (
          <li key={movie.id} className="flex flex-col gap-2">
            <Link href={`/movies/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="rounded-md"
              />
              <h2>{movie.title}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
