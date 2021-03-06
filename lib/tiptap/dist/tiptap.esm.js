
    /*!
    * tiptap v1.26.5
    * (c) 2019 Scrumpy UG (limited liability)
    * @license MIT
    */
  
import { EditorState, Plugin, PluginKey, TextSelection } from 'prosemirror-state';
export { NodeSelection, Plugin, PluginKey, TextSelection } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { Schema, DOMParser, DOMSerializer } from 'prosemirror-model';
import { dropCursor } from 'prosemirror-dropcursor';
import { gapCursor } from 'prosemirror-gapcursor';
import { keymap } from 'prosemirror-keymap';
import { baseKeymap } from 'prosemirror-commands';
import { inputRules, undoInputRule } from 'prosemirror-inputrules';
import { getMarkRange, getMarkAttrs, markIsActive, nodeIsActive } from 'tiptap-utils';
import Vue from 'vue';
import { setBlockType } from 'tiptap-commands';

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
    return;
  }

  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

function camelCase (str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '');
}

var ComponentView =
/*#__PURE__*/
function () {
  function ComponentView(component, _ref) {
    var editor = _ref.editor,
        extension = _ref.extension,
        parent = _ref.parent,
        node = _ref.node,
        view = _ref.view,
        decorations = _ref.decorations,
        getPos = _ref.getPos;

    _classCallCheck(this, ComponentView);

    this.component = component;
    this.editor = editor;
    this.extension = extension;
    this.parent = parent;
    this.node = node;
    this.view = view;
    this.decorations = decorations;
    this.isNode = !!this.node.marks;
    this.isMark = !this.isNode;
    this.getPos = this.isMark ? this.getMarkPos : getPos;
    this.captureEvents = true;
    this.dom = this.createDOM();
    this.contentDOM = this.vm.$refs.content;
  }

  _createClass(ComponentView, [{
    key: "createDOM",
    value: function createDOM() {
      var _this = this;

      var Component = Vue.extend(this.component);
      var props = {
        editor: this.editor,
        node: this.node,
        view: this.view,
        getPos: function getPos() {
          return _this.getPos();
        },
        decorations: this.decorations,
        selected: false,
        options: this.extension.options,
        updateAttrs: function updateAttrs(attrs) {
          return _this.updateAttrs(attrs);
        }
      };

      if (typeof this.extension.setSelection === 'function') {
        this.setSelection = this.extension.setSelection;
      }

      this.vm = new Component({
        parent: this.parent,
        propsData: props
      }).$mount();
      return this.vm.$el;
    }
  }, {
    key: "update",
    value: function update(node, decorations) {
      if (node.type !== this.node.type) {
        return false;
      }

      if (node === this.node && this.decorations === decorations) {
        return true;
      }

      this.node = node;
      this.decorations = decorations;
      this.updateComponentProps({
        node: node,
        decorations: decorations
      });
      return true;
    }
  }, {
    key: "updateComponentProps",
    value: function updateComponentProps(props) {
      var _this2 = this;

      if (!this.vm._props) {
        return;
      } // Update props in component
      // TODO: Avoid mutating a prop directly.
      // Maybe there is a better way to do this?


      var originalSilent = Vue.config.silent;
      Vue.config.silent = true;
      Object.entries(props).forEach(function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 2),
            key = _ref3[0],
            value = _ref3[1];

        _this2.vm._props[key] = value;
      }); // this.vm._props.node = node
      // this.vm._props.decorations = decorations

      Vue.config.silent = originalSilent;
    }
  }, {
    key: "updateAttrs",
    value: function updateAttrs(attrs) {
      if (!this.view.editable) {
        return;
      }

      var state = this.view.state;
      var type = this.node.type;
      var pos = this.getPos();

      var newAttrs = _objectSpread2({}, this.node.attrs, {}, attrs);

      var transaction = this.isMark ? state.tr.removeMark(pos.from, pos.to, type).addMark(pos.from, pos.to, type.create(newAttrs)) : state.tr.setNodeMarkup(pos, null, newAttrs);
      this.view.dispatch(transaction);
    } // prevent a full re-render of the vue component on update
    // we'll handle prop updates in `update()`

  }, {
    key: "ignoreMutation",
    value: function ignoreMutation(mutation) {
      // allow leaf nodes to be selected
      if (mutation.type === 'selection') {
        return false;
      }

      if (!this.contentDOM) {
        return true;
      }

      return !this.contentDOM.contains(mutation.target);
    } // disable (almost) all prosemirror event listener for node views

  }, {
    key: "stopEvent",
    value: function stopEvent(event) {
      var _this3 = this;

      if (typeof this.extension.stopEvent === 'function') {
        return this.extension.stopEvent(event);
      }

      var draggable = !!this.extension.schema.draggable; // support a custom drag handle

      if (draggable && event.type === 'mousedown') {
        var dragHandle = event.target.closest && event.target.closest('[data-drag-handle]');
        var isValidDragHandle = dragHandle && (this.dom === dragHandle || this.dom.contains(dragHandle));

        if (isValidDragHandle) {
          this.captureEvents = false;
          document.addEventListener('dragend', function () {
            _this3.captureEvents = true;
          }, {
            once: true
          });
        }
      }

      var isCopy = event.type === 'copy';
      var isPaste = event.type === 'paste';
      var isCut = event.type === 'cut';
      var isDrag = event.type.startsWith('drag') || event.type === 'drop';

      if (draggable && isDrag || isCopy || isPaste || isCut) {
        return false;
      }

      return this.captureEvents;
    }
  }, {
    key: "selectNode",
    value: function selectNode() {
      this.updateComponentProps({
        selected: true
      });
    }
  }, {
    key: "deselectNode",
    value: function deselectNode() {
      this.updateComponentProps({
        selected: false
      });
    }
  }, {
    key: "getMarkPos",
    value: function getMarkPos() {
      var pos = this.view.posAtDOM(this.dom);
      var resolvedPos = this.view.state.doc.resolve(pos);
      var range = getMarkRange(resolvedPos, this.node.type);
      return range;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.vm.$destroy();
    }
  }]);

  return ComponentView;
}();

