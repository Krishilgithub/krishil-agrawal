const fs = require('fs');
const PDFParser = require("pdf2json");

let pdfParser = new PDFParser(this, 1);

pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError));
pdfParser.on("pdfParser_dataReady", pdfData => {
    fs.writeFileSync('resume_utf8.txt', pdfParser.getRawTextContent().replace(/\\r\\n/g, '\n'), 'utf8');
});

pdfParser.loadPDF("./public/resume.pdf");
