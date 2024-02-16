import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";

import Onboarding from "../pages/onboarding";
import Tabs from "./tabs";

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
import Complain from "./complain";
import Operator from "./operator";
import { useState } from "react";
import { OperatorContext } from "@trashtrack/ui";
import Trashbin from "./trashbin";

setupIonicReact();

const App: React.FC = () => {
    const [operator, setOperator] = useState(null);
    const [role, setRole] = useState(null);
    const [id, setId] = useState("");

    return (
        <IonApp>
            <IonReactRouter>
                <IonRouterOutlet id="main" animated={false} mode="ios">
                    <OperatorContext.Provider
                        value={{
                            operator: operator,
                            setOperator: setOperator,
                            role: role,
                            setRole: setRole,
                            id: id,
                            setId: setId,
                        }}
                    >
                        <Route path="/onboarding" render={() => <Onboarding />} exact={true} />
                        <Route path="/tabs">
                            <Tabs />
                        </Route>
                        <Route path="/complain">
                            <Complain />
                        </Route>
                        <Route path="/operator">
                            <Operator />
                        </Route>
                        <Route path="/trash-bin">
                            <Trashbin />
                        </Route>
                        <Route path="/" render={() => <Redirect to="/onboarding" />} exact={true} />
                    </OperatorContext.Provider>
                </IonRouterOutlet>
            </IonReactRouter>
        </IonApp>
    );
};

export default App;