var Emitter =
/*#__PURE__*/
function () {
  function Emitter() {
    _classCallCheck(this, Emitter);
  }

  _createClass(Emitter, [{
    key: "on",
    // Add an event listener for given event
    value: function on(event, fn) {
      this._callbacks = this._callbacks || {}; // Create namespace for this event

      if (!this._callbacks[event]) {
        this._callbacks[event] = [];
      }

      this._callbacks[event].push(fn);

      return this;
    }
  }, {
    key: "emit",
    value: function emit(event) {
      var _this = this;

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      this._callbacks = this._callbacks || {};
      var callbacks = this._callbacks[event];

      if (callbacks) {
        callbacks.forEach(function (callback) {
          return callback.apply(_this, args);
        });
      }

      return this;
    } // Remove event listener for given event.
    // If fn is not provided, all event listeners for that event will be removed.
    // If neither is provided, all event listeners will be removed.

  }, {
    key: "off",
    value: function off(event, fn) {
      if (!arguments.length) {
        this._callbacks = {};
      } else {
        // event listeners for the given event
        var callbacks = this._callbacks ? this._callbacks[event] : null;

        if (callbacks) {
          if (fn) {
            this._callbacks[event] = callbacks.filter(function (cb) {
              return cb !== fn;
            }); // remove specific handler
          } else {
            delete this._callbacks[event]; // remove all handlers
          }
        }
      }

      return this;
    }
  }]);

  return Emitter;
}();

var Extension =
/*#__PURE__*/
function () {
  function Extension() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Extension);

    this.options = _objectSpread2({}, this.defaultOptions, {}, options);
  }

  _createClass(Extension, [{
    key: "init",
    value: function init() {
      return null;
    }
  }, {
    key: "bindEditor",
    value: function bindEditor() {
      var editor = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      this.editor = editor;
    }
  }, {
    key: "inputRules",
    value: function inputRules() {
      return [];
    }
  }, {
    key: "pasteRules",
    value: function pasteRules() {
      return [];
    }
  }, {
    key: "keys",
    value: function keys() {
      return {};
    }
  }, {
    key: "name",
    get: function get() {
      return null;
    }
  }, {
    key: "type",
    get: function get() {
      return 'extension';
    }
  }, {
    key: "update",
    get: function get() {
      return function () {};
    }
  }, {
    key: "defaultOptions",
    get: function get() {
      return {};
    }
  }, {
    key: "plugins",
    get: function get() {
      return [];
    }
  }]);

  return Extension;
}();

var ExtensionManager =
/*#__PURE__*/
function () {
  function ExtensionManager() {
    var extensions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var editor = arguments.length > 1 ? arguments[1] : undefined;

    _classCallCheck(this, ExtensionManager);

    extensions.forEach(function (extension) {
      extension.bindEditor(editor);
      extension.init();
    });
    this.extensions = extensions;
  }

  _createClass(ExtensionManager, [{
    key: "keymaps",
    value: function keymaps(_ref) {
      var schema = _ref.schema;
      var extensionKeymaps = this.extensions.filter(function (extension) {
        return ['extension'].includes(extension.type);
      }).filter(function (extension) {
        return extension.keys;
      }).map(function (extension) {
        return extension.keys({
          schema: schema
        });
      });
      var nodeMarkKeymaps = this.extensions.filter(function (extension) {
        return ['node', 'mark'].includes(extension.type);
      }).filter(function (extension) {
        return extension.keys;
      }).map(function (extension) {
        return extension.keys({
          type: schema["".concat(extension.type, "s")][extension.name],
          schema: schema
        });
      });
      return [].concat(_toConsumableArray(extensionKeymaps), _toConsumableArray(nodeMarkKeymaps)).map(function (keys) {
        return keymap(keys);
      });
    }
  }, {
    key: "inputRules",
    value: function inputRules(_ref2) {
      var schema = _ref2.schema,
          excludedExtensions = _ref2.excludedExtensions;
      if (!(excludedExtensions instanceof Array) && excludedExtensions) return [];
      var allowedExtensions = excludedExtensions instanceof Array ? this.extensions.filter(function (extension) {
        return !excludedExtensions.includes(extension.name);
      }) : this.extensions;
      var extensionInputRules = allowedExtensions.filter(function (extension) {
        return ['extension'].includes(extension.type);
      }).filter(function (extension) {
        return extension.inputRules;
      }).map(function (extension) {
        return extension.inputRules({
          schema: schema
        });
      });
      var nodeMarkInputRules = allowedExtensions.filter(function (extension) {
        return ['node', 'mark'].includes(extension.type);
      }).filter(function (extension) {
        return extension.inputRules;
      }).map(function (extension) {
        return extension.inputRules({
          type: schema["".concat(extension.type, "s")][extension.name],
          schema: schema
        });
      });
      return [].concat(_toConsumableArray(extensionInputRules), _toConsumableArray(nodeMarkInputRules)).reduce(function (allInputRules, inputRules) {
        return [].concat(_toConsumableArray(allInputRules), _toConsumableArray(inputRules));
      }, []);
    }
  }, {
    key: "pasteRules",
    value: function pasteRules(_ref3) {
      var schema = _ref3.schema,
          excludedExtensions = _ref3.excludedExtensions;
      if (!(excludedExtensions instanceof Array) && excludedExtensions) return [];
      var allowedExtensions = excludedExtensions instanceof Array ? this.extensions.filter(function (extension) {
        return !excludedExtensions.includes(extension.name);
      }) : this.extensions;
      var extensionPasteRules = allowedExtensions.filter(function (extension) {
        return ['extension'].includes(extension.type);
      }).filter(function (extension) {
        return extension.pasteRules;
      }).map(function (extension) {
        return extension.pasteRules({
          schema: schema
        });
      });
      var nodeMarkPasteRules = allowedExtensions.filter(function (extension) {
        return ['node', 'mark'].includes(extension.type);
      }).filter(function (extension) {
        return extension.pasteRules;
      }).map(function (extension) {
        return extension.pasteRules({
          type: schema["".concat(extension.type, "s")][extension.name],
          schema: schema
        });
      });
      return [].concat(_toConsumableArray(extensionPasteRules), _toConsumableArray(nodeMarkPasteRules)).reduce(function (allPasteRules, pasteRules) {
        return [].concat(_toConsumableArray(allPasteRules), _toConsumableArray(pasteRules));
      }, []);
    }
  }, {
    key: "commands",
    value: function commands(_ref4) {
      var schema = _ref4.schema,
          view = _ref4.view;
      return this.extensions.filter(function (extension) {
        return extension.commands;
      }).reduce(function (allCommands, extension) {
        var name = extension.name,
            type = extension.type;
        var commands = {};
        var value = extension.commands(_objectSpread2({
          schema: schema
        }, ['node', 'mark'].includes(type) ? {
          type: schema["".concat(type, "s")][name]
        } : {}));

        var apply = function apply(cb, attrs) {
          if (!view.editable) {
            return false;
          }

          view.focus();
          return cb(attrs)(view.state, view.dispatch, view);
        };

        var handle = function handle(_name, _value) {
          if (Array.isArray(_value)) {
            commands[_name] = function (attrs) {
              return _value.forEach(function (callback) {
                return apply(callback, attrs);
              });
            };
          } else if (typeof _value === 'function') {
            commands[_name] = function (attrs) {
              return apply(_value, attrs);
            };
          }
        };

        if (_typeof(value) === 'object') {
          Object.entries(value).forEach(function (_ref5) {
            var _ref6 = _slicedToArray(_ref5, 2),
                commandName = _ref6[0],
                commandValue = _ref6[1];

            handle(commandName, commandValue);
          });
        } else {
          handle(name, value);
        }

        return _objectSpread2({}, allCommands, {}, commands);
      }, {});
    }
  }, {
    key: "nodes",
    get: function get() {
      return this.extensions.filter(function (extension) {
        return extension.type === 'node';
      }).reduce(function (nodes, _ref7) {
        var name = _ref7.name,
            schema = _ref7.schema;
        return _objectSpread2({}, nodes, _defineProperty({}, name, schema));
      }, {});
    }
  }, {
    key: "options",
    get: function get() {
      var view = this.view;
      return this.extensions.reduce(function (nodes, extension) {
        return _objectSpread2({}, nodes, _defineProperty({}, extension.name, new Proxy(extension.options, {
          set: function set(obj, prop, value) {
            var changed = obj[prop] !== value;
            Object.assign(obj, _defineProperty({}, prop, value));

            if (changed) {
              extension.update(view);
            }

            return true;
          }
        })));
      }, {});
    }
  }, {
    key: "marks",
    get: function get() {
      return this.extensions.filter(function (extension) {
        return extension.type === 'mark';
      }).reduce(function (marks, _ref8) {
        var name = _ref8.name,
            schema = _ref8.schema;
        return _objectSpread2({}, marks, _defineProperty({}, name, schema));
      }, {});
    }
  }, {
    key: "plugins",
    get: function get() {
      return this.extensions.filter(function (extension) {
        return extension.plugins;
      }).reduce(function (allPlugins, _ref9) {
        var plugins = _ref9.plugins;
        return [].concat(_toConsumableArray(allPlugins), _toConsumableArray(plugins));
      }, []);
    }
  }]);

  return ExtensionManager;
}();

