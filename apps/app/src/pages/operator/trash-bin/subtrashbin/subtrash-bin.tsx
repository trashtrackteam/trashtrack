import { IonContent, IonPage } from "@ionic/react";
import { Card, CardHeader, CardContent, CardTitle, Input, Label, Separator, Skeleton } from "@trashtrack/ui";
import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useASubTrashbinQuery } from "../../../../queries/get-a-sub-trash-bin-query";
import { SubTrashBin } from "../display";

export function OperatorSubTrashbinDisplay() {
    const { t } = useTranslation();
    const history = useHistory();

    const { trash_bin_id } = useParams<{ trash_bin_id: string }>();
    const [searchTerm, setSearchTerm] = useState("");

    const { data, isLoading, isError, refetch } = useASubTrashbinQuery(Number(trash_bin_id));

    useEffect(() => {
        refetch();
    }, [refetch]);

    return (
        <IonPage>
            <IonContent className="complain-form-tempat-sampah ion-padding" fullscreen>
                <div className="pt-12">
                    <h1 className="font-bold text-left text-xl">TrashTrack</h1>
                    <p className="text-xs text-left text-slate-600">Sub Trasbin</p>
                </div>
                <div className="flex flex-col pt-8 gap-4">
                    <div className="flex flex-col">
                        <Label className="mb-2" htmlFor="search">
                            {t("complain.form.tempat-sampah.search")}
                        </Label>
                        <Input
                            id="search"
                            type="text"
                            placeholder={t("complain.form.tempat-sampah.search-input")}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Separator className="my-4" />
                    {isLoading ? (
                        <div>Loading</div>
                    ) : isError ? (
                        <div>Error</div>
                    ) : (
                        <div>
                            {data.data.subTrashBin &&
                                data.data.subTrashBin.map((subTrashBin: SubTrashBin) => (
                                    <Card
                                        key={subTrashBin.id}
                                        onClick={() =>
                                            history.push(`/operator/tabs/trash-bin/subtrashbin/edit/${subTrashBin.id}`)
                                        }
                                    >
                                        <CardHeader>
                                            <CardTitle>{subTrashBin.name}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p>Max Capacity: {subTrashBin.maxCapacity}</p>
                                            <p>Current Capacity: {subTrashBin.currentCapacity}</p>
                                        </CardContent>
                                    </Card>
                                ))}
                        </div>
                    )}
                </div>
            </IonContent>
        </IonPage>
    );
}

export default OperatorSubTrashbinDisplay;
