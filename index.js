;(function(global) {
  'use strict'

  // IE 11 polyfill
  var assign = Object.assign || function(target, source) {
    var property

    for (property in source) {
      if (source.hasOwnProperty(property)) {
        target[property] = source[property]
      }
    }
  }

  /**
   * Define a stateless custom element with no behaviors.
   * Give the element's template an ID attribute with the "-template" suffix.
   * @module simpleComponent
   * @example
<template id="simple-bling-template">
  <style>
    simple-bling {
      color: gold;
      font-weight: bold;
    }
  </style>
</template>
<script>
  simpleComponent('simple-bling')
</script>
   * @param {String} elementName Name of the custom element
   * @param {Object} [elementClass] An object with lifecycle callbacks on it. Not actually an ES6 class for compatability purposes.
   * @param {Function} [elementClassToExtend] An existing HTML element class to extend, e.g. HTMLButtonElement.
   * @return {void}
   */
  function simpleComponent(elementName, elementClass, elementClassToExtend) {
    elementClass = elementClass || {}
    elementClassToExtend = elementClassToExtend || HTMLElement

    elementClass.prototype = Object.create(elementClassToExtend.prototype)
    assign(elementClass.prototype, elementClass)
    elementClass.__template = template(elementName)

    if (elementClass.prototype.createdCallback) {
      elementClass.prototype.__originalCreatedCallback = elementClass.prototype.createdCallback
    }

    elementClass.prototype.createdCallback = function() {
      fill(this, elementClass.__template)
      if (elementClass.prototype.__originalCreatedCallback) {
        elementClass.prototype.__originalCreatedCallback.call(this)
      }
    }

    document.registerElement(elementName, elementClass)
  }

  /**
   * Attach a template's content to an element.
   * @public
   * @memberof module:simpleComponent
   * @param {HTMLElement} toElement The element to attach the template content to
   * @param {HTMLElement} template A template element that has the markup guts for the custom element.
   * @return {void}
   */
  function fill(toElement, templateElement) {
    var templateContentClone = templateElement.content.cloneNode(true)
    var slot
    var i

    if (toElement.childNodes.length) {
      slot = templateContentClone.querySelector('slot')

      if (slot) {
        for (i = 0; i < slot.childNodes.length; i++) {
          slot.removeChild(slot.childNodes[i])
        }
        for (i = 0; i < toElement.childNodes.length; i++) {
          slot.appendChild(toElement.childNodes[i])
        }
      }
    }

    toElement.appendChild(templateContentClone)
  }

  /**
   * Get the content of a template whose ID attribute has the "-template" suffix.
   * @public
   * @memberof module:simpleComponent
   * @param {String} elementName Name of the custom element
   * @return {HTMLElement} HTML template element
   */
  function template(elementName) {
    return (document._currentScript || document.currentScript)
      .ownerDocument.getElementById(elementName + '-template')
  }

  simpleComponent.fill = fill
  simpleComponent.template = template
  global.simpleComponent = simpleComponent
})(this)
