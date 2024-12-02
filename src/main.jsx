import { createRoot } from 'react-dom/client'
import HomeContainer from './components/Home/Home.jsx'
import store from './services/store/index.jsx'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <HomeContainer />
  </Provider>
)
