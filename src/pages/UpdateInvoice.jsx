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

    const handleFileUpload = async () => {
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            const response = await axios.post(
                `${API_BASE_URL}/${id}/upload`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            console.log("✅ File uploaded:", response.data);

            setInvoice({ ...invoice, pdfOrImgPath: response.data.filePath });

        } catch (error) {
            console.error("🚨 Error uploading file:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await handleFileUpload();

        try {
            await axios.put(`${API_BASE_URL}/update/${id}`, invoice, {
                headers: { "Content-Type": "application/json" }
            });

            console.log("✅ Invoice updated successfully!");
            navigate('/'); // Redirect after update

        } catch (error) {
            console.error("🚨 Error updating invoice:", error);
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
                            <a href={`http://localhost:8080/files/${invoice.pdfOrImgPath.split('/').pop()}`}
                               target="_blank"
                               rel="noopener noreferrer">
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
