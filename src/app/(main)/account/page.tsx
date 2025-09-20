import ChangePass from "@/app/_components/UserProfile/ChangePass";
import ProfileInfo from "@/app/_components/UserProfile/ProfileInfo";

export default function Account() {

    return (
        <section>
            <div className="container max-w-4/5 mx-auto py-10">
                <h3 className="font-bold text-2xl">Account Settings</h3>
                <ProfileInfo />
                <hr className="my-10 border-gray-400/50" />
                <ChangePass />
                <hr className="my-10 border-gray-400/50" />
            </div>
        </section>
    )
}