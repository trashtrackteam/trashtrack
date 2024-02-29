import { IonContent, IonPage, useIonViewDidEnter } from "@ionic/react";
import { Card, CardContent, Button, Separator, Skeleton, CardHeader } from "@trashtrack/ui";
import { useHistory, useParams } from "react-router-dom";
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { useGetFeedbacks } from "./get-feedbacks.query";
import { API_URL, formatDateTimeAgo } from "@trashtrack/utils";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
} from "@trashtrack/ui";
import dayjs from "dayjs";
import { CapacitorHttp } from "@capacitor/core";
import { queryClient } from "../../../../../main";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export interface InterfaceFeedback {
    id: number;
    reportId: number;
    title: string;
    description: string;
    createdAt: string;
}

export function DeleteConfirmationDialog({
    feedbackId,
    isOpen,
    setIsOpen,
    queryClient,
}: {
    feedbackId: string;
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    queryClient: QueryClient;
}) {
    const { t } = useTranslation();

    const { mutateAsync, isPending } = useMutation({
        mutationKey: ["deleteFeedback"],
        mutationFn: () => {
            return CapacitorHttp.delete({
                url: API_URL + `/feedback/${feedbackId}`,
            }).then((res) => res.data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["getFeedbacks"],
            });
            setIsOpen(false);
        },
    });

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogContent className="min-w-full container">
                <AlertDialogHeader className="text-sm text-center">
                    {t("operator.reports.feedback.delete.warning.title")}
                </AlertDialogHeader>
                <AlertDialogDescription className="text-xs text-center">
                    {t("operator.reports.feedback.delete.warning.subtitle")}
                </AlertDialogDescription>
                <AlertDialogFooter>
                    <div className="flex flex-row gap-2">
                        <Button
                            onClick={() => {
                                mutateAsync();
                            }}
                            disabled={isPending}
                            variant="destructive"
                            className="w-full"
                        >
                            {isPending
                                ? t("operator.reports.feedback.delete.warning.pending")
                                : t("operator.reports.feedback.delete.warning.delete")}
                        </Button>
                        <Button
                            className="w-full"
                            onClick={() => {
                                setIsOpen(false);
                            }}
                        >
                            {t("operator.reports.feedback.delete.warning.cancel")}
                        </Button>
                    </div>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export function FeedbackPage() {
    const queryClient = useQueryClient();
    const { report_id } = useParams<{ report_id: string }>();
    const history = useHistory();
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useTranslation();

    const { data: feedbackData, isError, error, isLoading, refetch, isRefetching } = useGetFeedbacks();
    const filteredData = !isLoading
        ? feedbackData.data.filter((feedback: InterfaceFeedback) => feedback.reportId === Number(report_id))
        : [];

    useIonViewDidEnter(() => {
        queryClient.invalidateQueries({
            queryKey: ["getFeedbacks"],
        });

        refetch();
    });

    return (
        <IonPage>
            <IonContent className="ion-padding" fullscreen>
                <div className="pt-12">
                    <h1 className="font-bold text-left text-xl">TrashTrack</h1>
                    <p className="text-xs text-left text-slate-600">{t("operator.reports.feedback.delete.subtitle")}</p>
                </div>
                <div className="flex flex-col pt-8 gap-2">
                    <div className="flex flex-col gap-2">
                        <Button
                            className="w-full"
                            onClick={() => history.push(`/trash-bin/tabs/feedback/${report_id}/create`)}
                        >
                            {t("operator.reports.feedback.delete.create")}
                        </Button>
                        <Button
                            className="w-full"
                            variant="secondary"
                            onClick={() => history.replace(`/trash-bin/tabs/report-action/detail/${report_id}`)}
                        >
                            {t("operator.reports.feedback.delete.back")}
                        </Button>
                    </div>
                    <Separator className="my-4" />
                    {isError && (
                        <Card className="flex flex-col mt-4">
                            <CardContent className="pt-4">
                                <p className="text-center text-xs">{JSON.stringify(error)}</p>
                            </CardContent>
                        </Card>
                    )}
                    <div className="flex flex-col gap-4">
                        {isLoading ? (
                            <Card className="flex flex-col mt-4">
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
                        ) : filteredData.length === 0 ? (
                            <Card className="flex flex-col mt-4">
                                <CardContent className="pt-4">
                                    <p className="text-center text-xs">
                                        {t("operator.reports.feedback.delete.noResults")}
                                    </p>
                                </CardContent>
                            </Card>
                        ) : (
                            filteredData.map((feedback: InterfaceFeedback) => (
                                <Card className="flex flex-col mt-4">
                                    <CardContent className="pt-4">
                                        <div key={feedback.id} className="flex flex-col gap-2">
                                            <p className="text-xs">{feedback.title}</p>
                                            <p className="text-xs">{feedback.description}</p>
                                            <p className="text-xs">
                                                {t("operator.reports.feedback.delete.created")}{" "}
                                                {formatDateTimeAgo(dayjs(feedback.createdAt))}
                                            </p>
                                            <Button
                                                className="w-full mt-4"
                                                variant="destructive"
                                                onClick={() => {
                                                    setIsOpen(true);
                                                }}
                                            >
                                                {t("operator.reports.feedback.delete.delete")}
                                            </Button>
                                            <DeleteConfirmationDialog
                                                feedbackId={feedback.id.toString()}
                                                isOpen={isOpen}
                                                setIsOpen={setIsOpen}
                                                queryClient={queryClient}
                                            />
                                        </div>
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

export default FeedbackPage;
