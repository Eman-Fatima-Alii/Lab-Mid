import React, { useState, useEffect } from 'react';
import api from '../api/api.js';
import * as XLSX from 'xlsx';
import { Edit, Trash2, Plus, Download, BarChart3, Package, Users, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const [menu, setMenu] = useState([]);
  const [orders, setOrders] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', price: '', category: 'All' });

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
      setOrders(ordersRes.data.reverse());
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      await api.post('/menu', newItem);
      setNewItem({ name: '', price: '', category: 'All' });
      fetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  const deleteItem = async (id) => {
    if (window.confirm('Delete this item?')) {
      await api.delete(`/menu/${id}`);
      fetchData();
    }
  };

  const totalSales = orders.reduce((sum, o) => sum + o.finalAmount, 0);
  const totalOrders = orders.length;

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-12">
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Revenue', value: `Rs. ${totalSales.toLocaleString()}`, icon: DollarSign, color: 'from-green-500 to-emerald-700' },
          { label: 'Total Orders', value: totalOrders, icon: BarChart3, color: 'from-blue-500 to-indigo-700' },
          { label: 'Menu Items', value: menu.length, icon: Package, color: 'from-purple-500 to-violet-700' },
          { label: 'Active Users', value: '128', icon: Users, color: 'from-pink-500 to-rose-700' }
        ].map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={stat.label} 
            className="glass-panel p-6 flex items-center justify-between"
          >
            <div>
              <p className="text-text-secondary text-sm font-bold uppercase tracking-widest">{stat.label}</p>
              <h3 className="text-3xl font-black mt-2">{stat.value}</h3>
            </div>
            <div className={`p-4 rounded-2xl bg-gradient-to-br ${stat.color} shadow-lg shadow-black/20`}>
              <stat.icon size={28} className="text-white" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Inventory Management */}
        <div className="lg:col-span-1 space-y-8">
           <div className="glass-panel p-8">
            <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
              <Plus size={24} className="text-primary"/> Manage Inventory
            </h2>
            <form onSubmit={handleAddItem} className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-tighter text-text-secondary ml-1">Item Label</label>
                <input 
                  type="text" placeholder="e.g. Mocha Blast" className="modern-input"
                  value={newItem.name} onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-tighter text-text-secondary ml-1">List Price (Rs.)</label>
                <input 
                  type="number" className="modern-input"
                  value={newItem.price} onChange={(e) => setNewItem({...newItem, price: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-tighter text-text-secondary ml-1">Category</label>
                <input 
                  type="text" className="modern-input"
                  value={newItem.category} onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                  required
                />
              </div>
              <button type="submit" className="btn-vibrant w-full mt-4">Add Item to Store</button>
            </form>
           </div>

           <div className="glass-panel p-8">
            <h3 className="text-xl font-bold mb-6">Menu Snapshot</h3>
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {menu.map(item => (
                <div key={item.id} className="flex justify-between items-center glass-card p-4">
                  <div>
                    <p className="font-black text-sm">{item.name}</p>
                    <p className="text-xs font-bold text-primary">Rs. {item.price}</p>
                  </div>
                  <button onClick={() => deleteItem(item.id)} className="p-3 bg-danger/10 text-danger hover:bg-danger hover:text-white rounded-xl transition-all">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
           </div>
        </div>

        {/* Orders/Sales Oversight */}
        <div className="lg:col-span-2 glass-panel p-10 overflow-hidden relative">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-black">Sales Intelligence</h2>
            <button onClick={() => {}} className="bg-white/5 hover:bg-white/10 px-6 py-3 rounded-2xl border border-glass-border font-bold flex items-center gap-3 transition-all">
              <Download size={20} className="text-primary" /> Download PDF Reports
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-glass-border uppercase text-[10px] font-black tracking-widest text-text-muted">
                  <th className="pb-6 px-4">Transaction ID</th>
                  <th className="pb-6 px-4">Customer Segment</th>
                  <th className="pb-6 px-4">Revenue</th>
                  <th className="pb-6 px-4">Gateway</th>
                  <th className="pb-6 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-glass-border">
                {orders.map(order => (
                  <tr key={order.id} className="group hover:bg-white/[0.03] transition-colors">
                    <td className="py-6 px-4">
                       <span className="font-mono text-sm opacity-50 underline decoration-primary/30">#{order.id.slice(-8)}</span>
                    </td>
                    <td className="py-6 px-4 font-bold text-sm">
                      Multiple Items ({order.items.length})
                    </td>
                    <td className="py-6 px-4">
                       <span className="text-lg font-black text-primary">Rs. {order.finalAmount}</span>
                    </td>
                    <td className="py-6 px-4">
                       <span className="px-3 py-1 bg-white/5 rounded-lg text-[10px] font-bold uppercase border border-glass-border">{order.paymentMethod}</span>
                    </td>
                    <td className="py-6 px-4 text-center">
                       <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg ${
                         order.status === 'completed' ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'
                       }`}>
                         {order.status}
                       </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {orders.length === 0 && <div className="text-center py-20 opacity-30 text-2xl font-black">No Records Found</div>}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
