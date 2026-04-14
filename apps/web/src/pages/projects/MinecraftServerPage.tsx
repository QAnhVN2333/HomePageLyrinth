import {Icon} from '../../features/util/components/util';
import {queryServer} from '../../features/util/queryServer';
import type {McServerResponse} from '../../features/util/queryServer';
import {type IconName, icons8UrlBuilder} from '../../features/util/icon'
import type {SocialLinks} from "../../data/types.ts";
import {socialPlatforms} from "../../data/siteContent";
import {useEffect, useMemo, useState} from "react";
import {isDesktop, isMobile} from "../../features/util/deviceSpecies";
import type {Feature, MCServerContent, VersionSupport, WhyChoose} from "../../data/pageMinecraft.ts";
import {showToast} from "../../features/util/toast";
import {useSeoMeta, type SeoMetaConfig} from '../../features/util/hooks/useSeoMeta'

type MotdCharacter = {
    char: string;
    color: string | null;
};

type MotdLine = {
    text: string;
    colors: string[];
};

type ServerStatisticStatus = 'loading' | 'success' | 'error';

type ServerStatisticState = {
    status: ServerStatisticStatus;
    playerOnline: number;
    maxPlayer: number;
    isAlive: boolean;
    serverData: McServerResponse | null;
};

const randomPlayerHeadNames = [
    'minecraft-creeper',
    'crafting-table',
    'minecraft-main-character',
    ];
const getRandomPlayerHeadName = () => {
    const randomIndex = Math.floor(Math.random() * randomPlayerHeadNames.length);
    return randomPlayerHeadNames[randomIndex];
}
const DEFAULT_MOTD_TEXT = 'Mất kết nối đến máy chủ. Không thể truy xuất thông tin.';

function normalizeHexColor(rawColor: string | null | undefined): string | null {
    if (!rawColor) {
        return null;
    }

    const trimmedColor = rawColor.trim();
    const shortHexMatch = /^#([0-9a-fA-F]{3})$/.exec(trimmedColor);
    if (shortHexMatch) {
        const expanded = shortHexMatch[1]
            .split('')
            .map((char) => `${char}${char}`)
            .join('');
        return `#${expanded.toUpperCase()}`;
    }

    const longHexMatch = /^#([0-9a-fA-F]{6})$/.exec(trimmedColor);
    if (!longHexMatch) {
        return null;
    }

    return `#${longHexMatch[1].toUpperCase()}`;
}

function extractColorFromStyle(styleText: string | null): string | null {
    if (!styleText) {
        return null;
    }

    const colorMatch = /(?:^|;)\s*color\s*:\s*([^;]+)\s*(?:;|$)/i.exec(styleText);
    return normalizeHexColor(colorMatch?.[1]);
}

function parseMotdHtmlToCharacters(lineHtml: string): MotdCharacter[] {
    if (!lineHtml) {
        return [];
    }

    if (typeof DOMParser === 'undefined') {
        return lineHtml
            .replace(/<[^>]+>/g, '')
            .split('')
            .map((char) => ({char, color: null}));
    }

    const parser = new DOMParser();
    const documentNode = parser.parseFromString(`<div>${lineHtml}</div>`, 'text/html');
    const rootNode = documentNode.body.firstElementChild;
    if (!rootNode) {
        return [];
    }

    const parsedCharacters: MotdCharacter[] = [];

    // Walk through nodes to keep text order and propagate parent color down to child text nodes.
    const visitNode = (node: Node, inheritedColor: string | null) => {
        if (node.nodeType === Node.TEXT_NODE) {
            const value = node.textContent ?? '';
            for (const char of value) {
                parsedCharacters.push({char, color: inheritedColor});
            }
            return;
        }

        if (node.nodeType !== Node.ELEMENT_NODE) {
            return;
        }

        const elementNode = node as HTMLElement;
        const tagName = elementNode.tagName.toLowerCase();
        if (tagName === 'br') {
            parsedCharacters.push({char: '\n', color: inheritedColor});
            return;
        }

        const colorFromStyle = extractColorFromStyle(elementNode.getAttribute('style'));
        const colorFromAttribute = normalizeHexColor(elementNode.getAttribute('color'));
        const currentColor = colorFromStyle ?? colorFromAttribute ?? inheritedColor;

        const childNodes = Array.from(elementNode.childNodes);
        for (const childNode of childNodes) {
            visitNode(childNode, currentColor);
        }
    };

    const rootChildren = Array.from(rootNode.childNodes);
    for (const childNode of rootChildren) {
        visitNode(childNode, null);
    }

    return parsedCharacters;
}

