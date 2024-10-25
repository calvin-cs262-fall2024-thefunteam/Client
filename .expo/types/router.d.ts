/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(tabs)` | `/(tabs)/` | `/(tabs)/communities` | `/(tabs)/createEvent` | `/(tabs)/profile` | `/(tabs)/savedEvents` | `/_sitemap` | `/communities` | `/createEvent` | `/login` | `/profile` | `/savedEvents`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
