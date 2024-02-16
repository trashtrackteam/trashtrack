import { IonContent, IonPage } from "@ionic/react";
import {
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
import { useState } from "react";
import { useTranslation } from "react-i18next";

export function Preferences() {
    const {
        t,
        i18n: { changeLanguage, language },
    } = useTranslation();
    const [currentLanguage, setCurrentLanguage] = useState(language);

    const handleChangeLanguage = (newLanguage: string) => {
        setCurrentLanguage(newLanguage);
        changeLanguage(newLanguage);
    };

    return (
        <IonPage>
            <IonContent className="preferences ion-padding" fullscreen>
                <div className="pt-12">
                    <h1 className="font-bold text-left text-xl">TrashTrack</h1>
                    <div className="pt-8">
                        <div className="flex flex-col gap-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-sm">{t("preferences.language.title")}</CardTitle>
                                    <CardDescription className="text-xs">
                                        {t("preferences.language.description")} <br />
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form>
                                        <div className="grid w-full items-center gap-4">
                                            <div className="flex flex-col space-y-1.5">
                                                <Label htmlFor="language"> {t("preferences.language.input")}</Label>
                                                <Select
                                                    defaultValue={currentLanguage}
                                                    onValueChange={(value: string) => {
                                                        if (value) {
                                                            handleChangeLanguage(value);
                                                        }
                                                    }}
                                                >
                                                    <SelectTrigger
                                                        id="language"
                                                        className="rounded-md border-4 border-black"
                                                    >
                                                        <SelectValue
                                                            className="border-4 border-black"
                                                            placeholder={t("preferences.language.input")}
                                                        />
                                                    </SelectTrigger>
                                                    <SelectContent position="popper">
                                                        <SelectItem value="id">Bahasa Indonesia</SelectItem>
                                                        <SelectItem value="en">English</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </form>
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
