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
                    case 'currentSensitivity':
                        str = localStorage.getItem("COM.QUIKTRAK.DASHCAM.CURRENTSENSITIVITY");
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
                    case 'settingSurveillance':
                        localStorage.setItem("COM.QUIKTRAK.DASHCAM.SETTINGSURVEILLANCE", JSON.stringify(params.data));
                    break; 
                    case 'settingSoundOn':
                        localStorage.setItem("COM.QUIKTRAK.DASHCAM.SETTINGSOUNDON", JSON.stringify(params.data));
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
		getRecordPhoto: function(resolve, reject){ 		
			return new Promise((resolve, reject) => {
				$.ajax({
					   type: "GET",
				   dataType: "json", 
					  jsonp: false,
						url: 'http://192.168.1.1/ini.htm?cmd=alarmvideolist',
					  async: true,           
						crossDomain: true, 
					  cache: false,
					success: function (result) {    
						//if (resolve) {
						resolve(result);
						//}
					},
					error: function(XMLHttpRequest, textStatus, errorThrown){ 
					   console.log(textStatus,'error_photo');
						//if (reject) {
						reject();
						//}  
					}
					
				});		
			});   			
		},
		getVRecordPhoto: function(resolve, reject){ 			
			return new Promise((resolve, reject) => {
				let url = 'http://192.168.1.1/DCIM/104snap/';
				let params = {};
				let headers = {};
				let newArr = [];
				cordova.plugin.http.get(url, 
					params, headers, (response) => {
						//App.dialog.alert('rec_good');
						var arrParse = response.data.split('</a>');
						arrParse.forEach(function(value, index) {
							var valParse = value.split('>');						
							if(index > 0 && index < arrParse.length - 1){
								newArr.push(valParse[1]);					
							}
						});
						
						//console.log(newArr);					
						resolve(newArr);
				}, function(response) {
						//App.dialog.alert(response.error);
				  console.error(response.error);
				  reject();
				});	
			});				
		},
		getRecordVideo: function (resolve, reject) {	
			return new Promise((resolve, reject) => {
				$.ajax({
					   type: "GET",
				   dataType: "json", 
						/*dataFilter: function(raw, type) {
						console.log(raw, type);
						return JSON.parse(raw);
						{ 
					"filename": "20190523121307_180_720p.MP4", 
					"duration": 180, 
					"filesize": 94716138, 
					"title": "20190523121307.JPG", 
					"titlesize": 5817, 
					"thumb": "20190523121307.TGZ", 
					"thumbsize": 36302, 
					"time": "20190523121307" 
				 }
					},*/
					
					  jsonp: false,
					  //jsonpCallback: "onJsonP",
						url: 'http://192.168.1.1/ini.htm?cmd=commonvideolist',
					  async: true,           
						crossDomain: true, 
					  cache: false,
					success: function (result) {    
						//console.log('res', result, 'ault');
						//data = result;
						resolve(result);
					},
					error: function(XMLHttpRequest, textStatus, errorThrown){ 
					   console.log(textStatus,'error_video');
					}
				});		
			});   
		},		
        sortParseDatePhoto: function(data){
			//let infoArr = [];
			let dataObj = data;
			//let sortArr = [];
			let dateArr = [];
			//console.log(dataObj);
			//App.dialog.alert(dataObj.length);
			// info array push
			for (let i = dataObj.length - 1; i >= 0; i--) {
				let dataArr = [];
				/*infoArr.push({
					data: (dataObj.mp4data[i].time.substring(0, 8)).substring(0, 4) + '/' + (dataObj.mp4data[i].time.substring(0, 8)).substring(4, 6) + '/' + (dataObj.mp4data[i].time.substring(0, 8)).substring(6, 9),
					photoName: dataObj.mp4data[i].title
				});*/
				let timeArr = dataObj[i].split('.');
				//console.log(timeArr);
				let filename = timeArr[0];
				let time = timeArr[0].substring(1, 15);
				//alert(time);
								
				let newDate = (time.substring(0, 8)).substring(0, 4) + '/' + (time.substring(0, 8)).substring(4, 6) + '/' + (time.substring(0, 8)).substring(6, 9);
					
				let index = dateArr.findIndex(item => item.title === newDate);
				
				if(index == -1){
					dataArr.push(dataObj[i]);
					dateArr.push({
						title: (time.substring(0, 8)).substring(0, 4) + '/' + (time.substring(0, 8)).substring(4, 6) + '/' + (time.substring(0, 8)).substring(6, 9),
						data: dataArr
					});
				}else{
					dateArr[index].data.push(dataObj[i]);
				}
			}
			
			
			return dateArr;
		},
        sortDatePhoto: function(data){
			//console.log(data);
			//let infoArr = [];
			let dataObj = data;
			//let sortArr = [];
			let dateArr = [];
			
			// info array push
			for (let i = 0; i < dataObj.length; i++) {
				let dataArr = [];
				/*infoArr.push({
					data: (dataObj.mp4data[i].time.substring(0, 8)).substring(0, 4) + '/' + (dataObj.mp4data[i].time.substring(0, 8)).substring(4, 6) + '/' + (dataObj.mp4data[i].time.substring(0, 8)).substring(6, 9),
					photoName: dataObj.mp4data[i].title
				});*/
				
				let newDate = (dataObj[i].time.substring(0, 8)).substring(0, 4) + '/' + (dataObj[i].time.substring(0, 8)).substring(4, 6) + '/' + (dataObj[i].time.substring(0, 8)).substring(6, 9);
					
				let index = dateArr.findIndex(item => item.title === newDate);
				
				if(index == -1){
					dataArr.push(dataObj[i]);
					dateArr.push({
						title: (dataObj[i].time.substring(0, 8)).substring(0, 4) + '/' + (dataObj[i].time.substring(0, 8)).substring(4, 6) + '/' + (dataObj[i].time.substring(0, 8)).substring(6, 9),
						data: dataArr
					});
				}else{
					dateArr[index].data.push(dataObj[i]);
				}
			}
			
			return dateArr;
		},		
		openPlayer: function(url){
			VideoPlayer.play(url);			
		},
		downloadFiles: function(arr = []){
			if(arr.length){						
                //App.preloader.show();
				//$$('.view-main .progressbar-infinite').removeClass('display-none');
				//App.dialog.alert('Please wait for downloading files, it can takes few minutes...'); 
				arr.forEach(function(value, index) {
					if(value.url.length > 0 && value.dir.length > 0 && value.name.length > 0){
						$$('.view-main .progressbar-infinite').removeClass('display-none');
						DownloadFile(value.url, value.dir, value.name);
					}else{						
						App.dialog.alert('Can not download this file');
					}
				});
			}else{
				App.dialog.alert('Please choose files');
			}				
		},
		openCamList: function(){
			loadListPage();		
		},
		openCam: function(){
			loadCarcamPage();		
		},
		getTest: function () {	
			/*let url = 'http://192.168.1.1/DCIM/104snap/';
			let params = {};
			let headers = {};
			let newArr = [];
			cordova.plugin.http.get(url, 
				params, headers, (response) => {
					var arrParse = response.data.split('</a>');
					arrParse.forEach(function(value, index) {
						var valParse = value.split('>');						
						if(index > 0 && index < arrParse.length - 1){
							newArr.push(valParse[1]);					
						}
					});
					
					console.log(newArr);
			}, function(response) {
			  console.error(response.error);
			});	*/	 
		},
		hexToDec: function (hex) {	
		  var result = 0, digitValue;
		  hex = hex.toLowerCase();
		  for (var i = 0; i < hex.length; i++) {
			digitValue = '0123456789abcdef'.indexOf(hex[ i ]);
			result = result * 16 + digitValue;
		  }
		  return result;
		}
	}
});

