export type McServerResponse = {
    online: boolean;
    ip: string;
    port?: number;
    hostname?: string;
    debug?: {
        ping: boolean;
        query: boolean;
        bedrock: boolean;
        srv: boolean;
        querymismatch: boolean;
        ipinsrv: boolean;
        cnameinsrv: boolean;
        animatedmotd: boolean;
        cachehit: boolean;
        cachetime: number;
        cacheexpire: number;
        apiversion: number;
    };
    version?: string;
    protocol?: {
        version: number;
        name?: string;
    };
    icon?: string;
    software?: string;
    map?: {
        raw: string;
        clean: string;
        html: string;
    };
    gamemode?: string;
    serverid?: string;
    eula_blocked?: boolean;
    motd?: {
        raw: string[];
        clean: string[];
        html: string[];
    };
    players?: {
        online: number;
        max: number;
        list?: {
            name: string;
            uuid: string;
        }[];
    };
    plugins?: {
        name: string;
        version: string;
    }[];
    mods?: {
        name: string;
        version: string;
    }[];
    info?: {
        raw: string[];
        clean: string[];
        html: string[];
    };
};

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null;
}

function toPlayers(value: unknown): McServerResponse['players'] | undefined {
    if (!isRecord(value)) {
        return undefined;
    }

    const online = value.online;
    const max = value.max;
    const list = Array.isArray(value.list)
        ? value.list
              .filter((item): item is {name: string; uuid: string} =>
                  isRecord(item) &&
                  typeof item.name === 'string' &&
                  typeof item.uuid === 'string'
              )
              .map((item) => ({name: item.name, uuid: item.uuid}))
        : undefined;
    if (typeof online !== 'number' || typeof max !== 'number') {
        return undefined;
    }

    return {online, max, list};
}

function toStringArray(value: unknown): string[] | undefined {
    if (!Array.isArray(value)) {
        return undefined;
    }

    const strings = value.filter((item): item is string => typeof item === 'string');
    return strings.length > 0 ? strings : undefined;
}

function toMotd(value: unknown): McServerResponse['motd'] | undefined {
    if (!isRecord(value)) {
        return undefined;
    }

    const clean = toStringArray(value.clean);
    const html = toStringArray(value.html);
    const raw = toStringArray(value.raw);
    if (!clean && !html) {
        return undefined;
    }

    return {
        clean: clean ?? [],
        html: html ?? [],
        raw: raw ?? []
    };
}

export async function queryServer(ip: string): Promise<McServerResponse | null> {
    const serverAddress = ip.trim();
    if (!serverAddress) {
        return null;
    }

    const url = `https://api.mcsrvstat.us/3/${encodeURIComponent(serverAddress)}`;
    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    for (let attempt = 1; attempt <= 3; attempt += 1) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                if (attempt === 3) {
                    return null;
                }
                await sleep(1000);
                continue;
            }

            const payload: unknown = await response.json();
            if (!isRecord(payload) || typeof payload.online !== 'boolean') {
                if (attempt === 3) {
                    return null;
                }
                await sleep(1000);
                continue;
            }

            return {
                online: payload.online,
                ip: typeof payload.ip === 'string' ? payload.ip : serverAddress,
                port: typeof payload.port === 'number' ? payload.port : undefined,
                hostname: typeof payload.hostname === 'string' ? payload.hostname : undefined,
                version: typeof payload.version === 'string' ? payload.version : undefined,
                icon: typeof payload.icon === 'string' ? payload.icon : undefined,
                motd: toMotd(payload.motd),
                players: toPlayers(payload.players)
            };
        } catch {
            if (attempt === 3) {
                return null;
            }
            await sleep(1000);
        }
    }

    return null;
}
