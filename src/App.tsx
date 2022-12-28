import React from 'react';
import './App.css';
import PortfolioPage from './pages/portfolio';
import RebalancingPage from './pages/rebalancing';
import { Routes, Route } from "react-router-dom";
import { Layout, Row, Col, Divider, Table, Spin } from 'antd';
const { Header, Footer } = Layout;


function App() {
  return (
    <div className="App">
      <Layout className={"site-layout-background"}>
        <Header id="header" style={{ maxHeight: "48px" }}>
          <span style={{ display: "inline-block", verticalAlign: "middle", lineHeight: "normal" }}>
          </span>
        </Header>
        <Routes>
          <Route path="/" element={<PortfolioPage />} />
{/*            <Route path="/portfolio" element={<PortfolioPage />} /> */}
{/* //           <Route path="/rebalancing" element={<RebalancingPage />} /> */}
        </Routes>
        <Divider style={{ margin: 0 }} />
        <Footer id="footer">
          <span style={{ display: "inline-block", verticalAlign: "middle", lineHeight: "normal" }}>
            Copyright shephexd Linchfin
          </span>
        </Footer>
      </Layout>
    </div>
  );
}

export default App;
