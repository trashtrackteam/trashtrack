import { IonPage, IonContent, useIonRouter } from "@ionic/react";
import { Button, Carousel, CarouselContent, CarouselItem } from "@trashtrack/ui";
import IMAGES from "../assets";

export function Onboarding() {
    const router = useIonRouter();

    return (
        <IonPage>
            <IonContent className="onboarding ion-padding" fullscreen>
                <div className="pt-12 pb-12">
                    <h1 className="font-bold text-center text-xl">TrashTrack</h1>
                </div>
                <Carousel
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
                                <div className="text-center pt-7 pb-40 px-11">
                                    <h2 className="pb-3 font-semibold text-xl">Waste Analytics</h2>
                                    <p className="text-slate-600 text-[10px]">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus ducimus in
                                        odio quasi tempora? Dolorum nobis molestias ut.
                                    </p>
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
                                <div className="text-center pt-7 pb-40 px-11">
                                    <h2 className="pb-3 font-semibold text-xl">Waste Management</h2>
                                    <p className="text-slate-600 text-[10px]">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus ducimus in
                                        odio quasi tempora? Dolorum nobis molestias ut.
                                    </p>
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
                                <div className="text-center pt-7 pb-40 px-11">
                                    <h2 className="pb-3 font-semibold text-xl">Waste Monitoring</h2>
                                    <p className="text-slate-600 text-[10px]">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus ducimus in
                                        odio quasi tempora? Dolorum nobis molestias ut.
                                    </p>
                                </div>
                            </div>
                        </CarouselItem>
                    </CarouselContent>
                </Carousel>
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
