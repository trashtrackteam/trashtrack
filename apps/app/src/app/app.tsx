import React from "react";
import { IonApp, IonPage, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";

import "@ionic/react/css/core.css";
import Home from "../pages/home";
import Onboard from "../pages/onboard";
import Test from "../pages/test";

const App: React.FC = () => {
    return (
        <IonApp>
            <IonPage>
                <IonReactRouter>
                    <IonRouterOutlet>
                        <Route path="/onboard" component={Onboard} />
                        <Route path="/home" component={Home} />
                        <Route path="/test" component={Test} />
                        <Redirect exact from="/" to="/onboard" />
                    </IonRouterOutlet>
                </IonReactRouter>
            </IonPage>
        </IonApp>
    );
};

export default App;