function injectCSS (css) {
  if (process.env.NODE_ENV !== 'test') {
    var style = document.createElement('style');
    style.type = 'text/css';
    style.textContent = css;
    var _document = document,
        head = _document.head;
    var firstChild = head.firstChild;

    if (firstChild) {
      head.insertBefore(style, firstChild);
    } else {
      head.appendChild(style);
    }
  }
}

var Mark =
/*#__PURE__*/
function (_Extension) {
  _inherits(Mark, _Extension);

  function Mark() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Mark);

    return _possibleConstructorReturn(this, _getPrototypeOf(Mark).call(this, options));
  }

  _createClass(Mark, [{
    key: "command",
    value: function command() {
      return function () {};
    }
  }, {
    key: "type",
    get: function get() {
      return 'mark';
    }
  }, {
    key: "view",
    get: function get() {
      return null;
    }
  }, {
    key: "schema",
    get: function get() {
      return null;
    }
  }]);

  return Mark;
}(Extension);

function minMax() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  return Math.min(Math.max(parseInt(value, 10), min), max);
}

var Node =
/*#__PURE__*/
function (_Extension) {
  _inherits(Node, _Extension);

  function Node() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Node);

    return _possibleConstructorReturn(this, _getPrototypeOf(Node).call(this, options));
  }

  _createClass(Node, [{
    key: "command",
    value: function command() {
      return function () {};
    }
  }, {
    key: "type",
    get: function get() {
      return 'node';
    }
  }, {
    key: "view",
    get: function get() {
      return null;
    }
  }, {
    key: "schema",
    get: function get() {
      return null;
    }
  }]);

  return Node;
}(Extension);

var Doc =
/*#__PURE__*/
function (_Node) {
  _inherits(Doc, _Node);

  function Doc() {
    _classCallCheck(this, Doc);

    return _possibleConstructorReturn(this, _getPrototypeOf(Doc).apply(this, arguments));
  }

  _createClass(Doc, [{
    key: "name",
    get: function get() {
      return 'doc';
    }
  }, {
    key: "schema",
    get: function get() {
      return {
        content: 'block+'
      };
    }
  }]);

  return Doc;
}(Node);

var Paragraph =
/*#__PURE__*/
function (_Node) {
  _inherits(Paragraph, _Node);

  function Paragraph() {
    _classCallCheck(this, Paragraph);

    return _possibleConstructorReturn(this, _getPrototypeOf(Paragraph).apply(this, arguments));
  }

  _createClass(Paragraph, [{
    key: "commands",
    value: function commands(_ref) {
      var type = _ref.type;
      return function () {
        return setBlockType(type);
      };
    }
  }, {
    key: "name",
    get: function get() {
      return 'paragraph';
    }
  }, {
    key: "schema",
    get: function get() {
      return {
        content: 'inline*',
        group: 'block',
        draggable: false,
        parseDOM: [{
          tag: 'p'
        }],
        toDOM: function toDOM() {
          return ['p', 0];
        }
      };
    }
  }]);

  return Paragraph;
}(Node);

