import Categories from "./_components/Categories/Categories";
import FAQ from "./_components/FAQ/FAQ";
import Featured from "./_components/Featured/Featured";
import Hero from "./_components/Hero/Hero";
import Navbar from "./_components/layout/Navbar";
import Popular from "./_components/Popular/Popular";

export default function Home() {
  return (
    <>
      <Hero/>
      <Featured/>
      <Categories/>
      <Popular/>
      <FAQ/>
    </>
  );
}
