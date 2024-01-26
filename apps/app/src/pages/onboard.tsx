import { cn, getIsUserOnboarded, setIsUserOnboarded } from "@trashtrack/utils";
import { IonContent, IonPage, useIonRouter, IonicSlides } from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useEffect, useState } from "react";

import "swiper/css";
import "swiper/css/pagination";
import "@ionic/react/css/ionic-swiper.css";
import { buttonVariants } from "@trashtrack/ui";

export function Onboard() {
    const router = useIonRouter();
    const [shouldReload, setShouldReload] = useState(false);

    useEffect(() => {
        const fetchDataAndSetState = async () => {
            const result = await getIsUserOnboarded();

            if (result) {
                router.push("/home");
            } else {
                setIsUserOnboarded(false);
                setShouldReload(true);
            }
        };

        fetchDataAndSetState();
    }, [router]);

    const handleButtonClick = () => {
        setIsUserOnboarded(true).then(() => {
            router.push("/home");
        });
    };

    const swiperKey = shouldReload ? Date.now().toString() : "swiper-key";

    return (
        <IonPage>
            <IonContent>
                <Swiper key={swiperKey} modules={[Pagination, IonicSlides]} pagination={true} initialSlide={0}>
                    <SwiperSlide>
                        <div className="flex items-center justify-center h-screen px-4">
                            <div className="text-center">
                                <h1>TrashTrack</h1>
                                <p className="text-xs">
                                    Welcome to TrashTrack! We're excited to have you on board. Let's get started.
                                </p>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="flex items-center justify-center h-screen px-4">
                            <div className="text-center">
                                <h1>Slide 2</h1>
                                <p className="text-xs">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus, quam qui!
                                    Totam mollitia perspiciatis aperiam! Hic, vel provident.
                                </p>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="flex items-center justify-center h-screen px-4">
                            <div className="text-center">
                                <h1>Slide 3</h1>
                                <p className="text-xs">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus, quam qui!
                                    Totam mollitia perspiciatis aperiam! Hic, vel provident.
                                </p>
                                <div className="pt-4">
                                    <button
                                        onClick={handleButtonClick}
                                        className={cn(
                                            buttonVariants({ variant: "secondary", size: "sm" }),
                                            "px-4 mt-8"
                                        )}
                                    >
                                        Continue
                                    </button>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </IonContent>
        </IonPage>
    );
}

export default Onboard;
