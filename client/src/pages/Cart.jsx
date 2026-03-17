import { useContext } from "react";
import { CartContext } from "../context/cartContext";

function Cart() {

  const { cart, setCart } = useContext(CartContext);

  const removeItem = (id) => {

    const updated = cart.filter(item => item._id !== id);

    setCart(updated);

    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  return (

    <div className="container">

      <h1>Your Cart</h1>

      {cart.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', background: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <p style={{ fontSize: '1.125rem', color: '#64748b', marginBottom: '2rem' }}>Your cart is empty</p>
          <a href="/" style={{ color: '#0ea5e9', fontWeight: '600', textDecoration: 'underline' }}>Continue Shopping</a>
        </div>
      ) : (
        <>
          {cart.map(item => (

            <div className="cart-item" key={item._id}>

              <div>

                <h3>{item.name}</h3>

                <p>{item.qty} x KES {item.price}</p>

              </div>

              <button
                onClick={() => removeItem(item._id)}
                className="remove-btn"
              >
                Remove
              </button>

            </div>

          ))}

          <div className="total-section">
            <h2 style={{ marginBottom: '1.5rem', textAlign: 'right' }}>Total: KES {total}</h2>
            <button
              onClick={() => window.location.href = "/checkout"}
              style={{
                marginTop: "1.5rem",
                padding: "12px 32px",
                background: "linear-gradient(135deg, #0ea5e9, #06b6d4)",
                color: "white",
                border: "none",
                borderRadius: "6px",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease",
                display: "block",
                marginLeft: "auto"
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 4px 12px rgba(14, 165, 233, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}

    </div>
  );
}

export default Cart;