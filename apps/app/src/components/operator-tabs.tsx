import { Redirect, Route } from "react-router-dom";
import { IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonLabel } from "@ionic/react";
import { Icons, OperatorContext } from "@trashtrack/ui";

import OperatorDashboard from "../pages/operator/dashboard";
import OperatorUserDisplay from "../pages/operator/user/display";
import { useContext } from "react";

const OperatorTabs: React.FC = () => {
    const operator = useContext(OperatorContext);

    const isAdmin = operator.role === "admin";

    return (
        <IonTabs>
            <IonRouterOutlet animated={false} mode="ios">
                <Route path="/operator/tabs/dashboard" render={() => <OperatorDashboard />} exact={true} />

                <Route path="/operator/tabs/user" render={() => <OperatorUserDisplay />} exact={true} />
                <Route path="/operator/tabs" render={() => <Redirect to="/operator/tabs/dashboard" />} exact={true} />
            </IonRouterOutlet>
            <IonTabBar slot="bottom" mode="ios" translucent className="pb-4">
                <IonTabButton tab="dashboardOperatorTab" href="/operator/tabs/dashboard">
                    <Icons.dashboard strokeWidth={1} className="pt-2 w-[32px] h-[30px]" />
                    <IonLabel className="pt-2 pb-2">Dashboard</IonLabel>
                </IonTabButton>
                <IonTabButton tab="trashbinTab" href="/trash-bin/tabs/trash">
                    <Icons.trash strokeWidth={1} className="pt-2 w-[32px] h-[30px]" />
                    <IonLabel className="pt-2 pb-2">Trashbin</IonLabel>
                </IonTabButton>
                {isAdmin && (
                    <IonTabButton tab="userOperatorTab" href="/operator/tabs/user">
                        <Icons.user strokeWidth={1} className="pt-2 w-[32px] h-[30px]" />
                        <IonLabel className="pt-2 pb-2">User</IonLabel>
                    </IonTabButton>
                )}
            </IonTabBar>
        </IonTabs>
    );
};

export default OperatorTabs;
