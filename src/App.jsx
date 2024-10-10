import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LeadsTable from './components/LeadsTable';
import Analytics from './components/Analytics';
import ErrorBoundary from './components/ErrorBoundary';
import "./App.css"


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <ErrorBoundary>
                <LeadsTable />
              </ErrorBoundary>
            }
          />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
