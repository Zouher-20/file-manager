import { ReactNode } from "react";

interface TableCol {
    key : string;
    label ?: string;
    formatter?: (val : unknown) => string,
}