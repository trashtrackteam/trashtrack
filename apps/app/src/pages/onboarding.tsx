import { IonPage, IonContent, useIonRouter } from "@ionic/react";
import { Button } from "@trashtrack/ui";
import IMAGES from "../assets";

export function Onboarding() {
    const router = useIonRouter();

    return (
        <IonPage>
            <IonContent className="onboarding ion-padding" fullscreen>
                <div className="pt-12 pb-12">
                    <h1 className="font-bold text-center text-xl">TrashTrack</h1>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <img className="w-[154px] h-[152px]" src={IMAGES.onboarding_icon} alt="Onboarding Icon" />
                    <div className="text-center pt-7 pb-32 px-11">
                        <h2 className="pb-3 font-semibold text-xl">Solusi Inovatif</h2>
                        <p className="text-slate-600 text-[10px]">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus ducimus in odio quasi
                            tempora? Dolorum nobis molestias ut.
                        </p>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center px-12">
                    <Button
                        className="w-full h-[46px] font-bold text-xs"
                        onClick={() => router.push("/home", "forward")}
                    >
                        Lanjut Sekarang
                    </Button>
                </div>
            </IonContent>
        </IonPage>
    );
}

export default Onboarding;
