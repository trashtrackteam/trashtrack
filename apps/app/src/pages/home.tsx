import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import { Button } from "@trashtrack/ui";

export function Home() {
    const router = useIonRouter();

    return (
        <IonPage>
            <IonContent className="home ion-padding h-screen flex justify-center items-center" fullscreen>
                <div className="pt-12 flex flex-col justify-center items-center">
                    <h1 className="pb-12">Hello, world!</h1>
                    <Button className="font-bold text-xs" onClick={() => router.push("/onboarding", "back")}>
                        [DEV] Go Back to Onboarding
                    </Button>
                </div>
            </IonContent>
        </IonPage>
    );
}

export default Home;
