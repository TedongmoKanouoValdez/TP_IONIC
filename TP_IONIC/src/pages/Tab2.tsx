import React, { useEffect, useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonSearchbar,
  IonToolbar,
  IonTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonImg,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonIcon,
  IonButton,
  useIonRouter
} from '@ionic/react';
import './Tab2.css';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  overview: string;
}

const Tab2: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [movies, setMovies] = useState<Movie[]>([]);

  const fetchMovies = async (searchQuery: string) => {
    try {
      const response = await fetch(`https://movies-api.julienpoirier-webdev.com/search/movies/${searchQuery}`);
      
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error('Erreur lors de la récupération des films', error);
    }
  };
  const history = useIonRouter(); // Hook pour la navigation


  useEffect(() => {
    const Movies = async () => {
      try {
        const response = await fetch(
         'https://movies-api.julienpoirier-webdev.com/search/movies/'
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMovies(data);
        console.log(data)
        // setFilteredMovies(data); // Initialize filteredPokemons

        // Extraire tous les types uniques des Pokémon
        const allTypes = new Set<string>();
        data.forEach((Movies: any) => {
          if (Array.isArray(Movies.types)) {
            Movies.types.forEach((type: any) => {
              allTypes.add(type.name);
            });
          }
        });
        // setTypes(allTypes);
      } catch (err: any) {
        // setError(err.message);
      } finally {
        // setLoading(false);
      }
    };

    Movies();
  }, []);

  const handleSearch = (e: CustomEvent) => {
    const searchTerm = e.detail.value;
    setQuery(searchTerm);
    if (searchTerm.trim().length > 0) {
      fetchMovies(searchTerm);
    } else {
      setMovies([]);
    }
  };
  // Fonction pour gérer la navigation
  const handleViewDetails = (slug: number) => {
    // Redirige vers une autre page avec le slug comme paramètre
    history.push(`MoviesDetail/${slug}`);
  };

  return (
    <IonPage>
      <IonContent fullscreen>
         <IonToolbar className='header'>
         <IonTitle className='Heading'>Film et Serie</IonTitle>
      <div className='Search-bar'>
        {/* <IonIcon name="film"></IonIcon> */}
        {/* <IonSearchbar value="Value"></IonSearchbar> */}
          <IonSearchbar onIonChange={handleSearch} className='search'color="light" placeholder="Light"></IonSearchbar>
          </div>
          </IonToolbar>
        {/* <IonSearchbar value={query} onIonChange={handleSearch} placeholder="Search for movies"></IonSearchbar> */}
        <IonGrid>
          <IonRow>
            {movies.length > 0 ? (
              movies.map((movie) => (
                <IonCol className='card'size="12" sizeMd="3" sizeLg="3" key={movie.id}>
                  <IonCard >
                    <IonImg className='image' src={` https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                    <IonCardHeader>
                      <IonCardTitle className='Title'>{movie.title}</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <p><strong>Release Date:</strong> {movie.release_date}</p>
                      <p>{movie.overview.length > 100 ? `${movie.overview.substring(0, 100)}...` : movie.overview}</p>
                      <IonButton  onClick={() =>
                                  handleViewDetails(movie.id)}>Detail</IonButton>
      {/* <IonButton disabled={true}>Disabled</IonButton> */}
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              ))
            ) : (
              <p>No movies found. Try a different search.</p>
            )}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
