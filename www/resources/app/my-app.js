var $$ = Dom7;
window.COM_TIMEFORMAT = 'YYYY-MM-DD HH:mm:ss';
window.COM_TIMEFORMAT2 = 'YYYY-MM-DDTHH:mm:ss';
window.COM_TIMEFORMAT5 = 'DD-MM-YYYY';

// API ADRESS URL
const API_GET_UNIT_INFO = 'https://vici19.quiktrak.co/Scan/Result';
const API_SUBMIT_TEST_INFO = 'https://vici19.quiktrak.co/Scan/Submit';

var App = new Framework7({
    swipeBackPage: false,
    material: true,
    allowDuplicateUrls: true,
    sortable: false,
    precompileTemplates: true,
    template7Pages: true,
    tapHold: false, //enable tap hold events
	theme: 'auto',
    root: '#app',
    name: 'ViCi QR Code',
    id: 'com.viciapp.qrcode',
	  touch: {
		tapHold: true //enable tap hold events
	  },
    panel: {
        swipe: 'left',
        leftBreakpoint: 768,
    },
    routes: routes,
	// App root data
    data: function () {
        return {           
            UTCOFFSET: moment().utcOffset(),
        };
    },
    on: {
        init: function() {
        },
        pageInit: function() {
            // console.log('Page initialized');
        },
		photoBrowser: {
			type: 'popup',
		  }
    },
	methods: {        
        capitalize: function(s) {
            if (typeof s !== 'string') return ''
            return s.charAt(0).toUpperCase() + s.slice(1)
        },
        isJsonString: function(str){
            try{var ret=JSON.parse(str);}catch(e){return false;}return ret;
        },
        findObjectByKey: function(array, key, value) {           
            for (var i = 0; i < array.length; i++) {
                if (array[i][key] == value) {
                    return array[i];
                }
            }
            return null;
        },
        isObjEmpty: function(obj) {
            for (var key in obj) {
                return false;
            }
            return true;
        },
        reverseArry: function(arry){
            var newArry = [];
            var i = null;
            for (i = arry.length - 1; i >= 0; i -= 1)
            {
                newArry.push(arry[i]);
            }
            return newArry;
        },
        getFromStorage: function(name){
            var ret = [];
            var str = '';
            if (name) {
                switch (name){
                    case 'testList':
                        str = localStorage.getItem("COM.VICI.TESTLIST");
                        if(str) {
                            ret = JSON.parse(str);
                        }
                    break; 
					default:
                        App.dialog.alert('There is no item saved with such name - '+name);
                }
            }else{
                App.dialog.alert('Wrong query parameters!');
            }
            return ret;
		},		
        setInStorage: function(params){
            let self = this;
            if (typeof(params) == 'object' && params.name && params.data) {
                switch (params.name){
                    case 'testList':
                        localStorage.setItem("COM.VICI.TESTLIST", JSON.stringify(params.data));
                    break;            
                    default:
                        App.dialog.alert('There is no function associated with this name - '+params.name);
                }   
            }else{
                App.dialog.alert('Wrong query parameters!');
            }
        },
		pad: function (str, max) {
		  str = str.toString();
		  return str.length < max ? pad("0" + str, max) : str;
		},
	}
});

document.addEventListener("deviceready", onDeviceReady, false ); 

function onDeviceReady(){
	if(cordova.plugins && cordova.plugins.permissions){
        window.permissions = cordova.plugins.permissions;
	}

	loadHomePage();
}

var mainView = App.views.create('.view-main');

function loadHomePage() {
	mainView.router.navigate('/my-home/');
}
