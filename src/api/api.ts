import { SearchDetails } from "../types";

const baseURL = 'http://localhost';

//국가유산검색 목록조회
export const getHeritages = async () => {
    try {
      const response = await fetch(`${baseURL}/search/heritages`);
      const data = await response.json();
      const markers = data[0].result.items;
      return markers;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
};

