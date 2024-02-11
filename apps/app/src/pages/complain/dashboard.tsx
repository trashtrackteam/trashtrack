import { IonContent, IonPage } from "@ionic/react";
import { Card, CardHeader, CardContent, CardTitle, Button } from "@trashtrack/ui";
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
                    <div>
                        <h2 className="text-lg">
                            Selamat datang, <span className="font-bold">{nik}</span>
                        </h2>
                    </div>
                    <Card className="flex flex-col">
                        <CardHeader className="text-center">
                            <CardTitle className="text-lg">Lihat riwayat laporan kamu</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-2">
                            <Button
                                className="font-bold text-xs w-full"
                                variant={"secondary"}
                                onClick={() => history.replace("/complain/form/report-history")}
                            >
                                Riwayat Laporan
                            </Button>
                        </CardContent>
                    </Card>
                    <Card className="flex flex-col">
                        <CardHeader className="text-center">
                            <CardTitle className="text-lg">Sampaikan keluhan atau laporan baru kamu</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-2">
                            <Button
                                className="font-bold text-xs w-full"
                                variant={"secondary"}
                                onClick={() => history.replace("/complain/form/tempat-sampah")}
                            >
                                Lapor Sekarang
                            </Button>
                        </CardContent>
                    </Card>
                    <Card className="flex flex-col mt-8">
                        <CardContent className="pt-6">
                            <Button
                                className="font-bold text-xs w-full mb-2"
                                onClick={() => history.replace("/complain/form/personal-details")}
                            >
                                Kembali ke Login
                            </Button>
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
