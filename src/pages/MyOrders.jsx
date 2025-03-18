import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/index.css";

const MyOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("https://backend-fractal-o8jg.onrender.com/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);

  const deleteOrder = (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      fetch(`https://backend-fractal-o8jg.onrender.com/orders/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then(() => {
          setOrders((prevOrders) =>
            prevOrders.filter((order) => order.id !== id)
          );
        })
        .catch((error) => console.error("Error deleting order:", error));
    }
  };

  return (
    <div className="container">
      <h1>My Orders</h1>
      <button onClick={() => navigate("/add-order")} className="btn">
        Add Order
      </button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Order #</th>
            <th>Date</th>
            <th># Products</th>
            <th>Final Price</th>
            <th>Status</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.order}</td>
              <td>{order.date}</td>
              <td>{order.products}</td>
              <td>${order.price}</td>
              <td>{order.status}</td>
              <td>
                <button onClick={() => navigate(`/edit-order/${order.id}`)}>
                  Edit
                </button>
                <button onClick={() => deleteOrder(order.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrders;
