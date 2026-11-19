import { useHttpContext } from "./HttpProvider";

export function useHttp() {
    return useHttpContext();
}