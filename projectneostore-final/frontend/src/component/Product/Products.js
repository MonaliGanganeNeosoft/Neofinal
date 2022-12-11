import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import MetaData from "../layout/MetaData";
import "./Products.css";
import Pagination from "react-js-pagination";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

import Slider from "@material-ui/core/Slider";
import { BsArrowUp, BsArrowDown } from "react-icons/bs";

const categories = ["sofa", "table", "chair"];
const colors = ["red", "yellow", "blue"];

const Products = ({ match }) => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [category_name, setCategory_name] = useState("");
  const [color_name, setColor] = useState("");

  const [product_rating, setRating] = useState(0);
  const { products, loading, error, productsCount, resultPerPage } =
    useSelector((state) => {
      return state.products;
    });

  const keyword = match.params.keyword;

  const [sortBy, setSortBy] = useState(0);
  const [sortType, setSortType] = useState("price");
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  const clearFilters = () => {
    console.log("hii");
  };
  useEffect(() => {
    var allDetails = getProduct(
      keyword,
      currentPage,
      category_name,
      color_name,
      product_rating,
      sortBy,
      sortType
    );
    console.log(allDetails);

    dispatch(allDetails);
  }, [
    dispatch,
    keyword,
    currentPage,
    category_name,
    color_name,
    product_rating,
    sortBy,
    sortType,
  ]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Products --amzing" />
          <div
            className="productsHeading"
            style={{
              textAlign: "center",
              display: "flex",
              justifyContent: "flex-end",
              paddingRight: "150px",
              marginTop: "20px",
            }}
          >
            <h6>
              Sort By:{" "}
              <img
                src="https://b.rgbimg.com/users/l/la/lajla/600/mybpemC.jpg"
                style={{ height: "20px" }}
                onClick={(e) => {
                  e.preventDefault();
                  setSortType(sortType === "price" ? "rating" : "price");
                }}
              />
            </h6>
            <h6>
              ₹
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  console.log("up btn clicked");
                  setSortBy(1);
                }}
              >
                <BsArrowUp style={{ margin: "0 4 4 0", fontSize: "larger" }} />
              </a>
            </h6>
            <h6>
              ₹
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  console.log("down btn clicked");
                  setSortBy(2);
                }}
              >
                <BsArrowDown
                  style={{ margin: "0 4 4 0", fontSize: "larger" }}
                />
              </a>
            </h6>
          </div>
          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

          <div className="filterBox">
            {/* <Typography><Link to={"/products"}>All Products</Link></Typography> */}
            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category_name) => (
                <li
                  className="category-link"
                  key={category_name}
                  onClick={() => setCategory_name(category_name)}
                >
                  {category_name}
                </li>
              ))}
            </ul>
            <Typography>Colors</Typography>
            <ul className="colorBox">
              {colors.map((color_name) => (
                <li
                  className="color-link"
                  key={color_name}
                  onClick={() => setColor(color_name)}
                >
                  {color_name}
                </li>
              ))}
            </ul>
            {/* <button onClick={clearFilters}>Clear Filters</button> */}
            {/* <fieldset>
              <Typography component="legend" >Ratings</Typography>
              <Slider
              className='ratingstart'
                value={product_rating}
                onChange={(e, newRating) => {
                  setRating(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
      
                min={0}
                max={5}
              />
            </fieldset> */}
          </div>

          {resultPerPage < productsCount && (
            <div
              className="paginationBox"
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "6vmax",
              }}
            >
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Products;
