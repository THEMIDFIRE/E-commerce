import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function FAQ() {
    const faqs = [
        {
            question: "What is your return policy?",
            answer: "We offer a 30-day return policy for all items in original condition.",
        },
        {
            question: "How long does shipping take?",
            answer: "Standard shipping takes 3-5 business days, while express shipping takes 1-2 business days.",
        },
        {
            question: "Do you offer international shipping?",
            answer: "Yes, we ship to most countries worldwide. Shipping costs and times vary by location.",
        },
        {
            question: "How can I track my order?",
            answer: "Once your order ships, you'll receive a tracking number via email to monitor your package.",
        },
    ]

    return (
        <section>
            <div className="container py-16 max-w-4/5 mx-auto">
                <div className="inner mt-9 grid grid-cols-1 md:grid-cols-2 gap-7">
                    <div>
                        <h3 className="text-2xl font-bold">Frequently Asked Questions</h3>
                        <p className="text-balance mt-3.5 mb-8">
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet.
                        </p>
                        <Button>
                            <Link href="#" className="flex items-center gap-2">
                                Ask a Question <ChevronRight />
                            </Link>
                        </Button>
                    </div>
                    <div>
                        <Accordion type="single" collapsible className="w-full">
                            {faqs.map((faq, index) => (
                                <AccordionItem key={index} value={`item-${index}`}>
                                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                                    <AccordionContent>{faq.answer}</AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </div>
        </section>
    )
}
