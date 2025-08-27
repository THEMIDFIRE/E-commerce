import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
const categories: { name: string; }[] = [
    { name: "Music" },
    { name: "Men's Fashion" },
    { name: "Women's Fashion" },
    { name: "SuperMarket" },
    { name: "Baby & Toys" },
    { name: "Home" },
    { name: "Books" },
    { name: "Beauty & Health" },
    { name: "Mobiles" },
    { name: "Electronics" }
]

const subcategories: { name: string; }[] = [
    { name: "Computer Accessories", },
    { name: "Computer Components", },
    { name: "Data Storage", },
    { name: "Networking Products", },
    { name: "Printers & Accessories", },
    { name: "Cameras & Accessories", },
    { name: "Video Games", },
    { name: "Audio & Home Entertainment", },
    { name: "Laptops & Accessories", },
    { name: "TVs, Satellites & Accessories", },
    { name: "Mobile Gaming & VR Gadgets", },
    { name: "Covers & Screen protectors", },
    { name: "Chargers & Cables", },
    { name: "Power Banks", },
    { name: "Earphones", },
    { name: "Wireless Earphones", },
    { name: "Smartwatches & Accessories", },
    { name: "All Tablets", },
    { name: "All Mobile Phones", },
    { name: "Mobile New Arrivals", },
    { name: "Bags & luggage", },
    { name: "Men's Clothing", },
    { name: "Kid's Fashion", },
    { name: "Handbags", },
    { name: "Eyewear", },
    { name: "Jewellery", },
    { name: "Watches", },
    { name: "Footwear", },
    { name: "Women's Clothing", },
    { name: "Kitchen & Dining", },
    { name: "Home Decor", },
    { name: "Furniture", },
    { name: "Tools & Home Improvement", },
    { name: "Bath & Bedding", },
    { name: "Drinkware", },
    { name: "Cookware", },
    { name: "Large Appliances", },
    { name: "Home Appliances", },
    { name: "Health & Nutrition", },
    { name: "Personal Care", }
]

const brands: { name: string; }[] = [
    { name: "Canon" },
    { name: "Dell" },
    { name: "Lenovo" },
    { name: "SONY" },
    { name: "Infinix" },
    { name: "Realme" },
    { name: "HONOR" },
    { name: "Nokia" },
    { name: "OPPO" },
    { name: "Huawei" },
    { name: "Apple" },
    { name: "Xiaomi" },
    { name: "Samsung" },
    { name: "Jack & Jones" },
    { name: "LC Waikiki" },
    { name: "Andora" },
    { name: "Puma" },
    { name: "Skechers" },
    { name: "Reserved" },
    { name: "Reebok" },
    { name: "Adidas" },
    { name: "Nike" },
    { name: "DeFacto" },
    { name: "Beko" },
    { name: "Kenwood" },
    { name: "Black + Decker" },
    { name: "Mienta" },
    { name: "Fresh" },
    { name: "Philips" },
    { name: "Toshiba" },
    { name: "Tornado" },
    { name: "Braun" },
    { name: "Garnier" },
    { name: "Essence" },
    { name: "Bourjois" },
    { name: "Kemei" },
    { name: "Carolina Herrera" },
    { name: "Calvin Klein" },
    { name: "Loreal" },
    { name: "Maybelline" }
]


export default function Filters() {
    return (
        <div className="hidden md:block lg:w-1/3">
            <h4 className='text-2xl font-bold mb-5'>Filters</h4>
            <ScrollArea className='w-full lg:h-[450px] shadow px-10 py-4'>
                <div className='border-1 px-10 py-6'>
                    <h5 className='border-l-4 border-black ps-4'>Categories</h5>
                    <div className='mt-4'>
                        {categories.map((category, index) => (
                            <div className='flex items-center gap-2 mb-4' key={index}>
                                <Checkbox id={`category-${index}`} />
                                <Label htmlFor={`category-${index}`}>{category.name}</Label>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='border-1 px-10 py-6 my-8'>
                    <h5 className='border-l-4 border-black ps-4'>Brands</h5>
                    <div className='mt-4'>
                        {brands.map((brand, index) => (
                            <div className='flex items-center gap-2 mb-4' key={index}>
                                <Checkbox id={`brand-${index}`} />
                                <Label htmlFor={`brand-${index}`}>{brand.name}</Label>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='border-1 px-10 py-6'>
                    <h5 className='border-l-4 border-black ps-4'>Price Range</h5>
                    <div className='mt-4'>
                        <div className='flex items-center gap-2 mb-4'>
                            <Checkbox id={`price-range-1`} />
                            <Label htmlFor={`price-range-1`}>$0 - $100</Label>
                        </div>
                        <div className='flex items-center gap-2 mb-4'>
                            <Checkbox id={`price-range-2`} />
                            <Label htmlFor={`price-range-2`}>$100 - $200</Label>
                        </div>
                        <div className='flex items-center gap-2 mb-4'>
                            <Checkbox id={`price-range-3`} />
                            <Label htmlFor={`price-range-3`}>$200 - $500</Label>
                        </div>
                        <div className='flex items-center gap-2 mb-4'>
                            <Checkbox id={`price-range-4`} />
                            <Label htmlFor={`price-range-4`}>$500 - $1000</Label>
                        </div>
                    </div>
                </div>
            </ScrollArea>
        </div>

    )
}
