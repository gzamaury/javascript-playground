This template ships with the main React + Storybook + ESlint + Prettier configuration files you'll need to get up and running fast.

## 🚅 Quick start

1.  **Create the application.**

    Use [degit](https://github.com/Rich-Harris/degit) to get this template.

    ```shell
    # Clone the template
    npx degit gzamaury/react-templates my-new-project
    ```

1.  **Install the dependencies.**

    Navigate into your new site’s directory and install the necessary dependencies.

    ```shell
    # Navigate to the directory
    cd my-new-project/

    # Install the dependencies
    npm install
    ```

1.  **Open the source code and start editing!**

    Open the `my-new-project` directory in your code editor of choice and building your first component!

1.  **Browse your stories!**

    Run `npm run storybook` to see your component's stories at `http://localhost:6006`

#

#

# eslint-plugin-prettier [![Build Status](https://github.com/prettier/eslint-plugin-prettier/workflows/CI/badge.svg?branch=master)](https://github.com/prettier/eslint-plugin-prettier/actions?query=workflow%3ACI+branch%3Amaster)

Runs [Prettier](https://github.com/prettier/prettier) as an [ESLint](https://eslint.org) rule and reports differences as individual ESLint issues.

If your desired formatting does not match Prettier’s output, you should use a different tool such as [prettier-eslint](https://github.com/prettier/prettier-eslint) instead.

Please read [Integrating with linters](https://prettier.io/docs/en/integrating-with-linters.html) before installing.

## Sample

```js
error: Insert `,` (prettier/prettier) at pkg/commons-atom/ActiveEditorRegistry.js:22:25:
  20 | import {
  21 |   observeActiveEditorsDebounced,
> 22 |   editorChangesDebounced
     |                         ^
  23 | } from './debounced';;
  24 |
  25 | import {observableFromSubscribeFunction} from '../commons-node/event';


error: Delete `;` (prettier/prettier) at pkg/commons-atom/ActiveEditorRegistry.js:23:21:
  21 |   observeActiveEditorsDebounced,
  22 |   editorChangesDebounced
> 23 | } from './debounced';;
     |                     ^
  24 |
  25 | import {observableFromSubscribeFunction} from '../commons-node/event';
  26 | import {cacheWhileSubscribed} from '../commons-node/observable';


2 errors found.
```

> `./node_modules/.bin/eslint --format codeframe pkg/commons-atom/ActiveEditorRegistry.js` (code from [nuclide](https://github.com/facebook/nuclide)).

## Installation

```sh
npm install --save-dev eslint-plugin-prettier
npm install --save-dev --save-exact prettier
```

**_`eslint-plugin-prettier` does not install Prettier or ESLint for you._** _You must install these yourself._

Then, in your `.eslintrc.json`:

```json
{
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error"
  }
}
```

## Recommended Configuration

This plugin works best if you disable all other ESLint rules relating to code formatting, and only enable rules that detect potential bugs. (If another active ESLint rule disagrees with `prettier` about how code should be formatted, it will be impossible to avoid lint errors.) You can use [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier) to disable all formatting-related ESLint rules.

This plugin ships with a `plugin:prettier/recommended` config that sets up both the plugin and `eslint-config-prettier` in one go.

1. In addition to the above installation instructions, install `eslint-config-prettier`:

   ```sh
   npm install --save-dev eslint-config-prettier
   ```

2. Then you need to add `plugin:prettier/recommended` as the _last_ extension in your `.eslintrc.json`:

   ```json
   {
     "extends": ["plugin:prettier/recommended"]
   }
   ```

   You can then set Prettier's own options inside a `.prettierrc` file.

Exactly what does `plugin:prettier/recommended` do? Well, this is what it expands to:

```json
{
  "extends": ["prettier"],
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error",
    "arrow-body-style": "off",
    "prefer-arrow-callback": "off"
  }
}
```

- `"extends": ["prettier"]` enables the config from `eslint-config-prettier`, which turns off some ESLint rules that conflict with Prettier.
- `"plugins": ["prettier"]` registers this plugin.
- `"prettier/prettier": "error"` turns on the rule provided by this plugin, which runs Prettier from within ESLint.
- `"arrow-body-style": "off"` and `"prefer-arrow-callback": "off"` turns off two ESLint core rules that unfortunately are problematic with this plugin – see the next section.

## `arrow-body-style` and `prefer-arrow-callback` issue

If you use [arrow-body-style](https://eslint.org/docs/rules/arrow-body-style) or [prefer-arrow-callback](https://eslint.org/docs/rules/prefer-arrow-callback) together with the `prettier/prettier` rule from this plugin, you can in some cases end up with invalid code due to a bug in ESLint’s autofix – see [issue #65](https://github.com/prettier/eslint-plugin-prettier/issues/65).

For this reason, it’s recommended to turn off these rules. The `plugin:prettier/recommended` config does that for you.

You _can_ still use these rules together with this plugin if you want, because the bug does not occur _all the time._ But if you do, you need to keep in mind that you might end up with invalid code, where you manually have to insert a missing closing parenthesis to get going again.

If you’re fixing large of amounts of previously unformatted code, consider temporarily disabling the `prettier/prettier` rule and running `eslint --fix` and `prettier --write` separately.

## Options

> Note: While it is possible to pass options to Prettier via your ESLint configuration file, it is not recommended because editor extensions such as `prettier-atom` and `prettier-vscode` **will** read [`.prettierrc`](https://prettier.io/docs/en/configuration.html), but **won't** read settings from ESLint, which can lead to an inconsistent experience.

- The first option:

  - An object representing [options](https://prettier.io/docs/en/options.html) that will be passed into prettier. Example:

    ```json
    "prettier/prettier": ["error", {"singleQuote": true, "parser": "flow"}]
    ```

    NB: This option will merge and override any config set with `.prettierrc` files

- The second option:

  - An object with the following options

    - `usePrettierrc`: Enables loading of the Prettier configuration file, (default: `true`). May be useful if you are using multiple tools that conflict with each other, or do not wish to mix your ESLint settings with your Prettier configuration.

      ```json
      "prettier/prettier": ["error", {}, {
        "usePrettierrc": false
      }]
      ```

    - `fileInfoOptions`: Options that are passed to [prettier.getFileInfo](https://prettier.io/docs/en/api.html#prettiergetfileinfofilepath--options) to decide whether a file needs to be formatted. Can be used for example to opt-out from ignoring files located in `node_modules` directories.

      ```json
      "prettier/prettier": ["error", {}, {
        "fileInfoOptions": {
          "withNodeModules": true
        }
      }]
      ```

- The rule is autofixable -- if you run `eslint` with the `--fix` flag, your code will be formatted according to `prettier` style.

---

## Contributing

See [CONTRIBUTING.md](https://github.com/prettier/eslint-plugin-prettier/blob/master/CONTRIBUTING.md)

#

#

# `eslint-plugin-react`

[![Maintenance Status][status-image]][status-url] [![NPM version][npm-image]][npm-url] [![Dependency Status][deps-image]][deps-url] [![Code Climate][climate-image]][climate-url] [![Tidelift][tidelift-image]][tidelift-url]

React specific linting rules for `eslint`

# Installation

```sh
$ npm install eslint eslint-plugin-react --save-dev
```

It is also possible to install ESLint globally rather than locally (using npm install eslint --global). However, this is not recommended, and any plugins or shareable configs that you use must be installed locally in either case.

# Configuration

Use [our preset](#recommended) to get reasonable defaults:

```json
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ]
```

If you are using the [new JSX transform from React 17](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#removing-unused-react-imports), extend [`react/jsx-runtime`](https://github.com/jsx-eslint/eslint-plugin-react/blob/c8917b0885094b5e4cc2a6f613f7fb6f16fe932e/index.js#L163-L176) in your eslint config (add `"plugin:react/jsx-runtime"` to `"extends"`) to disable the relevant rules.

You should also specify settings that will be shared across all the plugin rules. ([More about eslint shared settings](https://eslint.org/docs/user-guide/configuring/configuration-files#adding-shared-settings))

```json5
{
  settings: {
    react: {
      createClass: "createReactClass", // Regex for Component Factory to use,
      // default to "createReactClass"
      pragma: "React", // Pragma to use, default to "React"
      fragment: "Fragment", // Fragment to use (may be a property of <pragma>), default to "Fragment"
      version: "detect", // React version. "detect" automatically picks the version you have installed.
      // You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
      // It will default to "latest" and warn if missing, and to "detect" in the future
      flowVersion: "0.53", // Flow version
    },
    propWrapperFunctions: [
      // The names of any function used to wrap propTypes, e.g. `forbidExtraProps`. If this isn't set, any propTypes wrapped in a function will be skipped.
      "forbidExtraProps",
      { property: "freeze", object: "Object" },
      { property: "myFavoriteWrapper" },
      // for rules that check exact prop wrappers
      { property: "forbidExtraProps", exact: true },
    ],
    componentWrapperFunctions: [
      // The name of any function used to wrap components, e.g. Mobx `observer` function. If this isn't set, components wrapped by these functions will be skipped.
      "observer", // `property`
      { property: "styled" }, // `object` is optional
      { property: "observer", object: "Mobx" },
      { property: "observer", object: "<pragma>" }, // sets `object` to whatever value `settings.react.pragma` is set to
    ],
    formComponents: [
      // Components used as alternatives to <form> for forms, eg. <Form endpoint={ url } />
      "CustomForm",
      { name: "Form", formAttribute: "endpoint" },
    ],
    linkComponents: [
      // Components used as alternatives to <a> for linking, eg. <Link to={ url } />
      "Hyperlink",
      { name: "Link", linkAttribute: "to" },
    ],
  },
}
```

If you do not use a preset you will need to specify individual rules and add extra configuration.

Add "react" to the plugins section.

```json
{
  "plugins": ["react"]
}
```

Enable JSX support.

With `eslint` 2+

```json
{
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    }
  }
}
```

Enable the rules that you would like to use.

```json
  "rules": {
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
  }
```

# List of supported rules

✔: Enabled in the [`recommended`](#recommended) configuration.\
🔧: Fixable with [`eslint --fix`](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems).

<!-- AUTO-GENERATED-CONTENT:START (BASIC_RULES) -->

|  ✔  | 🔧  | Rule                                                                                             | Description                                                                       |
| :-: | :-: | :----------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------- |
|     |     | [react/boolean-prop-naming](docs/rules/boolean-prop-naming.md)                                   | Enforces consistent naming for boolean props                                      |
|     |     | [react/button-has-type](docs/rules/button-has-type.md)                                           | Forbid "button" element without an explicit "type" attribute                      |
|     |     | [react/default-props-match-prop-types](docs/rules/default-props-match-prop-types.md)             | Enforce all defaultProps are defined and not "required" in propTypes.             |
|     | 🔧  | [react/destructuring-assignment](docs/rules/destructuring-assignment.md)                         | Enforce consistent usage of destructuring assignment of props, state, and context |
|  ✔  |     | [react/display-name](docs/rules/display-name.md)                                                 | Prevent missing displayName in a React component definition                       |
|     |     | [react/forbid-component-props](docs/rules/forbid-component-props.md)                             | Forbid certain props on components                                                |
|     |     | [react/forbid-dom-props](docs/rules/forbid-dom-props.md)                                         | Forbid certain props on DOM Nodes                                                 |
|     |     | [react/forbid-elements](docs/rules/forbid-elements.md)                                           | Forbid certain elements                                                           |
|     |     | [react/forbid-foreign-prop-types](docs/rules/forbid-foreign-prop-types.md)                       | Forbid using another component's propTypes                                        |
|     |     | [react/forbid-prop-types](docs/rules/forbid-prop-types.md)                                       | Forbid certain propTypes                                                          |
|     | 🔧  | [react/function-component-definition](docs/rules/function-component-definition.md)               | Standardize the way function component get defined                                |
|     |     | [react/hook-use-state](docs/rules/hook-use-state.md)                                             | Ensure symmetric naming of useState hook value and setter variables               |
|     |     | [react/iframe-missing-sandbox](docs/rules/iframe-missing-sandbox.md)                             | Enforce sandbox attribute on iframe elements                                      |
|     |     | [react/no-access-state-in-setstate](docs/rules/no-access-state-in-setstate.md)                   | Reports when this.state is accessed within setState                               |
|     |     | [react/no-adjacent-inline-elements](docs/rules/no-adjacent-inline-elements.md)                   | Prevent adjacent inline elements not separated by whitespace.                     |
|     |     | [react/no-array-index-key](docs/rules/no-array-index-key.md)                                     | Prevent usage of Array index in keys                                              |
|     | 🔧  | [react/no-arrow-function-lifecycle](docs/rules/no-arrow-function-lifecycle.md)                   | Lifecycle methods should be methods on the prototype, not class fields            |
|  ✔  |     | [react/no-children-prop](docs/rules/no-children-prop.md)                                         | Prevent passing of children as props.                                             |
|     |     | [react/no-danger](docs/rules/no-danger.md)                                                       | Prevent usage of dangerous JSX props                                              |
|  ✔  |     | [react/no-danger-with-children](docs/rules/no-danger-with-children.md)                           | Report when a DOM element is using both children and dangerouslySetInnerHTML      |
|  ✔  |     | [react/no-deprecated](docs/rules/no-deprecated.md)                                               | Prevent usage of deprecated methods                                               |
|     |     | [react/no-did-mount-set-state](docs/rules/no-did-mount-set-state.md)                             | Prevent usage of setState in componentDidMount                                    |
|     |     | [react/no-did-update-set-state](docs/rules/no-did-update-set-state.md)                           | Prevent usage of setState in componentDidUpdate                                   |
|  ✔  |     | [react/no-direct-mutation-state](docs/rules/no-direct-mutation-state.md)                         | Prevent direct mutation of this.state                                             |
|  ✔  |     | [react/no-find-dom-node](docs/rules/no-find-dom-node.md)                                         | Prevent usage of findDOMNode                                                      |
|     | 🔧  | [react/no-invalid-html-attribute](docs/rules/no-invalid-html-attribute.md)                       | Forbid attribute with an invalid values`                                          |
|  ✔  |     | [react/no-is-mounted](docs/rules/no-is-mounted.md)                                               | Prevent usage of isMounted                                                        |
|     |     | [react/no-multi-comp](docs/rules/no-multi-comp.md)                                               | Prevent multiple component definition per file                                    |
|     |     | [react/no-namespace](docs/rules/no-namespace.md)                                                 | Enforce that namespaces are not used in React elements                            |
|     |     | [react/no-redundant-should-component-update](docs/rules/no-redundant-should-component-update.md) | Flag shouldComponentUpdate when extending PureComponent                           |
|  ✔  |     | [react/no-render-return-value](docs/rules/no-render-return-value.md)                             | Prevent usage of the return value of React.render                                 |
|     |     | [react/no-set-state](docs/rules/no-set-state.md)                                                 | Prevent usage of setState                                                         |
|  ✔  |     | [react/no-string-refs](docs/rules/no-string-refs.md)                                             | Prevent string definitions for references and prevent referencing this.refs       |
|     |     | [react/no-this-in-sfc](docs/rules/no-this-in-sfc.md)                                             | Report "this" being used in stateless components                                  |
|     |     | [react/no-typos](docs/rules/no-typos.md)                                                         | Prevent common typos                                                              |
|  ✔  |     | [react/no-unescaped-entities](docs/rules/no-unescaped-entities.md)                               | Detect unescaped HTML entities, which might represent malformed tags              |
|  ✔  | 🔧  | [react/no-unknown-property](docs/rules/no-unknown-property.md)                                   | Prevent usage of unknown DOM property                                             |
|     |     | [react/no-unsafe](docs/rules/no-unsafe.md)                                                       | Prevent usage of unsafe lifecycle methods                                         |
|     |     | [react/no-unstable-nested-components](docs/rules/no-unstable-nested-components.md)               | Prevent creating unstable components inside components                            |
|     |     | [react/no-unused-class-component-methods](docs/rules/no-unused-class-component-methods.md)       | Prevent declaring unused methods of component class                               |
|     |     | [react/no-unused-prop-types](docs/rules/no-unused-prop-types.md)                                 | Prevent definitions of unused prop types                                          |
|     |     | [react/no-unused-state](docs/rules/no-unused-state.md)                                           | Prevent definition of unused state fields                                         |
|     |     | [react/no-will-update-set-state](docs/rules/no-will-update-set-state.md)                         | Prevent usage of setState in componentWillUpdate                                  |
|     |     | [react/prefer-es6-class](docs/rules/prefer-es6-class.md)                                         | Enforce ES5 or ES6 class for React Components                                     |
|     |     | [react/prefer-exact-props](docs/rules/prefer-exact-props.md)                                     | Prefer exact proptype definitions                                                 |
|     | 🔧  | [react/prefer-read-only-props](docs/rules/prefer-read-only-props.md)                             | Require read-only props.                                                          |
|     |     | [react/prefer-stateless-function](docs/rules/prefer-stateless-function.md)                       | Enforce stateless components to be written as a pure function                     |
|  ✔  |     | [react/prop-types](docs/rules/prop-types.md)                                                     | Prevent missing props validation in a React component definition                  |
|  ✔  |     | [react/react-in-jsx-scope](docs/rules/react-in-jsx-scope.md)                                     | Prevent missing React when using JSX                                              |
|     |     | [react/require-default-props](docs/rules/require-default-props.md)                               | Enforce a defaultProps definition for every prop that is not a required prop.     |
|     |     | [react/require-optimization](docs/rules/require-optimization.md)                                 | Enforce React components to have a shouldComponentUpdate method                   |
|  ✔  |     | [react/require-render-return](docs/rules/require-render-return.md)                               | Enforce ES5 or ES6 class for returning value in render function                   |
|     | 🔧  | [react/self-closing-comp](docs/rules/self-closing-comp.md)                                       | Prevent extra closing tags for components without children                        |
|     |     | [react/sort-comp](docs/rules/sort-comp.md)                                                       | Enforce component methods order                                                   |
|     |     | [react/sort-prop-types](docs/rules/sort-prop-types.md)                                           | Enforce propTypes declarations alphabetical sorting                               |
|     |     | [react/state-in-constructor](docs/rules/state-in-constructor.md)                                 | State initialization in an ES6 class component should be in a constructor         |
|     |     | [react/static-property-placement](docs/rules/static-property-placement.md)                       | Defines where React component static properties should be positioned.             |
|     |     | [react/style-prop-object](docs/rules/style-prop-object.md)                                       | Enforce style prop value is an object                                             |
|     |     | [react/void-dom-elements-no-children](docs/rules/void-dom-elements-no-children.md)               | Prevent passing of children to void DOM elements (e.g. `<br />`).                 |

<!-- AUTO-GENERATED-CONTENT:END -->

## JSX-specific rules

<!-- AUTO-GENERATED-CONTENT:START (JSX_RULES) -->

|  ✔  | 🔧  | Rule                                                                                       | Description                                                                                                                                 |
| :-: | :-: | :----------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------ |
|     | 🔧  | [react/jsx-boolean-value](docs/rules/jsx-boolean-value.md)                                 | Enforce boolean attributes notation in JSX                                                                                                  |
|     |     | [react/jsx-child-element-spacing](docs/rules/jsx-child-element-spacing.md)                 | Ensures inline tags are not rendered without spaces between them                                                                            |
|     | 🔧  | [react/jsx-closing-bracket-location](docs/rules/jsx-closing-bracket-location.md)           | Validate closing bracket location in JSX                                                                                                    |
|     | 🔧  | [react/jsx-closing-tag-location](docs/rules/jsx-closing-tag-location.md)                   | Validate closing tag location for multiline JSX                                                                                             |
|     | 🔧  | [react/jsx-curly-brace-presence](docs/rules/jsx-curly-brace-presence.md)                   | Disallow unnecessary JSX expressions when literals alone are sufficient or enfore JSX expressions on literals in JSX children or attributes |
|     | 🔧  | [react/jsx-curly-newline](docs/rules/jsx-curly-newline.md)                                 | Enforce consistent line breaks inside jsx curly                                                                                             |
|     | 🔧  | [react/jsx-curly-spacing](docs/rules/jsx-curly-spacing.md)                                 | Enforce or disallow spaces inside of curly braces in JSX attributes                                                                         |
|     | 🔧  | [react/jsx-equals-spacing](docs/rules/jsx-equals-spacing.md)                               | Disallow or enforce spaces around equal signs in JSX attributes                                                                             |
|     |     | [react/jsx-filename-extension](docs/rules/jsx-filename-extension.md)                       | Restrict file extensions that may contain JSX                                                                                               |
|     | 🔧  | [react/jsx-first-prop-new-line](docs/rules/jsx-first-prop-new-line.md)                     | Ensure proper position of the first property in JSX                                                                                         |
|     | 🔧  | [react/jsx-fragments](docs/rules/jsx-fragments.md)                                         | Enforce shorthand or standard form for React fragments                                                                                      |
|     |     | [react/jsx-handler-names](docs/rules/jsx-handler-names.md)                                 | Enforce event handler naming conventions in JSX                                                                                             |
|     | 🔧  | [react/jsx-indent](docs/rules/jsx-indent.md)                                               | Validate JSX indentation                                                                                                                    |
|     | 🔧  | [react/jsx-indent-props](docs/rules/jsx-indent-props.md)                                   | Validate props indentation in JSX                                                                                                           |
|  ✔  |     | [react/jsx-key](docs/rules/jsx-key.md)                                                     | Report missing `key` props in iterators/collection literals                                                                                 |
|     |     | [react/jsx-max-depth](docs/rules/jsx-max-depth.md)                                         | Validate JSX maximum depth                                                                                                                  |
|     | 🔧  | [react/jsx-max-props-per-line](docs/rules/jsx-max-props-per-line.md)                       | Limit maximum of props on a single line in JSX                                                                                              |
|     | 🔧  | [react/jsx-newline](docs/rules/jsx-newline.md)                                             | Require or prevent a new line after jsx elements and expressions.                                                                           |
|     |     | [react/jsx-no-bind](docs/rules/jsx-no-bind.md)                                             | Prevents usage of Function.prototype.bind and arrow functions in React component props                                                      |
|  ✔  |     | [react/jsx-no-comment-textnodes](docs/rules/jsx-no-comment-textnodes.md)                   | Comments inside children section of tag should be placed inside braces                                                                      |
|     |     | [react/jsx-no-constructed-context-values](docs/rules/jsx-no-constructed-context-values.md) | Prevents JSX context provider values from taking values that will cause needless rerenders.                                                 |
|  ✔  |     | [react/jsx-no-duplicate-props](docs/rules/jsx-no-duplicate-props.md)                       | Enforce no duplicate props                                                                                                                  |
|     | 🔧  | [react/jsx-no-leaked-render](docs/rules/jsx-no-leaked-render.md)                           | Prevent problematic leaked values from being rendered                                                                                       |
|     |     | [react/jsx-no-literals](docs/rules/jsx-no-literals.md)                                     | Prevent using string literals in React component definition                                                                                 |
|     |     | [react/jsx-no-script-url](docs/rules/jsx-no-script-url.md)                                 | Forbid `javascript:` URLs                                                                                                                   |
|  ✔  | 🔧  | [react/jsx-no-target-blank](docs/rules/jsx-no-target-blank.md)                             | Forbid `target="_blank"` attribute without `rel="noreferrer"`                                                                               |
|  ✔  |     | [react/jsx-no-undef](docs/rules/jsx-no-undef.md)                                           | Disallow undeclared variables in JSX                                                                                                        |
|     | 🔧  | [react/jsx-no-useless-fragment](docs/rules/jsx-no-useless-fragment.md)                     | Disallow unnecessary fragments                                                                                                              |
|     | 🔧  | [react/jsx-one-expression-per-line](docs/rules/jsx-one-expression-per-line.md)             | Limit to one expression per line in JSX                                                                                                     |
|     |     | [react/jsx-pascal-case](docs/rules/jsx-pascal-case.md)                                     | Enforce PascalCase for user-defined JSX components                                                                                          |
|     | 🔧  | [react/jsx-props-no-multi-spaces](docs/rules/jsx-props-no-multi-spaces.md)                 | Disallow multiple spaces between inline JSX props                                                                                           |
|     |     | [react/jsx-props-no-spreading](docs/rules/jsx-props-no-spreading.md)                       | Prevent JSX prop spreading                                                                                                                  |
|     |     | [react/jsx-sort-default-props](docs/rules/jsx-sort-default-props.md)                       | Enforce default props alphabetical sorting                                                                                                  |
|     | 🔧  | [react/jsx-sort-props](docs/rules/jsx-sort-props.md)                                       | Enforce props alphabetical sorting                                                                                                          |
|     | 🔧  | [react/jsx-space-before-closing](docs/rules/jsx-space-before-closing.md)                   | Validate spacing before closing bracket in JSX                                                                                              |
|     | 🔧  | [react/jsx-tag-spacing](docs/rules/jsx-tag-spacing.md)                                     | Validate whitespace in and around the JSX opening and closing brackets                                                                      |
|  ✔  |     | [react/jsx-uses-react](docs/rules/jsx-uses-react.md)                                       | Prevent React to be marked as unused                                                                                                        |
|  ✔  |     | [react/jsx-uses-vars](docs/rules/jsx-uses-vars.md)                                         | Prevent variables used in JSX to be marked as unused                                                                                        |
|     | 🔧  | [react/jsx-wrap-multilines](docs/rules/jsx-wrap-multilines.md)                             | Prevent missing parentheses around multilines JSX                                                                                           |

<!-- AUTO-GENERATED-CONTENT:END -->

## Other useful plugins

- Rules of Hooks: [eslint-plugin-react-hooks](https://github.com/facebook/react/tree/master/packages/eslint-plugin-react-hooks)
- JSX accessibility: [eslint-plugin-jsx-a11y](https://github.com/evcohen/eslint-plugin-jsx-a11y)
- React Native: [eslint-plugin-react-native](https://github.com/Intellicode/eslint-plugin-react-native)

# Shareable configurations

## Recommended

This plugin exports a `recommended` configuration that enforces React good practices.

To enable this configuration use the `extends` property in your `.eslintrc` config file:

```json
{
  "extends": ["eslint:recommended", "plugin:react/recommended"]
}
```

See [`eslint` documentation](https://eslint.org/docs/user-guide/configuring/configuration-files#extending-configuration-files) for more information about extending configuration files.

## All

This plugin also exports an `all` configuration that includes every available rule.
This pairs well with the `eslint:all` rule.

```json
{
  "plugins": ["react"],
  "extends": ["eslint:all", "plugin:react/all"]
}
```

**Note**: These configurations will import `eslint-plugin-react` and enable JSX in [parser options](https://eslint.org/docs/user-guide/configuring/language-options#specifying-parser-options).

# License

`eslint-plugin-react` is licensed under the [MIT License](https://opensource.org/licenses/mit-license.php).

[npm-url]: https://npmjs.org/package/eslint-plugin-react
[npm-image]: https://img.shields.io/npm/v/eslint-plugin-react.svg
[deps-url]: https://david-dm.org/jsx-eslint/eslint-plugin-react
[deps-image]: https://img.shields.io/david/dev/jsx-eslint/eslint-plugin-react.svg
[climate-url]: https://codeclimate.com/github/jsx-eslint/eslint-plugin-react
[climate-image]: https://img.shields.io/codeclimate/maintainability/jsx-eslint/eslint-plugin-react.svg
[status-url]: https://github.com/jsx-eslint/eslint-plugin-react/pulse
[status-image]: https://img.shields.io/github/last-commit/jsx-eslint/eslint-plugin-react.svg
[tidelift-url]: https://tidelift.com/subscription/pkg/npm-eslint-plugin-react?utm_source=npm-eslint-plugin-react&utm_medium=referral&utm_campaign=readme
[tidelift-image]: https://tidelift.com/badges/github/jsx-eslint/eslint-plugin-react?style=flat

#

#

<p align="center">
  <a href="https://storybook.js.org/">
    <img src="https://user-images.githubusercontent.com/321738/63501763-88dbf600-c4cc-11e9-96cd-94adadc2fd72.png" alt="Storybook" width="400" />
  </a>
</p>

<p align="center">Build bulletproof UI components faster</p>

<br/>

<p align="center">
  <a href="https://discord.gg/storybook">
    <img src="https://img.shields.io/badge/discord-join-7289DA.svg?logo=discord&longCache=true&style=flat" />
  </a>
  <a href="https://storybook.js.org/community/">
    <img src="https://img.shields.io/badge/community-join-4BC424.svg" alt="Storybook Community" />
  </a>
  <a href="#backers">
    <img src="https://opencollective.com/storybook/backers/badge.svg" alt="Backers on Open Collective" />
  </a>
  <a href="#sponsors">
    <img src="https://opencollective.com/storybook/sponsors/badge.svg" alt="Sponsors on Open Collective" />
  </a>
  <a href="https://twitter.com/intent/follow?screen_name=storybookjs">
    <img src="https://badgen.net/twitter/follow/storybookjs?icon=twitter&label=%40storybookjs" alt="Official Twitter Handle" />
  </a>
</p>

# eslint-plugin-storybook

Best practice rules for Storybook

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm install eslint --save-dev
# or
yarn add eslint --dev
```

Next, install `eslint-plugin-storybook`:

```sh
npm install eslint-plugin-storybook --save-dev
# or
yarn add eslint-plugin-storybook --dev
```

## Usage

Use `.eslintrc.*` file to configure rules. See also: https://eslint.org/docs/user-guide/configuring

Add `plugin:storybook/recommended` to the extends section of your `.eslintrc` configuration file. Note that we can omit the `eslint-plugin-` prefix:

```js
{
  // extend plugin:storybook/<configuration>, such as:
  "extends": ["plugin:storybook/recommended"]
}
```

This plugin will only be applied to files following the `*.stories.*` (we recommend this) or `*.story.*` pattern. This is an automatic configuration, so you don't have to do anything.

### Overriding/disabling rules

Optionally, you can override, add or disable rules settings. You likely don't want these settings to be applied in every file, so make sure that you add a `overrides` section in your `.eslintrc.*` file that applies the overrides only to your stories files.

```js
{
  "overrides": [
    {
      // or whatever matches stories specified in .storybook/main.js
      "files": ['*.stories.@(ts|tsx|js|jsx|mjs|cjs)'],
      "rules": {
        // example of overriding a rule
        'storybook/hierarchy-separator': 'error',
        // example of disabling a rule
        'storybook/default-exports': 'off',
      }
    }
  ]
}
```

### MDX Support

This plugin does not support MDX files.

## Supported Rules and configurations

<!-- RULES-LIST:START -->

**Key**: 🔧 = fixable

**Configurations**: csf, csf-strict, addon-interactions, recommended

| Name                                                                                       | Description                                                 | 🔧  | Included in configurations                               |
| ------------------------------------------------------------------------------------------ | ----------------------------------------------------------- | --- | -------------------------------------------------------- |
| [`storybook/await-interactions`](./docs/rules/await-interactions.md)                       | Interactions should be awaited                              | 🔧  | <ul><li>addon-interactions</li><li>recommended</li></ul> |
| [`storybook/context-in-play-function`](./docs/rules/context-in-play-function.md)           | Pass a context when invoking play function of another story |     | <ul><li>recommended</li><li>addon-interactions</li></ul> |
| [`storybook/csf-component`](./docs/rules/csf-component.md)                                 | The component property should be set                        |     | <ul><li>csf</li></ul>                                    |
| [`storybook/default-exports`](./docs/rules/default-exports.md)                             | Story files should have a default export                    | 🔧  | <ul><li>csf</li><li>recommended</li></ul>                |
| [`storybook/hierarchy-separator`](./docs/rules/hierarchy-separator.md)                     | Deprecated hierarchy separator in title property            | 🔧  | <ul><li>csf</li><li>recommended</li></ul>                |
| [`storybook/no-redundant-story-name`](./docs/rules/no-redundant-story-name.md)             | A story should not have a redundant name property           | 🔧  | <ul><li>csf</li><li>recommended</li></ul>                |
| [`storybook/no-stories-of`](./docs/rules/no-stories-of.md)                                 | storiesOf is deprecated and should not be used              |     | <ul><li>csf-strict</li></ul>                             |
| [`storybook/no-title-property-in-meta`](./docs/rules/no-title-property-in-meta.md)         | Do not define a title in meta                               | 🔧  | <ul><li>csf-strict</li></ul>                             |
| [`storybook/prefer-pascal-case`](./docs/rules/prefer-pascal-case.md)                       | Stories should use PascalCase                               | 🔧  | <ul><li>recommended</li></ul>                            |
| [`storybook/story-exports`](./docs/rules/story-exports.md)                                 | A story file must contain at least one story export         |     | <ul><li>recommended</li><li>csf</li></ul>                |
| [`storybook/use-storybook-expect`](./docs/rules/use-storybook-expect.md)                   | Use expect from `@storybook/jest`                           | 🔧  | <ul><li>addon-interactions</li><li>recommended</li></ul> |
| [`storybook/use-storybook-testing-library`](./docs/rules/use-storybook-testing-library.md) | Do not use testing-library directly on stories              | 🔧  | <ul><li>addon-interactions</li><li>recommended</li></ul> |

<!-- RULES-LIST:END -->

## Contributors

Looking into improving this plugin? That would be awesome!
Please refer to [the contributing guidelines](./CONTRIBUTING.md) for steps to contributing.

## License

[MIT](./LICENSE)

#

#

# Create React App preset for Storybook

One-line [Create React App](https://github.com/facebook/create-react-app) configuration for Storybook.

This preset is designed to use alongside [`@storybook/react`](https://github.com/storybookjs/storybook/tree/master/app/react).

## Compatibility

This version (4.x) of `@storybook/preset-create-react-app` is compatibly with Create React App version 5 and above. Earlier versions are compatible with earlier version of the preset.

## Basic usage

**Note: you don't need to do this manually** if you used `npx -p @storybook/cli sb init` on a create-react-app, everything should properly setup already ✅.

First, install this preset to your project.

```sh
# Yarn
yarn add -D @storybook/preset-create-react-app

# npm
npm install -D @storybook/preset-create-react-app
```

Once installed, add this preset to the appropriate file:

- `./.storybook/main.js` (for Storybook 5.3.0 and newer)

  ```js
  module.exports = {
    addons: ["@storybook/preset-create-react-app"],
  };
  ```

- `./.storybook/presets.js` (for all Storybook versions)

  ```js
  module.exports = ["@storybook/preset-create-react-app"];
  ```

## Advanced usage

### Usage with Docs

When working with Storybook Docs, simply add the following config to your `main.js` file.

```js
module.exports = {
  addons: [
    "@storybook/preset-create-react-app",
    {
      name: "@storybook/addon-docs",
      options: {
        configureJSX: true,
      },
    },
  ],
};
```

### CRA overrides

This preset uses CRA's Webpack/Babel configurations, so that Storybook's behavior matches your app's behavior.

However, there may be some cases where you'd rather override CRA's default behavior. If that is something you need, you can use the `craOverrides` object.

| Option               | Default          | Behaviour | Type       | Description                                                                                                        |
| -------------------- | ---------------- | --------- | ---------- | ------------------------------------------------------------------------------------------------------------------ |
| `fileLoaderExcludes` | `['ejs', 'mdx']` | Extends   | `string[]` | Excludes file types (by extension) from CRA's `file-loader` configuration. The defaults are required by Storybook. |

Here's how you might configure this preset to ignore PDF files so they can be processed by another preset or loader:

```js
module.exports = {
  addons: [
    {
      name: "@storybook/preset-create-react-app",
      options: {
        craOverrides: {
          fileLoaderExcludes: ["pdf"],
        },
      },
    },
  ],
};
```

### Custom `react-scripts` packages

In most cases, this preset will find your `react-scripts` package, even if it's a fork of the offical `react-scripts`.

In the event that it doesn't, you can set the package's name with `scriptsPackageName`.

```js
module.exports = {
  addons: [
    {
      name: "@storybook/preset-create-react-app",
      options: {
        scriptsPackageName: "@my/react-scripts",
      },
    },
  ],
};
```

### Warning for forks of 'react-scripts'

One of the tasks that this preset does is inject the storybook config directory (the default is `.storybook`)
into the `includes` key of the webpack babel-loader config that react-scripts (or your fork) provides. This is
nice because then any components/code you've defined in your storybook config directory will be run through the
babel-loader as well.

The potential gotcha exists if you have tweaked the Conditions of the webpack babel-loader rule in your fork of
react-scripts. This preset will make the `include` condition an array (if not already), and inject the storybook
config directory. If you have changed the conditions to utilize an `exclude`, then BOTH conditions will need to
be true (which isn't likely going to work as expected).

The steps to remedy this would be to follow the steps for customizing the webpack config within the storybook
side of things. [Details for storybook custom webpack config](https://storybook.js.org/docs/configurations/custom-webpack-config/)
You'll have access to all of the rules in `config.module.rules`. You'll need to find the offending rule,
and customize it how you need it to be to be compatible with your fork.

See [Webpack Rule Conditions](https://webpack.js.org/configuration/module/#rule-conditions) for more details
concerning the conditions.

## Resources

- [Walkthrough to set up Storybook Docs with CRA & typescript](https://gist.github.com/shilman/bc9cbedb2a7efb5ec6710337cbd20c0c)
- [Example projects (used for testing this preset)](https://github.com/storybookjs/presets/tree/master/examples)

#

#

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
