import { IonContent, IonPage } from "@ionic/react";
import { Card, CardHeader, CardContent, CardTitle, Button, Input } from "@trashtrack/ui";
import { useTrashBinQuery } from "../../../queries/get-trash-bin-query";
import { useHistory } from "react-router-dom";
import { useState } from "react";

export function ComplainFormTempatSampah() {
    const { data, isLoading } = useTrashBinQuery();
    const history = useHistory();
    const [searchTerm, setSearchTerm] = useState("");

    const filteredData = !isLoading
        ? data.data.filter(
              (trashBin: { id: number; name: string; description: string; latitude: number; longitude: number }) =>
                  trashBin.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : [];

    return (
        <IonPage>
            <IonContent className="complain-form-tempat-sampah ion-padding" fullscreen>
                <div className="pt-12">
                    <h1 className="font-bold text-left text-xl">TrashTrack</h1>
                </div>
                <div className="flex flex-col pt-8 gap-4">
                    <Input
                        type="text"
                        placeholder="Search tempat sampah"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {isLoading ? (
                        <div>Loading...</div>
                    ) : (
                        filteredData.map(
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
