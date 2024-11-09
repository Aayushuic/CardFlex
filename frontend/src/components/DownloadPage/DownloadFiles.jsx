import React from "react";

const DownloadFiles = ({order}) => {
  return (
    <div>
      {" "}
      <h2 className="text-2xl font-semibold mb-4">Downloadable Files</h2>
      <div className="max-h-96 overflow-y-auto scrollbar space-y-4">
        <ul>
          {order.product.map((product) => (
            <li
              key={product._id}
              className="p-4 rounded-lg flex items-center space-x-4"
            >
              <img
                src={product.imageUrl} // Assuming 'product.imageUrl' contains the image URL
                alt={product.title}
                className="w-20 h-20 object-cover rounded-md"
              />
              <div>
                <p className="text-xl font-medium mb-2 line-clamp-1">
                  {product.title}
                </p>
                <a
                  href={product.cdrFile}
                  target="_blank"
                  className="inline-block px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-400 transition"
                >
                  Download
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DownloadFiles;
