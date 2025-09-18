import { useQuery } from "@tanstack/react-query";
import { loginAction } from "../actions/login.action";


export const useAuthLogin = (email: string, password: string) => {
    const { data, isError, isLoading } = useQuery({
        queryKey: ['login', email, password],
        queryFn: () => loginAction(email, password),
        retry: false,
    });

    return {
        data,
        isError,
        isLoading       
    }
}