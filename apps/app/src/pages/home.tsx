import { IonContent, IonPage } from "@ionic/react";
import { Card, CardDescription, CardHeader, CardContent, CardTitle, Icons } from "@trashtrack/ui";

export function Home() {
    return (
        <IonPage>
            <IonContent className="home ion-padding" fullscreen>
                <div className="pt-12">
                    <h1 className="font-bold text-left text-xl">TrashTrack</h1>
                </div>
                <div className="flex flex-col pt-8 gap-4">
                    <Card className="flex flex-row">
                        <CardHeader className="w-56">
                            <CardTitle className="text-base">Sampaikan Keluhan</CardTitle>
                            <CardDescription className="text-xs">
                                Submit keluhan mengenai tempat sampah yang penuh, rusak, atau tidak ada.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <Icons.complain strokeWidth={1} className="w-[78px] h-[74px]" />
                        </CardContent>
                    </Card>
                    <Card className="flex flex-row">
                        <CardHeader className="w-56">
                            <CardTitle className="text-base">Operator Login</CardTitle>
                            <CardDescription className="text-xs">
                                Operator dapat login untuk melihat keluhan dan menyelesaikannya.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <Icons.login strokeWidth={1} className="w-[78px] h-[74px]" />
                        </CardContent>
                    </Card>
                </div>
            </IonContent>
        </IonPage>
    );
}

export default Home;
