import { IonContent, IonPage } from "@ionic/react";
import { Card, CardContent, CardHeader, Skeleton } from "@trashtrack/ui";
import { useGetReports } from "./get-reports.query";
import { useGetTrashBinById } from "./get-trash-bin.query";
import { useHistory } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

export interface EnumResponseStatus {
    NOT_RESPONDED: "notResponded";
    ACCEPTED: "accepted";
    REJECTED: "rejected";
    COMPLETED: "completed";
}

export interface InterfaceReport {
    id: number;
    trashBinId: number;
    userId: number;
    nik: string;
    name: string;
    phoneNumber: string;
    imageName: string;
    imageData: Buffer;
    description: string;
    status: EnumResponseStatus;
    createdAt: string;
    updatedAt: string;
}

export interface InterfaceTrashbin {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    description: string;
    openCount: number;
    createdAt: string;
    updatedAt: string;
}

function TrashBinDetails({ trashBinId, userId }: { trashBinId: number; userId: number }) {
    const queryClient = useQueryClient();

    queryClient.invalidateQueries({
        queryKey: ["getTrashBinById", trashBinId, userId],
    });

    const { data: trashBinData, isLoading, isError, error } = useGetTrashBinById(trashBinId, userId);

    return (
        <div>
            {isLoading ? (
                <Skeleton className="h-4 w-40" />
            ) : (
                <p className="text-left text-xs">
                    Untuk: <span className="font-medium">{trashBinData.data.name}</span>
                </p>
            )}
            {isError ?? <p className="text-left text-xs">{JSON.stringify(error)}</p>}
        </div>
    );
}

export function ReportsPage() {
    const history = useHistory();
    const { data: reportsData, isLoading, isError, error } = useGetReports();

    return (
        <IonPage>
            <IonContent className="operator-report-action-display ion-padding" fullscreen>
                <div className="pt-12">
                    <h1 className="font-bold text-left text-xl">TrashTrack</h1>
                    <p className="text-xs text-left text-slate-600">Trashbin Management</p>
                </div>
                <div className="flex flex-col pt-8 gap-2">
                    {isLoading
                        ? Array.from({ length: 5 }).map((_, index) => (
                              <Card key={index} className="flex flex-col mt-4">
                                  <CardContent className="pt-4">
                                      <CardHeader>
                                          <Skeleton className="h-4 w-40" />
                                      </CardHeader>
                                      <CardContent className="flex flex-col gap-2">
                                          <Skeleton className="h-4 w-full" />
                                          <Skeleton className="h-4 w-full" />
                                          <Skeleton className="h-4 w-full" />
                                      </CardContent>
                                  </CardContent>
                              </Card>
                          ))
                        : reportsData.data.map((report: InterfaceReport) => (
                              <Card
                                  key={report.id}
                                  className="flex flex-col mt-4"
                                  onClick={() => history.push(`/trash-bin/tabs/report-action/detail/${report.id}`)}
                              >
                                  <CardContent className="pt-4">
                                      <p className="text-left text-xs">
                                          Laporan dari: <span className="font-medium">{report.name}</span>
                                      </p>
                                      <TrashBinDetails trashBinId={report.trashBinId} userId={report.id} />
                                  </CardContent>
                              </Card>
                          ))}
                    {isError && (
                        <Card className="flex flex-col mt-4">
                            <CardContent className="pt-4">
                                <p className="text-center text-xs">{JSON.stringify(error)}</p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </IonContent>
        </IonPage>
    );
}

export default ReportsPage;
