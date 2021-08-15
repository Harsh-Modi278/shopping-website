import React, { useState } from "react";
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
import { useEffect } from "react";

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
    height: "auto",
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

const Products = (props) => {
  const classes = useStyles();

  const [items, setItems] = useState([]);

  const { cart, setCart } = useContext(CartContext);

  const addToCart = async (e) => {
    const itemId = e.currentTarget.dataset.id;
    let itemQuantity = Math.max(
      0,
      parseInt(document.getElementById(`item-quantity-${itemId}`).value) || 0
    );

    console.log(document.getElementById(`item-quantity-${itemId}`).value, {
      itemQuantity,
    });

    if (itemQuantity <= 0) return;

    const itemToAdd = items.filter(
      (item) => item.id === parseInt(e.currentTarget.dataset.id)
    );
    let isFound = false;
    const newCart = cart.map((cartItem) => {
      if (cartItem.id === e.currentTarget.dataset.id) {
        cartItem.quantity = itemQuantity;
        isFound = true;
      }
      return cartItem;
    });
    if (!isFound) {
      itemToAdd[0].quantity = itemQuantity;
      await setCart([...cart, itemToAdd[0]]);
    } else {
      await setCart(newCart);
    }
    return;
  };

  const loadProducts = async () => {
    const res = await fetch(
      "https://fakestoreapi.com/products/category/electronics"
    );
    const jsonRes = await res.json();

    // console.log(jsonRes);
    const itemsTemp = Array.from(jsonRes).map((item) => {
      item.quantity = 0;
      return item;
    });
    setItems(itemsTemp);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <React.Fragment>
      {/* <CssBaseline /> */}
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* {<pre>{JSON.stringify(cart)}</pre>} */}
          {items.length === 0 ? (
            <Typography variant="h2" color="textPrimary" align="center">
              <strong>
                <em>Fetching Products...</em>
              </strong>
            </Typography>
          ) : (
            <Grid container spacing={4}>
              {items.map((item) => (
                <Grid item key={item.id} xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      image={item.image}
                      title="Image title"
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        <strong>{item.title}</strong>
                      </Typography>
                      <br />
                      <Typography>{item.description}</Typography>
                      <br />
                      <br />
                      <div
                        style={{
                          display: "flex",
                          flex: "5",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <label htmlFor="quantity">
                          <strong>Quantity:</strong>{" "}
                        </label>
                        <input
                          type="number"
                          data-id={item.id}
                          min="0"
                          name="item-quantity"
                          id={`item-quantity-${item.id}`}
                        />
                      </div>
                    </CardContent>

                    <Typography
                      variant="body1"
                      color="textPrimary"
                      align="center"
                    >
                      <strong>
                        <em>{`Price: $${item.price}`}</em>
                      </strong>
                    </Typography>
                    <CardActions
                      align="center"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Button
                        size="small"
                        color="primary"
                        onClick={addToCart}
                        data-id={item.id}
                        variant="contained"
                      >
                        Add to cart
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </main>
    </React.Fragment>
  );
};

export default Products;