/*start wifi manage*/

/*function ssidHandler(s) {
	App.dialog.alert('Current SSID is '+s);
}

function getCurrentSSID() {
    WifiWizard.getCurrentSSID(ssidHandler, fail);
}

function listHandler(a) {
    alert(a);
}*/

/*end wifi manage*/

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
}

	
var mainView = App.views.create('.view-main');

/*start download file*/

//First step check parameters mismatch and checking network connection if available call    download function
function DownloadFile(URL, Folder_Name, File_Name) {
	//Parameters mismatch check
	if (URL == null && Folder_Name == null && File_Name == null) {
		return;
	}
	else {
		//checking Internet connection availablity
		var networkState = navigator.connection.type;
		if (networkState == Connection.NONE) {
			return;
		} else {
			download(URL, Folder_Name, File_Name); //If available download function call
		}
	}
}


function filetransfer(download_link, fp) {	
	var fileTransfer = new FileTransfer();
	// File download function with URL and local path
	fileTransfer.download(download_link, fp,
		function (entry) {
			//alert("download complete: " + entry.fullPath);
			window.plugins.scanmedia.scanFile(fp, function (msg) {				
				$$('.view-main .progressbar-infinite').addClass('display-none');
				App.dialog.alert("File uploaded");
			}, function (err) {
				$$('.view-main .progressbar-infinite').addClass('display-none');
				App.dialog.alert("File not uploaded");
			})
		},
		function (error) {		
			App.preloader.hide(); 
			App.dialog.alert('Please try once more');
		}
    );
}
/*
function readfile(Folder_Name, File_Name) {	
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fileSystemSuccess, fileSystemFail);
	
	function fileSystemSuccess(fileSystem) {
		var directoryEntry = fileSystem.root; // to get root path of directory
		directoryEntry.getDirectory(Folder_Name, { create: true, exclusive: false }, onDirectorySuccess, onDirectoryFail); // creating folder in sdcard
		var rootdir = fileSystem.root;
		var fp = rootdir.toURL(); 
		//var fp = cordova.file.dataDirectory;
		//App.dialog.alert(rootdir + '..' + rootdir.toURL());// Returns Fulpath of local directory
		//var fp = "file:///storage/sdcard0'";
		//fp = 'file:///data/user/0/com.sinopacific.dashcamtest/files/' + Folder_Name + "/" + File_Name + "." + ext;
		fp = fp + "/" + Folder_Name + "/" + File_Name + "." + ext; // fullpath and name of the file which we want to give
		// download function call
		filetransfer(download_link, fp);
	}
	
	function onDirectorySuccess(parent) {
		// Directory created successfuly
	}

	function onDirectoryFail(error) {
		//Error while creating directory
		App.dialog.alert("Unable to read new directory: " + error.code);
	}

	function fileSystemFail(evt) {
		//Unable to access file system
		App.dialog.alert(evt.target.error.code);
	}
}
*/
function download(URL, Folder_Name, File_Name) {
//step to request a file system 
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fileSystemSuccess, fileSystemFail);

	function fileSystemSuccess(fileSystem) {
		var download_link = encodeURI(URL);
		ext = download_link.substr(download_link.lastIndexOf('.') + 1); //Get extension of URL

		var directoryEntry = fileSystem.root; // to get root path of directory
		directoryEntry.getDirectory(Folder_Name, { create: true, exclusive: false }, onDirectorySuccess, onDirectoryFail); // creating folder in sdcard
		var rootdir = fileSystem.root;
		var fp = rootdir.toURL(); 
		//var fp = cordova.file.dataDirectory;
		//App.dialog.alert(rootdir + '..' + rootdir.toURL());// Returns Fulpath of local directory
		//var fp = "file:///storage/sdcard0'";
		//fp = 'file:///data/user/0/com.sinopacific.dashcamtest/files/' + Folder_Name + "/" + File_Name + "." + ext;
		fp = fp + "/" + Folder_Name + "/" + File_Name;// + "." + ext; // fullpath and name of the file which we want to give
		// download function call
		filetransfer(download_link, fp);
	}

	function onDirectorySuccess(parent) {
		// Directory created successfuly
	}

	function onDirectoryFail(error) {
		//Error while creating directory
		App.dialog.alert("Unable to create new directory: " + error.code);
	}

	function fileSystemFail(evt) {
		//Unable to access file system
		App.dialog.alert(evt.target.error.code);
	}
}

