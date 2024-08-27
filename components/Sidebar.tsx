"use client";

import { TITLE } from "@/utils/enum";
import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

const Sidebar = (props) => {
  const {
    elements,
    title,
    titleColor,
    selectedElement,
    setElements,
    setStyles,
    styles
  } = props;
  const selectedElementIndex = elements.find(
    (element) => element.elementType.toUpperCase() === selectedElement
  );

  return (
    <div>
      <h1
        style={{
          padding: 10,
          color: "#000",
          textAlign: "center",
        }}
      >
        {title}
      </h1>
      <hr />

      <div
        style={{
          padding: 10,
          color: "#000",
        }}
      >
        {title !== TITLE.IMAGE && (
          <>
            <p>
              {titleColor}: {selectedElementIndex?.style?.color}
            </p>
            <HexColorPicker
              style={{
                width: 150,
                height: 80,
              }}
              color={selectedElementIndex?.style?.color}
              onChange={(newColor) => {
                setElements((prev) => {
                  return prev.map((element) => {
                    if (element.elementType.toUpperCase() === selectedElement) {
                      return {
                        ...element,
                        style: {
                          ...element.style,
                          color: newColor,
                        },
                      };
                    }
                    return element;
                  });
                });
              }}
            />
          </>
        )}
      </div>
      <div
        style={{
          width: "100%",
          marginTop: "50px",
          padding: 10,
        }}
      >
        {title === TITLE.IMAGE && (
          <>
            <span
              style={{
                color: "#000",
                display: "block",
                paddingBottom: "10px",
              }}
            >
              Width: {selectedElementIndex?.style?.widthImg[1]}px
            </span>
            <RangeSlider
              value={selectedElementIndex?.style?.widthImg}
              onInput={(e) =>
                setElements((prev) => {
                  return prev.map((element) => {
                    if (element.elementType.toUpperCase() === selectedElement) {
                      return {
                        ...element,
                        style: {
                          ...element.style,
                          widthImg: [e[0], e[1]],
                        },
                      };
                    }
                    return element;
                  });
                })
              }
              rangeSlideDisabled={true}
              thumbsDisabled={[true, false]}
            />
            <span
              style={{
                color: "#000",
                display: "block",
                paddingBottom: "10px",
              }}
            >
              Height: {selectedElementIndex?.style?.heightImg[1]}px
            </span>
            <RangeSlider
              value={selectedElementIndex?.style?.heightImg}
              onInput={(e) =>
                setElements((prev) => {
                  return prev.map((element) => {
                    if (element.elementType.toUpperCase() === selectedElement) {
                      return {
                        ...element,
                        style: {
                          ...element.style,
                          heightImg: [e[0], e[1]],
                        },
                      };
                    }
                    return element;
                  });
                })
              }
              rangeSlideDisabled={true}
              thumbsDisabled={[true, false]}
            />
          </>
        )}
        {title !== TITLE.IMAGE && (
          <>
            <span
              style={{
                color: "#000",
                display: "block",
                paddingBottom: "10px",
              }}
            >
              Width: {styles?.width[1]} %
            </span>
            <RangeSlider
              value={styles?.width}
              onInput={(e) =>
                setStyles((prev) => {
                  return {
                    ...prev,
                    width: [e[0], e[1]],
                  };
                })
              }
              rangeSlideDisabled={true}
              thumbsDisabled={[true, false]}
            />
          </>
        )}

        {(title === TITLE.CONTENT || title === TITLE.HEADER) && (
          <div>
            <span
              style={{
                color: "#000",
                display: "block",
                padding: "10px 0",
              }}
            >
              Font size: {selectedElementIndex?.style?.fontSize[1]}px
            </span>
            <RangeSlider
              value={selectedElementIndex?.style?.fontSize}
              onInput={(e) =>
                setElements((prev) => {
                  return prev.map((element) => {
                    if (element.elementType.toUpperCase() === selectedElement) {
                      return {
                        ...element,
                        style: {
                          ...element.style,
                          fontSize: [e[0], e[1]],
                        },
                      };
                    }
                    return element;
                  });
                })
              }
              rangeSlideDisabled={true}
              thumbsDisabled={[true, false]}
            />
            <span
              style={{
                color: "#000",
                display: "block",
                padding: "10px 0",
              }}
            >
              Font weight:
            </span>

            <select
              style={{
                width: "100%",
                backgroundColor: "transparent",
                color: "#000",
              }}
              value={selectedElementIndex?.style?.fontWeight}
              onChange={(e) =>
                setElements((prev) => {
                  return prev.map((element) => {
                    if (element.elementType.toUpperCase() === selectedElement) {
                      return {
                        ...element,
                        style: { ...element.style, fontWeight: e.target.value },
                      };
                    }
                    return element;
                  });
                })
              }
            >
              <option value="normal">Normal</option>
              <option value="bold">Bold</option>
            </select>

            <span
              style={{
                color: "#000",
                display: "block",
                padding: "10px 0",
              }}
            >
              Text align:
            </span>

            <select
              style={{
                width: "100%",
                backgroundColor: "transparent",
                color: "#000",
              }}
              value={selectedElementIndex?.style?.textAlign}
              onChange={(e) =>
                setElements((prev) => {
                  return prev.map((element) => {
                    if (element.elementType.toUpperCase() === selectedElement) {
                      return {
                        ...element,
                        style: { ...element.style, textAlign: e.target.value },
                      };
                    }
                    return element;
                  });
                })
              }
            >
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
            </select>

            <span
              style={{
                color: "#000",
                display: "block",
                padding: "10px 0",
              }}
            >
              Content:
            </span>

            <textarea
              style={{
                width: "100%",
                height: 50,
                background: "#fff",
                color: "#000",
              }}
              value={selectedElementIndex?.content}
              onChange={(e) => setElements((prev) => {
                return prev.map((element) => {
                  if (element.elementType.toUpperCase() === selectedElement) {
                    return {
                      ...element,
                      content: e.target.value,
                    };
                  }
                  return element;
                });
              })}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
