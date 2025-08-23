import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function Footer() {
    // products section:
    // latest products (created at)
    // all products
    // popular products (most sold)
    // featured products (rating)

    // legal pages:
    // privacy policy
    // terms and conditions

    // categories:
    // brands:
    return (
        <>
            <footer className="bg-primary text-primary-foreground">
                <div className="container max-w-full">
                    <div className="siteMap mx-auto px-16 py-10 bg-gray-600/50 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        <div>
                            <h3 className="mb-3">Legal Pages</h3>
                            <ul>
                                <li><Link href="#">Privacy Policy</Link></li>
                                <li className="mt-2"><Link href="#">Terms and Conditions</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="mb-3">Products</h3>
                            <ul>
                                <li><Link href="#">Latest Products</Link></li>
                                <li className="mt-2"><Link href="#">All Products</Link></li>
                                <li className="mt-2"><Link href="#">Latest Products</Link></li>
                                <li className="mt-2"><Link href="#">Popular Products</Link></li>
                                <li className="mt-2"><Link href="#">Featured Products</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="mb-3">Newsletter</h3>
                            <p>Want to get notified with our new products?</p>
                            <form className="flex gap-2.5 mt-2">
                                <Input type="email" placeholder="Enter your email" />
                                <Button type="submit">Subscribe</Button>
                            </form>
                        </div>
                    </div>
                    <div className="copyright text-center py-4">
                        <p>Copyright &copy; 2025. All rights reserved</p>
                        <p className="my-2">Powered by <Link href="nextjs.org" className="underline">Next.js</Link></p>
                        <p><Link href="https://www.figma.com/community/file/1347472132092037504" className="underline">Design</Link> inspired by <Link href="https://www.figma.com/@xperienced" className="underline">Xperienced</Link></p>
                    </div>
                </div>
            </footer>
        </>
    )
}
