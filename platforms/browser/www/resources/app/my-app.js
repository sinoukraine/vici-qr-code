var $$ = Dom7;



// API ADRESS URL
const LOCAL_ADRESS = 'http://192.168.1.1/';
const API_COMMON_VIDEO_LIST = LOCAL_ADRESS + 'ini.htm?cmd=commonvideolist';
const API_ALARM_VIDEO_LIST = LOCAL_ADRESS + 'ini.htm?cmd=alarmvideolist';
const API_GET_GPS_POSITION = LOCAL_ADRESS + 'ini.htm?cmd=gpsdatalist';
const API_LIVE_STREAM = LOCAL_ADRESS + 'livesubstream.h264';
const API_DOWNLOAD = LOCAL_ADRESS + 'DCIM/';





var MapTrack = null;
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
    id: 'com.myapp.test',
    panel: {
        swipe: 'left',
        leftBreakpoint: 768,
    },
    routes: routes,
    on: {
        init: function() {
            // console.log('App initialized');

        },
        pageInit: function() {
            // console.log('Page initialized');
        },
    },
});

var mainView = App.views.create('.view-main');



$$('#connectCam').on('click', function() {
	console.log('play');
	
//VideoPlayer.play(API_LIVE_STREAM);
var videoUrl = API_LIVE_STREAM;

  // Just play a video
  window.plugins.streamingMedia.playVideo(videoUrl);
//window.plugins.html5Video.play("streamka");
//console.log('start');App.dialog.alert("Start Stream");
	
	/*var videoUrl = 'http://192.168.1.1/livesubstream.h264';
	window.plugins.html5Video.initialize({
			  "streamka" : "http://192.168.1.1/livesubstream.h264"
		  }, function initializeIsFinished() {
			  //console.log('okokokoko');
			  //App.dialog.alert("End Stream");
		  window.plugins.html5Video.play("streamka")
		})*/

  // Just play a video
  //window.plugins.streamingMedia.playVideo(videoUrl);

  // Play a video with callbacks
  /*var options = {
    successCallback: function() {
		App.dialog.alert("Video was closed without error.");
      console.log("Video was closed without error.");
    },
    errorCallback: function(errMsg) {
      console.log("Error! " + errMsg);
		App.dialog.alert("Error! " + errMsg);
    },
    orientation: 'landscape',
    shouldAutoClose: true,  // true(default)/false
    controls: true // true(default)/false. Used to hide controls on fullscreen
  };
  window.plugins.streamingMedia.playVideo(videoUrl, options);*/
 // App.dialog.alert("End Stream");
	//VideoPlayer.play('../../17102817_1237189569733103_7116754826582556672_n.mp4');
	
});

document.addEventListener("deviceready", onDeviceReady, false ); 

//function onPlusReady(){   
function onDeviceReady(){ 
	console.log('ready');
	/*window.plugins.html5Video.initialize({
	"streamka" : "http://192.168.1.1/livesubstream.h264"});*/
}

$$('#mainMenu li').on('click', menuList)

function menuList() {
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
                mainView.router.back({
                    pageName: 'home',
                    force: true
                });
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
            case 'info':
                if (typeof(activePage) == 'undefined' || (activePage && activePage.name != "info")) {
                    loadInfoPage();
                    App.panel.close($$('.panel-left'), true);
                }
                break;
            default:
                console.log('No Found list menu');
        }
    }
}

function getRecordPhoto(resolve) {	
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
				resolve(result);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown){ 
               console.log(textStatus,'error');
            }
        });		
    });   
}


function getRecordVideo(resolve) {	
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
               console.log(textStatus,'error');
            }
        });		
    });   
}


function loadCarcamPage() {
    mainView.router.load({
        url: 'index.html',
        context: {
            // FirstName: userInfo.FirstName,
        }
    });
}
/*
$$('.photo-list').on('click', '.photo-path', function(){
    TargetPhoto.PATH = $$(this).data("path");  

});*/

