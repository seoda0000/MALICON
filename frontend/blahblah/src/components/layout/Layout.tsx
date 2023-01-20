import "./Layout.modules.css";
import NavBar from "./NavBar";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

function Layout(props: LayoutProps) {
  return (
    <div>
      <NavBar />
      <main className="main">{props.children}</main>
    </div>
  );
}
export default Layout;
