import { ModernAppState, ModernAction } from "./types";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const defaultState = {
  makiTree: null,
  volume: 127,
  mousePosX: 0,
  mousePosY: 0,
  xmlTree: null,
  skinLoaded: false,
};

function reducer(
  state: ModernAppState = defaultState,
  action: ModernAction
): ModernAppState {
  switch (action.type) {
    case "SET_MAKI_TREE":
      return { ...state, makiTree: action.makiTree, skinLoaded: true };
    case "SET_XML_TREE":
      return { ...state, xmlTree: action.xmlTree };
    case "SET_VOLUME":
      return { ...state, volume: action.volume };
    case "SET_MOUSEPOSITION":
      return {
        ...state,
        mousePosX: action.mousePosX,
        mousePosY: action.mousePosY,
      };

    default:
      return state;
  }
}

export function create() {
  return createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
}
