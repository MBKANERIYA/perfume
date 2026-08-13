import React, { useState, useEffect } from 'react';

export default function ProductsTab() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    image: '',
    tagline: '',
    categories: ''
  });
  
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.error('Failed to fetch products', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    const formDataUpload = new FormData();
    formDataUpload.append('image', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formDataUpload
      });
      if (response.ok) {
        const data = await response.json();
        setFormData(prev => ({ ...prev, image: data.url }));
      } else {
        console.error('Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image', error);
    } finally {
      setUploadingImage(false);
    }
  };

  const openAddModal = () => {
    setIsEditMode(false);
    setFormData({ title: '', price: '', image: '', tagline: '', categories: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setIsEditMode(true);
    setCurrentProduct(product);
    setFormData({
      title: product.title,
      price: product.price,
      image: product.image,
      tagline: product.tagline || '',
      categories: product.categories.join(', ')
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentProduct(null);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      price: Number(formData.price),
      categories: formData.categories.split(',').map(c => c.trim()).filter(c => c)
    };

    try {
      const url = isEditMode 
        ? `/api/products/${currentProduct._id}`
        : '/api/products';
      
      const response = await fetch(url, {
        method: isEditMode ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        fetchProducts();
        closeModal();
      } else {
        console.error('Failed to save product');
      }
    } catch (error) {
      console.error('Error saving product', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchProducts();
      }
    } catch (error) {
      console.error('Error deleting product', error);
    }
  };

  const filteredProducts = products.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.categories && p.categories.join(' ').toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="animate-fade-in flex flex-col h-full relative">
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="mb-4 md:mb-0">
          <h2 className="font-bebas text-3xl tracking-widest text-black mb-1 uppercase">Products Inventory</h2>
          <p className="text-gray-500 text-sm">Manage your product catalog ({products.length} total items)</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <input 
            type="text" 
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-200 px-4 py-3 sm:py-2 rounded text-sm w-full md:min-w-[250px] focus:outline-none focus:border-gold"
          />
          <button 
            onClick={openAddModal}
            className="bg-black text-white px-4 py-3 sm:py-2 text-xs font-bold tracking-widest uppercase rounded hover:bg-gold transition-colors whitespace-nowrap"
          >
            Add New
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex-1 flex flex-col">
        {loading ? (
          <div className="flex-1 flex items-center justify-center p-12">
            <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="overflow-x-auto flex-1 custom-scrollbar">
            <table className="w-full text-left border-collapse min-w-[800px] md:min-w-0">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 font-montserrat text-xs text-gray-500 uppercase tracking-widest">
                  <th className="px-6 py-4 font-bold">Product</th>
                  <th className="px-6 py-4 font-bold">Category</th>
                  <th className="px-6 py-4 font-bold">Price</th>
                  <th className="px-6 py-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredProducts.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center p-1">
                          <img src={product.image} alt={product.title} className="max-w-full max-h-full object-contain" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-black whitespace-normal md:whitespace-nowrap line-clamp-2 md:line-clamp-none">{product.title}</p>
                          <p className="text-xs text-gray-400 whitespace-normal md:whitespace-nowrap line-clamp-1">{product.tagline}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {product.categories && product.categories.filter(c => c !== 'shop-all').map((cat, i) => (
                          <span key={i} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-[10px] font-bold uppercase">
                            {cat}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bebas text-xl text-black">₹{product.price}</p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => openEditModal(product)}
                        className="text-gray-400 hover:text-gold transition-colors p-2 text-xs font-bold uppercase tracking-wider mr-2"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(product._id)}
                        className="text-red-400 hover:text-red-600 transition-colors p-2 text-xs font-bold uppercase tracking-wider"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                
                {filteredProducts.length === 0 && (
                  <tr>
                    <td colSpan="4" className="px-6 py-12 text-center text-gray-500 font-montserrat text-sm">
                      No products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-[100000] flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-[500px] max-h-[90vh] overflow-y-auto custom-scrollbar animate-slide-up">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-bebas text-2xl tracking-widest text-black m-0 uppercase">
                {isEditMode ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-black">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Title</label>
                <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full border border-gray-200 rounded p-3 text-sm focus:outline-none focus:border-gold" />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Tagline</label>
                <input type="text" value={formData.tagline} onChange={e => setFormData({...formData, tagline: e.target.value})} className="w-full border border-gray-200 rounded p-3 text-sm focus:outline-none focus:border-gold" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Price (₹)</label>
                  <input required type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full border border-gray-200 rounded p-3 text-sm focus:outline-none focus:border-gold" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Product Image</label>
                  <div className="flex items-center gap-4">
                    {formData.image && (
                      <div className="w-16 h-16 bg-gray-50 rounded border border-gray-200 p-1 flex-shrink-0">
                        <img src={formData.image} alt="Preview" className="w-full h-full object-contain" />
                      </div>
                    )}
                    <div className="flex-1">
                      <label className="flex items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:border-gold transition-colors bg-gray-50 group">
                        <div className="flex items-center gap-2 text-sm text-gray-500 group-hover:text-gold transition-colors">
                          {uploadingImage ? (
                            <span className="font-bold flex items-center gap-2">
                              <div className="w-4 h-4 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
                              Uploading...
                            </span>
                          ) : (
                            <span className="font-bold tracking-widest uppercase">Select Image</span>
                          )}
                        </div>
                        <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploadingImage} />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Categories (comma separated)</label>
                <input type="text" value={formData.categories} onChange={e => setFormData({...formData, categories: e.target.value})} className="w-full border border-gray-200 rounded p-3 text-sm focus:outline-none focus:border-gold" placeholder="men, new-arrivals, eau-de-parfum" />
              </div>
              
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={closeModal} className="flex-1 py-3 text-sm font-bold uppercase tracking-widest text-gray-600 bg-gray-100 rounded hover:bg-gray-200 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 py-3 text-sm font-bold uppercase tracking-widest text-white bg-black rounded hover:bg-gold transition-colors">
                  {isEditMode ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
