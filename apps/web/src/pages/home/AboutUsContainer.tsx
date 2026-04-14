import {Icon, TechIcon} from '../../features/util/components/util';
import type {CSSProperties} from 'react';
import {members, socialPlatforms} from "../../data/siteContent";
import type {Member} from "../../data/types";
import {showToast} from "../../features/util/toast.ts";
type MetaIconType = 'briefcase' | 'graduation' | 'pin';

export function AboutUsContainer() {
    if (members.length === 0) {
        return null;
    }
    return (
        <section className="home-about__container" id="about">
            <div className="home-about__header">
                <h2>About Us</h2>
            </div>

            <div className="home-about__grid">
                {members.map((member) => (
                    <MemberCard key={member.name} member={member} />
                ))}
            </div>
        </section>
    );
}

function MemberCard({member}: {member: Member}) {
    const cardStyle = {
        '--about-accent': member.accentColor || '#60a5fa',
    } as CSSProperties;

    const metaItems = [
        member.occupation ? {key: 'occupation', icon: 'briefcase', value: member.occupation} : null,
        member.school ? {key: 'school', icon: 'graduation', value: member.school} : null,
        member.location ? {key: 'location', icon: 'pin', value: member.location} : null,
    ].filter(Boolean) as Array<{key: string; icon: MetaIconType; value: string}>;

    return (
        <article className="home-about__card" style={cardStyle} onClick={() => {
            if (!member.link) {
                window.scrollTo({top: 0, behavior: 'smooth'});
                showToast(member.name+' profile will be updated soon!', 5000, false);
                return;
            }
            window.open(member.link, '_blank', 'noopener,noreferrer')
        }}
        >
            {member.experienceYears !== undefined && (
                <span className="home-about__experience-badge">{member.experienceYears}y exp</span>
            )}

            <div className="home-about__main">
                <div className="home-about__avatar-wrap">
                    {member.avatarUrl ? (
                        <img className="home-about__avatar" src={member.avatarUrl} alt={`${member.name} avatar`} />
                    ) : (
                        <div className="home-about__avatar home-about__avatar--placeholder" aria-hidden="true" />
                    )}
                </div>

                <div className="home-about__content">
                    <div className="home-about__identity">
                        <h3 className="home-about__name">{member.name}</h3>
                        {member.role && <p className="home-about__role">{member.role}</p>}
                    </div>

                    {member.bio && <p className="home-about__bio">{member.bio}</p>}

                    {metaItems.length > 0 && (
                        <div className="home-about__meta-list">
                            {metaItems.map((item) => (
                                <p className="home-about__meta-item" key={`${member.name}-${item.key}`}>
                                    <Icon name={item.icon} />
                                    <span>{item.value}</span>
                                </p>
                            ))}
                        </div>
                    )}

                    {member.techStack && member.techStack.length > 0 && (
                        <div className="tech home-about__tech">
                            {member.techStack.map((tech) => (
                                <TechIcon key={tech} tech={tech} />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="home-about__socials" role="group" aria-label={`${member.name} social links`}>
                {/* Render only social buttons that have a valid link. */}
                {socialPlatforms.map((platform) => {
                    const link = member.socials?.[platform];
                    if (!link) {
                        return null;
                    }

                    return (
                        <a
                            className={`home-about__social-btn home-about__social-btn--${platform}`}
                            key={`${member.name}-${platform}`}
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent card click
                                window.open(link, '_blank', 'noopener,noreferrer');
                            }}
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${member.name} ${platform}`}
                        >
                            <Icon name={platform} /> {platform}
                        </a>
                    );
                })}
            </div>
        </article>
    );
}