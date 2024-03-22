import React from "react";
import { Link } from "react-router-dom";
import styles from "./list.module.scss";

interface MemberEntity {
  id: string;
  login: string;
  avatar_url: string;
}

export const ListPage: React.FC = () => {
  const [organization, setOrganization] = React.useState("lemoncode");
  const [members, setMembers] = React.useState<MemberEntity[]>([]);

  const fetchMembers = (organization: string) => {
    fetch(`https://api.github.com/orgs/${organization}/members`)
      .then((response) => response.json())
      .then((json) => setMembers(json));
  };

  React.useEffect(() => {
    fetchMembers(organization);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeOrganization = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOrganization(event.target.value);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    fetchMembers(organization);
  };

  return (
    <div className={styles.container}>
      <h2>Member list</h2>
      <form className={styles["search-form"]}>
        <input
          name="search organization"
          value={organization}
          onChange={handleChangeOrganization}
        />
        <button onClick={handleClick}>Search for organization's members</button>
      </form>
      <div className={styles["list-user-list-container"]}>
        <span className={styles["list-header"]}>Avatar</span>
        <span className={styles["list-header"]}>Id</span>
        <span className={styles["list-header"]}>Name</span>
        {members.map((member) => (
          <React.Fragment key={member.id}>
            <img src={member.avatar_url} />
            <span>{member.id}</span>
            <Link to={`/detail/${member.login}`}>{member.login}</Link>
          </React.Fragment>
        ))}
      </div>
      <Link to="/detail">Navigate to detail page</Link>
    </div>
  );
};
