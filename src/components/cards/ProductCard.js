import React, { useState } from "react";
import { Card, Tooltip } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { showAverage } from "../../functions/rating";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import StarRating from "react-star-ratings";
import RatingModal from "../modal/RatingModal";


const ProductCard = ({ product }) => {
  const [tooltip, setTooltip] = useState("click to add");

  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.push({
        ...product,
        count: 1,
      });
      // remove duplicates
      let unique = _.uniqWith(cart, _.isEqual);
      // save to localstorage
      localStorage.setItem("cart", JSON.stringify(unique));
      // show tool tip
      setTooltip("Added");

      // add to redux
      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });

      dispatch({
        type: "SET_VISIBLE",
        payload: true,
      });
    }
  };

  const { images, title, description, slug, price } = product;
  return (
    <>
      {product && product.ratings && product.ratings.length > 0 ? (
        showAverage(product)
      ) : (
        <div className="text-center pt-1 pb-3">No ratings yet</div>
      )}
      <Card
        cover={
          <img
            alt="laptop"
            src={
              images && images.length
                ? images[0].url
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn-SJgS0wvz4a8Y2QXVrZ5iDwFpTbK9ilTqg&usqp=CAU"
            }
            style={{ height: "150%", onjectFit: "cover" }}
            className="p-1"
          />
        }
        actions={[
          <Link to={`/product/${slug}`}>
            {/* <EyeOutlined className="text-warning" /> */}
            
              <h5 id = "option">Preview Book</h5> <br />
              <h5 id = "option">Explore More</h5>
          </Link>,
          
          // <Tooltip title={tooltip}>
          //   <a onClick={handleAddToCart} disabled={product.quantity < 1}>
          //     <ShoppingCartOutlined className="text-danger" /> <br />
          //     {product.quantity < 1 ? "Out of Stock" : "Add to cart"}
          //   </a>
          //   ,
          // </Tooltip>,
        ]}
      >
        <Card.Meta
          description={`★★★★`}
          title={`${title} - ₹${price}`}
          // description={`${description && description.substring(0, 50)}...`}
          description={`⭐⭐⭐⭐⭐` }
         
        />
      </Card>
    </>
  );
};

export default ProductCard;
