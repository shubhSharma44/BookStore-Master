import React from "react";
import { Drawer, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const SideDrawer = () => {
  const dispatch = useDispatch();
  const { drawer, cart } = useSelector((state) => ({ ...state }));

  const imageStyle = {
    width: "100%",
    height: "50px",
    objectFix: "cover",
  };

  return (
    <Drawer
      className="text-center"
      placement="right"
      closable={false}
      title={`Cart / ${cart.length} Product`}
      onClose={() => {
        dispatch({
          type: "SET_VISIBLE",
          payload: false,
        });
      }}
      visible={drawer}
    >
      {cart &&
        cart.map((p) => (
          <div key={p._id} className="row">
            <div className="col">
              {p.images[0] ? (
                <>
                  <img src={p.images[0].url} style={imageStyle} />
                  <p className="text-center bg-secondary text-light">
                    {p.title} x {p.count}
                  </p>
                </>
              ) : (
                <>
                  <img
                    src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn-SJgS0wvz4a8Y2QXVrZ5iDwFpTbK9ilTqg&usqp=CAU`}
                    style={imageStyle}
                  />
                  <p className="text-center bg-secondary text-light">
                    {p.title} x {p.count}
                  </p>
                </>
              )}
            </div>
          </div>
        ))}
      <Link to="/cart">
        <button
          onClick={() => {
            dispatch({
              type: "SET_VISIBLE",
              payload: false,
            });
          }}
          className="text-center btn btn-primary btn-raised btn-block"
        >
          Go To Cart
        </button>
      </Link>
    </Drawer>
  );
};

export default SideDrawer;
