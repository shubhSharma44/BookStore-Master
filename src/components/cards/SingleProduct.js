import React, { useState } from "react";
import { Card, Tabs, Tooltip } from "antd";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import ProductListItems from "./ProductListItems";
import StarRating from "react-star-ratings";
import RatingModal from "../modal/RatingModal";
import { showAverage } from "../../functions/rating";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import { addToWishlist } from "../../functions/user";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const { TabPane } = Tabs;

const SingleProduct = ({ product, onStarClick, star }) => {
  const { title, images, description, _id } = product;
  const [tooltip, setTooltip] = useState("click to add");

  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  let history = useHistory();

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

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    addToWishlist(product._id, user.token).then((res) => {
      console.log(res.data);
      toast.success("Added to wishlist");
      history.push("/user/wishlist");
    });
  };

  return (
    <>
      <div className="col-md-7">
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {images &&
              images.map((i) => (
                <img src={i.url} key={i.public_id} alt="product" />
              ))}
          </Carousel>
        ) : (
          <Card
            cover={
              <img
                alt="laptop"
                src={
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn-SJgS0wvz4a8Y2QXVrZ5iDwFpTbK9ilTqg&usqp=CAU"
                }
                className="mb-3 card-image"
              />
            }
          ></Card>
        )}

        <Tabs type="card">
          <TabPane tab="Book Info" key="1">
            {description && description}
          </TabPane>
            
          {/* <TabPane tab="More" key="2">
            Email for more info : shubhsharma@gmail.com
          </TabPane> */}
        </Tabs>
      </div>
      <div className="col-md-5">
        <h1 className="bg-info p-3">{title}</h1>

        {product && product.ratings && product.ratings.length > 0 ? (
          showAverage(product)
        ) : (
          <div className="text-center pt-1 pb-3"></div>
        )}

        <Card
        
          actions={[
            <a onClick={handleAddToWishlist}>
              <HeartOutlined className="text-info" /> <br />
              Add to Wishlist
            </a>,
            <Tooltip title={tooltip}>
              <a onClick={handleAddToCart}>
                <ShoppingCartOutlined className="text-danger" /> <br /> Add to
                cart
              </a>
            </Tooltip>,
            
            // <a onClick={handleAddToWishlist}>
            //   <HeartOutlined className="text-info" /> <br />
            //   Add to Wishlist
            // </a>,
            
            // <RatingModal>
            //   <StarRating
            //     name={_id}
            //     numberOfStars={5}
            //     rating={star}
            //     changeRating={onStarClick}
            //     isSelectable={true}
            //     starRatedColor="red"
            //   />
            // </RatingModal>,
          ]}
        >
          <ProductListItems product={product} />
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;
