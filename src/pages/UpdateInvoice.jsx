import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/invoices';

const UpdateInvoice = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const [invoice, setInvoice] = useState({
        invoiceNumber: '',
        userName: '',
        customerName: '',
        approved: false,
        approveDate: '',
        statusPaid: false,
        statusHasInvoice: false,
        dateBuy: '',
        outOfDateToPay: '',
        pdfOrImgPath: '',
        invoiceDetails: [] // Holds product details
    });

    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        fetchInvoice();
    }, [id]);

    const fetchInvoice = async () => {
        try {
            console.log(`Fetching invoice by ID: ${id}`);
            const response = await axios.get(`${API_BASE_URL}/${id}`);
            setInvoice(response.data);
        } catch (error) {
            console.error('🚨 Error fetching invoice:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setInvoice({
            ...invoice,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    // ✅ Handle product details update
    const handleDetailChange = (index, e) => {
        const { name, value } = e.target;
        const updatedDetails = [...invoice.invoiceDetails];
        updatedDetails[index] = { ...updatedDetails[index], [name]: value };
        setInvoice({ ...invoice, invoiceDetails: updatedDetails });
    };

    // ✅ Add new product detail
    const addDetail = () => {
        setInvoice({
            ...invoice,
            invoiceDetails: [
                ...invoice.invoiceDetails,
                { productName: '', quantity: 1, price: 0 }
            ]
        });
    };

    // ✅ Remove a product detail
    const removeDetail = (index) => {
        const updatedDetails = [...invoice.invoiceDetails];
        updatedDetails.splice(index, 1);
        setInvoice({ ...invoice, invoiceDetails: updatedDetails });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // ✅ Create JSON object (not FormData)
        const updatedInvoice = {
            invoiceNumber: invoice.invoiceNumber,
            userName: invoice.userName,
            customerName: invoice.customerName,
            approved: invoice.approved,
            approveDate: invoice.approveDate || null,
            statusPaid: invoice.statusPaid,
            statusHasInvoice: invoice.statusHasInvoice,
            dateBuy: invoice.dateBuy,
            outOfDateToPay: invoice.outOfDateToPay,
            invoiceDetails: invoice.invoiceDetails.map(detail => ({
                id: detail.id || null, // Ensure `id` is sent as null if it's a new item
                productName: detail.productName,
                quantity: detail.quantity,
                price: detail.price
            }))
        };

        try {
            await axios.put(`${API_BASE_URL}/update/${id}`, updatedInvoice, {
                headers: { "Content-Type": "application/json" }
            });

            console.log("✅ Invoice updated successfully!");
            navigate('/'); // Redirect to the invoice list
        } catch (error) {
            console.error("🚨 Error updating invoice:", error.response?.data || error.message);
        }
    };

    return (
        <div className="container" style={{ color: "black" }}>
            <div className="form-wrapper">
                <Link to="/" className="back-button">
                    ← Trở về
                </Link>
                <div className="form-header">
                    <h1 className="title">Chỉnh Sửa Hóa Đơn</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Mã hóa đơn</label>
                        <input
                            type="text"
                            name="invoiceNumber"
                            value={invoice.invoiceNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Tên Khách Hàng</label>
                        <input
                            type="text"
                            name="customerName"
                            value={invoice.customerName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Tên người dùng</label>
                        <input
                            type="text"
                            name="userName"
                            value={invoice.userName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Ngày mua</label>
                        <input
                            type="date"
                            name="dateBuy"
                            value={invoice.dateBuy}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Ngày đến hạn</label>
                        <input
                            type="date"
                            name="outOfDateToPay"
                            value={invoice.outOfDateToPay}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label>Đã Trả Tiền:</label>
                        <input
                            style={{ marginLeft: "20px" }}
                            type="checkbox"
                            name="statusPaid"
                            checked={invoice.statusPaid}
                            onChange={handleChange}
                        />
                    </div>

                    {/* ✅ Product Details Section */}
                    <h2>Chi Tiết Sản Phẩm</h2>
                    {invoice.invoiceDetails.map((detail, index) => (
                        <div key={index} className="form-group">
                            <label>Sản phẩm {index + 1}</label>
                            <input
                                type="text"
                                name="productName"
                                value={detail.productName}
                                onChange={(e) => handleDetailChange(index, e)}
                                required
                            />
                            <label>Số lượng</label>
                            <input
                                type="number"
                                name="quantity"
                                value={detail.quantity}
                                onChange={(e) => handleDetailChange(index, e)}
                                required
                            />
                            <label>Giá</label>
                            <input
                                type="number"
                                name="price"
                                value={detail.price}
                                onChange={(e) => handleDetailChange(index, e)}
                                required
                            />
                            <button type="button" onClick={() => removeDetail(index)}>🗑 Xóa</button>
                        </div>
                    ))}

                    {/* ✅ Add product detail button */}
                    <button type="button" onClick={addDetail}>➕ Thêm sản phẩm</button>

                    <div>
                        <label>Upload File:</label>
                        <button type="button" onClick={() => fileInputRef.current.click()}>
                            📂 Chọn Tệp
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                            accept=".pdf,.jpg,.png"
                        />
                        {selectedFile && <p>📄 Selected File: {selectedFile.name}</p>}
                    </div>

                    {invoice.pdfOrImgPath && (
                        <p>
                            🔗 File hiện tại:{" "}
                            <a href={`http://localhost:8080/${invoice.pdfOrImgPath}`} target="_blank" rel="noopener noreferrer">
                                Xem Tệp
                            </a>
                        </p>
                    )}

                    <button type="submit">Cập Nhật</button>
                    <button type="button" onClick={() => navigate('/')}>Hủy</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateInvoice;
