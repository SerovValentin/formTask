import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useRef } from "react";

const fieldsScheme = yup.object().shape({
  email: yup.string().email("Некорректный email").required("Обязательное поле"),
  password: yup
    .string()
    .required("Обязательное поле")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/,
      "Необходимо указать более 8 символов, из них хотя бы 1 строчную и 1 заглавную букву, цифру и специальный символ"
    )
    .max(20, "Необходимо менее 20 символов"),
  repeatPassword: yup
    .string()
    .required("Обязательное поле")
    .oneOf([yup.ref("password"), null], "Пароли не совпадают"),
});

export const ReactForm = ({ sendFormData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      repeatPassword: "",
    },
    resolver: yupResolver(fieldsScheme),
    mode: "onChange",
  });
  const onSubmit = (formData) => {
    if (isValid) {
      sendFormData(formData);
    }
  };
  const submitButtonRef = useRef(null);
  useEffect(() => {
    if (isValid && submitButtonRef.current) {
      submitButtonRef.current.focus();
    }
  }, [isValid]);
  return (
    <div className="container">
      <h2>Форма регистрации</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        {errors?.email?.message && (
          <div className="errorLabel"> {errors?.email?.message}</div>
        )}
        <input
          type="text"
          name="email"
          placeholder="email"
          {...register("email")}
        />
        {errors?.password?.message && (
          <div className="errorLabel"> {errors?.password?.message}</div>
        )}

        <input
          type="password"
          name="password"
          placeholder="Введите пароль"
          {...register("password")}
        />

        {errors?.repeatPassword?.message && (
          <div className="errorLabel">{errors?.repeatPassword?.message}</div>
        )}

        <input
          type="password"
          name="repeatPassword"
          placeholder="Повторите пароль"
          {...register("repeatPassword")}
        />
        <button type="submit" disabled={!isValid}>
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};
