import { getClass } from "./objects";
import runtime from "../runtime";

const getMakiMethods = obj =>
  Object.getOwnPropertyNames(obj).filter(name => {
    return (
      typeof obj[name] === "function" &&
      !name.startsWith("js_") &&
      !name.startsWith("_") &&
      name !== "constructor"
    );
  });

for (const [key, Klass] of Object.entries(runtime)) {
  const obj = getClass(key);
  describe(`${obj.name}`, () => {
    test("implements getclassname()", () => {
      expect(Klass.prototype.getclassname()).toBe(obj.name);
    });
    test("has the correct parent", () => {
      const Parent = Object.getPrototypeOf(Klass);
      if (Klass.prototype.getclassname() === "Object") {
        expect(Parent.prototype).toBe(undefined);
        return;
      }
      expect(Parent.prototype.getclassname()).toBe(obj.parent);
    });
    describe("methods have the correct arity", () => {
      obj.functions.forEach(func => {
        const methodName = func.name.toLowerCase();
        // Once all methods are implemented this check can be removed.
        // For now we have a separate test which checks that we haven't
        // regressed on the methods we've implemented.
        const hasMethodOnSelf = Klass.prototype.hasOwnProperty(methodName);
        expect(hasMethodOnSelf).toBe(true);
        if (!hasMethodOnSelf) {
          return;
        }
        const actual = Klass.prototype[func.name.toLowerCase()].length;
        test(`${obj.name}.${func.name} has an arity of ${actual}`, () => {
          expect(func.parameters.length).toBe(actual);
        });
      });
    });
  });
}

