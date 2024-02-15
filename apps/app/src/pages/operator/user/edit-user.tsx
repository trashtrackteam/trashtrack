import { IonContent, IonPage } from "@ionic/react";
import { useParams } from "react-router-dom";
import { useGetUserQuery, IUserQuery } from "../../../queries/get-user-query";
import { UserEditForm } from "@trashtrack/ui";
import { useGetUsersQuery } from "../../../queries/get-users-query";

export function OperatorUserEdit() {
    const { user_id } = useParams<{ user_id: string }>();
    const { refetch } = useGetUsersQuery();

    const { data, isLoading, isError } = useGetUserQuery(user_id);

    return (
        <IonPage>
            <IonContent className="complain-form-laporan ion-padding" fullscreen>
                <div className="pt-12">
                    <h1 className="font-bold text-left text-xl">TrashTrack</h1>
                    <p className="text-xs text-left text-slate-600">Edit User</p>
                </div>
                <div className="flex flex-col pt-8 gap-4">
                    {isError && <p>Error fetching user</p>}
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        <UserEditForm id={user_id} refetch={refetch} user={data.data as IUserQuery} />
                    )}
                </div>
            </IonContent>
        </IonPage>
    );
}

export default OperatorUserEdit;
