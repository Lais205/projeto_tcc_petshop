import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCatalog from './components/ProductCatalog';
import Services from './components/Services';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main>
        <Hero />
        <ProductCatalog />
        <Services />
      </main>
      <Footer />
    </div>
  );
}

export default App;
