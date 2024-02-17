import { Redirect, Route } from "react-router-dom";
import { IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonLabel } from "@ionic/react";
import { Icons } from "@trashtrack/ui";

import { ReportsPage } from "../pages/operator/trash-bin/report/reports.page";
import { useTranslation } from "react-i18next";
import { DetailedReportPage } from "../pages/operator/trash-bin/report/detailed-report.page";
import FeedbackPage from "../pages/operator/trash-bin/report/report-feedback/feedback.page";
import CreateFeedbackPage from "../pages/operator/trash-bin/report/report-feedback/create-feedback.page";
import TrashBinPage from "../pages/operator/trash-bin/trashbin/trashbin.page";
import SubTrashBinPage from "../pages/operator/trash-bin/trashbin/sub-trashbin/subtrashbin.page";
import TrashPage from "../pages/operator/trash-bin/trashbin/sub-trashbin/trash.page";
import HistoryPage from "../pages/operator/trash-bin/trashbin/sub-trashbin/history.page";
import CreateTrashbinPage from "../pages/operator/trash-bin/trashbin/create-trashbin.page";
import ChangeTrashbinPage from "../pages/operator/trash-bin/trashbin/change-trashbin.page";
import CreateSubTrashbinPage from "../pages/operator/trash-bin/trashbin/sub-trashbin/create-subtrashbin.page";
import DetailedSubTrashbinPage from "../pages/operator/trash-bin/trashbin/sub-trashbin/detailed-subtrashbin.page";
import ChangeSubTrashbinPage from "../pages/operator/trash-bin/trashbin/sub-trashbin/change-subtrashbin.page";
import { DetailedTrashPage } from "../pages/operator/trash-bin/trashbin/detailed-trashbin.page";

const TrashbinTabs: React.FC = () => {
    const { t } = useTranslation();

    return (
        <IonTabs>
            <IonRouterOutlet animated={false} mode="ios">
                {/* Trash Bin */}
                <Route path="/trash-bin/tabs/trashbin" render={() => <TrashBinPage />} exact={true} />
                <Route path="/trash-bin/tabs/trashbin/create" render={() => <CreateTrashbinPage />} exact={true} />
                <Route
                    path="/trash-bin/tabs/trashbin/details/:trashbin_id"
                    render={() => <DetailedTrashPage />}
                    exact={true}
                />
                <Route
                    path="/trash-bin/tabs/trashbin/update/:trashbin_id"
                    render={() => <ChangeTrashbinPage />}
                    exact={true}
                />

                {/* Sub Trashbin */}
                <Route
                    path="/trash-bin/tabs/trashbin/subtrashbin/:trashbin_id"
                    render={() => <SubTrashBinPage />}
                    exact={true}
                />
                <Route
                    path="/trash-bin/tabs/trashbin/subtrashbin/:trashbin_id/create"
                    render={() => <CreateSubTrashbinPage />}
                    exact={true}
                />
                <Route
                    path="/trash-bin/tabs/trashbin/subtrashbin/:trashbin_id/details/:subtrashbin_id"
                    render={() => <DetailedSubTrashbinPage />}
                    exact={true}
                />
                <Route
                    path="/trash-bin/tabs/trashbin/subtrashbin/:trashbin_id/update/:subtrashbin_id"
                    render={() => <ChangeSubTrashbinPage />}
                    exact={true}
                />

                {/* Trash */}
                <Route
                    path="/trash-bin/tabs/trashbin/subtrashbin/:trashbin_id/:subtrashbin_id/trash"
                    render={() => <TrashPage />}
                    exact={true}
                />

                {/* History */}
                <Route
                    path="/trash-bin/tabs/trashbin/subtrashbin/:trashbin_id/:subtrashbin_id/history"
                    render={() => <HistoryPage />}
                    exact={true}
                />

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
