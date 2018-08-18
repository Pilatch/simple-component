# simpleComponent

Helps you make stateless web components that serve visual purposes only, e.g. a "bold-gold" element.

    <bold-gold>Gold diggin'</bold-gold>

Here's how a browser would render it.

![bold and gold text](./img/gold-diggin.png)

You can easily define that web component like so.

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

Note that the name of this module in NPM is "simple-web-component" because "simple-component" was taken. The JavaScript function you'll run is just named `simpleComponent`.

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

This does _not_ support slots, Shadow DOM, Shady CSS or anything fancy. We recommend that you style your simple components using [BEM](http://getbem.com/) to prevent styles from leaking out of your component. See [test/search-bar.css](./test/search-bar.css) for an example.

Note that for full browser support, we recommend using simple-web-component alonside a dependency on webcomponents v0, which you would add to your package.json like so.

    "dependencies": {
      "webcomponentsjsv0": "git://github.com/webcomponents/webcomponentsjs.git#v0",
      "simple-web-component": "git@github.com:Pilatch/simple-web-component.git"
    }

Then install these, via `yarn install` and reference them in script tags.

    <script src="node_modules/webcomponentsjsv0/webcomponents-lite.js"></script>
    <script src="node_modules/simple-web-component/index.js"></script>

For more information, clone this repository, start the server with

    yarn start

Then navigate to [localhost:3007/docs](http://localhost:3007/docs) in your browser.

Or see an even more complex (but still simple) example of a search-bar web component at [localhost:3007/test](http://localhost:3007/test).
