import { useState } from "react";

const Hexagon = ({ size = 50, strokeColor = "#e76f51" }) => {
  const [isHovered, setIsHovered] = useState(false);
  const radius = size;
  const points = [];

  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 180) * (60 * i - 30);
    const x = radius + radius * Math.cos(angle);
    const y = radius + radius * Math.sin(angle);
    points.push(`${x},${y}`);
  }

  return (
    <svg
      width={radius * 2}
      height={radius * 2}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`transition-all ease-in-out duration-700 transform ${
        isHovered ? "scale-110" : ""
      }`}
    >
      <polygon
        points={points.join(" ")}
        fill="none"
        stroke={strokeColor}
        strokeWidth="1.5"
        className={`transition-all ease-in-out duration-700 ${
          isHovered ? "fill-orange-500" : ""
        }`}
      />
    </svg>
  );
};

// Full Screen Hexagon Grid
const HexagonGrid = () => {
  const radius = 50; // size of each hexagon
  const hexWidth = Math.sqrt(3) * radius; // ~86.6px
  const hexHeight = 2 * radius; // 100px
  const vertSpacing = 0.75 * hexHeight; // 75px
  const horizSpacing = hexWidth; // 86.6px

  const screenWidth = typeof window !== "undefined" ? window.innerWidth : 1920;
  const screenHeight =
    typeof window !== "undefined" ? window.innerHeight : 1080;

  const cols = Math.ceil(screenWidth / horizSpacing) + 2;
  const rows = Math.ceil(screenHeight / vertSpacing) + 2;

  const hexagons = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const xOffset = (row % 2) * (horizSpacing / 2);
      const x = col * horizSpacing + xOffset;
      const y = row * vertSpacing;

      hexagons.push(
        <div
          key={`${row}-${col}`}
          style={{
            position: "absolute",
            left: x,
            top: y,
            width: hexWidth,
            height: hexHeight,
          }}
        >
          <Hexagon size={radius} />
        </div>
      );
    }
  }

  return <div className="absolute inset-0 z-0">{hexagons}</div>;
};

export default HexagonGrid;
