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
import { useState } from "react";
import Fuse from "fuse.js";
import { useGetSubTrashbins } from "./get-subtrashbins.query";

interface InterfaceSubTrashbin {
    id: number;
    trashBinId: number;
    name: string;
    maxCapacity: number;
    currentCapacity: number;
}

export function SubTrashbinPage() {
    const history = useHistory();
    const queryClient = useQueryClient();
    const { trashbin_id } = useParams<{ trashbin_id: string }>();
    const [searchTerm, setSearchTerm] = useState("");

    const { data: subtrashBinData, isLoading, isFetching, isError, error, refetch } = useGetSubTrashbins();

    useIonViewDidEnter(() => {
        queryClient.invalidateQueries({
            queryKey: ["useGetSubTrashbins"],
        });

        refetch();
    });

    const fuseOptions = {
        keys: ["name"],
        threshold: 0.4,
    };

    const filteredDataForId = !isLoading
        ? subtrashBinData.data.filter(
              (subtrashbin: InterfaceSubTrashbin) => subtrashbin.trashBinId === Number(trashbin_id)
          )
        : [];

    const fuse = new Fuse(!isLoading ? (filteredDataForId as InterfaceSubTrashbin[]) : [], fuseOptions);

    const filteredData: InterfaceSubTrashbin[] =
        !isLoading && searchTerm === "" ? filteredDataForId : fuse.search(searchTerm).map((result) => result.item);

    function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
        queryClient.invalidateQueries({
            queryKey: ["useGetSubTrashbins"],
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
                    <p className="text-xs text-left text-slate-600">Trashbins</p>
                </div>
                <div className="flex flex-col pt-8 gap-2">
                    <div className="flex flex-col gap-2">
                        <Button className="w-full" onClick={() => history.push(`/trash-bin/tabs/trashbin/create`)}>
                            Create a new subtrashbin
                        </Button>
                    </div>
                    <Separator className="my-4" />
                    <div className="flex flex-col">
                        <Label className="mb-2" htmlFor="search">
                            Search Sub Trashbin
                        </Label>
                        <Input
                            id="search"
                            type="text"
                            placeholder={"Search Sub Trashbin"}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    {isLoading || isFetching ? (
                        Array.from({ length: 5 }).map((_, index) => (
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
                    ) : filteredData.length === 0 && searchTerm !== "" ? (
                        <Card className="flex flex-col">
                            <CardHeader>
                                <p className="text-xs text-center">
                                    No sub trashbin found with that name. Please try another name.
                                </p>
                            </CardHeader>
                        </Card>
                    ) : (
                        filteredData.map((subtrashbin: InterfaceSubTrashbin) => (
                            <Card key={subtrashbin.id} className="flex flex-col mt-4">
                                <CardContent className="pt-4">
                                    <div className="flex flex-col gap-2">
                                        <p className="text-xs text-left">{subtrashbin.name}</p>
                                        <div className="flex flex-col gap-4">
                                            <Button
                                                className="w-full"
                                                onClick={() =>
                                                    history.push(
                                                        `/trash-bin/tabs/trashbin/details/${trashbin_id}/${subtrashbin.id}`
                                                    )
                                                }
                                            >
                                                View Sub Trashbin
                                            </Button>
                                            <div className="flex flex-row gap-2">
                                                <Button
                                                    className="w-full"
                                                    variant="secondary"
                                                    onClick={() =>
                                                        history.push(
                                                            `/trash-bin/tabs/trashbin/subtrashbin/${trashbin_id}/${subtrashbin.id}/trash`
                                                        )
                                                    }
                                                >
                                                    View Trash
                                                </Button>
                                                <Button
                                                    className="w-full"
                                                    variant="secondary"
                                                    onClick={() =>
                                                        history.push(
                                                            `/trash-bin/tabs/trashbin/subtrashbin/${trashbin_id}/${subtrashbin.id}/history`
                                                        )
                                                    }
                                                >
                                                    View History
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
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

export default SubTrashbinPage;
