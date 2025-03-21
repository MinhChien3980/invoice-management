import React from "react";
import './createInvoice.css';
import { Link } from "react-router-dom";

const InvoiceForm = () => {
    return (
        <div className="container">
            <div className="form-wrapper">
                <div className="form-header">
                    <Link to="/" className="back-button">
                        ← Trở về
                    </Link>
                    <h1 className="title">Tạo Hóa Đơn</h1>
                </div>
                <form className="form">
                    <div className="form-group">
                        <label>Tên Khách Hàng</label>
                        <input type="text" placeholder="Nhập tên khách hàng"/>
                    </div>

                    <div className="form-group">
                        <label>Email Khách Hàng</label>
                        <input type="email" placeholder="Nhập email khách hàng"/>
                    </div>

                    <div className="form-group">
                        <label>Ngày Hóa Đơn</label>
                        <input type="date" style={{color: "black"}}/>
                    </div>

                    <div className="form-group">
                        <label>Mặt Hàng</label>
                        <textarea style={{color: "black"}} placeholder="Nhập mặt hàng và số lượng" rows="4"></textarea>
                    </div>

                    <div className="form-group">
                        <label>Giá Đơn Vị</label>
                        <input type="number" placeholder="Nhập giá đơn vị"/>
                    </div>

                    <div className="form-group">
                        <label>Số Lượng</label>
                        <input type="number" placeholder="Nhập số lượng"/>
                    </div>

                    <div className="form-group">
                        <label>Tổng Số Tiền</label>
                        <input type="number" placeholder="Nhập tổng số tiền"/>
                    </div>

                    <div className="form-group">
                        <label>Ghi Chú</label>
                        <textarea placeholder="Nhập ghi chú nếu có" rows="4"></textarea>
                    </div>

                    <div className="button-container">
                        <button type="submit" className="submit-btn">Tạo Hóa Đơn</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default InvoiceForm;