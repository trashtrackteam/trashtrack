import { IonContent, IonPage } from "@ionic/react";
import { useGetReportById } from "./get-report.query";
import { useHistory, useParams } from "react-router-dom";
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Input,
    Label,
    Skeleton,
    Textarea,
    Separator,
    OperatorContext,
    CardDescription,
} from "@trashtrack/ui";
import { useContext, useEffect, useState } from "react";
import { InterfaceReport, EnumResponseStatus } from "./reports.page";
import { API_URL } from "@trashtrack/utils";
import { CapacitorHttp } from "@capacitor/core";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

function ReportStatusAction({
    report,
    refetch,
    operatorId,
    isRefetching,
}: {
    report: InterfaceReport | undefined;
    refetch: () => void;
    operatorId: string;
    isRefetching: boolean;
}) {
    const { t } = useTranslation();
    const { mutateAsync, isPending } = useMutation({
        mutationKey: ["acceptReport", report?.id, operatorId],
        mutationFn: (formData: { status: EnumResponseStatus }) => {
            return CapacitorHttp.request({
                url: `${API_URL}/report/${report?.id}/status`,
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                data: {
                    userId: Number(operatorId),
                    status: formData.status,
                },
            }).then((res) => res.data);
        },
        onSuccess: () => {
            refetch();
        },
    });

    /**
     * ! WARNING !
     * The following code is not optimized and should be refactored for better readability and maintainability.
     * Right now, it's just a quick and dirty solution to make the code work, and getting the job done.
     * - @elizielx
     * */

    const handleAccept = async () => {
        await mutateAsync({ status: EnumResponseStatus.ACCEPTED });
    };

    const handleReject = async () => {
        await mutateAsync({ status: EnumResponseStatus.REJECTED });
    };

    const handleCancel = async () => {
        await mutateAsync({ status: EnumResponseStatus.NOT_RESPONDED });
    };

    const handleComplete = async () => {
        await mutateAsync({ status: EnumResponseStatus.COMPLETED });
    };

    if (report?.status === EnumResponseStatus.NOT_RESPONDED) {
        return isRefetching ? (
            <Skeleton className="h-12 w-full" />
        ) : (
            <>
                <Button className="w-full" variant={"default"} onClick={() => handleAccept()}>
                    {isPending
                        ? t("operator.reports.detailed.input.actions.loading")
                        : t("operator.reports.detailed.input.actions.accept")}
                </Button>
                <Button className="w-full" variant={"destructive"} onClick={() => handleReject()}>
                    {isPending
                        ? t("operator.reports.detailed.input.actions.loading")
                        : t("operator.reports.detailed.input.actions.reject")}
                </Button>
            </>
        );
    }

    if (report?.status === EnumResponseStatus.ACCEPTED) {
        return isRefetching ? (
            <Skeleton className="h-12 w-full" />
        ) : (
            <Button className="w-full" variant={"default"} onClick={() => handleComplete()}>
                {isPending
                    ? t("operator.reports.detailed.input.actions.loading")
                    : t("operator.reports.detailed.input.actions.complete")}
            </Button>
        );
    }

    if (report?.status === EnumResponseStatus.REJECTED) {
        return isRefetching ? (
            <Skeleton className="h-12 w-full" />
        ) : (
            <Button className="w-full" variant={"default"} onClick={() => handleCancel()}>
                {isPending
                    ? t("operator.reports.detailed.input.actions.loading")
                    : t("operator.reports.detailed.input.actions.cancel")}
            </Button>
        );
    }

    if (report?.status === EnumResponseStatus.COMPLETED) {
        return isRefetching ? (
            <Skeleton className="h-12 w-full" />
        ) : (
            <Button className="w-full" variant={"default"} onClick={() => handleCancel()}>
                {isPending
                    ? t("operator.reports.detailed.input.actions.loading")
                    : t("operator.reports.detailed.input.actions.cancel")}
            </Button>
        );
    }

    if (
        report?.status === EnumResponseStatus.ACCEPTED ||
        report?.status === EnumResponseStatus.REJECTED ||
        report?.status === EnumResponseStatus.COMPLETED
    ) {
        return isRefetching ? (
            <Skeleton className="h-12 w-full" />
        ) : (
            <Button className="w-full" variant={"default"} onClick={() => handleCancel()}>
                {isPending
                    ? t("operator.reports.detailed.input.actions.loading")
                    : t("operator.reports.detailed.input.actions.cancel")}
            </Button>
        );
    }
}

