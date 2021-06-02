import React from "react";

const ShowPaymentInfo = ({ order, showStatus = true }) => {
  return (
    <div>
      <p>
        <span>Order Id: {order.paymentIntent.id} </span>
        <br />
        <span>Amount Paid: {order.paymentIntent.amount * 100}</span>
        <br />
        <span>Transaction: {order.paymentIntent.currency.toUpperCase()}</span>
        <br />
        <span>Method: {order.paymentIntent.payment_method_types[0]}</span>
        <br />
        <span>Payment: {order.paymentIntent.status.toUpperCase()}</span>
        <br />
        <span>
          Ordered On:{" "}
          {new Date(order.paymentIntent.created * 1000).toLocaleString()}
        </span>
        <br />
        {showStatus && (
          <span className="badge bg-primary text-white">
            STATUS: {order.orderStatus}
          </span>
        )}{" "}
      </p>
    </div>
  );
};

export default ShowPaymentInfo;
