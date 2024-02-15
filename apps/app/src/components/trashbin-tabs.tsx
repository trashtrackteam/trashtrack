import { Redirect, Route } from "react-router-dom";
import { IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonLabel } from "@ionic/react";
import { Icons } from "@trashtrack/ui";

import OperatorTrashbinDisplay from "../pages/operator/trash-bin/display";
import OperatorSubTrashbinDisplay from "../pages/operator/trash-bin/subtrashbin/subtrash-bin";
import OperatorReportActionDisplay, { ReportsPage } from "../pages/operator/trash-bin/report/reports.page";
import OperatorFeedbackDisplay from "../pages/operator/trash-bin/report/feedback/feedback";
import OperatorTrashDisplay from "../pages/operator/trash-bin/subtrashbin/trash/trash";
import { useTranslation } from "react-i18next";
import { DetailedReportPage } from "../pages/operator/trash-bin/report/detailed-report.page";

const TrashbinTabs: React.FC = () => {
    const { t } = useTranslation();

    return (
        <IonTabs>
            <IonRouterOutlet animated={false} mode="ios">
                <Route path="/trash-bin/tabs/trashbin" render={() => <OperatorTrashbinDisplay />} exact={true} />
                <Route
                    path="/trash-bin/tabs/sub-trashbin/:trash_bin_id"
                    render={() => <OperatorSubTrashbinDisplay />}
                    exact={true}
                />

                <Route path="/trash-bin/tabs/report-action" render={() => <ReportsPage />} exact={true} />
                <Route
                    path="/trash-bin/tabs/report-action/detail/:report_id"
                    render={() => <DetailedReportPage />}
                    exact={true}
                />

                <Route path="/trash-bin/tabs/feedback" render={() => <OperatorFeedbackDisplay />} exact={true} />
                <Route path="/trash-bin/tabs/trash" render={() => <OperatorTrashDisplay />} exact={true} />

                <Route path="/trash-bin/tabs" render={() => <Redirect to="/trash-bin/tabs/trashbin" />} exact={true} />
            </IonRouterOutlet>
            <IonTabBar slot="bottom" mode="ios" translucent className="pb-4">
                <IonTabButton tab="backTabs" href="/operator">
                    <Icons.back strokeWidth={1} className="pt-2 w-[32px] h-[30px]" />
                    <IonLabel className="pt-2 pb-2">{t("tabs.back")}</IonLabel>
                </IonTabButton>
                <IonTabButton tab="trashbinTabs" href="/trash-bin/tabs/trashbin">
                    <Icons.trash strokeWidth={1} className="pt-2 w-[32px] h-[30px]" />
                    <IonLabel className="pt-2 pb-2">Trashbin</IonLabel>
                </IonTabButton>
                {/* <IonTabButton tab="subTrashbinTabs" href="/trash-bin/tabs/sub-trashbin">
                    <Icons.subTrashbin strokeWidth={1} className="pt-2 w-[32px] h-[30px]" />
                    <IonLabel className="pt-2 pb-2">Sub Trashbin</IonLabel>
                </IonTabButton> */}
                <IonTabButton tab="reportTabs" href="/trash-bin/tabs/report-action">
                    <Icons.report strokeWidth={1} className="pt-2 w-[32px] h-[30px]" />
                    <IonLabel className="pt-2 pb-2">{t("tabs.report")}</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    );
};

export default TrashbinTabs;
