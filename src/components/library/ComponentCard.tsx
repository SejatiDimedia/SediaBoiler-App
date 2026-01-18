import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { ArrowRight, Eye } from 'lucide-react';
import Image from 'next/image';

interface ComponentCardProps {
    slug: string;
    name: string;
    description: string;
    category: string;
    viewLabel: string;
    preview?: React.ReactNode;
    image?: string;
}

export function ComponentCard({
    slug,
    name,
    description,
    category,
    viewLabel,
    preview,
    image
}: ComponentCardProps) {
    const href = category ? `/library/${category}/${slug}` : `/library/${slug}`;

    return (
        <div className="group relative h-full rounded-xl border border-border bg-background overflow-hidden hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
            {/* Stretched link - covers entire card */}
            <Link href={href} className="absolute inset-0 z-10" aria-label={`View ${name}`}>
                <span className="sr-only">{viewLabel}</span>
            </Link>

            {/* Preview area */}
            <div className="relative aspect-video bg-accent/50 overflow-hidden">
                {preview ? (
                    <div className="absolute inset-0 scale-[0.4] origin-top-left w-[250%] h-[250%] pointer-events-none">
                        {preview}
                    </div>
                ) : image ? (
                    <Image
                        src={image}
                        alt={name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <Eye className="h-8 w-8 text-muted" />
                    </div>
                )}

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300" />
            </div>

            {/* Content */}
            <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary capitalize">
                        {category}
                    </span>
                </div>
                <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {name}
                </h3>
                <p className="text-sm text-muted line-clamp-2 mb-3">
                    {description}
                </p>
                <div className="flex items-center text-sm text-primary font-medium group-hover:gap-2 transition-all">
                    <span>{viewLabel}</span>
                    <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
            </div>
        </div>
    );
}
