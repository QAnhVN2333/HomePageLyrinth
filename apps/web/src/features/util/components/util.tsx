import {getIcon} from "../icon.ts";
import {memo, useEffect} from "react";
import {useLocation} from "react-router-dom";

type IconName = Parameters<typeof getIcon>[0];

export function Icon({ name }: { name: IconName|string }) {
    return <span dangerouslySetInnerHTML={{ __html: getIcon(name) }} />;
}
export function ScrollDownPx({ px }: { px: number }) {
    // Smoothly scroll down by a specific pixel amount.
    window.scrollBy({ top: px, behavior: 'smooth' });
    return null;
}

export const ScrollDownButton = memo(function ScrollDownButton() {
    const handleScrollDown = () => {
        const header = document.querySelector<HTMLElement>('.topbar');
        const headerHeight = header?.offsetHeight || 0;
        ScrollDownPx({px: window.innerHeight - headerHeight});
    };

    return (
        <button className="scroll-down-button" onClick={handleScrollDown}>
            <Icon name="arrow_down" />
        </button>
    );
});


// eslint-disable-next-line react-refresh/only-export-components
export function useScrollToHash() {
    const { hash } = useLocation();

    useEffect(() => {
        if (!hash) return;

        const el = document.querySelector(hash);
        const header = document.querySelector<HTMLElement>('.topbar');
        const headerHeight = header?.offsetHeight || 0;

        if (el) {
            const y = el.getBoundingClientRect().top + window.scrollY - headerHeight;

            window.scrollTo({
                top: y,
                behavior: "smooth"
            });
        }
    }, [hash]);
}
export const TechIcon = ({ tech }: { tech: string }) => {
    const techIcons: Record<string, string> = {
        'Minecraft': getIcon('minecraft'),
        'Game': getIcon('game'),
        'Entertainment': getIcon('game'),
        'React': getIcon('react'),
        'Java': getIcon('java'),
        'Python': getIcon('python'),
        'TypeScript': getIcon('typescript'),
        'JavaScript': getIcon('javascript'),
        'Node.js': getIcon('nodejs'),
        'NodeJS': getIcon('nodejs'),
        'Node': getIcon('nodejs'),
        'Vue': getIcon('vue'),
        'Vite': getIcon('vitejs'),
        'MongoDB': getIcon('mongodb'),
        'C': getIcon('c'),
        'C++': getIcon('cplusplus'),
        'C#': getIcon('csharp'),
        'Go': getIcon('golang'),
        'Golang': getIcon('golang'),
        'Rust': getIcon('rust'),
        'Django': getIcon('django'),
        'Flask': getIcon('flask'),
        'Spring': getIcon('springboot'),
        'Express': getIcon('express'),
        'Godot': getIcon('godot'),
        'Html': getIcon('html5'),
        'HTML': getIcon('html5'),
        'FastAPI': getIcon('fastapi'),
        'Cassandra': getIcon('cassandra'),
        'MySQL': getIcon('mysql'),
        'PostgreSQL': getIcon('postgresql'),
        'SQlite': getIcon('sqlite'),
        'Sqlite': getIcon('sqlite'),
        'Redis': getIcon('redis'),
        'Docker': getIcon('docker'),
        'Kubernetes': getIcon('kubernetes'),
        'Github': getIcon('github'),
        'Playwright': getIcon('playwright'),
        'Figma': getIcon('figma'),
        'CSS': getIcon('css'),
        'Css': getIcon('css'),
        'CSS3': getIcon('css'),
        'css': getIcon('css'),
        'nginx': getIcon('nginx'),
        'Nginx': getIcon('nginx'),
    };
    if (techIcons[tech]) {
        return (
            <span className={`tech-item tech-item--${tech.toLowerCase()}`} key={tech}>
                <div dangerouslySetInnerHTML={{__html: techIcons[tech]}}/>
                <span className="tech-item-text">{tech}</span>
            </span>
        );
    }else {
        return (
            <span className={`tech-item tech-item--${tech.toLowerCase()} tech-item--default`} key={tech}>
                <span className="tech-item-text">{tech}</span>
            </span>
        )
    }
};
