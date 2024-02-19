import { IonContent, IonPage, useIonViewDidEnter } from "@ionic/react";
import { IonRefresher, IonRefresherContent, RefresherEventDetail } from "@ionic/react";
import { useHistory } from "react-router-dom";

import { Card, CardContent, CardHeader, Input, Label, Separator, Skeleton } from "@trashtrack/ui";
import { QueryClient, useQueryClient } from "@tanstack/react-query";

import { useGetReports } from "./get-reports.query";
import { useGetTrashBinById } from "./get-trash-bin.query";
import { useState } from "react";
import { InterfaceResult, useGetReportsWithTrashBins } from "./get-trash-and-report.query";
import Fuse from "fuse.js";

export enum EnumResponseStatus {
    NOT_RESPONDED = "notResponded",
    ACCEPTED = "accepted",
    REJECTED = "rejected",
    COMPLETED = "completed",
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

function ReportStatus({ status }: { status: EnumResponseStatus }) {
    return (
        <p className="text-left text-xs mt-8">
            Status:{" "}
            <span
                className={`font-medium ${
                    status === EnumResponseStatus.NOT_RESPONDED
                        ? "text-red-500"
                        : status === EnumResponseStatus.ACCEPTED
                        ? "text-yellow-500"
                        : status === EnumResponseStatus.REJECTED
                        ? "text-red-500"
                        : status === EnumResponseStatus.COMPLETED
                        ? "text-green-500"
                        : ""
                }`}
            >
                {status === EnumResponseStatus.NOT_RESPONDED
                    ? "Belum Ditanggapi"
                    : status === EnumResponseStatus.ACCEPTED
                    ? "Diterima"
                    : status === EnumResponseStatus.REJECTED
                    ? "Ditolak"
                    : status === EnumResponseStatus.COMPLETED
                    ? "Selesai"
                    : ""}
            </span>
        </p>
    );
}

export function ReportsPage() {
    const history = useHistory();
    const queryClient = useQueryClient();
    const [searchTerm, setSearchTerm] = useState("");

    const { reports, trashBins, isReportsLoading, isTrashBinsLoading } = useGetReportsWithTrashBins();

    const handleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
        event.detail.complete();
    };

    const fuseOptions = {
        keys: ["trashBinName"],
        threshold: 0.4,
    };

    let data: InterfaceResult[] = [];
    const fuse = new Fuse(data, fuseOptions);

    if (isReportsLoading || isTrashBinsLoading) {
        console.log("Loading...");
    } else {
        data = reports.data.map((re: InterfaceReport) => {
            const trashBin = trashBins.data.find((tb: InterfaceTrashbin) => tb.id === re.trashBinId);
            return {
                ...re,
                trashBinName: trashBin?.name,
            };
        });
        fuse.setCollection(data);
    }

    const filteredData: InterfaceResult[] =
        searchTerm === "" ? data : fuse.search(searchTerm).map((result) => result.item);

    return (
        <IonPage>
            <IonContent className="operator-report-action-display ion-padding" fullscreen>
                <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
                    <IonRefresherContent>
                        <p className="text-xs text-center">Refreshing...</p>
                    </IonRefresherContent>
                </IonRefresher>
                <div className="pt-12">
                    <h1 className="font-bold text-left text-xl">TrashTrack</h1>
                    <p className="text-xs text-left text-slate-600">Reports</p>
                </div>
                <div className="flex flex-col pt-8 gap-2">
                    <div className="flex flex-col">
                        <Separator className="my-4" />
                        <div className="flex flex-col">
                            <Label className="mb-2" htmlFor="search">
                                Search Trashbin
                            </Label>
                            <Input
                                id="search"
                                type="text"
                                placeholder={"Search Trashbin"}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        {isReportsLoading || isTrashBinsLoading ? (
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
                            <Card className="flex flex-col mt-4">
                                <CardHeader>
                                    <p className="text-xs text-center">
                                        No trashbin found with that name. Please try another name.
                                    </p>
                                </CardHeader>
                            </Card>
                        ) : (
                            filteredData.map((re: InterfaceResult) => (
                                <Card
                                    key={re.id}
                                    className="flex flex-col mt-4"
                                    onClick={() => history.push(`/trash-bin/tabs/report-action/detail/${re.id}`)}
                                >
                                    <CardContent className="pt-4">
                                        <CardHeader></CardHeader>
                                        <CardContent className="flex flex-col gap-2">
                                            <p className="text-xs text-left">Laporan dari: {re.name}</p>
                                            <p className="text-xs text-left mb-2">Untuk: {re.trashBinName}</p>
                                            <ReportStatus status={re.status} />
                                        </CardContent>
                                    </CardContent>
                                </Card>
                            ))
                        )}
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
}

export default ReportsPage;
