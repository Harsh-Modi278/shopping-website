import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Badge } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import { useState } from "react";
import Cart from "./Cart";

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
    textDecoration: "none",
    color: "black",
  },
  paper: {
    width: 350,
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const { sections, title, cartItems } = props;

  const [drawerState, setDrawerState] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerState(open);
  };

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <RouterLink
          to="/"
          style={{
            color: "black",
            textDecorationLine: "none",
            cursor: "pointer",
          }}
          className={classes.toolbarTitle}
        >
          <strong>
            <h1>{title}</h1>
          </strong>
        </RouterLink>

        {sections.map((section) => (
          <RouterLink
            key={section.title}
            to={section.url}
            className={classes.toolbarLink}
          >
            <h3>{section.title}</h3>
          </RouterLink>
        ))}

        <IconButton>
          <SearchIcon />
        </IconButton>
        <Button onClick={toggleDrawer(true)}>
          <Button variant="outlined" size="small">
            <Badge badgeContent={cartItems} color="primary">
              <ShoppingCartIcon />
            </Badge>
          </Button>{" "}
        </Button>
        <Drawer
          anchor="right"
          open={drawerState}
          onClose={toggleDrawer(false)}
          classes={{ paper: classes.paper }}
        >
          <Cart />
        </Drawer>
      </Toolbar>
    </React.Fragment>
  );
}
