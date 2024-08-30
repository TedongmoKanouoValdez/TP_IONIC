import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonCol,
    IonGrid,
    IonRow,
    IonSelect,
    IonSelectOption,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonIcon,
    IonButton,
    useIonRouter
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import { heart, heartOutline } from "ionicons/icons"; // Icônes pour indiquer si c'est un favori
import '../Tab3.css'

const Favory: React.FC = () => {
    // Récupérer les favoris stockés dans localStorage
    const [favorites, setFavorites] = useState<any[]>(() => {
        return JSON.parse(localStorage.getItem("favoritePokemonIds") || "[]");
    });
    const [colSize, setColSize] = useState<string>("4"); // État pour la taille des colonnes
    const history = useIonRouter(); // Hook pour la navigation

    // Gérer le changement de taille des colonnes
    const handleColSizeChange = (event: any) => {
        setColSize(event.detail.value);
    };

    // Fonction pour supprimer des favoris
    const handleFavory = (id: number) => {
        setFavorites((prevFavorites) => {
            // Supprimer l'élément des favoris s'il est là
            const updatedFavorites = prevFavorites.filter(fav => fav.id !== id);

            // Mettre à jour le localStorage
            localStorage.setItem("favoritePokemonIds", JSON.stringify(updatedFavorites));
            return updatedFavorites;
        });
    };

    useEffect(() => {
        // Synchroniser les favoris avec le localStorage lors du premier rendu
        setFavorites(JSON.parse(localStorage.getItem("favoritePokemonIds") || "[]"));
    }, []);

    // Fonction pour gérer la navigation
    const handleViewDetails = (slug: string) => {
        // Redirige vers une autre page avec le slug comme paramètre
        history.push(`/Detatil/${slug}`);
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Favory</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Favory</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <IonSelect placeholder="Taille de la grille" onIonChange={handleColSizeChange}>
                                <IonSelectOption value="5">2</IonSelectOption>
                                <IonSelectOption value="4">3</IonSelectOption>
                                <IonSelectOption value="3">4</IonSelectOption>
                            </IonSelect>
                        </IonCol>
                    </IonRow>
                </IonGrid>

                <IonGrid>
                    <IonRow>
                        {favorites.length > 0 ? (
                            favorites.map((Pokemon: any, index: number) => {
                                const isFavorited = favorites.some(fav => fav.id === Pokemon.id);
                                return (
                                    <IonCol size={colSize} key={index}>
                                        <IonCard>
                                            <div className="contentfavory">
                                                <IonIcon
                                                    icon={heart}
                                                    size="large"
                                                    className="favorited"
                                                    color={isFavorited ? "danger" : "medium"}
                                                    onClick={() =>
                                                        handleFavory(Pokemon.id)
                                                    }
                                                />
                                            </div>
                                            <img
                                                alt={`Image of ${Pokemon.name}`}
                                                src={Pokemon.image}
                                            />
                                            <IonCardHeader>
                                                <IonCardTitle>{Pokemon.name}</IonCardTitle>
                                                <IonCardSubtitle>{Pokemon.category}</IonCardSubtitle>
                                            </IonCardHeader>
                                            <IonCardContent>
                                                <p>Type: {Pokemon.type}</p>
                                                <div style={{ display: 'flex', width: '100%', justifyContent: 'end' }}>
                                                    <IonButton
                                                        onClick={() =>
                                                            handleViewDetails(Pokemon.id)
                                                        }
                                                        color="primary"
                                                    >
                                                        Voir les détails
                                                    </IonButton>
                                                </div>
                                            </IonCardContent>
                                        </IonCard>
                                    </IonCol>
                                );
                            })
                        ) : (
                            <div>
                                <p>Aucun favori pour le moment</p>
                            </div>
                        )}
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Favory;
