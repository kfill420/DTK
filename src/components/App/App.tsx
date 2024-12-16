import './App.scss'

import Header from '../Header/Header';

// import { useAppDispatch, useAppSelector } from '../../hooks/redux';

function App() {
  // const dispatch = useAppDispatch();
  // const isLogged = useAppSelector((state) => state.account.logged);

  return (
    <div className="app">
      <Header />
    </div>
  )
}

export default App;
