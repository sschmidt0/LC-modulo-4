import React from "react";
import { Link, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
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
      <Typography variant="h2">Detail page</Typography>
      <Card className={styles.container__inner}>
        <CardContent>
          <Typography variant="h6">User Id: {id}</Typography>
          <List className={styles.list}>
            <ListItem>id: {member.id}</ListItem>
            <ListItem> login: {member.login}</ListItem>
            <ListItem> name: {member.name}</ListItem>
            <ListItem> company: {member.company}</ListItem>
            <ListItem> bio: {member.bio}</ListItem>
          </List>
        </CardContent>
      </Card>
      <Link to="/list">Back to list page</Link>
    </div>
  );
};