var Text =
/*#__PURE__*/
function (_Node) {
  _inherits(Text, _Node);

  function Text() {
    _classCallCheck(this, Text);

    return _possibleConstructorReturn(this, _getPrototypeOf(Text).apply(this, arguments));
  }

  _createClass(Text, [{
    key: "name",
    get: function get() {
      return 'text';
    }
  }, {
    key: "schema",
    get: function get() {
      return {
        group: 'inline'
      };
    }
  }]);

  return Text;
}(Node);

var css = ".ProseMirror {\n  position: relative;\n}\n\n.ProseMirror {\n  word-wrap: break-word;\n  white-space: pre-wrap;\n  -webkit-font-variant-ligatures: none;\n  font-variant-ligatures: none;\n}\n\n.ProseMirror pre {\n  white-space: pre-wrap;\n}\n\n.ProseMirror-gapcursor {\n  display: none;\n  pointer-events: none;\n  position: absolute;\n}\n\n.ProseMirror-gapcursor:after {\n  content: \"\";\n  display: block;\n  position: absolute;\n  top: -2px;\n  width: 20px;\n  border-top: 1px solid black;\n  animation: ProseMirror-cursor-blink 1.1s steps(2, start) infinite;\n}\n\n@keyframes ProseMirror-cursor-blink {\n  to {\n    visibility: hidden;\n  }\n}\n\n.ProseMirror-hideselection *::selection {\n  background: transparent;\n}\n\n.ProseMirror-hideselection *::-moz-selection {\n  background: transparent;\n}\n\n.ProseMirror-hideselection * {\n  caret-color: transparent;\n}\n\n.ProseMirror-focused .ProseMirror-gapcursor {\n  display: block;\n}\n";