function buildGradientFromColors(colors: string[]): string | null {
    if (colors.length <= 1) {
        return null;
    }

    const compactPalette = colors.filter((color, index) => {
        return index === 0 || color !== colors[index - 1];
    });

    if (compactPalette.length <= 1) {
        return null;
    }

    return `linear-gradient(to right, ${compactPalette.join(', ')})`;
}

function buildMotdLines(htmlLines: string[] | undefined, cleanLines: string[] | undefined): MotdLine[] {
    const allCharacters: MotdCharacter[] = [];

    if (htmlLines && htmlLines.length > 0) {
        htmlLines.forEach((lineHtml, index) => {
            const parsedLine = parseMotdHtmlToCharacters(lineHtml);
            allCharacters.push(...parsedLine);
            if (index < htmlLines.length - 1) {
                allCharacters.push({char: '\n', color: null});
            }
        });
    }

    if (allCharacters.length === 0) {
        const fallbackText = (cleanLines && cleanLines.length > 0)
            ? cleanLines.join('\n')
            : DEFAULT_MOTD_TEXT;

        return fallbackText.split('\n').map((line) => ({
            text: line,
            colors: []
        }));
    }

    const lines: MotdLine[] = [];
    let currentLineCharacters: MotdCharacter[] = [];
    let lastKnownColor: string | null = null;

    const flushLine = () => {
        const text = currentLineCharacters.map((item) => item.char).join('');
        const colors = currentLineCharacters
            .map((item) => {
                if (item.color) {
                    lastKnownColor = item.color;
                    return item.color;
                }
                return lastKnownColor;
            })
            .filter((value): value is string => Boolean(value));

        lines.push({text, colors});
        currentLineCharacters = [];
    };

    for (const item of allCharacters) {
        if (item.char === '\n') {
            flushLine();
            continue;
        }

        currentLineCharacters.push(item);
    }

    flushLine();

    return lines;
}
function randomThemeGenerator() {
    const hue = Math.floor(Math.random() * 360);

    const accent = `hsl(${hue}, 80%, 55%)`;
    const secondary = `hsl(${hue}, 30%, 12%)`;
    const text = `hsl(${hue}, 20%, 92%)`;
    const gridSize = `${20 + Math.floor(Math.random() * 30)}px`;
    const gridLineWidth = `1px`;
    const patternOpacity = (Math.random() * 0.2 + 0.25).toFixed(2);

    return {
        colorAccent: accent,
        colorSecondary: secondary,
        colorText: text,
        gridSize,
        gridLineWidth,
        pattern0pacity: patternOpacity
    };
}

const initialServerStatisticState: ServerStatisticState = {
    status: 'loading',
    playerOnline: 0,
    maxPlayer: 0,
    isAlive: false,
    serverData: null
};

async function fetchServerStatistic(ipAddress: string): Promise<McServerResponse | null> {
    return queryServer(ipAddress);
}

function buildServerStatisticState(response: McServerResponse | null): ServerStatisticState {
    if (!response) {
        return {
            ...initialServerStatisticState,
            status: 'error'
        };
    }

    const online = Boolean(response.online);
    return {
        status: 'success',
        isAlive: online,
        playerOnline: response.players?.online ?? 0,
        maxPlayer: response.players?.max ?? 0,
        serverData: response
    };
}

function useServerStatistic(ipAddress: string, pollingIntervalMs: number = 200000): ServerStatisticState {
    const [serverStatistic, setServerStatistic] = useState<ServerStatisticState>(initialServerStatisticState);

    useEffect(() => {
        let ignore = false;

        const loadServerStatistic = async () => {
            setServerStatistic((prev) => ({...prev, status: 'loading'}));
            const response = await fetchServerStatistic(ipAddress);
            if (ignore) {
                return;
            }

            setServerStatistic(buildServerStatisticState(response));
        };

        void loadServerStatistic();
        const intervalId = window.setInterval(() => {
            void loadServerStatistic();
        }, pollingIntervalMs);

        return () => {
            ignore = true;
            clearInterval(intervalId);
        };
    }, [ipAddress, pollingIntervalMs]);

    return serverStatistic;
}

