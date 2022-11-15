import {useNavigate} from "react-router-dom";
import {useQueryClient} from "react-query";
import {FormEvent, useState} from "react";
import {useMutateAuth} from "./useMutateAuth";

export const useProcessAuth = () => {

    const {loginMutation, registerMutation, logoutMutation} = useMutateAuth()

    const history = useNavigate()
    const queryClient = useQueryClient()

    const [email, setEmail] = useState("")
    const [pw, setPw] = useState("")
    const [isLogin, setIsLogin] = useState(true)

    const processAuth = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (isLogin) {
            loginMutation.mutate({
                email: email,
                password: pw,
            })
        } else {
            await registerMutation.mutateAsync({
                email: email,
                password: pw,
            })
                .then(() => loginMutation.mutate({
                        email: email,
                        password: pw,
                    })
                ).catch(() => {
                    setEmail("")
                    setPw("")
                })
        }
    }

    const logout = async () => {
        await logoutMutation.mutateAsync()
        queryClient.removeQueries('tasks')
        queryClient.removeQueries('user')
        queryClient.removeQueries('single')
        history("/")
    }

    return {
        email,
        setEmail,
        pw,
        setPw,
        isLogin,
        setIsLogin,
        processAuth,
        registerMutation,
        loginMutation,
        logout,
    }
}
