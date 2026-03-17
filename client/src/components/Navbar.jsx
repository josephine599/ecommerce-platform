// Navbar.jsx
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/cartContext";
import "./navbar.css";

export default function Navbar() {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(() => {
    const info = localStorage.getItem("userInfo");
    return info ? JSON.parse(info) : null;
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("cart");
    setUserInfo(null);
    navigate("/login");
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <>
      {/* Top Banner */}
      <div className="top-banner">
        <span>Welcome to JozeyStore - Quality Products at Best Prices</span>
        
        <span>📞 Call: +254 703 290 162</span>
      </div>

      <nav className="navbar">
        <div className="nav-top">
          <div className="container" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div className="logo-section" onClick={() => navigate("/")} style={{ cursor: 'pointer' }}>
              <span className="logo-icon">🛍️</span>
              <h2 className="logo">JozeyStore</h2>
            </div>
            
            <div className="nav-top-links">
              <span>💳 Payment Options</span>
              <span>🚚 Track Order</span>
              <span>❓ Help</span>
            </div>
          </div>
        </div>

        <div className="nav-search">
          <div className="container">
            <input 
              type="text" 
              placeholder="Search products, brands and categories..." 
              className="search-input"
            />
            <button className="search-btn">Search</button>
          </div>
        </div>

        <div className="nav-bottom">
          <div className="container nav-content">
            <div className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
              <a href="/" className="nav-link">Categories</a>
              {userInfo && (
                <>
                  <a href="/cart" className="cart-link">
                    <span className="cart-icon">🛒</span>
                    <span>Cart</span>
                    {cart.length > 0 && (
                      <>
                        <span className="cart-count">{cart.length}</span>
                        <span className="cart-price">KES {totalPrice.toLocaleString()}</span>
                      </>
                    )}
                  </a>
                </>
              )}
              {userInfo ? (
                <>
                  <div className="user-welcome">👤 {userInfo.name}</div>
                  <button className="logout-btn" onClick={handleLogout}>Logout</button>
                </>
              ) : (
                <>
                  <a href="/login" className="nav-link">Login</a>
                  <a href="/register" className="nav-link signup-btn">Sign Up</a>
                </>
              )}
            </div>

            <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              ☰
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}