var Editor =
/*#__PURE__*/
function (_Emitter) {
  _inherits(Editor, _Emitter);

  function Editor() {
    var _this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Editor);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Editor).call(this));
    _this.defaultOptions = {
      editorProps: {},
      editable: true,
      autoFocus: null,
      extensions: [],
      content: '',
      topNode: 'doc',
      emptyDocument: {
        type: 'doc',
        content: [{
          type: 'paragraph'
        }]
      },
      useBuiltInExtensions: true,
      disableInputRules: false,
      disablePasteRules: false,
      dropCursor: {},
      parseOptions: {},
      injectCSS: true,
      onInit: function onInit() {},
      onTransaction: function onTransaction() {},
      onUpdate: function onUpdate() {},
      onFocus: function onFocus() {},
      onBlur: function onBlur() {},
      onPaste: function onPaste() {},
      onDrop: function onDrop() {}
    };
    _this.events = ['init', 'transaction', 'update', 'focus', 'blur', 'paste', 'drop'];

    _this.init(options);

    return _this;
  }

  _createClass(Editor, [{
    key: "init",
    value: function init() {
      var _this2 = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.setOptions(_objectSpread2({}, this.defaultOptions, {}, options));
      this.focused = false;
      this.selection = {
        from: 0,
        to: 0
      };
      this.element = document.createElement('div');
      this.extensions = this.createExtensions();
      this.nodes = this.createNodes();
      this.marks = this.createMarks();
      this.schema = this.createSchema();
      this.plugins = this.createPlugins();
      this.keymaps = this.createKeymaps();
      this.inputRules = this.createInputRules();
      this.pasteRules = this.createPasteRules();
      this.view = this.createView();
      this.commands = this.createCommands();
      this.setActiveNodesAndMarks();

      if (this.options.injectCSS) {
        injectCSS(css);
      }

      if (this.options.autoFocus !== null) {
        this.focus(this.options.autoFocus);
      }

      this.events.forEach(function (name) {
        _this2.on(name, _this2.options[camelCase("on ".concat(name))] || function () {});
      });
      this.emit('init', {
        view: this.view,
        state: this.state
      }); // give extension manager access to our view

      this.extensions.view = this.view;
    }
  }, {
    key: "setOptions",
    value: function setOptions(options) {
      this.options = _objectSpread2({}, this.options, {}, options);

      if (this.view && this.state) {
        this.view.updateState(this.state);
      }
    }
  }, {
    key: "createExtensions",
    value: function createExtensions() {
      return new ExtensionManager([].concat(_toConsumableArray(this.builtInExtensions), _toConsumableArray(this.options.extensions)), this);
    }
  }, {
    key: "createPlugins",
    value: function createPlugins() {
      return this.extensions.plugins;
    }
  }, {
    key: "createKeymaps",
    value: function createKeymaps() {
      return this.extensions.keymaps({
        schema: this.schema
      });
    }
  }, {
    key: "createInputRules",
    value: function createInputRules() {
      return this.extensions.inputRules({
        schema: this.schema,
        excludedExtensions: this.options.disableInputRules
      });
    }
  }, {
    key: "createPasteRules",
    value: function createPasteRules() {
      return this.extensions.pasteRules({
        schema: this.schema,
        excludedExtensions: this.options.disablePasteRules
      });
    }
  }, {
    key: "createCommands",
    value: function createCommands() {
      return this.extensions.commands({
        schema: this.schema,
        view: this.view
      });
    }
  }, {
    key: "createNodes",
    value: function createNodes() {
      return this.extensions.nodes;
    }
  }, {
    key: "createMarks",
    value: function createMarks() {
      return this.extensions.marks;
    }
  }, {
    key: "createSchema",
    value: function createSchema() {
      return new Schema({
        topNode: this.options.topNode,
        nodes: this.nodes,
        marks: this.marks
      });
    }
  }, {
    key: "createState",
    value: function createState() {
      var _this3 = this;

      return EditorState.create({
        schema: this.schema,
        doc: this.createDocument(this.options.content),
        plugins: [].concat(_toConsumableArray(this.plugins), [inputRules({
          rules: this.inputRules
        })], _toConsumableArray(this.pasteRules), _toConsumableArray(this.keymaps), [keymap({
          Backspace: undoInputRule
        }), keymap(baseKeymap), dropCursor(this.options.dropCursor), gapCursor(), new Plugin({
          key: new PluginKey('editable'),
          props: {
            editable: function editable() {
              return _this3.options.editable;
            }
          }
        }), new Plugin({
          props: {
            attributes: {
              tabindex: 0
            },
            handleDOMEvents: {
              focus: function focus(view, event) {
                _this3.focused = true;

                _this3.emit('focus', {
                  event: event,
                  state: view.state,
                  view: view
                });

                var transaction = _this3.state.tr.setMeta('focused', true);

                _this3.view.dispatch(transaction);
              },
              blur: function blur(view, event) {
                _this3.focused = false;

                _this3.emit('blur', {
                  event: event,
                  state: view.state,
                  view: view
                });

                var transaction = _this3.state.tr.setMeta('focused', false);

                _this3.view.dispatch(transaction);
              }
            }
          }
        }), new Plugin({
          props: this.options.editorProps
        })])
      });
    }
  }, {
    key: "createDocument",
    value: function createDocument(content) {
      var parseOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.options.parseOptions;

      if (content === null) {
        return this.schema.nodeFromJSON(this.options.emptyDocument);
      }

      if (_typeof(content) === 'object') {
        try {
          return this.schema.nodeFromJSON(content);
        } catch (error) {
          console.warn('[tiptap warn]: Invalid content.', 'Passed value:', content, 'Error:', error);
          return this.schema.nodeFromJSON(this.options.emptyDocument);
        }
      }

      if (typeof content === 'string') {
        var element = document.createElement('div');
        element.innerHTML = content.trim();
        return DOMParser.fromSchema(this.schema).parse(element, parseOptions);
      }

      return false;
    }
  }, {
    key: "createView",
    value: function createView() {
      var _this4 = this;

      return new EditorView(this.element, {
        state: this.createState(),
        handlePaste: function handlePaste() {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this4.emit.apply(_this4, ['paste'].concat(args));
        },
        handleDrop: function handleDrop() {
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          _this4.emit.apply(_this4, ['drop'].concat(args));
        },
        dispatchTransaction: this.dispatchTransaction.bind(this)
      });
    }
  }, {
    key: "setParentComponent",
    value: function setParentComponent() {
      var component = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (!component) {
        return;
      }

      this.view.setProps({
        nodeViews: this.initNodeViews({
          parent: component,
          extensions: [].concat(_toConsumableArray(this.builtInExtensions), _toConsumableArray(this.options.extensions))
        })
      });
    }
  }, {
    key: "initNodeViews",
    value: function initNodeViews(_ref) {
      var _this5 = this;

      var parent = _ref.parent,
          extensions = _ref.extensions;
      return extensions.filter(function (extension) {
        return ['node', 'mark'].includes(extension.type);
      }).filter(function (extension) {
        return extension.view;
      }).reduce(function (nodeViews, extension) {
        var nodeView = function nodeView(node, view, getPos, decorations) {
          var component = extension.view;
          return new ComponentView(component, {
            editor: _this5,
            extension: extension,
            parent: parent,
            node: node,
            view: view,
            getPos: getPos,
            decorations: decorations
          });
        };

        return _objectSpread2({}, nodeViews, _defineProperty({}, extension.name, nodeView));
      }, {});
    }
  }, {
    key: "dispatchTransaction",
    value: function dispatchTransaction(transaction) {
      var newState = this.state.apply(transaction);
      this.view.updateState(newState);
      this.selection = {
        from: this.state.selection.from,
        to: this.state.selection.to
      };
      this.setActiveNodesAndMarks();
      this.emit('transaction', {
        getHTML: this.getHTML.bind(this),
        getJSON: this.getJSON.bind(this),
        state: this.state,
        transaction: transaction
      });

      if (!transaction.docChanged || transaction.getMeta('preventUpdate')) {
        return;
      }

      this.emitUpdate(transaction);
    }
  }, {
    key: "emitUpdate",
    value: function emitUpdate(transaction) {
      this.emit('update', {
        getHTML: this.getHTML.bind(this),
        getJSON: this.getJSON.bind(this),
        state: this.state,
        transaction: transaction
      });
    }
  }, {
    key: "resolveSelection",
    value: function resolveSelection() {
      var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (this.selection && position === null) {
        return this.selection;
      }

      if (position === 'start' || position === true) {
        return {
          from: 0,
          to: 0
        };
      }

      if (position === 'end') {
        var doc = this.state.doc;
        return {
          from: doc.content.size,
          to: doc.content.size
        };
      }

      return {
        from: position,
        to: position
      };
    }
  }, {
    key: "focus",
    value: function focus() {
      var _this6 = this;

      var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (this.view.focused && position === null || position === false) {
        return;
      }

      var _this$resolveSelectio = this.resolveSelection(position),
          from = _this$resolveSelectio.from,
          to = _this$resolveSelectio.to;

      this.setSelection(from, to);
      setTimeout(function () {
        return _this6.view.focus();
      }, 10);
    }
  }, {
    key: "setSelection",
    value: function setSelection() {
      var from = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var to = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var _this$state = this.state,
          doc = _this$state.doc,
          tr = _this$state.tr;
      var resolvedFrom = minMax(from, 0, doc.content.size);
      var resolvedEnd = minMax(to, 0, doc.content.size);
      var selection = TextSelection.create(doc, resolvedFrom, resolvedEnd);
      var transaction = tr.setSelection(selection);
      this.view.dispatch(transaction);
    }
  }, {
    key: "blur",
    value: function blur() {
      this.view.dom.blur();
    }
  }, {
    key: "getSchemaJSON",
    value: function getSchemaJSON() {
      return JSON.parse(JSON.stringify({
        nodes: this.extensions.nodes,
        marks: this.extensions.marks
      }));
    }
  }, {
    key: "getHTML",
    value: function getHTML() {
      var div = document.createElement('div');
      var fragment = DOMSerializer.fromSchema(this.schema).serializeFragment(this.state.doc.content);
      div.appendChild(fragment);
      return div.innerHTML;
    }
  }, {
    key: "getJSON",
    value: function getJSON() {
      return this.state.doc.toJSON();
    }
  }, {
    key: "setContent",
    value: function setContent() {
      var content = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var emitUpdate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var parseOptions = arguments.length > 2 ? arguments[2] : undefined;
      var _this$state2 = this.state,
          doc = _this$state2.doc,
          tr = _this$state2.tr;
      var document = this.createDocument(content, parseOptions);
      var selection = TextSelection.create(doc, 0, doc.content.size);
      var transaction = tr.setSelection(selection).replaceSelectionWith(document, false).setMeta('preventUpdate', !emitUpdate);
      this.view.dispatch(transaction);
    }
  }, {
    key: "clearContent",
    value: function clearContent() {
      var emitUpdate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      this.setContent(this.options.emptyDocument, emitUpdate);
    }
  }, {
    key: "setActiveNodesAndMarks",
    value: function setActiveNodesAndMarks() {
      var _this7 = this;

      this.activeMarks = Object.entries(this.schema.marks).reduce(function (marks, _ref2) {
        var _ref3 = _slicedToArray(_ref2, 2),
            name = _ref3[0],
            mark = _ref3[1];

        return _objectSpread2({}, marks, _defineProperty({}, name, function () {
          var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          return markIsActive(_this7.state, mark, attrs);
        }));
      }, {});
      this.activeMarkAttrs = Object.entries(this.schema.marks).reduce(function (marks, _ref4) {
        var _ref5 = _slicedToArray(_ref4, 2),
            name = _ref5[0],
            mark = _ref5[1];

        return _objectSpread2({}, marks, _defineProperty({}, name, getMarkAttrs(_this7.state, mark)));
      }, {});
      this.activeNodes = Object.entries(this.schema.nodes).reduce(function (nodes, _ref6) {
        var _ref7 = _slicedToArray(_ref6, 2),
            name = _ref7[0],
            node = _ref7[1];

        return _objectSpread2({}, nodes, _defineProperty({}, name, function () {
          var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          return nodeIsActive(_this7.state, node, attrs);
        }));
      }, {});
    }
  }, {
    key: "getMarkAttrs",
    value: function getMarkAttrs() {
      var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      return this.activeMarkAttrs[type];
    }
  }, {
    key: "registerPlugin",
    value: function registerPlugin() {
      var plugin = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (!plugin) {
        return;
      }

      var newState = this.state.reconfigure({
        plugins: this.state.plugins.concat([plugin])
      });
      this.view.updateState(newState);
    }
  }, {
    key: "unregisterPlugin",
    value: function unregisterPlugin() {
      var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (!name || !this.view.docView) {
        return;
      }

      var newState = this.state.reconfigure({
        plugins: this.state.plugins.filter(function (plugin) {
          return !plugin.key.startsWith("".concat(name, "$"));
        })
      });
      this.view.updateState(newState);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      if (!this.view) {
        return;
      }

      this.view.destroy();
    }
  }, {
    key: "builtInExtensions",
    get: function get() {
      if (!this.options.useBuiltInExtensions) {
        return [];
      }

      return [new Doc(), new Text(), new Paragraph()];
    }
  }, {
    key: "state",
    get: function get() {
      return this.view ? this.view.state : null;
    }
  }, {
    key: "isActive",
    get: function get() {
      return Object.entries(_objectSpread2({}, this.activeMarks, {}, this.activeNodes)).reduce(function (types, _ref8) {
        var _ref9 = _slicedToArray(_ref8, 2),
            name = _ref9[0],
            value = _ref9[1];

        return _objectSpread2({}, types, _defineProperty({}, name, function () {
          var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          return value(attrs);
        }));
      }, {});
    }
  }]);

  return Editor;
}(Emitter);

