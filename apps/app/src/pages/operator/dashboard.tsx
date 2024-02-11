import { IonContent, IonPage } from "@ionic/react";
import { Card, CardContent, Button, OperatorContext } from "@trashtrack/ui";
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
                </div>
                <div className="flex flex-col pt-8 gap-4">
                    <h1 className="font-bold text-lg">Dashboard, {operator.operator}</h1>
                    <Card className="flex flex-col mt-8">
                        <CardContent className="pt-6">
                            <Button
                                className="font-bold text-xs w-full mb-2"
                                onClick={() => history.replace("/operator/form/login")}
                            >
                                Kembali ke Login
                            </Button>
                            <Button className="font-bold text-xs w-full" onClick={() => history.replace("/tabs/home")}>
                                Kembali
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </IonContent>
        </IonPage>
    );
}

export default OperatorDashboard;
