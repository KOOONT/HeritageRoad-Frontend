import React from 'react';
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { useTheme } from '@rneui/themed';
import Icon from 'react-native-vector-icons/Ionicons';

const DATA_SOURCES = [
  {
    label: '국가유산청 국가유산 정보',
    url: 'https://www.khs.go.kr',
  },
  {
    label: '한국관광공사 TourAPI',
    url: 'https://api.visitkorea.or.kr',
  },
  {
    label: '공공데이터포털',
    url: 'https://www.data.go.kr',
  },
];

const SUPPORT_EMAIL = 'gkwk56@gmail.com';
const PRIVACY_POLICY_URL = 'https://api.heritageload.store/privacy.html';
const SUPPORT_URL = 'https://api.heritageload.store/support.html';

const Info = () => {
  const { theme } = useTheme();

  const openUrl = (url: string) => {
    Linking.openURL(url);
  };

  const openMail = () => {
    Linking.openURL(`mailto:${SUPPORT_EMAIL}?subject=Heritage%20Road%20Support`);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.grey5 }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.background }]}>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="뒤로가기"
          activeOpacity={0.7}
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Icon name="chevron-back" size={24} color={theme.colors.black} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.black }]}>앱 정보</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.section, { backgroundColor: theme.colors.background }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.black }]}>Heritage Road</Text>
          <Text style={[styles.body, { color: theme.colors.black }]}>
            Heritage Road는 국가유산과 주변 관광지, 음식점, 숙박 정보를 탐색할 수 있도록 공공데이터를
            정리해 보여주는 앱입니다.
          </Text>
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.background }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.black }]}>개인정보 처리방침</Text>
          <Text style={[styles.body, { color: theme.colors.black }]}>
            이 앱은 회원가입을 받지 않으며 이름, 전화번호, 이메일, 현재 위치와 같은 개인정보를 서버에
            저장하지 않습니다. 검색 기록은 사용자의 기기 내부 저장소에만 저장되며, 앱의 검색 기록 화면에서
            삭제할 수 있습니다.
          </Text>
          <Text style={[styles.body, { color: theme.colors.black }]}>
            지도 화면은 선택한 국가유산 또는 추천 장소의 좌표를 표시하기 위해 플랫폼의 기본 지도 기능을
            사용합니다. iOS에서는 Apple Maps가 사용되며, 앱은 사용자의 현재 위치 권한을 요청하지
            않습니다.
          </Text>
          <TouchableOpacity
            accessibilityRole="link"
            activeOpacity={0.7}
            onPress={() => openUrl(PRIVACY_POLICY_URL)}
            style={styles.linkRow}
          >
            <Text style={[styles.linkText, { color: theme.colors.primary }]}>개인정보 처리방침 전문</Text>
            <Icon name="open-outline" size={16} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.background }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.black }]}>데이터 출처</Text>
          {DATA_SOURCES.map((source) => (
            <TouchableOpacity
              key={source.url}
              accessibilityRole="link"
              activeOpacity={0.7}
              onPress={() => openUrl(source.url)}
              style={styles.linkRow}
            >
              <Text style={[styles.linkText, { color: theme.colors.primary }]}>{source.label}</Text>
              <Icon name="open-outline" size={16} color={theme.colors.primary} />
            </TouchableOpacity>
          ))}
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.background }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.black }]}>문의 및 지원</Text>
          <TouchableOpacity
            accessibilityRole="link"
            activeOpacity={0.7}
            onPress={() => openUrl(SUPPORT_URL)}
            style={styles.linkRow}
          >
            <Text style={[styles.linkText, { color: theme.colors.primary }]}>지원 페이지</Text>
            <Icon name="open-outline" size={16} color={theme.colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity
            accessibilityRole="link"
            activeOpacity={0.7}
            onPress={openMail}
            style={styles.linkRow}
          >
            <Text style={[styles.linkText, { color: theme.colors.primary }]}>{SUPPORT_EMAIL}</Text>
            <Icon name="mail-outline" size={16} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  backButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 4,
  },
  content: {
    paddingVertical: 10,
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
  },
  body: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 8,
  },
  linkRow: {
    minHeight: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  linkText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    marginRight: 10,
  },
});

export default Info;