var EditorContent = {
  props: {
    editor: {
      default: null,
      type: Object
    }
  },
  watch: {
    editor: {
      immediate: true,
      handler: function handler(editor) {
        var _this = this;

        if (editor && editor.element) {
          this.$nextTick(function () {
            _this.$el.appendChild(editor.element.firstChild);

            editor.setParentComponent(_this);
          });
        }
      }
    }
  },
  render: function render(createElement) {
    return createElement('div');
  },
  beforeDestroy: function beforeDestroy() {
    this.editor.element = this.$el;
  }
};

var Menu =
/*#__PURE__*/
function () {
  function Menu(_ref) {
    var _this = this;

    var options = _ref.options;

    _classCallCheck(this, Menu);

    this.options = options;
    this.preventHide = false; // the mousedown event is fired before blur so we can prevent it

    this.mousedownHandler = this.handleClick.bind(this);
    this.options.element.addEventListener('mousedown', this.mousedownHandler);
    this.options.editor.on('blur', function () {
      if (_this.preventHide) {
        _this.preventHide = false;
        return;
      }

      _this.options.editor.emit('menubar:focusUpdate', false);
    });
  }

  _createClass(Menu, [{
    key: "handleClick",
    value: function handleClick() {
      this.preventHide = true;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.options.element.removeEventListener('mousedown', this.mousedownHandler);
    }
  }]);

  return Menu;
}();

function MenuBar (options) {
  return new Plugin({
    key: new PluginKey('menu_bar'),
    view: function view(editorView) {
      return new Menu({
        editorView: editorView,
        options: options
      });
    }
  });
}

