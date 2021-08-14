import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Badge } from "@material-ui/core";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: "space-between",
    overflowX: "auto",
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const { sections, title } = props;

  return (
    <React.Fragment>
      <Router>
        <Toolbar className={classes.toolbar}>
          <Typography
            component="h2"
            variant="h5"
            color="inherit"
            noWrap
            className={classes.toolbarTitle}
          >
            <Link
              href="/"
              style={{
                color: "black",
                textDecorationLine: "none",
                cursor: "pointer",
              }}
            >
              {title}
            </Link>
          </Typography>

          {sections.map((section) => (
            <Link
              color="inherit"
              noWrap
              key={section.title}
              // component="nav"
              variant="body1"
              href={section.url}
              className={classes.toolbarLink}
            >
              {section.title}
            </Link>
          ))}

          <IconButton>
            <SearchIcon />
          </IconButton>
          <Button variant="outlined" size="small">
            <Badge badgeContent={4} color="primary">
              <ShoppingCartIcon />
            </Badge>
          </Button>
        </Toolbar>
      </Router>
    </React.Fragment>
  );
}
