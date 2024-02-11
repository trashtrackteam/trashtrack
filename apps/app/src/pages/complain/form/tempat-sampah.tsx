import { IonContent, IonPage } from "@ionic/react";
import { Card, CardHeader, CardContent, CardTitle, Button } from "@trashtrack/ui";
import { useTrashBinQuery } from "../../../queries/get-trash-bin-query";
import { useHistory } from "react-router-dom";

export function ComplainFormTempatSampah() {
    const { data, isLoading } = useTrashBinQuery();
    const history = useHistory();

    return (
        <IonPage>
            <IonContent className="complain-form-tempat-sampah ion-padding" fullscreen>
                <div className="pt-12">
                    <h1 className="font-bold text-left text-xl">TrashTrack</h1>
                </div>
                <div className="flex flex-col pt-8 gap-4">
                    {isLoading ? (
                        <div>Loading...</div>
                    ) : (
                        data.data.map(
                            (trashBin: {
                                id: number;
                                name: string;
                                description: string;
                                latitude: number;
                                longitude: number;
                            }) => (
                                <Card className="flex flex-col">
                                    <CardHeader className="text-center">
                                        <CardTitle className="text-lg">{trashBin.name}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="pt-2">
                                        <p>{trashBin.description}</p>
                                        <Button
                                            className="font-bold text-xs w-full"
                                            variant={"secondary"}
                                            onClick={() => history.replace(`/complain/form/laporan/${trashBin.id}`)}
                                        >
                                            Laporkan
                                        </Button>
                                    </CardContent>
                                </Card>
                            )
                        )
                    )}
                </div>
            </IonContent>
        </IonPage>
    );
}

export default ComplainFormTempatSampah;
