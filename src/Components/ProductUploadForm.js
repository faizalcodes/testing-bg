import React, { useState } from 'react';
import config from '../config/config'

const {addProductURL} = config

const FileInput = ({ onChange }) => {
  const [key, setKey] = useState(Date.now());

  const handleFileChange = (e) => {
    onChange(e);
    setKey(Date.now());
  };

  return (
    <input
      id="file"
      type="file"
      key={key}
      onChange={handleFileChange}
      className="hidden"
      accept="image/*"
    />
  );
};

const ProductUploadForm = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: null,
  });

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setProduct({
      ...product,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('image', product.image);

    try {
      console.log(addProductURL);
      const response = await fetch(`${addProductURL}`, {
        method: 'POST',
        body: formData,
      });

      const responseData = await response.json();

      if (response.ok) {
        setProduct({
          name: '',
          description: '',
          price: '',
          image: null,
        });
        alert(responseData.message);
      } else {
        console.error('Failed to send product data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-4">Product Upload</h2>

        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-600">
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-600">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-600">
            Price
          </label>
          <input
            type="text"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="file" className="custom-file-upload">
            <div className="icon">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {/* ... your SVG ... */}
              </svg>
            </div>
            <div className="text">
              <span>Click here to upload image</span>
            </div>
            <FileInput onChange={handleFileChange} />
          </label>
          {product.image && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Image Preview</h3>
              <img
                src={URL.createObjectURL(product.image)}
                alt="Product Preview"
                className="mt-2 max-w-full h-auto"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Upload Product
        </button>
      </form>
    </div>
  );
};

export default ProductUploadForm;
