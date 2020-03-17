import webpack from 'webpack';
import { CantaraApplication } from '../../util/types';
import getGlobalConfig from '../../cantara-config';
import createNodeWebpackConfig from '../../util/config/webpackNodeConfig';

export default async function publishNodeApp(app: CantaraApplication) {
  const config = getGlobalConfig();

  console.log(app)
  console.log(config)
}
