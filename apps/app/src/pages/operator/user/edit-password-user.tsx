import { IonContent, IonPage } from "@ionic/react";
import { useParams } from "react-router-dom";

export function OperatorUserEditPassword() {
    const { id } = useParams<{ id: string }>();

    return (
        <IonPage>
            <IonContent className="complain-form-laporan ion-padding" fullscreen>
                <div className="pt-12">
                    <h1 className="font-bold text-left text-xl">TrashTrack</h1>
                    <p className="text-xs text-left text-slate-600">Edit User Password</p>
                </div>
                <div className="flex flex-col pt-8 gap-4"></div>
            </IonContent>
        </IonPage>
    );
}

export default OperatorUserEditPassword;
