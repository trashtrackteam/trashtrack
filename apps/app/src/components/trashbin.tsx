import { Redirect, Route } from "react-router-dom";
import { IonPage, IonRouterOutlet } from "@ionic/react";

import TrashbinTabs from "./trashbin-tabs";

const Trashbin: React.FC = () => {
    return (
        <IonPage>
            <IonRouterOutlet id="trashbin" animated={false} mode="ios">
                <Route path="/trash-bin/tabs">
                    <TrashbinTabs />
                </Route>
                <Route path="/trash-bin" render={() => <Redirect to="/operator/tabs/trash-bin/tabs" />} exact={true} />
            </IonRouterOutlet>
        </IonPage>
    );
};

export default Trashbin;
