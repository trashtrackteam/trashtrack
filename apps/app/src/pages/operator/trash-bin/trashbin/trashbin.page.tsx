import {
    IonContent,
    IonPage,
    IonRefresher,
    IonRefresherContent,
    RefresherEventDetail,
    useIonViewDidEnter,
} from "@ionic/react";
import { Button, Card, CardContent, CardHeader, CardTitle, Input, Label, Separator, Skeleton } from "@trashtrack/ui";
import { useGetTrashBins } from "./get-trashbin.query";
import { useQueryClient } from "@tanstack/react-query";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import Fuse from "fuse.js";
import { useTranslation } from "react-i18next";

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

export function TrashBinPage() {
    const history = useHistory();
    const queryClient = useQueryClient();
    const [searchTerm, setSearchTerm] = useState("");
    const { t } = useTranslation();

    const { data: trashBinData, isLoading, isFetching, isError, error, refetch } = useGetTrashBins();

    useIonViewDidEnter(() => {
        queryClient.invalidateQueries({
            queryKey: ["getTrashBins"],
        });

        refetch();
    });

    const fuseOptions = {
        keys: ["name"],
        threshold: 0.4,
    };
    const fuse = new Fuse(!isLoading ? (trashBinData.data as InterfaceTrashbin[]) : [], fuseOptions);

    const filteredData: InterfaceTrashbin[] =
        !isLoading && searchTerm === "" ? trashBinData.data : fuse.search(searchTerm).map((result) => result.item);

    function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
        queryClient.invalidateQueries({
            queryKey: ["getTrashBins"],
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
                    <p className="text-xs text-left text-slate-600">{t("operator.trashbin.subtitle")}</p>
                </div>
                <div className="flex flex-col pt-8 gap-2">
                    <div className="flex flex-col gap-2">
                        <Button className="w-full" onClick={() => history.push(`/trash-bin/tabs/trashbin/create`)}>
                            {t("operator.trashbin.create")}
                        </Button>
                    </div>
                    <Separator className="my-4" />
                    <div className="flex flex-col">
                        <Label className="mb-2" htmlFor="search">
                            {t("operator.trashbin.search")}
                        </Label>
                        <Input
                            id="search"
                            type="text"
                            placeholder={t("operator.trashbin.search")}
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
                                <p className="text-xs text-center">{t("operator.trashbin.noResults")}</p>
                            </CardHeader>
                        </Card>
                    ) : (
                        filteredData.map((trashbin: InterfaceTrashbin) => (
                            <Card key={trashbin.id} className="flex flex-col mt-4">
                                <CardContent className="pt-4">
                                    <div className="flex flex-col gap-2">
                                        <p className="text-xs text-left">{trashbin.name}</p>
                                        <div className="flex flex-col gap-2 mt-4">
                                            <Button
                                                className="w-full"
                                                onClick={() =>
                                                    history.push(`/trash-bin/tabs/trashbin/details/${trashbin.id}`)
                                                }
                                            >
                                                {t("operator.trashbin.view_trashbin")}
                                            </Button>
                                            <Button
                                                className="w-full"
                                                variant="secondary"
                                                onClick={() =>
                                                    history.push(`/trash-bin/tabs/trashbin/subtrashbin/${trashbin.id}`)
                                                }
                                            >
                                                {t("operator.trashbin.view_subtrashbin")}
                                            </Button>
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

export default TrashBinPage;
