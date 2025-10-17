import React, { useRef, useEffect } from "react";
import { createId } from "../src/index";

const width = 250;
const height = width;

const RandomDistribution = () => {
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
        <h1>Cuid2 Random Distribution Test</h1>
        <p>This visualization shows the random distribution of Cuid2 IDs</p>
        <canvas ref={canvasRef} width={width} height={height} />
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
          width: 100vw;
          padding: 2rem;
        }
        h1 {
          margin-bottom: 1rem;
          color: #333;
        }
        p {
          margin-bottom: 2rem;
          color: #666;
        }
      `}</style>
    </>
  );
};

export default RandomDistribution;
