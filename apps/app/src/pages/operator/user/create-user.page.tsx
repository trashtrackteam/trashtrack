import { IonContent, IonPage } from "@ionic/react";
import { CreateTrashBinForm, CreateUserForm } from "@trashtrack/ui";
import { useTranslation } from "react-i18next";

export function CreateUserPage() {
    const { t } = useTranslation();

    return (
        <IonPage>
            <IonContent className="ion-padding" fullscreen>
                <div className="pt-12">
                    <h1 className="font-bold text-left text-xl">TrashTrack</h1>
                    <p className="text-xs text-left text-slate-600">{t("operator.user.create_user.subtitle")}</p>
                </div>
                <div className="flex flex-col pt-8 gap-2">
                    <CreateUserForm />
                </div>
            </IonContent>
        </IonPage>
    );
}

export default CreateUserPage;
