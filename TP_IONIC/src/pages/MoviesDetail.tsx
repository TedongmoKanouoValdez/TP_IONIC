

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonImg,
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/react';
import { cart } from 'ionicons/icons';

interface Movie {
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
  belongs_to_collection: { name: string } | null;
}

const MovieDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
    // alert ();
  useEffect(() => {
    fetch(`https://movies-api.julienpoirier-webdev.com/infos/movies${slug}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setMovie(data))
      .catch((error) => console.error('Erreur lors de la récupération des détails du film:', error));
  }, [slug]);
// alert(slug);
  if (!movie) {
    return <p>Chargement...</p>;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Détails du Film</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        
        <IonCard>
          <IonImg className='image' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
          <IonCardHeader>
            <IonCardTitle>{movie.title}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p><strong>Date de sortie:</strong> {movie.release_date}</p>
            <p><strong>Synopsis:</strong> {movie.overview}</p>
            <p><strong>Durée:</strong> {movie.runtime} minutes</p>
            <p><strong>Genres:</strong> {movie.genres.map(genre => genre.name).join(', ')}</p>
            <p><strong>Nom original:</strong> {movie.original_title}</p>
            <p><strong>Pays de production:</strong> {movie.production_countries.map(country => country.name).join(', ')}</p>
            <p><strong>Langues parlées:</strong> {movie.spoken_languages.map(lang => lang.name).join(', ')}</p>
            <p><strong>Tagline:</strong> {movie.tagline}</p>
            <p><strong>Budget:</strong> ${movie.budget.toLocaleString()}</p>
            {movie.belongs_to_collection && (
              <p><strong>Collection:</strong> {movie.belongs_to_collection.name}</p>
            )}
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default MovieDetail;
