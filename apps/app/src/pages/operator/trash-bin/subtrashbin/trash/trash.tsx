import { IonContent, IonPage } from "@ionic/react";
import { Card, CardContent } from "@trashtrack/ui";

export function OperatorTrashDisplay() {
    return (
        <IonPage>
            <IonContent className="operator-subtrash-bin-display ion-padding" fullscreen>
                <div className="pt-12">
                    <h1 className="font-bold text-left text-xl">TrashTrack</h1>
                    <p className="text-xs text-left text-slate-600">Trashbin Management</p>
                </div>
                <div className="flex flex-col pt-8 gap-4">
                    <Card className="flex flex-col mt-8">
                        <CardContent className="pt-6">
                            <p className="text-center text-xs">Trash</p>
                        </CardContent>
                    </Card>
                </div>
            </IonContent>
        </IonPage>
    );
}

export default OperatorTrashDisplay;
