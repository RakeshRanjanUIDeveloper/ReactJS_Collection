import './App.css';
import Footer from './components/Footer/Footer';
import AppRoutes from './AppRoutes';
import { Provider } from 'react-redux';
import { store } from './appRedux/store';

function App() {

  return (
    <Provider store={store}>
      <div className="App">
        <AppRoutes />
        <Footer />
      </div>
    </Provider>
  );
}

export default App;
