import React from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./detail.module.scss";

interface MemberDetailEntity {
  id: string;
  login: string;
  name: string;
  company: string;
  bio: string;
}

const createDefaultMemberDetail = () => ({
  id: "",
  login: "",
  name: "",
  company: "",
  bio: "",
});

export const DetailPage: React.FC = () => {
  const [member, setMember] = React.useState<MemberDetailEntity>(
    createDefaultMemberDetail()
  );
  const { id } = useParams();

  React.useEffect(() => {
    fetch(`https://api.github.com/users/${id}`)
      .then((response) => response.json())
      .then((json) => setMember(json));
  }, [id]);

  return (
    <div className={styles.container}>
      <h2>Hello from Detail page</h2>
      <div className={styles.container__inner}>
        <h3>User Id: {id}</h3>
        <p> id: {member.id}</p>
        <p> login: {member.login}</p>
        <p> name: {member.name}</p>
        <p> company: {member.company}</p>
        <p> bio: {member.bio}</p>
      </div>
      <Link to="/list">Back to list page</Link>
    </div>
  );
};
