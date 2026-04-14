import {useEffect} from 'react'

export type OpenGraphMeta = {
  title?: string
  description?: string
  type?: string
  url?: string
  image?: string
  imageAlt?: string
  siteName?: string
  locale?: string
}

export type SeoMetaConfig = {
  title?: string
  description?: string
  author?: string
  faviconUrl?: string
  canonicalUrl?: string
  robots?: string
  openGraph?: OpenGraphMeta
}

function upsertDocumentTitle(title: string): () => void {
  const previousTitle = document.title
  document.title = title

  return () => {
    document.title = previousTitle
  }
}

function upsertMetaByName(name: string, content: string): () => void {
  const selector = `meta[name="${name}"]`
  const existingElement = document.head.querySelector<HTMLMetaElement>(selector)
  const previousContent = existingElement?.getAttribute('content') ?? null

  const metaElement = existingElement ?? document.createElement('meta')
  metaElement.setAttribute('name', name)
  metaElement.setAttribute('content', content)

  if (!existingElement) {
    document.head.appendChild(metaElement)
  }

  return () => {
    if (!existingElement) {
      metaElement.remove()
      return
    }

    if (previousContent === null) {
      existingElement.removeAttribute('content')
      return
    }

    existingElement.setAttribute('content', previousContent)
  }
}

function upsertMetaByProperty(property: string, content: string): () => void {
  const selector = `meta[property="${property}"]`
  const existingElement = document.head.querySelector<HTMLMetaElement>(selector)
  const previousContent = existingElement?.getAttribute('content') ?? null

  const metaElement = existingElement ?? document.createElement('meta')
  metaElement.setAttribute('property', property)
  metaElement.setAttribute('content', content)

  if (!existingElement) {
    document.head.appendChild(metaElement)
  }

  return () => {
    if (!existingElement) {
      metaElement.remove()
      return
    }

    if (previousContent === null) {
      existingElement.removeAttribute('content')
      return
    }

    existingElement.setAttribute('content', previousContent)
  }
}

function upsertCanonicalLink(canonicalUrl: string): () => void {
  const selector = 'link[rel="canonical"]'
  const existingElement = document.head.querySelector<HTMLLinkElement>(selector)
  const previousHref = existingElement?.getAttribute('href') ?? null

  const canonicalElement = existingElement ?? document.createElement('link')
  canonicalElement.setAttribute('rel', 'canonical')
  canonicalElement.setAttribute('href', canonicalUrl)

  if (!existingElement) {
    document.head.appendChild(canonicalElement)
  }

  return () => {
    if (!existingElement) {
      canonicalElement.remove()
      return
    }

    if (previousHref === null) {
      existingElement.removeAttribute('href')
      return
    }

    existingElement.setAttribute('href', previousHref)
  }
}

function upsertRobotsMeta(robots: string): () => void {
  return upsertMetaByName('robots', robots)
}

function upsertFaviconLink(faviconUrl: string): () => void {
  const selectors = ['link[rel="icon"]', 'link[rel="shortcut icon"]']
  const cleanups = selectors.map((selector) => {
    const existingElement = document.head.querySelector<HTMLLinkElement>(selector)
    const previousHref = existingElement?.getAttribute('href') ?? null
    const relValue = selector.includes('shortcut') ? 'shortcut icon' : 'icon'

    const iconElement = existingElement ?? document.createElement('link')
    iconElement.setAttribute('rel', relValue)
    iconElement.setAttribute('href', faviconUrl)

    if (!existingElement) {
      document.head.appendChild(iconElement)
    }

    return () => {
      if (!existingElement) {
        iconElement.remove()
        return
      }

      if (previousHref === null) {
        existingElement.removeAttribute('href')
        return
      }

      existingElement.setAttribute('href', previousHref)
    }
  })

  return () => {
    cleanups.forEach((cleanup) => cleanup())
  }
}

function applyOpenGraphMeta(config: SeoMetaConfig): Array<() => void> {
  const cleanups: Array<() => void> = []
  const og = config.openGraph

  const ogTitle = og?.title ?? config.title
  const ogDescription = og?.description ?? config.description
  const ogType = og?.type
  const ogUrl = og?.url ?? config.canonicalUrl
  const ogImage = og?.image
  const ogImageAlt = og?.imageAlt
  const ogSiteName = og?.siteName
  const ogLocale = og?.locale

  if (ogTitle) {
    cleanups.push(upsertMetaByProperty('og:title', ogTitle))
  }

  if (ogDescription) {
    cleanups.push(upsertMetaByProperty('og:description', ogDescription))
  }

  if (ogType) {
    cleanups.push(upsertMetaByProperty('og:type', ogType))
  }

  if (ogUrl) {
    cleanups.push(upsertMetaByProperty('og:url', ogUrl))
  }

  if (ogImage) {
    cleanups.push(upsertMetaByProperty('og:image', ogImage))
  }

  if (ogImageAlt) {
    cleanups.push(upsertMetaByProperty('og:image:alt', ogImageAlt))
  }

  if (ogSiteName) {
    cleanups.push(upsertMetaByProperty('og:site_name', ogSiteName))
  }

  if (ogLocale) {
    cleanups.push(upsertMetaByProperty('og:locale', ogLocale))
  }

  return cleanups
}

export function useSeoMeta(config?: SeoMetaConfig): void {
  const title = config?.title
  const description = config?.description
  const author = config?.author
  const faviconUrl = config?.faviconUrl
  const canonicalUrl = config?.canonicalUrl
  const robots = config?.robots

  const ogTitle = config?.openGraph?.title
  const ogDescription = config?.openGraph?.description
  const ogType = config?.openGraph?.type
  const ogUrl = config?.openGraph?.url
  const ogImage = config?.openGraph?.image
  const ogImageAlt = config?.openGraph?.imageAlt
  const ogSiteName = config?.openGraph?.siteName
  const ogLocale = config?.openGraph?.locale

  useEffect(() => {
    if (typeof document === 'undefined' || !config) {
      return
    }

    const preparedConfig: SeoMetaConfig = {
      title,
      description,
      author,
      faviconUrl,
      canonicalUrl,
      robots,
      openGraph: {
        title: ogTitle,
        description: ogDescription,
        type: ogType,
        url: ogUrl,
        image: ogImage,
        imageAlt: ogImageAlt,
        siteName: ogSiteName,
        locale: ogLocale,
      },
    }

    const cleanups: Array<() => void> = []

    if (title) {
      cleanups.push(upsertDocumentTitle(title))
    }

    if (description) {
      cleanups.push(upsertMetaByName('description', description))
    }

    if (author) {
      cleanups.push(upsertMetaByName('author', author))
    }

    if (faviconUrl) {
      cleanups.push(upsertFaviconLink(faviconUrl))
    }

    if (canonicalUrl) {
      cleanups.push(upsertCanonicalLink(canonicalUrl))
    }

    if (robots) {
      cleanups.push(upsertRobotsMeta(robots))
    }

    cleanups.push(...applyOpenGraphMeta(preparedConfig))

    return () => {
      cleanups.forEach((cleanup) => cleanup())
    }
  }, [
    config,
    title,
    description,
    author,
    faviconUrl,
    canonicalUrl,
    robots,
    ogTitle,
    ogDescription,
    ogType,
    ogUrl,
    ogImage,
    ogImageAlt,
    ogSiteName,
    ogLocale,
  ])
}

