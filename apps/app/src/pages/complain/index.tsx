import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { getUserNIK } from "@trashtrack/utils";

export function ComplainIndex() {
    const history = useHistory();

    useEffect(() => {
        async function getNik() {
            return await getUserNIK();
        }

        const fetchNik = async () => {
            const nik = await getNik();

            if (nik) {
                history.push("/complain/tabs/dashboard");
            } else {
                history.push("/complain/form/personal-details");
            }
        };

        fetchNik();
    }, [history]);

    return <div></div>;
}

export default ComplainIndex;
