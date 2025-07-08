import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Home = () => {
    const [userList, setUserList] = useState();
    const loginId = useLocation().state.id;
    const url = import.meta.env.VITE_API_URL;

    useEffect(() => {
        (async () => {
            const response = await axios.get(url);
            const result = response.data.find(
                (d) => String(d.id) === String(loginId)
            );
            setUserList(result);
        })();
    }, []);

    return (
        <div>
            {userList && (
                <div className="user-profile">
                    <div>아이디: {userList.id}</div>
                    <div>전화번호: {userList.password}</div>
                    <div>이메일: {userList.email}</div>
                    <div>
                        생일: {userList.birthday.year}년{" "}
                        {userList.birthday.month}월 {userList.birthday.date}일
                    </div>
                    <div></div>
                </div>
            )}
        </div>
    );
};

export default Home;
