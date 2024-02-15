import { IonContent, IonPage } from "@ionic/react";
import { useGetReportById } from "./get-report.query";
import { useHistory, useParams } from "react-router-dom";
import { Button, Card, CardContent, CardHeader, Skeleton } from "@trashtrack/ui";
import { useEffect, useState } from "react";

export function DetailedReportPage() {
    const history = useHistory();
    const { report_id } = useParams<{ report_id: string }>();
    const { data: reportData, isError, error, isLoading } = useGetReportById(Number(report_id));
    const [imageUrl, setImageUrl] = useState<string>("");

    useEffect(() => {
        if (!isLoading && reportData) {
            const uint8Array = new Uint8Array(reportData.data.imageData.data);
            const blob = new Blob([uint8Array], { type: "image/jpeg" });
            const file = new File([blob], reportData.data.imageName, { type: "image/jpeg" });

            setImageUrl(URL.createObjectURL(file));
        }
    }, [isLoading, reportData]);

    return (
        <IonPage>
            <IonContent className="ion-padding" fullscreen>
                <div className="pt-12">
                    <h1 className="font-bold text-left text-xl">TrashTrack</h1>
                    <p className="text-xs text-left text-slate-600">Detailed Report for TrashBin ID: {report_id}</p>
                </div>
                <div className="flex flex-col pt-8 gap-2">
                    {isError && (
                        <Card className="flex flex-col mt-4">
                            <CardContent className="pt-4">
                                <p className="text-center text-xs">{JSON.stringify(error)}</p>
                            </CardContent>
                        </Card>
                    )}
                    {isLoading ? (
                        <Card className="flex flex-col mt-4">
                            <CardContent className="pt-4">
                                <CardHeader>
                                    <Skeleton className="h-4 w-20" />
                                </CardHeader>
                                <CardContent className="flex flex-col gap-2">
                                    <Skeleton className="h-4 w-40" />
                                    <Skeleton className="h-4 w-40" />
                                    <Skeleton className="h-4 w-40" />
                                </CardContent>
                            </CardContent>
                        </Card>
                    ) : (
                        <Card className="flex flex-col mt-4">
                            <CardContent className="pt-4">
                                <div className="flex flex-col gap-2">
                                    <p className="text-xs text-left">{reportData.data.name}</p>
                                    <p className="text-xs text-left">{reportData.data.description}</p>
                                    <img
                                        src={imageUrl ? imageUrl : "https://via.placeholder.com/150"}
                                        className="w-full h-object-cover"
                                        alt=""
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    )}
                    <Card className="flex flex-col mt-4">
                        <CardContent className="pt-4">
                            <Button variant="secondary" onClick={() => history.goBack()}>
                                Back
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </IonContent>
        </IonPage>
    );
}
