import type {IconName} from "../features/util/icon.ts";
import type {SocialLinks} from "./types.ts";

export type Introduce ={
    serverName?: string;
    ipAddress: string
    port?: number;
    portMobile?: number;
    title?: string;
    subTitle?: string;
    slogan?: string[];
    playButtonText?: string;
    description?: string[];
    playerHookText?: string[];
}
export type WhyChoose = {
    title: string;
    description: string;
    iconName?: IconName|string; //Allow both custom string for icons8 and predefined IconName for built-in icons
    useImg?: boolean; //If true, the icon will be rendered via iconS8, otherwise it will be rendered via Icon component with svg from icon.ts
    directImgUrl?: string; // If provided, this URL will be used directly for the icon image, bypassing both Icon component and icons8 builder.
}
export type Feature = {
    title: string;
    description: string;
    iconName?: IconName|string; //Allow both custom string for icons8 and predefined IconName for built-in icons
    useImg?: boolean; // If true, the icon will be rendered via iconS8, otherwise it will be rendered via Icon component with svg from icon.ts
    directImgUrl?: string; // If provided, this URL will be used directly for the icon image, bypassing both Icon component and icons8 builder.
}
export type VersionSupport = {
    platform: string;
    iconName?: IconName|string; //Allow both custom string for icons8 and predefined IconName for built-in icons
    directImgUrl?: string; // If provided, this URL will be used directly for the icon image, bypassing both Icon component and icons8 builder.
    useImg?: boolean; // If true, the icon will be rendered via iconS8, otherwise it will be rendered via Icon component with svg from icon.ts
    description?:string;
    versionRange:string;
}
export type PageTheme = {
    colorAccent?: string;
    colorText?: string;
    colorSecondary?: string;
    gridSize?: string;
    gridLineWidth?: string;
    pattern0pacity?: string;
}
export type MCServerContent = {
    introduce:Introduce;
    whyChoose?:WhyChoose[];
    features?:Feature[];
    versionSupport?:VersionSupport[];
    socials?: SocialLinks;
    theme?: PageTheme;
}
export const lyrinthSMP: MCServerContent = {
    introduce: {
        ipAddress: 'lyrinth.com',
        portMobile: 26000,
        serverName: 'Immortal SMP',
        title: 'Immortal SMP',
        subTitle : 'Lyrinth Network',
        slogan: [
            'LYRINTH NETWORK',
            'Ba mươi năm Hà Đông, ba mươi năm Hà Tây, đừng khinh Admin nghèo!',
            'Thuận ta là phàm, nghịch ta là tiên, chỉ tại một ý niệm giữa lòng ta.',
            'Khai Tông Lập Phái, Chiến Đấu Đột Phá, Kỳ Ngộ Mỗi Ngày!',
        ],
        description: [
            'Immortal SMP là một Tu Chân Giới Sinh Tồn PVP mang đậm bản sắc tiên hiệp. Tại đây, các đạo hữu có thể tự do khai tông lập phái, luyện khí, chiến đấu và lịch luyện. Những sự kiện và bí cảnh hấp dẫn luôn mở ra hàng ngày để chờ đón người hữu duyên.',
            'Được phát triển bởi đội ngũ Admin tâm huyết, chúng tôi cam kết duy trì một server công bằng, ổn định và phát triển. Các tính năng tu tiên luôn được cập nhật liên tục để mang lại trải nghiệm đột phá tốt nhất.',
            'Hãy bước qua cánh cổng thời không, gia nhập Immortal SMP và viết lên truyền kỳ của riêng bạn!',
        ],
        playerHookText: [
            'Báo danh ngay để bắt đầu con đường nghịch thiên cải mệnh tại đại lục Lyrinth Network!',
            'Trải nghiệm hệ thống tu luyện độc nhất vô nhị và kết giao cùng các đạo hữu bốn phương!',
            'Đừng bỏ lỡ cơ hội vấn đỉnh thương khung - nơi mọi tín đồ Minecraft yêu thích tu tiên đều quy tụ!',
        ],
        playButtonText: 'Tiến Nhập Tu Giới'
    },
    whyChoose: [
        {
            title: 'Linh Mạch Ổn Định',
            description: 'Dù tài nguyên ban đầu khiêm tốn, nhưng chúng mình luôn ưu tiên tối ưu hóa hiệu suất server để đảm bảo các đạo hữu không bị giật lag khi tu luyện.',
            iconName: 'minecraft-sword',
            useImg: true
        },
        {
            title: 'Khắc Chế Tà Tu',
            description: 'Hệ thống Anti-cheat thông minh, trừng trị nghiêm khắc các loại tà tu gian lận: Anti Xray, Fly, PvP cheats,... đảm bảo công bằng tuyệt đối.',
            directImgUrl: 'https://media.lyrinth.com/HomePageAssert/mc-page/mc_shield_vietnam.webp'
        },
        {
            title: 'Kỳ Ngộ Mỗi Ngày',
            description: 'Mỗi ngày trôi qua tại tu giới đều xuất hiện vô số sự kiện và bí cảnh thú vị để bạn tham gia đoạt lấy phần thưởng hấp dẫn.',
            directImgUrl: 'https://media.lyrinth.com/HomePageAssert/mc-page/mc_cat.webp',
        },
        {
            title: 'Bảo Mật Tối Đa',
            description: 'Hệ thống Database được liên kết chặt chẽ và bảo mật cao, bảo vệ an toàn tuyệt đối mọi dữ liệu tu luyện của người chơi.',
            directImgUrl: 'https://media.lyrinth.com/HomePageAssert/mc-page/mc_dog.webp',
        },
        {
            title: 'Tính Năng Độc Quyền',
            description: 'Sở hữu nhiều tính năng mang đậm bản sắc tiên hiệp. Cùng hệ thống Plugin được thiết kế độc quyền dành riêng cho Immortal SMP.',
            directImgUrl: 'https://img.icons8.com/bubbles/100/minecraft-bed.png',
            useImg: true
        },
        {
            title: 'Hoàn Thiện Từng Ngày',
            description: 'Chúng tôi luôn lắng nghe tâm đắc tu luyện từ người chơi để cải tiến và cập nhật thường xuyên nhằm mang đến trải nghiệm hoàn mỹ nhất.',
            iconName: 'minecraft-golden-apple',
            useImg: true
        }
    ],
    features: [
        {
            title: 'Giao Diện Tiên Tiến',
            description: 'Giảm thiểu tối đa việc gõ lệnh phức tạp. Mọi thao tác đều có giao diện trực quan, dễ sử dụng, giúp đạo hữu toàn tâm toàn ý vào việc đột phá và chiến đấu.',
            directImgUrl: 'https://img.icons8.com/external-those-icons-lineal-color-those-icons/24/external-minecraft-video-games-those-icons-lineal-color-those-icons.png'
        },
        {
            title: '70+ Plugins Đa Dạng',
            description: 'Hệ thống Plugin phong phú vận hành mọi thứ: Shop, Home, Claim, TPA... Đặc biệt có hơn 10+ Plugin tu tiên được đội ngũ tự tay thiết kế.',
            iconName: 'minecraft-logo--v1',
            useImg: true
        },
        {
            title: 'Ngũ Hành Chiến Kỹ',
            description: 'Hệ thống chiến đấu dung hợp Cấp độ Tu vi & Phản ứng Nguyên tố, tạo ra chiều sâu chiến thuật và sự biến hóa khôn lường trong các trận PVP.',
            iconName: 'minecraft-sword',
            useImg: true
        },
        {
            title: 'Thiên Đạo Thí Luyện',
            description: 'Tu vi càng cao, yêu thú gặp phải càng cường đại. Logic tăng độ khó được thiết kế tỉ mỉ để đảm bảo sự cân bằng và thử thách xứng tầm cho mọi cấp độ.',
            directImgUrl: 'https://minecraft.tools/en/img/blocs/442.png',
        },
        {
            title: 'Hệ Thống Nhiệm Vụ',
            description: 'Hàng trăm nhiệm vụ từ dễ đến khó. Hoàn thành các bảng cáo thị để thu thập điểm cống hiến và các phần thưởng bồi dưỡng linh căn.',
            directImgUrl: 'https://media.lyrinth.com/HomePageAssert/mc-page/mc_enchanted_book.gif',
        },
        {
            title: 'Thú Vui Trần Tục',
            description: 'Bên cạnh việc chém giết, đạo hữu có thể tham gia các hoạt động giải trí như: câu cá linh hồ, đá gà tiên, và vô số Minigames khác.',
            directImgUrl: 'https://media.lyrinth.com/HomePageAssert/mc-page/mc_shield_vietnam.webp'
        },
        {
            title: 'Khai Tông Lập Phái',
            description: 'Hiệu triệu quần hùng thành lập Tông Môn, xây dựng đại bản doanh, tiến hành tông chiến đoạt tài nguyên, xưng bá tu chân giới.',
            directImgUrl: 'https://media.lyrinth.com/HomePageAssert/mc-page/shop_tutien.webp',
        },
        {
            title: 'Phường Thị Sầm Uất',
            description: 'Nền kinh tế được vận hành bằng Linh Thạch một cách chân thực. Giá cả biến động theo cung cầu thị trường, đi kèm hệ thống chống lạm phát hiệu quả.',
            directImgUrl: 'https://media.lyrinth.com/HomePageAssert/mc-page/linh_thach2_scaled.webp',
        }
    ],
    versionSupport: [
        {
            platform: 'Java',
            versionRange: '1.19.x - 1.21.x',
            directImgUrl: 'https://minecraft.tools/en/img/blocs2/002-pelouse.png',
            description: 'Dành cho Máy tính (PC)'
        },
        {
            platform: 'Bedrock',
            directImgUrl: 'https://gamepedia.cursecdn.com/minecraft_gamepedia/6/68/Bedrock_JE2_BE2.png?version=fe113612ba2231b70dbf6627c699e644',
            versionRange: '1.21.50 - 1.21.70',
            description: 'Dành cho Điện thoại'
        }
    ],
    socials: {
        //facebook: 'https://facebook.com',
        //github: 'https://github.com',
    },
    theme: {
        colorAccent: 'auto',
        colorText: '#ffffff',
        colorSecondary: '#00ff00',
        gridSize: '25px',
        gridLineWidth: '1px',
        pattern0pacity: '0.1'
    }
}
export const lyrinthMinigames: MCServerContent = {
    introduce: {
        ipAddress: 'minigames.lyrinth.com',
        portMobile: 26000,
        title: 'Lyrinth Minigames',
        subTitle : 'Lyrinth Network',
        slogan: [
            'Server Minigames Đa Dạng',
        ],
    }
}