import ChangePass from "@/app/_components/UserProfile/ChangePass";
import ProfileInfo from "@/app/_components/UserProfile/ProfileInfo";
import UserAddresses from "@/app/_components/UserProfile/AddAddresses";
import Addresses from "@/app/_components/UserProfile/Addresses";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function Account() {

    return (
        <section>
            <div className="container max-w-4/5 mx-auto py-10">
                <h3 className="font-bold text-2xl mb-4">Account Settings</h3>
                <Accordion type="single" collapsible defaultValue="profile-info">
                    <AccordionItem value="profile-info">
                        <AccordionTrigger className="font-semibold text-xl">Profile Information</AccordionTrigger>
                        <AccordionContent>
                            <ProfileInfo />
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="change-password">
                        <AccordionTrigger className="font-semibold text-xl">Change Password</AccordionTrigger>
                        <AccordionContent>
                            <ChangePass />
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="shipping-address">
                        <AccordionTrigger className="font-semibold text-xl">Shipping Addresses</AccordionTrigger>
                        <AccordionContent>
                            <Addresses />
                            <h3 className="font-medium text-lg mt-5 mb-4">Add New Address</h3>
                            <UserAddresses />
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </section>
    )
}