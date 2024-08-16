"use client";

import React, { useRef, useState } from "react";
import { saveAs } from "file-saver";
import { HexColorPicker } from "react-colorful";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import "../page.module.css";

const Template = () => {
  const [color, setColor] = useState("#fff");
  const [range, setRange] = useState([0, 100]);
  const [selectedElement, setSelectedElement] = useState<any>(null);
  const boxRef = useRef<HTMLHeadingElement>(null);
  const [elementType, setElementType] = useState("h1");

  const handleElementClick = (element) => {
    setSelectedElement(element);
  };

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
    saveAs(blob, "example.html");
  };

  const handleMouseMove = (e) => {
    if (selectedElement && e.target === selectedElement) {
      setElementType("h2"); // Thay đổi thẻ thành "h2" (hoặc thẻ khác bạn muốn)
    }
  };

  const renderElement = (ElementTag) => (
    <ElementTag
      onClick={(e) => handleElementClick(e.target)}
      onMouseMove={handleMouseMove}
      style={{ color }}
    >
      Click me to change my type!
    </ElementTag>
  );

  return (
    <div
      style={{
        backgroundColor: "#fff",
        height: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "30vh",
          paddingTop: 20,
          borderBottom: "1px solid #000",
        }}
      >
        <button onClick={createHtmlFile}>Export HTML</button>
        <HexColorPicker
          style={{
            width: 200,
            height: 100,
            marginTop: "50px",
          }}
          color={color}
          onChange={(newColor) => {
            setColor(newColor);
            if (selectedElement) {
              selectedElement.style.color = newColor;
            }
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "50%",
            marginTop: "50px",
          }}
        >
          <h2
            style={{
              color: "#000",
              marginRight: "50px",
              width: "250px",
            }}
          >
            Width: {range[1]} %
          </h2>
          <RangeSlider
            value={range}
            onInput={setRange}
            rangeSlideDisabled={true}
            thumbsDisabled={[true, false]}
          />
        </div>
      </div>
      <div
        ref={boxRef}
        style={{
          width: `${range[1]}%`,
          color: "#000",
          padding: 100,
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
        }}
      >
        <h1
          style={{
            cursor: "pointer",
          }}
          onClick={(e) => handleElementClick(e.target)}
          onMouseMove={(e) => console.log(e.target)}
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates
          quaerat possimus beatae ex libero, harum officia in sequi culpa
          expedita, aspernatur nesciunt fugiat. Voluptatem unde consectetur
          reiciendis itaque, ex repudiandae.
        </h1>
        <h2
          style={{
            cursor: "pointer",
          }}
          onClick={(e) => handleElementClick(e.target)}
        >
          Hello
        </h2>
        <h3
          style={{
            cursor: "pointer",
          }}
          onClick={(e) => handleElementClick(e.target)}
        >
          Hehe
        </h3>
        {renderElement(elementType)}
      </div>
    </div>
  );
};

export default Template;
