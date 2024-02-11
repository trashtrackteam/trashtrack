import { Redirect, Route } from "react-router-dom";
import { IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonLabel } from "@ionic/react";
import { Icons } from "@trashtrack/ui";

import OperatorDashboard from "../pages/operator/dashboard";
import OperatorTrashbinDisplay from "../pages/operator/trash-bin/display";
import OperatorUserDisplay from "../pages/operator/user/display";

const OperatorTabs: React.FC = () => {
    return (
        <IonTabs>
            <IonRouterOutlet animated={false} mode="ios">
                <Route path="/operator/tabs/dashboard" render={() => <OperatorDashboard />} exact={true} />
                <Route path="/operator/tabs/trash-bin" render={() => <OperatorTrashbinDisplay />} exact={true} />
                <Route path="/operator/tabs/user" render={() => <OperatorUserDisplay />} exact={true} />
                <Route path="/operator/tabs" render={() => <Redirect to="/operator/tabs/dashboard" />} exact={true} />
            </IonRouterOutlet>
            <IonTabBar slot="bottom" mode="ios" translucent className="pb-4">
                <IonTabButton tab="tab1" href="/operator/tabs/dashboard">
                    <Icons.dashboard strokeWidth={1} className="pt-2 w-[32px] h-[30px]" />
                    <IonLabel className="pt-2">Dashboard</IonLabel>
                </IonTabButton>
                <IonTabButton tab="tab2" href="/operator/tabs/trash-bin">
                    <Icons.trash strokeWidth={1} className="pt-2 w-[32px] h-[30px]" />
                    <IonLabel className="pt-2">Trashbin</IonLabel>
                </IonTabButton>
                <IonTabButton tab="tab3" href="/operator/tabs/user">
                    <Icons.user strokeWidth={1} className="pt-2 w-[32px] h-[30px]" />
                    <IonLabel className="pt-2">User</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    );
};

export default OperatorTabs;
