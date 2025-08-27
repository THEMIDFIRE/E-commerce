import Categories from "./_components/Categories/Categories";
import FAQ from "./_components/FAQ/FAQ";
import Featured from "./_components/Featured/Featured";
import Hero from "./_components/Hero/Hero";
import Popular from "./_components/Popular/Popular";
import { IProduct } from "./types/product.type";

export default async function Home() {
  // Fetch products data
  let products: IProduct[] = [];

  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/products", {
      // Add cache control for better performance
      next: { revalidate: 3600 } // Revalidate every hour
    });

    if (res.ok) {
      const { data } = await res.json();
      products = data || [];
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    // products remains empty array if fetch fails
  }

  // Get popular products (sorted by highest ratings)
  const popularProducts = products
    .sort((a, b) => b.ratingsAverage - a.ratingsAverage)
    .slice(0, 4); // Get top 8 products

  // Get featured products (you can modify this logic based on your needs)
  // For example, newest products, highest sold, or manually curated
  const featuredProducts = products
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) // Sort by newest
    .slice(0, 4); // Get top 6 newest products

  return (
    <>
      <Hero />
      <Featured products={featuredProducts} />
      <Categories />
      <Popular products={popularProducts} />
      <FAQ />
    </>
  );
}