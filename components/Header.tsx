"use client";

import React from "react";
import { saveAs } from "file-saver";

const Header = (props) => {
  const { boxRef } = props;
  const createHtmlFile = () => {
    const htmlContent = `
          <html>
          <head><title>Example</title></head>
          <body>
            ${boxRef.current && boxRef.current.outerHTML}
          </body>
          </html>
        `;

    const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8" });
    saveAs(blob, "template.html");
  };

  return (
    <div
      style={{
        height: 48,
        width: "100%",
        border: "1px solid #000",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <button
        style={{
          margin: 10,
          background: "#000",
          padding: 10,
          borderRadius: 10,
          border: "none",
          width: "8rem",
          height: "2rem",
        }}
        onClick={createHtmlFile}
      >
        Export
      </button>
    </div>
  );
};

export default Header;
