import { IonContent, IonPage } from "@ionic/react";
import { ChangeTrashbinForm } from "@trashtrack/ui";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

export function ChangeTrashbinPage() {
    const { trashbin_id } = useParams<{ trashbin_id: string }>();
    const { t } = useTranslation();

    return (
        <IonPage>
            <IonContent className="ion-padding" fullscreen>
                <div className="pt-12">
                    <h1 className="font-bold text-left text-xl">TrashTrack</h1>
                    <p className="text-xs text-left text-slate-600">
                        {t("operator.trashbin.change_trashbin.subtitle")}
                    </p>
                </div>
                <div className="flex flex-col pt-8 gap-2">
                    <ChangeTrashbinForm trashBinId={trashbin_id} />
                </div>
            </IonContent>
        </IonPage>
    );
}

export default ChangeTrashbinPage;
