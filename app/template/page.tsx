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
  const [value, setValue] = useState("");
  const [text, setText] = useState("");
  const [elementTypes, setElementTypes] = useState<any>([]);
  const [isOpenInput, setIsOpenInput] = useState(false);

  const textInputRef = useRef<HTMLInputElement>(null);
  const boxRef = useRef<HTMLHeadingElement>(null);

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
      // setElementType("h2");
    }
  };

  const renderElement = (ElementTag, text) => {
    return (
      <ElementTag
        onClick={(e) => handleElementClick(e.target)}
        onMouseMove={handleMouseMove}
        style={{ color: "#000", cursor: "pointer", width: "100%", wordWrap: "break-word",  }}
      >
        {text}
      </ElementTag>
    );
  };

  const handleAddMore = () => {
    setIsOpenInput((prev) => !prev);
  };

  const handleKeyDownTag = (e) => {
    if (e.key === "Enter") {
      textInputRef.current?.focus();
    }
  };

  const values: any = [];

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      values.push({
        tag: value,
        text,
      });
      setElementTypes((prev) => [...prev, ...values]);
      setIsOpenInput(false);
      setValue("");
      setText("");
    }
  };

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
          height: '70vh',
          color: "#000",
          padding: 100,
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          background: '#c4ed8a',
        }}
      >
        <button
          style={{
            background: "#fff",
            border: "1px solid #000",
            maxWidth: "200px",
            height: "50px",
            borderRadius: "5px",
            color: "#000",
          }}
          onClick={handleAddMore}
        >
          Add more elements
        </button>
        {isOpenInput && (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              marginTop: "20px",
              gap: 20,
            }}
          >
            <input
              type="text"
              value={value}
              placeholder="Type tag you want to add"
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDownTag}
              style={{
                width: "40%",
                height: 50,
                padding: 10,
                borderRadius: "5px",
                background: "#fff",
                color: "#000",
              }}
            />
            <input
              type="text"
              value={text}
              placeholder="Type text you want to add"
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              ref={textInputRef}
              style={{
                width: "40%",
                height: 50,
                padding: 10,
                borderRadius: "5px",
                background: "#fff",
                color: "#000",
              }}
            />
          </div>
        )}
        {elementTypes.length
          ? elementTypes.map(({ tag, text }) => renderElement(tag, text))
          : null}
      </div>
    </div>
  );
};

export default Template;
