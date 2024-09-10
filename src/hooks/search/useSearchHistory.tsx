import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setHistory, setSearchQuery, setResult } from '../../redux/slices/searchSlice';
import { useDispatch, useSelector } from 'react-redux';
import UUID from 'react-native-uuid';
import { selectSearchData } from '../../redux/selectors/searchSelectors';
import { getHeritages } from '../../api/api';
import { HistoryItem } from '../../types';
import { setLoading } from '../../redux/slices/searchSlice';

const useSearchHistory = () => {
  const dispatch = useDispatch();
  const { searchHistory, searchResult} = useSelector(selectSearchData);

  useEffect(() => {
    loadHistory();
  }, []);
  
  // 최근 검색어 추가
  const addSearchTerm = async (term: string) => {
    try {
      // Create a new object with the term
      const uniqueId: string = UUID.v4() as string;
      const newTermObject = {
        id: uniqueId,
        value: term,
      };
      const updatedHistory = [newTermObject, ...searchHistory];
      dispatch(setHistory(updatedHistory));
      await AsyncStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
    } catch (e) {
      console.error('Failed to save search term:', e);
    }
  };

  // 최근 검색어 불러오기
  const loadHistory = async () => {
    try {
      const savedHistory = await AsyncStorage.getItem('searchHistory');
      if (savedHistory) {
        dispatch(setHistory(JSON.parse(savedHistory)));
      }
    } catch (e) {
      console.error('Failed to load search history:', e);
    }
  };

  // 검색어 목록 초기화
  const clearHistory = async () => {
    try {
      await AsyncStorage.removeItem('searchHistory');
      dispatch(setHistory([]));
    } catch (e) {
      console.error('Failed to clear search history:', e);
    }
  };

  // 검색어 목록에서 특정 아이템 제거
  const removeItemFromHistory = async (removeId: string) => {
    try {
      // 기존 검색어 목록 불러오기
      const storedHistory = await AsyncStorage.getItem('searchHistory');
      const searchHistory = storedHistory ? JSON.parse(storedHistory) : [];

      // 아이템 제거
      const updatedHistory = searchHistory.filter((item: HistoryItem) => item.id !== removeId);

      // 업데이트된 목록 저장
      await AsyncStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
      dispatch(setHistory(updatedHistory)); // 상태 업데이트
    } catch (e) {
      console.error('Failed to remove item from search history:', e);
    }
  };

  // 검색 API 호출 메소드
  const fetchSearchResults = async (query: string) => {
    try {
      dispatch(setLoading(true));
      const data = await getHeritages();
      dispatch(setResult(data));
      addSearchTerm(query);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    addSearchTerm,
    loadHistory,
    clearHistory,
    removeItemFromHistory,
    fetchSearchResults
  };
}

export default useSearchHistory