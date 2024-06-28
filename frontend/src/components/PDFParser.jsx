import React, { useEffect, useState } from "react";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import "../pdf-worker";
const PDFParser = ({ file }) => {
  const [text, setText] = useState("");

  useEffect(() => {
    const parsePDF = async () => {
      if (!file) return;
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let textContent = "";

      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const textContentItems = await page.getTextContent();
        textContentItems.items.forEach((item) => {
          textContent += item.str + " ";
        });
      }

      setText(textContent);
    };

    parsePDF();
  }, [file]);

  const createInteractableText = (text) => {
    return text.split(/\s+/).map((word, index) => (
      <span
        key={index}
        className="word"
        onClick={() => alert(`You clicked on the word: ${word}`)}
      >
        {word}
      </span>
    ));
  };

  return <div id="pdfText">{createInteractableText(text)}</div>;
};

export default PDFParser;
