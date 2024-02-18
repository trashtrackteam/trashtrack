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

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogContent className="min-w-full container">
                <AlertDialogHeader className="text-sm text-center">
                    Are you sure you want to delete this sub trashbin?
                </AlertDialogHeader>
                <AlertDialogDescription className="text-xs text-center">
                    This action is irreversible.
                </AlertDialogDescription>
                <AlertDialogFooter>
                    <Button
                        onClick={() => {
                            mutateAsync();
                        }}
                        disabled={isPending}
                        variant="destructive"
                        className="my-4"
                    >
                        {isPending ? "Deleting..." : "Delete"}
                    </Button>
                    <AlertDialogCancel>
                        <Button
                            className="w-full"
                            onClick={() => {
                                setIsOpen(false);
                            }}
                        >
                            Cancel
                        </Button>
                    </AlertDialogCancel>
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
                                                Name
                                            </Label>
                                            <Input readOnly id="name" value={subtrashbin?.name} />
                                        </div>
                                        <div>
                                            <Label htmlFor="openCount" className="text-xs">
                                                Capacity
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
                                        <p className="text-center text-xs mb-4">Actions</p>
                                        <div className="flex flex-row gap-2">
                                            <Button
                                                onClick={() => setIsOpen(true)}
                                                className="w-full"
                                                variant="destructive"
                                            >
                                                Delete
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
                                                Update
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
                                Back
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </IonContent>
        </IonPage>
    );
}

export default DetailedSubTrashbinPage;