var EditorMenuBar = {
  props: {
    editor: {
      default: null,
      type: Object
    }
  },
  data: function data() {
    return {
      focused: false
    };
  },
  watch: {
    editor: {
      immediate: true,
      handler: function handler(editor) {
        var _this = this;

        if (editor) {
          this.$nextTick(function () {
            editor.registerPlugin(MenuBar({
              editor: editor,
              element: _this.$el
            }));
            _this.focused = editor.focused;
            editor.on('focus', function () {
              _this.focused = true;
            });
            editor.on('menubar:focusUpdate', function (focused) {
              _this.focused = focused;
            });
          });
        }
      }
    }
  },
  render: function render() {
    if (!this.editor) {
      return null;
    }

    return this.$scopedSlots.default({
      focused: this.focused,
      focus: this.editor.focus,
      commands: this.editor.commands,
      isActive: this.editor.isActive,
      getMarkAttrs: this.editor.getMarkAttrs.bind(this.editor)
    });
  }
};

function textRange(node, from, to) {
  var range = document.createRange();
  range.setEnd(node, to == null ? node.nodeValue.length : to);
  range.setStart(node, from || 0);
  return range;
}

function singleRect(object, bias) {
  var rects = object.getClientRects();
  return !rects.length ? object.getBoundingClientRect() : rects[bias < 0 ? 0 : rects.length - 1];
}

function coordsAtPos(view, pos) {
  var end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var _view$docView$domFrom = view.docView.domFromPos(pos),
      node = _view$docView$domFrom.node,
      offset = _view$docView$domFrom.offset;

  var side;
  var rect;

  if (node.nodeType === 3) {
    if (end && offset < node.nodeValue.length) {
      rect = singleRect(textRange(node, offset - 1, offset), -1);
      side = 'right';
    } else if (offset < node.nodeValue.length) {
      rect = singleRect(textRange(node, offset, offset + 1), -1);
      side = 'left';
    }
  } else if (node.firstChild) {
    if (offset < node.childNodes.length) {
      var child = node.childNodes[offset];
      rect = singleRect(child.nodeType === 3 ? textRange(child) : child, -1);
      side = 'left';
    }

    if ((!rect || rect.top === rect.bottom) && offset) {
      var _child = node.childNodes[offset - 1];
      rect = singleRect(_child.nodeType === 3 ? textRange(_child) : _child, 1);
      side = 'right';
    }
  } else {
    rect = node.getBoundingClientRect();
    side = 'left';
  }

  var x = rect[side];
  return {
    top: rect.top,
    bottom: rect.bottom,
    left: x,
    right: x
  };
}

var Menu$1 =
/*#__PURE__*/
function () {
  function Menu(_ref) {
    var _this = this;

    var options = _ref.options,
        editorView = _ref.editorView;

    _classCallCheck(this, Menu);

    this.options = _objectSpread2({}, {
      element: null,
      keepInBounds: true,
      onUpdate: function onUpdate() {
        return false;
      }
    }, {}, options);
    this.editorView = editorView;
    this.isActive = false;
    this.left = 0;
    this.bottom = 0;
    this.top = 0;
    this.preventHide = false; // the mousedown event is fired before blur so we can prevent it

    this.mousedownHandler = this.handleClick.bind(this);
    this.options.element.addEventListener('mousedown', this.mousedownHandler);
    this.options.editor.on('focus', function (_ref2) {
      var view = _ref2.view;

      _this.update(view);
    });
    this.options.editor.on('blur', function (_ref3) {
      var event = _ref3.event;

      if (_this.preventHide) {
        _this.preventHide = false;
        return;
      }

      _this.hide(event);
    });
  }

  _createClass(Menu, [{
    key: "handleClick",
    value: function handleClick() {
      this.preventHide = true;
    }
  }, {
    key: "update",
    value: function update(view, lastState) {
      var state = view.state;

      if (view.composing) {
        return;
      } // Don't do anything if the document/selection didn't change


      if (lastState && lastState.doc.eq(state.doc) && lastState.selection.eq(state.selection)) {
        return;
      } // Hide the tooltip if the selection is empty


      if (state.selection.empty) {
        this.hide();
        return;
      } // Otherwise, reposition it and update its content


      var _state$selection = state.selection,
          from = _state$selection.from,
          to = _state$selection.to; // These are in screen coordinates
      // We can't use EditorView.cordsAtPos here because it can't handle linebreaks correctly
      // See: https://github.com/ProseMirror/prosemirror-view/pull/47

      var start = coordsAtPos(view, from);
      var end = coordsAtPos(view, to, true); // The box in which the tooltip is positioned, to use as base

      var parent = this.options.element.offsetParent;

      if (!parent) {
        this.hide();
        return;
      }

      var box = parent.getBoundingClientRect();
      var el = this.options.element.getBoundingClientRect(); // Find a center-ish x position from the selection endpoints (when
      // crossing lines, end may be more to the left)

      var left = (start.left + end.left) / 2 - box.left; // Keep the menuBubble in the bounding box of the offsetParent i

      this.left = Math.round(this.options.keepInBounds ? Math.min(box.width - el.width / 2, Math.max(left, el.width / 2)) : left);
      this.bottom = Math.round(box.bottom - start.top);
      this.top = Math.round(end.bottom - box.top);
      this.isActive = true;
      this.sendUpdate();
    }
  }, {
    key: "sendUpdate",
    value: function sendUpdate() {
      this.options.onUpdate({
        isActive: this.isActive,
        left: this.left,
        bottom: this.bottom,
        top: this.top
      });
    }
  }, {
    key: "hide",
    value: function hide(event) {
      if (event && event.relatedTarget && this.options.element.parentNode.contains(event.relatedTarget)) {
        return;
      }

      this.isActive = false;
      this.sendUpdate();
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.options.element.removeEventListener('mousedown', this.mousedownHandler);
    }
  }]);

  return Menu;
}();

function MenuBubble (options) {
  return new Plugin({
    key: new PluginKey('menu_bubble'),
    view: function view(editorView) {
      return new Menu$1({
        editorView: editorView,
        options: options
      });
    }
  });
}

