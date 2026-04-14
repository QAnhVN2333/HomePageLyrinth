import {Icon, TechIcon} from '../../features/util/components/util';
import {projects} from "../../data/siteContent";
import type {Project} from "../../data/types";
import {showToast} from "../../features/util/toast.ts";

export function ProjectContainer() {
    if (projects.length === 0) {
        return null;
    }
    const sortedProjects = [...projects].sort((a, b) => {
        //return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
        const techStackDiff = b.technicalStack.length - a.technicalStack.length;
        if (techStackDiff !== 0) {
            return techStackDiff;
        }
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
    });
    const activeViewAll = false;
    return (
        <div className="home-project__container" id="projects">
            <div className="home-project__header">
                <h2>Projects</h2>
                <div className="home-project__header-buttons">
                    {activeViewAll&&(<button
                        onClick={() => window.location.href = '/projects'}>
                        View All
                    </button>)}
                </div>
            </div>
            <div className="home-project__project-wrapper">
                {sortedProjects.map((p, i) => (
                    <ProjectItem key={i} project={p}/>
                ))}
            </div>
        </div>
    )
}

function ProjectItem({ project }: { project: Project }) {
    // example: lastUpdated: '2026-04-01', toDay is '2024-06-01', then lastUpdatedToString should be '2 months ago'
    // format: if lastUpdated is less than 1 month ago, show 'x days ago', if lastUpdated is less than 1 year ago, show 'x months ago', otherwise show 'x years ago'
    const lastUpdatedToString = (() => {
        const lastUpdatedDate = new Date(project.lastUpdated);
        const now = new Date();
        const diffInMs = now.getTime() - lastUpdatedDate.getTime();
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
        const diffByInitialReleaseInMs = lastUpdatedDate.getTime() - new Date(project.initialRelease).getTime();
        if (diffByInitialReleaseInMs < 0) {
            return 'Bruh';
        }
        if (diffInDays < 0) {
            return 'In the future';
        }
        if (diffInDays === 0) {
            return 'Recently updated';
        }
        if (diffInDays < 30) {
            return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
        }
        const diffInMonths = Math.floor(diffInDays / 30);
        if (diffInMonths < 12) {
            return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
        }
        const diffInYears = Math.floor(diffInMonths / 12);
        return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`;
    })();
    // ex: initialRelease is '2023-01-01', then initialReleaseToString should be 'Jan 1, 2023'
    const initialReleaseToString = (() => {
        const initialReleaseDate = new Date(project.initialRelease);
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
        return initialReleaseDate.toLocaleDateString(undefined, options);
    })();
    const directUrlButton = (() => {
        if (!project.redirectURL) {
            return null;
        }
        const redirectText = project.redirectText || 'Try it';

        return (
            <div className="redirect">
                <button className="redirect-btn" onClick={(e) => {
                    e.stopPropagation();
                    if (project.redirectURL) {
                        window.open(project.redirectURL, '_blank', 'noopener,noreferrer');
                    } else {
                        window.open(project.link, '_blank');
                    }
                }}>
                    {redirectText}
                </button>
            </div>
        )
    });

    return (
        <div className={`home-project__project home-project__project--${project.style}`}
             style={{backgroundImage: `url(${project.bgUrl})`}}
             onClick={() => {
                 if (!project.link) {
                     window.scrollTo({ top: 0, behavior: 'smooth' });
                     showToast('We are working on it! Stay tuned for updates.', 5000, false);
                     return;
                 }
                 window.open(project.link, '_blank', 'noopener,noreferrer')
             }}>

            <div className="project-image">
                {project.imgUrl ? <img src={project.imgUrl} alt={project.title}/> :
                    <div className="placeholder-image"></div>
                }
            </div>
            <div className="project-content">
                <div className="project-author">
                    <h2>{project.title}</h2>
                    {project.author ? "by " + project.author.join(', ') : ''}
                </div>
                <p>{project.description}</p>

                <div className="tech" data-count={project.technicalStack.length}>
                    {project.technicalStack.map((t) => (
                        <TechIcon key={t} tech={t} />
                    ))}
                </div>
            </div>
            <div className="project-info">
                <div className="initial-release">
                    <Icon name="published_time" />
                    <span className="initial-release-text">
                        {initialReleaseToString}
                    </span>
                </div>
                <div className="last-updated">
                    <Icon name="last_update_time" />
                    <span className="last-updated-text">
                        {lastUpdatedToString}
                    </span>
                </div>
                {directUrlButton()}
            </div>
        </div>
    );
}