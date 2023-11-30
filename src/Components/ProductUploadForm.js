    import React, { useState } from 'react';

    const ProductUploadForm = () => {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        image: null, // Updated to store the file object
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
        image: e.target.files[0], // Store the file object
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
            const response = await fetch('http://192.168.29.149:3000/products/add', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: formData,
            });
        
            if (response.ok) {
                console.log('Product data sent successfully!');
                // Clear the form fields after successful submission
                setProduct({
                name: '',
                description: '',
                price: '',
                image: null,
                });
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
                <svg viewBox="0 0 24 24" fill="" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" fill=""></path> </g>
                </svg>
                </div>
                <div className="text">
                <span>Click here to upload image</span>
                </div>
                <input
                id="file"
                type="file"
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
                />
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
