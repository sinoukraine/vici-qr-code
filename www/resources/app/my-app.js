var $$ = Dom7;
window.COM_TIMEFORMAT = 'YYYY-MM-DD HH:mm:ss';
window.COM_TIMEFORMAT2 = 'YYYY-MM-DDTHH:mm:ss';

var s;
const ip = '192.168.1.1';
const port = 10080;
var connection_id;

// API ADRESS URL
const LOCAL_ADRESS = 'http://192.168.1.1/';
const API_COMMON_VIDEO_LIST = LOCAL_ADRESS + 'ini.htm?cmd=commonvideolist';
const API_ALARM_VIDEO_LIST = LOCAL_ADRESS + 'ini.htm?cmd=alarmvideolist';
const API_GET_GPS_POSITION = LOCAL_ADRESS + 'ini.htm?cmd=gpsdatalist';
const API_LIVE_STREAM = LOCAL_ADRESS + 'livesubstream.h264';
const API_DOWNLOAD = LOCAL_ADRESS + 'DCIM/';

//const URL_USERGUIDE = 'https://support.rv-eye.co/manual/app-user-guide.pdf';
const URL_USERGUIDE = 'http://sinopacificukraine.com/app/DC100-user-guide.pdf';

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
    name: 'DashCam',
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
    },
    on: {
        init: function() {
			/*
			// Create dynamic Popup
			var currentHintState = App.methods.getFromStorage("downloadPlayer");
			
			App.methods.setInStorage({name: 'currentResolution', data: '1080p'});	
			App.methods.setInStorage({name: 'settingSoundOn', data: 'on'});	
			App.methods.setInStorage({name: 'settingVoiceAlarm', data: 'on'});	
			App.methods.setInStorage({name: 'settingVoiceGesture', data: 'on'});	
			App.methods.setInStorage({name: 'settingVoiceParking', data: 'on'});	
			App.methods.setInStorage({name: 'settingSurveillance', data: 'off'});	
			App.methods.setInStorage({name: 'currentSensitivity', data: 'medium'});	
				
				if(currentHintState != '1'){
					
					var dynamicPopup = App.popup.create({
					  content: '<div class="page open-dashcam-page popup">'+
							'<div class="navbar">'+
							'	<div class="navbar-inner">'+
							'		<div class="title">ATGA DC100</div>'+
							'	</div>'+
							'</div>'+

							'<div class="toolbar toolbar-bottom">'+
							'	<div class="toolbar-inner item-title open-title">'+
							'		<a class="link popup-close " href="#">'+
							'			Ok, I understand'+
							'		</a>'+
							'	</div>'+
							'</div>'+

							'<div class="page-content">'+
							'	<div class="block">'+
							'		<p class="item-title open-title">'+
							'			Please download either of the media players below to live view and view historical images and video'+
							'		</p><p class="item-title open-title"><img class="main-bg" src="./resources/images/mx.png" width="50" alt="main"></p><p class="item-title open-title"><b>MX Player</b></p><p class="item-title open-title"><img class="main-bg" src="./resources/images/kmp.png" width="50" alt="main"></p><p class="item-title open-title"><b>KM Player</b></p><p class="item-title open-title">Thanks you</p>'+
							'	</div>'+
							'	<div class="list virtual-list open-cam-list no-hairlines">'+
							'	</div>'+
							'</div>'+
						'</div>',
					  
				
					  // Events
					  on: {
						open: function (popup) {
						  console.log('Popup open');
						  
						  App.methods.setInStorage({name: 'downloadPlayer', data: '1'});	
						},
						opened: function (popup) {
						  console.log('Popup opened');
						},
					  }
					});
					
					 dynamicPopup.open();
			 
				}*/
			//App.dialog.alert('Please ');
            // console.log('App initialized');
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
                    case 'downloadPlayer':
                        str = localStorage.getItem("COM.QUIKTRAK.DASHCAM.DOWNLOADPLAYER");
                        if(str) {
                            ret = JSON.parse(str);
                        }
                    break; 
                    case 'settingSurveillance':
                        str = localStorage.getItem("COM.QUIKTRAK.DASHCAM.SETTINGSURVEILLANCE");
                        if(str) {
                            ret = JSON.parse(str);
                        }
                    break; 
                    case 'settingSoundOn':
                        str = localStorage.getItem("COM.QUIKTRAK.DASHCAM.SETTINGSOUNDON");
                        if(str) {
                            ret = JSON.parse(str);
                        }
                    break; 
                    case 'settingVoiceParking':
                        str = localStorage.getItem("COM.QUIKTRAK.DASHCAM.SETTINGVOICEPARKING");
                        if(str) {
                            ret = JSON.parse(str);
                        }
                    break; 
                    case 'settingVoiceAlarm':
                        str = localStorage.getItem("COM.QUIKTRAK.DASHCAM.SETTINGVOICEALARM");
                        if(str) {
                            ret = JSON.parse(str);
                        }
                    break; 
                    case 'settingVoiceGesture':
                        str = localStorage.getItem("COM.QUIKTRAK.DASHCAM.SETTINGVOICEGESTURE");
                        if(str) {
                            ret = JSON.parse(str);
                        }
                    break; 
                    case 'currentSensitivity':
                        str = localStorage.getItem("COM.QUIKTRAK.DASHCAM.CURRENTSENSITIVITY");
                        if(str) {
                            ret = JSON.parse(str);
                        }
                    break; 
                    case 'currentGestureInduction':
                        str = localStorage.getItem("COM.QUIKTRAK.DASHCAM.CURRENTGESTUREINDUCTION");
                        if(str) {
                            ret = JSON.parse(str);
                        }
                    break; 
                    case 'currentLanguage':
                        str = localStorage.getItem("COM.QUIKTRAK.DASHCAM.CURRENTLANGUAGE");
                        if(str) {
                            ret = JSON.parse(str);
                        }
                    break; 
                    case 'currentResolution':
                        str = localStorage.getItem("COM.QUIKTRAK.DASHCAM.CURRENTRESOLUTION");
                        if(str) {
                            ret = JSON.parse(str);
                        }
                    break; 
                    case 'currentCamera':
                        str = localStorage.getItem("COM.QUIKTRAK.DASHCAM.CURRENTCAMERA");
                        if(str) {
                            ret = JSON.parse(str);
                        }
                    break; 
					case 'deletedCameras':
                        str = localStorage.getItem("COM.QUIKTRAK.DASHCAM.DELETEDCAMERAS");
                        if(str) {
                            ret = JSON.parse(str);
                        }
                    break; 
                    case 'alarmPhotoList':
                        str = localStorage.getItem("COM.QUIKTRAK.DASHCAM.ALARMPHOTOLIST");
                        if(str) {
                            ret = JSON.parse(str);
                        }
                    break;  
                    case 'gesturePhotoList':
                        str = localStorage.getItem("COM.QUIKTRAK.DASHCAM.GESTUREPHOTOLIST");
                        if(str) {
                            ret = JSON.parse(str);
                        }
                    break;  
                    case 'parkingPhotoList':
                        str = localStorage.getItem("COM.QUIKTRAK.DASHCAM.PARKINGPHOTOLIST");
                        if(str) {
                            ret = JSON.parse(str);
                        }
                    break;   
					case 'videoList':
						str = localStorage.getItem("COM.QUIKTRAK.DASHCAM.VIDEOLIST");
                        if(str) {
                            ret = JSON.parse(str);
                        }
					break;  
					case 'normalList':
						str = localStorage.getItem("COM.QUIKTRAK.DASHCAM.NORMALLIST");
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
                    case 'downloadPlayer':
                        localStorage.setItem("COM.QUIKTRAK.DASHCAM.DOWNLOADPLAYER", JSON.stringify(params.data));
                    break; 
                    case 'settingSurveillance':
                        localStorage.setItem("COM.QUIKTRAK.DASHCAM.SETTINGSURVEILLANCE", JSON.stringify(params.data));
                    break; 
                    case 'settingSoundOn':
                        localStorage.setItem("COM.QUIKTRAK.DASHCAM.SETTINGSOUNDON", JSON.stringify(params.data));
                    break; 
                    case 'settingVoiceParking':
                        localStorage.setItem("COM.QUIKTRAK.DASHCAM.SETTINGVOICEPARKING", JSON.stringify(params.data));
                    break; 
                    case 'settingVoiceAlarm':
                        localStorage.setItem("COM.QUIKTRAK.DASHCAM.SETTINGVOICEALARM", JSON.stringify(params.data));
                    break; 
                    case 'settingVoiceGesture':
                        localStorage.setItem("COM.QUIKTRAK.DASHCAM.SETTINGVOICEGESTURE", JSON.stringify(params.data));
                    break; 
                    case 'currentGestureInduction':
                        localStorage.setItem("COM.QUIKTRAK.DASHCAM.CURRENTGESTUREINDUCTION", JSON.stringify(params.data));
                    break; 
                    case 'currentLanguage':
                        localStorage.setItem("COM.QUIKTRAK.DASHCAM.CURRENTLANGUAGE", JSON.stringify(params.data));
                    break; 
                    case 'currentResolution':
                        localStorage.setItem("COM.QUIKTRAK.DASHCAM.CURRENTRESOLUTION", JSON.stringify(params.data));
                    break; 
                    case 'currentSensitivity':
                        localStorage.setItem("COM.QUIKTRAK.DASHCAM.CURRENTSENSITIVITY", JSON.stringify(params.data));
                    break; 
                    case 'currentCamera':
                        localStorage.setItem("COM.QUIKTRAK.DASHCAM.CURRENTCAMERA", JSON.stringify(params.data));
                    break; 
					case 'deletedCameras':
                        localStorage.setItem("COM.QUIKTRAK.DASHCAM.DELETEDCAMERAS", JSON.stringify(params.data));
                    break;     
                    case 'normalList':
                        localStorage.setItem("COM.QUIKTRAK.DASHCAM.NORMALLIST", JSON.stringify(params.data));
                    break; 
                    case 'alarmPhotoList':
                        localStorage.setItem("COM.QUIKTRAK.DASHCAM.ALARMPHOTOLIST", JSON.stringify(params.data));
                    break;  
                    case 'gesturePhotoList':
                        localStorage.setItem("COM.QUIKTRAK.DASHCAM.GESTUREPHOTOLIST", JSON.stringify(params.data));
                    break; 
                    case 'parkingPhotoList':
                        localStorage.setItem("COM.QUIKTRAK.DASHCAM.PARKINGPHOTOLIST", JSON.stringify(params.data));
                    break;      
                    case 'videoList':
                        localStorage.setItem("COM.QUIKTRAK.DASHCAM.VIDEOLIST", JSON.stringify(params.data));
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
 

$$('body').on('click', '.scanBarCode', function() {
    let input = $$(this).siblings('input');

    let permissions = cordova.plugins.permissions;
    if (!permissions) {
        App.alert('plugin not supported')
    } else {
        permissions.hasPermission(permissions.CAMERA, function(status) {
            // App.alert(JSON.stringify(status))

            if (status.hasPermission) {
                openBarCodeReader(input);
            } else {
                permissions.requestPermission(permissions.CAMERA, success, error);

                function error() {
                    App.alert('Camera permission is not turned on');
                }

                function success(status1) {
                    openBarCodeReader(input);
                    if (!status1.hasPermission) error();
                }
            }
        });

    }
});


function openBarCodeReader(input) {
    //console.log(input);
    if (window.device && cordova.plugins && cordova.plugins.barcodeScanner) {
        cordova.plugins.barcodeScanner.scan(
            function(result) {
                /*alert("We got a barcode\n" +
                      "Result: " + result.text + "\n" +
                      "Format: " + result.format + "\n" +
                      "Cancelled: " + result.cancelled);*/
                if (result && result.text) {
                    input.val(result.text);					
					if(input.attr('name') == 'searchInput') {
						submitSearchForm();
					}
                    input.change(); // fix to trigger onchange / oninput event listener
                }

            },
            function(error) {
                alert("Scanning failed: " + error);
            }, {
                //preferFrontCamera : true, // iOS and Android
                showFlipCameraButton: true, // iOS and Android
                showTorchButton: true, // iOS and Android
                torchOn: true, // Android, launch with the torch switched on (if available)
                //saveHistory: true, // Android, save scan history (default false)
                prompt: "Place a barcode inside the scan area", // Android
                resultDisplayDuration: 0, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
                //formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
                //orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
                //disableAnimations : true, // iOS
                //disableSuccessBeep: false // iOS and Android
            }
        );
    } else {
        App.alert('Your device does not support this function');
    }
}


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

