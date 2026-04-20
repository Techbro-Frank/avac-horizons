import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

/**
 * Root Layout — wraps every page with Navbar + Footer.
 * Uses React Router's <Outlet /> for nested page rendering.
 */
export function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main
        className="flex-1 pt-16 lg:pt-20"
        id="main-content"
        role="main"
        tabIndex={-1}
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
