import { useEffect, useRef, useState } from "react";
import { useStore } from "../hooks/useStore";

const errorState = {
  emailError: "",
  passwordError: "",
  repeatPasswordError: "",
};

export const DefaultForm = ({ sendFormData }) => {
  const { getState, updateState } = useStore();
  const [error, setError] = useState(errorState);
  const { email, password, repeatPassword } = getState();
  const submitButtonRef = useRef(null);
  const onSubmit = (event) => {
    event.preventDefault();
    if (isFormValid()) {
      sendFormData(getState());
    }
  };
  const onChange = ({ target }) => updateState(target.name, target.value);

  const emailChecking = ({ target }) => {
    onChange({ target });
    const newError = !/.+@.+\..+/i.test(target.value)
      ? "Некорректный email, не хватает @ или ."
      : "";
    setError((prevError) => ({ ...prevError, emailError: newError }));
  };

  const passwordChecking = ({ target }) => {
    onChange({ target });
    const newError =
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/.test(
        target.value
      )
        ? "Необходимо указать более 8 символов, из них хотя бы 1 строчную и 1 заглавную букву, цифру и специальный символ"
        : target.value.length > 20
        ? "Необходимо менее 20 символов"
        : "";
    const secondError =
      repeatPassword !== "" && repeatPassword !== target.value
        ? "повторенный пароль не совпадает с первоначальным вводом"
        : "";
    setError((prevError) => ({ ...prevError, passwordError: newError }));
    setError((prevError) => ({
      ...prevError,
      repeatPasswordError: secondError,
    }));
  };

  const repeatPasswordChecking = ({ target }) => {
    onChange({ target });
    const newError =
      target.value !== password
        ? "Введеный пароль не соответствует введенному ранее"
        : "";
    setError((prevError) => ({ ...prevError, repeatPasswordError: newError }));
  };

  const isFormValid = () => {
    return (
      Object.values(error).every((el) => el === "") &&
      email &&
      password &&
      repeatPassword
    );
  };

  useEffect(() => {
    if (isFormValid() && submitButtonRef.current) {
      submitButtonRef.current.focus();
    }
  }, [error]);

  return (
    <div className="container">
      <h2>Форма регистрации</h2>
      <form onSubmit={onSubmit} className="form">
        {error.emailError && (
          <div className="errorLabel"> {error.emailError}</div>
        )}
        <label htmlFor="email">
          Email:
          <input
            type="text"
            name="email"
            placeholder="email"
            value={email}
            onChange={emailChecking}
          />
        </label>
        {error.passwordError && (
          <div className="errorLabel"> {error.passwordError}</div>
        )}
        <label htmlFor="password">
          Введите пароль:
          <input
            type="password"
            name="password"
            placeholder="ваш пароль"
            value={password}
            onChange={passwordChecking}
          />
        </label>
        {error.repeatPasswordError && (
          <div className="errorLabel">{error.repeatPasswordError}</div>
        )}
        <label htmlFor="repeatPassword">
          Повторите пароль:
          <input
            type="password"
            name="repeatPassword"
            placeholder="ваш пароль"
            value={repeatPassword}
            onChange={repeatPasswordChecking}
          />
        </label>
        <button ref={submitButtonRef} type="submit" disabled={!isFormValid()}>
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};
