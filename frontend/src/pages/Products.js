import React, { useState } from 'react';
import './Products.css';

function Products() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortCategory, setSortCategory] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  const products = [
    { id: 1, name: 'Bunchful Atlas', subscribers: 1500, usage: 'Directory', rating: 4.9 },
    { id: 2, name: 'Bunchful MeCard', subscribers: 1200, usage: 'Profile Tool', rating: 4.7 },
    { id: 3, name: 'Bunchful Badge', subscribers: 800, usage: 'Badge Display', rating: 4.5 }
  ];

  const productDetails = {
    1: {
      description: "Bunchful Atlas connects businesses focused on social impact.",
      images: ["https://via.placeholder.com/100", "https://via.placeholder.com/100"],
      reviews: [
        { name: 'Alice', rating: 5, date: 'Aug 27, 2024', comment: 'Great for connecting with like-minded businesses!' },
        { name: 'Bob', rating: 4, date: 'Sep 5, 2024', comment: 'Useful tool, but could use more categories.' }
      ]
    },
    2: {
      description: "Bunchful MeCard allows users to showcase their philanthropic contributions.",
      images: ["https://via.placeholder.com/100"],
      reviews: [
        { name: 'Charlie', rating: 4, date: 'Sep 10, 2024', comment: 'A fantastic way to highlight my charitable efforts!' }
      ]
    },
    3: {
      description: "Bunchful Badge celebrates commitment to generosity.",
      images: ["https://via.placeholder.com/100"],
      reviews: [
        { name: 'Dana', rating: 5, date: 'Sep 18, 2024', comment: 'I proudly display my Bunchful Badge!' }
      ]
    }
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setEditData(product);
    setIsEditing(false);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSortCategory(e.target.value);
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    setSelectedProduct(editData);
  };

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortCategory) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'subscribers':
        return b.subscribers - a.subscribers;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const filteredProducts = sortedProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='products-container'>
      <div className='products-table'>
        <div className='table-header'>
          <h2>Products</h2>
          <input
            type="text"
            placeholder="Search by Product Name"
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-bar"
          />
          <select onChange={handleCategoryChange} className="sort-dropdown">
            <option value="">Sort By</option>
            <option value="name">Product Name</option>
            <option value="subscribers">Subscribers</option>
            <option value="rating">Rating</option>
          </select>
        </div>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Subscribers</th>
              <th>Usage</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr
                key={product.id}
                onClick={() => handleProductClick(product)}
                className={selectedProduct && selectedProduct.id === product.id ? 'selected' : ''}
              >
                <td>{product.name}</td>
                <td>{product.subscribers}</td>
                <td>{product.usage}</td>
                <td>⭐ {product.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="product-detail">
        {selectedProduct ? (
          <>
            <div className="detail-header">
              <h3>{selectedProduct.name}</h3>
              <button onClick={handleEditClick} className="edit-btn">
                {isEditing ? 'Cancel' : 'Edit'}
              </button>
            </div>
            {isEditing ? (
              <div className="edit-form">
                <label>
                  Name:
                  <input
                    type="text"
                    name="name"
                    value={editData.name}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Subscribers:
                  <input
                    type="number"
                    name="subscribers"
                    value={editData.subscribers}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Usage:
                  <input
                    type="text"
                    name="usage"
                    value={editData.usage}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Rating:
                  <input
                    type="number"
                    step="0.1"
                    name="rating"
                    value={editData.rating}
                    onChange={handleInputChange}
                  />
                </label>
                <button onClick={handleSaveClick} className="save-btn">Save</button>
              </div>
            ) : (
              <>
                <div className="product-images">
                  {productDetails[selectedProduct.id].images.map((src, index) => (
                    <img key={index} src={src} alt={`Product ${index + 1}`} />
                  ))}
                </div>
                <p>{productDetails[selectedProduct.id].description}</p>
                <div className="reviews-section">
                  <h3>Reviews</h3>
                  {productDetails[selectedProduct.id].reviews.map((review, index) => (
                    <div key={index} className="review-item">
                      <p><strong>{review.name}</strong> ⭐⭐⭐⭐⭐ {review.date}</p>
                      <p>{review.comment}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <p>Please select a product to view details</p>
        )}
      </div>
    </div>
  );
}

export default Products;