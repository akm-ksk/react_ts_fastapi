import {useAppSelector} from "../app/hooks";
import {selectTask} from "../slices/appSlice";
import {useMutateTask} from "./useMutateTask";
import {FormEvent} from "react";

export const useProcesTask = () => {

    const editedTask = useAppSelector(selectTask)
    const {createTaskMutation, updateTaskMutation} = useMutateTask()

    const processTask = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // 新規作成
        if (editedTask.id === "") {
            createTaskMutation.mutate(
                {
                    title: editedTask.title,
                    description: editedTask.description,
                }
            )
        }
        // 編集モード
        else {
            updateTaskMutation.mutate(editedTask)
        }

    }

    return {processTask}
}