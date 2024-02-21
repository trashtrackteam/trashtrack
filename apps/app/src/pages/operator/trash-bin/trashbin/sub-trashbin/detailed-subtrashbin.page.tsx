import { IonContent, IonPage, useIonViewDidEnter } from "@ionic/react";
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
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
} from "@trashtrack/ui";
import { useContext, useState } from "react";
import { CapacitorHttp } from "@capacitor/core";
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "@trashtrack/utils";
import { useGetSubTrashBinById } from "./get-subtrashbin-id.query";
import { InterfaceSubTrashbin } from "./subtrashbin.page";
import { useTranslation } from "react-i18next";

export function DeleteConfirmationDialog({
    subtrashbinId,
    isOpen,
    setIsOpen,
    queryClient,
}: {
    subtrashbinId: string;
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    queryClient: QueryClient;
}) {
    const history = useHistory();

    const { mutateAsync, isPending } = useMutation({
        mutationKey: ["deleteSubTrashbin", subtrashbinId],
        mutationFn: () => {
            return CapacitorHttp.delete({
                url: API_URL + `/sub-trash-bin/${subtrashbinId}`,
            }).then((res) => res.data);
        },
        onSuccess: () => {
            setIsOpen(false);
            history.goBack();
        },
    });

    const { t } = useTranslation();

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogContent className="min-w-full container">
                <AlertDialogHeader className="text-sm text-center">
                    {t("operator.subtrashbin.detailed.dialog_delete.title")}
                </AlertDialogHeader>
                <AlertDialogDescription className="text-xs text-center">
                    {t("operator.subtrashbin.detailed.dialog_delete.subtitle")}
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
                                ? t("operator.subtrashbin.detailed.dialog_delete.pending")
                                : t("operator.subtrashbin.detailed.dialog_delete.delete")}
                        </Button>
                        <Button
                            className="w-full"
                            onClick={() => {
                                setIsOpen(false);
                            }}
                        >
                            {t("operator.subtrashbin.detailed.dialog_delete.cancel")}
                        </Button>
                    </div>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export function DetailedSubTrashbinPage() {
    const history = useHistory();
    const { trashbin_id, subtrashbin_id } = useParams<{ trashbin_id: string; subtrashbin_id: string }>();
    const [isOpen, setIsOpen] = useState(false);
    const queryClient = useQueryClient();
    const {
        data: subtrashbinData,
        isError,
        error,
        isLoading,
        refetch,
        isRefetching,
    } = useGetSubTrashBinById(Number(subtrashbin_id));
    const subtrashbin = !isLoading ? (subtrashbinData.data as InterfaceSubTrashbin) : undefined;

    useIonViewDidEnter(() => {
        queryClient.invalidateQueries({
            queryKey: ["useGetSubTrashBinById", subtrashbin_id],
        });

        refetch();
    });

    const { t } = useTranslation();

    return (
        <IonPage>
            <IonContent className="ion-padding" fullscreen>
                <div className="pt-12">
                    <h1 className="font-bold text-left text-xl">TrashTrack</h1>
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
                        <Card className="flex flex-col mt-4">
                            <CardContent className="pt-4">
                                <div className="flex flex-col gap-2">
                                    <div>
                                        <div>
                                            <Label htmlFor="name" className="text-xs">
                                                {t("operator.subtrashbin.detailed.name")}
                                            </Label>
                                            <Input readOnly id="name" value={subtrashbin?.name} />
                                        </div>
                                        <div>
                                            <Label htmlFor="openCount" className="text-xs">
                                                {t("operator.subtrashbin.detailed.capacity")}
                                            </Label>
                                            <Input
                                                readOnly
                                                type="text"
                                                id="openCount"
                                                value={`${subtrashbin?.currentCapacity} / ${subtrashbin?.maxCapacity}`}
                                            />
                                        </div>
                                    </div>
                                    <Separator className="my-4" />
                                    <div className="mt-4">
                                        <p className="text-center text-xs mb-4">
                                            {t("operator.subtrashbin.detailed.action")}
                                        </p>
                                        <div className="flex flex-row gap-2">
                                            <Button
                                                onClick={() => setIsOpen(true)}
                                                className="w-full"
                                                variant="destructive"
                                            >
                                                {t("operator.subtrashbin.detailed.delete")}
                                            </Button>
                                            <Button
                                                className="w-full"
                                                variant="secondary"
                                                onClick={() =>
                                                    history.push(
                                                        `/trash-bin/tabs/trashbin/subtrashbin/${trashbin_id}/update/${subtrashbin_id}`
                                                    )
                                                }
                                            >
                                                {t("operator.subtrashbin.detailed.edit")}
                                            </Button>
                                            <DeleteConfirmationDialog
                                                subtrashbinId={subtrashbin_id}
                                                isOpen={isOpen}
                                                setIsOpen={setIsOpen}
                                                queryClient={queryClient}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                    <Card className="flex flex-col mt-4">
                        <CardContent className="pt-4">
                            <Button className="w-full" variant="secondary" onClick={() => history.goBack()}>
                                {t("operator.subtrashbin.detailed.back")}
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </IonContent>
        </IonPage>
    );
}

export default DetailedSubTrashbinPage;
