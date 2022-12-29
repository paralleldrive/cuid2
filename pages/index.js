import React, { useRef, useEffect } from "react";
import { createId } from "../src/index";

const RandomDistribution = ({ width = 250, height = width }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const plotPixel = () => {
      // Generate a unique id using the createId function
      const id = createId().substring(1);

      // Convert the id to a number between 0 and 1
      const xValue = Number(
        parseInt(id.substring(0, 10), 36) / Math.pow(36, 10)
      );
      const yValue = Number(
        parseInt(id.substring(11, 21), 36) / Math.pow(36, 10)
      );

      // Plot a pixel at a position determined by the id
      const x = Math.floor(xValue * width);
      const y = Math.floor(yValue * height);
      console.log({ xValue, yValue, x, y });
      ctx.fillStyle = `rgb(0, 0, 0, 0.5)`;
      ctx.fillRect(x, y, 1, 1);

      // Schedule the next pixel to be plotted
      requestAnimationFrame(plotPixel);
    };

    // Start plotting pixels
    plotPixel();
  }, []);

  return (
    <>
      <div className="container">
        <canvas ref={canvasRef} width={width} height={height} />
      </div>
      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          width: 100vw;
        }
      `}</style>
    </>
  );
};

export default RandomDistribution;
