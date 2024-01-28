import { IonPage, IonContent, useIonRouter } from "@ionic/react";
import { Button, Carousel, CarouselContent, CarouselItem, type CarouselApi, CarouselDot } from "@trashtrack/ui";
import IMAGES from "../assets";
import { useCallback, useEffect, useState } from "react";

export function Onboarding() {
    const router = useIonRouter();
    const [api, setApi] = useState<CarouselApi>();
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    const scrollTo = useCallback((index: number) => api && api.scrollTo(index), [api]);

    const onSelect = useCallback(() => {
        if (!api) return;
        setSelectedIndex(api.selectedScrollSnap());
    }, [api]);

    useEffect(() => {
        if (!api) return;
        onSelect();
        setScrollSnaps(api.scrollSnapList());
        api.on("select", onSelect);
    }, [api, setScrollSnaps, onSelect]);

    return (
        <IonPage>
            <IonContent className="onboarding ion-padding" fullscreen>
                <div className="pt-12 pb-12">
                    <h1 className="font-bold text-center text-xl">TrashTrack</h1>
                </div>
                <Carousel
                    setApi={setApi}
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
                                <div className="text-center pt-7 px-11">
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
                                <div className="text-center pt-7 px-11">
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

                <div className="flex justify-center items-center pt-8 pb-40">
                    <div className="flex justify-center items-center gap-4">
                        {scrollSnaps.map((_, i) => (
                            <CarouselDot key={i} isSelected={i === selectedIndex} onClick={() => scrollTo(i)} />
                        ))}
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
