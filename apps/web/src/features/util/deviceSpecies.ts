export type DeviceType = 'mobile' | 'tablet' | 'desktop';
export type OperatingSystem = 'ios' | 'android' | 'windows' | 'macos' | 'linux' | 'chromeos' | 'unknown';

type RuntimeInfo = {
    userAgent: string;
    platform: string;
    maxTouchPoints: number;
};

function getRuntimeInfo(): RuntimeInfo {
    // Keep utility safe in SSR/non-browser environments.
    if (typeof navigator === 'undefined') {
        return {
            userAgent: '',
            platform: '',
            maxTouchPoints: 0,
        };
    }

    return {
        userAgent: navigator.userAgent.toLowerCase(),
        platform: (navigator.platform ?? '').toLowerCase(),
        maxTouchPoints: navigator.maxTouchPoints ?? 0,
    };
}

function isLikelyTablet(info: RuntimeInfo): boolean {
    const tabletPattern = /(ipad|tablet|playbook|silk)|(android(?!.*mobi))/i;
    const isIPadOsDesktopMode = info.platform === 'macintel' && info.maxTouchPoints > 1;
    return tabletPattern.test(info.userAgent) || isIPadOsDesktopMode;
}

function isLikelyMobile(info: RuntimeInfo): boolean {
    const mobilePattern = /mobi|iphone|ipod|blackberry|iemobile|opera mini|android.*mobile|windows phone/i;
    return mobilePattern.test(info.userAgent);
}

export function getDeviceType(): DeviceType {
    const info = getRuntimeInfo();

    // Tablet check comes first to avoid classifying iPad/Android tablets as mobile.
    if (isLikelyTablet(info)) {
        return 'tablet';
    }

    if (isLikelyMobile(info)) {
        return 'mobile';
    }

    return 'desktop';
}

export function getOS(): OperatingSystem {
    const info = getRuntimeInfo();
    const ua = info.userAgent;

    // Detect iPadOS desktop UA by combining platform and touch points.
    if (/iphone|ipad|ipod/i.test(ua) || (info.platform === 'macintel' && info.maxTouchPoints > 1)) {
        return 'ios';
    }

    if (/android/i.test(ua)) {
        return 'android';
    }

    if (/windows phone/i.test(ua)) {
        return 'windows';
    }

    if (/windows nt|win32|win64|wow64/i.test(ua) || info.platform.startsWith('win')) {
        return 'windows';
    }

    if (/cros/i.test(ua)) {
        return 'chromeos';
    }

    if (/macintosh|mac os x/i.test(ua) || info.platform.startsWith('mac')) {
        return 'macos';
    }

    if (/linux|x11/i.test(ua) || info.platform.includes('linux')) {
        return 'linux';
    }

    return 'unknown';
}

export function isMobile(): boolean {
    return getDeviceType() === 'mobile';
}

export function isTablet(): boolean {
    return getDeviceType() === 'tablet';
}

export function isDesktop(): boolean {
    return getDeviceType() === 'desktop';
}