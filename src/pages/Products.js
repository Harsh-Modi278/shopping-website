import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useContext } from "react";
import { CartContext } from "../CartContext";
import { useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";

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
  const { cart, setCart } = useContext(CartContext);

  const [items, setItems] = useState([]);
  const [snackBar, setSnackBar] = useState({
    open: false,
    message: "Item added to your cart",
  });

  const closeSnackBar = (e) => {
    setSnackBar({ ...snackBar, open: false });
  };

  const giveCartItemQuanitityCount = (itemId) => {
    itemId = parseInt(itemId);
    console.log(cart);
    for (let cartItem of cart) {
      if (cartItem.id === itemId) {
        return cartItem.quantity;
      }
    }

    return 0;
  };

  const addToCart = async (e) => {
    const itemId = parseInt(e.currentTarget.dataset.id);
    let itemQuantity = Math.max(
      0,
      parseInt(document.getElementById(`item-quantity-${itemId}`).value) || 0
    );

    console.log({ itemId, itemQuantity });

    if (itemQuantity <= 0) return;

    const itemToAdd = items.filter((item) => item.id === itemId);
    let isFound = false;
    let itemName = "item";
    const newCart = cart.map((cartItem) => {
      if (cartItem.id === itemId) {
        cartItem.quantity += itemQuantity;
        itemName = cartItem.title;
        isFound = true;
      }
      return cartItem;
    });
    if (!isFound) {
      itemToAdd[0].quantity = itemQuantity;
      itemName = itemToAdd[0].title;
      await setCart([...cart, itemToAdd[0]]);
    } else {
      await setCart(newCart);
    }
    setSnackBar({
      message: `${itemName} x ${itemQuantity} added to your cart`,
      open: true,
    });
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
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackBar.open}
        onClose={closeSnackBar}
        message={snackBar.message}
        autoHideDuration={6000}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={closeSnackBar}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* {<pre>{JSON.stringify(cart)}</pre>} */}
          {items.length === 0 ? (
            <React.Fragment>
              <div
                style={{
                  display: "flex",
                  flex: "1",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "2rem",
                }}
              >
                <CircularProgress />
              </div>
              <Typography variant="h5" color="textPrimary" align="center">
                <strong>
                  <em>Fetching Products...</em>
                </strong>
              </Typography>
            </React.Fragment>
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
