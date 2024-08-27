/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useRef, useState } from "react";
import "../page.module.css";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { ETagType, TITLE, TITLE_COLOR } from "@/utils/enum";

const defaultStyles = {
  width: [0, 50],
  widthImg: [0, 100],
  heightImg: [0, 100],
  color: "",
  fontSize: [0, 16],
  fontWeight: "",
  textAlign: "",
  backgroundColor: "",
};

const Template = () => {
  const [title, setTitle] = useState<TITLE>(TITLE.CONTAINER);
  const [titleColor, setTitleColor] = useState<TITLE_COLOR>(
    TITLE_COLOR.BACKGROUND_COLOR
  );

  const [hoveredElement, setHoveredElement] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null);
  const [styles, setStyles] = useState<any>(defaultStyles);
  const boxRef = useRef<HTMLHeadingElement>(null);
  const [elements, setElements] = useState([
    {
      id: 1,
      tag: "div",
      elementType: "img",
      content: (
        <img
          src="https://via.placeholder.com/150"
          alt="Placeholder"
          width="100%"
          height="100%"
        />
      ),
      style: defaultStyles,
    },
    {
      id: 2,
      tag: "h1",
      elementType: "h1",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sample 1",
      style: defaultStyles,
    },
    {
      id: 3,
      tag: "p",
      elementType: "p",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sample 2",
      style: defaultStyles,
    },
    {
      id: 4,
      tag: "h3",
      elementType: "h3",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sample 3",
      style: defaultStyles,
    },
  ]);

  useEffect(() => {
    if (selectedElement) {
      setElements((prevElements) => {
        return prevElements.map((el) => {
          if (el.elementType.toUpperCase() === selectedElement) {
            return {
              ...el,
              style: { ...el.style },
            };
          }
          return el;
        });
      });
    }
  }, [selectedElement, styles]);

  const HoverableElement = ({ tag: Tag, children, elementType, style }) => {
    return (
      <Tag
        style={{
          ...style,
          fontSize: style?.fontSize[1],
          width: elementType === "img" ? style?.widthImg[1] : "",
          height: elementType === "img" ? style?.heightImg[1] : "",
          padding: "10px 0",
        }}
      >
        {children}
      </Tag>
    );
  };

  const handleVerifyElement = (element) => {
    const tagName = element.tagName;
    const content = element.innerHTML;

    if (element === boxRef.current) {
      setTitle(TITLE.CONTAINER);
      setTitleColor(TITLE_COLOR.BACKGROUND_COLOR);
      return;
    }

    setSelectedElement(tagName);

    if (tagName !== ETagType.img) {
      setElements((prev) => {
        return prev.map((el) => {
          if (el.elementType.toUpperCase() === tagName) {
            return {
              ...el,
              content: content,
            };
          }
          return el;
        });
      });
    }

    switch (tagName) {
      case ETagType.img:
        setTitle(TITLE.IMAGE);
        break;
      case ETagType.h1:
        setTitle(TITLE.HEADER);
        setTitleColor(TITLE_COLOR.COLOR);
        break;
      case ETagType.h2:
      case ETagType.h3:
      case ETagType.p:
        setTitle(TITLE.CONTENT);
        setTitleColor(TITLE_COLOR.COLOR);
        break;
      default:
        console.log("Clicked on another element:", tagName);
        break;
    }
  };

  const handleMouseEnter = (element) => {
    setHoveredElement(element.target.tagName);
  };

  const handleMouseLeave = () => {
    setHoveredElement(null);
  };

  return (
    <div
      style={{
        backgroundColor: "#fff",
        height: "100vh",
      }}
    >
      <Header boxRef={boxRef} />
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            order: 1,
            borderLeft: "1px solid #000",
            flex: 1,
            height: "95vh",
          }}
        >
          <Sidebar
            setElements={setElements}
            title={title}
            titleColor={titleColor}
            selectedElement={selectedElement}
            elements={elements}
            setStyles={setStyles}
            styles={styles}
          />
        </div>
        <div
          ref={boxRef}
          style={{
            flex: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "95vh",
            backgroundColor: styles.backgroundColor,
          }}
          onClick={(e) => handleVerifyElement(e.target)}
        >
          <div
            style={{
              color: "#000",
              gap: 10,
              width: `${styles.width[1]}%`,
            }}
          >
            {elements.map(({ id, tag, elementType, content, style }, index) => {
              return (
                <div
                  key={`${id}-${tag}`}
                  style={{
                    position: "relative",
                    display: "flex",
                    background:
                      hoveredElement === elementType.toUpperCase()
                        ? "#fafafa"
                        : "transparent",
                    cursor: "pointer",
                  }}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <HoverableElement
                    tag={tag}
                    elementType={elementType}
                    style={style}
                  >
                    {content}
                  </HoverableElement>
                  {/* TODO: Add dev nested */}
                  {/* {hoveredElement === elementType.toUpperCase() && (
                    <div
                      style={{
                        position: "absolute",
                        right: 0,
                        cursor: 'pointer',
                        border: "1px solid #000",
                        borderRadius: "50%",
                        padding: 10,
                        zIndex: 10
                      }}
                      onClick={() => console.log('123')}
                    >
                      +
                    </div>
                  )} */}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template;
