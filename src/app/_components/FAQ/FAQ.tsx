import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function FAQ() {
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
                        <Accordion
                            type="single"
                            collapsible
                            className="w-full"
                            defaultValue="item-1"
                        >
                            <AccordionItem value="item-1">
                                <AccordionTrigger>Product Information</AccordionTrigger>
                                <AccordionContent className="flex flex-col gap-4 text-balance">
                                    <p>
                                        Our flagship product combines cutting-edge technology with sleek
                                        design. Built with premium materials, it offers unparalleled
                                        performance and reliability.
                                    </p>
                                    <p>
                                        Key features include advanced processing capabilities, and an
                                        intuitive user interface designed for both beginners and experts.
                                    </p>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger>Shipping Details</AccordionTrigger>
                                <AccordionContent className="flex flex-col gap-4 text-balance">
                                    <p>
                                        We offer worldwide shipping through trusted courier partners.
                                        Standard delivery takes 3-5 business days, while express shipping
                                        ensures delivery within 1-2 business days.
                                    </p>
                                    <p>
                                        All orders are carefully packaged and fully insured. Track your
                                        shipment in real-time through our dedicated tracking portal.
                                    </p>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3">
                                <AccordionTrigger>Return Policy</AccordionTrigger>
                                <AccordionContent className="flex flex-col gap-4 text-balance">
                                    <p>
                                        We stand behind our products with a comprehensive 30-day return
                                        policy. If you&apos;re not completely satisfied, simply return the
                                        item in its original condition.
                                    </p>
                                    <p>
                                        Our hassle-free return process includes free return shipping and
                                        full refunds processed within 48 hours of receiving the returned
                                        item.
                                    </p>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
            </div>
        </section>
    )
}
