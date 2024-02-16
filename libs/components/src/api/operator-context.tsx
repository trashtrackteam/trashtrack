import { createContext } from "react";

export const OperatorContext = createContext({
    id: "",
    operator: null,
    role: null,
    setId: (id: string) => {},
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setOperator: (operator: any) => {},
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setRole: (role: any) => {},
});
