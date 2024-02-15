import { IonContent, IonPage } from "@ionic/react";
import { Card, CardContent, Button } from "@trashtrack/ui";
import { OperatorContext } from "@trashtrack/ui";
import { useContext } from "react";
import { useHistory } from "react-router-dom";

export function OperatorDashboard() {
    const history = useHistory();
    const operator = useContext(OperatorContext);

    return (
        <IonPage>
            <IonContent className="operator-dashboard ion-padding" fullscreen>
                <div className="pt-12">
                    <h1 className="font-bold text-left text-xl">TrashTrack</h1>
                    <p className="text-xs text-left text-slate-600">Dashboard</p>
                </div>
                <div className="flex flex-col pt-8 gap-4">
                    <Card className="flex flex-col mt-8">
                        <CardContent className="pt-6">
                            <p className="text-sm text-slate-700">Operator Login: {operator.operator}</p>
                            <p className="text-sm text-slate-700">Operator Role: {operator.role}</p>
                        </CardContent>
                    </Card>
                    <Card className="flex flex-col mt-8">
                        <CardContent className="pt-6">
                            <Button
                                className="font-semibold text-xs w-full mb-2"
                                onClick={() => history.replace("/operator/form/login")}
                            >
                                Kembali ke Login
                            </Button>
                            <Button
                                variant="secondary"
                                className="font-semibold text-xs w-full mb-2"
                                onClick={() => history.replace("/tabs/home")}
                            >
                                Kembali ke Home
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </IonContent>
        </IonPage>
    );
}

export default OperatorDashboard;
