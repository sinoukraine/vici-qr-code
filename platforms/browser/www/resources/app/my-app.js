var $$ = Dom7;

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


// let testJSON = {
//     "type":"commonvideo",
//     "mp4folder":"DCIM/100video",
//     "titlefolder":"DCIM/103thumb",
//     "thumbfolder":"DCIM/102thumb",
//     "mp4data":[{
//         "filename":"20190520185204_143_720p.MP4",
//         "duration":143,
//         "filesize":75033472,
//         "title":"20190520185204.JPG",
//         "titlesize":3776,
//         "thumb":"20190520185204.TGZ",
//         "thumbsize":21454,
//         "time":"20190520185204"
//     },
//     {
//         "filename":"20190520184904_180_720p.MP4",
//         "duration":180,
//         "filesize":94661158,
//         "title":"20190520184904.JPG",
//         "titlesize":3576,
//         "thumb":"20190520184904.TGZ",
//         "thumbsize":26584,
//         "time":"20190520184904"
//     },
//    {
//        "filename":"20190520181904_180_720p.MP4",
//        "duration":180,
//        "filesize":94748892,
//        "title":"20190520181904.JPG",
//        "titlesize":3895,
//        "thumb":"20190520181904.TGZ",
//        "thumbsize":28267,
//        "time":"20190520181904"
//     },
//     {
//         "filename":"20190520181604_180_720p.MP4",
//         "duration":180,
//         "filesize":94717752,
//         "title":"20190520181604.JPG",
//         "titlesize":3892,
//         "thumb":"20190520181604.TGZ",
//         "thumbsize":28993,
//         "time":"20190520181604"
//     },
//     {
//         "filename":"20190520181304_180_720p.MP4",
//         "duration":180,
//         "filesize":94772632,
//         "title":"20190520181304.JPG",
//         "titlesize":3971,
//         "thumb":"20190520181304.TGZ",
//         "thumbsize":29247,
//         "time":"20190520181304"
//     }]
// }




// document.addEventListener('deviceready', function() {
//     connectWifi();
// }, false);



// function getConnectedSSID() {
//     App.dialog.alert('getConnect function');
//     WifiWizard2.getConnectedSSID();
// }

// function connectWifi() {
//     WifiWizard2.timeout(4000).then(function() {
//         App.dialog.alert('timeout work');
//         WifiWizard2.getConnectedSSID().then(function(ssid) {
//             App.dialog.alert('SSID: ' + ssid);
//         });
//     })
// }




// var videoUrl = 'https: //www.youtube.com/watch?v=jXFkL0yuS2Q'; // эту ссылку взял с доки по камере 

// // Play a video with callbacks
// var options = {
//     successCallback: function() {
//         App.dialog.alert("Video was closed without error.");
//     },
//     errorCallback: function(errMsg) {
//         App.dialog.alert("Error! " + errMsg);
//     },
//     orientation: 'portrait', //landscape
//     shouldAutoClose: true, // true(default)/false
//     controls: true // true(default)/false. Used to hide controls on fullscreen
// };

// function startLive() {
//     App.dialog.alert('start function');
//     window.plugins.streamingMedia.playVideo(videoUrl, options);
// }




$$('#connectCam').on('click', function() {
    // App.dialog.alert('start Live');
    // let url = 'http://192.168.1.1/ini.htm?cmd=gpsdatalist';
    // JSON1.jsonp(url, function(result){                 
    //     console.log(result);     
    // });

    onJsonP = function(arg) {
        alert(arg);
    }
    
    $.ajax({
               type: "GET",
                dataType: "jsonp", 
                dataFilter: function(raw, type) {
                console.log(raw, type);
                return JSON.parse(raw);
            },
              jsonp: false,
              jsonpCallback: "onJsonP",
                url: 'http://192.168.1.1/ini.htm?cmd=gpsdatalist',
              async: true,           
                crossDomain: true, 
              cache: false,
            success: function (result) {    
                console.log(result);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown){ 
               console.log(textStatus,'error');
            }
        });
    
   
});








$$('#mainMenu li').on('click', menuList)

function menuList() {
    let listId = $$(this).attr('id');
    let activePage = mainView.activePage;
    console.log(activePage);

    if (listId) {
        switch (listId) {
            case 'carcam':
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
            case 'gallery.photo':
                if (typeof(activePage) == 'undefined' || (activePage && activePage.name != "gallery.photo")) {
                    loadGalleryPhotoPage();
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







$$(document).on('page:init', '.page[data-name="gallery.photo"]', function(e) {
    let toolbarLinks = $$('.tab-link');
    toolbarLinks.on('click', function() {
        let dataId = $$(this).attr('data-id');
        if (dataId == 'gallery.video') {
            loadGalleryVideoPage();
        }
    });
});

function loadGalleryPhotoPage() {
    mainView.router.load({
        url: 'resources/templates/gallery.photo.html',
        context: {
            // FirstName: userInfo.FirstName,
        }
    });
}



$$(document).on('page:init', '.page[data-name="gallery.video"]', function(e) {
    let toolbarLinks = $$('.tab-link');
    toolbarLinks.on('click', function() {
        let dataId = $$(this).attr('data-id');
        if (dataId == 'gallery.photo') {
            loadGalleryPhotoPage();
        }
    });
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