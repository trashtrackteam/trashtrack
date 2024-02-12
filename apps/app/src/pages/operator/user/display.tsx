import { IonContent, IonPage } from "@ionic/react";
import { Button, Card, CardContent, CardHeader, Icons } from "@trashtrack/ui";
import { useGetUsersQuery } from "../../../queries/get-users-query";
import { IonFab, IonFabButton } from "@ionic/react";

export function OperatorUserDisplay() {
    const { data, isLoading } = useGetUsersQuery();

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
                        data.data?.map((user: { username: string; role: string }) => (
                            <Card className="flex flex-row" key={user.username}>
                                <CardHeader className="w-56">
                                    <h2 className="text-sm font-bold">Username: {user.username}</h2>
                                    <p className="text-xs text-slate-600">Level: {user.role}</p>
                                </CardHeader>
                                <CardContent className="pt-6 flex flex-col gap-2">
                                    <Button className="font-bold text-xs w-full">Update</Button>
                                    <Button variant="destructive" className="font-bold text-xs w-full">
                                        Delete
                                    </Button>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            </IonContent>
            <IonFab slot="fixed" vertical="bottom" horizontal="start">
                <IonFabButton>
                    <Icons.add strokeWidth={1} className="w-[32px] h-[30px]" />
                </IonFabButton>
            </IonFab>
        </IonPage>
    );
}

export default OperatorUserDisplay;
