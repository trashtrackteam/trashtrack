import { IonContent, IonPage } from "@ionic/react";
import { Card, CardHeader, CardContent, CardTitle, Button, CardDescription } from "@trashtrack/ui";
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
                    <p className="text-xs text-left text-slate-600">Dashboard.</p>
                </div>
                <div className="flex flex-col pt-8 gap-4">
                    <Card className="flex flex-col">
                        <CardHeader>
                            <CardTitle className="text-lg">Selamat datang di pusat pelaporan sampah.</CardTitle>
                            <CardDescription className="text-base">
                                Silahkan pilih menu yang tersedia dibawah untuk melaporkan tempah sampah, atau melihat
                                riwayat laporan sampah.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm">
                                NIK:{" "}
                                <span className="font-bold">{`${String(nik).substring(0, 3)}***${String(nik).substring(
                                    6
                                )}`}</span>
                            </p>
                            <div className="flex flex-col gap-2 mt-8">
                                <Button
                                    className="font-semibold text-xs w-full mb-2"
                                    onClick={() => history.replace("/complain/form/personal-details")}
                                >
                                    Isi ulang informasi pribadi
                                </Button>
                                <Button
                                    variant="secondary"
                                    className="font-semibold text-xs w-full mb-2"
                                    onClick={() => history.replace("/tabs/home")}
                                >
                                    Kembali ke halaman utama
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </IonContent>
        </IonPage>
    );
}

export default ComplainDashboard;
