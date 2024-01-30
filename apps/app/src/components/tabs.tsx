import { Redirect, Route } from "react-router-dom";
import { IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonLabel } from "@ionic/react";

import Home from "../pages/home";
import Preferences from "../pages/preferences";
import { Icons } from "@trashtrack/ui";

const Tabs: React.FC = () => {
    return (
        <IonTabs>
            <IonRouterOutlet>
                <Route path="/tabs/home" render={() => <Home />} exact={true} />
                <Route path="/tabs/preferences" render={() => <Preferences />} exact={true} />
                <Route path="/tabs" render={() => <Redirect to="//tabs/home" />} exact={true} />
            </IonRouterOutlet>
            <IonTabBar slot="bottom" mode="ios" translucent className="pb-4">
                <IonTabButton tab="tab1" href="/tabs/home">
                    <Icons.home strokeWidth={1} className="pt-2 w-[32px] h-[30px]" />
                    <IonLabel className="pt-2">Home</IonLabel>
                </IonTabButton>
                <IonTabButton tab="tab2" href="/tabs/preferences">
                    <Icons.settings strokeWidth={1} className="pt-2 w-[32px] h-[30px]" />
                    <IonLabel className="pt-2">Preferences</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    );
};

export default Tabs;
