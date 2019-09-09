import Group from "./Group";
import MakiObject from "./MakiObject";
import {
  findDescendantByTypeAndId,
  getMousePosition,
  unimplementedWarning,
} from "../utils";
import * as Actions from "../Actions";
import * as Selectors from "../Selectors";

class System extends MakiObject {
  scriptGroup: Group;
  root: MakiObject;
  _privateInt: Map<string, Map<string, number>>;
  _privateString: Map<string, Map<string, string>>;
  constructor(scriptGroup, store) {
    super(null, null, {}, store);

    this.scriptGroup = scriptGroup == null ? new Group() : scriptGroup;
    this.root = scriptGroup;
    while (this.root.parent) {
      this.root = this.root.parent;
    }
    // TODO: Replace these with a DefaultMap once we have one.
    this._privateInt = new Map();
    this._privateString = new Map();
  }

  /**
   * getclassname()
   *
   * Returns the class name for the object.
   * @ret The class name.
   */
  getclassname() {
    return "System";
  }

  js_start() {
    this.js_trigger("onScriptLoaded");
  }

  getscriptgroup() {
    return this.scriptGroup;
  }

  getcontainer(id: string) {
    return findDescendantByTypeAndId(this.root, "container", id);
  }

  getruntimeversion() {
    return "5.666";
  }

  gettoken(str: string, separator: string, tokennum: number) {
    unimplementedWarning("gettoken");
    return "Some Token String";
  }

  getparam() {
    unimplementedWarning("getparam");
    return "Some String";
  }

  getskinname() {
    unimplementedWarning("getskinname");
    return "Some String";
  }

  getplayitemstring() {
    unimplementedWarning("getplayitemstring");
    return "Some String";
  }

  geteq() {
    unimplementedWarning("geteq");
    return 0;
  }

  oneqchanged(newstatus: number) {
    unimplementedWarning("newstatus");
  }

  geteqband(band: number) {
    unimplementedWarning("geteqband");
    return 0;
  }

  geteqpreamp() {
    unimplementedWarning("geteqpreamp");
    return 0;
  }

  getstatus() {
    unimplementedWarning("getstatus");
    return 0;
  }

  messagebox(
    message: string,
    msgtitle: string,
    flag: number,
    notanymoreId: string
  ) {
    console.log({ message, msgtitle, flag, notanymoreId });
  }

  integertostring(value: number) {
    return value.toString();
  }

  stringtointeger(str: string) {
    return parseInt(str, 10);
  }

  getprivateint(section: string, item: string, defvalue: number): number {
    if (!this._privateInt.has(section)) {
      return defvalue;
    }
    this._privateInt.get(section).get(item);
  }

  // I think `defvalue` here is a typo that we inherited from std.mi. It should just be `value`.
  setprivateint(section: string, item: string, defvalue: number): void {
    if (!this._privateInt.has(section)) {
      this._privateInt.set(section, new Map([[item, defvalue]]));
    } else {
      this._privateInt.get(section).set(item, defvalue);
    }
  }

  getleftvumeter(): number {
    return Selectors.getLeftVUMeter(this._store.getState());
  }

  getrightvumeter(): number {
    return Selectors.getRightVUMeter(this._store.getState());
  }

  // Seems like volume is 0-255
  getvolume() {
    return Selectors.getVolume(this._store.getState());
  }

  setvolume(volume: number): void {
    return this._store.dispatch(Actions.setVolume(volume));
  }

  getplayitemlength() {
    unimplementedWarning("getplayitemlength");
    return 100000;
  }

  seekto(pos: number) {
    unimplementedWarning("seekto");
  }

