import { IonContent, IonPage } from "@ionic/react";
import { useGetReportById } from "./get-report.query";
import { useHistory, useParams } from "react-router-dom";
import { Button, Card, CardContent, CardHeader, Input, Label, Skeleton, Textarea, Separator } from "@trashtrack/ui";
import { useEffect, useState } from "react";
import { InterfaceReport, EnumResponseStatus } from "./reports.page";

function ReportStatusAction({ report }: { report: InterfaceReport | undefined }) {
    switch (report?.status) {
        case EnumResponseStatus.NOT_RESPONDED:
            return (
                <>
                    <Button className="w-full" variant={"default"}>
                        Accept
                    </Button>
                    <Button className="w-full" variant={"destructive"}>
                        Reject
                    </Button>
                </>
            );
        case EnumResponseStatus.ACCEPTED:
        case EnumResponseStatus.REJECTED:
        case EnumResponseStatus.COMPLETED:
            return (
                <Button className="w-full" variant="secondary">
                    Cancel
                </Button>
            );
        case EnumResponseStatus.COMPLETED:
            return (
                <Button className="w-full" variant="secondary">
                    Complete
                </Button>
            );
    }
}

export function DetailedReportPage() {
    const history = useHistory();
    const { report_id } = useParams<{ report_id: string }>();
    const { data: reportData, isError, error, isLoading } = useGetReportById(Number(report_id));
    const [imageUrl, setImageUrl] = useState<string>("");
    const report = !isLoading ? (reportData.data as InterfaceReport) : undefined;

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
                                    <div>
                                        <Label htmlFor="name" className="text-xs">
                                            Pelapor
                                        </Label>
                                        <Input id="name" value={report?.name} />
                                    </div>
                                    <div>
                                        <Label htmlFor="description" className="text-xs">
                                            Deskripsi Laporan
                                        </Label>
                                        <Textarea id="description" value={report?.description} />
                                    </div>
                                    <div>
                                        <Label htmlFor="image" className="text-xs">
                                            Foto
                                        </Label>
                                        <img
                                            src={imageUrl ? imageUrl : "https://via.placeholder.com/150"}
                                            className="w-full h-object-cover"
                                            alt=""
                                        />
                                    </div>
                                    <Separator className="my-4" />
                                    <div className="mt-4 flex flex-row gap-2">
                                        <ReportStatusAction report={report} />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                    <Card className="flex flex-col mt-4">
                        <CardContent className="pt-4">
                            <Button className="w-full" variant="secondary" onClick={() => history.goBack()}>
                                Back
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </IonContent>
        </IonPage>
    );
}
