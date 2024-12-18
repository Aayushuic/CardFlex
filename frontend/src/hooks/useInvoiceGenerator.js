import { jsPDF } from "jspdf";

const useInvoiceGenerator = () => {
  const generatePDF = (invoiceData) => {
    const doc = new jsPDF();
    doc.setFont("Helvetica", "normal");
    const margin = 15; // Adjusted margin for more space
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;

    // Add page border closer to the edges
    doc.setDrawColor(0, 115, 230); // Border color (CardFlex blue)
    doc.setLineWidth(0.5); // Thin border line
    doc.rect(
      margin - 10,
      margin - 10,
      pageWidth - (margin - 10) * 2,
      pageHeight - (margin - 10) * 2,
      "S"
    );

    // Add watermark
    doc.setFontSize(80);
    doc.setTextColor(200, 200, 200); // Light gray color for watermark
    doc.text(
      "CardFlex",
      pageWidth / 2,
      pageHeight / 2,
      { align: "center", angle: 45 } // Centered and angled watermark
    );

    // Invoice Title
    const invoiceTitleY = margin + 10; // Adjusted margin top for title
    doc.setFontSize(25);
    const invoiceTitle = "INVOICE";
    doc.setTextColor(27, 60, 115); // Original blue color
    doc.text(
      invoiceTitle,
      pageWidth / 2 - doc.getTextWidth(invoiceTitle) / 2,
      invoiceTitleY
    );

    // Horizontal line below Invoice Title
    doc.setDrawColor(0, 115, 230);
    doc.line(margin, invoiceTitleY + 5, pageWidth - margin, invoiceTitleY + 5);

    // Customer & Invoice Details
    const detailsStartY = invoiceTitleY + 15;
    doc.setFontSize(12);
    doc.setTextColor(27, 60, 115);
    doc.text(`Billed To: ${invoiceData.name}`, margin, detailsStartY);
    doc.text(`Phone: ${invoiceData.phoneNumber}`, margin, detailsStartY + 10);
    doc.text(`Email: ${invoiceData.email}`, margin, detailsStartY + 20);
    doc.text(
      "Date:" + new Date(invoiceData.createdAt).toLocaleString(),
      margin,
      detailsStartY + 30
    );

    const paymentMethod =
      invoiceData.paymentMethod == null ? "online" : invoiceData.paymentMethod;
    doc.text(
      `Payment Method: ${paymentMethod}`,
      pageWidth / 2 + margin,
      detailsStartY
    );
    doc.text(
      `Order ID: ${invoiceData?.razorpay_order_id}`,
      pageWidth / 2 + margin,
      detailsStartY + 10
    );
    doc.text(
      `Receipt ID: ${invoiceData.receipt}`,
      pageWidth / 2 + margin,
      detailsStartY + 20
    );
    doc.text(
      `Discount: ${invoiceData.discountPercentage}%`,
      pageWidth / 2 + margin,
      detailsStartY + 30
    );

    // Horizontal line below billing details
    const lineBelowDetailsY = detailsStartY + 40;
    doc.setDrawColor(0, 115, 230);
    doc.line(margin, lineBelowDetailsY, pageWidth - margin, lineBelowDetailsY);

    // Products Table Header
    const tableStartY = lineBelowDetailsY + 10;
    doc.setFontSize(14);
    doc.setFont("courier", "normal");

    doc.setTextColor(27, 60, 115);
    doc.text("Product Name", margin, tableStartY);
    doc.text(`Total(In Indian Rupee)`, pageWidth - margin - 3, tableStartY, {
      align: "right",
    });

    // Product Table Content
    doc.setFontSize(12);
    doc.setTextColor(27, 60, 115);
    let yPosition = tableStartY + 10;
    let grandTotal = 0;

    invoiceData.product.forEach((file) => {
      doc.text(file.title, margin, yPosition);
      doc.text(`${file.newPrice}`, pageWidth - margin - 30, yPosition, {
        align: "right",
      });
      grandTotal += file.newPrice;
      yPosition += 10; // Space between rows
    });

    // Total Amount
    yPosition += 10;
    doc.setFontSize(14);
    doc.setTextColor(27, 60, 115);
    doc.text("Total:", pageWidth - 80, yPosition, { align: "right" });
    doc.text(`${grandTotal}`, pageWidth - margin - 30, yPosition, {
      align: "right",
    });

    yPosition += 10;
    doc.text("Discount:", pageWidth - 80, yPosition, { align: "right" });
    let discountAmount = grandTotal * (invoiceData.discountPercentage / 100);

    // Format the discount amount to 2 decimal places
    let formattedDiscountAmount = Math.ceil(discountAmount);
    doc.text(`${formattedDiscountAmount}`, pageWidth - margin - 30, yPosition, {
      align: "right",
    });

    yPosition += 10;
    doc.text("Paid Amount:", pageWidth - 80, yPosition, { align: "right" });
    doc.text(
      `${grandTotal - formattedDiscountAmount}`,
      pageWidth - margin - 30,
      yPosition,
      {
        align: "right",
      }
    );

    // Footer
    const footerY = pageHeight - margin - 20;
    doc.setFontSize(10);
    doc.setTextColor(85, 85, 85);
    doc.text("Thank you for purchasing!", margin, footerY);

    // Clickable CardFlex link
    doc.setTextColor(0, 102, 204); // Blue color for link
    doc.textWithLink(
      "Visit us at https://cardflex.in for more.",
      margin,
      footerY + 10,
      { url: "https://cardflex.in" }
    );

    // Save the PDF
    doc.save(`CardFlex_${invoiceData?.razorpay_order_id}.pdf`);
  };

  return { generatePDF };
};

export default useInvoiceGenerator;
