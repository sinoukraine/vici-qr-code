var $$ = Dom7;
window.COM_TIMEFORMAT = 'YYYY-MM-DD HH:mm:ss';
window.COM_TIMEFORMAT2 = 'YYYY-MM-DDTHH:mm:ss';
window.COM_TIMEFORMAT5 = 'DD-MM-YYYY';

var s;
const ip = '192.168.1.1';
const port = 10080;
var connection_id;

// API ADRESS URL
const API_GET_UNIT_INFO = 'https://vici19.quiktrak.co/Scan/Result';

//const URL_USERGUIDE = 'https://support.rv-eye.co/manual/app-user-guide.pdf';
const URL_TEST = 'https://sinopacificukraine.com/vici/index.html';

//var MapTrack = null;
var PHOTOLIST = {};
var VIDEOLIST = {};

var validWiFi = false;

window.PosMarker = {};
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
    name: 'Vici QR Code',
    id: 'com.quiktrak.dashcam',
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
		openCamList: function(){
			loadListPage();		
		},
		openCam: function(){
			loadCarcamPage();		
		},
		hexToDec: function (hex) {	
		  var result = 0, digitValue;
		  hex = hex.toLowerCase();
		  for (var i = 0; i < hex.length; i++) {
			digitValue = '0123456789abcdef'.indexOf(hex[ i ]);
			result = result * 16 + digitValue;
		  }
		  return result;
		},
		pad: function (str, max) {
		  str = str.toString();
		  return str.length < max ? pad("0" + str, max) : str;
		},
	}
});


document.addEventListener("deviceready", onDeviceReady, false ); 
 
function encodeHex(str){
    str = encodeURIComponent(str).split('%').join('');
    return str.toLowerCase();
	/*var result = "";
    for (i=0; i<str.length; i++) {
        hex = str.charCodeAt(i).toString(16);
        result += ("000"+hex).slice(-2);
    }
	return result;*/
}

function onDeviceReady(){
	loadCarcamPage();
	console.log('ready');
	//App.dialog.alert(UInt64("0x0000000077232000"));	
	//var num2 = ctypes.UInt64("-0x1234567890ABCDEF");
}

	
var mainView = App.views.create('.view-main');

/*start download file*/


/*end download file*/

$$('#mainMenu li').on('click', menuList)

function menuList() {		
	//if(validWiFi){		
		let listId = $$(this).attr('id');
		let activePage = mainView.activePage;
		
		if (listId) {
			switch (listId) {
				case 'carcam':
					loadCarcamPage();
					App.panel.close($$('.panel-left'), true);
					break;
				case 'delete.cam':
					if (typeof(activePage) == 'undefined' || (activePage && activePage.name != "delete.cam")) {
						loadDeleteCamPage();
						console.log('open del');
						App.panel.close($$('.panel-left'), true);
					}
					break;
				
				default:
					console.log('No Found list menu');
			}
		}
}

/*file viewing start*/
function showUserGuide(){
	
    //var href = URL_USERGUIDE;
    
	/*WifiWizard2.getConnectedSSID().then(response => {	
								let mySSID = JSON.stringify(response);
								var pattern = /AUTO-VOX/i;
								var pattern1 = /M-/i;
								var pattern2 = /ATGA/i;
								
								//self.$app.preloader.hide();		
								if ((pattern.test(mySSID) || pattern1.test(mySSID) || pattern2.test(mySSID))) {										
									App.dialog.alert('In order to access the user guide please disconnect from the DC100 and try again');									
								}else{					
									if (typeof navigator !== "undefined" && navigator.app) {                
										navigator.app.loadUrl(href, {openExternal: true}); 
									} else {
										window.open(href,'_blank');
									}								
								}					
							}).catch((error) => {
								//self.$app.preloader.hide();		
								App.dialog.alert('Something wrong');						
							});*/

//$$(document).on('click', '.getManual', function(){
    var fullPathToFilePrivate = cordova.file.applicationDirectory + 'www/resources/manual/DC100-user-guide.pdf';
    var externalDirEntry;
    window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory, function success(dirEntry) {
        externalDirEntry = dirEntry;
    },function (e) {
        alert('error dir '+JSON.stringify(e));
    });

    window.resolveLocalFileSystemURL(fullPathToFilePrivate, function onSuccess(fileEntry)
    {
        fileEntry.copyTo(externalDirEntry, 'DC100-user-guide.pdf',
            function(e)
            {
                viewDocument(e.nativeURL);
            },
            function()
            {
                alert('copying FAILED');
            });
    }, function (e) { alert(JSON.stringify(e)); });
//});
}


function viewDocument(url) {
    if (cordova && cordova.plugins.fileOpener2) {
        cordova.plugins.fileOpener2.open(
            url, // You can also use a Cordova-style file uri: cdvfile://localhost/persistent/Downloads/starwars.pdf
            'application/pdf',
            {
                error: function (e) {
                    alert('Error status: ' + e.status + ' - Error message: ' + e.message);
                },
                success: function () {
                    console.log('file opened successfully');
                }
            }
        );
    }
}
/*file viewing end*/

function loadSwiperPage() {
	mainView.router.navigate('/my-swiper/');
}

function loadCarcamPage() {
	mainView.router.navigate('/my-home/');
}

function loadListPage() {
	mainView.router.navigate('/my-list/');
}

// GALLERY
function loadGalleryPage() {
	mainView.router.navigate('/my-gallery/');
}

// GALLERY
function loadVideosPage() {
	mainView.router.navigate('/my-videos/');
}

// HINTS
function loadHintsPage() {
	mainView.router.navigate('/my-hints/');
}

// FAQ
function loadFAQPage() {
	//mainView.router.navigate('/my-faq/');
	//mainView.router.navigate('/my-info/');
    mainView.router.load({
        url: 'resources/templates/info.html',
        context: {
        }
    });
}
// INFO
function loadInfoPage() {	
	//mainView.router.navigate('/my-info/');
    mainView.router.load({
        url: 'resources/templates/info.html',
        context: {
        }
    });
}

// SETTINGS
function loadSettingsPage() {	
	mainView.router.navigate('/my-settings/');
}

function loadDeleteCamPage() {
	mainView.router.navigate('/my-delete-cam/');
}

