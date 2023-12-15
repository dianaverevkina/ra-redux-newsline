
import { Provider } from 'react-redux'
import './App.scss'
import { Newsline } from './components/Newsline/Newsline'
import store from './redux/store'

function App() {
  return (
    <Provider store={store}>
      <Newsline />
    </Provider>
  )
}

export default App
