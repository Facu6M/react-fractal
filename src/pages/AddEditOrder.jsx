import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/AddEditOrder.css";

const AddEditOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState({
    orderNum: id ? "" : "ORD001",
    date: new Date().toISOString().split("T")[0],
    products: 0,
    price: 0,
    status: "pending",
  });

  useEffect(() => {
    if (id) {
      const fetchOrder = async () => {
        try {
          const response = await axios.get(
            `https://backend-fractal-o8jg.onrender.com/orders/${id}`
          );
          setOrder({
            orderNum: response.data.order,
            date: response.data.date,
            products: response.data.products,
            price: response.data.price,
            status: response.data.status,
          });
        } catch (error) {
          console.error("There was an error fetching the order:", error);
          alert("Failed to load order data.");
        }
      };

      fetchOrder();
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!order.date || order.products === "" || !order.price || !order.status) {
      alert("All fields are required!");
      return;
    }

    try {
      if (id) {
        const response = await axios.put(`http://localhost:5000/orders/${id}`, {
          date: order.date,
          products: order.products,
          price: order.price,
          status: order.status,
        });

        if (response.status === 200) {
          navigate("/my-orders");
        } else {
          alert("There was an issue updating the order.");
        }
      } else {
        const response = await axios.post("http://localhost:5000/orders", {
          date: order.date,
          products: order.products,
          price: order.price,
          status: order.status,
        });

        if (response.status === 201) {
          navigate("/my-orders");
        } else {
          alert("There was an issue saving the order.");
        }
      }
    } catch (error) {
      console.error("There was an error:", error);
      alert("Failed to save the order.");
    }
  };

  return (
    <div className="add-edit-container">
      <h1>{id ? "Edit Order" : "Add Order"}</h1>
      <form className="add-edit-form" onSubmit={handleSubmit}>
        <label>Order #</label>
        <input
          type="text"
          name="orderNum"
          value={order.orderNum}
          onChange={handleInputChange}
          disabled
        />

        <label>Date</label>
        <input
          type="date"
          name="date"
          value={order.date}
          onChange={handleInputChange}
        />

        <label># Products</label>
        <input
          type="number"
          name="products"
          value={order.products}
          onChange={handleInputChange}
        />

        <label>Final Price</label>
        <input
          type="number"
          name="price"
          value={order.price}
          onChange={handleInputChange}
        />

        <label>Status</label>
        <select name="status" value={order.status} onChange={handleInputChange}>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <button className="save-order-btn" type="submit">
          Save Order
        </button>
      </form>
    </div>
  );
};

export default AddEditOrder;
