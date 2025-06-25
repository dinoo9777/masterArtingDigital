
import './App.css';
import { Provider } from 'react-redux';
import { store } from './store';
import Home from './pages/Home';
import { useEffect } from 'react';
import Header from './components/header';

function App() {
  useEffect(() => {
    document.documentElement.classList.add('dark'); // set dark by default
  }, []);

  return (
    <>
      <Provider store={store}>
        <Header />
        <div className="min-h-screen bg-gray-900 text-white">
          <Home />
        </div>
      </Provider>
    </>
  )
}

export default App
