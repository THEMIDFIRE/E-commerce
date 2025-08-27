import { getAllProducts } from "@/lib/products";
import Categories from "./_components/Categories/Categories";
import FAQ from "./_components/FAQ/FAQ";
import Featured from "./_components/Featured/Featured";
import Hero from "./_components/Hero/Hero";
import Popular from "./_components/Popular/Popular";
import { IProduct } from "./types/product.type";
import { getAllCategories } from "@/lib/categories";

export default async function Home() {
  const products = await getAllProducts()
  const categories = await getAllCategories()

  const popularProducts = products
    .sort((a: { ratingsAverage: number; }, b: { ratingsAverage: number; }) => b.ratingsAverage - a.ratingsAverage)
    .slice(0, 4); 

  const featuredProducts = products
    .sort((a: { createdAt: string; }, b: { createdAt: string; }) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) // Sort by newest
    .slice(0, 4);

  return (
    <>
      <Hero />
      <Featured products={featuredProducts} />
      <Categories category={categories} />
      <Popular products={popularProducts} />
      <FAQ />
    </>
  );
}