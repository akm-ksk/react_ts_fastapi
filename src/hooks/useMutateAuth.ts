import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../app/hooks";
import {useMutation} from "react-query";
import {User} from "../types/types";
import axios from "axios";
import {resetEditedTask, toggleCsrfState} from "../slices/appSlice";

export const useMutateAuth = () => {
    const history = useNavigate()
    const dispatch = useAppDispatch()

    const loginMutation = useMutation(
        async (user: User) => await axios.post(
            `${process.env.REACT_APP_API_URL}/login`,
            user, {
                withCredentials: true,
            }),
        {
            onSuccess: () => {
                history('/todo')
            },
            onError: (err: any) => {
                alert(`${err.response.data.detail}\n${err.message}`)
                if (err.response.data.detail === 'The CSRF token has expired.') {
                    dispatch(toggleCsrfState())
                }
            }
        }
    )

    const registerMutation = useMutation(
        async (user: User) => await axios.post(`${process.env.REACT_APP_API_URL}/register`, user),
        {
            onError: (err: any) => {
                alert(`${err.response.data.detail}\n${err.message}`)
                if (err.response.data.detail === 'The CSRF token has expired.') {
                    dispatch(toggleCsrfState())
                }
            }
        }
    )

    const logoutMutation = useMutation(
        async () => await axios.post(`${process.env.REACT_APP_API_URL}/logout`,
            {},
            {
                withCredentials: true,
            }
        ),
        {
            onSuccess: () => {
                history('/')
            },
            onError: (err: any) => {
                alert(`${err.response.data.detail}\n${err.message}`)
                if (err.response.data.detail === 'The CSRF token has expired.') {
                    dispatch(toggleCsrfState())
                    dispatch(resetEditedTask())
                    history('/')
                }
            },
        }
    )

    return {loginMutation, registerMutation, logoutMutation}
}