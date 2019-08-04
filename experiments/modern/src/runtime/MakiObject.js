const Emitter = require("../Emitter");
const { findElementById, findElementByTypeAndId } = require("../utils");

class MakiObject {
  constructor(node, parent, annotations = {}) {
    this.xmlNode = node;
    this.parent = parent;
    this.js_annotations = annotations;
    this.children = [];
    this._emitter = new Emitter();

    if (!this.xmlNode) {
      // When dynamically creating a new object with `new` we need to add an underlying "XML"
      // node that we can edit
      this.xmlNode = {
        children: [],
        attributes: {
          id: null,
        },
        // ugly but works for now
        name: this.constructor.name.toLowerCase(),
        type: 'element'
      }
    }
  }

  js_addChild(child) {
    this.children.push(child);
  }

  js_addChildren(children) {
    this.children = this.children.concat(children);
  }

  js_trigger(eventName, ...args) {
    this._emitter.trigger(eventName, args);
  }

  js_listenToAll(cb) {
    return this._emitter.listenToAll(cb);
  }

  js_dispose() {
    this._emitter.dispose();
  }

  js_imageLookup(id) {
    const element = findElementById(this, id);
    if (element) {
      return element.js_annotations;
    }

    return null;
  }

  js_groupdefLookup(id) {
    const groupdef = findElementByTypeAndId(this, "groupdef", id);
    if (groupdef) {
      return groupdef;
    }

    return null;
  }

  /**
   * getclassname()
   *
   * Returns the class name for the object.
   * @ret The class name.
   */
  static getclassname() {
    return "Object";
  }

  /**
   * getId()
   */
  getid() {
    throw new Error("getId not implemented");
  }
}

module.exports = MakiObject;
