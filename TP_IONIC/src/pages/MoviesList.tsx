import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonCol, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg, IonSearchbar, IonLabel } from '@ionic/react';
import axios from 'axios';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
}

interface ApiResponse {
  results: Movie[];
}

const MovieSearchPage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = async (query: string) => {
    if (!query) return;  // Ne pas effectuer la recherche si le champ est vide

    try {
      setLoading(true);
      const response = await axios.get<ApiResponse>(`http://movies-api.julienpoirier-webdev.com/search/movies/${query}`);
      setMovies(response.data.results);
    } catch (err) {
      setError('Erreur lors de la récupération des films.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      fetchMovies(searchQuery);
    }
  }, [searchQuery]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Recherche de Films</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonSearchbar
          placeholder="Rechercher des films"
          value={searchQuery}
          onIonInput={(e: any) => setSearchQuery(e.target.value)}
          debounce={500}
        />
        {loading && <p>Chargement des films...</p>}
        {error && <p>{error}</p>}
        {movies.length > 0 ? (
          movies.map((movie) => (
            <IonCol size='4' sizeMd='6' sizeLg='3' key={movie.id}>
              <IonCard style={{with:'28%!important'}}>
                <IonCardHeader>
                  <IonCardTitle>{movie.title}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonImg style={{with:'28%!important'}} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                  <p><strong>Date de sortie :</strong> {movie.release_date}</p>
                  <p>{movie.overview.length > 100 ? `${movie.overview.substring(0, 100)}...` : movie.overview}</p>
                </IonCardContent>
            </IonCard>
            </IonCol>
          ))
        ) : (
          <p>Aucun film trouvé.</p>
        )}
      </IonContent>
    </IonPage>
  );
};

export default MovieSearchPage;
