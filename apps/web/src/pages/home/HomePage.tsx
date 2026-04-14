import { ChatContainer } from './ChatContainer'
import {ProjectContainer} from "./ProjectContainer.tsx";
import {AboutUsContainer} from './AboutUsContainer.tsx';
import {homeSeoContent} from '../../data/siteContent';
import {useSeoMeta} from '../../features/util/hooks/useSeoMeta';

export function HomePage() {
    const canonicalUrl = typeof window !== 'undefined'
        ? new URL(homeSeoContent.canonicalPath, window.location.origin).toString()
        : homeSeoContent.canonicalPath;

    const ogUrl = homeSeoContent.openGraph?.urlPath
        ? (typeof window !== 'undefined'
            ? new URL(homeSeoContent.openGraph.urlPath, window.location.origin).toString()
            : homeSeoContent.openGraph.urlPath)
        : canonicalUrl;

    useSeoMeta({
        title: homeSeoContent.title,
        description: homeSeoContent.description,
        author: homeSeoContent.author,
        robots: homeSeoContent.robots,
        canonicalUrl,
        openGraph: {
            title: homeSeoContent.openGraph?.title ?? homeSeoContent.title,
            description: homeSeoContent.openGraph?.description ?? homeSeoContent.description,
            type: homeSeoContent.openGraph?.type ?? 'website',
            url: ogUrl,
            image: homeSeoContent.openGraph?.image,
            imageAlt: homeSeoContent.openGraph?.imageAlt,
            siteName: homeSeoContent.openGraph?.siteName,
            locale: homeSeoContent.openGraph?.locale,
        },
    });

    return (
        <div className="home-page">
            <ChatContainer />
            <div className="home-page__project-about-wrapper">
                <ProjectContainer />
                <AboutUsContainer />
            </div>

        </div>
    )
}