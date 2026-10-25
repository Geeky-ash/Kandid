const { withGradleProperties, withProjectBuildGradle } = require('expo/config-plugins');

function withCustomGradleProperties(config) {
  // 1. Configure android/gradle.properties with strictly throttled memory and workers
  config = withGradleProperties(config, (modConfig) => {
    const properties = modConfig.modResults;

    const setProperty = (key, value) => {
      const existing = properties.find((p) => p.type === 'property' && p.key === key);
      if (existing) {
        existing.value = value;
      } else {
        properties.push({ type: 'property', key, value });
      }
    };

    // Keep JVM memory capped so Clang/CMake has headroom on 4GB-6GB CI runners
    setProperty('org.gradle.jvmargs', '-Xmx1536m -XX:MaxMetaspaceSize=384m -XX:+UseG1GC');
    setProperty('org.gradle.parallel', 'false');
    setProperty('org.gradle.workers.max', '1');
    setProperty('org.gradle.caching', 'false');

    return modConfig;
  });

  // 2. Inject CMAKE_BUILD_PARALLEL_LEVEL=1 into root android/build.gradle
  config = withProjectBuildGradle(config, (modConfig) => {
    if (modConfig.modResults.contents.includes('CMAKE_BUILD_PARALLEL_LEVEL')) {
      return modConfig;
    }
    const injectedCode = `
// Kandid: Limit CMake and Ninja compilation to 1 thread to avoid OOM on CI workers
System.setProperty("CMAKE_BUILD_PARALLEL_LEVEL", "1")
`;
    modConfig.modResults.contents = injectedCode + modConfig.modResults.contents;
    return modConfig;
  });

  return config;
}

module.exports = withCustomGradleProperties;
