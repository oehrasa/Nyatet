# Third-Party Licenses

Nyatet. (this project) is licensed under [GPL-3.0](LICENSE). The third-party
libraries below are bundled into the Android APK and/or served with the PWA
(production), or used only for building (development — not shipped).

This file is generated from `package.json` / `package-lock.json`:

```bash
npx license-checker-rseidelsohn --production --json > licenses.json
npx license-checker-rseidelsohn --development --json >> licenses.json
```

Notable: `@capgo/capacitor-printer` is **MPL-2.0** (weak, file-level copyleft).
Everything else is permissive (MIT / Apache-2.0 / ISC / 0BSD / BlueOak-1.0.0 /
Unlicense). Full license texts ship inside each package's source (linked in
the "Repository" column); this file serves as the attribution notice those
licenses require.

In addition to the npm libraries, the APK links native Android dependencies
(AndroidX, Material libs) from Google Maven; these are licensed under
**Apache-2.0** (see https://developer.android.com/jetpack/androidx and the
individual library sources). Gradle itself (wrapper & AGP) is Apache-2.0.

## Production dependencies (shipped)

Licenses: MIT: 4, MPL-2.0: 1, 0BSD: 1  
Packages: 6

| Package | Version | License | Repository |
|---|---|---|---|
| `@capacitor/android` | 7.6.10 | MIT | https://github.com/ionic-team/capacitor |
| `@capacitor/app` | 7.1.2 | MIT | https://github.com/ionic-team/capacitor-plugins |
| `@capacitor/core` | 7.6.10 | MIT | https://github.com/ionic-team/capacitor |
| `@capacitor/status-bar` | 7.0.6 | MIT | https://github.com/ionic-team/capacitor-plugins |
| `@capgo/capacitor-printer` | 7.0.14 | MPL-2.0 | https://github.com/Cap-go/capacitor-printer |
| `tslib` | 2.9.1 | 0BSD | https://github.com/Microsoft/tslib |

## Development dependencies (build-time only — not shipped)

Licenses: MIT: 66, BlueOak-1.0.0: 12, ISC: 10, Unlicense: 1, Apache-2.0: 1  
Packages: 90

