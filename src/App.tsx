import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import './App.css';
//引入store
import store from './store/index';

import { router } from './routes/index';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </div>
  );
}

export default App;
