import { Redirect, Route } from "react-router-dom";
import { IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonLabel } from "@ionic/react";
import { Icons } from "@trashtrack/ui";

import ComplainDashboard from "../pages/complain/dashboard";
import ComplainReportHistory from "../pages/complain/form/report-history";
import ComplainFormTempatSampah from "../pages/complain/form/tempat-sampah";
import ComplainFormLaporan from "../pages/complain/form/laporan";
import { useTranslation } from "react-i18next";

const ComplainTabs: React.FC = () => {
    const { t } = useTranslation();

    return (
        <IonTabs>
            <IonRouterOutlet animated={false} mode="ios">
                <Route path="/complain/tabs/dashboard" render={() => <ComplainDashboard />} exact={true} />
                <Route
                    path="/complain/tabs/form/report-history"
                    render={() => <ComplainReportHistory />}
                    exact={true}
                />
                <Route
                    path="/complain/tabs/form/tempat-sampah"
                    render={() => <ComplainFormTempatSampah />}
                    exact={true}
                />
                <Route
                    path="/complain/tabs/form/laporan/:tempat_sampah_id"
                    render={() => <ComplainFormLaporan />}
                    exact={true}
                />

                <Route path="/complain/tabs" render={() => <Redirect to="/complain/tabs/dashboard" />} exact={true} />
            </IonRouterOutlet>
            <IonTabBar slot="bottom" mode="ios" translucent className="pb-4 pt-4  border-t border-t-slate-500">
                <IonTabButton tab="dashboardTabsComplain" href="/complain/tabs/dashboard">
                    <Icons.dashboardLaporan strokeWidth={1} className="pt-2 w-[32px] h-[30px]" />
                    <IonLabel className="pt-2 pb-2">Dashboard</IonLabel>
                </IonTabButton>
                <IonTabButton tab="laporanTabs" href="/complain/tabs/form/tempat-sampah">
                    <Icons.tambahakanLaporan strokeWidth={1} className="pt-2 w-[32px] h-[30px]" />
                    <IonLabel className="pt-2 pb-2">{t("tabs.laporkan")}</IonLabel>
                </IonTabButton>
                <IonTabButton tab="riwayatTabs" href="/complain/tabs/form/report-history">
                    <Icons.riwayatLaporan strokeWidth={1} className="pt-2 w-[32px] h-[30px]" />
                    <IonLabel className="pt-2 pb-2">{t("tabs.riwayat")}</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    );
};

export default ComplainTabs;
