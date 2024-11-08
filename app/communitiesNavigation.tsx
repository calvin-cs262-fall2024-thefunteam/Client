// src/types/navigation.ts

export type RootStackParamList = {
  Communities: undefined; // No params for Communities screen
  CommunityDetails: { communityId: string }; // Expect communityId as a string
};
