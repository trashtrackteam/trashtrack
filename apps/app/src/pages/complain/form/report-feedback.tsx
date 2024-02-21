import { IonContent, IonPage, useIonViewDidEnter } from "@ionic/react";
import { Card, CardContent, Button, Separator, Skeleton, CardHeader } from "@trashtrack/ui";
import { useHistory, useParams } from "react-router-dom";
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
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
import { useState } from "react";
import { useGetFeedbacks } from "../../operator/trash-bin/report/report-feedback/get-feedbacks.query";
import { t } from "i18next";

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
                    Are you sure you want to delete this feedback?
                </AlertDialogHeader>
                <AlertDialogDescription className="text-xs text-center">
                    This action is irreversible.
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
                            {isPending ? "Deleting..." : "Delete"}
                        </Button>
                        <Button
                            className="w-full"
                            onClick={() => {
                                setIsOpen(false);
                            }}
                        >
                            Cancel
                        </Button>
                    </div>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export function ComplainReportFeedback() {
    const queryClient = useQueryClient();
    const { report_id } = useParams<{ report_id: string }>();
    const history = useHistory();
    const [isOpen, setIsOpen] = useState(false);

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
                    <p className="text-xs text-left text-slate-600">{t("complain.feedback.subtitle")}</p>
                </div>
                <div className="flex flex-col pt-8 gap-2">
                    <div className="flex flex-col gap-2">
                        <Button
                            className="w-full"
                            variant="secondary"
                            onClick={() => history.replace(`/complain/tabs/form/report-history`)}
                        >
                            {t("complain.feedback.back")}
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
                    ) : (
                        <Card className="flex flex-col mt-4">
                            <CardContent className="pt-4">
                                {filteredData.length === 0 ? (
                                    <p className="text-center text-xs">{t("complain.feedback.noFeedback")}</p>
                                ) : (
                                    filteredData.map((feedback: InterfaceFeedback) => (
                                        <div key={feedback.id} className="flex flex-col gap-2">
                                            <p className="text-xs">{feedback.title}</p>
                                            <p className="text-xs">{feedback.description}</p>
                                            <p className="text-xs">
                                                {t("complain.feedback.createdAt")} {formatDateTimeAgo(dayjs(feedback.createdAt))}
                                            </p>
                                        </div>
                                    ))
                                )}
                            </CardContent>
                        </Card>
                    )}
                </div>
            </IonContent>
        </IonPage>
    );
}

export default ComplainReportFeedback;
