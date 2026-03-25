import React, { useState, useEffect } from 'react';
import api from '../api/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import { ShoppingBag, History, CheckCircle, Clock, Star, Gift, UtensilsCrossed } from 'lucide-react';
import { motion } from 'framer-motion';

const UserDashboard = () => {
  const [menu, setMenu] = useState([]);
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [menuRes, ordersRes] = await Promise.all([
        api.get('/menu'),
        api.get('/orders')
      ]);
      setMenu(menuRes.data);
      setOrders(ordersRes.data.filter(o => o.userId === user.id).reverse());
    } catch (err) {
      console.error(err);
    }
  };

  const categories = [...new Set(menu.map(item => item.category))];

  return (
    <div className="p-8 max-w-[1400px] mx-auto space-y-16">
      {/* Hero Welcome */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8"
      >
        <div className="z-10 space-y-4 text-center md:text-left">
          <h1 className="text-5xl font-black gradient-text">Exquisite Dining, {user.name}</h1>
          <p className="text-xl text-text-secondary max-w-xl">
            Savor the finest selections from our kitchen. Your gourmet journey starts here.
          </p>
          <div className="flex gap-4 pt-4 justify-center md:justify-start">
            <button className="btn-vibrant px-8">Order Now</button>
            <button className="px-8 py-3 glass-card font-bold border-glass-border">My Rewards</button>
          </div>
        </div>
        <div className="relative z-10 w-full md:w-1/3 flex justify-center">
            <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full"></div>
                <UtensilsCrossed size={160} className="text-primary relative drop-shadow-2xl" />
            </div>
        </div>
      </motion.section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Curated Menu */}
        <div className="lg:col-span-2 space-y-10">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-black">Signature Menu</h2>
            <div className="flex gap-2">
                <div className="w-10 h-10 glass-card flex items-center justify-center text-primary"><Star size={18} fill="currentColor"/></div>
                <div className="w-10 h-10 glass-card flex items-center justify-center text-primary"><Gift size={18}/></div>
            </div>
          </div>

          <div className="space-y-12">
            {categories.map(cat => (
              <div key={cat} className="space-y-6">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-primary/60 border-l-4 border-primary pl-4">{cat}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {menu.filter(item => item.category === cat).map(item => (
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      key={item.id} 
                      className="glass-card p-6 flex justify-between items-center group cursor-pointer"
                    >
                      <div className="space-y-1">
                        <p className="font-black text-xl tracking-tight">{item.name}</p>
                        <p className="text-primary font-black text-lg">Rs. {item.price}</p>
                      </div>
                      <div className="w-14 h-14 bg-white/5 border border-glass-border rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300">
                        <Plus size={24} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Real-time Logistics / Orders */}
        <div className="space-y-10">
          <h2 className="text-3xl font-black flex items-center gap-3">
             <History size={32} className="text-secondary" /> Recent Activity
          </h2>
          <div className="space-y-6">
            {orders.map(order => (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                key={order.id} 
                className="glass-panel p-6 border-r-4 border-primary hover:border-secondary transition-all"
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-50">{new Date(order.createdAt).toLocaleDateString()}</span>
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    order.status === 'completed' ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'
                  }`}>
                    {order.status === 'completed' ? <CheckCircle size={10}/> : <Clock size={10}/>}
                    {order.status}
                  </div>
                </div>
                <div className="font-bold text-sm mb-4 leading-relaxed line-clamp-2 italic">
                  {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-glass-border">
                  <span className="text-xs font-bold text-text-secondary uppercase">Paid Amount</span>
                  <span className="text-xl font-black text-primary">Rs. {order.finalAmount}</span>
                </div>
              </motion.div>
            ))}
            {orders.length === 0 && (
              <div className="glass-panel p-12 flex flex-col items-center justify-center opacity-30 text-center">
                <UtensilsCrossed size={64} className="mb-6" />
                <p className="text-xl font-black uppercase tracking-widest">No Active Orders</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
