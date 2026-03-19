import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/cartContext";

const API_BASE_URL = import.meta.env.VITE_API_URL || (
  typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? 'http://localhost:5000'
    : `${window.location.protocol}//${window.location.hostname}`
);

function ProductDetail() {

  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetch(`${API_BASE_URL}/api/products`)
      .then(res => res.json())
      .then(data => {
        const found = data.find(p => p._id === id);
        setProduct(found);
        setLoading(false);
      })
      .catch(() => setLoading(false));

  }, [id]);

  if (loading) return (
    <div className="container" style={{ textAlign: 'center', padding: '4rem 0' }}>
      <p style={{ fontSize: '1.125rem', color: '#64748b' }}>Loading product...</p>
    </div>
  );

  if (!product) return (
    <div className="container" style={{ textAlign: 'center', padding: '4rem 0' }}>
      <p style={{ fontSize: '1.125rem', color: '#64748b', marginBottom: '1rem' }}>Product not found</p>
      <button 
        onClick={() => navigate('/')}
        style={{
          background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: '600'
        }}
      >
        Back to Products
      </button>
    </div>
  );

  return (

    <div className="container">

      <button 
        onClick={() => navigate('/')}
        style={{
          background: 'transparent',
          color: '#0ea5e9',
          padding: '8px 0',
          border: 'none',
          cursor: 'pointer',
          fontWeight: '600',
          fontSize: '0.9rem',
          marginBottom: '2rem'
        }}
      >
        ← Back to Products
      </button>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '3rem',
        marginTop: '2rem'
      }}>
        {/* Product Image */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          border: '1px solid #e2e8f0'
        }}>
          <img
            src={`https://picsum.photos/500?random=${product._id}`}
            alt={product.name}
            style={{
              width: '100%',
              height: '500px',
              objectFit: 'cover',
              display: 'block'
            }}
          />
        </div>

        {/* Product Details */}
        <div>
          <h1 style={{ marginBottom: '1rem', fontSize: '2rem' }}>{product.name}</h1>

          <p style={{
            fontSize: '1rem',
            color: '#64748b',
            lineHeight: '1.8',
            marginBottom: '2rem'
          }}>
            {product.description}
          </p>

          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            border: '1px solid #e2e8f0'
          }}>
            {/* Price */}
            <div style={{ marginBottom: '2rem', paddingBottom: '2rem', borderBottom: '1px solid #f1f5f9' }}>
              <p style={{ color: '#64748b', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Price</p>
              <h2 style={{ 
                fontSize: '2rem',
                fontWeight: '700',
                color: '#0ea5e9',
                margin: '0'
              }}>
                KES {product.price}
              </h2>
            </div>

            {/* Quantity Selector */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '600' }}>Quantity</label>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  style={{
                    background: '#f1f5f9',
                    border: '1px solid #cbd5e1',
                    width: '40px',
                    height: '40px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#0ea5e9';
                    e.target.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = '#f1f5f9';
                    e.target.style.color = 'inherit';
                  }}
                >
                  −
                </button>
                <input
                  type="number"
                  value={qty}
                  min="1"
                  onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
                  style={{
                    width: '60px',
                    padding: '8px',
                    textAlign: 'center',
                    border: '1px solid #cbd5e1',
                    borderRadius: '6px',
                    fontSize: '1rem'
                  }}
                />
                <button
                  onClick={() => setQty(qty + 1)}
                  style={{
                    background: '#f1f5f9',
                    border: '1px solid #cbd5e1',
                    width: '40px',
                    height: '40px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#0ea5e9';
                    e.target.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = '#f1f5f9';
                    e.target.style.color = 'inherit';
                  }}
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={() => {
                addToCart({ ...product, qty });
                navigate('/cart');
              }}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
                color: 'white',
                padding: '12px 24px',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '1rem',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 4px 12px rgba(14, 165, 233, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

export default ProductDetail;