/*end download file*/

$$('#mainMenu li').on('click', menuList)

function menuList() {		
	//if(validWiFi){		
		let listId = $$(this).attr('id');
		let activePage = mainView.activePage;
		
		if (listId) {
			switch (listId) {
				case 'carcam':
					// if (typeof(activePage) == 'undefined' || (activePage && activePage.name != "delete.cam")) {
					//     loadCarcamPage();
					//     console.log('open cam');
					//     App.panel.close($$('.panel-left'), true);
					// }
					loadCarcamPage();
					/*mainView.router.back({
						pageName: 'home',
						force: true
					});*/
					App.panel.close($$('.panel-left'), true);
					break;
				case 'delete.cam':
					if (typeof(activePage) == 'undefined' || (activePage && activePage.name != "delete.cam")) {
						loadDeleteCamPage();
						console.log('open del');
						App.panel.close($$('.panel-left'), true);
					}
					break;
				case 'gallery':
					if (typeof(activePage) == 'undefined' || (activePage && activePage.name != "gallery")) {
						loadGalleryPage();
						App.panel.close($$('.panel-left'), true);
					}
					break;
				case 'videos':
					if (typeof(activePage) == 'undefined' || (activePage && activePage.name != "videos")) {
						loadVideosPage();
						App.panel.close($$('.panel-left'), true);
					}
					break;
				case 'info':
					if (typeof(activePage) == 'undefined' || (activePage && activePage.name != "info")) {
						loadInfoPage();
						App.panel.close($$('.panel-left'), true);
					}
					break;
				case 'list':
					if (typeof(activePage) == 'undefined' || (activePage && activePage.name != "list")) {
						loadListPage();
						App.panel.close($$('.panel-left'), true);
					}
					break;
				case 'settings':
					if (typeof(activePage) == 'undefined' || (activePage && activePage.name != "settings")) {
						loadSettingsPage();
						App.panel.close($$('.panel-left'), true);
					}
					break;
				case 'help':
					if (typeof(activePage) == 'undefined' || (activePage && activePage.name != "help")) {
						loadHintsPage();
						App.panel.close($$('.panel-left'), true);
					}
					break;
				default:
					console.log('No Found list menu');
			}
		}
	//}else{		
	//	App.dialog.alert('Please connect to camera');		
	//}	
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

// INFO
function loadInfoPage() {	
	//mainView.router.navigate('/my-info/');
    mainView.router.load({
        url: 'resources/templates/info.html',
        context: {
            // FirstName: userInfo.FirstName,
        }
    });
}

// SETTINGS
function loadSettingsPage() {	
	mainView.router.navigate('/my-settings/');
    /*mainView.router.load({
        url: 'resources/templates/dashcam.setting.html',
        context: {
            // FirstName: userInfo.FirstName,
        }
    });*/
}

function loadDeleteCamPage() {
	mainView.router.navigate('/my-delete-cam/');
}
/* ---
function getDate(data) {
    let arr = [];
    let dateTime = [];
    // class date, time
    function Obj(dateArr, timeArr) {
        this.date = dateArr.substring(0, 4) + '/' + dateArr.substring(4, 6) + '/' + dateArr.substring(6, 9);
        this.time = timeArr.substring(0, 2) + '.' + timeArr.substring(2, 4) + '.' + timeArr.substring(4, 7);
    }

    // add in arr datetime 
    for (let i = 0; i < data.mp4data.length; i++) {
        arr.push(data.mp4data[i].time);
    }

    // add in arr object with date and time
    for (let i = 0; i < arr.length; i++) {
        let newDataTime = new Obj(arr[i].substring(0, 8), arr[i].substring(8, 14));
        dateTime.push(newDataTime);
    }

    return dateTime;
}*/


/*---
$$(document).on('page:init', '.page[data-name="gallery"]', function(e) {
    let toolbarLinks = $$('.tab-link');
    let getPhotoJson = { 
		"type": "alarmvideo", 
		"mp4folder": "DCIM/101video", 
		"titlefolder": "DCIM/105thumb", 
		"imagefolder": "DCIM/104snap", 
		"mp4data": [] 
	};
	
	getRecordPhoto().then(response => {
		getPhotoJson = response;
		console.log('2',getPhotoJson);	
		
		let dateItems = [];
		let dateObj = getDate(getPhotoJson);
		let dateArr = sortDatePhoto(getPhotoJson);
		
		

		let loadPhotoList = App.virtualList.create({
			el: '.photo-list',
			items: dateArr,
			searchAll: function(query, items) {
				let found = [];
				for (let i = 0; i < items.length; i++) {
					if (items[i].title.toLowerCase().indexOf(query.toLowerCase()) >= 0 || query.trim() === '') found.push(i);
				}
				return found;
			},	
			renderItem: function (item, index) {   	
			
				var ret = '';
				
				ret += '<div class="list media-list">';
				ret += '  <ul>';
				ret += '	<li>';
				ret += '	  <div class="item-content">      ';  
				ret += '		<div class="item-inner">';
				ret += '		  <div class="item-title-row">';
				ret += '			<div class="item-title">' + item.title + '</div>  ';          
				ret += '		  </div>          ';
				ret += '		  <div class="item-text">';
				ret += '			<div class="row">';
				
				for (let d = 0; d < item.data.length; d ++){	
					let time = item.data[d].time.substring(8, 10) + ':' + item.data[d].time.substring(12, 14);
					for (let a = 0; a < item.data[d].associateddata.length; a ++){
					
						ret += '			  <div class="col-50">';
						ret += 					'<a href="/photo/?code=http://192.168.1.1/DCIM/104snap/'+item.data[d].associateddata[a].image+'" class="" data-photo="'+item.data[d].associateddata[a].image+'">' +
												'<div class="item-content">' +
												'<div class="item-media photo-item-media">' +
												'<img class="photo-path" data-path="http://192.168.1.1/DCIM/104snap/'+item.data[d].associateddata[a].image+'" src="http://192.168.1.1/DCIM/104snap/'+item.data[d].associateddata[a].image+'">' +
												
												'</div>' +
												'</div>' +
												'</a>';
						ret += '			  </div> ';			
					}						
				}
				
				ret += '			</div>';
				ret += '		  </div>';
				ret += '		</div>';
				ret += '	  </div>';
				ret += '	</li>';
				ret += '  </ul>';
				ret += '</div>';
				
				return ret;
			},
			
			height: app.theme === 'ios' ? 73 : (app.theme === 'md' ? 73 : 73),
		});
		
	}, error => {
        console.log('something wrong...');
    });
	
	
	//upload video list
	
	let getVideoJson = { 
		"type": "commonvideo", 
		"mp4folder": "DCIM/100video", 
		"titlefolder": "DCIM/103thumb", 
		"thumbfolder": "DCIM/102thumb", 
		"mp4data": [] 
	};
	
	getRecordVideo().then(response => {
		getVideoJson = response;
		console.log('1',getVideoJson);	
		
		let dateItems = [];
		let dateObj = getDate(getVideoJson);
		let dateArr = sortDatePhoto(getVideoJson);
		let loadVideoList = App.virtualList.create({
			el: '.video-list',
			items: dateArr,
			searchAll: function(query, items) {
				let found = [];
				for (let i = 0; i < items.length; i++) {
					if (items[i].title.toLowerCase().indexOf(query.toLowerCase()) >= 0 || query.trim() === '') found.push(i);
				}
				return found;
			},	
			renderItem: function (item, index) {   	
			
				var ret = '';
				
				ret += '<div class="list media-list">';
				ret += '  <ul>';
				ret += '	<li>';
				ret += '	  <div class="item-content">      ';  
				ret += '		<div class="item-inner">';
				ret += '		  <div class="item-title-row">';
				ret += '			<div class="item-title">' + item.title + '</div>  ';          
				ret += '		  </div>          ';
				ret += '		  <div class="item-text">';
				ret += '			<div class="row">';
				
				for (let d = 0; d < item.data.length; d ++){	
					let time = item.data[d].time.substring(8, 10) + ':' + item.data[d].time.substring(12, 14);
					
					ret += '			  <div class="col-50">';
					ret += 					'<a href="#" onclick="openPlayer(\'http://192.168.1.1/DCIM/100video/'+item.data[d].filename+'\')" class="" data-video="'+item.data[d].filename+'">' +
											'<div class="item-content">' +
											'<div class="item-media video-item-media">' +
											'<img src="http://192.168.1.1/DCIM/103thumb/'+item.data[d].title+'">' +
											'<div class="item-media-bottom">' +
											'<div class="item-media-quality">720p</div>' +
											'<div class="item-media-time">'+time+'</div>' +
											'</div>' +
											'</div>' +
											'</div>' +
											'</a>';
					ret += '			  </div> ';					
				}
				
				ret += '			</div>';
				ret += '		  </div>';
				ret += '		</div>';
				ret += '	  </div>';
				ret += '	</li>';
				ret += '  </ul>';
				ret += '</div>';
				
				return ret;
			},
			height: app.theme === 'ios' ? 73 : (app.theme === 'md' ? 73 : 73),
		});
	
	}, error => {
        console.log('something wrong...');
    });
	
});
*/


// INIT DELETE CAM
/*---
$$(document).on('page:init', '.page[data-name="delete.cam"]', function(e) {

    var items = [];
    for (var i = 1; i <= 1; i++) {
        items.push({
            title: 'AUTO-VOX D6PRO 06ac',
            value: i,
        });
    }

    var deletecamList = App.virtualList.create({
        // List Element
        el: '.delete-cam-list',
        // Pass array with items
        items: items,
        // Custom search function for searchbar
        searchAll: function(query, items) {
            var found = [];
            for (var i = 0; i < items.length; i++) {
                if (items[i].title.toLowerCase().indexOf(query.toLowerCase()) >= 0 || query.trim() === '') found.push(i);
            }
            return found; //return array with mathced indexes
        },
        // List item Template7 template
        itemTemplate: '<li>' +
            '<label class="item-checkbox item-content">' +
            '<input type="checkbox" name="demo-checkbox" value="{{value}}" />' +
            '<div class="item-media">' +
            '<div class="item-media-inner">' +
            '<p>DC</p>' +
            '</div>' +
            '</div>' +
            '<div class="item-inner">' +
            '<div class="item-title">{{title}}</div>' +
            '</div>' +
            '<i class="icon icon-checkbox"></i>' +
            '</label>' +
            '</li>',
        // Item height
        height: app.theme === 'ios' ? 73 : (app.theme === 'md' ? 73 : 73),
    });
});
-->

// INIT OPEN PAGE DASHCAM LIST
/*---
$$(document).on('page:init', '.page[data-name="open.dashcam"]', function(e) {

    var items = [];
    for (var i = 1; i <= 1; i++) {
        items.push({
            title: 'AUTO-VOX D6PRO 06ac',
            value: i,
        });
    }

    var deletecamList = App.virtualList.create({
        // List Element
        el: '.open-cam-list',
        // Pass array with items
        items: items,
        // Custom search function for searchbar
        searchAll: function(query, items) {
            var found = [];
            for (var i = 0; i < items.length; i++) {
                if (items[i].title.toLowerCase().indexOf(query.toLowerCase()) >= 0 || query.trim() === '') found.push(i);
            }
            return found; //return array with mathced indexes
        },
        // List item Template7 template
        itemTemplate: '<li>' +
            '<label class="item-radio item-content">' +
            '<input type="radio" name="demo-radio" value="{{value}}" checked="checked"/>' +
            '<div class="item-media">' +
            '<div class="item-media-inner">' +
            '<p>DC</p>' +
            '</div>' +
            '</div>' +
            '<div class="item-inner">' +
            '<div class="item-title">{{title}}</div>' +
            '</div>' +
            '<i class="icon icon-radio"></i>' +
            '</label>' +
            '</li>',
        // Item height
        height: app.theme === 'ios' ? 73 : (app.theme === 'md' ? 73 : 73),
    });
});*/


//$('.view-main').on('click', '#toolbarDeleteCam', function () {  	
	//WifiWizard.disconnectNetwork('AUTO-VOX D6PRO 06ac', winDelete, failDelete);
//});
/*
function winDelete(){	
	App.dialog.alert('Camera AUTO-VOX D6PRO 06ac deleted');	
	validWiFi = false;
	loadListPage();
}

function failDelete(){	
	App.dialog.alert('Camera not deleted');
}*/

// INIT NORMAL VIDEO LIST PAGE

$$(document).on('page:init', '.page[data-name="normal.dashcam"]', function(e) {

    var items = [];
    for (var i = 1; i <= 3; i++) {
        items.push({
            title: 'Dachcam name #' + i,
            value: i,
        });
    }

    var showNormalVideoList = App.virtualList.create({
        // List Element
        el: '.show-normal-list',
        // Pass array with items
        items: items,
        // Custom search function for searchbar
        searchAll: function(query, items) {
            var found = [];
            for (var i = 0; i < items.length; i++) {
                if (items[i].title.toLowerCase().indexOf(query.toLowerCase()) >= 0 || query.trim() === '') found.push(i);
            }
            return found; //return array with mathced indexes
        },
        // List item Template7 template
        itemTemplate: '<li>' +
            '</li>',
        // Item height
        height: app.theme === 'ios' ? 73 : (app.theme === 'md' ? 73 : 73),
    });
});

