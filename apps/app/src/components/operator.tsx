import { IonPage, IonRouterOutlet } from "@ionic/react";
import { Redirect, Route } from "react-router-dom";

import OperatorFormLogin from "../pages/operator/form/login";
import OperatorIndex from "../pages/operator";
import OperatorTabs from "./operator-tabs";

const Operator: React.FC = () => {
    return (
        <IonPage>
            <IonRouterOutlet id="main" animated={false} mode="ios">
                <Route path="/operator/index" render={() => <OperatorIndex />} exact={true} />
                <Route path="/operator/form/login" render={() => <OperatorFormLogin />} exact={true} />

                <Route path="/operator/tabs">
                    <OperatorTabs />
                </Route>

                <Route path="/operator" render={() => <Redirect to="/operator/index" />} exact={true} />
            </IonRouterOutlet>
        </IonPage>
    );
};

export default Operator;
