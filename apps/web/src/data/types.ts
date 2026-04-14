export type Project = {
    title: string;
    imgUrl?: string; // optional
    description: string;
    technicalStack: string[];
    author?: string[]; // optional
    initialRelease: string;
    lastUpdated: string;
    link: string;
    style?: string; // optional
    bgUrl?: string; // optional
    redirectURL?: string; // optional
    redirectText?: string; // optional
};

export type SocialLinks = {
    facebook?: string;
    instagram?: string;
    github?: string;
    linkedin?: string;
    x?: string;
    youtube?: string;
    discord?: string;
};

export type Member = {
    name: string;
    link?: string;
    avatarUrl?: string;
    bio?: string;
    techStack?: string[];
    occupation?: string;
    school?: string;
    role?: string;
    experienceYears?: number;
    location?: string;
    accentColor?: string;
    socials?: SocialLinks;
};