import type { YggdrasilTexture } from '@xmcl/user'

export interface ElyBySkinCapeProfile {
  id: string
  name: string
  skin?: YggdrasilTexture
  cape?: YggdrasilTexture
}

/**
 * Fetch the signed Ely.by skin/cape profile for a nickname.
 * Ely.by can proxy premium textures as well as Ely.by textures.
 * This is intentionally read-only; authentication/session handling stays in
 * the existing Ely.by/authlib-injector launch pipeline.
 */
export async function fetchElyBySkinCape(
  nickname: string,
  options: { fetch?: typeof fetch; signal?: AbortSignal } = {},
): Promise<ElyBySkinCapeProfile | undefined> {
  const name = nickname.trim()
  if (!name) return undefined

  const fetcher = options.fetch ?? fetch
  const url = new URL(`https://skinsystem.ely.by/profile/${encodeURIComponent(name)}`)
  url.searchParams.set('unsigned', 'false')
  url.searchParams.set('proxy', 'true')
  url.searchParams.set('version', '2')

  const response = await fetcher(url, { signal: options.signal })
  if (response.status === 204 || response.status === 404) return undefined
  if (!response.ok) {
    throw new Error(`Ely.by skin service returned HTTP ${response.status}`)
  }

  const profile = (await response.json()) as {
    id: string
    name: string
    properties?: Array<{ name: string; value: string; signature?: string }>
  }
  const textureProperty = profile.properties?.find((p) => p.name === 'textures')
  if (!textureProperty) return { id: profile.id, name: profile.name }

  try {
    const decoded = JSON.parse(Buffer.from(textureProperty.value, 'base64').toString('utf8')) as {
      textures?: {
        SKIN?: YggdrasilTexture
        CAPE?: YggdrasilTexture
      }
    }
    return {
      id: profile.id,
      name: profile.name,
      skin: decoded.textures?.SKIN,
      cape: decoded.textures?.CAPE,
    }
  } catch {
    return { id: profile.id, name: profile.name }
  }
}

export function elyBySkinUrl(nickname: string) {
  return `https://skinsystem.ely.by/skins/${encodeURIComponent(nickname)}.png`
}

export function elyByCapeUrl(nickname: string) {
  return `https://skinsystem.ely.by/cloaks/${encodeURIComponent(nickname)}.png`
}
