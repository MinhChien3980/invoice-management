import React, {useState, useEffect, useRef} from 'react';
import {useParams, useNavigate, Link} from "react-router-dom";
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/invoices';

const UpdateInvoice = () => {
    const {id} = useParams(); // Use id instead of invoiceNumber
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const [invoice, setInvoice] = useState({
        userName: '',
        dateBuy: '',
        price: 0
    });

    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadMessage] = useState('');

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
        const {name, value, type, checked} = e.target;
        setInvoice({
            ...invoice,
            [name]: type === "checkbox" ? checked : value
        });
    };


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("invoiceNumber", invoice.invoiceNumber);
        formData.append("userName", invoice.userName);
        formData.append("dateBuy", invoice.dateBuy);
        formData.append("price", invoice.price);
        formData.append("outOfDateToPay", invoice.outOfDateToPay);
        formData.append("amountOfProduct", invoice.amountOfProduct);
        formData.append("productName", invoice.productName);
        formData.append("statusPaid", invoice.statusPaid);

        if (selectedFile) {
            formData.append("file", selectedFile);
        }

        try {
            await axios.put(`${API_BASE_URL}/update/${id}`, formData, {
                headers: {"Content-Type": "multipart/form-data"}
            });

            console.log("✅ Invoice updated successfully!");
            navigate('/'); // Redirect to Invoice Manager after update
        } catch (error) {
            console.error("🚨 Error updating invoice:", error);
        }
    };

    return (
        <div className="container">
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
                            value={invoice.userName}
                            onChange={handleChange}
                            placeholder="Nhập tên khách hàng"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Sản phẩm</label>
                        <input
                            type="text"
                            name="productName"
                            value={invoice.productName}
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


                    <div className="form-group">
                        <label>Số lượng</label>
                        <input
                            type='number'
                            name="amountOfProduct"
                            value={invoice.amountOfProduct}
                            onChange={handleChange}
                            placeholder="Nhập số lượng sản phẩm"
                            required
                        ></input>

                        <div className="form-group">
                            <label>Tổng tiền</label>
                            <input
                                type="number"
                                name="totalPrice"
                                value={invoice.totalPrice}
                                onChange={handleChange}
                                placeholder="Nhập tổng số tiền"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label>Đã Trả Tiền:</label>
                        <input
                            type="checkbox"
                            name="statusPaid"
                            checked={invoice.statusPaid || false}
                            onChange={handleChange}
                        />
                    </div>

                    <label>Upload File:</label>
                    <button type="button" onClick={() => fileInputRef.current.click()}>📂 Chọn Tệp</button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{display: 'none'}}
                        onChange={handleFileChange}
                        accept=".pdf,.jpg,.png"
                    />
                    {selectedFile && <p>📄 Selected File: {selectedFile.name}</p>}
                    {uploadMessage && <p>{uploadMessage}</p>}

                    {invoice.pdfOrImgPath && (
                        <p>🔗 Current File: <a href={`http://localhost:8080/files/${invoice.pdfOrImgPath}`}
                                              target="_blank"
                                              rel="noopener noreferrer">View File</a></p>
                    )}

                    <button type="submit">Cập Nhật</button>
                    <button type="button" onClick={() => navigate('/')}>Hủy</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateInvoice;
