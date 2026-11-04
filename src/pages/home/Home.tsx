import Experiments from "./Experiments";
import Hero from "./Hero";
import "./home.css";

export default function Home() {
  return (
    <main className="home">
      <Hero />
      <Experiments />
    </main>
  );
}
