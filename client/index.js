import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Simple from './components/Simple';

ReactDOM.render(
  <div className="container-fluid">
  <div className="col-sm-12">
    < Simple/>
  </div>

</div>, document.getElementById('root'));
