import axios from "axios";
import {Task} from "../types/types";
import {useQuery} from "react-query";

export const useQueryTasks = () => {

    const getTasks = async () => {

        const {data} = await axios.get<Task[]>(
            `${process.env.REACT_APP_API_URL}/todo`,
            {withCredentials: true}
        )
        return data

    }

    // RESTAPIからGETしたデータをキャッシュに格納
    return useQuery<Task[], Error>({
        queryKey: "tasks",
        queryFn: getTasks,
        // 取得したデータをどのくらいの期間最新とみなすか
        staleTime: Infinity,
    })
}

