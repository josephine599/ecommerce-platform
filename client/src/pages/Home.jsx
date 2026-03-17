import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load products");
        setLoading(false);
        console.error("Product loading error:", err);
      });
  }, []);

  const categories = [
    { icon: '🏢', name: 'Official Stores' },
    { icon: '📱', name: 'Phones & Tablets' },
    { icon: '📺', name: 'TVs & Audio' },
    { icon: '⚙️', name: 'Computing' },
    { icon: '🎮', name: 'Gaming' },
    { icon: '⌚', name: 'Wearables' },
    { icon: '🏠', name: 'Home & Office' },
    { icon: '💻', name: 'Accessories' },
  ];

  return (
    <div style={{ width: '100%', overflow: 'hidden' }}>
      {/* Hero Banner */}
      <div className="hero-banner">
        <h2>TECH WEEK</h2>
        <div className="promo">UP TO 70% OFF</div>
      </div>

      <div className="container">
        {/* Main Layout */}
        <div className="home-wrapper">
          {/* Sidebar */}
          <div className="sidebar">
            {categories.map((cat, idx) => (
              <div key={idx} className="sidebar-item">
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </div>
            ))}
          </div>

          {/* Content */}
          <div className="content">
            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ 
                fontSize: '2rem', 
                fontWeight: '800', 
                marginBottom: '0.5rem',
                color: '#1a1a1a'
              }}>⭐ Featured Products</h2>
              <p style={{ fontSize: '1rem', color: '#666', marginBottom: '1rem' }}>
                Explore our premium gadgets and accessories with up to 70% discount
              </p>
            </div>

            {error && (
              <div style={{ 
                background: '#fee2e2', 
                color: '#991b1b', 
                padding: '1rem', 
                borderRadius: '6px',
                marginBottom: '1rem'
              }}>
                {error}
              </div>
            )}

            {loading ? (
              <div style={{ textAlign: 'center', padding: '3rem' }}>
                <p style={{ fontSize: '1.125rem', color: '#64748b' }}>⏳ Loading products...</p>
              </div>
            ) : products.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem' }}>
                <p style={{ fontSize: '1.125rem', color: '#64748b' }}>No products available</p>
              </div>
            ) : (
              <div className="products-grid">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;