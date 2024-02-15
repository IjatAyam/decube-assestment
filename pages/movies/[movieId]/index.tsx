import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';

type Props = {
  params: {
    movieId: string;
  };
};

export default function MovieDetail(props: Props) {
  const router = useRouter();
  const movieId = router.query.movieId as string | undefined;
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      if (!movieId) return;
      try {
        setLoading(true);
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT!}/3/movie/${movieId}`, {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`,
          },
        });
        setMovie(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovie();
  }, [movieId]);

  if (!movie && loading === false) {
    return (
      <main className="flex justify-center items-center">
        <h1>That movie is not in our list!</h1>
      </main>
    );
  }

  if (!movie) {
    return (
      <main className="flex justify-center items-center">
        <h1>Loading</h1>
      </main>
    );
  }

  return (
    <main className="flex justify-center items-center pt-10">
      <div className="flex flex-col items-center gap-6 max-w-2xl p-4">
        <Link href="/">go back to list</Link>
        <h1 className="text-3xl font-bold">{movie?.title}</h1>
        <h2 className="text-xl font-bold">Original title: {movie?.original_title}</h2>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="rounded-md max-h-96"
        />
        <p className="text-center">{movie.overview}</p>
      </div>
    </main>
  );
}
