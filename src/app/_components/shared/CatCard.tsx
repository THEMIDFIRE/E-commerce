import { Card, CardTitle } from "@/components/ui/card";

export default function CatCard() {
    return (
        <>
        <Card className="p-0 rounded-2xl overflow-hidden relative shadow-md">
            <div className="img h-52 w-full px-5 bg-gray-400/50"></div>
            <CardTitle className="absolute bottom-1 left-1/2 -translate-x-1/2 -translate-y-1/2">Category</CardTitle>
        </Card>
        </>
    )
}
