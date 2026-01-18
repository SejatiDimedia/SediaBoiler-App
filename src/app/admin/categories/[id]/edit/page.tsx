import { notFound } from "next/navigation";
import { getCategoryById } from "@/lib/actions/categories";
import { CategoryForm } from "../../CategoryForm";

export default async function EditCategoryPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const category = await getCategoryById(parseInt(id));

    if (!category) {
        notFound();
    }

    return <CategoryForm initialData={category} mode="edit" />;
}