describe("Maki classes", () => {
  const runtimeMethods = new Set();
  const unimplementedRuntimeMethods = new Set();
  const objectMethods = new Set();
  for (const [key, Klass] of Object.entries(runtime)) {
    const obj = getClass(key);
    getMakiMethods(Klass.prototype).forEach(methodName => {
      runtimeMethods.add(`${obj.name}.${methodName}`);
      const methodSource = Klass.prototype[methodName].toString();
      if (methodSource.includes("unimplementedWarning")) {
        unimplementedRuntimeMethods.add(`${obj.name}.${methodName}`);
      }
    });
    obj.functions.forEach(func => {
      objectMethods.add(`${obj.name}.${func.name.toLowerCase()}`);
    });
  }

  test("have no extra methods", () => {
    // getclassname _should_ be implemented on Object and let each class inherit
    // it. However it's far easier to implement it on each class directly, so
    // we'll allow that.
    function isntGetClassname(method) {
      return !/\.getclassname$/.test(method);
    }

    function isntMakiMethod(method) {
      return !objectMethods.has(method);
    }

    const extra = [...runtimeMethods]
      .filter(isntMakiMethod)
      .filter(isntGetClassname);

    expect(extra).toEqual([]);
  });

  test("There are no missing methods", () => {
    const missing = [...objectMethods].filter(x => !runtimeMethods.has(x));

    expect(missing).toEqual([]);
  });

  test("Track unimplemented methods", () => {
    expect(unimplementedRuntimeMethods).toMatchInlineSnapshot(`
Set {
  "Object.onnotify",
  "System.gettoken",
  "System.getparam",
  "System.getskinname",
  "System.getplayitemstring",
  "System.geteq",
  "System.oneqchanged",
  "System.geteqband",
  "System.geteqpreamp",
  "System.getstatus",
  "System.getplayitemlength",
  "System.seekto",
  "System.onscriptloaded",
  "System.onscriptunloading",
  "System.onquit",
  "System.onsetxuiparam",
  "System.onkeydown",
  "System.onaccelerator",
  "System.oncreatelayout",
  "System.onshowlayout",
  "System.onhidelayout",
  "System.onstop",
  "System.onplay",
  "System.onpause",
  "System.onresume",
  "System.ontitlechange",
  "System.ontitle2change",
  "System.oninfochange",
  "System.onstatusmsg",
  "System.oneqbandchanged",
  "System.oneqpreampchanged",
  "System.onvolumechanged",
  "System.onseek",
  "System.newdynamiccontainer",
  "System.newgroup",
  "System.newgroupaslayout",
  "System.getnumcontainers",
  "System.enumcontainer",
  "System.getwac",
  "System.getplayitemmetadatastring",
  "System.getplayitemdisplaytitle",
  "System.getextfamily",
  "System.playfile",
  "System.play",
  "System.stop",
  "System.pause",
  "System.next",
  "System.previous",
  "System.eject",
  "System.getposition",
  "System.seteqband",
  "System.seteqpreamp",
  "System.seteq",
  "System.getmouseposx",
  "System.getmouseposy",
  "System.integertolongtime",
  "System.integertotime",
  "System.datetotime",
  "System.datetolongtime",
  "System.formatdate",
  "System.formatlongdate",
  "System.getdateyear",
  "System.getdatemonth",
  "System.getdateday",
  "System.getdatedow",
  "System.getdatedoy",
  "System.getdatehour",
  "System.getdatemin",
  "System.getdatesec",
  "System.getdatedst",
  "System.getdate",
  "System.strmid",
  "System.strleft",
  "System.strright",
  "System.strsearch",
  "System.removepath",
  "System.getpath",
  "System.getextension",
  "System.setpublicstring",
  "System.setpublicint",
  "System.getpublicstring",
  "System.getpublicint",
  "System.getviewportwidthfrompoint",
  "System.getviewportheightfrompoint",
  "System.getviewportleft",
  "System.getviewportleftfrompoint",
  "System.getviewporttop",
  "System.getviewporttopfrompoint",
  "System.debugstring",
  "System.ddesend",
  "System.onlookforcomponent",
  "System.getcurappleft",
  "System.getcurapptop",
  "System.getcurappwidth",
  "System.getcurappheight",
  "System.isappactive",
  "System.switchskin",
  "System.isloadingskin",
  "System.lockui",
  "System.unlockui",
  "System.getmainbrowser",
  "System.popmainbrowser",
  "System.navigateurl",
  "System.isobjectvalid",
  "System.integer",
  "System.frac",
  "System.gettimeofday",
  "System.setmenutransparency",
  "System.ongetcancelcomponent",
  "System.iskeydown",
  "System.setclipboardtext",
  "System.selectfile",
  "System.systemmenu",
  "System.windowmenu",
  "System.triggeraction",
  "System.showwindow",
  "System.hidewindow",
  "System.hidenamedwindow",
  "System.isnamedwindowvisible",
  "System.setatom",
  "System.getatom",
  "System.invokedebugger",
  "System.isvideo",
  "System.isvideofullscreen",
  "System.getidealvideowidth",
  "System.getidealvideoheight",
  "System.isminimized",
  "System.minimizeapplication",
  "System.restoreapplication",
  "System.activateapplication",
  "System.getplaylistlength",
  "System.getplaylistindex",
  "System.isdesktopalphaavailable",
  "System.istransparencyavailable",
  "System.onshownotification",
  "System.getsonginfotext",
  "System.getvisband",
  "Wac.getguid",
  "Wac.getname",
  "Wac.sendcommand",
  "Wac.show",
  "Wac.hide",
  "Wac.isvisible",
  "Wac.onnotify",
  "Wac.onshow",
  "Wac.onhide",
  "Wac.setstatusbar",
  "Wac.getstatusbar",
  "Map.loadmap",
  "Map.getwidth",
  "Map.getheight",
  "Map.getvalue",
  "Map.inregion",
  "Map.getregion",
  "Region.loadfrommap",
  "Region.offset",
  "Region.add",
  "Region.sub",
  "Region.stretch",
  "Region.copy",
  "Region.loadfrombitmap",
  "Region.getboundingboxx",
  "Region.getboundingboxy",
  "Region.getboundingboxw",
  "Region.getboundingboxh",
  "Timer.setdelay",
  "Timer.start",
  "Timer.stop",
  "Timer.ontimer",
  "Timer.getdelay",
  "Timer.isrunning",
  "Timer.getskipped",
  "Group.getnumobjects",
  "Group.enumobject",
  "Group.oncreateobject",
  "Group.getmouseposx",
  "Group.getmouseposy",
  "Group.islayout",
  "GuiObject.onsetvisible",
  "GuiObject.getalpha",
  "GuiObject.onleftbuttonup",
  "GuiObject.onleftbuttondown",
  "GuiObject.onrightbuttonup",
  "GuiObject.onrightbuttondown",
  "GuiObject.onrightbuttondblclk",
  "GuiObject.onleftbuttondblclk",
  "GuiObject.onmousemove",
  "GuiObject.onenterarea",
  "GuiObject.onleavearea",
  "GuiObject.setenabled",
  "GuiObject.getenabled",
  "GuiObject.onenable",
  "GuiObject.onresize",
  "GuiObject.ismouseover",
  "GuiObject.settargetx",
  "GuiObject.settargety",
  "GuiObject.settargetw",
  "GuiObject.settargeth",
  "GuiObject.settargeta",
  "GuiObject.settargetspeed",
  "GuiObject.gototarget",
  "GuiObject.ontargetreached",
  "GuiObject.canceltarget",
  "GuiObject.reversetarget",
  "GuiObject.onstartup",
  "GuiObject.isgoingtotarget",
  "GuiObject.bringtofront",
  "GuiObject.bringtoback",
  "GuiObject.bringabove",
  "GuiObject.bringbelow",
  "GuiObject.getguix",
  "GuiObject.getguiy",
  "GuiObject.getguiw",
  "GuiObject.getguih",
  "GuiObject.getguirelatx",
  "GuiObject.getguirelaty",
  "GuiObject.getguirelatw",
  "GuiObject.getguirelath",
  "GuiObject.isactive",
  "GuiObject.gettopparent",
  "GuiObject.runmodal",
  "GuiObject.endmodal",
  "GuiObject.findobjectxy",
  "GuiObject.getname",
  "GuiObject.clienttoscreenx",
  "GuiObject.clienttoscreeny",
  "GuiObject.clienttoscreenw",
  "GuiObject.clienttoscreenh",
  "GuiObject.screentoclientx",
  "GuiObject.screentoclienty",
  "GuiObject.screentoclientw",
  "GuiObject.screentoclienth",
  "GuiObject.getautowidth",
  "GuiObject.getautoheight",
  "GuiObject.setfocus",
  "GuiObject.onchar",
  "GuiObject.onaccelerator",
  "GuiObject.ismouseoverrect",
  "GuiObject.getinterface",
  "GuiObject.onkeydown",
  "GuiObject.onkeyup",
  "GuiObject.ongetfocus",
  "GuiObject.onkillfocus",
  "GuiObject.sendaction",
  "GuiObject.onaction",
  "Button.onactivate",
  "Button.setactivated",
  "Button.getactivated",
  "Button.onleftclick",
  "Button.onrightclick",
  "Button.setactivatednocallback",
  "AnimatedLayer.onplay",
  "AnimatedLayer.onpause",
  "AnimatedLayer.onresume",
  "AnimatedLayer.onstop",
  "AnimatedLayer.onframe",
  "AnimatedLayer.ispaused",
  "AnimatedLayer.isstopped",
  "AnimatedLayer.getdirection",
  "AnimatedLayer.setrealtime",
  "ToggleButton.ontoggle",
  "ToggleButton.getcurcfgval",
  "PopupMenu.checkcommand",
  "PopupMenu.addsubmenu",
  "PopupMenu.popatxy",
  "PopupMenu.getnumcommands",
  "PopupMenu.disablecommand",
  "Container.onswitchtolayout",
  "Container.onbeforeswitchtolayout",
  "Container.onhidelayout",
  "Container.onshowlayout",
  "Container.getnumlayouts",
  "Container.enumlayout",
  "Container.switchtolayout",
  "Container.close",
  "Container.toggle",
  "Container.isdynamic",
  "Container.setname",
  "Container.getcurlayout",
  "Layout.ondock",
  "Layout.onundock",
  "Layout.onscale",
  "Layout.getscale",
  "Layout.setscale",
  "Layout.setdesktopalpha",
  "Layout.getdesktopalpha",
  "Layout.center",
  "Layout.onmove",
  "Layout.onendmove",
  "Layout.onuserresize",
  "Layout.snapadjust",
  "Layout.getsnapadjusttop",
  "Layout.getsnapadjustright",
  "Layout.getsnapadjustleft",
  "Layout.getsnapadjustbottom",
  "Layout.setredrawonresize",
  "Layout.beforeredock",
  "Layout.redock",
  "Layout.istransparencysafe",
  "Layout.islayoutanimationsafe",
  "Layout.onmouseenterlayout",
  "Layout.onmouseleavelayout",
  "Layout.onsnapadjustchanged",
  "List.additem",
  "List.removeitem",
  "List.enumitem",
  "List.finditem",
  "List.getnumitems",
  "List.removeall",
  "Layer.setregion",
  "Layer.setregionfrommap",
  "Layer.onbeginresize",
  "Layer.onendresize",
  "Layer.fx_oninit",
  "Layer.fx_onframe",
  "Layer.fx_ongetpixelr",
  "Layer.fx_ongetpixeld",
  "Layer.fx_ongetpixelx",
  "Layer.fx_ongetpixely",
  "Layer.fx_ongetpixela",
  "Layer.fx_setenabled",
  "Layer.fx_getenabled",
  "Layer.fx_setwrap",
  "Layer.fx_getwrap",
  "Layer.fx_setrect",
  "Layer.fx_getrect",
  "Layer.fx_setbgfx",
  "Layer.fx_getbgfx",
  "Layer.fx_setclear",
  "Layer.fx_getclear",
  "Layer.fx_setspeed",
  "Layer.fx_getspeed",
  "Layer.fx_setrealtime",
  "Layer.fx_getrealtime",
  "Layer.fx_setlocalized",
  "Layer.fx_getlocalized",
  "Layer.fx_setbilinear",
  "Layer.fx_getbilinear",
  "Layer.fx_setalphamode",
  "Layer.fx_getalphamode",
  "Layer.fx_setgridsize",
  "Layer.fx_update",
  "Layer.fx_restart",
  "Text.setalternatetext",
  "Text.settext",
  "Text.gettext",
  "Text.gettextwidth",
  "Text.ontextchanged",
  "Component.ongetwac",
  "Component.ongiveupwac",
  "Component.getguid",
  "Component.getwac",
  "Component.setregionfrommap",
  "Component.setregion",
  "Component.setacceptwac",
  "Component.getcontent",
  "ComponentBucket.getmaxheight",
  "ComponentBucket.getmaxwidth",
  "ComponentBucket.setscroll",
  "ComponentBucket.getscroll",
  "ComponentBucket.getnumchildren",
  "ComponentBucket.enumchildren",
  "Edit.onenter",
  "Edit.onabort",
  "Edit.onidleeditupdate",
  "Edit.oneditupdate",
  "Edit.settext",
  "Edit.setautoenter",
  "Edit.getautoenter",
  "Edit.gettext",
  "Edit.selectall",
  "Edit.enter",
  "Edit.setidleenabled",
  "Edit.getidleenabled",
  "Slider.getposition",
  "Slider.onsetposition",
  "Slider.onpostedposition",
  "Slider.onsetfinalposition",
  "Slider.setposition",
  "Slider.lock",
  "Slider.unlock",
  "Vis.setmode",
  "Vis.onframe",
  "Vis.setrealtime",
  "Vis.getrealtime",
  "Vis.getmode",
  "Vis.nextmode",
  "Browser.navigateurl",
  "Browser.back",
  "Browser.forward",
  "Browser.stop",
  "Browser.refresh",
  "Browser.home",
  "Browser.settargetname",
  "Browser.onbeforenavigate",
  "Browser.ondocumentcomplete",
  "GroupList.instantiate",
  "GroupList.getnumitems",
  "GroupList.enumitem",
  "GroupList.removeall",
  "GroupList.scrolltopercent",
  "CfgGroup.cfggetint",
  "CfgGroup.cfgsetint",
  "CfgGroup.cfggetstring",
  "CfgGroup.cfggetfloat",
  "CfgGroup.cfgsetfloat",
  "CfgGroup.cfgsetstring",
  "CfgGroup.oncfgchanged",
  "CfgGroup.cfggetguid",
  "CfgGroup.cfggetname",
  "QueryList.onresetquery",
  "MouseRedir.setredirection",
  "MouseRedir.getredirection",
  "MouseRedir.setregionfrommap",
  "MouseRedir.setregion",
  "DropDownList.getitemselected",
  "DropDownList.onselect",
  "DropDownList.setlistheight",
  "DropDownList.openlist",
  "DropDownList.closelist",
  "DropDownList.setitems",
  "DropDownList.additem",
  "DropDownList.delitem",
  "DropDownList.finditem",
  "DropDownList.getnumitems",
  "DropDownList.selectitem",
  "DropDownList.getitemtext",
  "DropDownList.getselected",
  "DropDownList.getselectedtext",
  "DropDownList.getcustomtext",
  "DropDownList.deleteallitems",
  "DropDownList.setnoitemtext",
  "LayoutStatus.callme",
  "TabSheet.getcurpage",
  "TabSheet.setcurpage",
  "GuiList.getnumitems",
  "GuiList.getwantautodeselect",
  "GuiList.setwantautodeselect",
  "GuiList.onsetvisible",
  "GuiList.setautosort",
  "GuiList.next",
  "GuiList.selectcurrent",
  "GuiList.selectfirstentry",
  "GuiList.previous",
  "GuiList.pagedown",
  "GuiList.pageup",
  "GuiList.home",
  "GuiList.end",
  "GuiList.reset",
  "GuiList.addcolumn",
  "GuiList.getnumcolumns",
  "GuiList.getcolumnwidth",
  "GuiList.setcolumnwidth",
  "GuiList.getcolumnlabel",
  "GuiList.setcolumnlabel",
  "GuiList.getcolumnnumeric",
  "GuiList.setcolumndynamic",
  "GuiList.iscolumndynamic",
  "GuiList.setminimumsize",
  "GuiList.additem",
  "GuiList.insertitem",
  "GuiList.getlastaddeditempos",
  "GuiList.setsubitem",
  "GuiList.deleteallitems",
  "GuiList.deletebypos",
  "GuiList.getitemlabel",
  "GuiList.setitemlabel",
  "GuiList.getitemselected",
  "GuiList.isitemfocused",
  "GuiList.getitemfocused",
  "GuiList.setitemfocused",
  "GuiList.ensureitemvisible",
  "GuiList.invalidatecolumns",
  "GuiList.scrollabsolute",
  "GuiList.scrollrelative",
  "GuiList.scrollleft",
  "GuiList.scrollright",
  "GuiList.scrollup",
  "GuiList.scrolldown",
  "GuiList.getsubitemtext",
  "GuiList.getfirstitemselected",
  "GuiList.getnextitemselected",
  "GuiList.selectall",
  "GuiList.deselectall",
  "GuiList.invertselection",
  "GuiList.invalidateitem",
  "GuiList.getfirstitemvisible",
  "GuiList.getlastitemvisible",
  "GuiList.setfontsize",
  "GuiList.getfontsize",
  "GuiList.jumptonext",
  "GuiList.scrolltoitem",
  "GuiList.resort",
  "GuiList.getsortdirection",
  "GuiList.getsortcolumn",
  "GuiList.setsortcolumn",
  "GuiList.setsortdirection",
  "GuiList.getitemcount",
  "GuiList.setselectionstart",
  "GuiList.setselectionend",
  "GuiList.setselected",
  "GuiList.toggleselection",
  "GuiList.getheaderheight",
  "GuiList.getpreventmultipleselection",
  "GuiList.setpreventmultipleselection",
  "GuiList.moveitem",
  "GuiList.onselectall",
  "GuiList.ondelete",
  "GuiList.ondoubleclick",
  "GuiList.onleftclick",
  "GuiList.onsecondleftclick",
  "GuiList.onrightclick",
  "GuiList.oncolumndblclick",
  "GuiList.oncolumnlabelclick",
  "GuiList.onitemselection",
  "GuiTree.onwantautocontextmenu",
  "GuiTree.onmousewheelup",
  "GuiTree.onmousewheeldown",
  "GuiTree.oncontextmenu",
  "GuiTree.onchar",
  "GuiTree.onitemrecvdrop",
  "GuiTree.onlabelchange",
  "GuiTree.onitemselected",
  "GuiTree.onitemdeselected",
  "GuiTree.getnumrootitems",
  "GuiTree.enumrootitem",
  "GuiTree.jumptonext",
  "GuiTree.ensureitemvisible",
  "GuiTree.getcontentswidth",
  "GuiTree.getcontentsheight",
  "GuiTree.addtreeitem",
  "GuiTree.removetreeitem",
  "GuiTree.movetreeitem",
  "GuiTree.deleteallitems",
  "GuiTree.expanditem",
  "GuiTree.expanditemdeferred",
  "GuiTree.collapseitem",
  "GuiTree.collapseitemdeferred",
  "GuiTree.selectitem",
  "GuiTree.selectitemdeferred",
  "GuiTree.delitemdeferred",
  "GuiTree.hiliteitem",
  "GuiTree.unhiliteitem",
  "GuiTree.getcuritem",
  "GuiTree.hittest",
  "GuiTree.edititemlabel",
  "GuiTree.canceleditlabel",
  "GuiTree.setautoedit",
  "GuiTree.getautoedit",
  "GuiTree.getbylabel",
  "GuiTree.setsorted",
  "GuiTree.getsorted",
  "GuiTree.sorttreeitems",
  "GuiTree.getsibling",
  "GuiTree.setautocollapse",
  "GuiTree.setfontsize",
  "GuiTree.getfontsize",
  "GuiTree.getnumvisiblechilditems",
  "GuiTree.getnumvisibleitems",
  "GuiTree.enumvisibleitems",
  "GuiTree.enumvisiblechilditems",
  "GuiTree.enumallitems",
  "GuiTree.getitemrectx",
  "GuiTree.getitemrecty",
  "GuiTree.getitemrectw",
  "GuiTree.getitemrecth",
  "GuiTree.getitemfrompoint",
  "TreeItem.getnumchildren",
  "TreeItem.setlabel",
  "TreeItem.getlabel",
  "TreeItem.ensurevisible",
  "TreeItem.getnthchild",
  "TreeItem.getchild",
  "TreeItem.getchildsibling",
  "TreeItem.getsibling",
  "TreeItem.getparent",
  "TreeItem.editlabel",
  "TreeItem.hassubitems",
  "TreeItem.setsorted",
  "TreeItem.setchildtab",
  "TreeItem.issorted",
  "TreeItem.iscollapsed",
  "TreeItem.isexpanded",
  "TreeItem.invalidate",
  "TreeItem.isselected",
  "TreeItem.ishilited",
  "TreeItem.sethilited",
  "TreeItem.collapse",
  "TreeItem.expand",
  "TreeItem.gettree",
  "TreeItem.ontreeadd",
  "TreeItem.ontreeremove",
  "TreeItem.onselect",
  "TreeItem.ondeselect",
  "TreeItem.onleftdoubleclick",
  "TreeItem.onrightdoubleclick",
  "TreeItem.onchar",
  "TreeItem.onexpand",
  "TreeItem.oncollapse",
  "TreeItem.onbeginlabeledit",
  "TreeItem.onendlabeledit",
  "TreeItem.oncontextmenu",
  "MenuButton.onopenmenu",
  "MenuButton.onclosemenu",
  "MenuButton.onselectitem",
  "MenuButton.openmenu",
  "MenuButton.closemenu",
  "CheckBox.ontoggle",
  "CheckBox.setchecked",
  "CheckBox.ischecked",
  "CheckBox.settext",
  "CheckBox.gettext",
  "Config.newitem",
  "Config.getitem",
  "Config.getitembyguid",
  "ConfigItem.getattribute",
  "ConfigItem.newattribute",
  "ConfigItem.getguid",
  "ConfigAttribute.setdata",
  "ConfigAttribute.getdata",
  "ConfigAttribute.ondatachanged",
  "ConfigAttribute.getparentitem",
  "ConfigAttribute.getattributename",
}
`);
  });
});
