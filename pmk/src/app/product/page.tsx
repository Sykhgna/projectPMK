import React, { useState, useEffect } from "react";

// Define the Product interface
interface Product {
  id: number;
  nama_produk: string;
  harga: number;
  stock: number;
  deskripsi: string;
}

// Mock API calls (replace with actual API calls in a real application)
const mockFetchProducts = async (): Promise<Product[]> => {
  return [
    { id: 1, nama_produk: "Makanan Kucing", harga: 50000, stock: 10, deskripsi: "Makanan kucing premium" },
    { id: 2, nama_produk: "Mainan Kucing", harga: 20000, stock: 15, deskripsi: "Mainan berbentuk tikus" },
  ];
};

const mockAddProduct = async (product: Product): Promise<void> => {
  console.log("Product added:", product);
};

const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    nama_produk: "",
    harga: 0,
    stock: 0,
    deskripsi: "",
  });

  // Fetch products on component mount
  useEffect(() => {
    const fetchData = async () => {
      const data = await mockFetchProducts();
      setProducts(data);
    };
    fetchData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: name === "harga" || name === "stock" ? +value : value });
  };

  const handleAddProduct = async () => {
    const productToAdd = { id: products.length + 1, ...newProduct };
    await mockAddProduct(productToAdd);
    setProducts([...products, productToAdd]);
    setNewProduct({ nama_produk: "", harga: 0, stock: 0, deskripsi: "" });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Product Management</h1>

      {/* Product List */}
      <h2>Product List</h2>
      <table border={1} style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama Produk</th>
            <th>Harga</th>
            <th>Stock</th>
            <th>Deskripsi</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.nama_produk}</td>
              <td>{product.harga}</td>
              <td>{product.stock}</td>
              <td>{product.deskripsi}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Product Form */}
      <h2>Add New Product</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddProduct();
        }}
      >
        <div>
          <label>
            Nama Produk:
            <input
              type="text"
              name="nama_produk"
              value={newProduct.nama_produk}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Harga:
            <input
              type="number"
              name="harga"
              value={newProduct.harga}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Stock:
            <input
              type="number"
              name="stock"
              value={newProduct.stock}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Deskripsi:
            <textarea
              name="deskripsi"
              value={newProduct.deskripsi}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default ProductManagement;
