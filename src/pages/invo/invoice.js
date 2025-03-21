import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const InvoiceManagement = () => {
  const [invoices, setInvoices] = useState([
    {
      id: "HD001",
      name: "Nguyễn Văn A",
      date: "01/01/2023",
      amount: "1,000,000 VNĐ",
    },
    {
      id: "HD002",
      name: "Trần Thị B",
      date: "02/01/2023",
      amount: "500,000 VNĐ",
    },
    {
      id: "HD003",
      name: "Lê Văn C",
      date: "03/01/2023",
      amount: "750,000 VNĐ",
    },
    {
      id: "HD004",
      name: "Nguyễn Thị D",
      date: "04/01/2023",
      amount: "1,200,000 VNĐ",
    },
  ]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Quản Lý Hóa Đơn</h2>
      <input
        type="text"
        placeholder="Tìm kiếm hóa đơn..."
        className="w-full mb-4 p-2 border rounded"
      />
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Mã Hóa Đơn</th>
            <th className="border p-2">Khách Hàng</th>
            <th className="border p-2">Ngày</th>
            <th className="border p-2">Tổng Tiền</th>
            <th className="border p-2">Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr
              key={invoice.id}
              className="text-center hover:bg-gray-100 transition-colors duration-200"
            >
              <td className="border p-3">{invoice.id}</td>
              <td className="border p-3">{invoice.name}</td>
              <td className="border p-3">{invoice.date}</td>
              <td className="border p-3">{invoice.amount}</td>
              <td className="border p-3">
                <button
                  className="text-green-600 hover:text-green-800 mr-3 transition-colors duration-200"
                  title="Edit"
                >
                  <FaEdit />
                </button>
                <button
                  className="text-red-600 hover:text-red-800 transition-colors duration-200"
                  title="Delete"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceManagement;
