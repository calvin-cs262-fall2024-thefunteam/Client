/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(tabs)` | `/(tabs)/communities` | `/(tabs)/createEvent` | `/(tabs)/home` | `/(tabs)/profile` | `/(tabs)/savedEvents` | `/_sitemap` | `/communities` | `/communitiesNavigation` | `/communityDetails` | `/createEvent` | `/eventDetails` | `/home` | `/login` | `/profile` | `/savedEvents` | `/signup`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
