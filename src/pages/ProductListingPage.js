import React, { useState, useEffect, useContext, useRef } from "react";
import {
  Grid,
  CircularProgress,
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import SortFilter from "../components/SortFilter";
import Pagination from "../components/Pagination";
import { useProducts } from "../hooks/useProducts";
import { useCategories } from "../hooks/useCategories";
import { CartContext } from "../context/CartContext";
import CartIcon from "../components/CartIcon";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiAppBar-root": {
      position: "sticky",
      top: "0",
      zIndex: "10",
    },
    "& .MuiPagination-root": {
      padding: "10px",
      marginTop: "10px",
      display: "flex",
      justifyContent: "center",
      bottom: "0",
      zIndex: "10",
      background: "ghostwhite",
      position: "fixed",
      width: "100%",
    },
    "& .MuiCircularProgress-root": {
      width: "90px !important",
      height: "90px !important",
    },
    "& .MuiAutocomplete-root": {
      margin: "10px",
    },
  },
  loader: {
    display: "flex",
    justifyContent: "center",
    height: "calc(100vh - 250px)",
    alignItems: "center",
    fontWeight: "700",
    fontSize: "24px",
  },
}));

const ProductListingPage = () => {
  const classes = useStyles();
  const { addToCart } = useContext(CartContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [sort, setSort] = useState("asc");
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);

  const location = useLocation();
  const navigate = useNavigate();
  const prevQueryParamsRef = useRef({});

  const { products, loading, error, totalProducts } = useProducts({
    searchQuery,
    sort,
    filter,
    page,
  });
  const { categories } = useCategories();

  // useEffect(() => {
  //   const query = new URLSearchParams(location.search);
  //   const newSearchQuery = query.get("search") || "";
  //   const newSort = query.get("sort") || "asc";
  //   const newFilter = query.get("filter") || "";
  //   const newPage = Number(query.get("page")) || 1;

  //   if (
  //     newSearchQuery !== searchQuery ||
  //     newSort !== sort ||
  //     newFilter !== filter ||
  //     newPage !== page
  //   ) {
  //     setSearchQuery(newSearchQuery);
  //     setSort(newSort);
  //     setFilter(newFilter);
  //     setPage(newPage);
  //   }
  // }, [location.search]);

  useEffect(() => {
    const query = new URLSearchParams();
    if (searchQuery) query.set("search", searchQuery);
    if (sort) query.set("sort", sort);
    if (filter) query.set("filter", filter);
    query.set("page", page);

    const queryString = query.toString();
    const prevQueryString = new URLSearchParams(
      prevQueryParamsRef.current
    ).toString();

    if (queryString !== prevQueryString) {
      prevQueryParamsRef.current = query;
      navigate({ search: queryString });
    }
  }, [searchQuery, sort, filter, page, navigate]);

  const totalPages = Math.ceil(totalProducts / 10);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Product Listing
          </Typography>
          <CartIcon />
        </Toolbar>
      </AppBar>
      <SearchBar setSearchQuery={setSearchQuery} />
      <SortFilter
        setSort={setSort}
        setFilter={setFilter}
        categories={categories}
      />
      {loading ? (
        <Grid className={classes.loader}>
          <CircularProgress />
        </Grid>
      ) : error ? (
        <div>Error fetching products</div>
      ) : (
        <>
          {products.length > 0 ? (
            <Grid container spacing={3} padding={"10px"} marginBottom={"65px"}>
              {products.map((product) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                  <ProductCard product={product} onAddToCart={addToCart} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <div className={classes.loader}>No Data Found</div>
          )}
        </>
      )}
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
};

export default ProductListingPage;
