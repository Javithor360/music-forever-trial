import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout';
import Home from './pages/Home';
import Library from './pages/Library'; // Asegúrate de crear este componente
import NewSong from './pages/NewSong'; // Asegúrate de crear este componente

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/library" element={<Library />} />
          <Route path="/new" element={<NewSong />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;