import React from "react";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import Avatar from "@mui/material/Avatar";
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
      <Typography variant="h1">Member list</Typography>
      <form className={styles["search-form"]}>
        <TextField
          id="search-organization"
          variant="outlined"
          value={organization}
          onChange={handleChangeOrganization}
        />
        <Button variant="contained" onClick={handleClick}>
          LogSearch for organization's membersin
        </Button>
      </form>
      <Table className={styles.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={styles["table__header-cell"]}>
              Avatar
            </TableCell>
            <TableCell className={styles["table__header-cell"]}>Id</TableCell>
            <TableCell className={styles["table__header-cell"]}>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {members.map((member) => (
            <TableRow key={member.id}>
              <TableCell>
                <Avatar
                  src={member.avatar_url}
                  className={styles.image}
                  alt={member.id}
                />
              </TableCell>
              <TableCell>{member.id}</TableCell>
              <TableCell>
                <Link to={`/detail/${member.login}`}>{member.login}</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Link to="/detail">Navigate to detail page</Link>
    </div>
  );
};
