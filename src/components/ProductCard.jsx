import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 

const ProductCard = ({ product }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105 overflow-hidden">
      {/* Check if there is more than one image */}
      {product.images.length > 1 ? (
        <Slider {...settings}>
          {/* Display product images */}
          {product.images.map((image, index) => (
            <div key={index}>
              <img
                src={image}
                alt={product.title}
                className="w-full h-64 object-cover"
              />
            </div>
          ))}
        </Slider>
      ) : (
        // If there's only one image, display it directly
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-64 object-cover"
        />
      )}
      
      <div className="p-6">
        <h2 className="font-bold text-xl mb-2">{product.title}</h2>
        <p className="text-lg text-gray-800 mb-4">${product.price.toFixed(2)}</p>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <p className="text-gray-500">Brand: {product.brand}</p>
        <p className="text-gray-500">Stock: {product.availabilityStatus}</p>
        <p className="text-gray-500">Rating: {product.rating} ⭐</p>
        
      </div>
    </div>
  );
};

export default ProductCard;
