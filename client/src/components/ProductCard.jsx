import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/cartContext";
import "./Product.css";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  // Ensure image URL is always valid with unique ID for cache-busting
  const baseImageUrl = product.image && product.image.trim() 
    ? product.image 
    : `https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop`;
  
  // Add product ID to URL to ensure unique loading for each product
  const imageUrl = baseImageUrl.includes('?') 
    ? `${baseImageUrl}&id=${product._id || Math.random()}` 
    : `${baseImageUrl}?id=${product._id || Math.random()}`;

  return (
    <div className="product-card">
      <img
        src={imageUrl}
        alt={product.name || "Product"}
        onClick={() => navigate(`/product/${product._id}`)}
        style={{ cursor: 'pointer' }}
        onError={(e) => {
          e.target.src = `https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop&id=${product._id || 'fallback'}`;
        }}
      />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <div className="product-bottom">
        <span>KES {product.price ? product.price.toLocaleString() : '0'}</span>
        <button onClick={() => addToCart(product)}>
          🛒 Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;