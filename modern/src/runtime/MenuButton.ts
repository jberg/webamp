import GuiObject from "./GuiObject";
import { unimplementedWarning } from "../utils";

class MenuButton extends GuiObject {
  /**
   * getClassName()
   *
   * Returns the class name for the object.
   * @ret The class name.
   */
  getclassname() {
    return "MenuButton";
  }

  onopenmenu(): void {
    this.js_trigger("onOpenMenu");
  }

  onclosemenu(): void {
    this.js_trigger("onCloseMenu");
  }

  onselectitem(item: string): void {
    this.js_trigger("onSelectItem", item);
  }

  openmenu() {
    unimplementedWarning("openmenu");
    return;
  }

  closemenu() {
    unimplementedWarning("closemenu");
    return;
  }
}

export default MenuButton;
