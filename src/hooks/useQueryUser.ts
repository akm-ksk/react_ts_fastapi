import {UserInfo} from "../types/types";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useQuery} from "react-query";

export const useQueryUser = () => {

    const history = useNavigate()

    const getCurrentUser = async () => {

        const {data} = await axios.get<UserInfo>(
            `${process.env.REACT_APP_API_URL}/user`,
            {withCredentials: true}
        )
        
        return data
    }

    return useQuery({
        queryKey: "user",
        queryFn: getCurrentUser,
        staleTime: Infinity,
        onError: () => history("/"),
    })
}