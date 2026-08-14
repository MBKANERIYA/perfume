import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { allProducts } from '../../data/products';
import { Link } from 'react-router-dom';
import { loadScript } from '../../utils/loadScript';
import { useState } from 'react';

export default function CartSidebar() {
  const { isCartOpen, setIsCartOpen, cartItems, updateQuantity, removeFromCart, cartTotal, originalTotal, clearCart } = useCart();
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock cross-sell products from allProducts (e.g. grab 3 of them)
  const crossSellProducts = allProducts.slice(0, 3);
  
  // Free shipping logic (mock goal ₹2000)
  const freeShippingGoal = 2000;
  const amountLeft = freeShippingGoal - cartTotal;
  const progressPercent = Math.min((cartTotal / freeShippingGoal) * 100, 100);

  const handleCheckout = async () => {
    if (cartTotal <= 0) return;
    
    setIsProcessing(true);
    
    // 1. Load Razorpay script
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      setIsProcessing(false);
      return;
    }

    try {
      // 2. Create order on the backend
      const result = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: cartTotal }),
      });
      
      const order = await result.json();

      if (!order || !order.id) {
        alert('Server error. Please try again.');
        setIsProcessing(false);
        return;
      }

      // 3. Initialize Razorpay
      const options = {
        key: 'rzp_test_Sp8ow2u4uVKQIl', // Hardcoded for frontend as per standard test setup, or fetch from backend
        amount: order.amount,
        currency: order.currency,
        name: 'KIZ Perfumes',
        description: 'Store Purchase',
        image: '/logo.png',
        order_id: order.id,
        handler: async function (response) {
          // 4. Verify Payment on backend
          const verifyResult = await fetch('/api/payment/verify', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });
          
          const verifyData = await verifyResult.json();
          
          if (verifyResult.ok) {
            alert('Payment successful! Your order has been placed.');
            // Clear cart
            clearCart();
            setIsCartOpen(false);
          } else {
            alert('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: user?.name || '',
          email: user?.email || '',
          contact: user?.phone || '',
        },
        theme: {
          color: '#000000',
        },
      };

      const paymentObject = new window.Razorpay(options);
      
      paymentObject.on('payment.failed', function (response) {
        alert('Payment Failed: ' + response.error.description);
      });
      
      paymentObject.open();
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Something went wrong during checkout.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-[100000] backdrop-blur-sm transition-opacity duration-700 ${isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-[400px] bg-white z-[100001] flex flex-col shadow-2xl transition-transform duration-700 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="font-bebas text-2xl uppercase tracking-widest m-0 flex items-center gap-2">
            YOUR CART <span className="bg-red-600 text-white font-sans font-bold text-[11px] w-5 h-5 rounded-full inline-flex items-center justify-center pb-[2px] pl-[2px]">{cartItems.length}</span>
          </h2>
          <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-black">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex-1 p-8 flex flex-col items-center justify-center text-center">
            <h2 className="font-bebas text-4xl mb-4">YOUR CART</h2>
            <p className="font-montserrat text-gray-500 text-sm mb-6">Your cart is currently empty.</p>
            <button onClick={() => setIsCartOpen(false)} className="border-b border-black text-black font-montserrat text-sm uppercase tracking-widest pb-1 hover:text-gold hover:border-gold transition-colors">
              Continue shopping &rarr;
            </button>
          </div>
        ) : (
          <>

            {/* Scrollable Content Wrapper */}
            <div className="flex-1 overflow-y-auto custom-scrollbar" data-lenis-prevent="true">
              
              {/* Cart Items */}
              <div className="p-5 flex flex-col gap-6">
                {cartItems.map(item => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-20 h-24 bg-[#f3e7db] flex-shrink-0 flex items-center justify-center p-2">
                      <img src={item.image} alt={item.title || item.name} className="max-w-full max-h-full object-contain" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-bebas text-lg leading-tight uppercase m-0">{item.title || item.name}</h4>
                      </div>
                      <div className="flex justify-between items-end mt-2">
                        <div className="flex items-center border border-gray-300 rounded-sm">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100">-</button>
                          <span className="w-8 text-center font-montserrat text-xs font-semibold">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100">+</button>
                        </div>
                        <div className="text-right">
                          {item.originalPrice && (
                            <span className="text-gray-400 line-through text-xs mr-2">₹{item.originalPrice}</span>
                          )}
                          <span className="font-bebas text-xl">₹{item.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cross-Sell Section */}
              <div className="bg-gray-50 p-5 border-t border-gray-200">
                <h3 className="font-bebas text-sm tracking-widest uppercase mb-4 text-gray-600">RELEVANT PRODUCTS</h3>
                <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar" data-lenis-prevent="true">
                  {crossSellProducts.map(prod => (
                    <div key={prod.id} className="min-w-[120px] bg-white border border-gray-100 p-2 flex flex-col">
                      <div className="w-full aspect-square bg-[#f3e7db] mb-2 p-2">
                        <img src={prod.image} alt={prod.title} className="w-full h-full object-contain" />
                      </div>
                      <h5 className="font-bebas text-sm uppercase truncate m-0">{prod.title}</h5>
                      <div className="flex items-center gap-1 mt-1 mb-2">
                        <span className="font-bebas text-sm">₹{prod.price}</span>
                      </div>
                      <Link to={`/product/${prod.slug}`} onClick={() => setIsCartOpen(false)} className="w-full py-1 text-center border border-black text-xs font-montserrat uppercase font-bold tracking-wider hover:bg-black hover:text-white transition-colors">
                        VIEW
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Summary */}
            <div className="p-5 border-t border-gray-200 bg-white">
              <div className="flex justify-between items-center mb-1">
                <span className="font-montserrat text-xs font-bold text-gray-600">Total Price</span>
                <span className="font-bebas text-2xl">₹{cartTotal}</span>
              </div>
              {originalTotal > cartTotal && (
                <div className="flex justify-end mb-4">
                  <span className="text-green-600 font-montserrat text-xs font-bold">You Save ₹{originalTotal - cartTotal}</span>
                </div>
              )}
              <button 
                onClick={handleCheckout} 
                disabled={isProcessing}
                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-bebas text-xl tracking-widest uppercase py-4 transition-colors flex items-center justify-center gap-2 rounded"
              >
                {isProcessing ? 'PROCESSING...' : 'PROCEED TO CHECKOUT'} 
                {!isProcessing && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>}
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
