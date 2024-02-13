import { Redirect, Route } from "react-router-dom";
import { IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonLabel } from "@ionic/react";
import { Icons } from "@trashtrack/ui";

import OperatorTrashbinDisplay from "../pages/operator/trash-bin/display";
import OperatorSubTrashbinDisplay from "../pages/operator/trash-bin/subtrashbin/subtrash-bin";
import OperatorReportActionDisplay from "../pages/operator/trash-bin/report/report-action";
import OperatorFeedbackDisplay from "../pages/operator/trash-bin/report/feedback/feedback";
import OperatorTrashDisplay from "../pages/operator/trash-bin/subtrashbin/trash/trash";

const TrashbinTabs: React.FC = () => {
    return (
        <IonTabs>
            <IonRouterOutlet animated={false} mode="ios">
                <Route path="/trash-bin/tabs/trashbin" render={() => <OperatorTrashbinDisplay />} exact={true} />
                <Route path="/trash-bin/tabs/sub-trashbin" render={() => <OperatorSubTrashbinDisplay />} exact={true} />
                <Route
                    path="/trash-bin/tabs/report-action"
                    render={() => <OperatorReportActionDisplay />}
                    exact={true}
                />
                <Route path="/trash-bin/tabs/feedback" render={() => <OperatorFeedbackDisplay />} exact={true} />
                <Route path="/trash-bin/tabs/trash" render={() => <OperatorTrashDisplay />} exact={true} />

                <Route path="/trash-bin/tabs" render={() => <Redirect to="/trash-bin/tabs/trashbin" />} exact={true} />
            </IonRouterOutlet>
            <IonTabBar slot="bottom" mode="ios" translucent className="pb-4">
                <IonTabButton tab="backTabs" href="/operator/tabs/dashboard">
                    <Icons.back strokeWidth={1} className="pt-2 w-[32px] h-[30px]" />
                    <IonLabel className="pt-2 pb-2">Back</IonLabel>
                </IonTabButton>
                <IonTabButton tab="trashbinTabs" href="/trash-bin/tabs/trashbin">
                    <Icons.trash strokeWidth={1} className="pt-2 w-[32px] h-[30px]" />
                    <IonLabel className="pt-2 pb-2">Trashbin</IonLabel>
                </IonTabButton>
                <IonTabButton tab="subTrashbinTabs" href="/trash-bin/tabs/sub-trashbin">
                    <Icons.subTrashbin strokeWidth={1} className="pt-2 w-[32px] h-[30px]" />
                    <IonLabel className="pt-2 pb-2">Sub Trashbin</IonLabel>
                </IonTabButton>
                <IonTabButton tab="reportTabs" href="/trash-bin/tabs/report-action">
                    <Icons.report strokeWidth={1} className="pt-2 w-[32px] h-[30px]" />
                    <IonLabel className="pt-2 pb-2">Report</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    );
};

export default TrashbinTabs;
