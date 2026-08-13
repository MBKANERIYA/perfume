import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  return (
    <div className="flex flex-col h-full bg-white group border border-transparent hover:border-gold/20 hover:shadow-lg transition-all duration-300">
      
      {/* Image Container with Badges */}
      <div className="relative w-full aspect-square bg-[#f3e7db] overflow-hidden flex-shrink-0">
        {/* Top Left Badge */}
        {product.badge && (
          <div className="absolute top-2 left-2 bg-black text-gold text-[10px] font-bold uppercase tracking-wider px-2 py-1 z-10 font-montserrat">
            {product.badge}
          </div>
        )}
        
        {/* Product Image */}
        <Link to={`/product/${product.slug || product.id}`} className="block w-full h-full">
          <img 
            src={product.image} 
            alt={product.title}
            className="w-full h-full object-contain p-4 mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* Rating Badge (Bottom Left) */}
        <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 flex items-center gap-1 z-10 shadow-sm">
          <span className="text-gold text-sm">✦</span>
          <span className="text-black font-montserrat text-xs font-bold">{product.rating}</span>
          <span className="text-gray-500 font-montserrat text-[10px]">({product.reviews})</span>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Title & Notes */}
        <Link to={`/product/${product.slug || product.id}`} className="text-decoration-none block mb-1">
          <h3 className="font-bebas text-xl md:text-[22px] tracking-wide text-black uppercase m-0 group-hover:text-gold transition-colors duration-300 line-clamp-2">
            {product.title}
          </h3>
        </Link>
        <p className="font-montserrat text-gray-500 text-[11px] mb-3 line-clamp-1">
          {product.notes}
        </p>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4 font-montserrat">
          <span className="text-black font-bold text-[17px]">₹{product.price}</span>
          {product.originalPrice && (
            <span className="text-gray-400 line-through text-[13px]">₹{product.originalPrice}</span>
          )}
          {product.discount && (
            <span className="text-gold-dark font-bold text-[12px]">{product.discount}</span>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {product.tags && product.tags.map((tag, index) => (
            <span key={index} className="bg-gray-100 text-gray-600 font-montserrat text-[10px] px-2 py-1 rounded-sm">
              {tag}
            </span>
          ))}
        </div>

        {/* Add to Cart Button */}
        <button 
          onClick={() => addToCart(product, 1)}
          className="w-full bg-black text-white font-bebas tracking-widest uppercase py-3 hover:bg-gold transition-colors duration-300"
        >
          ADD TO CART
        </button>
      </div>

    </div>
  );
}
