import { IonContent, IonPage } from "@ionic/react";
import { Card, CardDescription, CardHeader, CardContent, CardTitle, Button } from "@trashtrack/ui";
import { getUserNIK } from "@trashtrack/utils";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export function ComplainDashboard() {
    const history = useHistory();
    const [nik, setNik] = useState<number | undefined>(0);

    useEffect(() => {
        async function getNik() {
            return await getUserNIK();
        }

        const fetchNik = async () => {
            const nikFetch = await getNik();

            if (!nikFetch) {
                history.push("/complain/form/personal-details");
            }

            setNik(nikFetch);
        };

        fetchNik();
    }, [history]);

    return (
        <IonPage>
            <IonContent className="complain-dashboard ion-padding" fullscreen>
                <div className="pt-12">
                    <h1 className="font-bold text-left text-xl">TrashTrack</h1>
                    <p className="text-xs text-left text-slate-600">Dashboard</p>
                </div>
                <div className="flex flex-col pt-8 gap-4">
                    <Card className="flex flex-col">
                        <CardHeader className="text-center">
                            <CardTitle className="text-base">Halaman sedang dalam pengembangan</CardTitle>
                            <CardDescription className="text-xs">
                                NIK: {nik} <br />
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <Button className="font-bold text-xs w-full" onClick={() => history.replace("/tabs/home")}>
                                Kembali
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </IonContent>
        </IonPage>
    );
}

export default ComplainDashboard;
