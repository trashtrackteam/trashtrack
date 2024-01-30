import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";

import "./global.css";
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

import Onboarding from "./pages/onboarding";
import Tabs from "./components/tabs";

setupIonicReact();

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <StrictMode>
        <IonApp>
            <IonReactRouter>
                <IonRouterOutlet id="main" animated={false} mode="ios">
                    <Route path="/onboarding" render={() => <Onboarding />} exact={true} />
                    <Route path="/tabs">
                        <Tabs />
                    </Route>
                    <Route path="/" render={() => <Redirect to="/onboarding" />} exact={true} />
                </IonRouterOutlet>
            </IonReactRouter>
        </IonApp>
    </StrictMode>
);
