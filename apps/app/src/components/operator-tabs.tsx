import { Redirect, Route } from "react-router-dom";
import { t } from "i18next";
import { IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonLabel } from "@ionic/react";
import { Icons, OperatorContext } from "@trashtrack/ui";

import OperatorDashboard from "../pages/operator/dashboard";
import { useContext } from "react";
import { UsersPage } from "../pages/operator/user/users.page";
import { DetailedUserPage } from "../pages/operator/user/detailed-user.page";
import { ChangeUserPage } from "../pages/operator/user/change-user.page";
import { CreateUserPage } from "../pages/operator/user/create-user.page";

const OperatorTabs: React.FC = () => {
    const operator = useContext(OperatorContext);

    const isAdmin = operator.role === "admin";

    return (
        <IonTabs>
            <IonRouterOutlet animated={false} mode="ios">
                <Route path="/operator/tabs/dashboard" render={() => <OperatorDashboard />} exact={true} />

                <Route path="/operator/tabs/user" render={() => <UsersPage />} exact={true} />
                <Route path="/operator/tabs/user/create" render={() => <CreateUserPage />} exact={true} />
                <Route path="/operator/tabs/user/details/:user-id" render={() => <DetailedUserPage />} exact={true} />
                <Route path="/operator/tabs/user/update/:user-id" render={() => <ChangeUserPage />} exact={true} />

                <Route path="/operator/tabs" render={() => <Redirect to="/operator/tabs/dashboard" />} exact={true} />
            </IonRouterOutlet>
            <IonTabBar slot="bottom" mode="ios" translucent className="pb-4 pt-4 border-t bg-card shadow-sm">
                <IonTabButton tab="dashboardOperatorTab" href="/operator/tabs/dashboard">
                    <Icons.dashboard strokeWidth={1} className="pt-2 w-[32px] h-[30px]" />
                    <IonLabel className="pt-2 pb-2">Dashboard</IonLabel>
                </IonTabButton>
                <IonTabButton tab="trashbinTab" href="/trash-bin/tabs/trashbin">
                    <Icons.trash strokeWidth={1} className="pt-2 w-[32px] h-[30px]" />
                    <IonLabel className="pt-2 pb-2">{t("tabs.trashbin")}</IonLabel>
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
