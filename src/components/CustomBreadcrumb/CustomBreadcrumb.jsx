import { Link } from "react-router-dom";
import { Breadcrumb } from "antd";
import { MoveRight } from "lucide-react";
import styles from "./CustomBreadcrumb.module.scss";

export const CustomBreadcrumb = ({ items, className = "" }) => {
  return (
    <Breadcrumb
      className={`${styles.navigation} ${className}`}
      separator={<MoveRight size={14} />}
      items={items.map((item) => ({
        title: item.path ? (
          <Link to={item.path}>{item.title}</Link>
        ) : (
          item.title
        ),
      }))}
    />
  );
};