import React from "react";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";

import "@ionic/react/css/core.css";

import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

import Home from "../pages/home";
import Onboarding from "../pages/onboarding";

setupIonicReact();

const App: React.FC = () => {
    return (
        <IonApp>
            <IonReactRouter>
                <IonRouterOutlet id="main" animated={false} mode="ios">
                    <Route path="/onboarding" component={Onboarding} />
                    <Route path="/home" component={Home} />
                    <Redirect exact from="/" to="/onboarding" />
                </IonRouterOutlet>
            </IonReactRouter>
        </IonApp>
    );
};

export default App;
