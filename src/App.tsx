import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import StatisticsSection from './components/StatisticsSection/StatisticsSection';


function App() {
  return (
    <>
      <Header />      
      <main className="container">
        <Hero />
        <StatisticsSection />
      </main>
    </>
  )
}

export default App;