import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCol,
  IonGrid,
  IonRow,
  useIonRouter,
  IonButton,
  IonSpinner,
  IonSelect,
  IonSelectOption,
  IonSearchbar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import { heart } from 'ionicons/icons';
import "./Tab1.css";

const Tab1: React.FC = () => {
  const [Pokemons, setPokemons] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const history = useIonRouter(); // Hook pour la navigation
  const [types, setTypes] = useState<Set<string>>(new Set()); // Pour stocker les types uniques
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [filteredPokemons, setFilteredPokemons] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>(""); // État pour la barre de recherche
  const [colSize, setColSize] = useState<string>("4"); // État pour la taille des colonnes
  const [favorites, setFavorites] = useState<any[]>([]); // État pour les favoris
  
  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch(
          "https://tyradex.vercel.app/api/v1/pokemon"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPokemons(data);
        setFilteredPokemons(data); // Initialize filteredPokemons

        // Extraire tous les types uniques des Pokémon
        const allTypes = new Set<string>();
        data.forEach((pokemon: any) => {
          if (Array.isArray(pokemon.types)) {
            pokemon.types.forEach((type: any) => {
              allTypes.add(type.name);
            });
          }
        });
        setTypes(allTypes);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  useEffect(() => {
    // Appliquer le filtrage
    let filtered = Pokemons;

    // Filtrage par type sélectionné
    if (selectedType !== null && selectedType !== "Aucun") {
      filtered = filtered.filter((pokemon) => {
        const types = Array.isArray(pokemon.types)
          ? pokemon.types.map((type: any) => type.name).join(", ")
          : "Aucun type";
        return types.includes(selectedType);
      });
    }

    // Filtrage par recherche
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((pokemon) =>
        pokemon.name.en.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Mettre à jour la liste des Pokémons filtrés
    setFilteredPokemons(filtered);
  }, [selectedType, searchQuery, Pokemons]);

  const handleTypeChange = (event: any) => {
    setSelectedType(event.detail.value);
  };

  const handleSearchChange = (event: any) => {
    setSearchQuery(event.detail.value);
  };

  const handleColSizeChange = (event: any) => {
    setColSize(event.detail.value);
  };

  // Fonction pour gérer la navigation
  const handleViewDetails = (slug: string) => {
    // Redirige vers une autre page avec le slug comme paramètre
    history.push(`/Detatil/${slug}`);
  };

  const handleFavory = (id: number, name: string, type: string, image: string, category: string) => {
    const newFavorite = { id, name, type, image, category };

    setFavorites((prevFavorites) => {
      const alreadyFavorited = prevFavorites.some((fav) => fav.id === id);

      if (alreadyFavorited) {
        // Supprimer l'élément des favoris s'il est déjà là
        const updatedFavorites = prevFavorites.filter((fav) => fav.id !== id);
        localStorage.setItem("favoritePokemonIds", JSON.stringify(updatedFavorites));
        return updatedFavorites;
      } else {
        // Ajouter l'élément aux favoris s'il n'y est pas encore
        const updatedFavorites = [...prevFavorites, newFavorite];
        localStorage.setItem("favoritePokemonIds", JSON.stringify(updatedFavorites));
        return updatedFavorites;
      }
    });
  };


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Pokémons</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Pokémons</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonGrid>
          <IonRow>
            <IonCol>
              <IonSearchbar
                showClearButton="always"
                placeholder="Saisir..."
                // value={searchQuery}
                onIonChange={handleSearchChange}
              ></IonSearchbar>
            </IonCol>
            <IonCol>
              <IonSelect placeholder="Select type" onIonChange={handleTypeChange}>
                <IonSelectOption value="Aucun">Aucun</IonSelectOption>
                {!loading &&
                  !error &&
                  Array.from(types).map((type, index) => (
                    <IonSelectOption key={index} value={type}>
                      {type}
                    </IonSelectOption>
                  ))}
              </IonSelect>
            </IonCol>
            <IonCol>
              <IonSelect label="grid pour afficher" placeholder="..." onIonChange={handleColSizeChange}>
                <IonSelectOption value="5">2</IonSelectOption>
                <IonSelectOption value="4">3</IonSelectOption>
                <IonSelectOption value="3">4</IonSelectOption>
              </IonSelect>
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonGrid>
          <IonRow>
            {loading && (
              <div className="ion-padding">
                <IonSpinner name="crescent" />
              </div>
            )}
            {error && (
              <div className="ion-padding">
                <p>Erreur lors du chargement des données : {error}</p>
              </div>
            )}
            {!loading &&
              !error &&
              filteredPokemons.map((Pokemon, index) => {
                // Extraire les types du Pokémon
                const types = Array.isArray(Pokemon.types)
                  ? Pokemon.types.map((type: any) => type.name).join(", ")
                  : "Aucun type";

                // Vérifiez directement dans le localStorage si l'id du Pokémon existe
                const storedFavorites = JSON.parse(localStorage.getItem("favoritePokemonIds") || "[]");
                const isFavorited = storedFavorites.some((fav: any) => fav.id === Pokemon.pokedex_id);

                return (
                  <IonCol size={colSize} key={index}>
                    <div data-name={Pokemon.name.en} data-type={types}>
                      <IonCard>
                        <div className="contentfavory">
                          <IonIcon
                            aria-hidden="true"
                            icon={heart}
                            color={isFavorited ? "danger" : ""}
                            size="large"
                            onClick={() =>
                              handleFavory(Pokemon.pokedex_id, Pokemon.name.en, types, Pokemon.name.en === "MissingNo." ? "../../public/0010.webp" : Pokemon.sprites.regular, Pokemon.category)
                            }
                          />
                        </div>
                        <img
                          alt="Silhouette of mountains"
                          src={
                            Pokemon.name.en === "MissingNo."
                              ? "../../public/0010.webp"
                              : Pokemon.sprites.regular
                          }
                        />
                        <IonCardHeader>
                          <IonCardTitle>{Pokemon.name.en}</IonCardTitle>
                          <IonCardSubtitle>{Pokemon.category}</IonCardSubtitle>
                        </IonCardHeader>

                        <IonCardContent>
                          <div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                marginBottom: "1rem",
                              }}
                            >
                              <div style={{ fontWeight: "bold" }}>Type:</div>
                              <div>{types}</div>
                            </div>
                            <div style={{display: 'flex', width:'100%', justifyContent:'end'}}>
                              <IonButton
                                onClick={() =>
                                  handleViewDetails(Pokemon.pokedex_id)
                                }
                                color="primary"
                              >
                                Voir les détails
                              </IonButton>
                            </div>
                          </div>
                        </IonCardContent>
                      </IonCard>
                    </div>
                  </IonCol>
                );
              })}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
