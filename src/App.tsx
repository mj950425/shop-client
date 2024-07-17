import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomerPage from './pages/CustomerPage';
import PartnerPage from './pages/PartnerPage';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<CustomerPage />} />
                <Route path="/partner/:partnerId" element={<PartnerPage />} />
            </Routes>
        </Router>
    );
};

export default App;
