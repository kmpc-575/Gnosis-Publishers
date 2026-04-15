import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { ContentItem } from '../types';
import { Plus, Trash2, Edit, Save, X, Zap } from 'lucide-react';

const Admin: React.FC = () => {
  const { isAdmin, loading: authLoading } = useAuth();
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<ContentItem>>({});

  const [marqueeText, setMarqueeText] = useState('');
  const [savingMarquee, setSavingMarquee] = useState(false);

  useEffect(() => {
    if (isAdmin) {
      fetchItems();
      fetchSettings();
    }
  }, [isAdmin]);

  const fetchSettings = async () => {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .eq('key', 'marquee_text')
      .single();
    
    if (data) {
      setMarqueeText(data.value);
    }
  };

  const handleSaveMarquee = async () => {
    setSavingMarquee(true);
    const { error } = await supabase
      .from('site_settings')
      .upsert({ key: 'marquee_text', value: marqueeText });
    
    if (error) console.error('Error saving marquee:', error);
    else alert('Marquee updated successfully!');
    setSavingMarquee(false);
  };

  const fetchItems = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('content_items')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching items:', error);
    } else {
      setItems(data || []);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    if (editingId === 'new') {
      const { error } = await supabase
        .from('content_items')
        .insert([editForm]);
      if (error) console.error('Error adding item:', error);
    } else {
      const { error } = await supabase
        .from('content_items')
        .update(editForm)
        .eq('id', editingId);
      if (error) console.error('Error updating item:', error);
    }
    setEditingId(null);
    fetchItems();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      const { error } = await supabase
        .from('content_items')
        .delete()
        .eq('id', id);
      if (error) console.error('Error deleting item:', error);
      fetchItems();
    }
  };

  if (authLoading) return <div className="p-20 text-center">Loading auth...</div>;
  if (!isAdmin) return <div className="p-20 text-center text-red-600 font-bold">Access Denied. Master account only.</div>;

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-outline-variant/20 pb-8">
        <div>
          <h1 className="text-4xl font-serif text-primary mb-2">Master Control</h1>
          <p className="text-stone-500 text-sm">Manage website content and announcements.</p>
        </div>
        <button 
          onClick={() => {
            setEditingId('new');
            setEditForm({ type: 'paper', title: '', description: '', price: '₹', category: '' });
          }}
          className="flex items-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-emerald-800 transition-all"
        >
          <Plus size={20} /> Add New Item
        </button>
      </div>

      {/* Marquee Management Section */}
      <section className="bg-surface-container-low p-8 rounded-2xl border border-outline-variant/10 shadow-sm">
        <h2 className="text-xl font-serif text-primary mb-6 flex items-center gap-2">
          <Zap size={20} className="text-amber-500" /> Marquee Announcement
        </h2>
        <div className="flex flex-col md:flex-row gap-4">
          <input 
            type="text"
            value={marqueeText}
            onChange={(e) => setMarqueeText(e.target.value)}
            placeholder="Enter announcement text (use • to separate items)"
            className="flex-grow px-4 py-3 bg-surface border border-outline-variant/30 rounded-xl focus:ring-2 focus:ring-primary outline-none"
          />
          <button 
            onClick={handleSaveMarquee}
            disabled={savingMarquee}
            className="bg-on-surface text-surface px-8 py-3 rounded-xl font-bold hover:bg-primary transition-all disabled:opacity-50"
          >
            {savingMarquee ? 'Saving...' : 'Update Marquee'}
          </button>
        </div>
        <p className="text-[10px] text-stone-400 mt-3 uppercase tracking-widest font-bold">
          Tip: Use " • " to separate different news items in the scrolling bar.
        </p>
      </section>

      {/* Content Items List */}
      <section className="space-y-6">
        <h2 className="text-xl font-serif text-primary mb-4">Published Content</h2>
        {loading ? (
          <div className="text-center py-20 bg-surface-container-lowest rounded-2xl border border-dashed border-outline-variant/30">
            <div className="animate-pulse text-stone-400">Loading your catalog...</div>
          </div>
        ) : (
          <div className="grid gap-4">
            {editingId === 'new' && (
              <div className="bg-primary/5 p-6 rounded-2xl border-2 border-dashed border-primary/20 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input 
                    className="px-4 py-3 rounded-xl border border-outline-variant/30 bg-surface focus:ring-2 focus:ring-primary outline-none" 
                    value={editForm.title} 
                    onChange={e => setEditForm({...editForm, title: e.target.value})}
                    placeholder="Title"
                  />
                  <select 
                    className="px-4 py-3 rounded-xl border border-outline-variant/30 bg-surface focus:ring-2 focus:ring-primary outline-none"
                    value={editForm.type}
                    onChange={e => setEditForm({...editForm, type: e.target.value as any})}
                  >
                    <option value="paper">Paper</option>
                    <option value="journal">Journal</option>
                    <option value="patent">Patent</option>
                    <option value="book">Book</option>
                    <option value="project">Project</option>
                  </select>
                  <input 
                    className="px-4 py-3 rounded-xl border border-outline-variant/30 bg-surface focus:ring-2 focus:ring-primary outline-none" 
                    value={editForm.price} 
                    onChange={e => setEditForm({...editForm, price: e.target.value})}
                    placeholder="Price (e.g. ₹24,900)"
                  />
                  <input 
                    className="px-4 py-3 rounded-xl border border-outline-variant/30 bg-surface focus:ring-2 focus:ring-primary outline-none" 
                    value={editForm.category} 
                    onChange={e => setEditForm({...editForm, category: e.target.value})}
                    placeholder="Category/Department"
                  />
                  <input 
                    className="px-4 py-3 rounded-xl border border-outline-variant/30 bg-surface focus:ring-2 focus:ring-primary outline-none col-span-full" 
                    value={editForm.image_url || ''} 
                    onChange={e => setEditForm({...editForm, image_url: e.target.value})}
                    placeholder="Image URL (optional)"
                  />
                  <textarea 
                    className="px-4 py-3 rounded-xl border border-outline-variant/30 bg-surface focus:ring-2 focus:ring-primary outline-none col-span-full min-h-[100px]" 
                    value={editForm.description} 
                    onChange={e => setEditForm({...editForm, description: e.target.value})}
                    placeholder="Description"
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <button onClick={() => setEditingId(null)} className="px-6 py-2 text-stone-500 font-bold hover:bg-stone-100 rounded-xl transition-all">Cancel</button>
                  <button onClick={handleSave} className="px-8 py-2 bg-primary text-on-primary rounded-xl font-bold shadow-md hover:bg-emerald-800 transition-all">Save Item</button>
                </div>
              </div>
            )}

            {items.map((item) => (
              <div key={item.id} className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:shadow-md transition-shadow">
                {editingId === item.id ? (
                  <div className="flex-grow space-y-4 w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input 
                        className="px-4 py-2 rounded-xl border border-outline-variant/30 bg-surface" 
                        value={editForm.title} 
                        onChange={e => setEditForm({...editForm, title: e.target.value})}
                      />
                      <select 
                        className="px-4 py-2 rounded-xl border border-outline-variant/30 bg-surface"
                        value={editForm.type}
                        onChange={e => setEditForm({...editForm, type: e.target.value as any})}
                      >
                        <option value="paper">Paper</option>
                        <option value="journal">Journal</option>
                        <option value="patent">Patent</option>
                        <option value="book">Book</option>
                        <option value="project">Project</option>
                      </select>
                      <input 
                        className="px-4 py-2 rounded-xl border border-outline-variant/30 bg-surface" 
                        value={editForm.price} 
                        onChange={e => setEditForm({...editForm, price: e.target.value})}
                      />
                      <input 
                        className="px-4 py-2 rounded-xl border border-outline-variant/30 bg-surface" 
                        value={editForm.category} 
                        onChange={e => setEditForm({...editForm, category: e.target.value})}
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <button onClick={handleSave} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg"><Save size={20} /></button>
                      <button onClick={() => setEditingId(null)} className="p-2 text-stone-400 hover:bg-stone-50 rounded-lg"><X size={20} /></button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider">{item.type}</span>
                        <h3 className="text-lg font-serif text-on-surface">{item.title}</h3>
                      </div>
                      <div className="flex gap-4 text-xs font-medium text-stone-500">
                        <span className="text-primary font-bold">{item.price}</span>
                        <span>{item.category}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 self-end md:self-center">
                      <button onClick={() => { setEditingId(item.id); setEditForm(item); }} className="p-2 text-stone-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all"><Edit size={18} /></button>
                      <button onClick={() => handleDelete(item.id)} className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={18} /></button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Admin;
