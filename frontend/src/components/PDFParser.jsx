import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const extractTextFromPDF = async (file) => {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onload = async (event) => {
      try {
        const typedArray = new Uint8Array(event.target.result);
        const loadingTask = pdfjsLib.getDocument(typedArray);
        const pdf = await loadingTask.promise;
        let text = "";
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const textContent = await page.getTextContent();
          text += textContent.items.map((item) => item.str).join(" ");
        }
        resolve(text);
      } catch (error) {
        reject(error);
      }
    };
    reader.readAsArrayBuffer(file);
  });
};

export default function PDFParser({ file }) {
  const [words, setWords] = useState([]);
  useEffect(() => {
    if (file) {
      extractTextFromPDF(file).then((text) => {
        setWords(text.split(/\s+/));
      });
    }
  }, [file]);
  const handleWordClick = (word) => {
    console.log("Word clicked:", word);
  };
  return (
    <div>
      {words.map((word, index) => (
        <span
          key={index}
          onClick={() => handleWordClick(word)}
          style={{ margin: "0 5px", cursor: "pointer" }}
        >
          {word}
        </span>
      ))}
    </div>
  );
}
