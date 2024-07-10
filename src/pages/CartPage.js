import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import {
  Typography,
  Button,
  Grid,
  AppBar,
  Toolbar,
  Paper,
  Divider,
} from "@mui/material";
import ImageCarousel from "../components/ImageCarousel";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, removeItem, updateQuantity, totalPrice } =
    useContext(CartContext);

  return (
    <div style={{ background: "#f7f2f2" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Shopping Cart
          </Typography>
          <HomeIcon
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          />
        </Toolbar>
      </AppBar>
      <Grid item xs={3} style={{ margin: "20px 0px 20px 10px" }}>
        <Typography variant="h5" style={{ fontWeight: "700" }}>
          Shopping Bag
        </Typography>
        <Typography style={{ fontSize: "16px" }}>
          <span style={{ fontWeight: "600" }}>{cartItems?.length || "0"} </span>
          Items in your bag
        </Typography>
      </Grid>
      <Grid
        container
        spacing={2}
        style={{
          padding: "20px",
          minHeight: "calc(100vh - 144px)",
        }}
      >
        {cartItems.length > 0 ? (
          <Paper
            elevation={3}
            style={{
              borderRadius: "30px",
              padding: "20px",
              width: "100%",
              height: "max-content",
            }}
          >
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} container spacing={2}>
                <Grid
                  item
                  xs={3}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="h6">Product</Typography>
                </Grid>
                <Grid
                  item
                  xs={3}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="h6">Price</Typography>
                </Grid>
                <Grid
                  item
                  xs={3}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="h6">Quantity</Typography>
                </Grid>
                <Grid
                  item
                  xs={3}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="h6">Total Price</Typography>
                </Grid>
              </Grid>
              {cartItems.map((item, index) => (
                <>
                  <Grid
                    item
                    xs={12}
                    container
                    spacing={2}
                    key={item.id}
                    alignItems="center"
                  >
                    <Grid item xs={3}>
                      <ImageCarousel images={item.images} />
                      <Typography
                        variant="body1"
                        style={{ fontSize: "18px", fontWeight: "700" }}
                      >
                        {item.title}
                      </Typography>
                      {/* <Typography variant="body2">
                    Size: {item.description}
                  </Typography> */}
                    </Grid>
                    <Grid
                      item
                      xs={3}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography variant="body1">${item.price}</Typography>
                    </Grid>
                    <Grid
                      item
                      xs={3}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Button
                        style={{ border: "1px solid" }}
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        <RemoveIcon />
                      </Button>
                      <Typography variant="body1" style={{ margin: "0 10px" }}>
                        {item.quantity}
                      </Typography>
                      <Button
                        style={{ border: "1px solid" }}
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <AddIcon />
                      </Button>
                    </Grid>
                    <Grid
                      item
                      xs={3}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography variant="body1" style={{ color: "orange" }}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} style={{ marginTop: "10px" }}>
                      <Button
                        onClick={() => removeItem(item.id)}
                        variant="contained"
                        color="secondary"
                      >
                        Remove
                      </Button>
                    </Grid>
                  </Grid>
                  {index < cartItems.length - 1 && (
                    <Divider
                      style={{
                        width: "100%",
                        marginTop: "10px",
                        height: "5px",
                      }}
                    />
                  )}
                </>
              ))}
              <Grid
                item
                xs={12}
                style={{ textAlign: "right", paddingTop: "20px" }}
              >
                <Typography variant="h5">
                  Total: ${totalPrice.toFixed(2)}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        ) : (
          <Grid
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography variant="h3">Cart Empty</Typography>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default CartPage;
