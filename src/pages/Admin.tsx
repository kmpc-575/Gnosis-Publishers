import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { ContentItem } from '../types';
import { Plus, Trash2, Edit, Save, X } from 'lucide-react';

const Admin: React.FC = () => {
  const { isAdmin, loading: authLoading } = useAuth();
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<ContentItem>>({});

  useEffect(() => {
    if (isAdmin) {
      fetchItems();
    }
  }, [isAdmin]);

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
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-serif text-primary">Master Control Dashboard</h1>
        <button 
          onClick={() => {
            setEditingId('new');
            setEditForm({ type: 'paper', title: '', description: '', price: '', category: '' });
          }}
          className="flex items-center gap-2 bg-primary text-on-primary px-6 py-2 rounded-full font-bold"
        >
          <Plus size={20} /> Add New Content
        </button>
      </div>

      {loading ? (
        <div className="text-center py-20">Loading content...</div>
      ) : (
        <div className="grid gap-6">
          {items.map((item) => (
            <div key={item.id} className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/20 flex justify-between items-start">
              {editingId === item.id ? (
                <div className="flex-grow grid grid-cols-2 gap-4 mr-4">
                  <input 
                    className="p-2 rounded border" 
                    value={editForm.title} 
                    onChange={e => setEditForm({...editForm, title: e.target.value})}
                    placeholder="Title"
                  />
                  <select 
                    className="p-2 rounded border"
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
                    className="p-2 rounded border" 
                    value={editForm.price} 
                    onChange={e => setEditForm({...editForm, price: e.target.value})}
                    placeholder="Price (e.g. $249.00)"
                  />
                  <input 
                    className="p-2 rounded border" 
                    value={editForm.category} 
                    onChange={e => setEditForm({...editForm, category: e.target.value})}
                    placeholder="Category/Department"
                  />
                  <input 
                    className="p-2 rounded border col-span-2" 
                    value={editForm.image_url || ''} 
                    onChange={e => setEditForm({...editForm, image_url: e.target.value})}
                    placeholder="Image URL (optional)"
                  />
                  <textarea 
                    className="p-2 rounded border col-span-2" 
                    value={editForm.description} 
                    onChange={e => setEditForm({...editForm, description: e.target.value})}
                    placeholder="Description"
                  />
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-[10px] font-bold uppercase">{item.type}</span>
                    <h3 className="text-xl font-bold">{item.title}</h3>
                  </div>
                  <p className="text-on-surface-variant text-sm mb-2">{item.description}</p>
                  <div className="flex gap-4 text-xs font-semibold">
                    <span className="text-primary">{item.price}</span>
                    <span className="text-stone-400">{item.category}</span>
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                {editingId === item.id ? (
                  <>
                    <button onClick={handleSave} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-full"><Save size={20} /></button>
                    <button onClick={() => setEditingId(null)} className="p-2 text-stone-400 hover:bg-stone-50 rounded-full"><X size={20} /></button>
                  </>
                ) : (
                  <>
                    <button onClick={() => { setEditingId(item.id); setEditForm(item); }} className="p-2 text-primary hover:bg-primary/5 rounded-full"><Edit size={20} /></button>
                    <button onClick={() => handleDelete(item.id)} className="p-2 text-secondary hover:bg-secondary/5 rounded-full"><Trash2 size={20} /></button>
                  </>
                )}
              </div>
            </div>
          ))}

          {editingId === 'new' && (
            <div className="bg-primary/5 p-6 rounded-xl border-2 border-dashed border-primary/20 flex justify-between items-start">
              <div className="flex-grow grid grid-cols-2 gap-4 mr-4">
                <input 
                  className="p-2 rounded border" 
                  value={editForm.title} 
                  onChange={e => setEditForm({...editForm, title: e.target.value})}
                  placeholder="Title"
                />
                <select 
                  className="p-2 rounded border"
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
                  className="p-2 rounded border" 
                  value={editForm.price} 
                  onChange={e => setEditForm({...editForm, price: e.target.value})}
                  placeholder="Price (e.g. $249.00)"
                />
                <input 
                  className="p-2 rounded border" 
                  value={editForm.category} 
                  onChange={e => setEditForm({...editForm, category: e.target.value})}
                  placeholder="Category/Department"
                />
                <input 
                  className="p-2 rounded border col-span-2" 
                  value={editForm.image_url || ''} 
                  onChange={e => setEditForm({...editForm, image_url: e.target.value})}
                  placeholder="Image URL (optional)"
                />
                <textarea 
                  className="p-2 rounded border col-span-2" 
                  value={editForm.description} 
                  onChange={e => setEditForm({...editForm, description: e.target.value})}
                  placeholder="Description"
                />
              </div>
              <div className="flex gap-2">
                <button onClick={handleSave} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-full"><Save size={20} /></button>
                <button onClick={() => setEditingId(null)} className="p-2 text-stone-400 hover:bg-stone-50 rounded-full"><X size={20} /></button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Admin;
