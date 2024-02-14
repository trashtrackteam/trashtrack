import { IonPage, IonRouterOutlet } from "@ionic/react";
import { Redirect, Route } from "react-router-dom";

import ComplainIndex from "../pages/complain";
import ComplainFormPersonalDetails from "../pages/complain/form/personal-details";
import ComplainTabs from "./complain-tabs";

const Complain: React.FC = () => {
    return (
        <IonPage>
            <IonRouterOutlet id="main" animated={false} mode="ios">
                <Route path="/complain/index" render={() => <ComplainIndex />} exact={true} />
                <Route
                    path="/complain/form/personal-details"
                    render={() => <ComplainFormPersonalDetails />}
                    exact={true}
                />

                <Route path="/complain/tabs">
                    <ComplainTabs />
                </Route>
                <Route path="/complain" render={() => <Redirect to="/complain/index" />} exact={true} />
            </IonRouterOutlet>
        </IonPage>
    );
};

export default Complain;
