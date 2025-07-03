import "../styles/Join.css";
import InputField from "../components/InputField";
import InputSelect from "../components/InputSelect";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

/*
    1. 유효성 검사
    - 아이디: 영문 소문자만, 8~16자 이상, 특수기호(-, _)만 사용, 중복확인버튼
    - 비밀번호: 영문 대소문자만, 8~16자 이상, 특수기호(!, @, -, _) 사용....
    - 전화번호: 11자리가 맞는지, 전화번호가 맞는지?
    - 이메일: 이메일 주소 형식이 맞는지
    - 생일: 선택을 했는지
*/
const idREGEX = /^[a-z0-9][a-z0-9_-]{7,15}$/;
const pwREGEX = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@\-_])[A-Za-z\d!@\-_]{8,16}$/;
const phoneREGEX = /^01[016789][0-9]{7,8}$/;
const emailREGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Join = () => {
    const [user, setUser] = useState({
        id: "",
        password: "",
        phone: "",
        email: "",
        birthday: { year: "", month: "", date: "" },
        profile: "",
    });
    const nav = useNavigate();
    const url = import.meta.env.REACT_APP_API_URL;

    const currentYear = new Date().getFullYear();
    const birthday_year = Array.from(
        { length: 100 },
        (_, i) => currentYear - i
    );
    const birthday_month = Array.from({ length: 12 }, (_, i) => i + 1);
    const birthday_date = Array.from({ length: 31 }, (_, i) => i + 1);

    const changeInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        if (["year", "month", "date"].includes(name)) {
            setUser({ ...user, birthday: { ...user.birthday, [name]: value } });
        } else {
            setUser({ ...user, [name]: value });
        }
    };

    const checkInput = (event) => {
        event.preventDefault();

        const checkId = user.id.trim() !== "" && idREGEX.test(user.id);
        const checkPw =
            user.password.trim() !== "" && pwREGEX.test(user.password);
        const checkPhone =
            user.phone.trim() !== "" && phoneREGEX.test(user.phone);
        const checkEmail =
            user.email.trim() !== "" && emailREGEX.test(user.email);
        const checkBirthday =
            user.birthday.year !== "" &&
            user.birthday.month !== "" &&
            user.birthday.date !== "";

        console.log(checkBirthday);

        if (checkId && checkPw && checkPhone && checkEmail && checkBirthday)
            joinUser();
        else console.log("ㄴㄴ");
    };

    const joinUser = async () => {
        try {
            const response = await axios.post(url, user);
            console.log(response.data);
            nav("/", { replace: true });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="join-container">
            <h3>회원가입</h3>
            <div className="join-form">
                <InputField
                    className="profile-image"
                    label="프로필사진"
                    type="file"
                    name="profile"
                    id="image"
                    onChange={(e) => {
                        setUser({ ...user, profile: e.target.files[0] });
                    }}
                />
                <InputField
                    label="아이디"
                    name="id"
                    id="id"
                    placeholder="아이디 입력(8~16자 입력)"
                    value={user.id}
                    onChange={changeInput}
                />
                <InputField
                    label="비밀번호"
                    name="password"
                    id="password"
                    type="password"
                    placeholder="비밀번호 입력"
                    value={user.password}
                    onChange={changeInput}
                />
                <div></div>
                <InputField
                    label="비밀번호 확인"
                    id="checkPassword"
                    type="password"
                    placeholder="비밀번호 확인"
                />
                <InputField
                    label="전화번호"
                    name="phone"
                    id="phone"
                    type="number"
                    placeholder="휴대폰 번호 입력(' - ' 제외 11자리)"
                    value={user.phone}
                    onChange={changeInput}
                />
                <InputField
                    label="이메일"
                    name="email"
                    id="email"
                    placeholder="이메일 주소 입력"
                    value={user.email}
                    onChange={changeInput}
                />
                <div className="input-birthday">
                    <p>생일</p>
                    <div className="birthday-select">
                        <InputSelect
                            name="year"
                            id="selectBirthdayYear"
                            className="select-year"
                            value={user.birthday.year}
                            onChange={changeInput}
                            text="년도"
                            optionValue={birthday_year}
                        />
                        <InputSelect
                            name="month"
                            id="selectBirthdayName"
                            className="select-month"
                            value={user.birthday.month}
                            onChange={changeInput}
                            text="월"
                            optionValue={birthday_month}
                        />
                        <InputSelect
                            name="date"
                            id="selectBirthdateDay"
                            className="select-date"
                            value={user.birthday.date}
                            onChange={changeInput}
                            text="일"
                            optionValue={birthday_date}
                        />
                    </div>
                </div>
            </div>
            <button className="join-button" onClick={checkInput}>
                회원가입
            </button>
        </div>
    );
};

export default Join;
