import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import GitHubIcon from "@material-ui/icons/GitHub";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  contactContainer: {
    display: "flex",
    flex: "1",
    alignItems: "center",
    justifyContent: "center",
    gap: "10rem",
    marginTop: "10rem",
    marginBottom: "15rem",
  },
  socialLinks: {
    cursor: "pointer",
  },
}));

const Contact = (props) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      {/* <CssBaseline /> */}
      <main>
        <Container maxWidth="md" className={classes.contactContainer}>
          <List style={{ display: "flex", flexDirection: "row" }}>
            <ListItem style={{ margin: "2rem" }}>
              <Link
                color="inherit"
                href="https://github.com/Harsh-Modi278"
                target="_blank"
                className={classes.socialLinks}
              >
                <GitHubIcon style={{ fontSize: 50 }} />
              </Link>
            </ListItem>
            <ListItem style={{ margin: "2rem" }}>
              <Link
                color="inherit"
                href="https://www.youtube.com/watch?v=o-YBDTqX_ZU"
                target="_blank"
                className={classes.socialLinks}
              >
                <FacebookIcon style={{ fontSize: 50 }} />
              </Link>
            </ListItem>
            <ListItem style={{ margin: "2rem" }}>
              <Link
                color="inherit"
                href="https://www.youtube.com/watch?v=o-YBDTqX_ZU"
                target="_blank"
                className={classes.socialLinks}
              >
                <TwitterIcon style={{ fontSize: 50 }} />
              </Link>
            </ListItem>
            <ListItem style={{ margin: "2rem" }}>
              <Link
                color="inherit"
                href="https://www.youtube.com/watch?v=o-YBDTqX_ZU"
                target="_blank"
                className={classes.socialLinks}
              >
                <InstagramIcon style={{ fontSize: 50 }} />
              </Link>
            </ListItem>
          </List>
        </Container>
      </main>
    </React.Fragment>
  );
};

export default Contact;
