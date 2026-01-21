// Client-safe component map for App Router

import { BYOCClientWrapper, NextjsContentSdkComponent, FEaaSClientWrapper } from '@sitecore-content-sdk/nextjs';
import { Form } from '@sitecore-content-sdk/nextjs';

import * as NewsAndStories from 'src/components/news-and-stories/NewsAndStories';
import * as Navigation from 'src/components/navigation/Navigation';
import * as Footer from 'src/components/footer/Footer';

export const componentMap = new Map<string, NextjsContentSdkComponent>([
  ['BYOCWrapper', BYOCClientWrapper],
  ['FEaaSWrapper', FEaaSClientWrapper],
  ['Form', Form],
  ['NewsAndStories', { ...NewsAndStories }],
  ['Navigation', { ...Navigation }],
  ['Footer', { ...Footer }],
]);

export default componentMap;
