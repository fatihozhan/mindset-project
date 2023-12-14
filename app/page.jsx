"use client";
import styles from "./page.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useState } from "react";
import Loader from "@/components/Loader";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [user, setUser] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const userSchema = yup.object().shape({
    username: yup
      .string("Username must be string")
      .required("Username field is required"),
    password: yup
      .string("Password must be string")
      .required("Password field is required")
      .min(6, "Password at least 6 characters"),
  });
  const router = useRouter();
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const validatedUser = await userSchema.validate(user);
      const result = await signIn("credentials", {
        redirect: false,
        username: validatedUser.username,
        password: validatedUser.password,
      });
      if (result.ok === false) return toast.error(result.error);
      router.push("/user-info");
    } catch (error) {
      console.log(error);
      if (error instanceof yup.ValidationError) toast.error(error.message);
      else toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className={styles.wrapper}>
      {loading && <Loader />}
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.title}>
            <h4>Sign In</h4>
          </div>
          <div className={styles.form}>
            <label htmlFor="username">Username</label>
            <input
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              type="text"
              placeholder="foo@foo.com"
            />
          </div>
          <div className={styles.form}>
            <label htmlFor="password">Password</label>
            <input
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              type="password"
              placeholder="********"
            />
          </div>
          <div className={styles.button}>
            <button onClick={handleSubmit}>Sign In</button>
          </div>
        </div>
        <div className={styles.right}>
          <Swiper
            loop={true}
            autoplay={{ delay: 1000 }}
            modules={[Autoplay]}
            spaceBetween={50}
            slidesPerView={1}
          >
            <SwiperSlide>
              <img src="/images/view1.jpeg" alt="View Picture" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/images/view2.jpeg" alt="View Picture" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/images/view3.jpeg" alt="View Picture" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/images/view4.jpeg" alt="View Picture" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </main>
  );
}
