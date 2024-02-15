import { IonContent, IonPage } from "@ionic/react";
import { Card, CardHeader, CardContent, CardTitle, Input, Label, Separator, Skeleton } from "@trashtrack/ui";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import Fuse from "fuse.js";

import { useTranslation } from "react-i18next";
import { useTrashBinQuery } from "../../../queries/get-trash-bin-query";

export interface SubTrashBin {
    id: number;
    trashBinId: number;
    name: string;
    maxCapacity: number;
    currentCapacity: number;
}

interface TrashBin {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    description: string;
    openCount: number;
}

export function OperatorTrashbinDisplay() {
    const { data, isLoading } = useTrashBinQuery();
    const history = useHistory();
    const [searchTerm, setSearchTerm] = useState("");
    const { t } = useTranslation();

    const fuseOptions = {
        keys: ["name"],
        threshold: 0.4,
    };

    const fuse = new Fuse(!isLoading ? (data.data as TrashBin[]) : [], fuseOptions);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filteredData: any[] =
        !isLoading && searchTerm === "" ? data.data : fuse.search(searchTerm).map((result) => result.item);

    return (
        <IonPage>
            <IonContent className="complain-form-tempat-sampah ion-padding" fullscreen>
                <div className="pt-12">
                    <h1 className="font-bold text-left text-xl">TrashTrack</h1>
                    <p className="text-xs text-left text-slate-600">Trashbin</p>
                </div>
                <div className="flex flex-col pt-8 gap-4">
                    <div className="flex flex-col">
                        <Label className="mb-2" htmlFor="search">
                            {t("complain.form.tempat-sampah.search")}
                        </Label>
                        <Input
                            id="search"
                            type="text"
                            placeholder={t("complain.form.tempat-sampah.search-input")}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Separator className="my-4" />
                    {isLoading ? (
                        <Card className="flex flex-col">
                            <CardHeader>
                                <Skeleton className="h-4 w-20" />
                            </CardHeader>
                            <CardContent>
                                <Skeleton className="h-4 w-40" />
                                <Skeleton className="h-4 w-40" />
                                <Skeleton className="h-4 w-40" />
                            </CardContent>
                        </Card>
                    ) : filteredData.length === 0 && searchTerm !== "" ? (
                        <Card className="flex flex-col">
                            <CardHeader className="text-left">
                                <CardTitle className="text-lg">{t("complain.form.tempat-sampah.no-results")}</CardTitle>
                            </CardHeader>
                        </Card>
                    ) : (
                        filteredData.map((trashBin: TrashBin) => (
                            <Card
                                className="flex flex-col"
                                key={trashBin.id}
                                onClick={() => history.push(`/trash-bin/tabs/sub-trashbin/${trashBin.id}`)}
                            >
                                <CardHeader className="text-left">
                                    <CardTitle className="text-lg">{trashBin.name}</CardTitle>
                                </CardHeader>
                                <CardContent className="pt-2">
                                    <p className="text-sm">
                                        Latitude: {trashBin.latitude} | Longitude: {trashBin.longitude} <br />
                                        {trashBin.description}
                                    </p>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            </IonContent>
        </IonPage>
    );
}

export default OperatorTrashbinDisplay;
