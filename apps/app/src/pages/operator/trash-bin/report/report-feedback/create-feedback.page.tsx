import { IonContent, IonPage } from "@ionic/react";
import { Card, CardContent, Button, Separator, CreateFeedbackForm } from "@trashtrack/ui";
import { useHistory, useParams } from "react-router-dom";
import { useGetFeedbacks } from "./get-feedbacks.query";

export function CreateFeedbackPage() {
    const { report_id } = useParams<{ report_id: string }>();

    return (
        <IonPage>
            <IonContent className="ion-padding" fullscreen>
                <div className="pt-12">
                    <h1 className="font-bold text-left text-xl">TrashTrack</h1>
                    <p className="text-xs text-left text-slate-600">Create Feedback</p>
                </div>
                <div className="flex flex-col pt-8 gap-2">
                    <CreateFeedbackForm reportId={report_id} />
                </div>
            </IonContent>
        </IonPage>
    );
}

export default CreateFeedbackPage;
