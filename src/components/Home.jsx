import ViewHistory from "./MovieHistory";
import MoviePage from "./MoviePage";

const Home = () => (
  <div className="mt-16 flex w-full overflow-hidden" style={{ height: "90vh" }}>
    <div className="w-2/3 lg:w-3/4">
      <MoviePage />
    </div>
    <div className="w-1/3 lg:w-1/4">
      <ViewHistory />
    </div>
  </div>
);

export default Home;
