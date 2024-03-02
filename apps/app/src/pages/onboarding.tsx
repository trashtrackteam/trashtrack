import { IonPage, IonContent } from "@ionic/react";
import { Button, Carousel, CarouselContent, CarouselItem } from "@trashtrack/ui";
import { useHistory } from "react-router-dom";
import Autoplay from "embla-carousel-autoplay";
import { useTranslation } from "react-i18next";
import IMAGES from "../assets";

export function Onboarding() {
    const history = useHistory();
    const { t } = useTranslation();

    return (
        <IonPage>
            <IonContent className="onboarding ion-padding" fullscreen>
                <div className="pt-12 pb-12">
                    <h1 className="font-bold text-center text-xl">TrashTrack</h1>
                </div>
                <Carousel
                    plugins={[
                        Autoplay({
                            delay: 2000,
                        }),
                    ]}
                    opts={{
                        loop: true,
                    }}
                >
                    <CarouselContent>
                        <CarouselItem>
                            <div className="flex flex-col justify-center items-center">
                                <img
                                    className="w-[154px] h-[152px]"
                                    src={IMAGES.onboarding_icon_one}
                                    alt="Onboarding Icon"
                                />
                                <div className="text-center pt-7 px-11">
                                    <h2 className="pb-3 font-semibold text-xl">{t("onboarding.first.title")}</h2>
                                    <p className="text-slate-600 text-[10px]">{t("onboarding.first.subtitle")}</p>
                                </div>
                            </div>
                        </CarouselItem>
                        <CarouselItem>
                            <div className="flex flex-col justify-center items-center">
                                <img
                                    className="w-[154px] h-[152px]"
                                    src={IMAGES.onboarding_icon_two}
                                    alt="Onboarding Icon"
                                />
                                <div className="text-center pt-7 px-11">
                                    <h2 className="pb-3 font-semibold text-xl">{t("onboarding.second.title")}</h2>
                                    <p className="text-slate-600 text-[10px]">{t("onboarding.second.subtitle")}</p>
                                </div>
                            </div>
                        </CarouselItem>
                        <CarouselItem>
                            <div className="flex flex-col justify-center items-center">
                                <img
                                    className="w-[154px] h-[152px]"
                                    src={IMAGES.onboarding_icon_three}
                                    alt="Onboarding Icon"
                                />
                                <div className="text-center pt-7 px-11">
                                    <h2 className="pb-3 font-semibold text-xl">{t("onboarding.third.title")}</h2>
                                    <p className="text-slate-600 text-[10px]">{t("onboarding.third.subtitle")}</p>
                                </div>
                            </div>
                        </CarouselItem>
                    </CarouselContent>
                </Carousel>

                <div className="flex flex-col justify-center items-center px-12">
                    <Button className="w-full h-[46px] font-bold text-xs" onClick={() => history.push("/tabs/home")}>
                        {t("onboarding.continue")}
                    </Button>
                </div>
            </IonContent>
        </IonPage>
    );
}

export default Onboarding;
