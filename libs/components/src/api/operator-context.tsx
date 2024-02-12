import { createContext } from "react";

export const OperatorContext = createContext({
    operator: null,
    role: null,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setOperator: (operator: any) => {},
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setRole: (role: any) => {},
});
