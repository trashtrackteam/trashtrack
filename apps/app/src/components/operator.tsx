import { IonPage, IonRouterOutlet } from "@ionic/react";
import { Redirect, Route } from "react-router-dom";

import OperatorFormLogin from "../pages/operator/form/login";
import OperatorDashboard from "../pages/operator/dashboard";
import OperatorIndex from "../pages/operator";

const Operator: React.FC = () => {
    return (
        <IonPage>
            <IonRouterOutlet id="main" animated={false} mode="ios">
                <Route path="/operator/index" render={() => <OperatorIndex />} exact={true} />
                <Route path="/operator/dashboard" render={() => <OperatorDashboard />} exact={true} />
                <Route path="/operator/form/login" render={() => <OperatorFormLogin />} exact={true} />

                <Route path="/operator" render={() => <Redirect to="/operator/index" />} exact={true} />
            </IonRouterOutlet>
        </IonPage>
    );
};

export default Operator;
