import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import {
    Button,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Label,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@trashtrack/ui";

export function Preferences() {
    const router = useIonRouter();
    return (
        <IonPage>
            <IonContent className="preferences ion-padding" fullscreen>
                <div className="pt-12">
                    <h1 className="font-bold text-left text-xl">TrashTrack</h1>
                    <div className="pt-8">
                        <div className="flex flex-col gap-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Bahasa Aplikasi</CardTitle>
                                    <CardDescription>Pilih bahasa yang akan digunakan oleh aplikasi.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form>
                                        <div className="grid w-full items-center gap-4">
                                            <div className="flex flex-col space-y-1.5">
                                                <Label htmlFor="language">Bahasa</Label>
                                                <Select>
                                                    <SelectTrigger id="language">
                                                        <SelectValue placeholder="Pilih bahasa" />
                                                    </SelectTrigger>
                                                    <SelectContent position="popper">
                                                        <SelectItem value="bahasa-indonesia">
                                                            Bahasa Indonesia
                                                        </SelectItem>
                                                        <SelectItem value="american-english">
                                                            American English
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </form>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Development Settings</CardTitle>
                                    <CardDescription>
                                        Pengaturan ini hanya digunakan untuk pengembangan aplikasi.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Button
                                        className="font-bold text-xs"
                                        onClick={() => router.push("/onboarding", "root", "replace")}
                                    >
                                        Restart Onboarding
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
}

export default Preferences;
