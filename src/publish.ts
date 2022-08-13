import type { Context } from 'semantic-release';
import deepmerge from 'deepmerge';
import type { FullPluginConfig, PluginConfig } from './types';
import { versionAndroid, versionIos } from './version';

const applyPluginConfigDefaults = (pluginConfig: PluginConfig): FullPluginConfig => deepmerge({
  androidPath: 'android/app/build.gradle',
  iosPath: 'ios',
  iosPackageName: null,
  skipBuildNumber: false,
  skipAndroid: false,
  skipIos: false,
  noPrerelease: false,
  versionStrategy: {
    android: {
      buildNumber: 'increment',
    },
    ios: {
      buildNumber: 'strict',
    },
  },
}, pluginConfig);

export const publish = async (
  pluginConfig: PluginConfig,
  context: Context,
) => {
  const pConfig = applyPluginConfigDefaults(pluginConfig);

  if (!pConfig.skipAndroid) {
    versionAndroid(pConfig, context);
  }

  if (!pConfig.skipIos) {
    versionIos(pConfig, context);
  }
};
