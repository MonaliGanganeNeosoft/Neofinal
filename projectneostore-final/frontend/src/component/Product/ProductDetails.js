import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";

import Loader from "../layout/Loader/Loader";

import { useSelector, useDispatch } from "react-redux";
import {
  newReview,
  clearErrors,
  getProductDetails,
} from "../../actions/productAction";

import { useAlert } from "react-alert";
import { addItemsToCart } from "../../actions/cartAction";

import ReviewCard from "./ReviewCard";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  WhatsappIcon,
  TwitterIcon,
  EmailIcon,
} from "react-share";
import { useLocation } from "react-router-dom";
import { BsFillShareFill } from "react-icons/bs";
import { Container, Tabs, Tab, Button } from "react-bootstrap";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";

const ProductDetails = ({ match }) => {
  const location = useLocation();
  const [key, setKey] = useState("Description");

  const dispatch = useDispatch();
  const alert = useAlert();
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }

    dispatch(getProductDetails(match.params.id));
  }, [dispatch, match.params.id, error, alert, reviewError, success]);

  // const increaseQuantity = () => {
  //     if (product.product_stock <= quantity) return;

  //    const qty = quantity + 1;
  //    setQuantity(qty);
  //  };

  //  const decreaseQuantity = () => {
  //    if (1 >= quantity) return;

  //    const qty = quantity - 1;
  //    setQuantity(qty);
  //  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(match.params.id, quantity));
    alert.success("Item Added To Cart");
  };

  const options = {
    size: "large",
    value: product.product_rating,
    readOnly: true,
    precision: 0.5,
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", match.params.id);

    dispatch(newReview(myForm));

    setOpen(false);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="ProductDetails">
            <Carousel>
              {product.product_image &&
                product.product_image.map((item, i) => (
                  <img
                    className="CarouselImage"
                    key={item.url}
                    src={item.url}
                    alt={`${i} Slide`}
                  />
                ))}
            </Carousel>
            <div>
              <div className="detailsBlock-1">
                <h1>{product.product_name}</h1>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                {/* <span className="detailsBlock-2-span">
                            {" "}
                            ({product.numOfReviews} Reviews)
                            </span> */}
              </div>

              <div className="detailsBlock-3">
                <p>
                  Price:
                  <span
                    style={{ color: "green" }}
                  >{`Rs${product.product_cost}`}</span>
                </p>
                {/* <p className="d-flex">Color:{`${product.color_code}`}</p> */}

                <p className="d-flex">
                  Color :&nbsp;
                  <input type="color" value={`${product.color_code}`} />
                </p>

                <p>
                  Share <BsFillShareFill />
                </p>
                <p>
                  <FacebookShareButton url={window.location} className="me-2">
                    <FacebookIcon
                      className="rounded-circle"
                      size="40px"
                    ></FacebookIcon>
                  </FacebookShareButton>
                  <TwitterShareButton url={window.location} className="me-2">
                    <TwitterIcon
                      className="rounded-circle"
                      size="40px"
                    ></TwitterIcon>
                  </TwitterShareButton>
                  <WhatsappShareButton url={window.location} className="me-2">
                    <WhatsappIcon
                      className="rounded-circle"
                      size="40px"
                    ></WhatsappIcon>
                  </WhatsappShareButton>
                  <EmailShareButton url={window.location} className="me-2">
                    <EmailIcon
                      className="rounded-circle"
                      size="40px"
                    ></EmailIcon>
                  </EmailShareButton>
                </p>
                <p>
                  <Button
                    variant="info"
                    disabled={product.Stock < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    Add to cart
                  </Button>
                  <Button
                    varinat="light"
                    className="ms-2"
                    onClick={submitReviewToggle}
                  >
                    Rate Product
                  </Button>
                </p>

                {/* <p>
                      Status:
                      <b className={product.product_stock < 1 ? "redColor" : "greenColor"}>
                        {product.product_stock < 1 ? "OutOfStock" : "InStock"}
                      </b>
                    </p> */}
              </div>
              {/* <div className='detailsBlock-4'>
                        Description:<p>{product.product_desc}</p>
    
                    </div> */}
              {/* <Button varinat="light" className="ms-2" onClick={submitReviewToggle}  className='submitReview'>Rate Product
                    </Button> */}
            </div>
          </div>

          {/* <h3 className="reviewsHeading">REVIEWS</h3> */}

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              {/* <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea> */}
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          {/* {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )} */}
        </>
      )}
      <div>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
        >
          <Tab eventKey="Description" title="Description">
            <p>{product.product_desc}</p>
          </Tab>
          <Tab eventKey="Features" title="Features">
            <p>{product.product_feature}</p>
          </Tab>
        </Tabs>
      </div>
    </>
  );
};

export default ProductDetails;
