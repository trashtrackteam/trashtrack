import {
    IonContent,
    IonPage,
    IonRefresher,
    IonRefresherContent,
    RefresherEventDetail,
    useIonViewDidEnter,
} from "@ionic/react";
import { useGetReportByNik } from "./get-report-by-nik.query";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getUserNIK } from "@trashtrack/utils";
import { useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, Skeleton, Separator, Button } from "@trashtrack/ui";
import { EnumResponseStatus, InterfaceReport } from "../../operator/trash-bin/report/reports.page";
import { useGetTrashBinById } from "../../operator/trash-bin/report/get-trash-bin.query";
import { useTranslation } from "react-i18next";
import { t } from "i18next";
import dayjs from "dayjs";

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
                    ? t("complain.history.notResponded")
                    : status === EnumResponseStatus.ACCEPTED
                    ? t("complain.history.accepted")
                    : status === EnumResponseStatus.REJECTED
                    ? t("complain.history.rejected")
                    : status === EnumResponseStatus.COMPLETED
                    ? t("complain.history.completed")
                    : ""}
            </span>
        </p>
    );
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
                <Skeleton className="h-4 w-40 mt-2" />
            ) : (
                <p className="text-left text-xs">
                    {t("complain.history.for")} <span className="font-medium">{trashBinData.data.name}</span>
                </p>
            )}
            {isError ?? <p className="text-left text-xs">{JSON.stringify(error)}</p>}
        </div>
    );
}

export function ComplainReportHistory() {
    const [nik, setNik] = useState<number | undefined>(0);
    const queryClient = useQueryClient();
    const history = useHistory();
    const { t } = useTranslation();

    useEffect(() => {
        async function getNik() {
            return await getUserNIK();
        }

        const fetchNik = async () => {
            const nikFetch = await getNik();

            if (!nikFetch) {
                history.push("/complain/form/personal-details");
            }

            setNik(nikFetch);
        };

        fetchNik();
    }, [history]);

    const { data: reportData, isLoading, isFetching, isError, error, refetch } = useGetReportByNik(String(nik));

    useIonViewDidEnter(() => {
        queryClient.invalidateQueries({
            queryKey: ["getReportByNik", String(nik)],
        });

        refetch();
    });

    function filterAndSortLatest(data: InterfaceReport[]) {
        return data
            .filter((report) => dayjs(report.createdAt))
            .sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
    }

    function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
        queryClient.invalidateQueries({
            queryKey: ["getRepgetReportByNikorts", String(nik)],
        });

        refetch();
        event.detail.complete();
    }

    const sortedData = reportData ? filterAndSortLatest(reportData.data) : [];

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
                    <p className="text-xs text-left text-slate-600">{t("tabs.riwayat")}</p>
                </div>
                <div className="flex flex-col pt-8 gap-2">
                    {/* <Button disabled className="w-full" onClick={() => history.push("/trash-bin/tabs/feedback")}>
                        Feedback
                    </Button>
                    <Separator className="my-4" /> */}
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
                    ) : reportData.data.length === 0 ? (
                        <Card className="flex flex-col mt-4">
                            <CardHeader>
                                <p className="text-xs text-center">{t("complain.form.laporan.no_history")}</p>
                            </CardHeader>
                        </Card>
                    ) : (
                        sortedData.map((report: InterfaceReport) => (
                            <Card
                                onClick={() => history.push(`/complain/tabs/form/report-history/feedback/${report.id}`)}
                                key={report.id}
                                className="flex flex-col mt-4"
                            >
                                <CardContent className="pt-4">
                                    <TrashBinDetails trashBinId={report.trashBinId} userId={report.id} />
                                    <ReportStatus status={report.status} />
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

export default ComplainReportHistory;
