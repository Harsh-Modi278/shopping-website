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
import { useContext } from "react";
import { CartContext } from "../CartContext";

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
}));

const items = [
  {
    id: "0",
    title: "item0",
    price: 10,
    quantity: 1,
    description: "abcd",
  },
  {
    id: "1",
    title: "item1",
    price: 20,
    quantity: 1,
    description: "abcde",
  },
  {
    id: "2",
    title: "item2",
    price: 30,
    quantity: 1,
    description: "abcdef",
  },
];

const Products = (props) => {
  const classes = useStyles();
  const { cart, setCart } = useContext(CartContext);
  const addToCart = async (e) => {
    const itemToAdd = items.filter(
      (item) => item.id === e.currentTarget.dataset.id
    );
    let isFound = false;
    const newCart = cart.map((cartItem) => {
      if (cartItem.id === e.currentTarget.dataset.id) {
        cartItem.quantity = parseInt(cartItem.quantity) + 1;
        isFound = true;
      }
      return cartItem;
    });
    if (!isFound) {
      await setCart([...cart, itemToAdd[0]]);
    } else {
      await setCart(newCart);
    }
    return;
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {items.map((item) => (
              <Grid item key={item.id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {item.title}
                    </Typography>
                    <Typography>{item.description}</Typography>
                    <Typography
                      variant="body1"
                      color="textPrimary"
                    >{`Price: $${item.price}`}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      onClick={addToCart}
                      data-id={item.id}
                    >
                      Add to cart
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
};

export default Products;
