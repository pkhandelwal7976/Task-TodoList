import './App.css';
import Todo from './components/todo/todo.js';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../node_modules/jquery/dist/jquery.min.js';
import 'jquery/src/jquery';
import 'bootstrap/dist/js/bootstrap.js';

function App() {
  return (
    <div>
      <Todo/>
    </div>
  );
}

export default App;
