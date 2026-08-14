import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { loadScript } from '../../utils/loadScript';

export default function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user, setIsLoginOpen } = useAuth();
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('Razorpay');
  const [formData, setFormData] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ').slice(1).join(' ') || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  useEffect(() => {
    // If not logged in, redirect and open login
    if (!user) {
      navigate('/');
      setIsLoginOpen(true);
      return;
    }

    // If cart is empty, redirect back to shop
    if (cartItems.length === 0 && !isProcessing) {
      navigate('/shop-all');
    }
  }, [user, cartItems, navigate, isProcessing, setIsLoginOpen]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const createDatabaseOrder = async (paymentId = null) => {
    try {
      const orderData = {
        customer: formData,
        items: cartItems.map(item => ({
          productId: item.id || item._id,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        })),
        totalAmount: cartTotal,
        paymentMethod: paymentMethod,
        paymentId: paymentId
      };

      const result = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      
      return result.ok;
    } catch (error) {
      console.error('Error saving order:', error);
      return false;
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    if (cartTotal <= 0) return;
    
    setIsProcessing(true);

    if (paymentMethod === 'COD') {
      const success = await createDatabaseOrder();
      if (success) {
        alert('Order placed successfully via Cash on Delivery!');
        clearCart();
        navigate('/');
      } else {
        alert('Failed to place order. Please try again.');
      }
      setIsProcessing(false);
      return;
    }
    
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
        key: 'rzp_test_Sp8ow2u4uVKQIl', // Hardcoded for frontend test setup
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
          
          if (verifyResult.ok) {
            // 5. Save Order in DB
            const saved = await createDatabaseOrder(response.razorpay_payment_id);
            if (saved) {
              alert('Payment successful! Your order has been placed.');
              clearCart();
              navigate('/');
            } else {
              alert('Payment verified, but saving order failed. Contact support.');
            }
          } else {
            alert('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          contact: formData.phone,
        },
        notes: {
          address: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`,
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
    <div className="min-h-screen bg-gray-50 pt-32 pb-20 px-4 md:px-8 font-montserrat animate-fade-in">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
        
        {/* Left Column: Shipping Form */}
        <div className="flex-1">
          <div className="bg-white p-8 shadow-sm border border-gray-100 rounded-lg">
            <h2 className="font-bebas text-3xl mb-6 tracking-widest text-black border-b border-gray-200 pb-4">SHIPPING DETAILS</h2>
            
            <form id="checkout-form" onSubmit={handlePayment} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">First Name</label>
                  <input required type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-gold transition-colors text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Last Name</label>
                  <input required type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-gold transition-colors text-sm" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Email Address</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-gold transition-colors text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Phone Number</label>
                  <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-gold transition-colors text-sm" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Street Address</label>
                <input required type="text" name="address" value={formData.address} onChange={handleChange} className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-gold transition-colors text-sm" placeholder="House number and street name" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">City</label>
                  <input required type="text" name="city" value={formData.city} onChange={handleChange} className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-gold transition-colors text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">State</label>
                  <input required type="text" name="state" value={formData.state} onChange={handleChange} className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-gold transition-colors text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">PIN Code</label>
                  <input required type="text" name="pincode" value={formData.pincode} onChange={handleChange} className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-gold transition-colors text-sm" />
                </div>
              </div>

            </form>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="w-full lg:w-[400px]">
          <div className="bg-white p-8 shadow-sm border border-gray-100 rounded-lg sticky top-32">
            <h2 className="font-bebas text-3xl mb-6 tracking-widest text-black border-b border-gray-200 pb-4">ORDER SUMMARY</h2>
            
            <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
              {cartItems.map(item => (
                <div key={item.id} className="flex gap-4 items-center">
                  <div className="w-16 h-16 bg-[#f3e7db] flex items-center justify-center p-1 rounded">
                    <img src={item.image} alt={item.title} className="max-w-full max-h-full object-contain" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bebas text-md tracking-wider uppercase m-0 leading-tight">{item.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">Qty: {item.quantity}</p>
                  </div>
                  <div className="font-bebas text-lg">
                    ₹{item.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4 space-y-3 mb-6">
              <div className="flex justify-between text-sm text-gray-600 font-bold">
                <span>Subtotal</span>
                <span>₹{cartTotal}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600 font-bold">
                <span>Shipping</span>
                <span className="text-green-600">FREE</span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 mb-8">
              <div className="flex justify-between items-end">
                <span className="font-bebas text-xl tracking-widest text-black">TOTAL</span>
                <span className="font-bebas text-4xl text-black">₹{cartTotal}</span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6 mb-8">
              <h3 className="font-bebas text-xl mb-4 tracking-widest text-black">PAYMENT METHOD</h3>
              <div className="space-y-3">
                <label className={`block border ${paymentMethod === 'Razorpay' ? 'border-gold bg-gold/5' : 'border-gray-200'} rounded p-4 cursor-pointer transition-colors flex items-center gap-3`}>
                  <input type="radio" name="paymentMethod" value="Razorpay" checked={paymentMethod === 'Razorpay'} onChange={() => setPaymentMethod('Razorpay')} className="accent-gold w-4 h-4" />
                  <div className="flex-1">
                    <p className="font-bold text-sm text-black">Pay Online (Razorpay)</p>
                    <p className="text-xs text-gray-500">Credit Card, UPI, Net Banking</p>
                  </div>
                </label>
                <label className={`block border ${paymentMethod === 'COD' ? 'border-gold bg-gold/5' : 'border-gray-200'} rounded p-4 cursor-pointer transition-colors flex items-center gap-3`}>
                  <input type="radio" name="paymentMethod" value="COD" checked={paymentMethod === 'COD'} onChange={() => setPaymentMethod('COD')} className="accent-gold w-4 h-4" />
                  <div className="flex-1">
                    <p className="font-bold text-sm text-black">Cash on Delivery</p>
                    <p className="text-xs text-gray-500">Pay when your order arrives</p>
                  </div>
                </label>
              </div>
            </div>

            <button 
              type="submit"
              form="checkout-form"
              disabled={isProcessing || cartItems.length === 0}
              className="w-full bg-black hover:bg-gold disabled:bg-gray-400 text-white font-bebas text-2xl tracking-widest uppercase py-4 transition-colors duration-300 flex items-center justify-center gap-2 rounded"
            >
              {isProcessing ? 'PROCESSING...' : paymentMethod === 'COD' ? 'PLACE ORDER' : 'PAY NOW'} 
            </button>
            <p className="text-center text-[10px] text-gray-400 mt-4 uppercase tracking-widest flex items-center justify-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              Secure encrypted checkout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
