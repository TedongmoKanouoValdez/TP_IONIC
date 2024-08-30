import { IonContent, IonBadge, IonHeader, IonPage, IonToolbar, IonTitle, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel, IonProgressBar } from '@ionic/react';
import { Route, Redirect } from 'react-router-dom';
import { ellipse, square, triangle, homeOutline, logoOctocat, filmOutline, heartOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import Home from './pages/Home/home';
import Tab1 from './pages/ListePokemon';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import Details from './pages/DetailPokemon/Detail';
import Favory from './pages/Favory/favory';
import { useLocation } from 'react-router';
import './App.css'; // Assurez-vous que le fichier CSS est correctement importé

const MainLayout: React.FC = () => {
    const location = useLocation();
    const showTabs = !['/home'].includes(location.pathname);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prevProgress) => prevProgress + 0.01);
        }, 50);

        return () => clearInterval(interval);
    }, []);

    // if (progress > 1) {
    //     setTimeout(() => {
    //         setProgress(0);
    //     }, 1000);
    // }

    // Récupérer les favoris stockés dans localStorage
    const [favorites, setFavorites] = useState<any[]>(() => {
        return JSON.parse(localStorage.getItem("favoritePokemonIds") || "[]");
    });

    return (
        <IonPage>

            {progress > 1 ?
                (<IonContent>
                    <IonTabs>
                        <IonRouterOutlet>
                            <Route exact path="/home" component={Home} />
                            <Route exact path="/Pokemon" component={Tab1} />
                            <Route exact path="/Detatil/:slug" component={Details} />
                            <Route exact path="/tab2" component={Tab2} />
                            <Route path="/favory" component={Favory} />
                            <Route exact path="/">
                                <Redirect to="/home" />
                            </Route>
                        </IonRouterOutlet>
                        <IonTabBar slot="bottom" className={showTabs ? '' : 'hide-tabs'}>
                            <IonTabButton tab="home" href="/home">
                                <IonIcon aria-hidden="true" icon={homeOutline} />
                                {/* <IonLabel>Home</IonLabel> */}
                            </IonTabButton>
                            <IonTabButton tab="Pokemon" href="/Pokemon">
                                <IonIcon aria-hidden="true" icon={logoOctocat} />
                                {/* <IonLabel>Tab 1</IonLabel> */}
                            </IonTabButton>
                            <IonTabButton tab="tab2" href="/tab2">
                                <IonIcon aria-hidden="true" icon={filmOutline} />
                                {/* <IonLabel>Tab 2</IonLabel> */}
                            </IonTabButton>
                            <IonTabButton tab="favory" href="/favory">
                                <IonIcon aria-hidden="true" icon={heartOutline} />
                                <IonBadge>{favorites.length}</IonBadge>
                            </IonTabButton>
                        </IonTabBar>
                    </IonTabs>
                </IonContent>)
                : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ width: '100%' }}>
                            <IonProgressBar value={progress}></IonProgressBar>
                        </div>
                    </div>
                )
            }
        </IonPage>
    );
};

export default MainLayout;
