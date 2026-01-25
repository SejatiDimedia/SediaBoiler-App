import { setRequestLocale } from 'next-intl/server';
import { DocumentationClient } from './DocumentationClient';

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function DocsPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    return <DocumentationClient />;
}
