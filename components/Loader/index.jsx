import React from "react";
import { Blocks } from "react-loader-spinner";
import styles from "./styles.module.scss";

export default function Loader() {
  return (
    <div className={styles.loader}>
      <Blocks
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
      />
    </div>
  );
}
