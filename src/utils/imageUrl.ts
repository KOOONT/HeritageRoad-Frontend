const PROXY_HOSTS = ['www.khs.go.kr', 'khs.go.kr', 'tong.visitkorea.or.kr'];

export const toImageProxyUrl = (uri?: string | null, width = 640) => {
  if (!uri) {
    return null;
  }

  try {
    const parsedUrl = new URL(uri);
    if (!PROXY_HOSTS.includes(parsedUrl.hostname)) {
      return uri;
    }

    const apiBaseUrl = process.env.EXPO_PUBLIC_API_BASE_URL;
    if (!apiBaseUrl) {
      return uri;
    }

    return `${apiBaseUrl}/api/image-proxy?url=${encodeURIComponent(uri)}&w=${width}`;
  } catch {
    return uri;
  }
};
