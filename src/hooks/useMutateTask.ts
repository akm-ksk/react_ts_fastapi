import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../app/hooks";
import {useMutation, useQueryClient} from "react-query";
import {Task} from "../types/types";
import axios from "axios";
import {resetEditedTask, toggleCsrfState} from "../slices/appSlice";

export const useMutateTask = () => {

    const history = useNavigate()
    const dispatch = useAppDispatch()
    const queryClient = useQueryClient()


    const createTaskMutation = useMutation(
        (task: Omit<Task, 'id'>) => axios.post<Task>(
            `${process.env.REACT_APP_API_URL}/todo`,
            task,
            {
                withCredentials: true,
            }
        ), {
            onSuccess: (res) => {

                const previousTodos = queryClient.getQueryData<Task[]>('tasks')

                if (previousTodos) {
                    // 新しいキャッシュとして登録
                    queryClient.setQueryData(
                        'tasks',
                        [...previousTodos, res.data]
                    )
                    dispatch(resetEditedTask())
                }
            },
            onError: (err: any) => {

                alert(`${err.response.data.detail}\n${err.messages}`)

                if (
                    err.response.data.detail === 'The JWT has expired' ||
                    err.response.data.detail === 'The CSRF token has expired.'
                ) {
                    dispatch(toggleCsrfState())
                    dispatch(resetEditedTask())
                    history("/")
                }
            },
        }
    )


    const updateTaskMutation = useMutation(
        (task: Task) => axios.put<Task>(
            `${process.env.REACT_APP_API_URL}/todo/${task.id}`,
            {
                title: task.title,
                description: task.description
            },
            {
                withCredentials: true
            },
        ),
        {
            // res : 処理の結果
            // variables : 引数の値
            onSuccess: (res, variables) => {

                const previousTodos = queryClient.getQueryData<Task[]>("tasks")

                if (previousTodos) {
                    queryClient.setQueryData<Task[]>(
                        "tasks",
                        previousTodos.map((task) => task.id === variables.id ? res.data : task)
                    )
                }
                dispatch(resetEditedTask())
            },
            onError: (err: any) => {

                alert(`${err.response.data.detail}\n${err.messages}`)

                if (
                    err.response.data.detail === 'The JWT has expired' ||
                    err.response.data.detail === 'The CSRF token has expired.'
                ) {
                    dispatch(toggleCsrfState())
                    dispatch(resetEditedTask())
                    history("/")
                }
            },
        }
    )


    const deleteTaskMutation = useMutation(
        (id: String) => axios.delete(
            `${process.env.REACT_APP_API_URL}/todo/${id}`,
            {
                withCredentials: true
            }
        ),
        {
            onSuccess: (res, variables) => {

                const previousTodos = queryClient.getQueryData<Task[]>("tasks")

                if (previousTodos) {
                    queryClient.setQueryData<Task[]>(
                        "tasks",
                        previousTodos.filter((task) => task.id !== variables)
                    )
                }
                dispatch(resetEditedTask())
            },
            onError: (err: any) => {

                alert(`${err.response.data.detail}\n${err.messages}`)

                if (
                    err.response.data.detail === 'The JWT has expired' ||
                    err.response.data.detail === 'The CSRF token has expired.'
                ) {
                    dispatch(toggleCsrfState())
                    dispatch(resetEditedTask())
                    history("/")
                }
            },
        }
    )

    return {createTaskMutation, updateTaskMutation, deleteTaskMutation}
}