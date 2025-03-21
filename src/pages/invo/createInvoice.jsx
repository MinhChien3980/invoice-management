import React from "react";
import "./App.css";

const InvoiceForm = () => {
  return (
    <div className="container">
      <div className="form-wrapper">
        <h1 className="title">Tạo Hóa Đơn</h1>
        <form className="form">
          <div className="form-group">
            <label>Tên Khách Hàng</label>
            <input type="text" placeholder="Nhập tên khách hàng" />
          </div>

          <div className="form-group">
            <label>Email Khách Hàng</label>
            <input type="email" placeholder="Nhập email khách hàng" />
          </div>

          <div className="form-group">
            <label>Ngày Hóa Đơn</label>
            <input type="date" color="black"/>
          </div>

          <div className="form-group">
            <label>Mặt Hàng</label>
            <textarea placeholder="Nhập mặt hàng và số lượng" rows="4"></textarea>
          </div>

          <div className="form-group">
            <label>Giá Đơn Vị</label>
            <input type="number" placeholder="Nhập giá đơn vị" />
          </div>

          <div className="form-group">
            <label>Số Lượng</label>
            <input type="number" placeholder="Nhập số lượng" />
          </div>

          <div className="form-group">
            <label>Tổng Số Tiền</label>
            <input type="number" placeholder="Nhập tổng số tiền" />
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
      <style jsx>{`
        .container {
          min-height: 100vh;
          background: #f8f9fa;
          padding: 40px 20px;
        }

        .form-wrapper {
          max-width: 1200px;
          margin: 0 auto;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          padding: 30px;
        }

        .title {
          text-align: center;
          font-size: 28px;
          color: #2d3748;
          margin-bottom: 30px;
          font-weight: 600;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .form-group {
          margin-bottom: 0;
        }

        .full-width {
          grid-column: span 3;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
          color: #4a5568;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          font-size: 14px;
          transition: all 0.3s ease;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #4299e1;
          box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.1);
        }

        textarea, input {
          background-color: #fff;
        };

        .button-container {
          margin-top: 32px;
          display: flex;
          justify-content: flex-end;
        }

        .submit-btn {
          background: #4299e1;
          color: white;
          padding: 12px 32px;
          border: none;
          border-radius: 6px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .submit-btn:hover {
          background: #3182ce;
          transform: translateY(-1px);
        }

        .submit-btn:active {
          transform: translateY(0);
        }

        @media (max-width: 1024px) {
          .form-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .full-width {
            grid-column: span 2;
          }
        }

        @media (max-width: 768px) {
          .form-grid {
            grid-template-columns: 1fr;
          }
          
          .full-width {
            grid-column: span 1;
          }
          
          .form-wrapper {
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default InvoiceForm;