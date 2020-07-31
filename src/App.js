import React, { Component, Suspense, lazy } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import GSpinner from './constants/component/spinner/GSpinner';
// --------Lazy loading--------
const MainLayout = lazy(() => import('./main'));

class App extends Component {
  //  --------------- Rendering ----------------
  renderSpinner() {
    return <GSpinner animation="border" variant="primary" />;
  }

  render() {
    return (
      <div>
        <Suspense fallback={this.renderSpinner()}>
          <MainLayout />
        </Suspense>
      </div>
    );
  }
}

export default App;
