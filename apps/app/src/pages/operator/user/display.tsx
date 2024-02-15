import { IonContent, IonPage } from "@ionic/react";
import { Button, Card, CardContent, CardHeader, Icons } from "@trashtrack/ui";
import { useGetUsersQuery } from "../../../queries/get-users-query";
import { IonFab, IonFabButton } from "@ionic/react";
import { useState } from "react";
import { UserCreationSheet, UserDeleteConfirmationDialog, UserDetailsSheet } from "@trashtrack/ui";
import { useHistory } from "react-router-dom";

export function OperatorUserDisplay() {
    const history = useHistory();

    const { data, isLoading, refetch } = useGetUsersQuery();
    const [isUserCreationSheetOpen, setIsUserCreationSheetOpen] = useState(false);
    const [isUserDeleteConfirmationOpen, setIsUserDeleteConfirmationOpen] = useState(false);
    const [isUserDetailsSheetOpen, setIsUserDetailsSheetOpen] = useState(false);

    return (
        <IonPage>
            <IonContent className="operator-user-display ion-padding" fullscreen>
                <div className="pt-12">
                    <h1 className="font-bold text-left text-xl">TrashTrack</h1>
                    <p className="text-xs text-left text-slate-600">User Management</p>
                </div>
                <div className="flex flex-col pt-8 gap-2">
                    {isLoading ? (
                        <Card>
                            <CardContent className="text-center">
                                <h2 className="text-sm font-bold">Loading...</h2>
                            </CardContent>
                        </Card>
                    ) : (
                        data.data?.map((user: { id: number; username: string; role: string; active: boolean }) => (
                            <Card className="flex flex-row" key={user.username}>
                                <CardHeader className="w-56">
                                    <div onClick={() => setIsUserDetailsSheetOpen(true)}>
                                        <h2 className="text-sm font-bold">Username: {user.username}</h2>
                                        <p className="text-xs text-slate-600">
                                            Level: {user.role} <br />
                                            Status: {user.active ? "Active" : "Inactive"}
                                        </p>
                                    </div>
                                </CardHeader>
                                <CardContent className="pt-6 flex flex-col gap-2">
                                    <Button
                                        onClick={() => history.push(`/operator/tabs/user/edit/${user.id}`)}
                                        variant="default"
                                        className="font-bold text-xs w-full"
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        onClick={() => setIsUserDeleteConfirmationOpen(true)}
                                        variant="destructive"
                                        className="font-bold text-xs w-full"
                                    >
                                        Delete
                                    </Button>
                                </CardContent>

                                <UserDetailsSheet
                                    id={user.id.toString()}
                                    isOpen={isUserDetailsSheetOpen}
                                    setIsOpen={setIsUserDetailsSheetOpen}
                                />

                                <UserDeleteConfirmationDialog
                                    id={user.id.toString()}
                                    refetchUser={refetch}
                                    isOpen={isUserDeleteConfirmationOpen}
                                    setIsOpen={setIsUserDeleteConfirmationOpen}
                                />
                            </Card>
                        ))
                    )}
                </div>

                <UserCreationSheet
                    refetchUser={refetch}
                    isOpen={isUserCreationSheetOpen}
                    setIsOpen={setIsUserCreationSheetOpen}
                />
            </IonContent>
            <IonFab slot="fixed" vertical="bottom" horizontal="start">
                <IonFabButton onClick={() => setIsUserCreationSheetOpen(true)}>
                    <Icons.add strokeWidth={1} className="w-[32px] h-[30px]" />
                </IonFabButton>
            </IonFab>
        </IonPage>
    );
}

export default OperatorUserDisplay;
