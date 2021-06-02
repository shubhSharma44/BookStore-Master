import React from "react";
import { Card } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Meta } = Card;

const AdminProductCard = ({ product, handleRemove }) => {
  const { title, description, images, slug } = product;
  return (
    <Card
      cover={
        <img
          alt="laptop"
          src={
            images && images.length
              ? images[0].url
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn-SJgS0wvz4a8Y2QXVrZ5iDwFpTbK9ilTqg&usqp=CAU"
          }
          style={{ height: "100%", onjectFit: "cover" }}
          className="p-1"
        />
      }
      actions={[
        <Link to={`/admin/product/${slug}`}>
          <EditOutlined className="text-warning" />
        </Link>,
        <DeleteOutlined
          onClick={() => handleRemove(slug)}
          className="text-danger"
        />,
      ]}
    >
      <Meta
        title={title}
        description={`${description && description.substring(0, 50)}...`}
      />
      
    </Card>
  );
};

export default AdminProductCard;
