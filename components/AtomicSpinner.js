import AtomicSpinner from "atomic-spinner";

const App = () => {
  return (
    <div className="absolute w-full backdrop-blur-sm left-0 z-50">
      <div className="mx-auto w-fit">
          <AtomicSpinner atomSize={150} electronSpeed={0.25} nucleusParticleBorderWidth={0.5} />
      </div>
    </div>
  );
};

export default App;
