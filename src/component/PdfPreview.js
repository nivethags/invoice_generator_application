import React from 'react';
import jsPDF from 'jspdf';

const PdfPreview = ({ data }) => {
    const generatePdf = () => {
        const doc = new jsPDF();

        doc.text(`Name: ${data.name}`, 10, 10);
        doc.text(`Email: ${data.email}`, 10, 20);
        doc.text(`Address: ${data.address}`, 10, 30);

        doc.save('user-data.pdf');
    };

    return (
        <div>
            <h2>Preview PDF</h2>
            <p>Name: {data.name}</p>
            <p>Email: {data.email}</p>
            <p>Address: {data.address}</p>
            <button onClick={generatePdf}>Download PDF</button>
        </div>
    );
};

export default PdfPreview;
