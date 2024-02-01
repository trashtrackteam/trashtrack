import { IonPage, IonRouterOutlet } from "@ionic/react";
import { Redirect, Route } from "react-router-dom";

import ComplainIndex from "../pages/complain";
import ComplainDashboard from "../pages/complain/dashboard";
import ComplainFormPersonalDetails from "../pages/complain/form/personal-details";
import ComplainFormTempatSampah from "../pages/complain/form/tempat-sampah";
import ComplainFormLaporan from "../pages/complain/form/laporan";

const Complain: React.FC = () => {
    return (
        <IonPage>
            <IonRouterOutlet id="main" animated={false} mode="ios">
                <Route path="/complain/index" render={() => <ComplainIndex />} exact={true} />
                <Route path="/complain/dashboard" render={() => <ComplainDashboard />} exact={true} />
                <Route
                    path="/complain/form/personal-details"
                    render={() => <ComplainFormPersonalDetails />}
                    exact={true}
                />
                <Route path="/complain/form/tempat-sampah" render={() => <ComplainFormTempatSampah />} exact={true} />
                <Route
                    path="/complain/form/laporan/:tempat_sampah_id"
                    render={() => <ComplainFormLaporan />}
                    exact={true}
                />
                <Route path="/complain" render={() => <Redirect to="/complain/index" />} exact={true} />
            </IonRouterOutlet>
        </IonPage>
    );
};

export default Complain;
