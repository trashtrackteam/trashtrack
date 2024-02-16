import { Redirect, Route } from "react-router-dom";
import { IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonLabel } from "@ionic/react";
import { Icons } from "@trashtrack/ui";

import Home from "../pages/home";
import Preferences from "../pages/preferences";
import { useTranslation } from "react-i18next";

const Tabs: React.FC = () => {
    const { t } = useTranslation();

    return (
        <IonTabs>
            <IonRouterOutlet animated={false} mode="ios">
                <Route path="/tabs/home" render={() => <Home />} exact={true} />
                <Route path="/tabs/preferences" render={() => <Preferences />} exact={true} />
                <Route path="/tabs" render={() => <Redirect to="/tabs/home" />} exact={true} />
            </IonRouterOutlet>
            <IonTabBar slot="bottom" mode="ios" translucent className="pb-4 pt-4 border-t-2 border-t-black">
                <IonTabButton tab="homeTab" href="/tabs/home">
                    <Icons.home strokeWidth={1} className="pt-2 w-[32px] h-[30px]" />
                    <IonLabel className="pt-2 pb-2">{t("tabs.home")}</IonLabel>
                </IonTabButton>
                <IonTabButton tab="preferencesTabs" href="/tabs/preferences">
                    <Icons.settings strokeWidth={1} className="pt-2 w-[32px] h-[30px]" />
                    <IonLabel className="pt-2 pb-2">{t("tabs.preferences")}</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    );
};

export default Tabs;
