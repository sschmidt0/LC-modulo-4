import React from "react";
import { Link } from "react-router-dom";
import styles from "./list.module.scss";

interface MemberEntity {
  id: string;
  login: string;
  avatar_url: string;
}

export const ListPage: React.FC = () => {
  const [members, setMembers] = React.useState<MemberEntity[]>([]);

  // https://api.github.com/orgs/lemoncode/members
  React.useEffect(() => {
    fetch(`https://api.github.com/orgs/lemoncode/members`)
      .then((response) => response.json())
      .then((json) => setMembers(json));
  }, []);

  return (
    <div className={styles.container}>
      <h2>Member list</h2>
      <div className={styles["list-user-list-container"]}>
        <span className={styles["list-header"]}>Avatar</span>
        <span className={styles["list-header"]}>Id</span>
        <span className={styles["list-header"]}>Name</span>
        {members.map((member) => (
          <>
            <img src={member.avatar_url} />
            <span>{member.id}</span>
            <Link to={`/detail/${member.login}`}>{member.login}</Link>
          </>
        ))}
      </div>
      <Link to="/detail">Navigate to detail page</Link>
    </div>
  );
};