export function DetailedReportPage() {
    const history = useHistory();
    const operator = useContext(OperatorContext);
    const { report_id } = useParams<{ report_id: string }>();
    const { data: reportData, isError, error, isLoading, refetch, isRefetching } = useGetReportById(Number(report_id));
    const [imageUrl, setImageUrl] = useState<string>("");
    const report = !isLoading ? (reportData.data as InterfaceReport) : undefined;
    const { t } = useTranslation();

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
                    <p className="text-xs text-left text-slate-600">{t("operator.reports.detailed.subtitle")}</p>
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
                        <div>
                            <Card className="flex flex-col mt-4">
                                <CardHeader className="pt-4">
                                    <p className="font-bold text-lg">{t("operator.reports.detailed.input.reporter")}</p>
                                </CardHeader>
                                <CardContent className="pt-4">
                                    <div className="flex flex-col gap-2">
                                        <div>
                                            <Label htmlFor="name" className="text-xs">
                                                {t("operator.reports.detailed.input.name")}
                                            </Label>
                                            <Input readOnly id="name" value={report?.name} />
                                        </div>
                                        <div>
                                            <Label htmlFor="name" className="text-xs">
                                                NIK
                                            </Label>
                                            <Input readOnly id="name" value={report?.nik} />
                                        </div>
                                        <div>
                                            <Label htmlFor="name" className="text-xs">
                                                {t("operator.reports.detailed.input.no")}
                                            </Label>
                                            <Input readOnly id="name" value={report?.phoneNumber} />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="flex flex-col mt-4">
                                <CardHeader className="pt-4">
                                    <p className="font-bold text-lg">{t("operator.reports.detailed.input.info")}</p>
                                </CardHeader>
                                <CardContent className="pt-4">
                                    <div className="flex flex-col gap-2">
                                        <div>
                                            <Label htmlFor="description" className="text-xs">
                                                {t("operator.reports.detailed.input.description")}
                                            </Label>
                                            <Textarea readOnly id="description" value={report?.description} />
                                        </div>
                                        <div>
                                            <Label htmlFor="description" className="text-xs">
                                                {t("operator.reports.detailed.input.status")}
                                            </Label>
                                            <Input
                                                readOnly
                                                id="status"
                                                value={
                                                    report?.status === EnumResponseStatus.ACCEPTED
                                                        ? t("operator.reports.accepted")
                                                        : report?.status === EnumResponseStatus.REJECTED
                                                        ? t("operator.reports.rejected")
                                                        : report?.status === EnumResponseStatus.COMPLETED
                                                        ? t("operator.reports.completed")
                                                        : t("operator.reports.notResponded")
                                                }
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="image" className="text-xs">
                                                {t("operator.reports.detailed.input.photo")}
                                            </Label>
                                            <img
                                                src={imageUrl ? imageUrl : "https://via.placeholder.com/150"}
                                                className="w-full h-object-cover"
                                                alt=""
                                            />
                                        </div>
                                        <Separator className="my-4" />
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="flex flex-col mt-4">
                                <CardHeader className="pt-4">
                                    <p className="font-bold text-lg">
                                        {t("operator.reports.detailed.input.actions.title")}
                                    </p>
                                </CardHeader>
                                <CardDescription>
                                    <div className="flex flex-col gap-2">
                                        <div>
                                            <Button
                                                className="w-full mb-2"
                                                disabled={report?.status !== EnumResponseStatus.ACCEPTED}
                                                onClick={() => history.push(`/trash-bin/tabs/feedback/${report?.id}`)}
                                            >
                                                {t("operator.reports.detailed.input.submitFeedback")}
                                            </Button>
                                            <div className="flex flex-row gap-2">
                                                <ReportStatusAction
                                                    report={report}
                                                    refetch={refetch}
                                                    operatorId={operator.id}
                                                    isRefetching={isRefetching}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </CardDescription>
                            </Card>
                        </div>
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
