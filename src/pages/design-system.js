import React, { createContext, useContext, useState, useEffect } from "react";

// Design System Components

// Button Component - CTA and action buttons
export const Button = ({
  children,
  onClick,
  variant = "primary",
  size = "medium",
  disabled = false,
  ...props
}) => {
  return (
    <>
      <button
        className={`btn btn-${variant} btn-${size} ${
          disabled ? "btn-disabled" : ""
        }`}
        onClick={onClick}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
      <style jsx>{`
        .btn {
          border: none;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
          display: inline-block;
          text-align: center;
          font-family: inherit;
        }
        .btn-small {
          padding: 8px 16px;
          font-size: 14px;
        }
        .btn-medium {
          padding: 12px 24px;
          font-size: 16px;
        }
        .btn-large {
          padding: 16px 32px;
          font-size: 18px;
        }
        .btn-primary {
          background-color: var(--primary);
          color: white;
        }
        .btn-primary:hover:not(.btn-disabled) {
          background-color: var(--primary-hover);
          transform: translateY(-1px);
        }
        .btn-primary:active:not(.btn-disabled) {
          transform: translateY(0);
        }
        .btn-secondary {
          background-color: var(--secondary);
          color: var(--text-secondary);
          border: 1px solid var(--border-color);
        }
        .btn-secondary:hover:not(.btn-disabled) {
          background-color: var(--secondary-hover);
        }
        .btn-outline {
          background-color: transparent;
          color: var(--primary);
          border: 2px solid var(--primary);
        }
        .btn-outline:hover:not(.btn-disabled) {
          background-color: var(--primary);
          color: white;
        }
        .btn-accent {
          background-color: var(--accent);
          color: white;
        }
        .btn-accent:hover:not(.btn-disabled) {
          background-color: var(--accent-light);
          transform: translateY(-1px);
        }
        .btn-disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </>
  );
};

export const Header = ({ children }) => {
  return (
    <>
      <header className="header">{children}</header>
      <style jsx>{`
        .header {
          text-align: center;
          margin-bottom: 3rem;
        }
      `}</style>
    </>
  );
};

// Typography Component - Text styling and hierarchy
export const Typography = ({ variant = "body", children, ...props }) => {
  return (
    <>
      <div className={`typography typography-${variant}`} {...props}>
        {children}
      </div>
      <style jsx>{`
        .typography {
          line-height: 1.6;
          color: var(--text-secondary);
        }
        .typography-h1 {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: var(--text-primary);
          line-height: 1.2;
        }
        .typography-h2 {
          font-size: 2rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: var(--text-primary);
          line-height: 1.3;
        }
        .typography-h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
          color: var(--text-primary);
          line-height: 1.4;
        }
        .typography-h4 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
          line-height: 1.4;
        }
        .typography-body {
          font-size: 1rem;
          margin-bottom: 1rem;
          line-height: 1.6;
          color: var(--text-secondary);
        }
        .typography-lead {
          font-size: 1.25rem;
          font-weight: 400;
          margin-bottom: 1.5rem;
          color: var(--text-muted);
          line-height: 1.5;
        }
        .typography-small {
          font-size: 0.875rem;
          color: var(--text-muted);
          line-height: 1.5;
        }
        .typography-caption {
          font-size: 0.75rem;
          color: var(--text-light);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-weight: 600;
        }
        .typography-code {
          font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;
          background-color: var(--bg-tertiary);
          padding: 2px 6px;
          border-radius: var(--radius-sm);
          font-size: 0.875rem;
          color: var(--error);
        }
        .typography-pre {
          font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;
          background-color: var(--bg-tertiary);
          padding: 1rem;
          border-radius: var(--radius-md);
          overflow-x: auto;
          margin: 1rem 0;
          border: 1px solid var(--border-color);
          font-size: 0.875rem;
          line-height: 1.45;
        }
        .typography-blockquote {
          border-left: 4px solid var(--primary);
          padding-left: 1rem;
          margin: 1rem 0;
          font-style: italic;
          color: var(--text-muted);
        }
        .typography-list {
          margin: 1rem 0;
          padding-left: 1.5rem;
        }
        .typography-list li {
          margin-bottom: 0.5rem;
        }
        @media (max-width: 768px) {
          .typography-h1 {
            font-size: 2.5rem;
          }
          .typography-h2 {
            font-size: 1.75rem;
          }
          .typography-h3 {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </>
  );
};

// Card Component - Content containers
export const Card = ({ children, variant = "default", ...props }) => {
  return (
    <>
      <div className={`card card-${variant}`} {...props}>
        {children}
      </div>
      <style jsx>{`
        .card {
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          margin-bottom: 1.5rem;
          box-shadow: var(--shadow-sm);
          transition: box-shadow 0.2s ease, border-color 0.2s ease;
        }
        .card:hover {
          box-shadow: var(--shadow-md);
        }
        .card-elevated {
          box-shadow: var(--shadow-md);
        }
        .card-outlined {
          border: 2px solid var(--border-color);
          box-shadow: none;
        }
        .card-flat {
          border: none;
          box-shadow: none;
          background: var(--bg-secondary);
        }
        .card-accent {
          border: 1px solid var(--accent);
          background: var(--bg-primary);
        }
        .card-accent:hover {
          border-color: var(--accent-light);
          box-shadow: var(--shadow-md);
        }
      `}</style>
    </>
  );
};

// Container Component - Layout wrapper
export const Container = ({
  children,
  maxWidth = "1200px",
  padding = "default",
}) => {
  return (
    <>
      <div className={`container container-${padding}`}>{children}</div>
      <style jsx>{`
        .container {
          max-width: ${maxWidth};
          margin: 0 auto;
        }
        .container-default {
          padding: 0 1rem;
        }
        .container-small {
          padding: 0 0.5rem;
        }
        .container-large {
          padding: 0 2rem;
        }
        .container-none {
          padding: 0;
        }
        @media (min-width: 768px) {
          .container-default {
            padding: 0 2rem;
          }
          .container-small {
            padding: 0 1rem;
          }
          .container-large {
            padding: 0 3rem;
          }
        }
      `}</style>
    </>
  );
};

// Grid Component - Layout system
export const Grid = ({ children, columns = "auto", gap = "1rem" }) => {
  return (
    <>
      <div className="grid">{children}</div>
      <style jsx>{`
        .grid {
          display: grid;
          gap: ${gap};
          grid-template-columns: ${columns === "auto"
            ? "repeat(auto-fit, minmax(300px, 1fr))"
            : `repeat(${columns}, 1fr)`};
        }
        @media (max-width: 768px) {
          .grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
};

// Flex Component - Flexible layout
export const Flex = ({
  children,
  direction = "row",
  align = "center",
  justify = "center",
  gap = "1rem",
  wrap = false,
}) => {
  return (
    <>
      <div className="flex">{children}</div>
      <style jsx>{`
        .flex {
          display: flex;
          flex-direction: ${direction};
          align-items: ${align};
          justify-content: ${justify};
          gap: ${gap};
          ${wrap ? "flex-wrap: wrap;" : ""}
        }
      `}</style>
    </>
  );
};

// Section Component - Page sections
export const Section = ({
  children,
  background = "transparent",
  padding = "default",
}) => {
  return (
    <>
      <section className={`section section-${background} section-${padding}`}>
        {children}
      </section>
      <style jsx>{`
        .section {
          width: 100%;
        }
        .section-transparent {
          background: transparent;
        }
        .section-light {
          background: #f8f9fa;
        }
        .section-white {
          background: white;
        }
        .section-default {
          padding: 3rem 0;
        }
        .section-small {
          padding: 1.5rem 0;
        }
        .section-large {
          padding: 6rem 0;
        }
        .section-none {
          padding: 0;
        }
      `}</style>
    </>
  );
};

// Hero Component - Specialized hero section styling
export const Hero = ({ children, gradient = "blue-purple" }) => {
  return (
    <>
      <div className={`hero hero-${gradient}`}>{children}</div>
      <style jsx>{`
        .hero {
          min-height: 60vh;
          display: flex;
          align-items: center;
          color: white;
          position: relative;
        }
        .hero-blue-purple {
          background: linear-gradient(
            135deg,
            var(--primary) 0%,
            var(--accent) 100%
          );
        }
        .hero-accent {
          background: linear-gradient(
            135deg,
            var(--accent) 0%,
            var(--accent-light) 100%
          );
        }
        .hero-dark {
          background: linear-gradient(
            135deg,
            var(--bg-tertiary) 0%,
            var(--bg-secondary) 100%
          );
        }
        .hero-success {
          background: linear-gradient(
            135deg,
            var(--success) 0%,
            var(--primary) 100%
          );
        }
        .hero-warning {
          background: linear-gradient(
            135deg,
            var(--warning) 0%,
            var(--error) 100%
          );
        }
      `}</style>
    </>
  );
};

// ID Display Component - Specialized for showing generated IDs
export const IdDisplay = ({ ids, title = "Generated IDs" }) => {
  return (
    <>
      <div className="id-display">
        <Typography variant="h3">{title}</Typography>
        <div className="id-list">
          {ids.map((id, index) => (
            <div key={index} className="id-item">
              <Typography variant="code">{id}</Typography>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .id-display {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 2rem;
          margin-top: 2rem;
          backdrop-filter: blur(10px);
        }
        .id-list {
          display: grid;
          gap: 1rem;
          margin: 1.5rem 0;
        }
        .id-item {
          background: rgba(255, 255, 255, 0.1);
          padding: 1rem;
          border-radius: 6px;
          text-align: center;
        }
        .id-item .typography-code {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          font-size: 1.1rem;
          padding: 0.5rem 1rem;
        }
        @media (min-width: 768px) {
          .id-list {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          }
        }
      `}</style>
    </>
  );
};

// Code Block Component - Enhanced code display
export const CodeBlock = ({ children, language = "javascript" }) => {
  return (
    <>
      <div className="code-block">
        <div className="code-header">
          <Typography variant="caption">{language}</Typography>
        </div>
        <Typography variant="pre">{children}</Typography>
      </div>
      <style jsx>{`
        .code-block {
          margin: 1.5rem 0;
        }
        .code-header {
          background: #f6f8fa;
          border: 1px solid #e1e4e8;
          border-bottom: none;
          border-radius: 6px 6px 0 0;
          padding: 0.5rem 1rem;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-weight: 600;
          color: #666;
        }
        .code-block .typography-pre {
          border-radius: 0 0 6px 6px;
          margin: 0;
        }
      `}</style>
    </>
  );
};

// Dark Mode Context
const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => 
    (typeof window !== "undefined" && window.matchMedia) ? window.matchMedia('(prefers-color-scheme: dark)').matches : true
  );

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  useEffect(() => {
    // Apply theme to body
    document.body.setAttribute("data-theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }
  return context;
};

// Dark Mode Toggle Component
export const DarkModeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <>
      <button
        className="dark-mode-toggle"
        onClick={toggleDarkMode}
        aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
      >
        {isDarkMode ? "☀️" : "🌙"}
      </button>
      <style jsx>{`
        .dark-mode-toggle {
          position: fixed;
          top: 1rem;
          right: 1rem;
          z-index: 1000;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: 50%;
          width: 3rem;
          height: 3rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 1.2rem;
          transition: all 0.2s ease;
          box-shadow: var(--shadow-sm);
        }
        .dark-mode-toggle:hover {
          transform: scale(1.1);
          box-shadow: var(--shadow-md);
        }
      `}</style>
    </>
  );
};

