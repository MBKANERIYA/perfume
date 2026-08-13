import { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';

export default function ProductHero({ product }) {
  const { addToCart } = useCart();
  const [activeImage, setActiveImage] = useState(product?.image);
  const [quantity, setQuantity] = useState(1);

  // Update active image if product changes
  useEffect(() => {
    if (product) setActiveImage(product.image);
  }, [product]);

  const increaseQuantity = () => setQuantity(q => q + 1);
  const decreaseQuantity = () => setQuantity(q => (q > 1 ? q - 1 : 1));

  if (!product) return null;

  // Use product images if available, otherwise fallback to single image
  const images = product.images || [product.image];

  return (
    <section className="w-full bg-white px-4 md:px-10 py-10 max-w-[1400px] mx-auto">
      <div className="flex flex-col md:flex-row gap-10">
        
        {/* Left Side: Image Gallery */}
        <div className="w-full md:w-3/5 flex flex-col-reverse md:flex-row gap-4">
          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto md:w-[100px] shrink-0 no-scrollbar">
              {images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-20 h-20 md:w-full md:h-[100px] shrink-0 border-2 transition-all flex items-center justify-center ${
                    activeImage === img ? 'border-gold' : 'border-transparent'
                  } bg-[#f3e7db]`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-contain p-1" />
                </button>
              ))}
            </div>
          )}
          
          {/* Main Image */}
          <div className="w-full aspect-square md:aspect-auto md:h-[600px] bg-[#f3e7db] relative flex items-center justify-center">
            <span className="absolute top-4 left-4 bg-black text-white text-xs font-bold px-2 py-1 tracking-wider z-10">
              NEW
            </span>
            <img src={activeImage} alt="Main Product" className="w-full h-full object-contain p-4" />
          </div>
        </div>

        {/* Right Side: Product Details */}
        <div className="w-full md:w-2/5 flex flex-col justify-center">
          
          <h1 className="font-bebas text-5xl md:text-6xl tracking-wider text-black m-0 mb-2 uppercase">
            {product.title} - 100 ML
          </h1>
          
          {/* Reviews */}
          <div className="flex items-center gap-2 mb-6">
            <div className="flex text-gold text-lg">
              ★★★★☆
            </div>
            <span className="text-gray-500 text-sm font-montserrat mt-1">({product.rating}/5) {product.reviews} Reviews</span>
          </div>

          {/* Pricing */}
          <div className="flex items-end gap-3 mb-6">
            <span className="font-bebas text-4xl text-black">₹{product.price}</span>
            <span className="font-bebas text-2xl text-gray-400 line-through mb-1">₹{product.originalPrice}</span>
            <span className="font-bebas text-xl text-gold mb-1 tracking-wider uppercase ml-2">
              {product.discount}
            </span>
          </div>

          {/* Perfume Notes Quick Info */}
          <div className="mb-8">
            <h3 className="font-bebas text-xl tracking-wider text-black mb-2 uppercase">PERFUME NOTES:</h3>
            <p className="font-montserrat text-gray-700 text-sm leading-relaxed">
              <strong>Top:</strong> {product.fullNotes.top} <br/>
              <strong>Heart:</strong> {product.fullNotes.heart} <br/>
              <strong>Base:</strong> {product.fullNotes.base}
            </p>
          </div>

          {/* Add to Cart Actions */}
          <div className="flex gap-4 mb-8">
            {/* Quantity Selector */}
            <div className="flex items-center border border-gray-300">
              <button 
                onClick={decreaseQuantity}
                className="w-12 h-12 flex items-center justify-center text-black hover:bg-gray-100 transition font-bold"
              >
                -
              </button>
              <span className="w-12 text-center font-montserrat font-semibold">{quantity}</span>
              <button 
                onClick={increaseQuantity}
                className="w-12 h-12 flex items-center justify-center text-black hover:bg-gray-100 transition font-bold"
              >
                +
              </button>
            </div>

            {/* Add to Cart Button */}
            <button 
              onClick={() => addToCart(product, quantity)}
              className="flex-1 bg-black text-white hover:bg-gold transition-colors duration-300 font-bebas text-2xl tracking-widest uppercase"
            >
              ADD TO CART - ₹{product.price * quantity}
            </button>
          </div>
          
          {/* Trust Badges */}
          <div className="grid grid-cols-2 gap-4 border-t border-gray-200 pt-6 mt-2">
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-montserrat text-xs text-gray-600 uppercase font-bold tracking-wider">Free Shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-montserrat text-xs text-gray-600 uppercase font-bold tracking-wider">Long Lasting</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
