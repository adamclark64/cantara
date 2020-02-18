import { getActiveApp } from '../../cantara-config';
import { startReactAppDevelopmentServer } from './react';
import { startNodeAppDevelopmentServer } from './node';
import startServerlessEndpointDevelopmentServer from './serverless';

export default function startDevelopmentServer() {
  const activeApp = getActiveApp();
  switch (activeApp.type) {
    case 'react':
      startReactAppDevelopmentServer();
      break;
    case 'node':
      startNodeAppDevelopmentServer();
      break;
    case 'serverless':
      startServerlessEndpointDevelopmentServer();
      break;
    default:
      throw new Error(
        `"${activeApp.meta.displayName}" cannot be started in development mode. This is only possible for React Apps, NodeJS Apps and Serverless Endpoints!`,
      );
  }
}