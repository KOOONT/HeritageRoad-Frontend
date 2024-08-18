import { http, HttpResponse } from 'msw'
import markers from './dummy/markers.json';

export const handlers = [
    http.get('http://localhost/search/heritage', () => {
      // Construct a JSON response with the list of all posts
      // as the response body.
      return HttpResponse.json(markers);
    }),
   
    // ...the other request handlers.
  ]