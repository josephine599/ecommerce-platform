// Products.jsx
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./Product.css";

export default function Products({ products }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="container">
      <h1 className="title">Our Products</h1>

      <div className="grid">
        {products.map((p) => (
          <div className="card" key={p._id}>
            <img src={p.image} alt={p.name} />

            <div className="card-body">
              <h3>{p.name}</h3>
              <p>{p.description}</p>

              <div className="card-bottom">
                <span>KES {p.price}</span>
                <button onClick={() => addToCart(p)}>Add</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}