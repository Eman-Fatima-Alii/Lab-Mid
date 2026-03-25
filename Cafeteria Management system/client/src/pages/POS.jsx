import React, { useState, useEffect } from 'react';
import api from '../api/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import { ShoppingCart, CreditCard, Wallet, Smartphone, Plus, Minus, Trash2, Receipt, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from 'emailjs-com';

const POS = () => {
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [paymentDetails, setPaymentDetails] = useState({ number: '', txnId: '' });
  const { user } = useAuth();

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const res = await api.get('/menu');
      setMenu(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addToCart = (item) => {
    const existing = cart.find(c => c.id === item.id);
    if (existing) {
      setCart(cart.map(c => c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const total = subtotal - (subtotal * (discount / 100));

  const handlePlaceOrder = async () => {
    if (cart.length === 0) return alert('Cart is empty');
    
    try {
      await api.post('/orders', {
        userId: user.id,
        items: cart,
        total: subtotal,
        discount: discount,
        finalAmount: total,
        paymentMethod,
        paymentDetails,
        status: 'completed'
      });
      alert('Order Placed Successfully!');
      setCart([]);
      setPaymentDetails({ number: '', txnId: '' });
    } catch (err) {
      alert('Order failed: ' + err.message);
    }
  };

  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Menu Area */}
      <div className="lg:col-span-3 space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-extrabold flex items-center gap-3">
            <Receipt className="text-primary" size={32} /> POS Terminal
          </h2>
          <div className="flex gap-4">
             {['Fast Food', 'Beverages', 'Desserts'].map(cat => (
               <button key={cat} className="px-4 py-2 glass-card text-sm font-semibold hover:bg-primary/20 transition-all">
                 {cat}
               </button>
             ))}
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {menu.map(item => (
            <motion.div 
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
              key={item.id}
              onClick={() => addToCart(item)}
              className="glass-card p-6 cursor-pointer relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-100 transition-opacity">
                <Plus size={24} className="text-primary" />
              </div>
              <h3 className="font-bold text-xl mb-1">{item.name}</h3>
              <p className="text-text-secondary text-sm mb-4">{item.category}</p>
              <div className="flex justify-between items-baseline">
                <p className="text-2xl font-black text-primary">Rs. {item.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Cart Area */}
      <div className="glass-panel p-8 sticky top-32 h-[calc(100vh-160px)] flex flex-col shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 border-b border-glass-border pb-4">Cart</h2>
        
        <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
          <AnimatePresence>
            {cart.map(item => (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={item.id} 
                className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-glass-border"
              >
                <div className="flex-1">
                  <p className="font-bold">{item.name}</p>
                  <p className="text-xs text-text-secondary">Rs. {item.price}</p>
                </div>
                <div className="flex items-center gap-3 bg-black/20 p-1.5 rounded-xl">
                  <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:text-primary bg-white/5 rounded-lg"><Minus size={12}/></button>
                  <span className="font-bold text-sm min-w-[20px] text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:text-primary bg-white/5 rounded-lg"><Plus size={12}/></button>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="p-2 text-danger hover:bg-danger/10 rounded-xl transition-all"><Trash2 size={16}/></button>
              </motion.div>
            ))}
          </AnimatePresence>
          {cart.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full opacity-40">
              <ShoppingCart size={64} className="mb-4" />
              <p className="font-medium">Empty Cart</p>
            </div>
          )}
        </div>

        <div className="mt-6 pt-6 border-t border-glass-border space-y-4">
          <div className="flex justify-between font-medium">
            <span className="text-text-secondary">Subtotal</span>
            <span>Rs. {subtotal}</span>
          </div>
          <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-glass-border">
            <span className="text-sm font-semibold">Special Discount (%)</span>
            <input 
              type="number" 
              className="w-16 bg-transparent text-right font-bold outline-none text-primary"
              value={discount}
              onChange={(e) => setDiscount(Number(e.target.value))}
            />
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-lg font-bold">Grand Total</span>
            <span className="text-3xl font-black gradient-text">Rs. {total.toFixed(0)}</span>
          </div>

          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => setPaymentMethod('cash')}
                className={`p-3 rounded-xl flex items-center justify-center gap-2 text-xs font-bold border transition-all ${paymentMethod === 'cash' ? 'bg-primary border-primary text-white shadow-lg' : 'border-glass-border hover:bg-white/5'}`}
              >
                <Wallet size={16}/> CASH
              </button>
              <button 
                onClick={() => setPaymentMethod('jazzcash')}
                className={`p-3 rounded-xl flex items-center justify-center gap-2 text-xs font-bold border transition-all ${paymentMethod === 'jazzcash' ? 'bg-secondary border-secondary text-white shadow-lg' : 'border-glass-border hover:bg-white/5'}`}
              >
                <Smartphone size={16}/> MOBILE
              </button>
            </div>

            {paymentMethod !== 'cash' && (
              <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} className="space-y-3 pt-2">
                <input 
                  type="text" placeholder="Account Number" className="modern-input py-3 text-sm"
                  value={paymentDetails.number} onChange={(e) => setPaymentDetails({...paymentDetails, number: e.target.value})}
                />
                <input 
                  type="text" placeholder="Transaction Hash/ID" className="modern-input py-3 text-sm"
                  value={paymentDetails.txnId} onChange={(e) => setPaymentDetails({...paymentDetails, txnId: e.target.value})}
                />
              </motion.div>
            )}
          </div>

          <button 
            onClick={handlePlaceOrder}
            disabled={cart.length === 0}
            className="btn-vibrant w-full py-5 text-lg shadow-xl disabled:grayscale disabled:opacity-50"
          >
            Settle Order <ArrowRight size={22} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default POS;
