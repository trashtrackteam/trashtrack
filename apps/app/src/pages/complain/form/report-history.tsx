import { IonContent, IonPage } from "@ionic/react";

export function ComplainReportHistory() {
    return (
        <IonPage>
            <IonContent className="complain-report-history ion-padding" fullscreen>
                <div className="pt-12">
                    <h1 className="font-bold text-left text-xl">TrashTrack</h1>
                </div>
                <div className="flex flex-col pt-8 gap-4">
                    <h1 className="font-bold text-lg">Riwayat Laporan</h1>
                </div>
            </IonContent>
        </IonPage>
    );
}

export default ComplainReportHistory;
