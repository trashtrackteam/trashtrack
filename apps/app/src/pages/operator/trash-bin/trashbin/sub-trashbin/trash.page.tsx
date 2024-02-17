import {
    IonContent,
    IonPage,
    IonRefresher,
    IonRefresherContent,
    RefresherEventDetail,
    useIonViewDidEnter,
} from "@ionic/react";
import { Button, Card, CardContent, CardHeader, CardTitle, Input, Label, Separator, Skeleton } from "@trashtrack/ui";
import { useQueryClient } from "@tanstack/react-query";
import { useHistory, useParams } from "react-router-dom";
import { useGetTrashes } from "./get-trash.query";
import dayjs from "dayjs";
import { useState } from "react";

interface InterfaceTrash {
    id: number;
    subTrashBinId: number;
    createdAt: string;
}

export function TrashPage() {
    const history = useHistory();
    const queryClient = useQueryClient();
    const { trashbin_id, subtrashbin_id } = useParams<{ trashbin_id: string; subtrashbin_id: string }>();
    const [filterType, setFilterType] = useState<"latest" | "oldest" | "none">("none");

    const { data: trashData, isLoading, isFetching, isError, error, refetch } = useGetTrashes();

    useIonViewDidEnter(() => {
        queryClient.invalidateQueries({
            queryKey: ["useGetTrashes"],
        });

        refetch();
    });

    const filteredDataForId = !isLoading
        ? trashData.data.filter((trash: InterfaceTrash) => trash.subTrashBinId === Number(subtrashbin_id))
        : [];

    const applyDateFilter = (trashItems: InterfaceTrash[]) => {
        if (filterType === "latest") {
            return trashItems.sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
        } else if (filterType === "oldest") {
            return trashItems.sort((a, b) => dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf());
        } else {
            return trashItems;
        }
    };

    const sortedData = applyDateFilter(filteredDataForId);

    function handleFilterClick(type: "latest" | "oldest") {
        setFilterType(type);
    }

    function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
        queryClient.invalidateQueries({
            queryKey: ["useGetTrashes"],
        });

        refetch();
        event.detail.complete();
    }

    return (
        <IonPage>
            <IonContent className="ion-padding" fullscreen>
                <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
                    <IonRefresherContent>
                        <p className="text-xs text-center">Refreshing...</p>
                    </IonRefresherContent>
                </IonRefresher>
                <div className="pt-12">
                    <h1 className="font-bold text-left text-xl">TrashTrack</h1>
                    <p className="text-xs text-left text-slate-600">Trash</p>
                </div>
                <div className="flex flex-col pt-8 gap-2">
                    <div className="flex flex-col gap-2">
                        <Button
                            variant="secondary"
                            className="w-full"
                            onClick={() => history.push(`/trash-bin/tabs/trashbin/subtrashbin/${trashbin_id}`)}
                        >
                            Back
                        </Button>
                        <div className="flex flex-row gap-2">
                            <Button variant="secondary" className="w-full" onClick={() => handleFilterClick("latest")}>
                                Filter by Latest
                            </Button>
                            <Button variant="secondary" className="w-full" onClick={() => handleFilterClick("oldest")}>
                                Filter by Oldest
                            </Button>
                        </div>
                    </div>
                    <Separator className="my-4" />

                    {isLoading || isFetching
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
                        : sortedData.map((subtrashbin: InterfaceTrash) => (
                              <Card key={subtrashbin.id} className="flex flex-col mt-4">
                                  <CardContent className="pt-4">
                                      <div className="flex flex-col gap-2">
                                          <p className="text-xs text-left">
                                              {dayjs(subtrashbin.createdAt).format("YYYY-MM-DD HH:mm:ss")} (
                                              {subtrashbin.createdAt})
                                          </p>
                                      </div>
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

export default TrashPage;
