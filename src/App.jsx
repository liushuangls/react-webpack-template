import logo from "./logo.svg";
import './App.css'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to 233</h1>
        </header>
      </div>
    )
  }
}

export default App
