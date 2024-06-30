import React from "react";

const ParsedPDFHandler = ({ data }) => {
  {
    console.log(data);
  }
  const renderElement = (element) => {
    switch (element.Type) {
      case "H":
      case "H1":
        return <h1>{element.Text}</h1>;
      case "H2":
        return <h2>{element.Text}</h2>;
      case "H3":
        return <h3>{element.Text}</h3>;
      case "P":
        return <p>{element.Text}</p>;
      case "L":
        return (
          <ul>
            {element.Children.map((child, index) =>
              renderElement(child, index)
            )}
          </ul>
        );
      case "Li":
        return <li>{element.Text}</li>;
      case "Table":
        // Assuming table data is structured appropriately
        return (
          <table>
            {element.Children.map((row, index) => (
              <tr key={index}>
                {row.Children.map((cell, idx) => (
                  <td key={idx}>{cell.Text}</td>
                ))}
              </tr>
            ))}
          </table>
        );
      default:
        return <div>{element.Text}</div>;
    }
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
