import Head from 'next/head';
import { useRouter } from 'next/router';

interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    article?: boolean;
}

const SEO = ({ title, description, image, article }: SEOProps) => {
    const { asPath } = useRouter();
    const siteName = 'براند ملابس';
    const defaultDescription = 'اكتشف أحدث صيحات الموضة والملابس العصرية في متجرنا. جودة عالية وتصاميم فريدة تناسب ذوقك.';
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourbrand.com';
    const defaultImage = `${siteUrl}/og-image.jpg`;

    const seo = {
        title: title ? `${title} | ${siteName}` : siteName,
        description: description || defaultDescription,
        image: image || defaultImage,
        url: `${siteUrl}${asPath}`,
    };

    return (
        <Head>
            <title>{seo.title}</title>
            <meta name="description" content={seo.description} />
            <meta name="image" content={seo.image} />
            <link rel="canonical" href={seo.url} />

            {seo.url && <meta property="og:url" content={seo.url} />}
            {(article ? true : null) && <meta property="og:type" content="article" />}
            {seo.title && <meta property="og:title" content={seo.title} />}
            {seo.description && (
                <meta property="og:description" content={seo.description} />
            )}
            {seo.image && <meta property="og:image" content={seo.image} />}

            <meta name="twitter:card" content="summary_large_image" />
            {seo.title && <meta name="twitter:title" content={seo.title} />}
            {seo.description && (
                <meta name="twitter:description" content={seo.description} />
            )}
            {seo.image && <meta name="twitter:image" content={seo.image} />}

            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    );
};

export default SEO;
