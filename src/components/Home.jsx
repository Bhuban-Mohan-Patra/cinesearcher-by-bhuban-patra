import ViewHistory from "./MovieHistory";
import MoviePage from "./MoviePage";

const Home = () => (
  <div className="flex h-screen w-full overflow-hidden">
    <div className="w-2/3 lg:w-3/4">
      <MoviePage />
    </div>
    <div className="w-1/3 lg:w-1/4">
      <ViewHistory />
    </div>
  </div>
);

export default Home;
