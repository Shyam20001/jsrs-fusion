// config.js
const esbuild = require('esbuild');
const { dependencies, devDependencies, peerDependencies } = require('./package.json');
//const { rustAddons } = require('./Reinforcements/@bunvader/rustacean/rustacean.win32-x64-msvc.node');

// Combine all dependencies to exclude from the bundle
const externals = [
  ...Object.keys(dependencies || {}),
  ...Object.keys(devDependencies || {}),
  ...Object.keys(peerDependencies || {}),
  // Exclude specific native .node files
  './Reinforcements/@bunvader/rustacean/rustacean.win32-x64-msvc.node'
];

// Exclude Reinforcements directory from the other externals
const filteredExternals = externals.filter(external => 
  !external.startsWith('Reinforcements/') || external.endsWith('.node')
);

esbuild.build({
  entryPoints: ['./src/index.ts'],
  bundle: true,
  outfile: 'dist/bundle.main.js',
  external: filteredExternals,
  platform: 'node', // Use 'browser' if targeting browser
  sourcemap: false, // Generate source maps
  format: 'cjs', // CommonJS format; change to 'esm' for ES module output
}).catch(() => process.exit(1));
