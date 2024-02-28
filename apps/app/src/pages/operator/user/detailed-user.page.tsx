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
import { useTranslation } from "react-i18next";
import { useGetUserById } from "./get-user-id.query";
import { InterfaceUser } from "./users.page";

export function DeleteConfirmationDialog({
    userId,
    isOpen,
    setIsOpen,
    queryClient,
}: {
    userId: string;
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    queryClient: QueryClient;
}) {
    const history = useHistory();
    const { t } = useTranslation();

    const { mutateAsync, isPending } = useMutation({
        mutationKey: ["deleteUser", userId],
        mutationFn: () => {
            return CapacitorHttp.delete({
                url: API_URL + `/user/${userId}`,
            }).then((res) => res.data);
        },
        onSuccess: () => {
            setIsOpen(false);
            history.goBack();
        },
    });

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogContent className="min-w-full container">
                <AlertDialogHeader className="text-sm text-center">
                    {t("operator.user.detailed.dialog_delete.title")}
                </AlertDialogHeader>
                <AlertDialogDescription className="text-xs text-center">
                    {t("operator.user.detailed.dialog_delete.subtitle")}
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
                                ? t("operator.user.detailed.dialog_delete.pending")
                                : t("operator.user.detailed.dialog_delete.delete")}
                        </Button>
                        <Button
                            className="w-full"
                            onClick={() => {
                                setIsOpen(false);
                            }}
                        >
                            {t("operator.user.detailed.dialog_delete.cancel")}
                        </Button>
                    </div>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export function DetailedUserPage() {
    const history = useHistory();
    const { t } = useTranslation();
    const { user_id } = useParams<{ user_id: string }>();
    const [isOpen, setIsOpen] = useState(false);
    const queryClient = useQueryClient();
    const { data: userData, isError, error, isLoading, refetch, isRefetching } = useGetUserById(Number(user_id));
    const user = !isLoading ? (userData.data as InterfaceUser) : undefined;

    useIonViewDidEnter(() => {
        queryClient.invalidateQueries({
            queryKey: ["useGetUserById", user_id],
        });

        refetch();
    });

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
                                        <Label htmlFor="name" className="text-xs">
                                            {t("operator.user.detailed.name")}
                                        </Label>
                                        <Input readOnly id="name" value={user?.name} />
                                    </div>
                                    <div>
                                        <Label htmlFor="username" className="text-xs">
                                            {t("operator.user.detailed.username")}
                                        </Label>
                                        <Input readOnly id="username" value={user?.username} />
                                    </div>
                                    <div>
                                        <Label htmlFor="phoneNumber" className="text-xs">
                                            {t("operator.user.detailed.phoneNumber")}
                                        </Label>
                                        <Input readOnly id="phoneNumber" value={user?.phoneNumber} />
                                    </div>
                                    <div>
                                        <Label htmlFor="role" className="text-xs">
                                            {t("operator.user.detailed.role")}
                                        </Label>
                                        <Input readOnly id="role" value={user?.role} />
                                    </div>
                                    <div>
                                        <Label htmlFor="active" className="text-xs">
                                            {t("operator.user.detailed.active")}
                                        </Label>
                                        <Input
                                            readOnly
                                            id="active"
                                            value={
                                                user?.active
                                                    ? t("operator.user.is_active")
                                                    : t("operator.user.not_active")
                                            }
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="description" className="text-xs">
                                            {t("operator.user.detailed.description")}
                                        </Label>
                                        <Textarea readOnly id="description" value={user?.description} />
                                    </div>
                                    <Separator className="my-4" />
                                    <div className="mt-4">
                                        <p className="text-center text-xs mb-4">{t("operator.user.detailed.action")}</p>
                                        <div className="flex flex-col gap-4">
                                            <Button
                                                className="w-full"
                                                variant="default"
                                                onClick={() =>
                                                    history.push(`/operator/tabs/user/change-password/${user?.id}`)
                                                }
                                            >
                                                {t("operator.user.detailed.change_password")}
                                            </Button>
                                            <div className="flex flex-row gap-2">
                                                <Button
                                                    onClick={() => setIsOpen(true)}
                                                    className="w-full"
                                                    variant="destructive"
                                                >
                                                    {t("operator.user.detailed.delete")}
                                                </Button>
                                                <Button
                                                    className="w-full"
                                                    variant="secondary"
                                                    onClick={() =>
                                                        history.push(`/operator/tabs/user/update/${user?.id}`)
                                                    }
                                                >
                                                    {t("operator.user.detailed.edit")}
                                                </Button>
                                                <DeleteConfirmationDialog
                                                    userId={user_id}
                                                    isOpen={isOpen}
                                                    setIsOpen={setIsOpen}
                                                    queryClient={queryClient}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                    <Card className="flex flex-col mt-4">
                        <CardContent className="pt-4">
                            <Button className="w-full" variant="secondary" onClick={() => history.goBack()}>
                                {t("operator.trashbin.detailed.back")}
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </IonContent>
        </IonPage>
    );
}
