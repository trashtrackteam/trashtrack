import { IonContent, IonPage } from "@ionic/react";
import { LoginForm } from "@trashtrack/ui";

export function OperatorFormLogin() {
    return (
        <IonPage>
            <IonContent className="operator-form-login ion-padding" fullscreen>
                <div className="pt-12">
                    <h1 className="font-bold text-left text-xl">TrashTrack</h1>
                </div>
                <div className="flex flex-col pt-8 gap-4">
                    <h1 className="font-bold text-lg">Login Operator</h1>
                    <LoginForm />
                </div>
            </IonContent>
        </IonPage>
    );
}

export default OperatorFormLogin;