  getviewportheight() {
    return Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    );
  }

  getviewportwidth() {
    return Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    );
  }

  onscriptloaded() {
    unimplementedWarning("onscriptloaded");
    return;
  }

  onscriptunloading() {
    unimplementedWarning("onscriptunloading");
    return;
  }

  onquit() {
    unimplementedWarning("onquit");
    return;
  }

  onsetxuiparam(param: string, value: string) {
    unimplementedWarning("onsetxuiparam");
    return;
  }

  onkeydown(key: string) {
    unimplementedWarning("onkeydown");
    return;
  }

  onaccelerator(action: string, section: string, key: string) {
    unimplementedWarning("onaccelerator");
    return;
  }

  oncreatelayout(_layout) {
    unimplementedWarning("oncreatelayout");
    return;
  }

  onshowlayout(_layout) {
    unimplementedWarning("onshowlayout");
    return;
  }

  onhidelayout(_layout) {
    unimplementedWarning("onhidelayout");
    return;
  }

  onstop() {
    unimplementedWarning("onstop");
    return;
  }

  onplay() {
    unimplementedWarning("onplay");
    return;
  }

  onpause() {
    unimplementedWarning("onpause");
    return;
  }

  onresume() {
    unimplementedWarning("onresume");
    return;
  }

  ontitlechange(newtitle: string) {
    unimplementedWarning("ontitlechange");
    return;
  }

  ontitle2change(newtitle2: string) {
    unimplementedWarning("ontitle2change");
    return;
  }

  oninfochange(info: string) {
    unimplementedWarning("oninfochange");
    return;
  }

  onstatusmsg(msg: string) {
    unimplementedWarning("onstatusmsg");
    return;
  }

  oneqbandchanged(band: number, newvalue: number) {
    unimplementedWarning("oneqbandchanged");
    return;
  }

  oneqpreampchanged(newvalue: number) {
    unimplementedWarning("oneqpreampchanged");
    return;
  }

  onvolumechanged(newvol: number) {
    unimplementedWarning("onvolumechanged");
    return;
  }

  onseek(newpos: number) {
    unimplementedWarning("onseek");
    return;
  }

  newdynamiccontainer(container_id: string) {
    unimplementedWarning("newdynamiccontainer");
    return;
  }

  newgroup(group_id: string) {
    unimplementedWarning("newgroup");
    return;
  }

  newgroupaslayout(group_id: string) {
    unimplementedWarning("newgroupaslayout");
    return;
  }

  getnumcontainers() {
    unimplementedWarning("getnumcontainers");
    return;
  }

  enumcontainer(num: number) {
    unimplementedWarning("enumcontainer");
    return;
  }

  getwac(wac_guid: string) {
    unimplementedWarning("getwac");
    return;
  }

  getplayitemmetadatastring(metadataname: string) {
    unimplementedWarning("getplayitemmetadatastring");
    return;
  }

  getplayitemdisplaytitle() {
    unimplementedWarning("getplayitemdisplaytitle");
    return;
  }

  getextfamily(ext: string) {
    unimplementedWarning("getextfamily");
    return;
  }

  playfile(playitem: string) {
    unimplementedWarning("playfile");
    return;
  }

  play() {
    unimplementedWarning("play");
    return;
  }

  stop() {
    unimplementedWarning("stop");
    return;
  }

  pause() {
    unimplementedWarning("pause");
    return;
  }

  next() {
    unimplementedWarning("next");
    return;
  }

  previous() {
    unimplementedWarning("previous");
    return;
  }

  eject() {
    unimplementedWarning("eject");
    return;
  }

  getposition() {
    unimplementedWarning("getposition");
    return;
  }

  seteqband(band: number, value: number) {
    unimplementedWarning("seteqband");
    return;
  }

  seteqpreamp(value: number) {
    unimplementedWarning("seteqpreamp");
    return;
  }

  seteq(onoff: number) {
    unimplementedWarning("seteq");
    return;
  }

  getmouseposx(): number {
    return getMousePosition().x;
  }

  getmouseposy(): number {
    return getMousePosition().y;
  }

  floattostring(value: number, ndigits: number): string {
    return value.toFixed(ndigits).toString();
  }

  stringtofloat(str: string): number {
    return parseFloat(str);
  }

  _atLeastTwoDigits(n: number): string {
    return n > 9 ? n.toString() : `0${n}`;
  }

  // Convert a time in seconds to a HH:MM:SS value.
  integertolongtime(value: number): string {
    const hours = Math.floor(value / 3600);
    const remainingTime = value - hours * 3600;
    const minutes = Math.floor(remainingTime / 60);
    const seconds = Math.floor(remainingTime - minutes * 60);
    return `${this._atLeastTwoDigits(hours)}:${this._atLeastTwoDigits(
      minutes
    )}:${this._atLeastTwoDigits(seconds)}`;
  }

  // Convert a time in seconds to a MM:SS value.
  integertotime(value: number): string {
    const minutes = Math.floor(value / 60);
    const seconds = Math.floor(value - minutes * 60);
    return `${this._atLeastTwoDigits(minutes)}:${this._atLeastTwoDigits(
      seconds
    )}`;
  }

  _getDateTimeInMs(date: Date): number {
    const dateTime = date.getTime();
    const dateCopy = new Date(dateTime);
    return dateTime - dateCopy.setHours(0, 0, 0, 0);
  }

  // datetime in HH:MM format (docs imply it is in the same format as integertotime
  // which would be MM:SS, but I tested in winamp and it is HH:MM)
  // (e.g. 17:44)
  datetotime(datetime: number): string {
    const date = new Date(datetime * 1000);
    const seconds = this._getDateTimeInMs(date) / 1000;
    const longtime = this.integertolongtime(seconds);
    return longtime.substring(0, longtime.length - 3);
  }

  // datetime in HH:MM:SS format
  // (e.g. 17:44:58)
  datetolongtime(datetime: number): string {
    const date = new Date(datetime * 1000);
    const seconds = this._getDateTimeInMs(date) / 1000;
    return this.integertolongtime(seconds);
  }

  // datetime in MM/DD/YY HH:MM:SS format
  // (e.g. 09/08/19 17:44:58)
  formatdate(datetime: number): string {
    const date = new Date(datetime * 1000);
    const seconds = this._getDateTimeInMs(date) / 1000;
    const dateString = date.toLocaleDateString("en-US", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    });
    const timeString = this.integertolongtime(seconds);
    return `${dateString} ${timeString}`;
  }

  // datetime in DayOfWeek, Month DD, YYYY HH:MM:SS format
  // (e.g. Sunday, September 08, 2019 17:44:58)
  formatlongdate(datetime: number): string {
    const date = new Date(datetime * 1000);
    const seconds = this._getDateTimeInMs(date) / 1000;
    const dateString = date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "2-digit",
    });
    const timeString = this.integertolongtime(seconds);
    return `${dateString} ${timeString}`;
  }

  // returns the datetime's year since 1900
  getdateyear(datetime: number): number {
    const date = new Date(datetime * 1000);
    return date.getYear();
  }

  // returns the datetime's month (0-11)
  getdatemonth(datetime: number): number {
    const date = new Date(datetime * 1000);
    return date.getMonth();
  }

  // returns the datetime's day of the month (1-31)
  getdateday(datetime: number): number {
    const date = new Date(datetime * 1000);
    return date.getDate();
  }

  // returns the datetime's day of the week (0-6)
  // MAKI starts with Sunday like JS
  getdatedow(datetime: number): number {
    const date = new Date(datetime * 1000);
    return date.getDay();
  }

  // returns the datetime's day of the year (0-365)
  getdatedoy(datetime: number): number {
    const date = new Date(datetime * 1000);
    const start = new Date(date.getFullYear(), 0, 0);
    return Math.floor((date.getTime() - start.getTime()) / 86400000);
  }

  // returns the datetime's hour (0-23)
  getdatehour(datetime: number): number {
    const date = new Date(datetime * 1000);
    return date.getHours();
  }

  // returns the datetime's minutes (0-59)
  getdatemin(datetime: number): number {
    const date = new Date(datetime * 1000);
    return date.getMinutes();
  }

  // returns the datetime's seconds (0-59)
  getdatesec(datetime: number): number {
    const date = new Date(datetime * 1000);
    return date.getSeconds();
  }

  // Based on https://stackoverflow.com/questions/11887934/how-to-check-if-the-dst-daylight-saving-time-is-in-effect-and-if-it-is-whats
  _stdTimezoneOffset(date) {
    var jan = new Date(date.getFullYear(), 0, 1);
    var jul = new Date(date.getFullYear(), 6, 1);
    return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
  }

  // returns the datetime's daylight savings flag
  getdatedst(datetime: number): number {
    const date = new Date(datetime * 1000);
    return date.getTimezoneOffset() < this._stdTimezoneOffset(date) ? 1 : 0;
  }

  // returns the datetime in seconds, use with the above functions
  getdate(): number {
    return Math.floor(Date.now() / 1000);
  }

  strmid(str: string, start: number, len: number) {
    unimplementedWarning("strmid");
    return;
  }

  strleft(str: string, nchars: number) {
    unimplementedWarning("strleft");
    return;
  }

  strright(str: string, nchars: number) {
    unimplementedWarning("strright");
    return;
  }

  strsearch(str: string, substr: string) {
    unimplementedWarning("strsearch");
    return;
  }

  strlen(str: string): number {
    return str.length;
  }

  strupper(str: string): string {
    return str.toUpperCase();
  }

  strlower(str: string): string {
    return str.toLowerCase();
  }

  urlencode(url: string): string {
    return encodeURI(url);
  }

  removepath(str: string): string {
    unimplementedWarning("removepath");
    return;
  }

  getpath(str: string) {
    unimplementedWarning("getpath");
    return;
  }

  getextension(str: string) {
    unimplementedWarning("getextension");
    return;
  }

  sin(value: number): number {
    return Math.sin(value);
  }

  cos(value: number): number {
    return Math.cos(value);
  }

  tan(value: number): number {
    return Math.tan(value);
  }

  asin(value: number): number {
    return Math.asin(value);
  }

  acos(value: number): number {
    return Math.acos(value);
  }

  atan(value: number): number {
    return Math.atan(value);
  }

  atan2(y: number, x: number): number {
    return Math.atan2(y, x);
  }

  pow(value: number, pvalue: number): number {
    return Math.pow(value, pvalue);
  }

  sqr(value: number): number {
    return Math.pow(value, 2);
  }

  sqrt(value: number): number {
    return Math.sqrt(value);
  }

  random(max: number): number {
    return Math.floor(Math.random() * max);
  }

  setprivatestring(section: string, item: string, value: string): void {
    if (!this._privateString.has(section)) {
      this._privateString.set(section, new Map([[item, value]]));
    } else {
      this._privateString.get(section).set(item, value);
    }
  }

  getprivatestring(section: string, item: string, defvalue: string): string {
    if (!this._privateString.has(section)) {
      return defvalue;
    }
    this._privateString.get(section).get(item);
  }

  setpublicstring(item: string, value: string) {
    unimplementedWarning("setpublicstring");
    return;
  }

  setpublicint(item: string, value: number) {
    unimplementedWarning("setpublicint");
    return;
  }

  getpublicstring(item: string, defvalue: string) {
    unimplementedWarning("getpublicstring");
    return;
  }

  getpublicint(item: string, defvalue: number) {
    unimplementedWarning("getpublicint");
    return;
  }

  getviewportwidthfrompoint(x: number, y: number) {
    unimplementedWarning("getviewportwidthfrompoint");
    return;
  }

  getviewportheightfrompoint(x: number, y: number) {
    unimplementedWarning("getviewportheightfrompoint");
    return;
  }

  getviewportleft() {
    unimplementedWarning("getviewportleft");
    return;
  }

  getviewportleftfrompoint(x: number, y: number) {
    unimplementedWarning("getviewportleftfrompoint");
    return;
  }

  getviewporttop() {
    unimplementedWarning("getviewporttop");
    return;
  }

  getviewporttopfrompoint(x: number, y: number) {
    unimplementedWarning("getviewporttopfrompoint");
    return;
  }

  debugstring(str: string, severity: number) {
    unimplementedWarning("debugstring");
    return;
  }

  ddesend(application: string, command: string, mininterval: number) {
    unimplementedWarning("ddesend");
    return;
  }

  onlookforcomponent(guid: string) {
    unimplementedWarning("onlookforcomponent");
    return;
  }

  getcurappleft() {
    unimplementedWarning("getcurappleft");
    return;
  }

  getcurapptop() {
    unimplementedWarning("getcurapptop");
    return;
  }

  getcurappwidth() {
    unimplementedWarning("getcurappwidth");
    return;
  }

  getcurappheight() {
    unimplementedWarning("getcurappheight");
    return;
  }

  isappactive() {
    unimplementedWarning("isappactive");
    return;
  }

  switchskin(skinname: string) {
    unimplementedWarning("switchskin");
    return;
  }

  isloadingskin() {
    unimplementedWarning("isloadingskin");
    return;
  }

  lockui() {
    unimplementedWarning("lockui");
    return;
  }

  unlockui() {
    unimplementedWarning("unlockui");
    return;
  }

  getmainbrowser() {
    unimplementedWarning("getmainbrowser");
    return;
  }

  popmainbrowser() {
    unimplementedWarning("popmainbrowser");
    return;
  }

  navigateurl(url: string) {
    unimplementedWarning("navigateurl");
    return;
  }

  isobjectvalid(o) {
    unimplementedWarning("isobjectvalid");
    return;
  }

  // Takes a Double and returns the closest integer representation.
  integer(d: number): number {
    return Math.round(d);
  }

  frac(d: number): number {
    return d - Math.floor(d);
  }

  // Returns ms since midnight
  gettimeofday(): number {
    const date = new Date();
    return this._getDateTimeInMs(date);
  }

  setmenutransparency(alphavalue: number) {
    unimplementedWarning("setmenutransparency");
    return;
  }

  ongetcancelcomponent(guid: string, goingvisible: boolean) {
    unimplementedWarning("ongetcancelcomponent");
    return;
  }

  iskeydown(vk_code: number) {
    unimplementedWarning("iskeydown");
    return;
  }

  setclipboardtext(_text: string) {
    unimplementedWarning("setclipboardtext");
    return;
  }

  chr(charnum: number): string {
    return String.fromCharCode(charnum);
  }

  selectfile(extlist: string, id: string, prev_filename: string) {
    unimplementedWarning("selectfile");
    return;
  }

  systemmenu() {
    unimplementedWarning("systemmenu");
    return;
  }

  windowmenu() {
    unimplementedWarning("windowmenu");
    return;
  }

  triggeraction(context, actionname: string, actionparam: string) {
    unimplementedWarning("triggeraction");
    return;
  }

  showwindow(
    guidorgroupid: string,
    preferedcontainer: string,
    transient: boolean
  ) {
    unimplementedWarning("showwindow");
    return;
  }

  hidewindow(hw) {
    unimplementedWarning("hidewindow");
    return;
  }

  hidenamedwindow(guidorgroup: string) {
    unimplementedWarning("hidenamedwindow");
    return;
  }

  isnamedwindowvisible(guidorgroup: string) {
    unimplementedWarning("isnamedwindowvisible");
    return;
  }

  setatom(atomname: string, object) {
    unimplementedWarning("setatom");
    return;
  }

  getatom(atomname: string) {
    unimplementedWarning("getatom");
    return;
  }

  invokedebugger() {
    unimplementedWarning("invokedebugger");
    return;
  }

  isvideo() {
    unimplementedWarning("isvideo");
    return;
  }

  isvideofullscreen() {
    unimplementedWarning("isvideofullscreen");
    return;
  }

  getidealvideowidth() {
    unimplementedWarning("getidealvideowidth");
    return;
  }

  getidealvideoheight() {
    unimplementedWarning("getidealvideoheight");
    return;
  }

  isminimized() {
    unimplementedWarning("isminimized");
    return;
  }

  minimizeapplication() {
    unimplementedWarning("minimizeapplication");
    return;
  }

  restoreapplication() {
    unimplementedWarning("restoreapplication");
    return;
  }

  activateapplication() {
    unimplementedWarning("activateapplication");
    return;
  }

  getplaylistlength() {
    unimplementedWarning("getplaylistlength");
    return;
  }

  getplaylistindex() {
    unimplementedWarning("getplaylistindex");
    return;
  }

  isdesktopalphaavailable() {
    unimplementedWarning("isdesktopalphaavailable");
    return;
  }

  istransparencyavailable() {
    unimplementedWarning("istransparencyavailable");
    return;
  }

  onshownotification() {
    unimplementedWarning("onshownotification");
    return;
  }

  getsonginfotext() {
    unimplementedWarning("getsonginfotext");
    return;
  }

  getvisband(channel: number, band: number) {
    unimplementedWarning("getvisband");
    return;
  }
}

export default System;
