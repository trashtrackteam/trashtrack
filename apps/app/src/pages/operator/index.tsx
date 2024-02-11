import { OperatorContext } from "@trashtrack/ui";
import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

export function OperatorIndex() {
    const history = useHistory();
    const operator = useContext(OperatorContext);

    useEffect(() => {
        if (operator.operator) {
            history.push("/operator/dashboard");
        } else {
            history.push("/operator/form/login");
        }
    }, [operator, history]);

    return <div></div>;
}

export default OperatorIndex;
