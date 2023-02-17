import './App.css';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
        <Navbar />
        <ContactForm />
        <Footer />
    </div>
  );
}

export default App;