// Global styles for the design system with dark mode support
export const GlobalStyles = () => {
  useDarkMode(); // Initialize dark mode context

  return (
    <style jsx global>{`
      :root {
        /* Light mode colors */
        --primary: #0070f3;
        --primary-hover: #0051cc;
        --secondary: #f1f3f4;
        --secondary-hover: #e8eaed;
        --accent: #764ba2;
        --accent-light: #9c7bb8;
        --success: #00d4aa;
        --warning: #ffb800;
        --error: #ff6b6b;

        --text-primary: #000;
        --text-secondary: #333;
        --text-muted: #666;
        --text-light: #999;

        --bg-primary: #ffffff;
        --bg-secondary: #f8f9fa;
        --bg-tertiary: #f1f3f4;

        --border-color: #e1e4e8;
        --border-light: #f1f3f4;

        --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
        --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.15);
        --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.2);

        --radius-sm: 3px;
        --radius-md: 6px;
        --radius-lg: 8px;
        --radius-xl: 12px;
      }

      [data-theme="dark"] {
        /* Dark mode colors */
        --primary: #4dabf7;
        --primary-hover: #339af0;
        --secondary: #2c2c2c;
        --secondary-hover: #3c3c3c;
        --accent: #9c7bb8;
        --accent-light: #b794d6;
        --success: #51cf66;
        --warning: #ffd43b;
        --error: #ff8787;

        --text-primary: #ffffff;
        --text-secondary: #e9ecef;
        --text-muted: #adb5bd;
        --text-light: #6c757d;

        --bg-primary: #1a1a1a;
        --bg-secondary: #2d2d2d;
        --bg-tertiary: #3c3c3c;

        --border-color: #404040;
        --border-light: #2c2c2c;

        --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.3);
        --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.4);
        --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.5);
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
          "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
          "Helvetica Neue", sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background-color: var(--bg-secondary);
        color: var(--text-primary);
        transition: background-color 0.2s ease, color 0.2s ease;
      }

      html {
        scroll-behavior: smooth;
      }

      a {
        color: var(--primary);
        text-decoration: none;
        transition: color 0.2s ease;
      }

      a:hover {
        text-decoration: underline;
        color: var(--primary-hover);
      }

      /* Apply theme to body */
      body[data-theme="dark"] {
        background-color: var(--bg-secondary);
        color: var(--text-primary);
      }
    `}</style>
  );
};

