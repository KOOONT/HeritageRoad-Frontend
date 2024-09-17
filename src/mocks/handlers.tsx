import { http, HttpResponse, delay } from 'msw'
import markers from './dummy/markers.json';

const baseURL = 'http://localhost';

export const handlers = [
    //add time delay passthrough handler
    http.all('*', async () => {
      await delay(1000)
    }),
    http.get(`${baseURL}/search/heritages`, () => {
      return HttpResponse.json(markers);
    }),
    // ...the other request handlers.
  ]