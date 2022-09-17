import strip from '@rollup/plugin-strip'
import typescript from '@rollup/plugin-typescript'
import { defineConfig } from 'rollup'
import minifyHTML from 'rollup-plugin-minify-html-literals'
import { terser } from 'rollup-plugin-terser'

export default defineConfig({
  external: [
    '@floating-ui/dom',
    '@queelag/core',
    'focus-trap',
    'isomorphic-dompurify',
    'lit',
    'lit/decorators/custom-element.js',
    'lit/decorators/property.js',
    'lit/decorators/query.js',
    'lit/decorators/query-assigned-elements.js',
    'lit/decorators/state.js',
    'lit/directives/choose.js',
    'lit/directives/if-defined.js',
    'lit/directives/map.js',
    'lit/directives/style-map.js',
    'lit/directives/unsafe-svg.js',
    'lit/directives/until.js',
    'lit/directives/when.js',
    'lit-html',
    'tabbable'
  ],
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.cjs',
      format: 'cjs'
    },
    {
      dir: 'dist',
      preserveModules: true,
      preserveModulesRoot: 'src',
      format: 'esm'
    }
  ],
  plugins: [minifyHTML(), strip({ include: ['src/**/*.ts'], functions: ['[A-Z][a-z]+Logger.(verbose|debug|info)'] }), terser(), typescript()]
})