// Design System Documentation Component
export const DesignSystemDocs = () => (
  <>
    <Container>
      <Typography variant="h1">Design System</Typography>
      <Typography variant="lead">
        A comprehensive design system for the Cuid2 homepage, following KISS
        principles.
      </Typography>

      <Card>
        <Typography variant="h2">Components</Typography>
        <Typography variant="body">
          This design system includes the following components:
        </Typography>
        <Typography variant="list">
          <li>
            <strong>Button</strong> - CTA and action buttons with variants
            (primary, secondary, outline)
          </li>
          <li>
            <strong>Typography</strong> - Text styling with hierarchy (h1-h4,
            body, lead, small, code, pre)
          </li>
          <li>
            <strong>Card</strong> - Content containers with variants (default,
            elevated, outlined, flat)
          </li>
          <li>
            <strong>Container</strong> - Layout wrapper with responsive padding
          </li>
          <li>
            <strong>Grid</strong> - CSS Grid layout system
          </li>
          <li>
            <strong>Flex</strong> - Flexible layout component
          </li>
          <li>
            <strong>Section</strong> - Page sections with background and padding
            variants
          </li>
          <li>
            <strong>Hero</strong> - Specialized hero section with gradient
            backgrounds
          </li>
          <li>
            <strong>IdDisplay</strong> - Specialized component for showing
            generated IDs
          </li>
          <li>
            <strong>CodeBlock</strong> - Enhanced code display with language
            headers
          </li>
        </Typography>
      </Card>

      <Card>
        <Typography variant="h2">Usage</Typography>
        <Typography variant="body">
          Import components from the design system:
        </Typography>
        <CodeBlock language="javascript">
          {`import { 
  Button, 
  Typography, 
  Card, 
  Container, 
  Hero,
  IdDisplay 
} from '../design-system';`}
        </CodeBlock>
      </Card>
    </Container>
  </>
);

// Default export - Design System Documentation Page Component
const DesignSystem = () => {
  return (
    <DarkModeProvider>
      <GlobalStyles />
      <DarkModeToggle />
      <DesignSystemDocs />
    </DarkModeProvider>
  );
};

export default DesignSystem;
