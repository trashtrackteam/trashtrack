import { IonContent, IonPage } from "@ionic/react";
import { Card, CardDescription, CardHeader, CardContent, CardTitle, Button } from "@trashtrack/ui";
import { useHistory } from "react-router-dom";

export function ComplainIndex() {
    const history = useHistory();

    return (
        <IonPage>
            <IonContent className="complain-index ion-padding" fullscreen>
                <div className="pt-12">
                    <h1 className="font-bold text-left text-xl">TrashTrack</h1>
                </div>
                <div className="flex flex-col pt-8 gap-4">
                    <Card className="flex flex-col">
                        <CardHeader className="text-center">
                            <CardTitle className="text-base">Halaman sedang dalam pengembangan</CardTitle>
                            <CardDescription className="text-xs">
                                Halaman ini sedang dalam pengembangan. Silahkan kembali lagi nanti.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6 flex flex-col gap-4">
                            <Button
                                className="font-bold text-xs w-full"
                                onClick={() => history.replace("/complain/form/personal-details")}
                            >
                                Test Login Personal Details
                            </Button>
                            <Button className="font-bold text-xs w-full" onClick={() => history.replace("/tabs/home")}>
                                Kembali
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </IonContent>
        </IonPage>
    );
}

export default ComplainIndex;
