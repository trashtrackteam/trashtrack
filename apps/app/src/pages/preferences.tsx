import { IonContent, IonPage } from "@ionic/react";

export function Home() {
    return (
        <IonPage>
            <IonContent className="home ion-padding" fullscreen>
                <div className="pt-12">
                    <h1 className="font-bold text-left text-xl">TrashTrack</h1>
                </div>
            </IonContent>
        </IonPage>
    );
}

export default Home;
