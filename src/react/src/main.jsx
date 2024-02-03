import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { Layout } from "./components/Layout"

ReactDOM.createRoot(document.getElementById('root')).render(
  // <Layout>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  // </Layout>
);
