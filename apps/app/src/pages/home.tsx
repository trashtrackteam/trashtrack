import { IonContent, IonPage } from "@ionic/react";
import { Card, CardDescription, CardHeader, CardContent, CardTitle, Icons } from "@trashtrack/ui";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

export function Home() {
    const history = useHistory();
    const { t } = useTranslation();

    return (
        <IonPage>
            <IonContent className="home ion-padding" fullscreen>
                <div className="pt-12">
                    <h1 className="font-bold text-left text-xl">TrashTrack</h1>
                </div>
                <div className="flex flex-col pt-8 gap-4">
                    <Card className="flex flex-row" onClick={() => history.push("/complain")}>
                        <CardHeader className="w-56">
                            <CardTitle className="text-base">{t("home.complain.title")}</CardTitle>
                            <CardDescription className="text-xs">{t("home.complain.description")}</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <Icons.complain strokeWidth={1} className="w-[78px] h-[74px]" />
                        </CardContent>
                    </Card>
                    <Card className="flex flex-row" onClick={() => history.push("/operator")}>
                        <CardHeader className="w-56">
                            <CardTitle className="text-base">{t("home.operator.title")}</CardTitle>
                            <CardDescription className="text-xs">{t("home.operator.description")}</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <Icons.login strokeWidth={1} className="w-[78px] h-[74px]" />
                        </CardContent>
                    </Card>
                </div>
            </IonContent>
        </IonPage>
    );
}

export default Home;