// OPEN PHOTO
function loadOpenPhotoPage() {    
    var asset = PHOTOLIST[TargetAsset.ASSET_IMEI];
    mainView.router.load({
        url: 'resources/templates/open.photo.html',
        context: {
            PhotoPath: userInfo.FirstName,
        }
    });
}


// GALLERY
function loadGalleryPage() {
    mainView.router.load({
        url: 'resources/templates/gallery.html',
        context: {
            // FirstName: userInfo.FirstName,
        }
    });
}


// PHOTO GALLERY
function loadGalleryPhotoPage() {
    mainView.router.load({
        url: 'resources/templates/gallery.photo.html',
        context: {
            // FirstName: userInfo.FirstName,
        }
    });
}


// DASHCAM VIDEO
function loadDashcamVideoPage() {
    mainView.router.load({
        url: 'resources/templates/dashcam.video.html',
        context: {
            // FirstName: userInfo.FirstName,
        }
    });
}


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
}


function sortDatePhoto(data) {
    //let infoArr = [];
    let dataObj = data;
    //let sortArr = [];
	let dateArr = [];
	let dataArr = [];
    //console.log(dataObj);

    // info array push
    for (let i = 0; i < dataObj.mp4data.length; i++) {
        /*infoArr.push({
            data: (dataObj.mp4data[i].time.substring(0, 8)).substring(0, 4) + '/' + (dataObj.mp4data[i].time.substring(0, 8)).substring(4, 6) + '/' + (dataObj.mp4data[i].time.substring(0, 8)).substring(6, 9),
            photoName: dataObj.mp4data[i].title
        });*/
		
		let newDate = (dataObj.mp4data[i].time.substring(0, 8)).substring(0, 4) + '/' + (dataObj.mp4data[i].time.substring(0, 8)).substring(4, 6) + '/' + (dataObj.mp4data[i].time.substring(0, 8)).substring(6, 9);
			
        let index = dateArr.findIndex(item => item.title === newDate);
		
		if(index == -1){
			dataArr.push(dataObj.mp4data[i]);
			dateArr.push({
				title: (dataObj.mp4data[i].time.substring(0, 8)).substring(0, 4) + '/' + (dataObj.mp4data[i].time.substring(0, 8)).substring(4, 6) + '/' + (dataObj.mp4data[i].time.substring(0, 8)).substring(6, 9),
				data: dataArr
			});
		}else{
			dateArr[index].data.push(dataObj.mp4data[i]);
		}
    }
	
	return dateArr;
	
	
	/*
	console.log( dateArr ); // кришна, харе, 8-()
    ////console.log(infoArr);

    for (let i = 0; i < infoArr.length; i++) {
        if (infoArr[i] !== '') {
            if (sortArr.length == 0) {
                sortArr.push({
                    Date: infoArr[i].data,
                    Photo: infoArr[i].photoName
                });
            } else {
                // for (let p = 0; p < sortArr.length; p++) {
                //     if (sortArr[p].Date !== infoArr[i].data) {
                //         sortArr.push({
                //             Date: infoArr[i].data,
                //             Photo: infoArr[i].photoName
                //         });
                //     }

                // }
            }
        } else {
            App.dialog.alert('Not Found');
        }
    }

*/

}


