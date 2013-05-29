/**
 * js弹出层
 * User: liuqing
 * Date: 13-5-28
 * Time: 上午11:26
 * To change this template use File | Settings | File Templates.
 */

(function(window, undefined){
    var defaultConfig = {
        width: 300,
        height: 300,
        class: 'nPop',
        opacity: 50,
        type: 'html',
        ajax: 'get',
        swf: {wmode: 'transparent'},
        title: '提示'
    },
    doc = window.document,
    bind = function(element, type, handler){
        element.addEventListener ? element.addEventListener(type, handler, false) : element.attachEvent("on" + type, handler);
    },
    extend = function(destination, source) {
        for (var property in source) {
            destination[property] = source[property];
        }
        return destination;
    };
    /**
     * 类
     * @param target
     * @param opts
     * @constructor
     */
    var Pop = function(target, opts){
        this.target = target;
        this.width = opts.width;
        this.height = opts.height;
        this.class = opts.class;
        this.opacity = opts.opacity;
        this.type = opts.type;
        this.ajax = opts.ajax;
        this.swf = opts.swf;
        this.title = opts.title;

        this.timer = null;
        this.num = 0;

        this.init();
    };
    Pop.prototype = {
        init: function(){
            var self = this;
            bind(self.target, 'click', function(){
                self.creatModule();
                self.maskStyle();
                self.alpha();
                self.addEvent();
            });
        },
        top:function(){
            return document.body.scrollTop||document.documentElement.scrollTop
        },
        nwidth:function(){
            return window.innerWidth||document.documentElement.clientWidth;
        },
        nheight:function(){
            return window.innerHeight||document.documentElement.clientHeight;
        },
        mHeight:function(){
            var bd = doc.body,
                dEl = doc.documentElement;
            return Math.max(Math.max(bd.scrollHeight, dEl.scrollHeight),Math.max(bd.clientHeight, dEl.clientHeight));
        },
        mwidth:function(){
            var bd = doc.body,
                dEl = doc.documentElement;
            return Math.max(Math.max(bd.scrollWidth, dEl.scrollWidth),Math.max(bd.clientWidth, dEl.clientWidth));
        },
        creatModule: function(){
            var self = this;
            if(!self.box){
                self.box = doc.createElement('div');
                self.box.className = 'nbox';
                self.mask = doc.createElement('div');
                self.mask.className = 'nboxmask';
                self.Cont = doc.createElement('div');
                self.Cont.className = 'nboxContent';
                doc.body.appendChild(self.mask);
                self.box.appendChild(self.Cont);
                doc.body.appendChild(self.box);
            }
            var content = self.getContent();
            self.show(content);
        },
        getContent: function(){
            var self = this,
                content = "",
                dataUrl = self.target.getAttribute('data-pop');
            switch (self.type){
                case 'ajax':
                    content = "ajax";
                    break;
                case 'iframe':
                    content = '<iframe src='+dataUrl+' frameborder="0"></iframe>';
                    break;
                default:
                    var obj = doc.getElementById(self.type);
                    content = obj ? obj.innerHTML : self.type;
            }
            return content;
        },
        addEvent: function(){
            var self = this;
            bind(self.mask, 'click', function(){
                self.hide();
            });
        },
        maskStyle: function(){
            var self = this;
            self.mask.style.height = self.mHeight()+'px';
            self.mask.style.width = self.mwidth()+'px';
        },
        alpha:function(){
            var self = this;
            clearInterval(self.timer);
            if(self.num === 0){
                self.mask.style.opacity = 0;
                self.mask.style.filter = 'alpha(opacity=0)';
                self.mask.style.display ='block';
                self.pos();
            }
            self.timer = setInterval(function(){
                self.twalpha(self.num);
            },20);
        },
        twalpha: function(){
            var self = this;
            if(self.num < self.opacity){
                self.num++;
                self.alpha();
                return;
            }
            self.mask.style.opacity = self.num/100;
            self.mask.style.filter = 'alpha(opacity='+ self.num +')';
        },
        pos:function(){
            var self = this,
            t = (self.nheight()/2) - (self.box.offsetHeight/2);
            t = t < 10 ? 10 : t;
            self.box.style.top = (t + self.top())+'px';
            self.box.style.left = (self.nwidth()/2)-(self.box.offsetWidth/2)+'px'
        },
        show: function(con){
            this.box.style.display = "";
            this.mask.style.display = "";
            this.Cont.innerHTML = con;
        },
        hide: function(){
            this.box.style.display = "none";
            this.mask.style.display = "none";
            this.Cont.innerHTML = "";
        }
    };
    //api
    window.pop = function(target, opts){
        opts = extend(defaultConfig, opts);
        new Pop(target, opts);
    };
}(this));
