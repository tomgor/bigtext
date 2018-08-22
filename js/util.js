/**
判断对象是否为空，字符串是否有值
 */
function isEmpty(val){
    if(typeof(val) == 'boolean'){
        return false;
    }
    if(typeof(val) == 'number'){
        return false;
    }
    if(val && val.join){
        return val.length == 0;
    }
    if(val == null || typeof(val) == 'undefined'){
    	return true;
	}
    if(val['__ob__']){//Vue Object
    	for(var k in val){
        	return false;
		}
		return true;
	}

    return !val || val == '';
}


var loadedCss = [];//防止重复加载
function loadCss(str){
    var loaded = false;
    loadedCss.forEach(function(n){
        if(n == str){
            loaded = true;
            return false;
        }
    });
    if(loaded)return;

    loadedCss.push(str);
    var firtLine = str.split('\n')[0];

    //load css string
    if(firtLine.indexOf('.css')<0){
        console.log('load css string into header')
        var s = document.createElement('style');
        s.setAttribute('type', 'text/css');
        s.appendChild(document.createTextNode(str));
        document.head.appendChild(s);
        return;
    }

   //load css file
    console.log('load css file into header')
    var myCSS = document.createElement( "link" );
    myCSS.rel = 'stylesheet';
    myCSS.href = basePath +  str;
    document.head.insertBefore( myCSS, document.head.childNodes[ document.head.childNodes.length - 1 ].nextSibling );
}