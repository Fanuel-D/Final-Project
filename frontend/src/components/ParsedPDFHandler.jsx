import React from "react";

const ParsedPDFHandler = ({ data }) => {
  console.log(data);
  const renderElement = (element) => {
    // Check the suffix of the path to determine the element type

    if (element.Path.includes("H1")) {
      return <h1 style={{ color: "black" }}>{element.Text}</h1>;
    } else if (element.Path.endsWith("Figure")) {
      let URL = `http://localhost:3000/${element.filePaths[0]}`;
      console.log(URL);
      return <img src={URL} alt="Logo" />;
    } else if (element.Path.includes("H2")) {
      return <h2>{element.Text}</h2>;
    } else if (element.Path.includes("H3")) {
      return <h3>{element.Text}</h3>;
    } else if (element.Path.endsWith("Reference")) {
      return <p style={{ color: "black" }}></p>;
    } else if (element.Path.includes("P")) {
      return <p style={{ textAlign: "justify" }}>{element.Text}</p>;
    } else if (element.Path.includes("Lbl")) {
      return;
    } else if (element.Path.includes("LI")) {
      return <li>{element.Text}</li>;
    } else if (element.Path.endsWith("Title")) {
      return <h1 style={{ color: "black" }}>{element.Text}</h1>;
    }
    // else if (element.Path.endsWith("Table")) {
    //   return (
    //     <table>
    //       {element.Children.map((row, index) => (
    //         <tr key={index}>
    //           {row.Children.map((cell, idx) => (
    //             <td key={idx}>{cell.Text}</td>
    //           ))}
    //         </tr>
    //       ))}
    //     </table>
    //   );
    // } else {
    //   return <div>{element.Text}</div>;
    // }
  };

  return (
    <div className="document-structure">
      {data.elements.map((element, index) => (
        <div key={index}>{renderElement(element)}</div>
      ))}
    </div>
  );
};

export default ParsedPDFHandler;