export default function MinecraftServerPage({data, seo}: {data: MCServerContent; seo?: SeoMetaConfig}) {
    useSeoMeta(seo);

    return (
        <div className={"minecraft-server-page"}>
            <MinecraftServerContainer data={data}/>
        </div>
    )
}
export function MinecraftServerContainer({data}: {data: MCServerContent}) {
    const serverStatistic = useServerStatistic(data.introduce.ipAddress);
    const randomSlogan = useState(() => {
        if (!data.introduce.slogan || data.introduce.slogan.length === 0) {
            return '';
        }
        const randomIndex = Math.floor(Math.random() * data.introduce.slogan.length);
        return data.introduce.slogan[randomIndex];
    })[0];
    const randomTheme = useState(() => {
        //const randomIndex = Math.floor(Math.random() * themes.length);
        //return themes[randomIndex];
        return randomThemeGenerator();
    })[0];
    let colorAccent = data.theme?.colorAccent ?? 'auto';
    let colorText = data.theme?.colorText ?? '#ffffff';
    let colorSecondary = data.theme?.colorSecondary ?? '#000000';
    if (colorAccent === 'auto') {
        colorAccent = randomTheme.colorAccent ?? '#ff0000';
        colorText = randomTheme.colorText ?? colorText;
        colorSecondary = randomTheme.colorSecondary ?? colorSecondary;
    }
    return (
        <div className={"minecraft-server-container"}
             style={{
                 '--mc-accent': colorAccent,
                 '--mc-text': colorText,
                 '--mc-secondary': colorSecondary,
             } as React.CSSProperties}
        >
            <div className={"minecraft-server__title-wrapper"}>
                <div className={"title-wrapper__filter-layer"}></div>
                <div className={"title-wrapper__glow-layer"}></div>
                <h1 className={"title-wrapper__title"}>{data.introduce.title}
                <span className={"title-wrapper__subtitle"}>{data.introduce.subTitle}</span>
                </h1>
                {(data.introduce.slogan) && (
                    <span className={"title-wrapper__slogan"}>{randomSlogan}</span>
                )}
                <div className={"title-wrapper__btn-group"}>
                    <IpButton key={1} data={data}/>
                </div>
                <ServerStatistic serverStatistic={serverStatistic} data={data}/>
            </div>
            {serverStatistic.serverData?.players && serverStatistic.serverData.players.online > 0 && (
            <div className={"player_list__wrapper"}>
                <PlayerList players={serverStatistic.serverData?.players}/>
            </div>)}

            {data.whyChoose && data.whyChoose.length > 0 &&
                (<div className={"minecraft-server__whychoose-wrapper"}>
                <div className={"whychoose-wrapper__title-wrapper"}>
                <h2 className={"whychoose-wrapper__title"}>
                    Về
                    <span> {data.introduce.serverName}</span>
                </h2>
                {data.introduce.description && (
                    <div className={"whychoose-wrapper__description"}>
                        {data.introduce.description.map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                )}
                </div>
                <div className={"whychoose-wrapper__grid"}>
                    {data.whyChoose.map((item, index) => (
                        <WhyChoose key={index} whychoose={item}/>
                    ))}
                </div>
            </div>)}
            {data.features && data.features.length > 0 && (
            <div className={"minecraft-server__playerhook-wrapper"}>
                <div className={"feature-wrapper"}>
                    <h2 className={"feature-wrapper__title"}>Tính Năng
                        <span className={"feature-wrapper__title title--accent"}> Nổi Bật </span>
                    </h2>
                    <div className={"feature-wrapper__grid"}>
                        {data.features.map((item, index) => (
                            <FeatureCard key={index} feature={item}/>
                        ))}
                    </div>
                </div>
            </div>)}
            {data.versionSupport && data.versionSupport.length > 0 && (
            <div className={"minecraft-server__version-support-wrapper"}>
                <div className={"version-support-wrapper"}>
                    <h2 className={"version-support-wrapper__title"}>Phiên Bản
                        <span className={"version-support-wrapper__title title--accent"}> Hỗ Trợ </span>
                    </h2>
                    <div className={"version-support-wrapper__grid"}>
                        {data.versionSupport.map((item, index) => (
                            <VersionSupport key={index} support={item}/>
                        ))}
                    </div>
                </div>
            </div>)}
            {Object.keys(data).length>1 &&(
            <div className={"playnow-wrapper"}>
                <div className={"playnow-wrapper__filter-layer"}></div>
                <div className={"playnow-wrapper__glow-layer"}></div>
                <h2 className={"playnow-wrapper__title"}>Tham Gia {data.introduce.serverName} Ngay</h2>
                <p className={"playnow-wrapper__description"}>Hãy tham gia cùng chúng tôi và trải nghiệm thế giới
                    Minecraft tuyệt vời tại {data.introduce.serverName}!</p>
                <PlayButton key={2} data={data}/>
            </div>)}
            {(data.socials&& Object.keys(data.socials).length > 0) && (
                <div className={"social-links-wrapper"}>
                    <h2 className={"social-links-wrapper__title"}>Mạng Xã Hội {data.introduce.serverName}</h2>
                        <SocialLinks socials={data.socials}/>
                    </div>)}

        </div>
    )
}

function handleCopyIp({data}: {data: MCServerContent}) {
    let ipAddress = data.introduce.ipAddress;
    if (isDesktop()) {
        ipAddress += data.introduce.port ? `:${data.introduce.port}` : '';
    }
    navigator.clipboard.writeText(ipAddress).then(() => {
        if (isMobile()&& data.introduce.portMobile) {
            showToast(`Đã sao chép IP. Hãy nhập thêm cổng ${data.introduce.portMobile} Để tham gia`, 5000);
        } else {
            showToast(`Đã sao chép IP`, 5000);
        }
    }).catch(() => {
        showToast('Sao chép thất bại.');
    });
}
export function IpButton({data}: {data: MCServerContent}) {
    const getDisplayIp = () => {
        if (isDesktop()) {
            return data.introduce.ipAddress + (data.introduce.port ? `:${data.introduce.port}` : '');
        }

        if (isMobile()) {
            return data.introduce.ipAddress + (data.introduce.portMobile ? `:${data.introduce.portMobile}` : '');
        }

        return data.introduce.ipAddress;
    };
    return (
        <div className={`ip-copy__button`}
        onClick={() => {
            handleCopyIp({data});
        }}
        >
            <span>{getDisplayIp()}</span>
            <Icon name={"copy"}/>
        </div>
    )
}

export function PlayButton({data}: {data: MCServerContent}) {
    return (
        <button className={`ip-playnow__button`}
        onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setTimeout(() => {
                handleCopyIp({data});
            }, 500);
        }}
        >
            {data.introduce.playButtonText ?? 'Chơi Ngay'}
        </button>
    )
}
export function FeatureCard({feature}:{feature:Feature}) {
    return (
        <div className={`feature__card`}>
            {feature.iconName&& !feature.directImgUrl&&!feature.useImg && (
                <div className={"feature__card-icon"}>
                    <Icon name={feature.iconName}/>
                </div>
            )}
            {feature.iconName&& feature.useImg&&!feature.directImgUrl && (
                <div className={"feature__card-icon"}>
                    <IconBuilder iconName={feature.iconName} useImg={feature.useImg}/>
                </div>
            )}
            {feature.directImgUrl&&(
                <div className={"feature__card-icon"}>
                    <img src={feature.directImgUrl} alt={`${feature.title} icon`} />
                </div>
            )}
            <div className={"feature__card-title-wrapper"}>
            <div className={"feature__card-title"}>
                {feature.title}
            </div>
            {feature.description&&(
                <div className={"feature__card-description"}>
                    {feature.description}
                </div>
            )}
            </div>
        </div>
    )
}
function IconBuilder({iconName, useImg}: {iconName: string; useImg?: boolean}) {
    if (useImg) {
        const imgUrl= icons8UrlBuilder(iconName,"color", 64);
        return <img src={imgUrl} alt={`${iconName} icon`} />;
    }
    return <Icon name={iconName as IconName} />;
}
export function WhyChoose({whychoose}:{whychoose:WhyChoose}) {
    return (
        <div className={`whychoose__card`}>
            {(whychoose.iconName && !whychoose.useImg &&!whychoose.directImgUrl)&&(
                <div className={"whychoose__card-icon"}>
                    <IconBuilder iconName={whychoose.iconName} useImg={whychoose.useImg}/>
                </div>
            )}
            {(whychoose.iconName && whychoose.useImg&&!whychoose.directImgUrl) &&(
                <div className={"whychoose__card-icon"}>
                    <IconBuilder iconName={whychoose.iconName} useImg={whychoose.useImg}/>
                </div>
            )}
            {whychoose.directImgUrl&&(
                <div className={"whychoose__card-icon"}>
                    <img src={whychoose.directImgUrl} alt={`${whychoose.title} icon`} />
                </div>
            )}
            <div className={"whychoose__card-title-wrapper"}>
            <div className={"whychoose__card-title"}>
                {whychoose.title}
            </div>
            {whychoose.description&&(
                <div className={"whychoose__card-description"}>
                    {whychoose.description}
                </div>
            )}
            </div>
        </div>
    )
}
export function VersionSupport({support}:{support:VersionSupport}) {
    return (
        <div className={`support__card`}>
            {(support.iconName&& !support.directImgUrl&&!support.useImg) && (
                <div className={"support__card-icon"}>
                    <Icon name={support.iconName}/>
                </div>
            )}
            {(support.iconName&& support.useImg&&!support.directImgUrl) && (
                <div className={"support__card-icon"}>
                    <IconBuilder iconName={support.iconName} useImg={support.useImg}/>
                </div>
            )}
            {support.directImgUrl&&(
                <div className={"support__card-icon"}>
                    <img src={support.directImgUrl} alt={`${support.platform} icon`} />
                </div>
            )}
            <div className={"support__card-title"}>
                {support.platform}
            </div>
            {support.description&&(
                <div className={"support__card-description"}>
                    {support.description}
                </div>
            )}
            {support.versionRange&&(
                <div className={"support__card-version-range"}>
                    {support.versionRange}
                </div>
            )}
        </div>
    )
}
export function ServerStatistic({serverStatistic, data}:{serverStatistic: ServerStatisticState; data: MCServerContent}) {
    const {status, playerOnline, maxPlayer, isAlive, serverData} = serverStatistic;

    const serverName = data.introduce.serverName ?? serverData?.hostname ?? data.introduce.serverName;
    const serverVersion = serverData?.version ?? data.versionSupport?.find((item) => item.platform.toLowerCase() === 'java')?.versionRange ?? 'Phiên bản không xác định';
    const motdLines = useMemo(() => {
        return buildMotdLines(serverData?.motd?.html, serverData?.motd?.clean);
    }, [serverData?.motd?.html, serverData?.motd?.clean]);

    return (
        <div className={"statistic__card"}
             // Clicking the card triggers copy IP action.
                onClick={() => {
                    handleCopyIp({data});
                }}
        >
            {status === 'success' && (
                <div className={`server-item ${isAlive ? 'server-item--online' : 'server-item--offline'}`}>
                    {serverData?.icon ? (
                        <img className="server-item__thumbnail" src={serverData.icon} alt={`${serverName} icon`} />
                    ) : (
                        <div className="server-item__thumbnail" aria-hidden="true"></div>
                    )}
                    <div className="server-item__content-wrapper">
                        <div className="server-item__content">
                            <div className="server-item__name">{serverName}</div>
                            <div className="server-item__meta">
                                <span className="server-item__version">{serverVersion}</span>
                                <span className="server-item__separator">|</span>
                                <span className={`server-item__player-count${isAlive ? '' : ' server-item__player-count--offline'}`}>
                                    {isAlive ? `${playerOnline} / ${maxPlayer}` : ''}
                                </span>
                                <div className="server-item__ping">
                                <Icon name={"ping_5"} />
                                </div>
                            </div>
                        </div>
                        <div className="server-item__motd">
                            {motdLines.map((line, lineIndex) => {
                                const gradient = buildGradientFromColors(line.colors);
                                const fallbackColor = !gradient && line.colors.length === 1 ? line.colors[0] : undefined;

                                return (
                                    <span className="server-item__motd-line" key={`motd-line-${lineIndex}`}>
                                        <span
                                            className={`server-item__motd-text${gradient ? ' server-item__motd-text--gradient' : ''}`}
                                            style={{
                                                backgroundImage: gradient ?? undefined,
                                                color: fallbackColor
                                            }}
                                        >
                                            {line.text.length > 0 ? line.text : ' '}
                                        </span>
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
export function PlayerList({players}:{players: McServerResponse['players'] | null | undefined}) {
    if (!players || !players.list || players.list.length === 0) {
        return null;
    }
    return (
        <div className={"player-list__player-group"}>
            {players.list.map((player) => (
                <div className={"player-list__player-card"} key={player.uuid}>
                    <img
                        className={"player-list__avatar"}
                        //if premium
                        src={`https://mc-heads.net/avatar/${player.uuid}`}
                        alt={`${player.name}'s avatar`}
                        //if not premium, use random default
                        onError={(e) => {
                            const randomHeadName = getRandomPlayerHeadName();
                            const target = e.target as HTMLImageElement;
                            target.src = icons8UrlBuilder(randomHeadName);
                        }}
                    />
                    <span className={"player-list__name"}>{player.name}</span>
                </div>
            ))}
        </div>

    )
}
export function SocialLinks({socials}: { socials: SocialLinks }) {
    return (
        <div className={"social-links__btn-group"}>
            {socialPlatforms.map((platform) => {
                const link = socials?.[platform];
                if (!link) {
                    return null;
                }

                return (
                    <a
                        className={`social-links__social-btn social-links__social-btn--${platform} server-social-btn`}
                        key={`social-links-${platform}`}
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent card click
                            window.open(link, '_blank', 'noopener,noreferrer');
                        }}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`social-links ${platform}`}
                    >
                        <Icon name={platform} />
                    </a>
                );
            })}
        </div>
    )
}
