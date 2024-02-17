import { IonContent, IonPage } from "@ionic/react";
import { CreateTrashBinForm } from "@trashtrack/ui";

export function CreateTrashbinPage() {
    return (
        <IonPage>
            <IonContent className="ion-padding" fullscreen>
                <div className="pt-12">
                    <h1 className="font-bold text-left text-xl">TrashTrack</h1>
                    <p className="text-xs text-left text-slate-600">Create Trashbin</p>
                </div>
                <div className="flex flex-col pt-8 gap-2">
                    <CreateTrashBinForm />
                </div>
            </IonContent>
        </IonPage>
    );
}

export default CreateTrashbinPage;
