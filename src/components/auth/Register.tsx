import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useAuth } from "../../store/authStore";
import styles from "./Register.module.scss";

type FormValues = {
  username: string;
  password: string;
};

export const Register: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const userData = {
      username: data.username,
      password: data.password,
    };

    try {
      await registerUser(userData);
      navigate("/login");
    } catch (error: any) {
      setError(error.message);
    }
  };

  useEffect(() => {
    setError(null);
  }, [registerUser]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Register</h1>
      <div className={styles.form_container}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <label className={styles.label}>
            Username
          </label>
          <input
            type="text"
            autoComplete="off"
            placeholder="Your username"
            className={styles.input}
            {...register("username", { required: true })}
          />
          {errors.username && <p className={styles.error}>Username is required.</p>}
          <label className={styles.label}>
            Password
          </label>
          <div className={styles.password_container}>
            <input
              type={showPassword ? "text" : "password"}
              autoComplete="off"
              placeholder="********"
              className={styles.input}
              {...register("password", { required: true })}
            />
            {showPassword ? (
              <FiEyeOff
                className={styles.eye_icon}
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <FiEye
                className={styles.eye_icon}
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>
          {errors.password && <p className={styles.error}>Password is required.</p>}
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.button}>
            Register
          </button>
          <p className={styles.text}>
            Already have an account?{" "}
            <Link to="/login" className={styles.link}>
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
