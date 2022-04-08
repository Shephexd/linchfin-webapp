import React from 'react';
import './App.css';
import PortfolioPage from './pages/portfolio'
import { Layout, Row, Col, Divider, Table, Spin } from 'antd';
const {Header, Footer} = Layout;


function App() {
  return (
    <div className="App">
      <Layout className={"site-layout-background"}>
        <Header id="header" style={{maxHeight: "48px"}}>
          <span style={{display: "inline-block", verticalAlign: "middle", lineHeight: "normal"}}>
          </span>
        </Header>
        <PortfolioPage/>
        <Divider style={{margin: 0}}/>
        <Footer id="footer">
            <span style={{display: "inline-block", verticalAlign: "middle", lineHeight: "normal"}}>
              Copyright shephexd Linchfin
            </span>
      </Footer>        
      </Layout>   
    </div>
  );
}

export default App;
