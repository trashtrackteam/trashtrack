import { Redirect, Route } from "react-router-dom";
import { IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonLabel } from "@ionic/react";
import { Icons } from "@trashtrack/ui";

import OperatorTrashbinDisplay from "../pages/operator/trash-bin/display";
import OperatorSubTrashbinDisplay from "../pages/operator/trash-bin/subtrashbin/subtrash-bin";
import { ReportsPage } from "../pages/operator/trash-bin/report/reports.page";
import OperatorTrashDisplay from "../pages/operator/trash-bin/subtrashbin/trash/trash";
import { useTranslation } from "react-i18next";
import { DetailedReportPage } from "../pages/operator/trash-bin/report/detailed-report.page";
import FeedbackPage from "../pages/operator/trash-bin/report/report-feedback/feedback.page";
import CreateFeedbackPage from "../pages/operator/trash-bin/report/report-feedback/create-feedback.page";

const TrashbinTabs: React.FC = () => {
    const { t } = useTranslation();

    return (
        <IonTabs>
            <IonRouterOutlet animated={false} mode="ios">
                {/* Trash Bin */}
                <Route path="/trash-bin/tabs/trashbin" render={() => <OperatorTrashbinDisplay />} exact={true} />

                {/* Report */}
                <Route path="/trash-bin/tabs/report-action" render={() => <ReportsPage />} exact={true} />
                <Route
                    path="/trash-bin/tabs/report-action/detail/:report_id"
                    render={() => <DetailedReportPage />}
                    exact={true}
                />
                {/* Report Feedback */}
                <Route path="/trash-bin/tabs/feedback/:report_id" render={() => <FeedbackPage />} exact={true} />
                <Route
                    path="/trash-bin/tabs/feedback/:report_id/create"
                    render={() => <CreateFeedbackPage />}
                    exact={true}
                />

                {/* Index */}
                <Route path="/trash-bin/tabs" render={() => <Redirect to="/trash-bin/tabs/trashbin" />} exact={true} />
            </IonRouterOutlet>
            <IonTabBar
                slot="bottom"
                mode="ios"
                translucent
                className="pb-4 pt-4  shadow-xl border-t border-t-slate-800"
            >
                <IonTabButton tab="backTabs" href="/operator">
                    <Icons.back strokeWidth={1} className="pt-2 w-[32px] h-[30px]" />
                    <IonLabel className="pt-2 pb-2">{t("tabs.back")}</IonLabel>
                </IonTabButton>
                {/* <IonTabButton tab="trashbinTabs" href="/trash-bin/tabs/trashbin">
                    <Icons.trash strokeWidth={1} className="pt-2 w-[32px] h-[30px]" />
                    <IonLabel className="pt-2 pb-2">Trashbin</IonLabel>
                </IonTabButton> */}
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
