import { useContext } from "react";
import { CartContext } from "../CartContext.js";
import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";

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
    // height: "140%",
    // width: "120%",
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
}));

const Cart = (props) => {
  const classes = useStyles();
  const { cart, setCart } = useContext(CartContext);

  const handleIncrease = (e) => {
    const itemId = parseInt(e.currentTarget.dataset.id);
    const newCart = cart.map((cartItem) => {
      if (cartItem.id === itemId) {
        cartItem.quantity = parseInt(cartItem.quantity) + 1;
      }
      return cartItem;
    });
    setCart(newCart);
  };

  const handleDecrease = (e) => {
    const itemId = parseInt(e.currentTarget.dataset.id);
    const newCart = cart.filter((cartItem) => {
      if (cartItem.id === itemId) {
        cartItem.quantity = parseInt(cartItem.quantity) - 1;
      }
      return cartItem.quantity > 0;
    });
    setCart(newCart);
  };

  const giveTotalPrice = () => {
    let totalPrice = 0;
    cart.forEach((cartItem) => {
      totalPrice += parseFloat(cartItem.quantity) * parseFloat(cartItem.price);
    });

    return totalPrice;
  };

  return (
    <React.Fragment>
      {/* <CssBaseline /> */}
      <Container
        style={{
          display: "flex",
          flex: "1",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "1.6rem",
        }}
      >
        <Typography variant="h5" component="body1">
          Your Shopping Cart
        </Typography>
      </Container>
      <main>
        <Container className={classes.cardGrid}>
          {cart.length === 0 ? (
            <Typography
              gutterBottom
              variant="h5"
              align="center"
              color="primary"
            >
              Empty!!
            </Typography>
          ) : (
            <Grid
              spacing={10}
              container
              direction="column"
              justifyContent="space-between"
              alignItems="stretch"
            >
              {cart.map((item) => (
                <Grid item key={item.id} xs={12} sm={3} md={12}>
                  <Card variant="outlined">
                    <CardMedia
                      className={classes.cardMedia}
                      image={item.image}
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        <strong>{item.title}</strong>
                      </Typography>
                      <br />
                      <Typography
                        gutterBottom
                        variant="body1"
                        // component="h3"
                        align="center"
                      >
                        <strong>
                          <em>
                            {`${parseFloat(item.quantity)} x $${parseFloat(
                              item.price
                            )} = $${
                              Math.floor(
                                parseFloat(item.quantity) *
                                  parseFloat(item.price) *
                                  100
                              ) / 100
                            }`}
                          </em>
                        </strong>
                      </Typography>
                    </CardContent>
                    <CardActions className="parent-even-dist-children">
                      <Button
                        color="default"
                        variant="contained"
                        onClick={handleDecrease}
                        data-id={item.id}
                      >
                        <RemoveIcon data-id={item.id} />
                      </Button>
                      <Typography>{item.quantity}</Typography>
                      <Button
                        color="default"
                        variant="contained"
                        data-id={item.id}
                        onClick={handleIncrease}
                      >
                        <AddIcon />
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </main>
      <br />

      <Container
        style={{
          display: "flex",
          flex: "1",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h5" component="body1">
          {`Total: $${Math.round(giveTotalPrice() * 100) / 100}`}
        </Typography>
      </Container>
      <Container
        style={{
          display: "flex",
          flex: "1",
          alignItems: "center",
          justifyContent: "center",
          padding: "1.6rem",
        }}
      >
        <Button variant="contained" color="secondary">
          Checkout
        </Button>
      </Container>
    </React.Fragment>
  );
};

export default Cart;
