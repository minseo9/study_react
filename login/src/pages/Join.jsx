import "../styles/Join.css";
import InputField from "../components/InputField";
import InputSelect from "../components/InputSelect";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

/*
    유효성 검사
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
    const [checkPwd, setCheckPwd] = useState("");
    const nav = useNavigate();
    const url = import.meta.env.VITE_API_URL;
    const birthdayErrorText = useRef("");

    // html input 값 저장
    const idRef = useRef();
    const pwdRef = useRef();
    const checkPwdRef = useRef();
    const phoneRef = useRef();
    const emailRef = useRef();

    // 유효성 검사 결과
    const isInputId = useRef(false);
    const isInputPwd = useRef(false);
    const isInputCheckPwd = useRef(false);
    const isInputPhone = useRef(false);
    const isInputEmail = useRef(false);
    const isInputBirthday = useRef(false);

    const [idError, setIdError] = useState(false);
    const [pwdError, setPwdError] = useState(false);
    const [checkPwdError, setCheckPwdError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [birthdayError, setBirthdayError] = useState(false);

    const currentYear = new Date().getFullYear();
    const birthday_year = Array.from(
        { length: 100 },
        (_, i) => currentYear - i
    );
    const birthday_month = Array.from({ length: 12 }, (_, i) => i + 1);
    const birthday_date = Array.from({ length: 31 }, (_, i) => i + 1);

    // user 상태 변경
    const changeInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        if (["year", "month", "date"].includes(name)) {
            setUser({ ...user, birthday: { ...user.birthday, [name]: value } });
        } else {
            setUser({ ...user, [name]: value });
        }
    };

    // input 스타일 변경(빨강 테두리)
    const changeInputStyle = (inputRef, result) => {
        inputRef.current.style.setProperty(
            "border",
            result ? "1px solid rgb(163, 163, 163)" : "1px solid red"
        );
    };

    const checkedId = (value) => {
        const isREGEXId = value.trim() !== "" && idREGEX.test(value);
        if (!isREGEXId) {
            changeInputStyle(idRef, false);
            isInputId.current = false;
            setIdError(true);
        } else {
            changeInputStyle(idRef, true);
            isInputId.current = true;
            setIdError(false);
        }
    };

    const checkedPwd = (value) => {
        const isREGEXPwd = value.trim() !== "" && pwREGEX.test(value);
        if (!isREGEXPwd) {
            changeInputStyle(pwdRef, false);
            isInputPwd.current = false;
            setPwdError(true);
        } else {
            changeInputStyle(pwdRef, true);
            isInputPwd.current = true;
            setPwdError(false);
        }
    };

    const checkedPwdMatch = (value) => {
        if (value !== user.password) {
            changeInputStyle(checkPwdRef, false);
            isInputCheckPwd.current = false;
            setCheckPwdError(true);
        } else {
            changeInputStyle(checkPwdRef, true);
            isInputCheckPwd.current = true;
            setCheckPwdError(false);
        }
    };

    const checkedPhone = (value) => {
        const isREGEXPhone = value.trim() !== "" && phoneREGEX.test(value);
        if (!isREGEXPhone) {
            changeInputStyle(phoneRef, false);
            isInputPhone.current = false;
            setPhoneError(true);
        } else {
            changeInputStyle(phoneRef, true);
            isInputPhone.current = true;
            setPhoneError(false);
        }
    };

    const checkedEmail = (value) => {
        const isREGEXEmail = value.trim() !== "" && emailREGEX.test(value);
        if (!isREGEXEmail) {
            changeInputStyle(emailRef, false);
            isInputEmail.current = false;
            setEmailError(true);
        } else {
            changeInputStyle(emailRef, true);
            isInputEmail.current = true;
            setEmailError(false);
        }
    };

    const checkedBirthday = (year, month, date) => {
        const today = new Date();
        const inputDate = new Date(`${year}-${month}-${date}`);

        const isREGEXBirthday = year !== "" && month !== "" && date !== "";
        const isFutureDate = inputDate > today;
        const isRealDate =
            inputDate.getFullYear() === Number(year) &&
            inputDate.getMonth() + 1 === Number(month) &&
            inputDate.getDate() === Number(date);

        if (!isREGEXBirthday || isFutureDate || !isRealDate) {
            isInputBirthday.current = false;
            setBirthdayError(true);
            birthdayErrorText.current = !isREGEXBirthday
                ? "생년월일을 모두 선택해주세요."
                : "생년월일을 확인해주세요.";
        } else {
            isInputBirthday.current = true;
            setBirthdayError(false);
        }
    };

    // 회원 정보 저장
    const joinUser = async (e) => {
        e.preventDefault();

        if (
            isInputId.current &&
            isInputPwd.current &&
            isInputCheckPwd.current &&
            isInputPhone.current &&
            isInputEmail.current &&
            isInputBirthday.current
        ) {
            try {
                const response = await axios.post(url, user);
                console.log(response.data);
                nav("/", { replace: true });
            } catch (error) {
                console.log(error);
            }
        } else {
            checkedId(user.id);
            checkedPwd(user.password);
            checkedPwdMatch(checkPwd);
            checkedPhone(user.phone);
            checkedEmail(user.email);
            checkedBirthday(
                user.birthday.year,
                user.birthday.month,
                user.birthday.date
            );
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
                    onChange={(e) => {
                        changeInput(e);
                        checkedId(e.target.value);
                    }}
                    ref={idRef}
                />
                {idError && (
                    <span className="error-text error-id">
                        아이디 형식이 올바르지 않습니다.
                    </span>
                )}
                <InputField
                    label="비밀번호"
                    name="password"
                    id="password"
                    type="password"
                    placeholder="비밀번호 입력"
                    value={user.password}
                    onChange={(e) => {
                        changeInput(e);
                        checkedPwd(e.target.value);
                    }}
                    ref={pwdRef}
                />
                {pwdError && (
                    <span className="error-text error-password">
                        비밀번호 형식이 올바르지 않습니다.
                    </span>
                )}
                <InputField
                    label="비밀번호 확인"
                    id="checkPassword"
                    name="checkPassword"
                    type="password"
                    placeholder="비밀번호 확인"
                    ref={checkPwdRef}
                    value={checkPwd}
                    onChange={(e) => {
                        setCheckPwd(e.target.value);
                        checkedPwdMatch(e.target.value);
                    }}
                />
                {checkPwdError && (
                    <span className="error-text error-checkPassword">
                        비밀번호가 일치하지 않습니다.
                    </span>
                )}
                <InputField
                    label="전화번호"
                    name="phone"
                    id="phone"
                    type="number"
                    placeholder="휴대폰 번호 입력(' - ' 제외 11자리)"
                    value={user.phone}
                    onChange={(e) => {
                        changeInput(e);
                        checkedPhone(e.target.value);
                    }}
                    ref={phoneRef}
                />
                {phoneError && (
                    <span className="error-text error-phone">
                        전화번호 형식이 올바르지 않습니다.
                    </span>
                )}
                <InputField
                    label="이메일"
                    name="email"
                    id="email"
                    placeholder="이메일 주소 입력"
                    value={user.email}
                    onChange={(e) => {
                        changeInput(e);
                        checkedEmail(e.target.value);
                    }}
                    ref={emailRef}
                />
                {emailError && (
                    <span className="error-text error-email">
                        이메일 형식이 올바르지 않습니다.
                    </span>
                )}
                <div className="input-birthday">
                    <p>생일</p>
                    <div className="birthday-select">
                        <InputSelect
                            name="year"
                            id="selectBirthdayYear"
                            className="select-year"
                            value={user.birthday.year}
                            onChange={(e) => {
                                changeInput(e);
                                checkedBirthday(
                                    e.target.value,
                                    user.birthday.month,
                                    user.birthday.date
                                );
                            }}
                            text="년도"
                            optionValue={birthday_year}
                        />
                        <InputSelect
                            name="month"
                            id="selectBirthdayName"
                            className="select-month"
                            value={user.birthday.month}
                            onChange={(e) => {
                                changeInput(e);
                                checkedBirthday(
                                    user.birthday.year,
                                    e.target.value,
                                    user.birthday.date
                                );
                            }}
                            text="월"
                            optionValue={birthday_month}
                        />
                        <InputSelect
                            name="date"
                            id="selectBirthdateDay"
                            className="select-date"
                            value={user.birthday.date}
                            onChange={(e) => {
                                changeInput(e);
                                checkedBirthday(
                                    user.birthday.year,
                                    user.birthday.month,
                                    e.target.value
                                );
                            }}
                            text="일"
                            optionValue={birthday_date}
                        />
                    </div>
                </div>
                {birthdayError && (
                    <span className="error-text error-birthday">
                        {birthdayErrorText.current}
                    </span>
                )}
            </div>
            <button className="join-button" onClick={joinUser}>
                회원가입
            </button>
        </div>
    );
};

export default Join;
