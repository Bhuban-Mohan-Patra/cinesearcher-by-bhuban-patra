// eslint-disable-next-line import/extensions
import ViewHistory from "components/MovieHistory";
import MoviePage from "components/MoviePage";

import "./App.css";

const App = () => (
  <div className="App grid grid-cols-4">
    <div className="col-span-3">
      <MoviePage />
    </div>
    <div className="col-span-1 mx-4 my-10 flex justify-center">
      <ViewHistory />
    </div>
  </div>
);

export default App;
