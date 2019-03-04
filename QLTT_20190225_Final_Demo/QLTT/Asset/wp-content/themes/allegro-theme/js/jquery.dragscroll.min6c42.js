/*
 *\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
 *\\\\\\\\\\\\\/\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
 *\\\\\\\\\\\\\/\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\/\/\/\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
 *\\\\\\\/\/\\/\\\/\/\/\\\\/\/\/\\\\\/\/\/\\\\\/\\\\\\/\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
 *\\\\\/\\\\\/\\\/\\\\\\\/\\\\\/\\\/\\\\\/\\\\\\/\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\/\\\/\\\\\\\\
 *\\\\\\/\/\/\\\/\\\\\\\\\/\/\/\\\\\/\/\/\\\\\\\\/\\\\\/\/\/\\\/\/\/\\\\/\/\/\\\\/\\\/\\\\\\\\\
 *\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\/\\\\/\\\\\/\\\/\\\\\\\/\\\\\\/\\\\\\/\\\/\\\/\\\\\\\\\\
 *\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\/\\/\\\\\\/\/\/\\\\/\/\/\\\/\\\\\\\/\/\/\\\\\/\\\/\\\\\\\\\\\
 *\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
 *
 * jquery.dragscroll.js
 * a scrolling plugin for the jQuery JavaScript Library
 *
 * Copyright 2011, Thomas Appel, http://thomas-appel.com, mail(at)thomas-appel.com
 * dual licensed under MIT and GPL license
 * http://dev.thomas-appel.com/licenses/mit.txt
 * http://dev.thomas-appel.com/licenses/gpl.txt
 *
 *
 *
 * changelog:
 * --------------------------------------------------------------------------------------------
 * - 0.2.b3:
 * --------------------------------------------------------------------------------------------
 *		- updated example
*		- code-refectoring
*		- updated minified version
 * --------------------------------------------------------------------------------------------
 * - 0.2.b3pre:
 * --------------------------------------------------------------------------------------------
 *		- fixed MSIE 6+ issues
 * --------------------------------------------------------------------------------------------
 * - 0.2.b2pre:
 * --------------------------------------------------------------------------------------------
 *		- removed some options: onScrollInit, workOnChildElement, onScrollDirChange
 *		- fixed some problemes
 *		- changed some internal functions
 *		- general refactoring issues
 * --------------------------------------------------------------------------------------------
 * - 0.2.b1pre:
 * --------------------------------------------------------------------------------------------
 *		- completely rewrote this plugin
 *		- added scrollbars
 *		- added mousewheel support
 * --------------------------------------------------------------------------------------------
 * - 0.1.b5b	fixed classname removal on plugin destruction
 * - 0.1.b5a	rewrote almost the whole scrolling mechanism
 * - 0.1.b4:	rewrote event unbinding (teardown,destroy), plugin is now self destroyable
 * - 0.1.b3:	fixed event unbinding (teardown)
 * - 0.1.b2:	fixed touch event support
 * - 0.1.b1:	plugin teardown method added
 * --------------------------------------------------------------------------------------------
 *
 * usage:
 * --------------------------------------------------------------------------------------------
 * - $('selector').dragscroll();
 * - if jquery.event.destroyed.js is available or if you use javascriptMVC,
 *   the plugin will detroy itself automatically
 *
 * - to destroy plugin manually call  $('selector').data('dragscroll').destroy();
 *
 * - see index.html in example directory for a more complex sample setup
 * - visit http://dev.thomas-appel.com/dragscroll for a live demo
 *
 *
 * Features to come:
 * --------------------------------------------------------------------------------------------
 * - pageup pagedown key support
 * known issues:
 * --------------------------------------------------------------------------------------------
 * - MSIE 8 doesn't fade out scrollbar handles
 * --------------------------------------------------------------------------------------------
 * @author Thomas Appel
 * @version 0.2.b3pre
 */(function(a,b){function f(a,b,c){var d=a[0]["scroll"+c]/b["outer"+c]();return[d,Math.floor(b["inner"+c]()/d)]}function g(){this.init.apply(this,arguments)}var c=b.document,d=a(b),e=a.browser.msie&&a.browser.version<9?a("html"):d;g.prototype={name:"dragscroll",isTouchDevice:b.ontouchstart!==void 0},a.extend(g.prototype,{events:{M_DOWN:g.prototype.isTouchDevice?"touchstart."+g.prototype.name:"mousedown."+g.prototype.name,M_UP:g.prototype.isTouchDevice?"touchend."+g.prototype.name:"mouseup."+g.prototype.name,M_MOVE:g.prototype.isTouchDevice?"touchmove."+g.prototype.name:"mousemove."+g.prototype.name,M_ENTER:"mouseenter."+g.prototype.name,M_LEAVE:"mouseleave."+g.prototype.name,M_WHEEL:"mousewheel."+g.prototype.name,S_STOP:"scrollstop."+g.prototype.name,S_START:"scrollstart."+g.prototype.name,SCROLL:"scroll."+g.prototype.name,RESIZE:g.prototype.isTouchDevice?"orientationchange."+g.prototype.name:"resize."+g.prototype.name},init:function(b,c){var d="<div/>",e=this;this.options=c,this.elem=b,this.innerElem=this.elem.wrapInner(d).children(0),this.scrollElem=this.innerElem.wrap(d).parent(),this.elem.addClass(this.name+"-container"),this.innerElem.addClass(this.name+"-inner"),this.scrollElem.addClass(this.name+"-scroller");var f=a(d);this.scrollBarContainer=a([f,f.clone()]),this.scrollBar=a([f.clone(),f.clone()]),this.scrollBarContainer.each(function(a){var b=a===0?"h":"v",c=e.options.autoFadeBars?" autohide":"";e.scrollBarContainer[a].addClass(e.name+"-scrollbar-container "+b+c).append(e.scrollBar[a].addClass(e.name+"-scrollbar "+b)),e._addBars(a)}),this.elem.css("overflow","visible"),this.mx=0,this.my=0,this.__tmp__={_diff_x:0,_diff_y:0,_temp_x:0,_temp_y:0,_x:0,_y:0,_mx:0,_my:0,_deltaX:0,_deltaY:0,_start:{x:0,y:0}},this.__tmp__._scrolls=!1,this._buildIndex(),this.timer=void 0,this._bind(),this.elem.trigger(this.name+"ready")},reInit:function(){return this._buildIndex()},_addBars:function(a){this.options.scrollBars&&this.scrollBarContainer[a].appendTo(this.elem)},_buildIndex:function(){this.barIndex={X:f(this.scrollElem,this.scrollElem,"Width"),Y:f(this.scrollElem,this.scrollElem,"Height")},this._getContainerOffset(),this.scrollBar[0].css({width:this.barIndex.X[1]}),this.scrollBar[1].css({height:this.barIndex.Y[1]}),this.__tmp__._cdd={x:this.options.scrollBars?this.scrollBarContainer[0].innerWidth():this.scrollElem.innerWidth(),y:this.options.scrollBars?this.scrollBarContainer[1].innerHeight():this.scrollElem.innerHeight()},this.barIndex.X[0]===1?this.scrollBarContainer[0].detach():this._addBars(0),this.barIndex.Y[0]===1?this.scrollBarContainer[1].detach():this._addBars(1)},_bind:function(){var b=this;e.bind(this.events.RESIZE,a.proxy(this._buildIndex,this)),this.elem.bind("destroyed",a.proxy(this.teardown,this)),this.elem.bind(this.name+"ready",a.proxy(this.onInitReady,this)),this.elem.delegate("."+this.name+"-scrollbar-container",this.events.M_DOWN,a.proxy(this.scrollStart,this)),this.elem.bind(this.events.M_WHEEL,a.proxy(this.scrollStart,this)),this.scrollElem.bind(this.events.M_DOWN,a.proxy(this.dragScrollStart,this)),this.options.autoFadeBars&&this.elem.delegate("."+this.name+"-scrollbar-container","mouseenter",a.proxy(this.showBars,this)).delegate("."+this.name+"-scrollbar-container","mouseleave",a.proxy(this.hideBars,this)),this.elem.bind(this.events.S_START,function(){b.options.onScrollStart.call(b.elem.addClass("scrolls")),b.options.autoFadeBars&&b.showBars()}).bind(this.events.S_STOP,function(){b.options.onScrollEnd.call(b.elem.removeClass("scrolls")),b.options.autoFadeBars&&b.hideBars()})},_unbind:function(){this.elem.unbind(this.name+"ready").undelegate("."+this.name+"-scrollbar-container",this.events.M_DOWN).undelegate("."+this.name+"-scrollbar-container","mouseenter").undelegate("."+this.name+"-scrollbar-container","mouseleave").unbind(this.events.M_WHEEL).unbind(this.events.S_STOP).unbind(this.events.S_START),this.scrollElem.unbind(this.events.M_DOWN),e.unbind(this.events.M_MOVE).unbind(this.events.M_UP).unbind(this.events.RESIZE)},onInitReady:function(){this.options.autoFadeBars?this.showBars().hideBars():this.showBars()},initMouseWheel:function(b){b==="rebind"?this.elem.unbind(this.events.M_WHEEL).bind(this.events.M_WHEEL,a.proxy(this.scrollStart,this)):this.elem.unbind(this.events.M_WHEEL).bind(this.events.M_WHEEL,a.proxy(this._getMousePosition,this))},_getContainerOffset:function(){this.containerOffset=this.elem.offset()},_pageXY:function(){return g.prototype.isTouchDevice?function(a){return{X:a.originalEvent.touches[0].pageX,Y:a.originalEvent.touches[0].pageY}}:function(a){return{X:a.pageX,Y:a.pageY}}}(),_getScrollOffset:function(){return{x:this.scrollElem[0].scrollLeft,y:this.scrollElem[0].scrollTop}},_getMousePosition:function(a,b,c,d){a.preventDefault();if(!b){var e=this._pageXY.apply(this,arguments);this.mx=this.__tmp__._scrollsX?Math.max(0,Math.min(this.__tmp__._cdd.x,e.X-this.containerOffset.left)):this.mx,this.my=this.__tmp__._scrollsY?Math.max(0,Math.min(this.__tmp__._cdd.y,e.Y-this.containerOffset.top)):this.my}else c=c!==undefined?-c:b,d=d!==undefined?d:b,c=Math.min(5,Math.max(c,-5)),d=Math.min(5,Math.max(d,-5)),this.__tmp__._deltaX=c,this.__tmp__._deltaY=d,c===0&&d===0&&this.scrollStop()},_getWheelDelta:function(){var a=this.scrollElem.innerHeight(),b=this.scrollElem.innerWidth();this.mx-=this.mx<=b?this.__tmp__._deltaX*this.options.mouseWheelVelocity:0,this.my-=this.my<=a?this.__tmp__._deltaY*this.options.mouseWheelVelocity:0,this.mx=Math.min(Math.max(0,this.mx),b),this.my=Math.min(Math.max(0,this.my),a),this.__tmp__._deltaX=null,this.__tmp__._deltaY=null},_getDragScrollPosition:function(){var a,b,c=this.options.smoothness;return this.__tmp__._diff_x=this.__tmp__._diff_x>0?this.__tmp__._diff_x++ -this.__tmp__._diff_x++/c:this.__tmp__._diff_x-- -this.__tmp__._diff_x--/c,this.__tmp__._diff_y=this.__tmp__._diff_y>0?this.__tmp__._diff_y++ -this.__tmp__._diff_y++/c:this.__tmp__._diff_y-- -this.__tmp__._diff_y--/c,a=Math.round(Math.max(Math.min(this.scrollElem[0].scrollLeft+this.__tmp__._diff_x,this.scrollElem[0].scrollWidth),0)),b=Math.round(Math.max(Math.min(this.scrollElem[0].scrollTop+this.__tmp__._diff_y,this.scrollElem[0].scrollHeight),0)),this.__tmp__._x=a,this.__tmp__._y=b,[this.__tmp__._x,this.__tmp__._y]},_hasScrolledSince:function(){var a=this.scrollElem[0].scrollLeft,b=this.scrollElem[0].scrollTop;return{verify:this.__tmp__._temp_x!==a||this.__tmp__._temp_y!==b,scrollLeft:a,scrollTop:b}},_getScrollPosition:function(a,b){var c,d;return c=a*this.barIndex.X[0],d=b*this.barIndex.Y[0],this.__tmp__._x+=(c-this.__tmp__._x)/this.options.smoothness,this.__tmp__._y+=(d-this.__tmp__._y)/this.options.smoothness,[this.__tmp__._x,this.__tmp__._y]},_getDiff:function(){var a=this.scrollElem[0].scrollTop,b=this.scrollElem[0].scrollLeft;this.__tmp__._diff_x=b-this.__tmp__._temp_x,this.__tmp__._diff_y=a-this.__tmp__._temp_y,this.__tmp__._temp_x=b,this.__tmp__._temp_y=a},setScrollbar:function(){this.scrollBar[0].css({left:Math.abs(Math.ceil(this.scrollElem[0].scrollLeft/this.barIndex.X[0]))}),this.scrollBar[1].css({top:Math.abs(Math.ceil(this.scrollElem[0].scrollTop/this.barIndex.Y[0]))})},scroll:function(a,b){var c=this.scrollElem[0].scrollLeft,d=this.scrollElem[0].scrollTop;a=this.__tmp__._scrollsX?Math.round(a):c,b=this.__tmp__._scrollsY?Math.round(b):d,this.scrollElem.scrollLeft(a).scrollTop(b)},scrollStart:function(b,c){this.stopScroll();var d=b.target,f=d===this.scrollBar[0][0],g=d===this.scrollBar[1][0],h=d===this.scrollBarContainer[0][0],i=d===this.scrollBarContainer[1][0];b.preventDefault(),this.scrollElem.unbind(this.events.SCROLL),this.__tmp__._scrollsX=f||h,this.__tmp__._scrollsY=g||i,this._getMousePosition.apply(this,arguments),c?(this.__tmp__._scrollsX=!0,this.__tmp__._scrollsY=!0,this.__tmp__._mode="wheel",this.__tmp__._start.x=0,this.__tmp__._start.y=0,this._checkDragMXYPos(),this.initMouseWheel()):(e.bind(this.events.M_MOVE,a.proxy(this._getMousePosition,this)),e.bind(this.events.M_UP,a.proxy(this.scrollStop,this)),this.__tmp__._start.x=f?this.mx-this.scrollBar[0].offset().left+this.scrollBarContainer[0].offset().left:h?Math.round(this.scrollBar[0].outerWidth()/2):0,this.__tmp__._start.y=g?this.my-this.scrollBar[1].offset().top+this.scrollBarContainer[1].offset().top:i?Math.round(this.scrollBar[1].outerHeight()/2):0,this.__tmp__._mode="scrollbar"),this.startTimer("scrollBPos"),this.elem.trigger(this.events.S_START)},scrollBPos:function(){var a,b,c;this._getDiff(),this.__tmp__._mode==="wheel"&&this._getWheelDelta(),b=Math.min(Math.max(0,this.mx-this.__tmp__._start.x),this.__tmp__._cdd.x-this.barIndex.X[1]),a=Math.min(Math.max(0,this.my-this.__tmp__._start.y),this.__tmp__._cdd.y-this.barIndex.Y[1]),c=this._getScrollPosition(b,a),this.__tmp__._scrollsX&&this.scrollBar[0].css({left:b}),this.__tmp__._scrollsY&&this.scrollBar[1].css({top:a}),this.scroll(c[0],c[1]),this.startTimer("scrollBPos"),this.__tmp__._mode==="wheel"&&this.__tmp__._scrolls&&!this._hasScrolledSince().verify&&this.scrollStop(),this.__tmp__._scrolls||(this.__tmp__._scrolls=!0),this.__tmp__.mx=this.mx,this.__tmp__.my=this.my},scrollStop:function(a){var b=this._hasScrolledSince();e.unbind(this.events.M_MOVE),e.unbind(this.events.M_UP),b.verify?this.startTimer("scrollStop"):(this.stopScroll(),this._clearScrollStatus(!1),this.initMouseWheel("rebind"),this.elem.trigger(this.events.S_STOP),this.__tmp__._mx=null,this.__tmp__._my=null,this.__tmp__._start.x=0,this.__tmp__._start.y=0),this.__tmp__._temp_x=b.scrollLeft,this.__tmp__._temp_y=b.scrollTop},dragScrollStart:function(b){this.stopScroll(),b.preventDefault(),this._clearScrollStatus(!0),this._getMousePosition.apply(this,arguments),this.__tmp__._start.x=this.mx+this.scrollElem[0].scrollLeft,this.__tmp__._start.y=this.my+this.scrollElem[0].scrollTop,e.bind(this.events.M_MOVE,a.proxy(this._getMousePosition,this)),e.bind(this.events.M_UP,a.proxy(this._initDragScrollStop,this)),this.scrollElem.bind(this.events.SCROLL,a.proxy(this.setScrollbar,this)),this.startTimer("dragScrollMove"),this.elem.trigger(this.events.S_START)},_checkDragMXYPos:function(){var a=this._getScrollOffset();this.mx=Math.round(a.x/this.barIndex.X[0]),this.my=Math.round(a.y/this.barIndex.Y[0])},dragScrollMove:function(){this.stop=!1;var a=Math.min(Math.max(this.__tmp__._start.x-this.mx,0),this.scrollElem[0].scrollWidth),b=Math.min(Math.max(this.__tmp__._start.y-this.my,0),this.scrollElem[0].scrollHeight),c=this._getScrollOffset();this._getDiff(),this.scroll(a,b),this.__tmp__.temp_x=c.x,this.__tmp__.temp_y=c.y,this.startTimer("dragScrollMove")},_initDragScrollStop:function(){e.unbind(this.events.M_MOVE),e.unbind(this.events.M_UP),this.elem.removeClass("scrolls"),this.stopScroll(),this.dargScrollStop()},dargScrollStop:function(){var a=this._hasScrolledSince(),b;a.verify?(b=this._getDragScrollPosition(),this.scroll(b[0],b[1]),this.startTimer("dargScrollStop"),this.__tmp__._temp_x=a.scrollLeft,this.__tmp__._temp_y=a.scrollTop):(this.stopScroll(),this.scrollElem.unbind(this.events.SCROLL),this._clearScrollStatus(!1),this.elem.trigger(this.events.S_STOP))},_clearScrollStatus:function(){var a=arguments,b=a.length,c=a[0],d=a[1],e=a[2];b===1&&(d=c,e=c),b===2&&(e=d),this.__tmp__._scrolls=c,this.__tmp__._scrollsX=d,this.__tmp__._scrollsY=e},hideBars:function(){return this.__tmp__._scrolls?this:(this.scrollBarContainer.each(function(){this.stop().delay(100).fadeTo(250,0)}),this)},showBars:function(){return this.scrollBarContainer.each(function(){parseInt(this.css("opacity"),10)<1&&(this.css({opacity:0,display:"block"}),this.stop().delay(100).fadeTo(250,1))}),this},startTimer:function(a){var c=this;this.timer=b.setTimeout(function(){c[a]()},15)},stopScroll:function(){b.clearTimeout(this.timer),this.timer=void 0},teardown:function(b){var c=2;this.elem.removeClass("scrolls"),this._unbind(),this.elem.unbind("destroyed");while(c--)this.scrollBarContainer[c].empty().remove();a.removeData(this.name)}}),a.fn.dragscroll=function(b){var c={scrollClassName:"",scrollBars:!0,smoothness:15,mouseWheelVelocity:2,autoFadeBars:!0,onScrollStart:function(){},onScrollEnd:function(){}},d=a.extend({},c,b),e=this;return this.each(function(){a(this).data(g.prototype.name,new g(e,d))})}})(this.jQuery,this);