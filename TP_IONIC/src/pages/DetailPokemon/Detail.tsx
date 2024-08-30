import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonBackButton, IonSpinner } from '@ionic/react';
import { useHistory } from 'react-router-dom';

import './Detail.css';

const Details: React.FC = () => {
    const { slug } = useParams<{ slug: string }>(); // Typage du slug
    const [personnage, setPersonnage] = useState<any>(null); // Initialisation avec null
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const history = useHistory(); // Hook pour la navigation

    useEffect(() => {
        const fetchPersonnage = async () => {
            try {
                const response = await fetch(`https://tyradex.vercel.app/api/v1/pokemon/${slug}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setPersonnage(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPersonnage();
    }, [slug]); // Recharger si le slug change

    // Fonction pour gérer la navigation
    const backHome = () => {
        history.push(`/home`);
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <div className='contentHeader'>
                        <IonBackButton />
                        <div><IonTitle>Details</IonTitle></div>
                    </div>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
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
                {personnage && (
                    <IonCard>
                        <img
                            alt="Sprite"
                            src={personnage.name?.en == 'MissingNo.' ? '../../../public/0010.webp' : personnage.sprites?.regular}
                        />
                        <IonCardHeader>
                            <IonCardTitle>{personnage.name?.en || 'Non défini'}</IonCardTitle>
                            <IonCardSubtitle>{personnage.category || 'Non défini'}</IonCardSubtitle>
                        </IonCardHeader>

                        <IonCardContent>
                            <div>
                                {/* <div><strong>Pokedex ID:</strong> {personnage.pokedex_id || 'Non défini'}</div> */}
                                <div><strong>Height:</strong> {personnage.height || 'Non défini'}</div>
                                <div><strong>Weight:</strong> {personnage.weight || 'Non défini'}</div>
                                <div><strong>Generation:</strong> {personnage.generation || 'Non défini'}</div>
                                <div><strong>Types:</strong> {personnage.types ? personnage.types.map((type: any) => type.name).join(', ') : 'Non défini'}</div>
                                <div><strong>Resistances:</strong> {personnage.resistances ? personnage.resistances.map((resistance: any) => resistance.name).join(', ') : 'Non défini'}</div>
                                <div><strong>Egg Groups:</strong> {personnage.egg_groups ? personnage.egg_groups.map((group: any) => group.name).join(', ') : 'Non défini'}</div>
                                <div><strong>Forms:</strong> {personnage.formes ? personnage.formes.map((form: any) => form.name).join(', ') : 'Non défini'}</div>
                            </div>
                        </IonCardContent>
                    </IonCard>
                )}
            </IonContent>
        </IonPage>
    );
};

export default Details;
