import React, {FC, memo} from "react";
import {Task} from "../types/types";
import {useAppDispatch} from "../app/hooks";
import {useMutateTask} from "../hooks/useMutateTask";
import {PencilIcon, TrashIcon} from "@heroicons/react/24/outline";
import {setEditedTask} from "../slices/appSlice";

const TaskItemMemo: FC<Task & {
    setId: React.Dispatch<React.SetStateAction<string>>
}> = (props) => {

    const {id, title, description, setId} = props

    const dispatch = useAppDispatch()
    const {deleteTaskMutation} = useMutateTask()

    return (
        <li>
            <span className="font-bold cursor-pointer" onClick={() => setId(id)}>{title}</span>
            <div className="flex float-right ml-20">
                <PencilIcon
                    className="h-5 w-5 mx-1 text-blue-500 cursor-pointer"
                    onClick={() => {
                        dispatch(
                            setEditedTask({
                                id: id,
                                title: title,
                                description: description,
                            })
                        )
                    }}
                />
                <TrashIcon
                    className="h-5 w-5 text-blue-500 cursor-pointer"
                    onClick={() => {
                        deleteTaskMutation.mutate(id)
                    }}
                />
            </div>
        </li>
    )
}

export const TaskItem = memo(TaskItemMemo)
