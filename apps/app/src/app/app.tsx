import { buttonVariants } from "@trashtrack/ui";
import { cn } from "@trashtrack/utils";

export function App() {
    return (
        <div className="dark flex justify-center items-center h-screen">
            <div className="flex flex-col">
                <h1 className="text-center">TrashTrack</h1>
                <div className="pt-4">
                    <a
                        href="#contact"
                        className={cn(buttonVariants({ variant: "secondary", size: "sm" }), "px-4 mt-8")}
                    >
                        Continue
                    </a>
                </div>
            </div>
        </div>
    );
}

export default App;
