import { createContext } from "react";

export const OperatorContext = createContext({
    operator: null,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setOperator: (operator: any) => {},
});
