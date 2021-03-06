import buble from 'rollup-plugin-buble';
import json from 'rollup-plugin-json';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

var external = process.env.DEPS ? [] : [ 'acorn/dist/acorn.js', 'magic-string' ];

export default {
	entry: 'src/index.js',
	moduleName: 'buble',
	plugins: [
		json(),
		commonjs(),
		buble({
			include: [
				'src/**',
				'node_modules/acorn-object-spread/**',
				'node_modules/unicode-loose-match/**',
				'node_modules/regexpu-core/**'
			],
			transforms: {
				dangerousForOf: true
			}
		}),
		nodeResolve({
			jsnext: true,
			skip: external
		})
	],
	external: external,
	globals: {
		'acorn/dist/acorn.js': 'acorn',
		'magic-string': 'MagicString'
	},
	sourceMap: !process.env.DEPS
};
