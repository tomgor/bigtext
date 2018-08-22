/**
 输入框放大镜
 dom:'document',
 el:null,
 filter:null
 */
var BigTextInput = {
    opts:{},
    initBigTextInput:function(args){
        var defaultOpts = {
            dom:'document',
            el:null,
            filter:null
        };
        this.opts = $.extend(defaultOpts,args);
        var that = this;
        $(this.opts.dom).on('compositionstart',this.opts.el, function () {
            $(this).prop('comStart', true);
        }).on('compositionend', this.opts.el,function () {
            $(this).prop('comStart', false);
        }).on('keyup',this.opts.el,function(e){
            that.showBigTextInput(this,e);
        }).on('focus',this.opts.el,function(e){
            that.showBigTextInput(this,e);
        }).on('blur',this.opts.el,function(e){
            that.hide();
        });
    },
    hide:function(){
        $('#BigTextInput').hide();
    },
    showBigTextInput:function (el,e) {

        if(this.opts.filter && !this.opts.filter.call(el,e))return;
        var inputDiv = $('#BigTextInput');
        if(inputDiv.length ==0){
            inputDiv = $('<div id="BigTextInput"></div>').append('<span class="len"></span><span class="monitor"></span>');
            //inputDiv.insertBefore(e.target);
            inputDiv.appendTo(document.body);
        }
        if ($(el).prop('comStart')){
            console.log('输入法启动中');
            return;
        }
        var val = $(el).val();
        if(isEmpty(val)){
            console.log('没有任何内容');
            inputDiv.hide();
            return;
        }
        var that = this;
        var inputParent =$(e.target).parent();
        if(!inputParent.data('register-dom-remove')){
            inputParent.bind('DOMNodeRemoved',function(){
                that.hide();
            });
            inputParent.data('register-dom-remove',true);
        }
        //console.log(e.target.offsetLeft,e.target.offsetTop,$(e.target).offset());
        inputDiv.css({
            left:$(e.target).offset().left,
            top:$(e.target).offset().top- 50
        }).find('.len').text(val.length).end().find('.monitor').text(val).end().show();
    }
};

loadCss(`
#BigTextInput{
    position: absolute;
    color:#ec786a;
    z-index: 100;
    display: inline-block;
    min-height: 50px;
    min-width: 100px;
    background-color: #fcf8e3;
    border:1px solid #ddd393;
    border-radius: 4px;
    white-space:nowrap;
}
#BigTextInput>span{
    font-size: 24px;
    line-height: 50px;
    font-weight: 600;
}
#BigTextInput>span.len{
    padding: 0px 5px;
    font-weight: 100;
    color:blue;
    background-color: #aff9fc;
    height: 100%;
    display: inline-block;
}
`);
