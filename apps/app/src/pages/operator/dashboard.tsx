import { IonContent, IonPage } from "@ionic/react";
import { Card, CardContent, Button, AreaChartTotalTrash, AreaChartTotalReport } from "@trashtrack/ui";
import { OperatorContext } from "@trashtrack/ui";
import { t } from "i18next";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

export function OperatorDashboard() {
    const history = useHistory();
    const operator = useContext(OperatorContext);
    const { t } = useTranslation();

    return (
        <IonPage>
            <IonContent className="operator-dashboard ion-padding" fullscreen>
                <div className="pt-12">
                    <h1 className="font-bold text-left text-xl">TrashTrack</h1>
                    <p className="text-xs text-left text-slate-600">Dashboard</p>
                </div>
                <div className="flex flex-col pt-8 gap-4">
                    <Card>
                        <CardContent className="pt-2 pb-2 pl-0 pr-0">
                            <p className="pl-6 pt-4 mb-4 text-base">{t("operator.dashboard.chart.total_report")}</p>
                            <AreaChartTotalReport />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-2 pb-2 pl-0 pr-0">
                            <p className="pl-6 pt-4 mb-4 text-base">{t("operator.dashboard.chart.total_trash")}</p>
                            <AreaChartTotalTrash />
                        </CardContent>
                    </Card>

                    <Card className="flex flex-col mt-8">
                        <CardContent className="pt-6">
                            <Button
                                className="font-semibold text-xs w-full mb-2"
                                onClick={() => history.replace("/operator/form/login")}
                            >
                                {t("operator.dashboard.login")}
                            </Button>
                            <Button
                                variant="secondary"
                                className="font-semibold text-xs w-full mb-2"
                                onClick={() => history.replace("/tabs/home")}
                            >
                                {t("operator.dashboard.home")}
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </IonContent>
        </IonPage>
    );
}

export default OperatorDashboard;
