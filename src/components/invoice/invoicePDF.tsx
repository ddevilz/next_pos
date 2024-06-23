import React from "react";

interface InvoiceReceiptProps {
  invoiceData: any; // Replace with the type of your invoice data
}

const InvoiceReceipt: React.FC<InvoiceReceiptProps> = ({ invoiceData }) => {
  return (
    <div className="invoice-container">
      <h2>Invoice</h2>
      <div>
        <p>
          <strong>Customer Name:</strong> {invoiceData.cname}
        </p>
        <p>
          <strong>Address:</strong> {invoiceData.add1}
        </p>
        <p>
          <strong>Mobile:</strong> {invoiceData.mobile}
        </p>
      </div>
      <table>
        <thead>
          <tr>
            <th>Service Name</th>
            <th>Rate</th>
            <th>Quantity</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {invoiceData.addedServices.map((service: any, index: number) => (
            <tr key={index}>
              <td>{service.iname}</td>
              <td>{service.rate}</td>
              <td>{service.quantity}</td>
              <td>{service.rate * service.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <p>
          <strong>Total Amount:</strong> ${invoiceData.totalAmount}
        </p>
        <p>
          <strong>Discount Amount:</strong> ${invoiceData.discountAmount}
        </p>
        <p>
          <strong>GST:</strong> ${invoiceData.gst}
        </p>
        <p>
          <strong>Total After Discount:</strong> $
          {invoiceData.totalAfterDiscount}
        </p>
        <p>
          <strong>Total After GST:</strong> ${invoiceData.totalAfterGST}
        </p>
        <p>
          <strong>Advance Paid:</strong> ${invoiceData.advancePaid}
        </p>
        <p>
          <strong>Remaining Amount:</strong> ${invoiceData.remainingAmount}
        </p>
      </div>
    </div>
  );
};

export default InvoiceReceipt;
