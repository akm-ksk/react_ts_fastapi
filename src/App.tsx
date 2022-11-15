import React, {useEffect} from 'react';
import axios from "axios";
import {CsrfToken} from "./types/types";
import {useAppSelector} from "./app/hooks";
import {selectCsrfState} from "./slices/appSlice";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Auth} from "./components/Auth";
import {Todo} from "./components/Todo";


function App() {

    // Reduxのステートを取得する
    const csrf = useAppSelector(selectCsrfState)

    useEffect(() => {

        const getCsrfToken = async () => {

            // エンドポイントに接続してcsrf_tokenを取得する
            const res = await axios.get<CsrfToken>(
                `${process.env.REACT_APP_API_URL}/csrftoken`
            )

            // axiosのヘッダーにcsrf_tokenをcommonで設定する
            axios.defaults.headers.common['X-CSRF-Token'] = res.data.csrf_token
            // console.log(res.data.csrf_token)
        }

        getCsrfToken()
    }, [csrf])

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Auth/>}/>
                <Route path="/todo" element={<Todo/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
