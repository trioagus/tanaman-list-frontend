import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useAuth } from "../../store/authStore";
import styles from "./Login.module.scss";

const Login: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const userData = {
      username: data.username,
      password: data.password,
    };

    try {
      setLoading(true);
      await login(userData);
      navigate("/");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setError(null);
  }, [login]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      <div className={styles.form_container}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <label htmlFor="username" className={styles.label}>
            Username
          </label>
          <input
            type="text"
            id="username"
            autoComplete="off"
            placeholder="Your username"
            className={styles.input}
            {...register("username", { required: true })}
          />
          {errors.username && <p className={styles.error}>Username is required.</p>}
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <div className={styles.password_container}>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
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
          {loading ? (
            <p>Loading...</p>
          ) : (
            <button type="submit" className={styles.button}>
              Login
            </button>
          )}
          <p className={styles.text}>
            Don't have an account?{" "}
            <Link to="/register" className={styles.link}>
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
