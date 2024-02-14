import { IonContent, IonPage } from "@ionic/react";
import { PersonalDetailsForm } from "@trashtrack/ui";

export function ComplainFormPersonalDetails() {
    return (
        <IonPage>
            <IonContent className="complain-form-personal-details ion-padding" fullscreen>
                <div className="pt-12">
                    <h1 className="font-bold text-left text-xl">TrashTrack</h1>
                    <p className="text-xs text-left text-slate-600">
                        Isi informasi pribadi anda untuk melanjutkan pelaporan sampah.
                    </p>
                </div>
                <div className="flex flex-col pt-8 gap-4">
                    <PersonalDetailsForm />
                </div>
            </IonContent>
        </IonPage>
    );
}

export default ComplainFormPersonalDetails;
