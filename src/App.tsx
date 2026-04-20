import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { HomePage } from "@/pages/Home";
import { AboutPage } from "@/pages/About";
import { ServicesPage } from "@/pages/Services";
import { ProductsPage } from "@/pages/Products";
import { QualityCompliancePage } from "@/pages/QualityCompliance";
import { OEMsPage } from "@/pages/OEMs";
import { ProjectsPage } from "@/pages/Projects";
import { ContactPage } from "@/pages/Contact";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="quality-compliance" element={<QualityCompliancePage />} />
          <Route path="oems" element={<OEMsPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
