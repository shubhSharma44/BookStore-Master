import React from "react";
import { Link } from "react-router-dom";
import "./style.css"

const ProductListItems = ({ product, match }) => {
  const {
    price,
    category,
    subs,
    shipping,
    color,
    brand,
    quantity,
    sold,
  } = product;
  return (
    <ul className="list-group">
      <h2>“A word after a word after a word is power.” – Margaret Atwood</h2>
      <li className="list-group-item">
        <h6>Cost</h6>{" "}
        <span className="label label-default label-pill pull-xs-right">
          <h6>₹{price}</h6>
        </span>
      </li>

      {category && (
        <li className="list-group-item">
          <h6>Category{" "}</h6>
          <Link
            to={`/category/${category.slug}`}
            className="label label-default label-pill pull-xs-right"
          >
            {category.name}
          </Link>
        </li>
      )}

      {subs && (
        <li className="list-group-item">
          <h6>Genre </h6>
          {subs.map((s) => (
            <Link
              key={s._id}
              to={`/sub/${s.slug}`}
              className="label label-default label-pill pull-xs-right"
            >
              {s.name}
            </Link>
          ))}
        </li>
      )}

      {/* <li className="list-group-item">
        Shipping{" "}
        <span className="label label-default label-pill pull-xs-right">
          {shipping}
        </span>
      </li> */}

      {/* <li className="list-group-item">
        Color{" "}
        <span className="label label-default label-pill pull-xs-right">
          {color}
        </span>
      </li> */}

      <li className="list-group-item">
       <h6> Brand{" "}</h6>
        <span className="label label-default label-pill pull-xs-right">
          {brand}
        </span>
      </li>

      <li className="list-group-item">
        <h6>Quantity{" "}</h6>
        <span className="label label-default label-pill pull-xs-right">
          {quantity}
        </span>
      </li>

      <li className="list-group-item">
        {" "}
        {/* <span className="label label-default label-pill pull-xs-right">
          {sold}
        </span> */}
      </li>
    </ul>
  );
};

export default ProductListItems;
