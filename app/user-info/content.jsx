"use client";
import React from "react";
import styles from "./styles.module.scss";
import { signOut } from "next-auth/react";

export default function Content({ user }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.card__left}>
          <img src={user.image} alt="" />
          <h4>
            {user.firstName} {user.lastName}
          </h4>
          <h6>{user.gender} </h6>
          <button onClick={() => signOut({ redirect: "/" })}>Sign Out</button>
        </div>
        <div className={styles.card__right}>
          <div className={styles.header}>Informations</div>
          <div className={styles.content}>
            <div>
              <h4>Email</h4>
              <p>{user.email} </p>
            </div>
            <div>
              <h4>Username</h4>
              <p>{user.username} </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
