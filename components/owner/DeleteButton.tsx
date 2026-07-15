'use client'

import { useRouter } from "next/navigation";
import { JSX, useState } from "react";
import { Button } from "@/components/ui/button";

export default function DeleteButton ({ itemId } : {itemId : string}): JSX.Element {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        if(!confirm("Are you sure you want to delete the item ?")) return;
        setLoading(true);
        try {
            const response = await fetch(`/api/inventory/${itemId}`, {
            method: "DELETE",
            });
            if(response.ok) {
                router.refresh();
            }
            setLoading(false);
        } catch(e: unknown) {
            console.log(e)
        }
    }
    return (
            <Button
                variant="destructive"
                size="sm"
                onClick={handleDelete}
                disabled={loading}
                >
                    {loading ? "..." : "Delete"}
            </Button>
        )
}