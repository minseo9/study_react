import "../styles/Login.css";
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div className="login-container">
            <h2>로그인</h2>
            <form className="login-form">
                <input type="text" placeholder="아이디" />
                <input type="password" placeholder="비밀번호" />
            </form>
            <button type="submit" className="login-button">
                로그인
            </button>
            <div className="etc-container">
                <Link to={"/join"} className="join-button">
                    회원가입
                </Link>
            </div>
        </div>
    );
};

export default Login;
