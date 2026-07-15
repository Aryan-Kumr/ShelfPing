'use client'

import { useState } from "react"
import { Inventory } from "@/generated/prisma/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Pencil } from "lucide-react";

interface EditItemFormProps {
    item: Inventory
}

const CATEGORIES = ["GROCERY", "DAIRY", "BEVERAGES", "SNACKS", "PERSONAL_CARE", "HOUSEHOLD", "OTHER"];

const UNITS = ["KG", "GRAM", "LITRE", "ML", "PIECE", "DOZEN", "PACKET"];

export default function EditItemForm({ item }: EditItemFormProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [unit, setUnit] = useState<string>(item.unit);
    const [category, setCategory] = useState<string>(item.category);
    const router = useRouter();

    const handleSubmit = async (formData: FormData) => {
        const itemName = formData.get("itemName") as string;
        const quantity = parseFloat(formData.get("quantity") as string);
        const price = parseFloat(formData.get("price") as string);
        const imageUrl = formData.get("imageUrl") as string;

        setLoading(true);
        setError("");

        const response = await fetch(`/api/inventory/${item.id}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ itemName, category, quantity, unit, price, imageUrl: imageUrl || null })
        });

        if(!response.ok) {
            const { message } = await response.json();
            setError(message || "Something went wrong");
            setLoading(false);
            return;
        }

        router.push("/owner/inventory");
    }

    return (
        <div className="max-w-lg mx-auto pt-30">
            <Card>
                <CardHeader>
                    <CardTitle className="flex gap-3 text-xl text-white">
                        <Pencil /> Edit Item
                    </CardTitle>
                </CardHeader>
                <CardContent>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">
                            {error}
                        </div>
                    )}

                    <form action={handleSubmit} className="space-y-4">

                        {/* Item Name */}
                        <div className="space-y-1 text-white">
                            <Label>Item Name</Label>
                            <Input
                                type="text"
                                name="itemName"
                                defaultValue={item.itemName}
                                required
                            />
                        </div>

                        {/* Category */}
                        <div className="space-y-1 text-white">
                            <Label>Category</Label>
                            <Select
                                value={category}
                                onValueChange={setCategory}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {CATEGORIES.map((cat) => (
                                        <SelectItem key={cat} value={cat}>
                                            {cat}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Quantity and Unit */}
                        <div className="grid grid-cols-2 gap-3 text-white">
                            <div className="space-y-1">
                                <Label>Quantity</Label>
                                <Input
                                    type="number"
                                    name="quantity"
                                    defaultValue={item.quantity}
                                    min="0"
                                    step="any"
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <Label>Unit</Label>
                                <Select
                                    value={unit}
                                    onValueChange={setUnit}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {UNITS.map((u) => (
                                            <SelectItem key={u} value={u}>
                                                {u}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="space-y-1 text-white">
                            <Label>Price (₹)</Label>
                            <Input
                                type="number"
                                name="price"
                                defaultValue={item.price}
                                min="0"
                                step="any"
                                required
                            />
                        </div>

                        {/* Image URL */}
                        <div className="space-y-1 text-white">
                            <Label>Image URL (optional)</Label>
                            <Input
                                type="text"
                                name="imageUrl"
                                defaultValue={item.imageUrl || ""}
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3 pt-2">
                            <Button
                                type="submit"
                                disabled={loading}
                                className="flex-1"
                            >
                                {loading ? "Saving..." : "Save Changes"}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.back()}
                                className="flex-1"
                            >
                                Cancel
                            </Button>
                        </div>

                    </form>
                </CardContent>
            </Card>
        </div>
    )
}