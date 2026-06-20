import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { ConfiguratorLayout } from "./pages/setup/ConfiguratorLayout";
import { CollegeSelection } from "./pages/setup/CollegeSelection";
import { BrowseProducts } from "./pages/setup/BrowseProducts";
import { ReviewOrder } from "./pages/setup/ReviewOrder";
import { DeliveryDetails } from "./pages/setup/DeliveryDetails";
import { ProductDrawer } from "./components/builder/ProductDrawer";

function App() {
  return (
    <div className="font-sans antialiased text-primary selection:bg-accent/20 h-full">
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/setup" element={<ConfiguratorLayout />}>
          <Route index element={<CollegeSelection />} />
          <Route path="browse" element={<BrowseProducts />} />
          <Route path="review" element={<ReviewOrder />} />
          <Route path="delivery" element={<DeliveryDetails />} />
        </Route>
      </Routes>
      
      {/* Product Drawer is global for setup, can stay here or inside ConfiguratorLayout */}
      <ProductDrawer />
    </div>
  );
}

export default App;
