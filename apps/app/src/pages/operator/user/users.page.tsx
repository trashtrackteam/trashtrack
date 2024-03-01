import {
    IonContent,
    IonPage,
    IonRefresher,
    IonRefresherContent,
    RefresherEventDetail,
    useIonViewDidEnter,
} from "@ionic/react";
import { Button, Card, CardContent, CardHeader, CardTitle, Input, Label, Separator, Skeleton } from "@trashtrack/ui";
import { useQueryClient } from "@tanstack/react-query";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import Fuse from "fuse.js";
import { useTranslation } from "react-i18next";
import { useGetUsers } from "./get-users.query";

export enum EnumUserRole {
    operator = "operator",
    admin = "admin",
}
export interface InterfaceUser {
    id: number;
    name: string;
    username: string;
    phoneNumber: string;
    role: EnumUserRole;
    active: boolean;
    description?: string;
}

export function UsersPage() {
    const history = useHistory();
    const queryClient = useQueryClient();
    const [searchTerm, setSearchTerm] = useState("");
    const { t } = useTranslation();

    const { data: usersData, isLoading, isFetching, isError, error, refetch } = useGetUsers();

    useIonViewDidEnter(() => {
        queryClient.invalidateQueries({
            queryKey: ["getUsers"],
        });

        refetch();
    });

    const fuseOptions = {
        keys: ["username"],
        threshold: 0.4,
    };
    const fuse = new Fuse(!isLoading ? (usersData.data as InterfaceUser[]) : [], fuseOptions);

    const filteredData: InterfaceUser[] =
        !isLoading && searchTerm === "" ? usersData.data : fuse.search(searchTerm).map((result) => result.item);

    function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
        queryClient.invalidateQueries({
            queryKey: ["getUsers"],
        });

        refetch();
        event.detail.complete();
    }

    return (
        <IonPage>
            <IonContent className="ion-padding" fullscreen>
                <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
                    <IonRefresherContent>
                        <p className="text-xs text-center">Refreshing...</p>
                    </IonRefresherContent>
                </IonRefresher>
                <div className="pt-12">
                    <h1 className="font-bold text-left text-xl">TrashTrack</h1>
                    <p className="text-xs text-left text-slate-600">{t("operator.user.subtitle")}</p>
                </div>
                <div className="flex flex-col pt-8 gap-2">
                    <div className="flex flex-col gap-2">
                        <Button className="w-full" onClick={() => history.push(`/operator/tabs/user/create`)}>
                            {/* @ts-expect-error: idk */}
                            {t("operator.user.create")}
                        </Button>
                    </div>
                    <Separator className="my-4" />
                    <div className="flex flex-col">
                        <Label className="mb-2" htmlFor="search">
                            {t("operator.user.search")}
                        </Label>
                        <Input
                            id="search"
                            type="text"
                            placeholder={t("operator.user.search")}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    {isLoading || isFetching ? (
                        Array.from({ length: 5 }).map((_, index) => (
                            <Card key={index} className="flex flex-col mt-4">
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
                        ))
                    ) : filteredData.length === 0 && searchTerm !== "" ? (
                        <Card className="flex flex-col">
                            <CardHeader>
                                <p className="text-xs text-center">{t("operator.user.noResults")}</p>
                            </CardHeader>
                        </Card>
                    ) : (
                        filteredData.map((user: InterfaceUser) => (
                            <Card key={user.id} className="flex flex-col mt-4">
                                <CardContent className="pt-4">
                                    <div className="flex flex-col gap-2">
                                        <p className="text-xs text-left">{user.username}</p>
                                        <p className="text-xs text-left">
                                            {user.active ? t("operator.user.is_active") : t("operator.user.not_active")}
                                        </p>
                                        <div className="flex flex-col gap-2 mt-4">
                                            <Button
                                                className="w-full"
                                                onClick={() => history.push(`/operator/tabs/user/details/${user.id}`)}
                                            >
                                                {t("operator.user.view_details")}
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                    {isError && (
                        <Card className="flex flex-col mt-4">
                            <CardContent className="pt-4">
                                <p className="text-center text-xs">{JSON.stringify(error)}</p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </IonContent>
        </IonPage>
    );
}

export default UsersPage;
