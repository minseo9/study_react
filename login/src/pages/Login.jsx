import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import axios from "axios";

const Login = () => {
    const [isLogin, setIsLogin] = useState(false);
    const loginIdRef = useRef();
    const loginPwdRef = useRef();
    const nav = useNavigate();

    const url = import.meta.env.VITE_API_URL;

    const clickLogin = async () => {
        try {
            const response = await axios.get(url);
            const user = response.data;

            const login = user.some(
                (u) =>
                    String(u.id) === String(loginIdRef.current.value) &&
                    String(u.password) === String(loginPwdRef.current.value)
            );

            console.log(login);

            if (login) {
                nav("/home", {
                    state: { id: loginIdRef.current.value },
                });
            } else {
                loginIdRef.current.value = "";
                loginPwdRef.current.value = "";
                setIsLogin(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="login-container">
            <h2>로그인</h2>
            <form
                className="login-form"
                onSubmit={(e) => {
                    e.preventDefault();
                    clickLogin();
                }}
            >
                <input type="text" placeholder="아이디" ref={loginIdRef} />
                <input
                    type="password"
                    placeholder="비밀번호"
                    ref={loginPwdRef}
                />
                {isLogin && (
                    <span className="login-error">
                        아이디 혹은 비밀번호가 잘못됐습니다.
                    </span>
                )}
                <button
                    type="submit"
                    className="login-button"
                    onClick={clickLogin}
                >
                    로그인
                </button>
            </form>
            <div className="etc-container">
                <Link to={"/join"} className="join-button">
                    회원가입
                </Link>
            </div>
        </div>
    );
};

export default Login;
