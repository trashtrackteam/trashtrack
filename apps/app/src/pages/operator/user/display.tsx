import { IonContent, IonPage } from "@ionic/react";
import { Card, CardContent, Button, OperatorContext } from "@trashtrack/ui";
import { useContext } from "react";
import { useHistory } from "react-router-dom";

export function OperatorUserDisplay() {
    const history = useHistory();
    const operator = useContext(OperatorContext);

    return (
        <IonPage>
            <IonContent className="operator-user-display ion-padding" fullscreen>
                <div className="pt-12">
                    <h1 className="font-bold text-left text-xl">TrashTrack</h1>
                </div>
                <div className="flex flex-col pt-8 gap-4">
                    <h1 className="font-bold text-lg">Dashboard User, {operator.operator}</h1>
                    <Card className="flex flex-col mt-8">
                        <CardContent className="pt-6">
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

export default OperatorUserDisplay;