$$(document).on('page:init', '.page[data-name="gallery"]', function(e) {
    let toolbarLinks = $$('.tab-link');
    let getPhotoJson = { 
		"type": "alarmvideo", 
		"mp4folder": "DCIM/101video", 
		"titlefolder": "DCIM/105thumb", 
		"imagefolder": "DCIM/104snap", 
		"mp4data": [] 
	};
	/*
	let getPhotoJson = { 
		"type": "commonvideo", 
		"mp4folder": "DCIM/100video", 
		"titlefolder": "DCIM/103thumb", 
		"thumbfolder": "DCIM/102thumb", 
		"mp4data": [] 
	};*/
	
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
						ret += 					'<a href="http://192.168.1.1/DCIM/104snap/'+item.data[d].associateddata[a].image+'"  class="" data-photo="'+item.data[d].associateddata[a].image+'">' +
												'<div class="item-content">' +
												'<div class="item-media photo-item-media">' +
												'<img class="photo-path" data-path="data-path="http://192.168.1.1/DCIM/104snap/'+item.data[d].associateddata[a].image+'" src="http://192.168.1.1/DCIM/104snap/'+item.data[d].associateddata[a].image+'">' +
												
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


function openPlayer(url){
	VideoPlayer.play(url);
}



// INIT VIDEO GALLERY

$$(document).on('page:init', '.page[data-name="gallery.video"]', function(e) {
    let toolbarLinks = $$('.tab-link');
    //let getPhotoJson = getRecordVideo();
    //let videolist = [];

    toolbarLinks.on('click', function() {
        let dataId = $$(this).attr('data-id');
        if (dataId == 'gallery.photo') {
            loadGalleryPhotoPage();
        }
    });

/*
    for (let i = 0; i < getPhotoJson.mp4data.length; i++) {
        videolist.push(getPhotoJson.mp4data[i].filename);
    }


    let items = [];
    for (let i = 0; i < videolist.length; i++) {
        items.push({
            title: 'Dachcam name #' + videolist[i],
            value: videolist[i],
        });
    }*/

    ////console.log(items);

	let getPhotoJson = { 
		"type": "commonvideo", 
		"mp4folder": "DCIM/100video", 
		"titlefolder": "DCIM/103thumb", 
		"thumbfolder": "DCIM/102thumb", 
		"mp4data": [] 
	};
	
	getRecordVideo().then(response => {
		getPhotoJson = response;
		console.log('1',getPhotoJson);	
		
		let dateItems = [];
		let dateObj = getDate(getPhotoJson);
		let dateArr = sortDatePhoto(getPhotoJson);
		
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
	/*
    let loadVideoList = App.virtualList.create({
        el: '.load-video-list',
        items: items,
        searchAll: function(query, items) {
            let found = [];
            for (let i = 0; i < items.length; i++) {
                if (items[i].title.toLowerCase().indexOf(query.toLowerCase()) >= 0 || query.trim() === '') found.push(i);
            }
            return found;
        },
        itemTemplate: '<li>' +
            '<label class="item-radio item-content">' +
            '<input type="radio" name="demo-radio" value="{{value}}"/>' +
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
        height: app.theme === 'ios' ? 73 : (app.theme === 'md' ? 73 : 73),
    });
*/



});

function loadGalleryVideoPage() {
    mainView.router.load({
        url: 'resources/templates/gallery.video.html',
        context: {
            // FirstName: userInfo.FirstName,
        }
    });
}


function loadInfoPage() {
    mainView.router.load({
        url: 'resources/templates/info.html',
        context: {
            // FirstName: userInfo.FirstName,
        }
    });
}

function loadCarcamPage() {
    console.log('Carcam page');
}



// INIT DELETE CAM

$$(document).on('page:init', '.page[data-name="delete.cam"]', function(e) {

    var items = [];
    for (var i = 1; i <= 8; i++) {
        items.push({
            title: 'Item ' + i,
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
            '<input type="checkbox" name="demo-checkbox" value="{{value}}"/>' +
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


function loadDeleteCamPage() {
    mainView.router.load({
        url: 'resources/templates/delete.cam.html',
        context: {
            // FirstName: userInfo.FirstName,
        }
    });
}




// INIT OPEN PAGE DASHCAM LIST

$$(document).on('page:init', '.page[data-name="open.dashcam"]', function(e) {

    var items = [];
    for (var i = 1; i <= 3; i++) {
        items.push({
            title: 'Dachcam name #' + i,
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
            '<input type="radio" name="demo-radio" value="{{value}}"/>' +
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
});




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