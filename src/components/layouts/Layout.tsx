// components/Layout.tsx
import { ReactNode } from "react";
import ThemeToggle from "../theme/ThemeToggle";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <header
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "10px",
          backgroundColor: "var(--header-bg)",
        }}
      >
        <ThemeToggle />
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
