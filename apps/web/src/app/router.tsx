import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import type { ReactElement } from 'react'
import { MainLayout } from '../layouts/MainLayout'
import { AdminLayout } from '../layouts/AdminLayout'
import { HomePage } from '../pages/home/HomePage.tsx'
import { LoginPage } from '../pages/login/LoginPage'
import { AdminDashboardPage } from '../pages/admin/AdminDashboardPage'
import { NotFoundPage } from '../pages/not-found/NotFoundPage'
import MinecraftServerPage from "../pages/projects/MinecraftServerPage.tsx";
import {lyrinthSMP,lyrinthMinigames} from "../data/pageMinecraft.ts";

type HostRouteMode = 'standalone' | 'main-layout-root'

type HostRouteConfig = {
  mode: HostRouteMode
  element: ReactElement
}

const hostRouteConfigs: Readonly<Record<string, HostRouteConfig>> = {
  'minigames.lyrinth.com': {
    mode: 'standalone',
    element: (
      <MinecraftServerPage
        data={lyrinthMinigames}
        seo={{
          title: 'Lyrinth Minigames - Máy chủ Minecraft Minigames Lyrinth Network',
          description: 'Tham gia máy chủ Lyrinth Minigames với nhiều chế độ chơi và sự kiện cộng đồng.',
          author: 'Lyrinth Team',
          faviconUrl: '/favicon-minigames.svg',
          canonicalUrl: 'https://minigames.lyrinth.com/',
          robots: 'index,follow',
          openGraph: {
            title: 'Lyrinth Minigames - Máy chủ Minecraft Minigames Lyrinth Network',
            description: 'Tham gia máy chủ Lyrinth Minigames với nhiều chế độ chơi và sự kiện cộng đồng.',
            type: 'website',
            url: 'https://minigames.lyrinth.com/',
          },
        }}
      />
    ),
  },
  'smp.lyrinth.com': {
    mode: 'standalone',
    element: (
      <MinecraftServerPage
        data={lyrinthSMP}
        seo={{
          title: 'Immortal SMP - Máy chủ Minecraft SMP Lyrinth Network',
          description: 'Immortal SMP - Máy chủ Minecraft SMP thuộc Lyrinth Network với lối chơi sinh tồn độc đáo, PvP cân bằng, anti-cheat mạnh và cộng đồng thân thiện. Tham gia ngay!',
          author: 'Lyrinth Team',
          faviconUrl: '/favicon-smp.svg',
          canonicalUrl: 'https://smp.lyrinth.com/',
          robots: 'index,follow',
          openGraph: {
            title: 'Immortal SMP - Máy chủ Minecraft SMP Lyrinth Network',
            description: 'Immortal SMP - Máy chủ Minecraft SMP thuộc Lyrinth Network với lối chơi sinh tồn độc đáo, PvP cân bằng, anti-cheat mạnh và cộng đồng thân thiện. Tham gia ngay!',
            type: 'website',
            url: 'https://smp.lyrinth.com/',
          },
        }}
      />
    ),
  },
}

function getCurrentHostname(): string {
  if (typeof window === 'undefined') {
    return ''
  }

  return window.location.hostname.toLowerCase()
}

export function AppRouter() {
  const hostConfig = hostRouteConfigs[getCurrentHostname()]

  if (hostConfig?.mode === 'standalone') {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={hostConfig.element} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    )
  }

  const rootPageElement = hostConfig?.mode === 'main-layout-root'
    ? hostConfig.element
    : <HomePage />

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={rootPageElement} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route path="/projects/mc-server" element={<MinecraftServerPage
            data={lyrinthSMP}
            seo={{
                title: 'Immortal SMP - Máy chủ Minecraft SMP Lyrinth Network',
                description: 'Immortal SMP - Máy chủ Minecraft SMP thuộc Lyrinth Network với lối chơi sinh tồn độc đáo, PvP cân bằng, anti-cheat mạnh và cộng đồng thân thiện. Tham gia ngay!',
                author: 'Lyrinth Team',
                faviconUrl: '/favicon-smp.svg',
                canonicalUrl: 'https://smp.lyrinth.com/',
                robots: 'noindex,follow',
                openGraph: {
                    title: 'Immortal SMP - Máy chủ Minecraft SMP Lyrinth Network',
                    description: 'Immortal SMP - Máy chủ Minecraft SMP thuộc Lyrinth Network với lối chơi sinh tồn độc đáo, PvP cân bằng, anti-cheat mạnh và cộng đồng thân thiện. Tham gia ngay!',
                    type: 'website',
                    url: 'https://smp.lyrinth.com/',
                },
            }}
        />} />
        <Route
          path="/projects/mc-minigames-server"
          element={
            <MinecraftServerPage
              data={lyrinthMinigames}
              seo={{
                title: 'Lyrinth Minigames Server',
                description: 'Phiên bản URL gốc của trang minigames. Vui lòng dùng domain chuyên biệt.',
                author: 'Lyrinth Team',
                faviconUrl: '/favicon-minigames.svg',
                canonicalUrl: 'https://minigames.lyrinth.com/',
                robots: 'noindex,follow',
                openGraph: {
                  title: 'Lyrinth Minigames Server',
                  description: 'Phiên bản URL gốc của trang minigames. Vui lòng dùng domain chuyên biệt.',
                  type: 'website',
                  url: 'https://minigames.lyrinth.com/',
                },
              }}
            />
          }
        />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
        </Route>

        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

