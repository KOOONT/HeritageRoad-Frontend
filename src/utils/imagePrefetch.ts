import { Image } from 'react-native';
import { toImageProxyUrl } from './imageUrl';

const prefetchedUrls = new Set<string>();
let prefetchQueue = Promise.resolve();

export const prefetchImageUrls = (urls: Array<string | null | undefined>, limit = 8) => {
  urls
    .map((url) => toImageProxyUrl(url, 640))
    .filter((url): url is string => Boolean(url))
    .slice(0, Math.min(limit, 2))
    .forEach((url) => {
      if (prefetchedUrls.has(url)) {
        return;
      }

      prefetchedUrls.add(url);
      prefetchQueue = prefetchQueue
        .catch(() => undefined)
        .then(() => Image.prefetch(url))
        .then(() => undefined)
        .catch(() => {
          prefetchedUrls.delete(url);
        });
    });
};
