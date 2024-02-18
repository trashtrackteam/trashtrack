import { IonContent, IonPage } from "@ionic/react";
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
import { InterfaceTrashbin } from "./trashbin.page";
import { useGetTrashBinById } from "./get-trashbin-id.query";
import { OpenLayersMap } from "./openlayers-map.component";
import { CapacitorHttp } from "@capacitor/core";
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "@trashtrack/utils";

export function DeleteConfirmationDialog({
    trashbinId,
    isOpen,
    setIsOpen,
    queryClient,
}: {
    trashbinId: string;
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    queryClient: QueryClient;
}) {
    const history = useHistory();

    const { mutateAsync, isPending } = useMutation({
        mutationKey: ["deleteTrashbin", trashbinId],
        mutationFn: () => {
            return CapacitorHttp.delete({
                url: API_URL + `/trash-bin/${trashbinId}`,
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
                    Are you sure you want to delete this trashbin?
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

export function DetailedTrashPage() {
    const history = useHistory();
    const { trashbin_id } = useParams<{ trashbin_id: string }>();
    const [isOpen, setIsOpen] = useState(false);
    const queryClient = useQueryClient();
    const {
        data: reportData,
        isError,
        error,
        isLoading,
        refetch,
        isRefetching,
    } = useGetTrashBinById(Number(trashbin_id));
    const trashbin = !isLoading ? (reportData.data as InterfaceTrashbin) : undefined;

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
                                            Name
                                        </Label>
                                        <Input id="name" value={trashbin?.name} />
                                    </div>
                                    <div>
                                        <Label htmlFor="description" className="text-xs">
                                            Description
                                        </Label>
                                        <Textarea id="description" value={trashbin?.description} />
                                    </div>
                                    <div>
                                        <Label htmlFor="latlang" className="text-xs">
                                            Location
                                        </Label>
                                        <Input
                                            id="latlang"
                                            className="mb-4"
                                            value={`${trashbin?.latitude as number}, ${trashbin?.longitude as number}`}
                                        />
                                        <OpenLayersMap
                                            latitude={trashbin?.latitude as number}
                                            longitude={trashbin?.longitude as number}
                                        />
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
                                            <Button className="w-full" variant="secondary">
                                                Update
                                            </Button>
                                            <DeleteConfirmationDialog
                                                trashbinId={trashbin_id}
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
