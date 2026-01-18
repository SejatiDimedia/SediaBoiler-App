import { notFound } from 'next/navigation';
import { getComponentById } from '@/lib/actions/components';
import { ComponentForm } from '../../ComponentForm';

export default async function EditComponentPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const component = await getComponentById(Number(id));

    if (!component) {
        notFound();
    }

    return (
        <ComponentForm
            mode="edit"
            initialData={{
                id: component.id,
                slug: component.slug,
                name: component.name,
                description: component.description,
                category: component.category,
                code: component.code,
                isPublished: component.isPublished || 'true',
                previewImage: component.previewImage,
            }}
        />
    );
}
