import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg, IonButton, IonLabel } from '@ionic/react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

interface MovieDetails {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  overview: string;
  runtime: number;
  genres: { name: string }[];
  original_title: string;
  production_countries: { name: string }[];
  spoken_languages: { name: string }[];
  tagline: string;
  budget: number;
  belongs_to_collection?: {
    name: string;
  };
}

const MovieDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get<MovieDetails>(`http://movies-api.julienpoirier-webdev.com/infos/movies/${id}`);
        setMovie(response.data);
      } catch (err) {
        setError('Erreur lors de la récupération des détails du film.');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return <p>Chargement des détails du film...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!movie) {
    return <p>Film non trouvé.</p>;
  }

  const backdropUrl = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`;
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButton slot="start" onClick={() => history.goBack()}>Retour</IonButton>
          <IonTitle>Détails du Film</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div style={{
          background: `url(${backdropUrl}) no-repeat center center`,
          backgroundSize: 'cover',
          padding: '20px',
          height: '100vh'
        }}>
          <IonCard style={{ background: 'rgba(255, 255, 255, 0.8)', padding: '20px' }}>
            <IonCardHeader>
              <IonCardTitle>{movie.title}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonImg src={posterUrl} alt={movie.title} style={{ width: '100%', borderRadius: '10px' }} />
              <p><strong>Date de sortie :</strong> {movie.release_date}</p>
              <p><strong>Durée :</strong> {movie.runtime} minutes</p>
              <p><strong>Synopsis :</strong> {movie.overview}</p>
              <p><strong>Genres :</strong> {movie.genres.map(genre => genre.name).join(', ')}</p>
              <p><strong>Titre original :</strong> {movie.original_title}</p>
              <p><strong>Pays de production :</strong> {movie.production_countries.map(country => country.name).join(', ')}</p>
              <p><strong>Langues parlées :</strong> {movie.spoken_languages.map(language => language.name).join(', ')}</p>
              <p><strong>Tagline :</strong> {movie.tagline}</p>
              <p><strong>Budget :</strong> ${movie.budget.toLocaleString()}</p>
              {movie.belongs_to_collection && (
                <p><strong>Collection :</strong> {movie.belongs_to_collection.name}</p>
              )}
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default MovieDetailPage;
