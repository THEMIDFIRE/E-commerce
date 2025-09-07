"use client"
import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, type CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { ICustomProduct } from '@/types/All.type';
import { HeartIcon, PackageIcon, SlashIcon, StarIcon, TruckIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import Counter from '../shared/Counter';
import { getUserToken } from '@/lib/server-utils';
import { addToCart, updateCartQuantity } from '@/lib/api';
import { toast } from 'sonner';
import { useCart } from '@/context/UserContext';

export default function ProductDetails({ product }: { product: ICustomProduct }) {
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)
    const [count, setCount] = useState(0)
    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        if (!api) {
            return
        }
        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)
        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])

    const { getCartData } = useCart();

    const handleQuantityChange = (newQuantity: number) => {
        setQuantity(newQuantity);
    };

    const handleAddToCart = async () => {
        const token = await getUserToken()
        if (token) {
            try {
                // First add one item to cart
                await addToCart(product._id);
                
                // Then update quantity to desired amount
                if (quantity > 1) {
                    await updateCartQuantity(product._id, quantity);
                }
                
                toast.success(`Added ${quantity} item(s) to cart`);
                getCartData();
            } catch (error) {
                toast.error('Failed to add to cart');
            }
        }
    }



    return (
        <section>
            <div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-y-16 md:gap-x-[71px] max-w-4/5 mx-auto pb-[4.6875rem]'>
                    <div>
                        <Carousel opts={{ loop: true }} setApi={setApi}>
                            <CarouselContent>
                                {product.images.map((image, index) => (
                                    <CarouselItem key={index}>
                                        <img src={image} alt={product.title} className='w-full aspect-square object-contain' />
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                        <div className="text-muted-foreground py-2 text-center text-sm">
                            {current} of {count}
                        </div>
                    </div>
                    <div>
                        <div className='flex justify-between items-center'>
                            <h3 className='text-[1.625rem] font-bold'>{product.title}</h3>
                            <HeartIcon size={20} />
                        </div>
                        <div className='flex items-center gap-2.5 my-3'>
                            <span className='text-3xl border-r-2 border-accent-foreground pr-2.5'>{product.price} EGP</span>
                            <span className='flex items-center gap-0.5'>
                                {new Array(5).fill(null).map((_, index) => (
                                    <StarIcon key={index} size={17} />
                                ))}
                            </span>
                            <span>({product.reviews.length}) Reviews</span>

                        </div>
                        <div className='flex items-center gap-2 text-gray-400'>
                            <div>{product.category.name}</div>
                            <SlashIcon size={15} />
                            <div>{product.brand.name}</div>
                        </div>
                        <hr className='my-5' />
                        <div>
                            <p>{product.description}</p>
                        </div>
                        <div>
                            <div className='flex items-center gap-3 my-4'>
                                <div className="flex items-center border-2 rounded-full overflow-hidden w-fit">
                                    <Counter 
                                        initialValue={quantity}
                                        onQuantityChange={handleQuantityChange}
                                    />
                                </div>
                                <Button onClick={handleAddToCart} className='grow rounded-3xl py-4 text-lg font-bold hover:bg-transparent hover:text-foreground hover:border-foreground hover:border-2'>Add to Cart</Button>
                            </div>
                            <div>
                                <Button className='w-full rounded-3xl py-5 border-2 border-accent-foreground bg-transparent text-accent-foreground font-bold text-lg hover:text-accent'>Buy Now</Button>
                            </div>
                        </div>
                        <div className='mt-8'>
                            <div className="flex iems-center gap-2">
                                <TruckIcon className='text-gray-400/50' />
                                <p>Free worldwide shipping on all orders over $100</p>
                            </div>
                            <div className="flex iems-center gap-2 mt-4">
                                <PackageIcon className='text-gray-400/50' />
                                <p>Delivers in: 3-7 Working Days Shipping & Return</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='bg-gray-100/50 py-20'>
                    <Tabs defaultValue="description" className='max-w-4/5 mx-auto'>
                        <TabsList className='bg-none p-0 mb-10'>
                            <TabsTrigger value="description" className='p-0 data-[state=active]:font-bold text-2xl data-[state=active]:bg-shadow-none data-[state=active]:shadow-none'>Description</TabsTrigger>
                            <span className='mx-5 text-2xl'>|</span>
                            <TabsTrigger value="reviews" className='p-0 data-[state=active]:font-bold text-2xl data-[state=active]:bg-shadow-none data-[state=active]:shadow-none'>Reviews</TabsTrigger>
                        </TabsList>
                        <TabsContent value="description" className='leading-7'>
                            <p>{product.description}</p>
                        </TabsContent>
                        <TabsContent value="reviews">
                            {new Array(2).fill(null).map((_, index) => (
                                <Card className='mb-10'>
                                    <CardHeader>
                                        <CardTitle className='font-normal'>John Doe</CardTitle>
                                        <CardAction className='flex'>
                                            {Array.from({ length: 5 }).map((_, index) => (
                                                <StarIcon key={index} />
                                            ))}
                                        </CardAction>
                                    </CardHeader>
                                    <CardContent>
                                        <p className='text-gray-500/70'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam nisi, cras neque, lorem vel vulputate vitae aliquam. Pretium tristique nisi, ut commodo fames. Porttitor et sagittis egestas vitae metus, odio tristique amet, duis. Nunc tortor elit aliquet quis in mauris.</p>
                                    </CardContent>
                                </Card>)
                            )}
                            {product.reviews.length > 2 && <Button className='w-full rounded-3xl py-6 border-2 border-accent-foreground bg-transparent text-accent-foreground font-bold text-lg hover:text-accent'>View All</Button>}
                            <Card className="bg-gray-100">
                                <CardContent>
                                    <form>
                                        <div className="flex flex-col md:flex-row gap-7 w-full">
                                            <div className="grow flex flex-col gap-y-2.5">
                                                <Label htmlFor="name">Your Name</Label>
                                                <Input id="name" placeholder="John Doe" className="rounded-4xl pl-5 py-5" required />
                                            </div>
                                            <div className="grow flex flex-col gap-y-2.5">
                                                <Label htmlFor="email">Your Email</Label>
                                                <Input id="email" type="email" placeholder="person@gmail.com" className="rounded-4xl pl-5 py-5" required />
                                            </div>
                                        </div>
                                        <Textarea placeholder="Write your review..." className="rounded-3xl pl-5 pt-4 h-32 mt-8" required />
                                    </form>
                                </CardContent>
                                <CardFooter className="flex flex-col md:flex-row md:justify-between md:items-center gap-y-4 text-gray-500">
                                    <div className="flex items-center gap-2">
                                        <p>Your Rating:</p>
                                        <div className="flex">
                                            {new Array(5).fill(null).map((_, index) => (
                                                <StarIcon key={index} size={20} />
                                            ))}
                                        </div>
                                    </div>
                                    <Button className="">Submit Review</Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
                {/* <div className="max-w-4/5 mx-auto py-40">
                    <h4 className="font-bold text-4xl mb-9">Similar Products</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
                        {new Array(4).fill(null).map((_, index) => (<ProdCard key={index} />))}
                    </div>
                </div> */}
            </div>
        </section>
    )
}
