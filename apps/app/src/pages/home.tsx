import { IonPage, useIonRouter } from "@ionic/react";
import { buttonVariants } from "@trashtrack/ui";
import { cn, setIsUserOnboarded } from "@trashtrack/utils";

export function Home() {
    const router = useIonRouter();

    const handleButtonClick = async () => {
        setIsUserOnboarded(false);
        router.push("/onboard");
    };

    return (
        <IonPage>
            <div className="dark flex justify-center items-center h-screen">
                <div className="flex flex-col">
                    <h1 className="text-center">TrashTrack</h1>
                    <div className="pt-4">
                        <button
                            onClick={handleButtonClick}
                            className={cn(buttonVariants({ variant: "secondary", size: "sm" }), "px-4 mt-8")}
                        >
                            Test Onboarding
                        </button>
                    </div>
                </div>
            </div>
        </IonPage>
    );
}

export default Home;
