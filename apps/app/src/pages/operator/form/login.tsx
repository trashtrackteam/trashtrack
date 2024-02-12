import { IonContent, IonPage } from "@ionic/react";
import { LoginForm } from "@trashtrack/ui";
import { useTranslation } from "react-i18next";

export function OperatorFormLogin() {
    const { t } = useTranslation();

    return (
        <IonPage>
            <IonContent className="operator-form-login ion-padding" fullscreen>
                <div className="pt-12">
                    <h1 className="font-bold text-left text-xl">TrashTrack</h1>
                    <p className="text-xs text-left text-slate-600">{t("operator.form.login.title")}</p>
                </div>
                <div className="flex flex-col pt-8 gap-4">
                    <LoginForm />
                </div>
            </IonContent>
        </IonPage>
    );
}

export default OperatorFormLogin;
