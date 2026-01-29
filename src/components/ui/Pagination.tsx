'use client';

import { Link } from '@/i18n/navigation';
import { usePathname, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    className?: string;
}

export function Pagination({ currentPage, totalPages, className }: PaginationProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };

    // Helper to generate page numbers
    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Always show first, last, and current surroundings
            if (currentPage <= 3) {
                pages.push(1, 2, 3, '...', totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
            }
        }
        return pages;
    };

    if (totalPages <= 1) return null;

    return (
        <div className={cn("flex items-center justify-center gap-2 mt-12", className)}>
            {/* Previous Button */}
            <Link
                href={currentPage > 1 ? createPageURL(currentPage - 1) : '#'}
                aria-disabled={currentPage <= 1}
                className={cn(
                    currentPage <= 1 ? 'pointer-events-none opacity-50' : ''
                )}
            >
                <Button variant="outline" size="icon" className="h-9 w-9">
                    <ChevronLeft className="h-4 w-4" />
                </Button>
            </Link>

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
                {getPageNumbers().map((page, index) => {
                    if (page === '...') {
                        return (
                            <span key={`ellipsis-${index}`} className="px-2 text-muted-foreground">
                                <MoreHorizontal className="w-4 h-4" />
                            </span>
                        );
                    }

                    const isCurrent = page === currentPage;
                    return (
                        <Link
                            key={page}
                            href={createPageURL(page)}
                        >
                            <Button
                                variant={isCurrent ? "primary" : "ghost"}
                                size="icon"
                                className={cn(
                                    "h-9 w-9",
                                    isCurrent ? "pointer-events-none" : ""
                                )}
                            >
                                {page}
                            </Button>
                        </Link>
                    );
                })}
            </div>

            {/* Next Button */}
            <Link
                href={currentPage < totalPages ? createPageURL(currentPage + 1) : '#'}
                aria-disabled={currentPage >= totalPages}
                className={cn(
                    currentPage >= totalPages ? 'pointer-events-none opacity-50' : ''
                )}
            >
                <Button variant="outline" size="icon" className="h-9 w-9">
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </Link>
        </div>
    );
}
