import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/cartContext";

function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("mpesa");
  const [loading, setLoading] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const processOrder = async (paymentData) => {
    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          items: cart,
          total,
          paymentMethod,
          paymentData
        }),
      });

      if (response.ok) {
        const orderData = await response.json();
        setSuccess("Order placed successfully!");
        clearCart();
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        throw new Error("Failed to create order");
      }
    } catch (err) {
      setError("Error placing order: " + err.message);
    }
  };

  const handleMpesaPayment = async (e) => {
    e.preventDefault();
    setPaymentProcessing(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost:5000/api/mpesa/stkpush", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: formData.phone,
          amount: total,
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName
        }),
      });

      const data = await response.json();

      if (response.ok && data.checkoutRequestId) {
        setSuccess("📱 Check your phone for the M-Pesa prompt!");
        // Simulate waiting for callback
        setTimeout(() => {
          processOrder({
            checkoutRequestId: data.checkoutRequestId,
            amount: total
          });
        }, 3000);
      } else {
        setError(data.error || "Failed to initiate M-Pesa payment");
      }
    } catch (err) {
      setError("Payment initiation failed: " + err.message);
    } finally {
      setPaymentProcessing(false);
    }
  };

  const handleCardPayment = async (e) => {
    e.preventDefault();
    setPaymentProcessing(true);
    // Simulate card payment processing
    setTimeout(() => {
      processOrder({ method: "card", amount: total });
      setPaymentProcessing(false);
    }, 2000);
  };

  const handleSubmit = async (e) => {
    if (paymentMethod === "mpesa") {
      handleMpesaPayment(e);
    } else if (paymentMethod === "card") {
      handleCardPayment(e);
    } else {
      e.preventDefault();
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '3rem 0' }}>
        <h2>Your cart is empty</h2>
        <button onClick={() => navigate("/")} style={{
          marginTop: '1rem',
          padding: '10px 20px',
          background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: '600'
        }}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
      <h1 style={{ marginBottom: '2rem', fontSize: '2.5rem', fontWeight: '800' }}>🛒 Checkout</h1>

      {error && <div style={{
        background: '#fee2e2',
        color: '#991b1b',
        padding: '1rem',
        borderRadius: '6px',
        marginBottom: '1rem',
        border: '1px solid #fca5a5'
      }}>❌ {error}</div>}

      {success && <div style={{
        background: '#dcfce7',
        color: '#166534',
        padding: '1rem',
        borderRadius: '6px',
        marginBottom: '1rem',
        border: '1px solid #86efac'
      }}>✅ {success}</div>}

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '2rem',
        marginTop: '2rem'
      }}>
        {/* Order Summary */}
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          border: '2px solid #e2e8f0',
          height: 'fit-content',
          position: 'sticky',
          top: '100px'
        }}>
          <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', fontWeight: '700' }}>📦 Order Summary</h3>
          
          {cart.map(item => (
            <div key={item._id} style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '1rem',
              paddingBottom: '1rem',
              borderBottom: '1px solid #f1f5f9'
            }}>
              <div>
                <p style={{ fontWeight: '600', marginBottom: '0.25rem' }}>{item.name}</p>
                <p style={{ fontSize: '0.875rem', color: '#64748b' }}>×{item.qty} @ KES {item.price.toLocaleString()}</p>
              </div>
              <p style={{ fontWeight: '700', color: '#0ea5e9' }}>KES {(item.price * item.qty).toLocaleString()}</p>
            </div>
          ))}

          <div style={{
            marginTop: '1.5rem',
            paddingTop: '1.5rem',
            borderTop: '2px solid #0ea5e9'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '1.5rem',
              fontWeight: '800'
            }}>
              <span>Total</span>
              <span style={{ background: 'linear-gradient(135deg, #0ea5e9, #e84c3d)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                KES {total.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Checkout Form */}
        <div>
          <form onSubmit={handleSubmit} style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            border: '1px solid #e2e8f0',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <h3 style={{ marginBottom: '0.5rem', fontSize: '1.25rem', fontWeight: '700' }}>📋 Shipping Information</h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                required
                value={formData.firstName}
                onChange={handleChange}
                style={{
                  padding: '10px',
                  borderRadius: '6px',
                  border: '1px solid #e2e8f0',
                  fontSize: '1rem'
                }}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                required
                value={formData.lastName}
                onChange={handleChange}
                style={{
                  padding: '10px',
                  borderRadius: '6px',
                  border: '1px solid #e2e8f0',
                  fontSize: '1rem'
                }}
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email address"
              required
              value={formData.email}
              onChange={handleChange}
              style={{
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #e2e8f0',
                fontSize: '1rem'
              }}
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone number (Format: 0712345678 or 254712345678)"
              required
              value={formData.phone}
              onChange={handleChange}
              style={{
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #e2e8f0',
                fontSize: '1rem'
              }}
            />

            <input
              type="text"
              name="address"
              placeholder="Street address"
              required
              value={formData.address}
              onChange={handleChange}
              style={{
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #e2e8f0',
                fontSize: '1rem'
              }}
            />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <input
                type="text"
                name="city"
                placeholder="City"
                required
                value={formData.city}
                onChange={handleChange}
                style={{
                  padding: '10px',
                  borderRadius: '6px',
                  border: '1px solid #e2e8f0',
                  fontSize: '1rem'
                }}
              />
              <input
                type="text"
                name="postalCode"
                placeholder="Postal code"
                required
                value={formData.postalCode}
                onChange={handleChange}
                style={{
                  padding: '10px',
                  borderRadius: '6px',
                  border: '1px solid #e2e8f0',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div style={{ marginTop: '1rem' }}>
              <h4 style={{ marginBottom: '1rem', fontWeight: '700' }}>💳 Payment Method</h4>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="mpesa"
                    checked={paymentMethod === "mpesa"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    style={{ marginRight: '0.5rem', cursor: 'pointer' }}
                  />
                  <span>📞 M-Pesa</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    style={{ marginRight: '0.5rem', cursor: 'pointer' }}
                  />
                  <span>💳 Card</span>
                </label>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading || paymentProcessing} 
              style={{
                background: paymentProcessing ? '#cbd5e1' : 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
                color: 'white',
                padding: '12px 24px',
                border: 'none',
                borderRadius: '6px',
                cursor: paymentProcessing ? 'not-allowed' : 'pointer',
                fontWeight: '600',
                fontSize: '1rem',
                marginTop: '1rem',
                transition: 'all 0.3s ease'
              }}
            >
              {paymentProcessing ? "⏳ Processing..." : `💰 Pay KES ${total.toLocaleString()}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Checkout;