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
//국가유산검색 상세조회
export const getDetails = async ({ccbaKdcd, ccbaAsno, ccbaCtcd}: SearchDetails) => {
    try {
      const response = await fetch(`${baseURL}/search/details`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ccbaKdcd,
          ccbaAsno,
          ccbaCtcd
        }),
      });
      const result = await response.json();
      return result.result;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
};

