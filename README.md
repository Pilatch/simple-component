# simpleComponent

Helps you make stateless web components that serve visual purposes only, e.g. a "bold-gold" element.

    <bold-gold>Gold diggin'</bold-gold>

Here's how a browser would render it.

![bold and gold text](./img/gold-diggin.png)

## Usage

We can easily define our `<bold-gold>` web component with a `<template>` and the `simpleComponent` function.

The `id` of the template must be the same as the name of the web component we're registering, but with the suffix `-template`. Pass the name of the web component as the first argument to `simpleComponent`.

    <template id="bold-gold-template">
      <style>
        bold-gold {
          background-color: black;
          color: gold;
          font-weight: bold;
        }
      </style>
    </template>
    <script>
      simpleComponent('bold-gold')
    </script>

For something fancier, provide an object with [lifecycle callbacks](https://www.html5rocks.com/en/tutorials/webcomponents/customelements/#lifecycle).

    <template id="simple-hello-template">
      <p>Hello!</p>
    </template>
    <script>
    simpleComponent('simple-hello', {
      createdCallback: function() {
        console.log('simple-hello instance created', this)
      }
    })
    </script>

## Browser Support

This does _not_ support [slots](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot), [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM), [Shady DOM](https://www.polymer-project.org/blog/shadydom), [style-scoping](https://www.polymer-project.org/1.0/docs/devguide/styling) or anything fancy. We recommend styling simple components using a [BEM](http://getbem.com/)-like approach to prevent styles from leaking out. See [test/search-bar.css](./test/search-bar.css) for an example.

For full browser support use simple-component-v0 alonside a dependency on webcomponents v0.

## Installation

In `package.json`

    "dependencies": {
      "webcomponentsjsv0": "git://github.com/webcomponents/webcomponentsjs.git#v0",
      "simple-component-v0": "^1.0.0"
    }

Then install these, via `yarn install` and reference them in script tags.

    <script src="node_modules/webcomponentsjsv0/webcomponents-lite.js"></script>
    <script src="node_modules/simple-component-v0/index.js"></script>

## Documancy

For more information, clone this repository. Start the server with `yarn start` then navigate to [localhost:3007/docs](http://localhost:3007/docs) in your browser.

Or see an even more complex (but still simple) example of a search-bar web component at [localhost:3007/test](http://localhost:3007/test).

## Why?

Why does this even exist, if web components v1 is the hotness, and simple-component-v0 doesn't offer any features?

  * The v1 spec wants you to write a `class` for each web componenent. Should you support older browsers that don't know what a `class` is, what hoops are you willing to jump through to make that happen? Here's a [Stack Overflow answer](https://stackoverflow.com/questions/44729754/will-custom-elements-v1-ever-work-on-internet-explorer-11) to that.
  * At the time of this writing Shadow DOM hasn't yet been implemented in all major browsers, and the polyfills for it are expensive.
  * Some developers want their components to easily inherit global styles. For instance, you may want all your web components to have have their text in the same font as you're using on the page. [Again, what hoops do you want to jump through?](https://www.smashingmagazine.com/2016/12/styling-web-components-using-a-shared-style-sheet/)
  * This works in code bases that use the web components v0 specification.
  * Some developers may find the `<template>` approach more attractive than [JavaScript options](https://www.html5rocks.com/en/tutorials/webcomponents/customelements/).
  * Virtual DOM rendering engines, such as those in [Elm](http://elm-lang.org/blog/blazing-fast-html), [React](https://reactjs.org/docs/faq-internals.html), and [Vue](https://vuejs.org/v2/guide/comparison.html), create and discard HTMLElements flippantly, so there's a benefit to having some simple web components with low performance overhead.