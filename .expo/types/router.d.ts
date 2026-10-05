/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/explore`; params?: Router.UnknownInputParams; } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `/Codelab/Codelab1`; params?: Router.UnknownInputParams; } | { pathname: `/Codelab/Codelab2`; params?: Router.UnknownInputParams; } | { pathname: `/Codelab/Codelab3`; params?: Router.UnknownInputParams; } | { pathname: `/Demo/Demo1`; params?: Router.UnknownInputParams; };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/explore`; params?: Router.UnknownOutputParams; } | { pathname: `/`; params?: Router.UnknownOutputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; } | { pathname: `/Codelab/Codelab1`; params?: Router.UnknownOutputParams; } | { pathname: `/Codelab/Codelab2`; params?: Router.UnknownOutputParams; } | { pathname: `/Codelab/Codelab3`; params?: Router.UnknownOutputParams; } | { pathname: `/Demo/Demo1`; params?: Router.UnknownOutputParams; };
      href: Router.RelativePathString | Router.ExternalPathString | `/explore${`?${string}` | `#${string}` | ''}` | `/${`?${string}` | `#${string}` | ''}` | `/_sitemap${`?${string}` | `#${string}` | ''}` | `/Codelab/Codelab1${`?${string}` | `#${string}` | ''}` | `/Codelab/Codelab2${`?${string}` | `#${string}` | ''}` | `/Codelab/Codelab3${`?${string}` | `#${string}` | ''}` | `/Demo/Demo1${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/explore`; params?: Router.UnknownInputParams; } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `/Codelab/Codelab1`; params?: Router.UnknownInputParams; } | { pathname: `/Codelab/Codelab2`; params?: Router.UnknownInputParams; } | { pathname: `/Codelab/Codelab3`; params?: Router.UnknownInputParams; } | { pathname: `/Demo/Demo1`; params?: Router.UnknownInputParams; };
    }
  }
}
