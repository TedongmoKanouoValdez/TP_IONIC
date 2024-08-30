import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCol, IonGrid, IonRow, useIonRouter, IonButton } from '@ionic/react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import './home.css';

const Home: React.FC = () => {

    const history = useIonRouter(); // Hook pour la navigation

    const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        // Accéder à l'attribut data-name de l'élément cliqué
        const target = event.currentTarget;
        const dataName = target.getAttribute('data-name');
        if (dataName == "film") {
            history.push(`/tab2/`);
        } else if (dataName == "pokemon") {
            history.push(`/Pokemon/`);
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Home</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Home</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonGrid>
                    <IonCol>
                        <IonCol>
                            <IonCard>
                                <img alt="Silhouette of mountains" src="https://c4.wallpaperflare.com/wallpaper/999/730/463/yellow-fiction-cap-pikachu-detective-hd-wallpaper-preview.jpg" />
                                <IonCardHeader>
                                    <IonCardTitle>Pokémon</IonCardTitle>
                                </IonCardHeader>

                                <IonCardContent>
                                    <div>
                                        <div><p>Here's a small text description for the card content. Nothing more, nothing less.</p></div>
                                        <div>
                                            <IonButton data-name="pokemon" onClick={handleClick}>Voir plus</IonButton>
                                        </div>
                                    </div>
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                        <IonCol>
                            <IonCard>
                                <img alt="Silhouette of mountains" src="https://c4.wallpaperflare.com/wallpaper/22/762/507/film-movie-filmmaker-movie-director-wallpaper-preview.jpg" />
                                <IonCardHeader>
                                    <IonCardTitle>Film</IonCardTitle>
                                </IonCardHeader>

                                <IonCardContent>
                                    <div>
                                        <div><p>Here's a small text description for the card content. Nothing more, nothing less.</p></div>
                                        <div>
                                            <IonButton data-name="film" onClick={handleClick}>Voir plus</IonButton>
                                        </div>
                                    </div>
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                    </IonCol>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Home;
