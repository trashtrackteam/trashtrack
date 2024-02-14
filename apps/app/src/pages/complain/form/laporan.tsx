import { IonContent, IonPage } from "@ionic/react";
import { ComplainLaporanForm } from "@trashtrack/ui";
import { useParams } from "react-router-dom";

export function ComplainFormLaporan() {
    const { tempat_sampah_id } = useParams<{ tempat_sampah_id: string }>();

    return (
        <IonPage>
            <IonContent className="complain-form-laporan ion-padding" fullscreen>
                <div className="pt-12">
                    <h1 className="font-bold text-left text-xl">TrashTrack</h1>
                    <p className="text-xs text-left text-slate-600">Laporkan sampah yang ada di tempat sampah ini.</p>
                </div>
                <div className="flex flex-col pt-8 gap-4">
                    <ComplainLaporanForm tempah_sampah_id={tempat_sampah_id} />
                </div>
            </IonContent>
        </IonPage>
    );
}

export default ComplainFormLaporan;
