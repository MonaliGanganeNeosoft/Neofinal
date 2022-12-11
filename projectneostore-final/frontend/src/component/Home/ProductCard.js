import React from "react";
  import { Link } from "react-router-dom";
  import { Card, Button } from "react-bootstrap";
  import { Rating } from "@material-ui/lab";
  const ProductCard = ({ product }) => {
    const options = {
      size: "large",
      value:product.product_rating,
      readOnly:true,
      precision: 0.5,
    };
    return (
      <>
        <Link className="productCard" to={`/product/${product._id}`}>
          <Card style={{ width: "18rem",marginLeft:"60px",marginBottom:"30px" }}>
            <Card.Img
              variant="top"
              src={product.product_image[0].url}
              alt={product.product_name}
              style={{height:"150px"}}
            />
            <Card.Body>
              <Card.Title style={{textAlign:"center"}}>{product.product_name}</Card.Title>
              <Card.Text style={{textAlign:"center"}}>
                <Rating {...options} />
              </Card.Text >
              <p style={{textAlign:"center"}}>{`Rs${product.product_cost}`}</p>
            </Card.Body>
          </Card>

          {/* <img src={product.images[0].url} /> */}
        </Link>
      </>
    );
  };
  
  export default ProductCard;
  