var EditorMenuBubble = {
  props: {
    editor: {
      default: null,
      type: Object
    },
    keepInBounds: {
      default: true,
      type: Boolean
    }
  },
  data: function data() {
    return {
      menu: {
        isActive: false,
        left: 0,
        bottom: 0
      }
    };
  },
  watch: {
    editor: {
      immediate: true,
      handler: function handler(editor) {
        var _this = this;

        if (editor) {
          this.$nextTick(function () {
            editor.registerPlugin(MenuBubble({
              editor: editor,
              element: _this.$el,
              keepInBounds: _this.keepInBounds,
              onUpdate: function onUpdate(menu) {
                // the second check ensures event is fired only once
                if (menu.isActive && _this.menu.isActive === false) {
                  _this.$emit('show', menu);
                } else if (!menu.isActive && _this.menu.isActive === true) {
                  _this.$emit('hide', menu);
                }

                _this.menu = menu;
              }
            }));
          });
        }
      }
    }
  },
  render: function render() {
    if (!this.editor) {
      return null;
    }

    return this.$scopedSlots.default({
      focused: this.editor.view.focused,
      focus: this.editor.focus,
      commands: this.editor.commands,
      isActive: this.editor.isActive,
      getMarkAttrs: this.editor.getMarkAttrs.bind(this.editor),
      menu: this.menu
    });
  },
  beforeDestroy: function beforeDestroy() {
    this.editor.unregisterPlugin('menu_bubble');
  }
};

var Menu$2 =
/*#__PURE__*/
function () {
  function Menu(_ref) {
    var _this = this;

    var options = _ref.options,
        editorView = _ref.editorView;

    _classCallCheck(this, Menu);

    this.options = _objectSpread2({}, {
      resizeObserver: true,
      element: null,
      onUpdate: function onUpdate() {
        return false;
      }
    }, {}, options);
    this.preventHide = false;
    this.editorView = editorView;
    this.isActive = false;
    this.top = 0; // the mousedown event is fired before blur so we can prevent it

    this.mousedownHandler = this.handleClick.bind(this);
    this.options.element.addEventListener('mousedown', this.mousedownHandler);
    this.options.editor.on('focus', function (_ref2) {
      var view = _ref2.view;

      _this.update(view);
    });
    this.options.editor.on('blur', function (_ref3) {
      var event = _ref3.event;

      if (_this.preventHide) {
        _this.preventHide = false;
        return;
      }

      _this.hide(event);
    }); // sometimes we have to update the position
    // because of a loaded images for example

    if (this.options.resizeObserver && window.ResizeObserver) {
      this.resizeObserver = new ResizeObserver(function () {
        if (_this.isActive) {
          _this.update(_this.editorView);
        }
      });
      this.resizeObserver.observe(this.editorView.dom);
    }
  }

  _createClass(Menu, [{
    key: "handleClick",
    value: function handleClick() {
      this.preventHide = true;
    }
  }, {
    key: "update",
    value: function update(view, lastState) {
      var state = view.state; // Don't do anything if the document/selection didn't change

      if (lastState && lastState.doc.eq(state.doc) && lastState.selection.eq(state.selection)) {
        return;
      }

      if (!state.selection.empty) {
        this.hide();
        return;
      }

      var currentDom = view.domAtPos(state.selection.anchor);
      var isActive = currentDom.node.innerHTML === '<br>' && currentDom.node.tagName === 'P' && currentDom.node.parentNode === view.dom;

      if (!isActive) {
        this.hide();
        return;
      }

      var parent = this.options.element.offsetParent;

      if (!parent) {
        this.hide();
        return;
      }

      var editorBoundings = parent.getBoundingClientRect();
      var cursorBoundings = view.coordsAtPos(state.selection.anchor);
      var top = cursorBoundings.top - editorBoundings.top;
      this.isActive = true;
      this.top = top;
      this.sendUpdate();
    }
  }, {
    key: "sendUpdate",
    value: function sendUpdate() {
      this.options.onUpdate({
        isActive: this.isActive,
        top: this.top
      });
    }
  }, {
    key: "hide",
    value: function hide(event) {
      if (event && event.relatedTarget && this.options.element.parentNode.contains(event.relatedTarget)) {
        return;
      }

      this.isActive = false;
      this.sendUpdate();
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.options.element.removeEventListener('mousedown', this.mousedownHandler);

      if (this.resizeObserver) {
        this.resizeObserver.unobserve(this.editorView.dom);
      }
    }
  }]);

  return Menu;
}();

function FloatingMenu (options) {
  return new Plugin({
    key: new PluginKey('floating_menu'),
    view: function view(editorView) {
      return new Menu$2({
        editorView: editorView,
        options: options
      });
    }
  });
}

var EditorFloatingMenu = {
  props: {
    editor: {
      default: null,
      type: Object
    }
  },
  data: function data() {
    return {
      menu: {
        isActive: false,
        left: 0,
        bottom: 0
      }
    };
  },
  watch: {
    editor: {
      immediate: true,
      handler: function handler(editor) {
        var _this = this;

        if (editor) {
          this.$nextTick(function () {
            editor.registerPlugin(FloatingMenu({
              editor: editor,
              element: _this.$el,
              onUpdate: function onUpdate(menu) {
                // the second check ensures event is fired only once
                if (menu.isActive && _this.menu.isActive === false) {
                  _this.$emit('show', menu);
                } else if (!menu.isActive && _this.menu.isActive === true) {
                  _this.$emit('hide', menu);
                }

                _this.menu = menu;
              }
            }));
          });
        }
      }
    }
  },
  render: function render() {
    if (!this.editor) {
      return null;
    }

    return this.$scopedSlots.default({
      focused: this.editor.view.focused,
      focus: this.editor.focus,
      commands: this.editor.commands,
      isActive: this.editor.isActive,
      getMarkAttrs: this.editor.getMarkAttrs.bind(this.editor),
      menu: this.menu
    });
  },
  beforeDestroy: function beforeDestroy() {
    this.editor.unregisterPlugin('floating_menu');
  }
};

export { Doc, Editor, EditorContent, EditorFloatingMenu, EditorMenuBar, EditorMenuBubble, Extension, Mark, Node, Paragraph, Text };