| Package | Version | License | Repository |
|---|---|---|---|
| `@capacitor/cli` | 7.6.10 | MIT | https://github.com/ionic-team/capacitor |
| `@ionic/cli-framework-output` | 2.2.8 | MIT | https://github.com/ionic-team/ionic-cli |
| `@ionic/utils-array` | 2.1.6 | MIT | https://github.com/ionic-team/ionic-cli |
| `@ionic/utils-fs` | 3.1.7 | MIT | https://github.com/ionic-team/ionic-cli |
| `@ionic/utils-object` | 2.1.6 | MIT | https://github.com/ionic-team/ionic-cli |
| `@ionic/utils-process` | 2.1.12 | MIT | https://github.com/ionic-team/ionic-cli |
| `@ionic/utils-stream` | 3.1.7 | MIT | https://github.com/ionic-team/ionic-cli |
| `@ionic/utils-subprocess` | 3.0.1 | MIT | https://github.com/ionic-team/ionic-cli |
| `@ionic/utils-terminal` | 2.3.5 | MIT | https://github.com/ionic-team/ionic-cli |
| `@isaacs/fs-minipass` | 4.0.1 | ISC | https://github.com/npm/fs-minipass |
| `@isaacs/nonrecursive-glob-match` | 1.1.0 | BlueOak-1.0.0 | - |
| `@types/fs-extra` | 8.1.5 | MIT | https://github.com/DefinitelyTyped/DefinitelyTyped |
| `@types/node` | 26.6.6 | MIT | https://github.com/DefinitelyTyped/DefinitelyTyped |
| `@types/slice-ansi` | 4.0.0 | MIT | https://github.com/DefinitelyTyped/DefinitelyTyped |
| `@xmldom/xmldom` | 0.9.12 | MIT | https://github.com/xmldom/xmldom |
| `ansi-regex` | 5.0.1 | MIT | https://github.com/chalk/ansi-regex |
| `ansi-styles` | 4.3.0 | MIT | https://github.com/chalk/ansi-styles |
| `astral-regex` | 2.0.0 | MIT | https://github.com/kevva/astral-regex |
| `at-least-node` | 1.0.0 | ISC | https://github.com/RyanZim/at-least-node |
| `balanced-match` | 4.0.4 | MIT | https://github.com/juliangruber/balanced-match |
| `base64-js` | 1.5.1 | MIT | https://github.com/beatgammit/base64-js |
| `big-integer` | 1.6.52 | Unlicense | https://github.com/peterolson/BigInteger.js |
| `bplist-parser` | 0.3.2 | MIT | https://github.com/nearinfinity/node-bplist-parser |
| `brace-expansion` | 5.0.13 | MIT | https://github.com/juliangruber/brace-expansion |
| `buffer-crc32` | 0.2.13 | MIT | https://github.com/brianloveswords/buffer-crc32 |
| `chownr` | 3.0.0 | BlueOak-1.0.0 | https://github.com/isaacs/chownr |
| `color-convert` | 2.0.1 | MIT | https://github.com/Qix-/color-convert |
| `color-name` | 1.1.4 | MIT | https://github.com/colorjs/color-name |
| `commander` | 12.1.0 | MIT | https://github.com/tj/commander.js |
| `cross-spawn` | 7.0.6 | MIT | https://github.com/moxystudio/node-cross-spawn |
| `debug` | 4.4.3 | MIT | https://github.com/debug-js/debug |
| `define-lazy-prop` | 2.0.0 | MIT | https://github.com/sindresorhus/define-lazy-prop |
| `elementtree` | 0.1.7 | Apache-2.0 | https://github.com/racker/node-elementtree |
| `emoji-regex` | 8.0.0 | MIT | https://github.com/mathiasbynens/emoji-regex |
| `env-paths` | 2.2.1 | MIT | https://github.com/sindresorhus/env-paths |
| `fd-slicer` | 1.1.0 | MIT | https://github.com/andrewrk/node-fd-slicer |
| `fs-extra` | 11.4.1 | MIT | https://github.com/jprichardson/node-fs-extra |
| `fs-extra` | 9.1.0 | MIT | https://github.com/jprichardson/node-fs-extra |
| `glob` | 14.0.6 | BlueOak-1.0.0 | https://github.com/isaacs/node-glob |
| `graceful-fs` | 4.2.12 | BlueOak-1.0.0 | https://github.com/isaacs/node-graceful-fs |
| `inherits` | 2.0.4 | ISC | https://github.com/isaacs/inherits |
| `ini` | 4.1.3 | ISC | https://github.com/npm/ini |
| `is-docker` | 2.2.1 | MIT | https://github.com/sindresorhus/is-docker |
| `is-fullwidth-code-point` | 3.0.0 | MIT | https://github.com/sindresorhus/is-fullwidth-code-point |
| `is-wsl` | 2.2.0 | MIT | https://github.com/sindresorhus/is-wsl |
| `isexe` | 2.0.0 | ISC | https://github.com/isaacs/isexe |
| `jsonfile` | 6.2.1 | MIT | https://github.com/jprichardson/node-jsonfile |
| `kleur` | 3.0.3 | MIT | https://github.com/lukeed/kleur |
| `kleur` | 4.1.5 | MIT | https://github.com/lukeed/kleur |
| `lru-cache` | 11.5.3 | BlueOak-1.0.0 | https://github.com/isaacs/node-lru-cache |
| `minimatch` | 11.0.9 | BlueOak-1.0.0 | https://github.com/isaacs/minimatch |
| `minipass` | 7.1.3 | BlueOak-1.0.0 | https://github.com/isaacs/minipass |
| `minizlib` | 3.1.0 | MIT | https://github.com/isaacs/minizlib |
| `ms` | 2.1.3 | MIT | https://github.com/vercel/ms |
| `native-run` | 2.1.0 | MIT | https://github.com/ionic-team/native-run |
| `open` | 8.4.2 | MIT | https://github.com/sindresorhus/open |
| `package-json-from-dist` | 1.0.1 | BlueOak-1.0.0 | https://github.com/isaacs/package-json-from-dist |
| `path-key` | 3.1.1 | MIT | https://github.com/sindresorhus/path-key |
| `path-scurry` | 3.0.0 | BlueOak-1.0.0 | https://github.com/isaacs/path-scurry |
| `pend` | 1.2.0 | MIT | https://github.com/andrewrk/node-pend |
| `plist` | 3.1.1 | MIT | https://github.com/TooTallNate/node-plist |
| `prompts` | 2.4.2 | MIT | https://github.com/terkelg/prompts |
| `readable-stream` | 3.6.2 | MIT | https://github.com/nodejs/readable-stream |
| `rimraf` | 6.1.4 | BlueOak-1.0.0 | https://github.com/isaacs/rimraf |
| `safe-buffer` | 5.2.1 | MIT | https://github.com/feross/safe-buffer |
| `sax` | 1.1.4 | ISC | https://github.com/isaacs/sax-js |
| `semver` | 7.8.6 | ISC | https://github.com/npm/node-semver |
| `shebang-command` | 2.0.0 | MIT | https://github.com/kevva/shebang-command |
| `shebang-regex` | 3.0.0 | MIT | https://github.com/sindresorhus/shebang-regex |
| `signal-exit` | 3.0.7 | ISC | https://github.com/tapjs/signal-exit |
| `sisteransi` | 1.0.5 | MIT | https://github.com/terkelg/sisteransi |
| `slice-ansi` | 4.0.0 | MIT | https://github.com/chalk/slice-ansi |
| `split2` | 4.2.0 | ISC | https://github.com/mcollina/split2 |
| `string-width` | 4.2.3 | MIT | https://github.com/sindresorhus/string-width |
| `string_decoder` | 1.3.0 | MIT | https://github.com/nodejs/string_decoder |
| `strip-ansi` | 6.0.1 | MIT | https://github.com/chalk/strip-ansi |
| `tar` | 7.5.23 | BlueOak-1.0.0 | https://github.com/isaacs/node-tar |
| `through2` | 4.0.2 | MIT | https://github.com/rvagg/through2 |
| `tree-kill` | 1.2.2 | MIT | https://github.com/pkrumins/node-tree-kill |
| `undici-types` | 8.9.0 | MIT | https://github.com/nodejs/undici |
| `universalify` | 2.0.1 | MIT | https://github.com/RyanZim/universalify |
| `untildify` | 4.0.0 | MIT | https://github.com/sindresorhus/untildify |
| `util-deprecate` | 1.0.2 | MIT | https://github.com/TooTallNate/util-deprecate |
| `which` | 2.0.2 | ISC | https://github.com/isaacs/node-which |
| `wrap-ansi` | 7.0.0 | MIT | https://github.com/chalk/wrap-ansi |
| `xml2js` | 0.6.2 | MIT | https://github.com/Leonidas-from-XIV/node-xml2js |
| `xmlbuilder` | 11.0.1 | MIT | https://github.com/oozcitak/xmlbuilder-js |
| `xmlbuilder` | 15.1.1 | MIT | https://github.com/oozcitak/xmlbuilder-js |
| `yallist` | 5.0.0 | BlueOak-1.0.0 | https://github.com/isaacs/yallist |
| `yauzl` | 2.10.0 | MIT | https://github.com/thejoshwolfe/yauzl |

---

*Generated 2026-11-19 from `package-lock.json`.*
