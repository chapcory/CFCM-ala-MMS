/*	Autonomic MMS-5 module for CommandFusion (beta version)
	Firmware version 
===============================================================================

AUTHOR:		Terence, CommandFusion & Chap, Shastasoft Engineering
CONTACT:	terence@commandfusion.com
URL:		https://github.com/CommandFusion/Autonomic-MMS
MODULE JOIN RANGE: 4500 - 4605
VERSION:	MMS5.18.3  by Chap 10-10-13
18.3.1  add wait subpage
Improvements by Chap:
music albums, etc shown as 4x3 grids.
Grids have auto-centering feature.
Album select results in a twisting popout of songes available
Alpha quick find bar where appropriate.
Favorites implemented
Playlists implemented
Tunebridge implemented
Actions implemented (picklist gear appears)
Clarify Action feature supported
Large Nowplaying subpage appears on request or when now playing art changes
Restarts cleanly after disconnect
Music types and radio types appear on page top for 1 click access.
Pandora has a 50 minute auto thumbs up to keep it playing
All messages and choice boxes working.
Cross-searching in tunebridge works.
All sub menus have working back buttons and suitable headers.
18.32  fix sirius, no genre
18.33 sorneson fixes
18.34 on-ipad logging


Special Note:
- Have control on two ports 5004 and 23. Majority of the controls (port 5004) and shutdown/reboot (port 23)
- For WOL, use the WOL Generator in guiDesigner. WOL might needs port forwarding / routing setup in the routers. 
- Scrobble Icon (http://kon.deviantart.com/)

*/

	
//----------------------------------------------------------------------------------------------------------------
//Initialization of instance
//----------------------------------------------------------------------------------------------------------------
//var mms = function(systemName, feedbackName) {};

//For standalone system
var mms = {
	
	// ======================================================================
	// System Settings
	// ======================================================================
	
	// Edit the settings here if you want to set the default values
	defaultSysName: "MMS5",					// System 1 Name
	defaultSys2Name: "MMS5_2",				// System 2 Name
	defaultSysURL: "192.168.168.204",		// URL for both systems
	
	// For the first system
	sysName: "",					// System Name under System Properties in GuiDesigner
	sysURL: "",						// URL for media server
	sysPort: 5004,					// port for media server
	//SysUsername: null,			// username or null for authentification (not used)
	//SysPassword: null,			// password or null for authentification (not used)
	
	// For the second system
	sys2Name: "",					// System Name under System Properties in GuiDesigner
	sys2URL: "",					// URL for media server
	sys2Port: 23,					// port for media server
	//SysUsername: null,			// username or null for authentification (not used)
	//SysPassword: null,			// password or null for authentification (not used)

	// ======================================================================
	// Join Listings
	// ======================================================================

	
	
	
	
	// List join
	lstDebug:               "l4509",
//	lstAlbum: 				"l4510",
	tileAlbum:              "l4511",   //chap
	tileArtist:             "l4512",	
	tileGenre:              "l4513",	
	tileComposer:           "l4514",
    tileFavorite:           "l4515",    //chap		
/*	lstArtist: 				"l4520",
	lstComposer: 			"l4521",	//chap
	lstGenre: 				"l4530",*/
	lstPlaylist: 			"l4540",
	lstRadioSource: 		"l4550",
	lstRadioStation: 		"l4551",    //Sirius
	lstPickListItem:		"l4552",
	lstRadioGenre:			"l4553",      //sirius
	lstQueue: 				"l4560",
	lstFavorite: 			"l4565",
	lstMessageBox: 		    "l4566",   //message box	
	// Digital join (subpage)
	subAlbum: 				"d4510",
	subAlbumTitle:			"d4511",
	subTitlePopup:			"d4512",  //chap	
	subArtist:				"d4520",
	subArtistAlbum:			"d4521",
	subArtistAlbumTitle:	"d4522",
	subComposer:            "d4525",   //chap
	subComposerAlbum:		"d4526",
	subComposerAlbumTitle:	"d4527",
	subGenre: 				"d4530",
	subGenreAlbum:			"d4531",
	subGenreAlbumTitle:		"d4532",
	subPlaylist: 			"d4540",
	subPlaylistTitle:		"d4541",
	subRadioToplist:		"d4549",   //18.3
	subRadioSource:			"d4550",
	subRadioStation:		"d4551",
	subPickListItem:		"d4552",  //has tool button
	subRadioGenre:			"d4553",
	subSearchRadioStations:	"d4554",
	subNowPlaying:          "d4555",   //chap shows raio choices
	subNowPlayingMusic:     "d4556",   //chap shows music choices
	subQueue: 				"d4560",
    subMessagePopup:        "d4561",
    subMessageBoxBig:       "d4564",
	subFavorite: 			"d4565",   //chap
    subAction:              "d4566",
    subRadioEdit:           "d4567",   //5.17-Pandora
    subRadioPicklist:       "d4568",
    subMessageBox:          "d4569",   //5.17-Pandora
	subThumbsTimer:			"d4596",		//  contain  pandora timer  5.18.2
	subWaitForConnect:      "d4597",
	subWaitForNet:          "d4598",
	    	
	// Digital join (buttons)
	btnDebug:               "d4509",
	btnShuffle:				"d4570",
	btnRepeat:				"d4571",
	btnPlayPause:			"d4572",
	btnMute:				"d4573",
	btnScrobble:			"d4574",
	btnPlay:                "d4576",
	btnPause:               "d4577",
	btnWifiLED:				"d4580",
	btnSettings:			"d4581",
	btnAction:				"d4582",
	btnZone:				"d4583",
	btnSources:				"d4584",
	btnShutdown:			"d4585",
	btnReboot:				"d4586",
	btnCancel:				"d4587",
	btnBack:				"d4590",		// Actual button that contain scripts
	btnForward:				"d4591",		// Actual button that contain scripts
	//btnBackImage:			"d4593",		// Just for image purposes
	//btnForwardImage:		"d4594",		// Just for image purposes
    btnThumbs:              "d4595",
    btnToggleAdvanced:      "d4597",           //advanced features
//    flagRadioNowPlaying:    "d4598",            //18.2 for now playong choice
    btnMoreScroll:           "d4599",
    btnSorenson:            "d251",
	
	// Analogue join
	sldVolumeControl:		"a4500",
	sldTrackTime:			"a4501",
	PandoraRefreshTime:		"a4510",       //5.18.2
	// Serial joins (text box)
	txToListDebug:          "s4586",       //debug
	txtDebug:               "s4587",       //debug
	txtPlayStatus:			"s4500",
	txtTrackStatus:			"s4501",
	txtCoverArt:			"s4502",            //thumbnail version
	txtTrackTitle:			"s4503",
	txtAlbum:				"s4505",
	txtArtist:				"s4504",
	txtTrackTime:			"s4506",
	txtTrackDuration:		"s4507",
	txtLargeCoverArt:		"s4508",            //Large reflection Version  (Chap)
	txtNumberofItems:	    "s4509",             //list size for album artist
	srchAlbum:				"s4510",
	srchArtist:				"s4511",
	srchGenre:				"s4512",
	srchPlaylist:			"s4513",
	srchRadioSource:		"s4514",
	srchQueue:				"s4515",
	txtPlaylist:			"s4516",
	txtSearchTitle:			"s4517",
	txtSearchDesc:			"s4518",
	srchRadioStation:		"s4519",
	txtHostname:			"s4520",
	txtIPAdd:				"s4521",
	txtIPPort:				"s4522",
	txtArtistCount:         "s4531",
	txtAlbumCount:          "s4532",
	txtGenreCount:          "s4533",
	txtComposerCount:       "s4534",
	txtQueueCount:          "s4535",
	txtFavoriteCount:       "s4536",
	txtPicklistHeading:     "s4537",       //5.17
	txtPicklistCount:       "s4538",       //5.17
    imageTitlePopup:        "s4539",       //5.17 
    txtNowPlayingType:      "s4540",       //5.17 
    txtMessageBoxCaption:   "s4541",        //5.17 
    txtMessageBoxMessage:   "s4542",        //5.17
    txtSearchCmd:           "s4543",
    txtRadioSource:         "s4544", 
     	
	txtConnection:			"s4580",
	txtInstance:			"s4581",
	txtVolumeLevel:			"s4582",
	txtSelectedStation:		"s4583",
	txtAlphabet:			"s4584",
txtIncoming:			"s4585",         //testing only
	
	// List items
	//	"d4601"		Token for thumbnails
	//	"d4602"		Token for thumbnails
	//	"d4603"		Token for titles
	//	"s4601"		thumbarts URL (guid)
	//	"s4602"		Returned string for album, songs, artists, genres, etc.
	//	"s4603"		Manually user-defined parameter (album, artist, etc.)
	//	"s4604"		Extra label parameter (album, artist, track time, etc.)
	//	"s4605"		Extra label parameter (album, artist, track time, etc.)
	//  "s4606"     18.2  ClarifyTitleIntent
	
	//Main database Arrays

	arrayAlbum: [],					// Album
	arrayArtist: [],				// Artist
	arrayComposer: [],				// Composer - Chap
	arrayGenre: [],					// Genre
	arrayPlaylist:[],				// Playlist
	arrayRadioSource: [],			// Radio Sources
	arrayRadioStation: [],			// Radio Stations
	arrayRadioGenre: [],			// Radio Genre
	arrayPickListItem: [],			// PickListItem
	arrayQueue: [],					// Now Playing
	arrayFavorite: [],
	artistLetters:	[],				// Array to store the positions for each alphabar letter
	arrayTemp: [],					// Temporary list for building grids
    qitem: [],                      //grid temp	
    arrayBox:  [],
	// ======================================================================
	// Global variables 
	// ======================================================================
	passOne: 0,
	TrackTime: 0,			// Initialize the variable with an initial value	
	TrackDuration: 1,		// Initialize the variable with an initial value
	covermatches: "Null",  //ccR3 for pandora
	lastZone: "",          //5.18.1
    AlbumSelectFlag: 0,
    radioStationsFlag: 0,
    listeningFlag: 0,       //keep track of the incoming watcher
    vpos: 0,                //calculated
	hpos:0,
	popupNowplaying: 0,
	
	// ======================================================================
	// Setup 
	// ======================================================================
	
	setup: function() {
		
		// ---------------------------------------------------------------------------------------------------------------------------------------------------------
		// On startup, check for global tokens via CF.getJoin(CF.GlobalTokensJoin) and get the values for all the paramaters and set them to the System Properties.
//!!		// chap- we're not starting to run the MMS yet, just setting parameters for when we go "onpage"
		// ---------------------------------------------------------------------------------------------------------------------------------------------------------	
		
		//Get the global tokens values. Set the default value of the tokens via Global Token Manager.

            mms.listeningFlag = 0;         
            CF.getJoin(CF.GlobalTokensJoin, function(join, values, tokens) {
	
			//Read the global tokens. If global tokens are accidentally deleted, then use default values.
			mms.sysName = tokens["[inputSysName]"] || mms.defaultSysName;
			mms.sys2Name = tokens["[inputSys2Name]"] || mms.defaultSys2Name;
			mms.sysURL = tokens["[inputURL]"] || mms.defaultSysURL;
						
			// Read the tokens and display the values on the System Settings drop-down menu box.
			CF.setJoins([ {join: mms.txtHostname, value: mms.sysName}, {join: mms.txtIPAdd, value: mms.sysURL}, {join: mms.txtIPPort, value: mms.sysPort} ]);
		
			// Switch to new systems by using the global token values.
			CF.setSystemProperties(mms.sysName, { enabled: true, address: mms.sysURL,	port: mms.sysPort });
			CF.setSystemProperties(mms.sys2Name, { enabled: true, address: mms.sysURL, port: mms.sys2Port });
		
			// Log in debugging window, start setup.
			mms.log("Autonomic MMS-5 System Setup Started.");		
			
			// Check that both the "MMS5" and "MMS5_2" system is defined in the GUI. Otherwise no commands from JS will work!
			if (CF.systems[mms.sysName] === undefined) {
				// Show alert
				mms.log("Your GUI file is missing the "+mms.sysName+" system.\nPlease add it to your project before continuing.\n\nSee readme in comments at top of the script.");
				// Cancel further JS setup
				return;
			} else if (CF.systems[mms.sys2Name] === undefined) {
				// Show alert
				mms.log("Your GUI file is missing the "+mms.sys2Name+" system.\nPlease add it to your project before continuing.\n\nSee readme in comments at top of the script.");
				// Cancel further JS setup
				return;
			}
			
			// Get the system IP address and port for use in all cover art calls. Sample command: http://192.168.1.10:5005/albumart?album={33432-33432-95909-33423-34430}
			mms.coverart = "http://"+mms.sysURL+":"+(parseInt(mms.sysPort)+1)+"/albumart?album="; 
		   						
				
			// Disable buttons that are not really used for not by adjusting the opacity settings
           CF.unwatch(CF.FeedbackMatchedEvent, mms.sysName,  "IncomingData", mms.incomingData);	//kill one if running already
            CF.unwatch(CF.FeedbackMatchedEvent, mms.sysName,  "IncomingData");	//kill one if running already, twice, in case!
			CF.setProperties({join: mms.btnSources, opacity: 0.5});												// Source button (Main Page)
			CF.setProperties({join: mms.btnForward, opacity: 0.0});												// Forward button (PickListItem List Page)
            CF.watch(CF.PageFlipEvent, mms.onPageFlip, true);                                                   // Start watching page flips
            CF.watch(CF.ListDidEndScrollingEvent, [	mms.tileAlbum,mms.tileArtist,mms.tileGenre,mms.tileComposer,mms.tileFavorite], mms.onListDidEndScrolling);  //5.17 list "notching"
            //5.18.1	
			// Watch for connection changes. Syntax CF.watch(CF.event, systemName, systemFunction, boolean)
			CF.watch(CF.ConnectionStatusChangeEvent, mms.sysName, mms.onConnectionChange, true);			
		//	CF.watch(CF.NetworkStatusChangeEvent, function(networkStatus) { mms.onNetworkStatusChange(networkStatus); }, true);
			  CF.watch(CF.NetworkStatusChangeEvent, mms.onNetworkStatusChange, true);
			// Suspend and resume activities when Iviewer quits or put into background
			CF.watch(CF.GUISuspendedEvent, mms.onGUISuspended);
			CF.watch(CF.GUIResumedEvent, mms.onGUIResumed);
	//		 CF.watch(CF.JoinChangeEvent, "d4001", onJoinChanged);  //fro detecting CM ok 18.34
			    CF.watch(CF.FeedbackMatchedEvent, mms.sysName, "IncomingData", mms.incomingData); // only do once
			// Log in debugging window, end setup.
			mms.log("Autonomic MMS-5 System Setup Completed.");	
		}); 
	},
//??	
	// Even though the call is not executed immediately, it is enqueued for later processing.
//cc	onGUISuspended: function() { mms.subcribeEventOn(); },

	// Resume the suspended gui call.
//cc	onGUIResumed: function() { mms.subcribeEventOn(); },
	//onGUIResumed: function() { mms.setup(); },
	
	// ======================================================================
	//  Once on Page, Start controlling the currently selected zone
	// ======================================================================	
    startControl: function(){
     //   if (mms.listeningFlag == 0)
       //   {
          
         //   CF.watch(CF.FeedbackMatchedEvent, mms.sysName, "IncomingData", mms.incomingData); // only do once
        //    mms.listeningFlag === 1;
        //    	mms.log("Listening to incoming data.");		
       //   }  
			mms.setEncoding();														// Set character encoding to UTF8, to display non-Latin character.
			mms.setPickListCount(1000);											    // Set the number of items in the PickList list.
			mms.subcribeEventOn();													// Get real time feedback of changed status of items.
			mms.setOption();                                                        // 5.17 Enable message boxes
			mms.setOption1();
            mms.setOption2();                  //crestron
	        mms.RepeatOff();
            mms.ShuffleOff(); 
            CF.setJoin(mms.subWaitForConnect, 0);                                        // assume net ok
            CF.setJoin(mms.subWaitForNet, 0);                                        // assume net ok	        
    },
	// ======================================================================
	//  Handle Connections/Disconnections
	// ======================================================================
	onGUISuspended: function() {
               //	mms.clearAll();
     	mms.log("Suspended");
      },
	
	// Resume the suspended gui call.
	onGUIResumed: function() { 
  	mms.log("Resumed");
	  //  mms.selectZone(mms.lastZone);
	},	
	/*		onNetworkStatusChange:function (networkStatus) {

						mms.log(mms.systemName + ": onNetworkStatusChange hasNetwork=" + mms.networkStatus.hasNetwork);

			
					if (mms.networkStatus.hasNetwork) {
	
						 CF.setJoin (mms.txtConnection, "Wireless Network Connected");	// Connection established
					         CF.setJoin(mms.subWaitForNet, 0);		
						
					} else {
						 CF.setJoin (mms.txtConnection, "Wireless Network Disconnected");	// Connection established
					         CF.setJoin(mms.subWaitForNet, 1);								
					}
			
			},

	*/
	
	
	
	
	onConnectionChange: function (system, connected, remote) {
		if (connected) {
		    CF.setJoin (mms.txtConnection, "Connected to Wireless");	// Connection established
		   // setTimeout(function() {
 		  //       CF.setJoin (mms.txtConnection, "");
          //  }, 1000);
         CF.setJoin(mms.subWaitForConnect, 0);                                        // show the correct subpage	
		 mms.selectZone(mms.lastZone);                        //5.18.1 reget all
			mms.log("Autonomic MMS-5 System is Connected!");
	
        }
			
		 else {
		    CF.setJoin (mms.txtConnection, "Searching for Wireless");	// Connection lost
         CF.setJoin(mms.subWaitForConnect, 1);                                        // show the correct subpage			    
			mms.log("Autonomic MMS-5 System is Disconnected!!");
		}
	},
 
 
 
 
 
 //================================================================
// 5.17 List notching- settle on whole items only - for all grids
//================================================================                   
    onListDidEndScrolling: function(join, count, first, numItems, topPixel) {
    mms.log("List " + join + " did end scrolling. Final position: first item=" + first + ", pixel position=" + topPixel);
    var mm = topPixel%180;
    if (mm >0){
     if (mm >90)
        {
        CF.listScroll(join, first+1, CF.TopPosition, true, true);  //pop to next
        }
      else {                                          
            CF.listScroll(join, first, CF.TopPosition, true, true); 
            }  
    }
    
    
},              

	// ======================================================================
	//  Other functions
	// ======================================================================
	
	//  Search library function
	search: function(compare_string, search_string){
		var newRegX = new RegExp(search_string, "gi");
		return compare_string.match(newRegX);
	},
	
	// =============================================================================================================================
	// Regex for all feedbacks coming through a single feedback item. For parsing various incoming data :
	// 
	//  /g enables "global" matching. When using the replace() method, specify this modifier to replace all matches, rather than only the first one.
    //	/i makes the regex match case insensitive.
    //	/m enables "multi-line mode". In this mode, the caret and dollar match before and after newlines in the subject string. 
	// =============================================================================================================================
	
	// Example: Album {a7f4dc3c-12d6-a29b-85eb-b0efebbc4e1e} "Elephunk (BLACK EYED PEAS)" 1 "" ""
	//	albumFullRegex:	/Album.\{(.*)\}.\"(.*?)\".(.*).\"(.*?)\".\"(.*?)\"/i,	
		albumRegex: /\bAlbum\b.\{(.*)\}.\"(.*?)\"/i,
    	albumDoneRegex: /EndAlbums /i,              //know when we're done (Chap)
	// Example: Artist {f1e2ec7c-9111-7804-448a-acffc6db70da} "DIANA ROSS" -1 "" ""	
	//	artistFullRegex: /Album.\{(.*)\}.\"(.*?)\".(.*).\"(.*?)\".\"(.*?)\"/i,
		artistRegex: /\bArtist\b.\{(.*)\}.\"(.*?)\"/i,
   	    artistDoneRegex: /EndArtists /i,              //know when we're done (Chap)		
		// Example: Composer {f1e2ec7c-9111-7804-448a-acffc6db70da} "DIANA ROSS" -1 "" ""	
	//	ComposerFullRegex: /Album.\{(.*)\}.\"(.*?)\".(.*).\"(.*?)\".\"(.*?)\"/i,
		composerRegex: /\bComposer\b.\{(.*)\}.\"(.*?)\"/i,	
   	    composerDoneRegex: /EndComposers /i,              //know when we're done (Chap)		
	// Example: Genre {d0b1f93f-19a3-506b-c263-423619057d3e} "Classical" -1 "" ""	
	//	genreFullRegex: /Genre.\{(.*)\}.\"(.*?)\".(.*).\"(.*?)\".\"(.*?)\"/i,
		genreRegex: /\b(Genre)\b.\{(.*)\}.\"(.*?)\"/i,
   	    genreDoneRegex: /EndGenres /i,              //know when we're done (Chap)				
	// Example: Playlist {31784719-599f-a40b-548d-fbd9692a7fbf} "Playlist1" 14 1
	//	playlistFullRegex: /Genre.\{(.*)\}.\"(.*?)\".(.*).\"(.*?)\".\"(.*?)\"/i,
		playlistItemRegex: /Playlist.\{(.*)\}.\"(.*?)\"/i,
        // example BeginPlaylists Total=23 Start=1 Alpha=0 Caption="adele"
	       playlistRegex: /BeginPlaylists.Total=(.*\d+).Start=(.*\d).Alpha=(.*\d).Caption=\"(.*?)\"/i,		
	// Example: Favorite {f1e2ec7c-9111-7804-448a-acffc6db70da} "DIANA ROSS" -1 "" ""	

		favoriteRegex: /\bFavorite\b.\{(.*)\}.\"(.*?)\"/i,
   	    favoriteDoneRegex: /EndFavorites /i,              //know when we're done (Chap)		     	
	
	// Example: &nbsp;
	// Special note : /RadioGenre.\{(.*)\}.\"(.*)\"/i and /RadioGenre.\{(.*)\}.\"(.*)\"/i will both capture the feedback string with either Genre and RadioGenre headers. Hence the
	//                need to use to exact string matching \b(string)\b regex to capture both feedbacks differently.   
		radioSourceRegex: /RadioSource.\{(.*)\}.\"(.*?)\"/i,
		radioSourceDoneRegex: /EndRadioSources /i,
		radioGenreItemRegex: /\b(RadioGenre)\b.\{(.*)\}.\"(.*)\"/i,
		radioGenreRegex: /BeginRadioGenres.Total=(.*\d+).Start=(.*\d).Alpha=(.*\d).Caption=\"(.*?)\"/i,	//5.17	
        
       playlistTitleRegex: /BeginTitles.Total=(.*\d+).Start=(.*\d).Alpha=(.*\d).Caption=\"(.*?)\"/i,	
        // example BeginTitles Total=23 Start=1 Alpha=0 Caption="adele"
        
        
	// Exammple: BeginPickList Total=102 Start=1 Alpha=0 Caption="Pandora Internet Radio"  -5.17	
		picklistRegex: /BeginPickList.Total=(.*\d+).Start=(.*\d).Alpha=(.*\d).Caption=\"(.*?)\"/i,	
	//                                             1                         2        3    4      5	
	//example 2013- PickListItem {34393537-3534-3131-3533-303735353937} "60s Radio" 0 6 "action" ""	5.18.2
		pickListItemRegex:  /PickListItem.\{(.*)\}.\"(.*)\".(.*\d).*\d.\"(.*?)\"/i,
	
	// Example: RadioStation {da79c6f8-eb5a-49e6-9892-35da9db8693e} "Rock and Roll Hall of Fame Radio" "Music by Rock Hall Inducted Artists" -1 ""
		radioStationRegex: /RadioStation.\{(.*)\}.\"(.*)\".\"(.*)\".(.*).\"(.*)\"/i,

//18.2	// Example: Title {2a4786ff-56f1-3c47-142c-fa0939ec73d5} "Always Tomorrow" "00:04:52" 16 "GLORIA ESTEFAN" "Greatest Hits" -1 ""ClarifyTitleIntent ""	
	//	queueFullRegex: /Title.\{(.*)\}.\"(.*)\".\"(.*?)\".(\d+).\"(.*?)\".\"(.*?)\".(.*\d).\"(.*)\".\"(.*)\"/i,
		titleRegex: /Title.\{(.*)\}.\"(.*)\".\"(.*?)\".(\d+).\"(.*?)\".\"(.*?)\".(.*\d).\"(.*?)\".\"(.*)\".\"(.*)\"/i,
	// Example: Instance "Main", Instance "Player_A"
		instanceRegex: /Instance \"(.*)\"/i,
	
	// Example: ReportState Player_A NowPlayingGuid={16091522-760a-42c7-ec32-468556de19e9}		// Report of starting status of items
	// Example: StateChanged Player_A NowPlayingGuid={16091522-760a-42c7-ec32-468556de19e9}		// Report of changed status of items		
		//startStatusRegex: /ReportState\x20(.*)\x20(.*)=(.*)/i,
		stateThumbnailRegex: /NowPlayingGuid=(.*)/i,			// Thumbnail
		stateTrackNumberRegex: /MetaData1=(.*)/i,				// Track No. out of total tracks or title
		stateArtistRegex: /MetaData2=(.*)/i,					// Artist
		stateAlbumRegex: /MetaData3=(.*)/i,						// Album
		stateTrackRegex: /MetaData4=(.*)/i,						// Track
		stateTrackTimeRegex: /TrackTime=(.*)/i,					// Track Time
		stateTrackDurationRegex: /TrackDuration=(.*)/i,			// Track Duration
		stateShuffleRegex: /Shuffle=(.*)/i,						// Shuffle status (True/False)
		stateRepeatRegex: /Repeat=(.*)/i,						// Repeat status (True/False)
		stateQueueModeRegex: /QueueMode=(.*)/i,					// QueueMode
		stateVolumeRegex: /Volume=(\d+)/i,						// Volume level
		statePlayStatusRegex: /MediaControl=(.*)/i,				// Current Playing status (Play/Pause)
		stateMuteRegex: /Mute=(.*)/i,							// Mute status (True/False)
		stateScrobbleRegex: /Scrobbling=(\d)/i,					// Scrobble status (True/False)
		stateMediaArtChangedRegex: /MediaArtChanged=(.*)/i,		// State media art changed status (True/False).
		stateMediaURLRegex: /MediaURL=(.*)/i,		            // 5.17 Pandora info
		stateNowPlayingTypeRegex: /NowPlayingType=(.*)/i,		// 5.17 Now playing type header
		stateNowPlayingSourceRegex: /NowPlayingSrce=(.*)/i,		// 5.17 Now playing source for  enabling thumbs		
		stateRunningRegex: /Running=(.*)/i,						// Running status (True/False). When shutdown, will changed to False.
		stateBackRegex: /Back=(.*)/i,							// Back to previous browsing history. StateChanged Main Back=True/False
		stateForwardRegex: /Forward=(.*)/i,						// Forward to previous browsing history. StateChanged Main Forward=True/False
		stateUIMessageRegex: /UI=StatusMessage."(.*)"/i,		// Message that is being played after Radio Station has been selected. 
                                                                //StateChanged Main UI=StatusMessage "Tuning to 988 FM 98.8 (Top 40-Pop)"
                                                                
		stateUIInputBoxRegex: /UI=InputBox.\{(.*)\}.\"(.*)\".\"(.*)\".\"(.*)\".\"(.*)\".\"(.*)\"/i,
        	//InputBox selections.
        	
        	
/*Message box
	    Case 1: (3 action items)    StateChanged Main UI=MessageBox {20db2fa6-f453-44f7-99e2-e78d70cd761e} "Edit Pandora station 'Elvis Presley Radio'." "What would you like to do to this station?" 30 "Delete the station" "AckButton 20db2fa6-f453-44f7-99e2-e78d70cd761e \"Delete the station\"" 0 "Edit the station" "AckButton 20db2fa6-f453-44f7-99e2-e78d70cd761e \"Edit the station\"" 0 "Cancel" "AckButton 20db2fa6-f453-44f7-99e2-e78d70cd761e \"Cancel\"" 0 AckPickItem Ok
 
        Case 2: (2 action items)   StateChanged Main UI=MessageBox {34526dca-4d85-48eb-900f-3cdca513f22f} "Pandora Internet Radio" "Are you sure you want to delete 'The 60's Radio'?" 30 "Yes" "AckButton 34526dca-4d85-48eb-900f-3cdca513f22f \"Yes\"" 0 "No" "AckButton 34526dca-4d85-48eb-900f-3cdca513f22f \"No\"" 0
 
                   
        Case 3: (1 action item)    StateChanged Main UI=MessageBox {6d139d53-a3d4-484b-b41c-b79340050a74} "Pandora Internet Radio" "This track is playing because it features blues roots,                     country influences, bluegrass influences, folk influences, a subtle use of vocal harmony, acoustic sonority, extensive vamping, major key tonality, a distinctive male lead vocal, slide guitars, a prominent banjo part, a prominent harmonica part, a prominent mandolin part, acoustic rhythm guitars and many other similarities identified in the Music Genome Project" 30 "OK" "AckButton 6d139d53-a3d4-484b-b41c-b79340050a74 \"OK\"" 0
        */
//new 
// Jarrod-  UI=MessageBox.\{(.*?)\} \"(.*?)\" \"(.*?)\" \d+ \"(.*?)\" \"(.*?)\" \d+ \"(.*?)\" \"(.*?)\" \d+(?: \"(.*?)\" \"(.*?)\" \d+)?
		stateUIMessageBoxRegex: /UI=MessageBox.\{(.*)\}.\"(.*)\".\"(.*)\" \d+/i,
         stateUIMessageBoxRegex1: /UI=MessageBox.\{(.*?)\} \"(.*?)\" \"(.*?)\" \d+ \"(.*?)\" \"(.*?)\"/i,
         stateUIMessageBoxRegex2: /UI=MessageBox.\{(.*)\}.\"(.*)\".\"(.*\?)\"..*\d.\"(.*)\".\"(.*.\\\".*\\\").*\d.\"(.*)\".\"(.*)\"/i,
	     stateUIMessageBoxRegex3: /UI=MessageBox.\{(.*?)\} \"(.*?)\" \"(.*?)\" \d+ \"(.*?)\" \"(.*?)\" \d+ \"(.*?)\" \"(.*?)\" \d+ \"(.*?)\" \"(.*?)\" \d+/i,

//		ackButtonRegex: /\"Ackbutton.(.*).\\\"(.*)\\\"/i,	

		stateUIClearRegex: /UI=Clear.\{(.*)\}/i,		// Done with message box 
		stateNowPlayingRegex: /UI=Navigate \"NowPlaying\"/i,  	
		stateKillsocketRegex: /KILLSOCKET /i,		            //ANOTHER TELNET SESSION//kkkkk 	
		stateThumbsUpRegex: /ThumbsUp=(.*)/i,                    //thumbs useage
		
		// stateUIMessageBoxRegex2: /UI=MessageBox.\{(.*)\}.\"(.*)\".\"(.*\?)\"..*\d.\"(.*)\".\"(.*.\\\".*\\\").*\d.\"(.*)\".\"(.*)\".*\d/i,
	// =============================================================================================================================
	// Incoming Data Point - Only used to populate array with data. Populations of lists will be done by other functions.
	// =============================================================================================================================	
	
	incomingData: function (itemName, matchedString) {
		var matches = "";
		var minutes = "";
		var remain_seconds = "";
		var seconds = "";
		var time = ""; 
        var searchCoverArt = "";
		var searchAlbum = "";
		var searchArtist = "";
		var searchGenre = "";
		var searchComposer = "";		
		var searchType = "";
		var searchTokenGuiD = "";
		var searchToken2GuiD = "";
		var searchToken3GuiD = "";       		
        var searchPlaylist = "";	
        var searchRadioSource = "";
        var searchQueue = "";		
		
		if (mms.albumRegex.test(matchedString)) {							// Test if it is a Album message. This is for loading data into Album list.
				
				mms.matches = mms.albumRegex.exec(matchedString);
                			  mms.log("Incoming Album"+ mms.matches[2]);	
                CF.setJoin( "s4706" , mms.matches[3]);                      //artist  for header                            		
				mms.arrayAlbum.push({										// push this into an array for searching later
                                    s4601: mms.coverart+mms.matches[1]+"&h=145&w=145",	//no blanks	//image size matches grid images//			s4601: mms.coverart+mms.matches[1]+"&e404=1",		
									s4602: mms.matches[2],						
									s4603: "Album",						
									d4601: { tokens: {"[guid]": mms.matches[1]} },
									d4602: { tokens: {"[guid]": mms.matches[1]} }
								});
			/*	CF.listAdd(mms.lstAlbum, [{								// as the feedback item comes in, straight away push into the list
									s4601: mms.coverart+mms.matches[1]+"&h=145&w=145&e404=1",		//image size matches grid images
									s4602: mms.matches[2],						
									s4603: "Album",						
									d4601: { tokens: {"[guid]": mms.matches[1]} },
									d4602: { tokens: {"[guid]": mms.matches[1]} }
								}]

				);*/
				mms.albumRegex.lastIndex = 0;

				if (mms.AlbumSelectFlag==1){
                    CF.setJoin(mms.txtNumberofItems, ""+mms.arrayAlbum.length, false);  //send out the number of albums
                }else {
                    CF.setJoin(mms.txtAlbumCount, ""+mms.arrayAlbum.length, false);  //send out the number of albums 
                }
                			
        } else	if (mms.albumDoneRegex.test(matchedString)){    
		      mms.log ("Album Done- No More"); 
		      mms.buildAlbumGrid();                                                //build a 4 wide image wall
		      mms.albumDoneRegex.lastIndex = 0;
		      
		
		} else if (mms.artistRegex.test(matchedString)) {					// Test if it is a Artist message. This is for loading data into Artist list.
		
				mms.matches = mms.artistRegex.exec(matchedString);
				mms.arrayArtist.push({
					               //s4601: mms.coverart+mms.matches[1]+"&h=145&w=145&nolabel=1&e404=1",		
//no blanks
									s4601: mms.coverart+mms.matches[1]+"&h=145&w=145&nolabel=1",		
									s4602: mms.matches[2],						
									s4603: "Artist",
									d4601: { tokens: {"[guid]": mms.matches[1]} },
									d4602: { tokens: {"[guid]": mms.matches[1]} }
								});
	/*			CF.listAdd(mms.lstArtist, [{
									s4601: mms.coverart+mms.matches[1]+"&h=145&w=145&e404=1",		
									s4602: mms.matches[2],						
									s4603: "Artist",						
									d4601: { tokens: {"[guid]": mms.matches[1]} },
									d4602: { tokens: {"[guid]": mms.matches[1]} }
								}]
				);*/
				mms.artistRegex.lastIndex = 0;					
                CF.setJoin(mms.txtArtistCount, ""+mms.arrayArtist.length, false);  //send out the number of artists
                
        } else	if (mms.artistDoneRegex.test(matchedString)){    
		      mms.log ("Artist Done- No More"); 
		      mms.buildArtistGrid();                                                //build a 4 wide image wall
		      mms.artistDoneRegex.lastIndex = 0;
		                
      	} else if (mms.composerRegex.test(matchedString)) {					// Test if it is a Composer message. This is for loading data into Composer list.
		
				mms.matches = mms.composerRegex.exec(matchedString);
				mms.arrayComposer.push({
									s4601: mms.coverart+mms.matches[1]+"&h=145&w=145&nolabel=1",	//no blanks	
									s4602: mms.matches[2],						
									s4603: "Composer",
									d4601: { tokens: {"[guid]": mms.matches[1]} },
									d4602: { tokens: {"[guid]": mms.matches[1]} }
								});
			/*	CF.listAdd(mms.lstComposer, [{
									s4601: mms.coverart+mms.matches[1]+"&h=145&w=145&e404=1",		
									s4602: mms.matches[2],						
									s4603: "Composer",						
									d4601: { tokens: {"[guid]": mms.matches[1]} },
									d4602: { tokens: {"[guid]": mms.matches[1]} }
								}]
				);*/
				mms.composerRegex.lastIndex = 0;					


                    CF.setJoin(mms.txtComposerCount, ""+mms.arrayComposer.length, false);  //send out the number of albums 
                
            
        } else	if (mms.composerDoneRegex.test(matchedString)){    
		      mms.log ("Composer Done- No More"); 
		      mms.buildComposerGrid();                                                //build a 4 wide image wall
		      mms.composerDoneRegex.lastIndex = 0;
                
		} else if (mms.genreRegex.test(matchedString)) {					// Test if it is a Genre message. This is for loading data into Genre list.

				mms.matches = mms.genreRegex.exec(matchedString);
				mms.arrayGenre.push({
									s4601: mms.coverart+mms.matches[2]+"&h=145&w=145&nolabel=1",	//no blanks	
									s4602: mms.matches[3],						
									s4603: "Genre",						
									d4601: { tokens: {"[guid]": mms.matches[2]} },
									d4602: { tokens: {"[guid]": mms.matches[2]} }
								});
			/*	CF.listAdd(mms.lstGenre, [{
									s4601: mms.coverart+mms.matches[2]+"&h=145&w=145&e404=1",		
									s4602: mms.matches[3],						
									s4603: "Genre",						
									d4601: { tokens: {"[guid]": mms.matches[2]} },
									d4602: { tokens: {"[guid]": mms.matches[2]} }
								}]
				);*/
				mms.genreRegex.lastIndex = 0;		


                CF.setJoin(mms.txtGenreCount, ""+mms.arrayGenre.length, false);  //send out the number of albums 
               
                	
        } else	if (mms.genreDoneRegex.test(matchedString)){    
		      mms.log ("Genre Done- No More"); 
		      mms.buildGenreGrid();                                                //build a 4 wide image wall
		      mms.genreDoneRegex.lastIndex = 0;
		
		} else if (mms.favoriteRegex.test(matchedString)) {					// 5.17 ;Test if it is a Favorite message. This is for loading data into Favorite list.
		
				mms.matches = mms.favoriteRegex.exec(matchedString);
				mms.arrayFavorite.push({
									s4601: mms.coverart+mms.matches[1]+"&h=145&w=145&nolabel=1&e404=1",		
									s4602: mms.matches[2],						
									s4603: "Favorite",
									d4601: { tokens: {"[guid]": mms.matches[1]} },
									d4602: { tokens: {"[guid]": mms.matches[1]} }
								});
			/*	CF.listAdd(mms.lstFavorite, [{
									s4601: mms.coverart+mms.matches[1]+"&e404=1",		
									s4602: mms.matches[2],						
									s4603: "Favorite",						
									d4601: { tokens: {"[guid]": mms.matches[1]} },
									d4602: { tokens: {"[guid]": mms.matches[1]} }
								}]*/
			//	);
				mms.favoriteRegex.lastIndex = 0;					
                CF.setJoin(mms.txtFavoriteCount, ""+mms.arrayFavorite.length, false);  //send out the number of Favorites
                
       } else	if (mms.favoriteDoneRegex.test(matchedString)){    
		      mms.log ("Favorite Done- No More"); 
		      mms.buildFavoriteGrid();                                                //build a 4 wide image wall
		      mms.favoriteDoneRegex.lastIndex = 0;
		      
		} else if (mms.playlistRegex.test(matchedString)) {					// Test if it is a playlist header
			
				mms.matches = mms.playlistRegex.exec(matchedString);		
		
		               CF.setJoin( mms.txtPicklistHeading ,mms.matches[4]);        //page heading
		               CF.setJoin( mms.txtPicklistCount ,mms.matches[1]);        //number of items
		
				mms.playlistRegex.lastIndex = 0;						       // Reset the regex to work correctly after each consecutive match		      
		} else if (mms.playlistItemRegex.test(matchedString)) {					// Test if it is a Playlist message. This is for loading data into Playlist list.

				mms.matches = mms.playlistItemRegex.exec(matchedString);
				mms.arrayPlaylist.push({
									s4601: mms.coverart+mms.matches[1]+"&e404=1",		
									s4602: mms.matches[2],						
									s4603: "Playlist",						
									d4601: { tokens: {"[guid]": mms.matches[1]} },
									d4602: { tokens: {"[guid]": mms.matches[1]} },
									d4603: { tokens: {"[title]": mms.matches[2]} }
								});
				CF.listAdd(mms.lstPlaylist, [{
									s4601: mms.coverart+mms.matches[1]+"&h=85&w=85&e404=1",		
									s4602: mms.matches[2],						
									s4603: "Playlist",						
									d4601: { tokens: {"[guid]": mms.matches[1]} },
									d4602: { tokens: {"[guid]": mms.matches[1]} },
									d4603: { tokens: {"[title]": mms.matches[2]} }
								}]
				);
				mms.playlistItemRegex.lastIndex = 0;
		
		} else if (mms.radioSourceRegex.test(matchedString)) {					// Test if it is a Radio Source message. This is for loading data into Radio Source list.
			
				mms.matches = mms.radioSourceRegex.exec(matchedString);
				
				mms.arrayRadioSource.push({
									s4601: mms.coverart+mms.matches[1]+"&e404=1",
									s4602: mms.matches[2],
									s4603: "Radio Sources",
									d4601: { tokens: {"[guid]": mms.matches[1]} }
									
								});
				CF.listAdd(mms.lstRadioSource, [{
									s4601: mms.coverart+mms.matches[1]+"&h=85&w=85&e404=1",			
									s4602: mms.matches[2],						
									s4603: "Radio Sources",						
									d4601: { tokens: {"[guid]": mms.matches[1]} }
									
								}]
				);
				mms.radioSourceRegex.lastIndex = 0;						// Reset the regex to work correctly after each consecutive match
				
				
		   } else	if (mms.radioSourceDoneRegex.test(matchedString)){    
		      mms.log ("Radio Source  Done- No More"); 
		      mms.listToBig();                                                //find ou list size
		      mms.radioSourceDoneRegex.lastIndex = 0;
		
		
		
		
		
		} else if (mms.radioStationRegex.test(matchedString)) {					// Test if it is a Radio Station message. This is for loading data into Radio Station list.Pandora only
			
				mms.matches = mms.radioStationRegex.exec(matchedString);
				
				mms.arrayRadioStation.push({
									s4601: mms.coverart+mms.matches[1]+"&e404=1",
									s4602: mms.matches[2],
									s4603: "",
									d4601: { tokens: {"[guid]": mms.matches[1]} }
								});
				CF.listAdd(mms.lstRadioStation, [{
									s4601: mms.coverart+mms.matches[1]+"&h=85&w=85&e404=1",		
									s4602: mms.matches[2],						
									s4603: "",						
									d4601: { tokens: {"[guid]": mms.matches[1]}},
									d4602: { tokens: {"[guid]": mms.matches[1]} }
								}]
				);
				mms.radioStationRegex.lastIndex = 0;						// Reset the regex to work correctly after each consecutive match
				
		} else if (mms.radioGenreRegex.test(matchedString)) {					// Test if it is a Picklist header
			
				mms.matches = mms.radioGenreRegex.exec(matchedString);		
		
		               CF.setJoin( mms.txtPicklistHeading ,mms.matches[4]);        //page heading
		               CF.setJoin( mms.txtPicklistCount ,mms.matches[1]);        //number of items
		
				mms.radioGenreRegex.lastIndex = 0;						       // Reset the regex to work correctly after each consecutive match
                	
		} else if (mms.radioGenreItemRegex.test(matchedString)) {					// Test if it is a Radio Genre message. This is for loading data into Radio Source list.
			
				mms.matches = mms.radioGenreItemRegex.exec(matchedString);
			//	mms.clearSubPages();                                                             // hide all subpages
              //  CF.setJoin(mms.subRadioGenre, 1);                                              // show the correct subpage	
			
				mms.arrayRadioGenre.push({
									s4601: mms.coverart+mms.matches[2]+"&e404=1",
									s4602: mms.matches[3],
									s4603: "",
									d4601: { tokens: {"[guid]": mms.matches[2]} }
								});
				CF.listAdd(mms.lstRadioGenre, [{
									s4601: mms.coverart+mms.matches[2]+"&h=85&w=85&e404=1",			
									s4602:  mms.matches[3],						
									s4603: "Radio Genre",						
									d4601: { tokens: {"[guid]": mms.matches[2]} }
								}]
				);	
				mms.radioGenreItemRegex.lastIndex = 0;						// Reset the regex to work correctly after each consecutive match
		
	} else if (mms.picklistRegex.test(matchedString)) {					// Test if it is a Picklist header
			
				mms.matches = mms.picklistRegex.exec(matchedString);		
	//				mms.arrayPickListItem = [];							// clear array of any previous data 18.3
	//		CF.listRemove(mms.lstPickListItem);					//clear list of any previous entries 18.3
		               CF.setJoin( mms.txtPicklistHeading ,mms.matches[4]);        //page heading
		               CF.setJoin( mms.txtPicklistCount ,mms.matches[1]);        //number of items

		             	switch (mms.matches[4])                                     //when hitting back button, avoid radio picklist a top
				{
				
					case "Pandora":
               		   mms.clearSubPages();                                                        // hide all subpages
                        CF.setJoin(mms.subRadioToplist, 1);                      // show the correct subpage
						break;
					case "Rhapsody":
               		   mms.clearSubPages();                                                        // hide all subpages
                        CF.setJoin(mms.subRadioToplist, 1);                      // show the correct subpage
						break;
					case "Spotify":
               		   mms.clearSubPages();                                                        // hide all subpages
                        CF.setJoin(mms.subRadioToplist, 1);                      // show the correct subpage
						break;
					case "TuneIn Radio":
               		   mms.clearSubPages();                                                        // hide all subpages
                        CF.setJoin(mms.subRadioToplist, 1);                      // show the correct subpage
						break;
     //               mms.clearSubPages();                                                        // hide all subpages 18.3
     //               CF.setJoin(mms.subPickListItem, 1);                      // show the correct subpage 18.3
				}  
//18.3 above		               
		
				mms.picklistRegex.lastIndex = 0;						       // Reset the regex to work correctly after each consecutive match		
		
		
		} else if (mms.pickListItemRegex.test(matchedString)) {					
			
				mms.matches = mms.pickListItemRegex.exec(matchedString);
			

				
				mms.arrayPickListItem.push({
									s4601: mms.coverart+mms.matches[1]+"&e404=1",
									s4602: mms.matches[2],
									s4603: "",
									s4604: mms.matches[4],                     //action command
									d4601: { tokens: {"[guid]": mms.matches[1]} },
									d4602: { tokens: {"[guid]": mms.matches[1]} }
								});
				CF.listAdd(mms.lstPickListItem, [{
									s4601: mms.coverart+mms.matches[1]+"&h=85&w=85&fmt=png&e404=1",
									//s4601: mms.coverart+mms.matches[1]+"&e404=1",				
									s4602: mms.matches[2],						
									s4603: "",
									s4604: mms.matches[4],                     //action command                                    						
									d4601: { tokens: {"[guid]": mms.matches[1]} },
									d4602: { tokens: {"[guid]": mms.matches[1]} }
								}]
                );
                if (mms.matches[3] > 0         ){
				CF.listUpdate(mms.lstPickListItem, [
                    { index:CF.LastItem, d4602:0 }  ]);
                }
                else {
                	CF.listUpdate(mms.lstPickListItem, [
                    { index:CF.LastItem, d4602:1 }  ]);
                }
                
                
               		
				
				mms.pickListItemRegex.lastIndex = 0;						// Reset the regex to work correctly after each consecutive match
				
		} else if (mms.playlistTitleRegex.test(matchedString)) {					// Test if it is a playlist header
			
				mms.matches = mms.playlistTitleRegex.exec(matchedString);		
		
		               CF.setJoin( mms.txtPicklistHeading ,mms.matches[4]);        //page heading
		               CF.setJoin( mms.txtPicklistCount ,mms.matches[1]);        //number of items
		
				mms.playlistTitleRegex.lastIndex = 0;						       // Reset the regex to work correctly after each consecutive match
                			
		} else if (mms.titleRegex.test(matchedString)) {    					// Test if it is a Queue message. This is for loading data into Queue list.	
	           mms.matches = mms.titleRegex.exec(matchedString);

			
				mms.arrayQueue.push({
									s4601: mms.coverart+mms.matches[1]+"&e404=1",						// fanart
									s4602: "Track #" + mms.matches[4] + " : "+ mms.matches[2],		// track no. & title
									s4603: mms.matches[5],										// track time   artist?
									s4604: mms.matches[6],										// album										
									s4605: mms.matches[3],										// artist   track time?
									s4606: mms.matches[9],                                     //ClarifyTitleIntent  (18.2)
									d4601: { tokens: {"[guid]": mms.matches[1]} },
									d4602: { tokens: {"[guid]": mms.matches[1]} }
							});
						//	mms.log ("Qualifier:" + mms.matches[8]);
				CF.listAdd(mms.lstQueue, [{
									s4601: mms.coverart+mms.matches[1]+"&h=85&w=85&fmt=png&e404=1",						// fanart
									s4602: "Track #" + mms.matches[4] + " : "+ mms.matches[2],		// track no. & title
									s4603: mms.matches[5],										// track time
									s4604: mms.matches[6],										// album										
									s4605: mms.matches[3],										// artist
									s4606: mms.matches[9],                                     //ClarifyTitleIntent  (18.2)
									d4601: { tokens: {"[guid]": mms.matches[1]} },
									d4602: { tokens: {"[guid]": mms.matches[1]} }
								}]
				);
               CF.setJoin(mms.txtQueueCount, ""+mms.arrayQueue.length, false);  //send out the number of albums 
			   mms.titleRegex.lastIndex = 0;								// Reset the regex to work correctly after each consecutive match
		
		} else if (mms.instanceRegex.test(matchedString)) {				// Test if it is a Instance message. This is for defining which zone/instance the player is at currently.
		
				mms.matches = mms.instanceRegex.exec(matchedString);
				switch (mms.matches[1]) 
				{
					case "Main":
						CF.setJoin(mms.txtInstance, "Main");
						break;
					case "Player_A":
						CF.setJoin(mms.txtInstance, "Player A");
						break;
					case "Player_B":
						CF.setJoin(mms.txtInstance, "Player B");
						break;
					case "Player_C":
						CF.setJoin(mms.txtInstance, "Player C");
						break;
					case "Player_D":
						CF.setJoin(mms.txtInstance, "Player D");
						break;	
				}
				mms.getStatus();														// 319 Get the starting status of all items.
	            mms.nowplayingart();
				
				mms.instanceRegex.lastIndex = 0;	
                	
		} else if (mms.stateThumbnailRegex.test(matchedString)) {				// Test if it is a Current Fanart message. This is for defining the fanart for the currently playing item.
		
				mms.covermatches = mms.stateThumbnailRegex.exec(matchedString);         //ccr3 special var for Pandora 
				CF.setJoin(mms.txtCoverArt, mms.coverart+mms.covermatches[1]+"&h=120&w=120&fmt=png&e404=1");
				CF.setJoin(mms.txtLargeCoverArt, mms.coverart+mms.covermatches[1]+"&h=390&w=300&c=1&rflh=30&rfle=5&rflo=70&rz=15&fmt=png&e404=1");				
				mms.stateThumbnailRegex.lastIndex = 0;
		
		}else if (mms.stateTrackNumberRegex.test(matchedString)) {				// Test if it is a Current Fanart message. This is for defining the fanart for the currently playing item.
		
				mms.matches = mms.stateTrackNumberRegex.exec(matchedString);
				CF.setJoin(mms.txtTrackStatus, mms.matches[1]);

				mms.stateTrackNumberRegex.lastIndex = 0;
		
		} else if (mms.stateArtistRegex.test(matchedString)) {				// Test if it is a Current Fanart message. This is for defining the fanart for the currently playing item.
		
				mms.matches = mms.stateArtistRegex.exec(matchedString);
				CF.setJoin(mms.txtArtist, mms.matches[1]);
				mms.stateArtistRegex.lastIndex = 0;
		
		} else if (mms.stateAlbumRegex.test(matchedString)) {				// Test if it is a Current Fanart message. This is for defining the fanart for the currently playing item.
		
				mms.matches = mms.stateAlbumRegex.exec(matchedString);
				CF.setJoin(mms.txtAlbum, mms.matches[1]);
				mms.stateAlbumRegex.lastIndex = 0;
		
		} else if (mms.stateTrackRegex.test(matchedString)) {				// Test if it is a Current Fanart message. This is for defining the fanart for the currently playing item.
		
				mms.matches = mms.stateTrackRegex.exec(matchedString);
				CF.setJoin(mms.txtTrackTitle, mms.matches[1]);
				mms.stateTrackRegex.lastIndex = 0;
				
		} else if (mms.stateTrackTimeRegex.test(matchedString)) {				
		
				mms.matches = mms.stateTrackTimeRegex.exec(matchedString);
				
				// convert the total time into minutes and seconds
				mms.TrackTime = mms.matches[1];
				mms.minutes = Math.floor(mms.matches[1]/60);
				mms.remain_seconds = mms.matches[1] % 60;
				mms.seconds = Math.floor(remain_seconds);
				mms.time = ("00"+minutes).slice(-2) + ":" + ("00"+seconds).slice(-2);
				CF.setJoin(mms.txtTrackTime, time);
                CF.setJoin(mms.sldTrackTime, Math.round((mms.TrackTime/mms.TrackDuration)*65535));  //moved by chap from end of elses
				mms.stateTrackTimeRegex.lastIndex = 0;
				
		} else if (mms.stateTrackDurationRegex.test(matchedString)) {				
		
				mms.matches = mms.stateTrackDurationRegex.exec(matchedString);
				
				// convert the total time into minutes and seconds
				mms.TrackDuration = Math.floor(mms.matches[1]);
				mms.minutes = Math.floor(mms.matches[1]/60);
				mms.remain_seconds = mms.matches[1] % 60;
				mms.seconds = Math.floor(remain_seconds);
				mms.time = ("00"+minutes).slice(-2) + ":" + ("00"+seconds).slice(-2);
				CF.setJoin(mms.txtTrackDuration, time);
				mms.stateTrackDurationRegex.lastIndex = 0;
		
		} else if (mms.stateShuffleRegex.test(matchedString)) {				// Test if it is a Current Fanart message. This is for defining the fanart for the currently playing item.
		
				mms.matches = mms.stateShuffleRegex.exec(matchedString);
				switch(mms.matches[1])
				{
					case "True":
						CF.setJoin(mms.btnShuffle, 1);
						break;
					case "False":
						CF.setJoin(mms.btnShuffle, 0);
						break;
				}
				mms.stateShuffleRegex.lastIndex = 0;
				
		} else if (mms.stateScrobbleRegex.test(matchedString)) {				// Test if it is a Current Fanart message. This is for defining the fanart for the currently playing item.
		
				mms.matches = mms.stateScrobbleRegex.exec(matchedString);
				switch(mms.matches[1])
				{
					case "1":
						CF.setJoin(mms.btnScrobble, 1);
						break;
					case "0":
						CF.setJoin(mms.btnScrobble, 0);
						break;
				}
				mms.stateScrobbleRegex.lastIndex = 0;
				
		} else if (mms.stateRepeatRegex.test(matchedString)) {				// Test if it is a Current Fanart message. This is for defining the fanart for the currently playing item.
		
				mms.matches = mms.stateRepeatRegex.exec(matchedString);
				switch(mms.matches[1])
				{
					case "True":
						CF.setJoin(mms.btnRepeat, 1);
						break;
					case "False":
						CF.setJoin(mms.btnRepeat, 0);
						break;
				}  
				mms.stateRepeatRegex.lastIndex = 0;
				
		} else if (mms.statePlayStatusRegex.test(matchedString)) {				// Test if it is a Current Fanart message. This is for defining the fanart for the currently playing item.
		
				mms.matches = mms.statePlayStatusRegex.exec(matchedString);
				switch(mms.matches[1])
				{
					case "Play":
						CF.setJoin(mms.btnPlay, 1);
						CF.setJoin(mms.btnPause, 0);
						CF.setJoin(mms.btnPlayPause, 0);
						CF.setJoin(mms.txtPlayStatus, "PLAYING STATUS : Playing");
						break;
					case "Pause":
                        CF.setJoin(mms.btnPlay,0);
						CF.setJoin(mms.btnPause, 1);
						CF.setJoin(mms.btnPlayPause, 1);
						CF.setJoin(mms.txtPlayStatus, "PLAYING STATUS : Paused");
						break;
					case "Stop":
						CF.setJoin(mms.btnPlayPause, 1);
						CF.setJoin(mms.btnPause, 1);
						 CF.setJoin(mms.btnPlay,0);
						CF.setJoin(mms.txtPlayStatus, "PLAYING STATUS : Stopped");
						break;	
				}  
				mms.statePlayStatusRegex.lastIndex = 0;

		} else if (mms.stateMuteRegex.test(matchedString)) {				// Test if it is a Current Fanart message. This is for defining the fanart for the currently playing item.
		
				mms.matches = mms.stateMuteRegex.exec(matchedString);
				switch(mms.matches[1])
				{
					case "True":
						CF.setJoin(mms.btnMute, 1);
						break;
					case "False":
						CF.setJoin(mms.btnMute, 0);
						break;
				}  
				mms.stateMuteRegex.lastIndex = 0;
				
		} else if (mms.stateVolumeRegex.test(matchedString)) {				// Test if it is a Current Fanart message. This is for defining the fanart for the currently playing item.
		
				mms.matches = mms.stateVolumeRegex.exec(matchedString);
				CF.setJoin(mms.txtVolumeLevel, mms.matches[1]);
				CF.setJoin(mms.sldVolumeControl, Math.round((mms.matches[1]/50)*65535));
				mms.stateVolumeRegex.lastIndex = 0;
		
		} else if (mms.stateBackRegex.test(matchedString)) {				// Test if it is a Current Fanart message. This is for defining the fanart for the currently playing item.
		
				mms.matches = mms.stateBackRegex.exec(matchedString);
				switch(mms.matches[1])
				{
					case "True":
						CF.setProperties({join: mms.btnBack, opacity: 1.0});
						break;
					case "False":
						CF.setProperties({join: mms.btnBack, opacity: 0.0});
						break;
				}  
				mms.stateBackRegex.lastIndex = 0;
		
		} else if (mms.stateForwardRegex.test(matchedString)) {				// Test if it is a Current Fanart message. This is for defining the fanart for the currently playing item.
		
				mms.matches = mms.stateForwardRegex.exec(matchedString);
				switch(mms.matches[1])
				{
					case "True":
						CF.setProperties({join: mms.btnForward, opacity: 1.0});
						break;
					case "False":
						CF.setProperties({join: mms.btnForward, opacity: 0.0});
						break;
				}  
				mms.stateForwardRegex.lastIndex = 0;
		
		} else if (mms.stateUIMessageRegex.test(matchedString)) {					// temp message.
			
				mms.matches = mms.stateUIMessageRegex.exec(matchedString);
					CF.setJoin(mms.txtMessageBoxMessage, mms.matches[1]);
			//	mms.clearSubPages(); 
                                                                        // hide all subpages
                CF.setJoin(mms.subMessagePopup, 1);                                              // show the correct subpage	
				mms.stateUIMessageRegex.lastIndex = 0;						// Reset the regex to work correctly after each consecutive match
		
		} else if (mms.stateUIInputBoxRegex.test(matchedString)) {				// 
			
				mms.matches = mms.stateUIInputBoxRegex.exec(matchedString);
			//	mms.clearSubPages();                                                             // hide all subpages
                CF.setJoins([													//popup!!!
					
					{join: mms.subSearchRadioStations, value: 1},
					{join: mms.btnCancel, tokens: {"[guid]":mms.matches[1]}},
					{join: mms.txtSearchTitle, value: mms.matches[2]},	
					{join: mms.txtSearchDesc, value:mms.matches[3]},
					{join: mms.txtSearchCmd, value: mms.matches[6]}
				]);
				mms.log ("btnCancel:" + {"[guid]": mms.matches[1]} + mms.txtSearchCmd );
			
				mms.stateUIInputBoxRegex.lastIndex = 0;						// Reset the regex to work correctly after each consecutive match
//5.17

		} else if (mms.stateMediaArtChangedRegex.test(matchedString)) {				// Test if it is a media art change message to update art
		
				mms.matches = mms.stateMediaArtChangedRegex.exec(matchedString);
				switch(mms.matches[1])
				{
					case "True":
				CF.setJoin(mms.txtCoverArt, mms.coverart+mms.covermatches[1]+"&h=120&w=120&fmt=png");//no blanks
				CF.setJoin(mms.txtLargeCoverArt, mms.coverart+mms.covermatches[1]+"&h=390&w=300&c=1&rflh=30&rfle=5&rflo=70&rz=15&fmt=png");	//no blanks			
                break;
                case "False":
                break;
				}  
				mms.stateMediaArtChangedRegex.lastIndex = 0;

//5.17 additions

		} else if (mms.stateNowPlayingTypeRegex.test(matchedString)) {				
		
				mms.matches = mms.stateNowPlayingTypeRegex.exec(matchedString);
				CF.setJoin(mms.txtNowPlayingType, mms.matches[1]);
				if (mms.matches[1] == "Radio"){
				    mms.radioStationsFlag = 1;
				  //  if (mms.subNowPlayingMusic == 1)  {             //flop the now playing page if on wrong one only if already showing
             	mms.clearSubPages();
                        CF.setJoin(mms.subNowPlaying, 1);
                  //  }
               }
				else {
				    mms.radioStationsFlag = 0;
				     if (mms.subNowPlaying == 1)  {
                      	mms.clearSubPages();
                        CF.setJoin(mms.subNowPlayingMusic, 1);
                    }
				}
				mms.stateNowPlayingTypeRegex.lastIndex = 0;
				

        } else if (mms.stateThumbsUpRegex.test(matchedString)) {
				mms.matches = mms.stateThumbsUpRegex.exec(matchedString);
				mms.log("Thumbs message: " + mms.matches[1]);

             	switch(mms.matches[1])
				{
				 case "0":
	               CF.setProperties({join:mms.btnThumbs,  opacity:1.0}, 0.0, 0.0);  //buttons appear
	               CF.setJoin(mms.subThumbsTimer, 1);                                   //for timer page
                   break;
			
			     case "1":
                    CF.setProperties({join:mms.btnThumbs,  opacity:1.0}, 0.0, 0.0);  //buttons appear
	               CF.setJoin(mms.subThumbsTimer, 1);                                   //for timer page
                   break;
                   
			     case "-1":
				    CF.setProperties({join:mms.btnThumbs,  opacity:0.0}, 0.0, 0.0);
                    CF.setJoin(mms.subThumbsTimer, 0);				
				}
				mms.stateThumbsUpRegex.lastIndex = 0;				

			
///*test18.3
		} else if (mms.stateNowPlayingRegex.test(matchedString)) {				// Test if it is a now playing message. For switching to large now playing Page.
        			
				mms.matches = mms.stateNowPlayingRegex.exec(matchedString);
				mms.clearSubPages();                                                             // hide all subpages
                if (mms.radioStationsFlag === 0){
                    CF.setJoin(mms.subNowPlayingMusic, 1);
                }
                else {                                                          // hide all subpages
                    CF.setJoin(mms.subNowPlaying, 1);                                               // show the correct subpage	
                }
                mms.log ("nowplaying");
                			//	mms.sendCmd("getart?&c=0&rfle=3&rflh=30&rflo=70&rz=15&fmt=png");
				mms.stateNowPlayingRegex.lastIndex = 0;						// Reset the regex to work correctly after each consecutive match
//*/				
				//3 lines               				
		} else if (mms.stateUIMessageBoxRegex3.test(matchedString)) {				// Test if it is a message box
		
				mms.matches = mms.stateUIMessageBoxRegex3.exec(matchedString);
            	CF.listRemove(mms.lstMessageBox); 
                mms.arrayBox = [];     	
                CF.setJoin(mms.subMessageBox, 1);                                       // show the correct subpage	

		
				CF.setJoin(mms.txtMessageBoxCaption, mms.matches[2]);
				CF.setJoin(mms.txtMessageBoxMessage, mms.matches[3]);
				
		    	CF.listAdd(mms.lstMessageBox, [{
                                    d4601: { tokens: {"[guid]": mms.matches[1]} },
									s4602: mms.matches[4],		//name of command				
									s4603: mms.matches[5]      //command string

								}]
                                );

                CF.listAdd(mms.lstMessageBox, [{
                                    d4601: { tokens: {"[guid]": mms.matches[1]} },
   									s4602: mms.matches[6],						
									s4603: mms.matches[7]

								}]
								);
                CF.listAdd(mms.lstMessageBox, [{
                                    d4601: { tokens: {"[guid]": mms.matches[1]} },
									s4602: mms.matches[8],						
									s4603: mms.matches[9]

								}]
                                );
               	mms.arrayBox.push({
								    d4601: { tokens: {"[guid]": mms.matches[1]} },
									s4602: mms.matches[4],		//name of command	
									s4603: mms.matches[5]												
							});
                mms.arrayBox.push({
								d4601: { tokens: {"[guid]": mms.matches[1]} },
									s4602: mms.matches[6],
									s4603: mms.matches[7]												
							});			
							
                mms.arrayBox.push({
								 d4601: { tokens: {"[guid]": mms.matches[1]} },
									s4602: mms.matches[8],
									s4603: mms.matches[9]												
							});			
							
							
							
							
							
							
				mms.log ( "Third: " + mms.matches[9]);
				mms.stateUIMessageBoxRegex3.lastIndex = 0;				

//2 lines				
		} else if (mms.stateUIMessageBoxRegex2.test(matchedString)) {				// Test if it is a message box
		
				mms.matches = mms.stateUIMessageBoxRegex2.exec(matchedString);
            	CF.listRemove(mms.lstMessageBox); 
                mms.arrayBox = [];     	
                CF.setJoin(mms.subMessageBox, 1);                                       // show the correct subpage	

		
				CF.setJoin(mms.txtMessageBoxCaption, mms.matches[2]);
				CF.setJoin(mms.txtMessageBoxMessage, mms.matches[3]);
				
		    	CF.listAdd(mms.lstMessageBox, [{
                                    d4601: { tokens: {"[guid]": mms.matches[1]} },
									s4602: mms.matches[4],		//name of command				
									s4603: mms.matches[5]      //command string

								}]
                                );

                CF.listAdd(mms.lstMessageBox, [{
                                    d4601: { tokens: {"[guid]": mms.matches[1]} },
   									s4602: mms.matches[6],						
									s4603: mms.matches[7]

								}]

                                );
               	mms.arrayBox.push({
								    d4601: { tokens: {"[guid]": mms.matches[1]} },
									s4602: mms.matches[4],		//name of command	
									s4603: mms.matches[5]												
							});
                mms.arrayBox.push({
								d4601: { tokens: {"[guid]": mms.matches[1]} },
									s4602: mms.matches[6],
									s4603: mms.matches[7]												
							});			
				mms.stateUIMessageBoxRegex2.lastIndex = 0;	
				
//1 line				
		} else if (mms.stateUIMessageBoxRegex1.test(matchedString)) {				// Test if it is a message box
		
				mms.matches = mms.stateUIMessageBoxRegex1.exec(matchedString);
            	CF.listRemove(mms.lstMessageBox); 
                mms.arrayBox = [];     	
                CF.setJoin(mms.subMessageBoxBig, 1);                                       // show the correct subpage	

		
				CF.setJoin(mms.txtMessageBoxCaption, mms.matches[2]);
				CF.setJoin(mms.txtMessageBoxMessage, mms.matches[3]);
				
		    	CF.listAdd(mms.lstMessageBox, [{
                                    d4601: { tokens: {"[guid]": mms.matches[1]} },
									s4602: mms.matches[4],		//name of command				
									s4603: mms.matches[5]      //command string

								}]
                                );

               
               	mms.arrayBox.push({
								    d4601: { tokens: {"[guid]": mms.matches[1]} },
									s4602: mms.matches[4],		//name of command	
									s4603: mms.matches[5]												
							});
              			
				mms.stateUIMessageBoxRegex1.lastIndex = 0;	
// line	0			
		} else if (mms.stateUIMessageBoxRegex.test(matchedString)) {				// Test if it is a message box
		
				mms.matches = mms.stateUIMessageBoxRegex.exec(matchedString);
            	CF.listRemove(mms.lstMessageBox); 
                mms.arrayBox = [];     	
                CF.setJoin(mms.subMessageBox, 1);                                       // show the correct subpage	

		
				CF.setJoin(mms.txtMessageBoxCaption, mms.matches[2]);
				CF.setJoin(mms.txtMessageBoxMessage, mms.matches[3]);
				
		
              			
				mms.stateUIMessageBoxRegex.lastIndex = 0;	
		
 				
		} else if (mms.stateUIClearRegex.test(matchedString)) {				// box clear message
			
				mms.matches = mms.stateUIClearRegex.exec(matchedString);
//temp!!
                CF.setJoin(mms.subMessageBox, 0);                                       // clear popup
				 CF.setJoin(mms.subSearchRadioStations, 0); 
			
				mms.stateUIClearRegex.lastIndex = 0;						// Reset the regex to work correctly after each consecutive match				
				
		} else if (mms.radioSourceDoneRegex.test(matchedString)) {				// At end of radio sources, select pandora
			
				mms.matches = mms.radioSourceDoneRegex.exec(matchedString);
                CF.listUpdate(mms.lstRadioSource,[{index:CF.AllItems,d4601:0}]);	   //set fb on proper button		
                CF.listUpdate(mms.lstRadioSource,[{index:0,d4601:1}]);		
                    mms.clearRadioFilter();									 // clear all previous radio filters							
					mms.arrayPickListItem = [];							     // clear array of any previous data
					CF.listRemove(mms.lstPickListItem);					     //clear list of any previous entries
                    mms.clearSubPages();                                     // hide all subpages
                    CF.setJoin(mms.subPickListItem, 1);                     //  show the correct subpage               
	
                    mms.setRadioFilter_RadioSource("fbbcedb1-af64-4c3f-bfe5-000000000010");				//set the filter
					mms.sendCmd("BrowseRadioStations 1");
                    							
				
			
				mms.radioSourceDoneRegex.lastIndex = 0;						// Reset the regex to work correctly after each consecutive match	

                				
				
				
				
				
				
				
       } else	if (mms.stateKillsocketRegex.test(matchedString)){    
		      mms.log ("Another Telnet Session Was open"); 
                
                mms.sendCmd2("KILLSOCKET Telnet1");
                mms.stateKillsocketRegex.lastIndex = 0;
       } 
	}, 
	
	// =============================================================================================================================
	// Creation and control of Lists.
	// =============================================================================================================================
//================================================================
//Grid builds: 4 wide n high
//================================================================

    buildAlbumGrid: function(){	
        mms.log("Building Album grid");	
		mms.arrayTemp = [];
        mms.qItem = [];	                                       //clear array of any previous entries
        var md = mms.arrayAlbum.length%4;                           //get remainder
        var listSize =  mms.arrayAlbum.length-md;
        var i = 0;
			// Create a 4x N row of album grid, scroll vertically
			//first do modulo 4 blocks
			if (listSize > 3){
				for (i=0; i<listSize; i=i+4){
				mms.qItem=
                {
					s4601: mms.arrayAlbum[i].s4601,              //panel 1 is s4601, panel 2 is s4602, etc
					s4605: mms.arrayAlbum[i].s4602,
					d4601: { tokens : { "[guid]": mms.arrayAlbum[i].d4601.tokens["[guid]"] }	},
                    s4602: mms.arrayAlbum[i+1].s4601,              //pnael 1 is s4601, panel 2 is s4602, etc
					s4606: mms.arrayAlbum[i+1].s4602,
					d4602: { tokens : { "[guid]": mms.arrayAlbum[i+1].d4601.tokens["[guid]"] }	},
                    s4603: mms.arrayAlbum[i+2].s4601,              //pnael 1 is s4601, panel 2 is s4602, etc
					s4607: mms.arrayAlbum[i+2].s4602,
					d4603: { tokens : { "[guid]": mms.arrayAlbum[i+2].d4601.tokens["[guid]"] }	},
                    s4604: mms.arrayAlbum[i+3].s4601,              //pnael 1 is s4601, panel 2 is s4602, etc
					s4608: mms.arrayAlbum[i+3].s4602,
					d4604: { tokens : { "[guid]": mms.arrayAlbum[i+3].d4601.tokens["[guid]"] }	}                   
                };
				mms.arrayTemp.push(mms.qItem);
		      	}//end for
			}//end if
            //then do leftovers
			if (md  ==1) {
				mms.qItem=
                {
					s4601: mms.arrayAlbum[i+0].s4601,              //panel 1 is s4601, panel 2 is s4602, etc
					s4605: mms.arrayAlbum[i+0].s4602,
					d4601: { tokens : { "[guid]": mms.arrayAlbum[i+0].d4601.tokens["[guid]"] }   }	
				};
                mms.arrayTemp.push(mms.qItem);                                 //stuff leftovers
			} else if (md  ==2) {				
				mms.qItem=
                {						
                    s4601: mms.arrayAlbum[i+0].s4601,              //panel 1 is s4601, panel 2 is s4602, etc
					s4605: mms.arrayAlbum[i+0].s4602,
					d4601: { tokens : { "[guid]": mms.arrayAlbum[i+0].d4601.tokens["[guid]"] }   },	
			
                    s4602: mms.arrayAlbum[i+1].s4601,              //pnael 1 is s4601, panel 2 is s4602, etc
					s4606: mms.arrayAlbum[i+1].s4602,
					d4602: { tokens : { "[guid]": mms.arrayAlbum[i+1].d4601.tokens["[guid]"] }	}
				};
                mms.arrayTemp.push(mms.qItem);                                 //stuff leftovers	
			} else if (md  ==3) {				
				mms.qItem=
                {						
                    s4601: mms.arrayAlbum[i+0].s4601,              //panel 1 is s4601, panel 2 is s4602, etc
					s4605: mms.arrayAlbum[i+0].s4602,
					d4601: { tokens : { "[guid]": mms.arrayAlbum[i+0].d4601.tokens["[guid]"] }   },	
			
                    s4602: mms.arrayAlbum[i+1].s4601,              //pnael 1 is s4601, panel 2 is s4602, etc
					s4606: mms.arrayAlbum[i+1].s4602,
					d4602: { tokens : { "[guid]": mms.arrayAlbum[i+1].d4601.tokens["[guid]"] }	},
					
                    s4603: mms.arrayAlbum[i+2].s4601,              //pnael 1 is s4601, panel 2 is s4602, etc
					s4607: mms.arrayAlbum[i+2].s4602,
					d4603: { tokens : { "[guid]": mms.arrayAlbum[i+2].d4601.tokens["[guid]"] }	}
				};
                mms.arrayTemp.push(mms.qItem);                                 //stuff leftovers		
			}

		CF.listRemove(mms.tileAlbum);	                                       //clear list of any previous entries
		CF.listAdd(mms.tileAlbum,mms.arrayTemp);
    },
   buildArtistGrid: function(){	
        mms.log("Building Artist grid");	
		mms.arrayTemp = [];
        mms.qItem = [];	                                       //clear array of any previous entries
        var md = mms.arrayArtist.length%4;                           //get remainder
        var listSize =  mms.arrayArtist.length-md;
        var i = 0;
			// Create a 4x N row of Artist grid, scroll vertically
			//first do modulo 4 blocks
			if (listSize > 3){
				for (i=0; i<listSize; i=i+4){
				mms.qItem=
                {
					s4601: mms.arrayArtist[i].s4601,              //panel 1 is s4601, panel 2 is s4602, etc
					s4605: mms.arrayArtist[i].s4602,
					d4601: { tokens : { "[guid]": mms.arrayArtist[i].d4601.tokens["[guid]"] }	},
                    s4602: mms.arrayArtist[i+1].s4601,              //pnael 1 is s4601, panel 2 is s4602, etc
					s4606: mms.arrayArtist[i+1].s4602,
					d4602: { tokens : { "[guid]": mms.arrayArtist[i+1].d4601.tokens["[guid]"] }	},
                    s4603: mms.arrayArtist[i+2].s4601,              //pnael 1 is s4601, panel 2 is s4602, etc
					s4607: mms.arrayArtist[i+2].s4602,
					d4603: { tokens : { "[guid]": mms.arrayArtist[i+2].d4601.tokens["[guid]"] }	},
                    s4604: mms.arrayArtist[i+3].s4601,              //pnael 1 is s4601, panel 2 is s4602, etc
					s4608: mms.arrayArtist[i+3].s4602,
					d4604: { tokens : { "[guid]": mms.arrayArtist[i+3].d4601.tokens["[guid]"] }	}                   
                };
				mms.arrayTemp.push(mms.qItem);
		      	}//end for
			}//end if
            //then do leftovers
			if (md  ==1) {
				mms.qItem=
                {
					s4601: mms.arrayArtist[i+0].s4601,              //panel 1 is s4601, panel 2 is s4602, etc
					s4605: mms.arrayArtist[i+0].s4602,
					d4601: { tokens : { "[guid]": mms.arrayArtist[i+0].d4601.tokens["[guid]"] }   }	
				};
                mms.arrayTemp.push(mms.qItem);                                 //stuff leftovers
			} else if (md  ==2) {				
				mms.qItem=
                {						
                    s4601: mms.arrayArtist[i+0].s4601,              //panel 1 is s4601, panel 2 is s4602, etc
					s4605: mms.arrayArtist[i+0].s4602,
					d4601: { tokens : { "[guid]": mms.arrayArtist[i+0].d4601.tokens["[guid]"] }   },	
			
                    s4602: mms.arrayArtist[i+1].s4601,              //pnael 1 is s4601, panel 2 is s4602, etc
					s4606: mms.arrayArtist[i+1].s4602,
					d4602: { tokens : { "[guid]": mms.arrayArtist[i+1].d4601.tokens["[guid]"] }	}
				};
                mms.arrayTemp.push(mms.qItem);                                 //stuff leftovers	
			} else if (md  ==3) {				
				mms.qItem=
                {						
                    s4601: mms.arrayArtist[i+0].s4601,              //panel 1 is s4601, panel 2 is s4602, etc
					s4605: mms.arrayArtist[i+0].s4602,
					d4601: { tokens : { "[guid]": mms.arrayArtist[i+0].d4601.tokens["[guid]"] }   },	
			
                    s4602: mms.arrayArtist[i+1].s4601,              //pnael 1 is s4601, panel 2 is s4602, etc
					s4606: mms.arrayArtist[i+1].s4602,
					d4602: { tokens : { "[guid]": mms.arrayArtist[i+1].d4601.tokens["[guid]"] }	},
					
                    s4603: mms.arrayArtist[i+2].s4601,              //pnael 1 is s4601, panel 2 is s4602, etc
					s4607: mms.arrayArtist[i+2].s4602,
					d4603: { tokens : { "[guid]": mms.arrayArtist[i+2].d4601.tokens["[guid]"] }	}
				};
                mms.arrayTemp.push(mms.qItem);                                 //stuff leftovers		
			}

		CF.listRemove(mms.tileArtist);	                                       //clear list of any previous entries
		CF.listAdd(mms.tileArtist,mms.arrayTemp);
    },   
   buildGenreGrid: function(){	
        mms.log("Building Genre grid");	
		mms.arrayTemp = [];
        mms.qItem = [];	                                       //clear array of any previous entries
        var md = mms.arrayGenre.length%4;                           //get remainder
        var listSize =  mms.arrayGenre.length-md;
        var i = 0;
			// Create a 4x N row of Genre grid, scroll vertically
			//first do modulo 4 blocks
			if (listSize > 3){
				for (i=0; i<listSize; i=i+4){
				mms.qItem=
                {
					s4601: mms.arrayGenre[i].s4601,              //panel 1 is s4601, panel 2 is s4602, etc
					s4605: mms.arrayGenre[i].s4602,
					d4601: { tokens : { "[guid]": mms.arrayGenre[i].d4601.tokens["[guid]"] }	},
                    s4602: mms.arrayGenre[i+1].s4601,              //pnael 1 is s4601, panel 2 is s4602, etc
					s4606: mms.arrayGenre[i+1].s4602,
					d4602: { tokens : { "[guid]": mms.arrayGenre[i+1].d4601.tokens["[guid]"] }	},
                    s4603: mms.arrayGenre[i+2].s4601,              //pnael 1 is s4601, panel 2 is s4602, etc
					s4607: mms.arrayGenre[i+2].s4602,
					d4603: { tokens : { "[guid]": mms.arrayGenre[i+2].d4601.tokens["[guid]"] }	},
                    s4604: mms.arrayGenre[i+3].s4601,              //pnael 1 is s4601, panel 2 is s4602, etc
					s4608: mms.arrayGenre[i+3].s4602,
					d4604: { tokens : { "[guid]": mms.arrayGenre[i+3].d4601.tokens["[guid]"] }	}                   
                };
				mms.arrayTemp.push(mms.qItem);
		      	}//end for
			}//end if
            //then do leftovers
			if (md  ==1) {
				mms.qItem=
                {
					s4601: mms.arrayGenre[i+0].s4601,              //panel 1 is s4601, panel 2 is s4602, etc
					s4605: mms.arrayGenre[i+0].s4602,
					d4601: { tokens : { "[guid]": mms.arrayGenre[i+0].d4601.tokens["[guid]"] }   }	
				};
                mms.arrayTemp.push(mms.qItem);                                 //stuff leftovers
			} else if (md  ==2) {				
				mms.qItem=
                {						
                    s4601: mms.arrayGenre[i+0].s4601,              //panel 1 is s4601, panel 2 is s4602, etc
					s4605: mms.arrayGenre[i+0].s4602,
					d4601: { tokens : { "[guid]": mms.arrayGenre[i+0].d4601.tokens["[guid]"] }   },	
			
                    s4602: mms.arrayGenre[i+1].s4601,              //pnael 1 is s4601, panel 2 is s4602, etc
					s4606: mms.arrayGenre[i+1].s4602,
					d4602: { tokens : { "[guid]": mms.arrayGenre[i+1].d4601.tokens["[guid]"] }	}
				};
                mms.arrayTemp.push(mms.qItem);                                 //stuff leftovers	
			} else if (md  ==3) {				
				mms.qItem=
                {						
                    s4601: mms.arrayGenre[i+0].s4601,              //panel 1 is s4601, panel 2 is s4602, etc
					s4605: mms.arrayGenre[i+0].s4602,
					d4601: { tokens : { "[guid]": mms.arrayGenre[i+0].d4601.tokens["[guid]"] }   },	
			
                    s4602: mms.arrayGenre[i+1].s4601,              //pnael 1 is s4601, panel 2 is s4602, etc
					s4606: mms.arrayGenre[i+1].s4602,
					d4602: { tokens : { "[guid]": mms.arrayGenre[i+1].d4601.tokens["[guid]"] }	},
					
                    s4603: mms.arrayGenre[i+2].s4601,              //pnael 1 is s4601, panel 2 is s4602, etc
					s4607: mms.arrayGenre[i+2].s4602,
					d4603: { tokens : { "[guid]": mms.arrayGenre[i+2].d4601.tokens["[guid]"] }	}
				};
                mms.arrayTemp.push(mms.qItem);                                 //stuff leftovers		
			}

		CF.listRemove(mms.tileGenre);	                                       //clear list of any previous entries
		CF.listAdd(mms.tileGenre,mms.arrayTemp);
    },
  buildComposerGrid: function(){	
        mms.log("Building Composer grid");	
		mms.arrayTemp = [];
        mms.qItem = [];	                                       //clear array of any previous entries
        var md = mms.arrayComposer.length%4;                           //get remainder
        var listSize =  mms.arrayComposer.length-md;
        var i = 0;
			// Create a 4x N row of Composer grid, scroll vertically
			//first do modulo 4 blocks
			if (listSize > 3){
				for (i=0; i<listSize; i=i+4){
				mms.qItem=
                {
					s4601: mms.arrayComposer[i].s4601,              //panel 1 is s4601, panel 2 is s4602, etc
					s4605: mms.arrayComposer[i].s4602,
					d4601: { tokens : { "[guid]": mms.arrayComposer[i].d4601.tokens["[guid]"] }	},
                    s4602: mms.arrayComposer[i+1].s4601,              //pnael 1 is s4601, panel 2 is s4602, etc
					s4606: mms.arrayComposer[i+1].s4602,
					d4602: { tokens : { "[guid]": mms.arrayComposer[i+1].d4601.tokens["[guid]"] }	},
                    s4603: mms.arrayComposer[i+2].s4601,              //pnael 1 is s4601, panel 2 is s4602, etc
					s4607: mms.arrayComposer[i+2].s4602,
					d4603: { tokens : { "[guid]": mms.arrayComposer[i+2].d4601.tokens["[guid]"] }	},
                    s4604: mms.arrayComposer[i+3].s4601,              //pnael 1 is s4601, panel 2 is s4602, etc
					s4608: mms.arrayComposer[i+3].s4602,
					d4604: { tokens : { "[guid]": mms.arrayComposer[i+3].d4601.tokens["[guid]"] }	}                   
                };
				mms.arrayTemp.push(mms.qItem);
		      	}//end for
			}//end if
            //then do leftovers
			if (md  ==1) {
				mms.qItem=
                {
					s4601: mms.arrayComposer[i+0].s4601,              //panel 1 is s4601, panel 2 is s4602, etc
					s4605: mms.arrayComposer[i+0].s4602,
					d4601: { tokens : { "[guid]": mms.arrayComposer[i+0].d4601.tokens["[guid]"] }   }	
				};
                mms.arrayTemp.push(mms.qItem);                                 //stuff leftovers
			} else if (md  ==2) {				
				mms.qItem=
                {						
                    s4601: mms.arrayComposer[i+0].s4601,              //panel 1 is s4601, panel 2 is s4602, etc
					s4605: mms.arrayComposer[i+0].s4602,
					d4601: { tokens : { "[guid]": mms.arrayComposer[i+0].d4601.tokens["[guid]"] }   },	
			
                    s4602: mms.arrayComposer[i+1].s4601,              //pnael 1 is s4601, panel 2 is s4602, etc
					s4606: mms.arrayComposer[i+1].s4602,
					d4602: { tokens : { "[guid]": mms.arrayComposer[i+1].d4601.tokens["[guid]"] }	}
				};
                mms.arrayTemp.push(mms.qItem);                                 //stuff leftovers	
			} else if (md  ==3) {				
				mms.qItem=
                {						
                    s4601: mms.arrayComposer[i+0].s4601,              //panel 1 is s4601, panel 2 is s4602, etc
					s4605: mms.arrayComposer[i+0].s4602,
					d4601: { tokens : { "[guid]": mms.arrayComposer[i+0].d4601.tokens["[guid]"] }   },	
			
                    s4602: mms.arrayComposer[i+1].s4601,              //pnael 1 is s4601, panel 2 is s4602, etc
					s4606: mms.arrayComposer[i+1].s4602,
					d4602: { tokens : { "[guid]": mms.arrayComposer[i+1].d4601.tokens["[guid]"] }	},
					
                    s4603: mms.arrayComposer[i+2].s4601,              //pnael 1 is s4601, panel 2 is s4602, etc
					s4607: mms.arrayComposer[i+2].s4602,
					d4603: { tokens : { "[guid]": mms.arrayComposer[i+2].d4601.tokens["[guid]"] }	}
				};
                mms.arrayTemp.push(mms.qItem);                                 //stuff leftovers		
			}

		CF.listRemove(mms.tileComposer);	                                       //clear list of any previous entries
		CF.listAdd(mms.tileComposer,mms.arrayTemp);
    },
   buildFavoriteGrid: function(){	
        mms.log("Building Favorite grid");	
		mms.arrayTemp = [];
        mms.qItem = [];	                                       //clear array of any previous entries
        var md = mms.arrayFavorite.length%4;                           //get remainder
        var listSize =  mms.arrayFavorite.length-md;
        var i = 0;
			// Create a 4x N row of Favorite grid, scroll vertically
			//first do modulo 4 blocks
			if (listSize > 3){
				for (i=0; i<listSize; i=i+4){
				mms.qItem=
                {
					s4601: mms.arrayFavorite[i].s4601,              //panel 1 is s4601, panel 2 is s4602, etc
					s4605: mms.arrayFavorite[i].s4602,
					d4601: { tokens : { "[guid]": mms.arrayFavorite[i].d4601.tokens["[guid]"] }	},
                    s4602: mms.arrayFavorite[i+1].s4601,              //pnael 1 is s4601, panel 2 is s4602, etc
					s4606: mms.arrayFavorite[i+1].s4602,
					d4602: { tokens : { "[guid]": mms.arrayFavorite[i+1].d4601.tokens["[guid]"] }	},
                    s4603: mms.arrayFavorite[i+2].s4601,              //pnael 1 is s4601, panel 2 is s4602, etc
					s4607: mms.arrayFavorite[i+2].s4602,
					d4603: { tokens : { "[guid]": mms.arrayFavorite[i+2].d4601.tokens["[guid]"] }	},
                    s4604: mms.arrayFavorite[i+3].s4601,              //pnael 1 is s4601, panel 2 is s4602, etc
					s4608: mms.arrayFavorite[i+3].s4602,
					d4604: { tokens : { "[guid]": mms.arrayFavorite[i+3].d4601.tokens["[guid]"] }	}                   
                };
				mms.arrayTemp.push(mms.qItem);
		      	}//end for
			}//end if
            //then do leftovers
			if (md  ==1) {
				mms.qItem=
                {
					s4601: mms.arrayFavorite[i+0].s4601,              //panel 1 is s4601, panel 2 is s4602, etc
					s4605: mms.arrayFavorite[i+0].s4602,
					d4601: { tokens : { "[guid]": mms.arrayFavorite[i+0].d4601.tokens["[guid]"] }   }	
				};
                mms.arrayTemp.push(mms.qItem);                                 //stuff leftovers
			} else if (md  ==2) {				
				mms.qItem=
                {						
                    s4601: mms.arrayFavorite[i+0].s4601,              //panel 1 is s4601, panel 2 is s4602, etc
					s4605: mms.arrayFavorite[i+0].s4602,
					d4601: { tokens : { "[guid]": mms.arrayFavorite[i+0].d4601.tokens["[guid]"] }   },	
			
                    s4602: mms.arrayFavorite[i+1].s4601,              //pnael 1 is s4601, panel 2 is s4602, etc
					s4606: mms.arrayFavorite[i+1].s4602,
					d4602: { tokens : { "[guid]": mms.arrayFavorite[i+1].d4601.tokens["[guid]"] }	}
				};
                mms.arrayTemp.push(mms.qItem);                                 //stuff leftovers	
			} else if (md  ==3) {				
				mms.qItem=
                {						
                    s4601: mms.arrayFavorite[i+0].s4601,              //panel 1 is s4601, panel 2 is s4602, etc
					s4605: mms.arrayFavorite[i+0].s4602,
					d4601: { tokens : { "[guid]": mms.arrayFavorite[i+0].d4601.tokens["[guid]"] }   },	
			
                    s4602: mms.arrayFavorite[i+1].s4601,              //pnael 1 is s4601, panel 2 is s4602, etc
					s4606: mms.arrayFavorite[i+1].s4602,
					d4602: { tokens : { "[guid]": mms.arrayFavorite[i+1].d4601.tokens["[guid]"] }	},
					
                    s4603: mms.arrayFavorite[i+2].s4601,              //pnael 1 is s4601, panel 2 is s4602, etc
					s4607: mms.arrayFavorite[i+2].s4602,
					d4603: { tokens : { "[guid]": mms.arrayFavorite[i+2].d4601.tokens["[guid]"] }	}
				};
                mms.arrayTemp.push(mms.qItem);                                 //stuff leftovers		
			}

		CF.listRemove(mms.tileFavorite);	                                       //clear list of any previous entries
		CF.listAdd(mms.tileFavorite,mms.arrayTemp);
    },	
	// -----------------------------------------------------------------------------------------------------------------------------
	// Albums -> Title
	// -----------------------------------------------------------------------------------------------------------------------------
	browseAlbums: function() { 
	    mms.AlbumSelectFlag = 0;                                                            //Clear the album count flag
		mms.arrayAlbum = [];																// clear array of any previous data
//		CF.listRemove(mms.lstAlbum);														// clear list of any previous entries
		mms.clearSubPages();                                                                // hide all subpages
		CF.setJoin(mms.subAlbum, 1);                                                      	// show the correct subpage
        CF.setProperties({join:mms.subTitlePopup, opacity: 0.0}, 0.0, 0.0, CF.AnimationCurveEaseIn);    //opaque popup here for later
		mms.clearMusicFilter();															    // clear all previous music filters
		mms.clearRadioFilter();															    // clear all previous radio filters
		mms.sendCmd("BrowseAlbums"); 														// send the command and populate the array with data

	},
	
	selectAlbum_Title: function(list, listIndex, join) {
	
        mms.popTitleList(list, listIndex, join);                                                               //call the list popup									
        CF.getJoin(list+":"+listIndex+":"+join, function(j,v,t) {		
            mms.setMusicFilter_Album(t["[guid]"]);					//set the filter
//4.18.2
            mms.sendCmd("BrowseTitles");  //4.18.2
            //  mms.sendCmd("BrowseAlbumTitles");
        });//end getJoin            	
	},
	
	//Delete all previous tracks and play the album. 
	playAlbum: function(join) {							
		CF.getJoin(join, function(j,v,t) {
			mms.playAlbumFalse(t["[guid]"]);						
		});
	},
	//add all the album tracks to current queue
	queueAlbum:  function(join) {							
		CF.getJoin(join, function(j,v,t)  {
			mms.playAlbumTrue(t["[guid]"]);						
		});
	},	
	// Search the list of albums and display the searched results only.
	searchAlbums: function(strSearch) {
	
				var templistArray = [];				//initialize temporary array
			//	CF.listRemove(mms.lstAlbum);		//clear list of any previous entries
	
				for (var i = 0;i<mms.arrayAlbum.length;i++)						//loop thru all the elements in the Albums array 
				{
					mms.searchCoverArt = mms.arrayAlbum[i].s4601;
					mms.searchAlbum = mms.arrayAlbum[i].s4602;
					mms.searchType = mms.arrayAlbum[i].s4603;
					mms.searchTokenGuiD = mms.arrayAlbum[i].d4601.tokens["[guid]"];
					mms.searchToken2GuiD = mms.arrayAlbum[i].d4602.tokens["[guid]"];
					
					if(mms.search(searchAlbum, strSearch))							// refer to search() from "Other functions" section
					{
						templistArray.push({										// Add matched info to temp array
							s4601: mms.searchCoverArt,
							s4602: mms.searchAlbum,
							s4603: mms.searchType,
							d4601: { tokens: {"[guid]": mms.searchTokenGuiD} },
							d4602: { tokens: {"[guid]": mms.searchToken2GuiD} }
						});
					} // end if
				}// end for

	},
	

	// Use the alphabar to go to the specified point in the current list  mms5.17
	alphasrchAlbums: function(sliderval) {
	
				// Calculate the letter based on the slider value (0-27). To allow for better accuracy of the letter, both 0 and 1 slider values will equal "#" in the slider.
				var letter = "#";
				if (sliderval > 1) {
					// Use ascii char code and convert to the letter (letter A = 65, B = 66, and so on). Use parseInt here otherwise the + symbol might concatenate the numbers together, 
					// rather than add them. This is because parameters may be passed as strings from tokens such as [sliderval]
					letter = String.fromCharCode(63 + parseInt(sliderval));
				}
				CF.setJoin(mms.txtAlphabet, letter);		// Test the conversion
				
				for (var i = 0;i<mms.arrayAlbum.length;i++)						//loop thru all the elements in the Albums array 
				{		
					mms.searchAlbum = mms.arrayAlbum[i].s4602;
                    if (letter == "#")												// Non-filtered, display everything
					{			
                        //nada- maybe bounce?
  					} 
					else if (letter == mms.searchAlbum.charAt(0))						// compare the first alphabet of feedback string with the letter selected from slider
					{
                    CF.listScroll("l4511", i/4, CF.MiddlePosition, true);             //put the search result in middle of displayed list
                    CF.setJoin(mms.srchAlbum, mms.arrayAlbum[i].s4602);
                    break;
					}
				}// end for
	},	
	// -----------------------------------------------------------------------------------------------------------------------------
	// Artists -> Albums -> Title
	// -----------------------------------------------------------------------------------------------------------------------------
	
	browseArtists: function() { 
	    mms.AlbumSelectFlag = 0;                                                            //Clear the album count flag
        mms.arrayArtist = [];																// clear array of any previous data
	//	CF.listRemove(mms.lstArtist);														// clear list of any previous entries
		mms.clearSubPages();                                                                // hide all subpages
        CF.setJoin(mms.subArtist, 1);                                                       // show the correct subpage
      //  CF.setJoin(mms.flagRadioNowPlaying, 0);
		mms.clearMusicFilter();															    // clear all previous music filters
		mms.clearRadioFilter();															    // clear all previous radio filters
		mms.sendCmd("BrowseArtists"); 														// send the command

	},
	
	selectArtist_Album: function(list, listIndex, join) {							
		CF.getJoin(list+":"+listIndex+":"+join, function(j,v,t) {
		mms.arrayAlbum = [];									                            // clear array of any previous data
	//	CF.listRemove(mms.lstAlbum);							                            //clear list of any previous entries
		mms.clearSubPages();                                                                // hide all subpages
        CF.setJoin(mms.subArtistAlbum, 1);
        if (join =="d4601"){
            CF.setJoin("s4706", mms.arrayArtist[listIndex*4].s4602);
        }else if (join =="d4602"){
            CF.setJoin("s4706", mms.arrayArtist[listIndex*4+1].s4602);
        }else if (join =="d4603"){
            CF.setJoin("s4706", mms.arrayArtist[listIndex*4+2].s4602);
        }else if (join =="d4604"){
            CF.setJoin("s4706", mms.arrayArtist[listIndex*4+3].s4602);
        }
   	    mms.AlbumSelectFlag = 1;                                                            //Set the album count flag                                        
		mms.setMusicFilter_Artist(t["[guid]"]);					                            //set the filter
		mms.sendCmd("BrowseAlbums");						                                // Get all the titles in the selected album
		});
	},
	
	selectArtist_Album_Title: function(list, listIndex, join) {							
     mms.popTitleList(list, listIndex, join);                                                               //call the list popup									
        CF.getJoin(list+":"+listIndex+":"+join, function(j,v,t) {		
            mms.setMusicFilter_Album(t["[guid]"]);					//set the filter
            mms.sendCmd("BrowseTitles");
        });//end getJoin 
	},
	
	//Delete all previous tracks and play the all albums under Artist. If want to just queue the albums to current queue, use playArtistTrue instead.
	playArtist: function(list, listIndex, join) {							
		CF.getJoin(list+":"+listIndex+":"+join, function(j,v,t) {
			mms.playArtistFalse(t["[guid]"]);						
		});
	},
	
	// Search the list of artists and display the searched results only.
	searchArtists: function(strSearch) {
	
				var templistArray = [];				//initialize temporary array
		//		CF.listRemove(mms.lstArtist);		//clear list of any previous entries
	
				for (var i = 0;i<mms.arrayArtist.length;i++)						//loop thru all the elements in the Albums array 
				{
					mms.searchCoverArt = mms.arrayArtist[i].s4601;
					mms.searchArtist = mms.arrayArtist[i].s4602;
					mms.searchType = mms.arrayArtist[i].s4603;
					mms.searchTokenGuiD = mms.arrayArtist[i].d4601.tokens["[guid]"];
					mms.searchToken2GuiD = mms.arrayArtist[i].d4602.tokens["[guid]"];
					
					if(mms.search(searchArtist, strSearch))							// refer to search() from "Other functions" section
					{
						templistArray.push({										// Add matched info to temp array
							s4601: mms.searchCoverArt,
							s4602: mms.searchArtist,
							s4603: mms.searchType,
							d4601: { tokens: {"[guid]": mms.searchTokenGuiD} },
							d4602: { tokens: {"[guid]": mms.searchToken2GuiD} }
						});
					} // end if
				}// end for
			//	CF.listAdd(mms.lstArtist, templistArray);							// Add temp array to list
	},
	

	// Use the alphabar to go to the specified point in the current list  mms5.17
	alphasrchArtists: function(sliderval) {
	
				// Calculate the letter based on the slider value (0-27). To allow for better accuracy of the letter, both 0 and 1 slider values will equal "#" in the slider.
				var letter = "#";
				if (sliderval > 1) {
					// Use ascii char code and convert to the letter (letter A = 65, B = 66, and so on). Use parseInt here otherwise the + symbol might concatenate the numbers together, 
					// rather than add them. This is because parameters may be passed as strings from tokens such as [sliderval]
					letter = String.fromCharCode(63 + parseInt(sliderval));
				}
				CF.setJoin(mms.txtAlphabet, letter);		// Test the conversion
				
				for (var i = 0;i<mms.arrayArtist.length;i++)						//loop thru all the elements in the Artists array 
				{		
					mms.searchArtist = mms.arrayArtist[i].s4602;
                    if (letter == "#")												// Non-filtered, display everything
					{			
                        //nada- maybe bounce?
  					} 
					else if (letter == mms.searchArtist.charAt(0))						// compare the first alphabet of feedback string with the letter selected from slider
					{
                    CF.listScroll("l4512", i/4, CF.MiddlePosition, true);             //put the search result in middle of displayed list
                    CF.setJoin(mms.srchAlbum, mms.arrayArtist[i].s4602);
                    break;
					}
				}// end for
	},		
	// -----------------------------------------------------------------------------------------------------------------------------
	// Genres -> Albums -> Title
	// -----------------------------------------------------------------------------------------------------------------------------
	
	browseGenres: function() { 
	    mms.AlbumSelectFlag = 0;                                                            //Clear the album count flag
  		mms.arrayGenre = [];																// clear array of any previous data
	//	CF.listRemove(mms.lstGenre);														// clear list of any previous entries
		mms.clearSubPages();                                                                // hide all subpages
        CF.setJoin(mms.subGenre, 1);                                                        // show the correct subpage	
		mms.clearMusicFilter();															    // clear all previous music filters
		mms.clearRadioFilter();															    // clear all previous radio filters
		mms.sendCmd("BrowseGenres"); 														// send the command
		//setTimeout(function(){CF.listAdd(mms.lstGenre, mms.arrayGenre);}, 4000);			// set a short delay to give time for array to be populated before adding array into list.
	},
	
	selectGenre_Album: function(list, listIndex, join) {							
		CF.getJoin(list+":"+listIndex+":"+join, function(j,v,t) {
			mms.arrayAlbum = [];									                        // clear array of any previous data
		//	CF.listRemove(mms.lstAlbum);							                        //clear list of any previous entries
			mms.clearSubPages();                                                            // hide all subpages
            CF.setJoin(mms.subGenreAlbum, 1);                                               // show the correct subpage	
        if (join =="d4601"){
            CF.setJoin("s4706", mms.arrayGenre[listIndex*4].s4602);
        }else if (join =="d4602"){
            CF.setJoin("s4706", mms.arrayGenre[listIndex*4+1].s4602);
        }else if (join =="d4603"){
            CF.setJoin("s4706", mms.arrayGenre[listIndex*4+2].s4602);
        }else if (join =="d4604"){
            CF.setJoin("s4706", mms.arrayGenre[listIndex*4+3].s4602);
        }
   	    mms.AlbumSelectFlag = 1;                                                            //Set the album count flag                                        
			mms.setMusicFilter_Genre(t["[guid]"]);				                            //set the filter
			mms.sendCmd("BrowseAlbums");						                            // Get all the titles in the selected album
		});
	},
	
	selectGenre_Album_Title: function(list, listIndex, join) {							
     mms.popTitleList(list, listIndex, join);                                                               //call the list popup									
        CF.getJoin(list+":"+listIndex+":"+join, function(j,v,t) {		
            mms.setMusicFilter_Album(t["[guid]"]);					//set the filter
            mms.sendCmd("BrowseTitles");
        });//end getJoin 
	},
	
	//Delete all previous tracks and play the all albums under Artist. If want to just queue the albums to current queue, use playArtistTrue instead.
	playGenre: function(list, listIndex, join) {							
		CF.getJoin(list+":"+listIndex+":"+join, function(j,v,t) {
			mms.playGenreFalse(t["[guid]"]);						
		});
	},
	
	// Search the list of genres and display the searched results only.
	searchGenres: function(strSearch) {
	
				var templistArray = [];				//initialize temporary array
			//	CF.listRemove(mms.lstGenre);		//clear list of any previous entries
	
				for (var i = 0;i<mms.arrayGenre.length;i++)						//loop thru all the elements in the Albums array 
				{
					mms.searchCoverArt = mms.arrayGenre[i].s4601;
					mms.searchGenre = mms.arrayGenre[i].s4602;
					mms.searchType = mms.arrayGenre[i].s4603;
					mms.searchTokenGuiD = mms.arrayGenre[i].d4601.tokens["[guid]"];
					mms.searchToken2GuiD = mms.arrayGenre[i].d4602.tokens["[guid]"];
					
					if(mms.search(searchGenre, strSearch))							// refer to search() from "Other functions" section
					{
						templistArray.push({										// Add matched info to temp array
							s4601: mms.searchCoverArt,
							s4602: mms.searchGenre,
							s4603: mms.searchType,
							d4601: { tokens: {"[guid]": mms.searchTokenGuiD} },
							d4602: { tokens: {"[guid]": mms.searchToken2GuiD} }
						});
					} // end if
				}// end for
			//	CF.listAdd(mms.lstGenre, templistArray);							// Add temp array to list
	},
	

		// Use the alphabar to go to the specified point in the current list  mms5.17
	alphasrchGenres: function(sliderval) {
	
				// Calculate the letter based on the slider value (0-27). To allow for better accuracy of the letter, both 0 and 1 slider values will equal "#" in the slider.
				var letter = "#";
				if (sliderval > 1) {
					// Use ascii char code and convert to the letter (letter A = 65, B = 66, and so on). Use parseInt here otherwise the + symbol might concatenate the numbers together, 
					// rather than add them. This is because parameters may be passed as strings from tokens such as [sliderval]
					letter = String.fromCharCode(63 + parseInt(sliderval));
				}
				CF.setJoin(mms.txtAlphabet, letter);		// Test the conversion
				
				for (var i = 0;i<mms.arrayGenre.length;i++)						//loop thru all the elements in the Genres array 
				{		
					mms.searchGenre = mms.arrayGenre[i].s4602;
                    if (letter == "#")												// Non-filtered, display everything
					{			
                        //nada- maybe bounce?
  					} 
					else if (letter == mms.searchGenre.charAt(0))						// compare the first alphabet of feedback string with the letter selected from slider
					{
                    CF.listScroll("l4513", i/4, CF.MiddlePosition, true);             //put the search result in middle of displayed list
                    CF.setJoin(mms.srchAlbum, mms.arrayGenre[i].s4602);
                    break;
					}
				}// end for
	},	
	// -----------------------------------------------------------------------------------------------------------------------------
	// Composers -> Albums -> Title
	// -----------------------------------------------------------------------------------------------------------------------------
	
	browseComposers: function() { 
        mms.AlbumSelectFlag = 0;                                                            //Clear the album count flag
		mms.arrayComposer = [];																// clear array of any previous data
	//	CF.listRemove(mms.lstComposer);														// clear list of any previous entries
		mms.clearSubPages();                                                                // hide all subpages
        CF.setJoin(mms.subComposer, 1);                                                        // show the correct subpage	
		mms.clearMusicFilter();															    // clear all previous music filters
		mms.clearRadioFilter();															    // clear all previous radio filters
		mms.sendCmd("BrowseComposers"); 														// send the command
		//setTimeout(function(){CF.listAdd(mms.lstComposer, mms.arrayComposer);}, 4000);			// set a short delay to give time for array to be populated before adding array into list.
	},
	
	selectComposer_Album: function(list, listIndex, join) {							
		CF.getJoin(list+":"+listIndex+":"+join, function(j,v,t) {
			mms.arrayAlbum = [];									                        // clear array of any previous data
		//	CF.listRemove(mms.lstAlbum);							                        //clear list of any previous entries
			mms.clearSubPages();                                                            // hide all subpages
            CF.setJoin(mms.subComposerAlbum, 1);                                               // show the correct subpage	
        if (join =="d4601"){
            CF.setJoin("s4706", mms.arrayComposer[listIndex*4].s4602);
        }else if (join =="d4602"){
            CF.setJoin("s4706", mms.arrayComposer[listIndex*4+1].s4602);
        }else if (join =="d4603"){
            CF.setJoin("s4706", mms.arrayComposer[listIndex*4+2].s4602);
        }else if (join =="d4604"){
            CF.setJoin("s4706", mms.arrayComposer[listIndex*4+3].s4602);
        }
   	    mms.AlbumSelectFlag = 1;                                                            //Set the album count flag                                        
			mms.setMusicFilter_Composer(t["[guid]"]);				                            //set the filter
			mms.sendCmd("BrowseAlbums");						                            // Get all the titles in the selected album
		});
	},
	
	selectComposer_Album_Title: function(list, listIndex, join) {							
     mms.popTitleList(list, listIndex, join);                                                               //call the list popup									
        CF.getJoin(list+":"+listIndex+":"+join, function(j,v,t) {		
            mms.setMusicFilter_Album(t["[guid]"]);					//set the filter
            mms.sendCmd("BrowseTitles");
        });//end getJoin 
	},
	
	//Delete all previous tracks and play the all albums under Artist. If want to just queue the albums to current queue, use playArtistTrue instead.
	playComposer: function(list, listIndex, join) {							
		CF.getJoin(list+":"+listIndex+":"+join, function(j,v,t) {
			mms.playComposerFalse(t["[guid]"]);						
		});
	},
	
	// Search the list of Composers and display the searched results only.
	searchComposers: function(strSearch) {
	
				var templistArray = [];				//initialize temporary array
		//		CF.listRemove(mms.lstComposer);		//clear list of any previous entries
	
				for (var i = 0;i<mms.arrayComposer.length;i++)						//loop thru all the elements in the Albums array 
				{
					mms.searchCoverArt = mms.arrayComposer[i].s4601;
					mms.searchComposer = mms.arrayComposer[i].s4602;
					mms.searchType = mms.arrayComposer[i].s4603;
					mms.searchTokenGuiD = mms.arrayComposer[i].d4601.tokens["[guid]"];
					mms.searchToken2GuiD = mms.arrayComposer[i].d4602.tokens["[guid]"];
					
					if(mms.search(searchComposer, strSearch))							// refer to search() from "Other functions" section
					{
						templistArray.push({										// Add matched info to temp array
							s4601: mms.searchCoverArt,
							s4602: mms.searchComposer,
							s4603: mms.searchType,
							d4601: { tokens: {"[guid]": mms.searchTokenGuiD} },
							d4602: { tokens: {"[guid]": mms.searchToken2GuiD} }
						});
					} // end if
				}// end for
			//	CF.listAdd(mms.lstComposer, templistArray);							// Add temp array to list
	},
	

	// Use the alphabar to go to the specified point in the current list  mms5.17
	alphasrchComposers: function(sliderval) {
	
				// Calculate the letter based on the slider value (0-27). To allow for better accuracy of the letter, both 0 and 1 slider values will equal "#" in the slider.
				var letter = "#";
				if (sliderval > 1) {
					// Use ascii char code and convert to the letter (letter A = 65, B = 66, and so on). Use parseInt here otherwise the + symbol might concatenate the numbers together, 
					// rather than add them. This is because parameters may be passed as strings from tokens such as [sliderval]
					letter = String.fromCharCode(63 + parseInt(sliderval));
				}
				CF.setJoin(mms.txtAlphabet, letter);		// Test the conversion
				
				for (var i = 0;i<mms.arrayComposer.length;i++)						//loop thru all the elements in the Composers array 
				{		
					mms.searchComposer = mms.arrayComposer[i].s4602;
                    if (letter == "#")												// Non-filtered, display everything
					{			
                        //nada- maybe bounce?
  					} 
					else if (letter == mms.searchComposer.charAt(0))						// compare the first alphabet of feedback string with the letter selected from slider
					{
                    CF.listScroll("l4514", i/4, CF.MiddlePosition, true);             //put the search result in middle of displayed list
                    CF.setJoin(mms.srchAlbum, mms.arrayComposer[i].s4602);
                    break;
					}
				}// end for
	},	





	
	// -----------------------------------------------------------------------------------------------------------------------------
	// Playlists -> Titles
	// -----------------------------------------------------------------------------------------------------------------------------
	
	browsePlaylists: function() { 
		mms.arrayPlaylist = [];															// clear array of any previous data
		CF.listRemove(mms.lstPlaylist);													// clear list of any previous entries
		mms.clearSubPages();                                                            // hide all subpages
        CF.setJoin(mms.subPlaylist, 1);                                                 // show the correct subpage	
		mms.clearMusicFilter();															// clear all previous music filters
		mms.clearRadioFilter();															// clear all previous radio filters
		mms.sendCmd("BrowsePlaylists"); 														// send the command
	},
	
	selectPlaylist_Title: function(list, listIndex, join) {							
		CF.getJoin(list+":"+listIndex+":"+join, function(j,v,t) {
			mms.arrayQueue = [];									                    // clear array of any previous data
			CF.listRemove(mms.lstQueue);							                    //clear list of any previous entries
			mms.clearSubPages();                                                        // hide all subpages
            CF.setJoin(mms.subPlaylistTitle, 1);                                        // show the correct subpage	
			mms.setMusicFilter_Playlist(t["[guid]"]);				                    //set the filter
			mms.sendCmd("BrowseTitles");									            // Get all the titles in the selected album
		});
	},
	
	//Delete all previous tracks and play the all albums under Artist. If want to just queue the albums to current queue, use playArtistTrue instead.
	playPlaylist: function(list, listIndex, join) {							
		CF.getJoin(list+":"+listIndex+":"+join, function(j,v,t) {
			mms.playPlaylistFalse(t["[guid]"]);						
		});
	},
	
	deletePlaylistItem: function(list, listIndex, join) {											// Delete Playlist Item. 
		CF.getJoin(list+":"+listIndex+":"+join, function(j,v,t) {
			mms.deletePlaylist(t["[title]"]);						
		});
	},
	
	// Special Note : It'll take a while for the playlist changes to be updated, you won't be able to see the changes immediately.
	savePlaylist: function(title) {																	
		mms.sendCmd("SavePlaylist " + title); 														// Save Playlist. *Command : SavePlaylist "Playlist1" 
		CF.setJoin(mms.txtPlaylist, "");										// Reset the Playlist textbox to show back default text 
	},
	
	deletePlaylist: function(title) { mms.sendCmd("DeletePlaylist \"" + title + "\""); 
    },					// Delete Playlist. *Command : SavePlaylist "Playlist1"
	
	// Search the list of playlists and display the searched results only.
	searchPlaylists: function(strSearch) {
	
				var templistArray = [];				//initialize temporary array
				CF.listRemove(mms.lstPlaylist);		//clear list of any previous entries
	
				for (var i = 0;i<mms.arrayPlaylist.length;i++)						//loop thru all the elements in the Albums array 
				{
					mms.searchCoverArt = mms.arrayPlaylist[i].s4601;
					mms.searchPlaylist = mms.arrayPlaylist[i].s4602;
					mms.searchType = mms.arrayPlaylist[i].s4603;
					mms.searchTokenGuiD = mms.arrayPlaylist[i].d4601.tokens["[guid]"];
					mms.searchToken2GuiD = mms.arrayPlaylist[i].d4602.tokens["[guid]"];
					mms.searchToken3GuiD = mms.arrayPlaylist[i].d4603.tokens["[guid]"];
					
					if(mms.search(searchPlaylist, strSearch))							// refer to search() from "Other functions" section
					{
						templistArray.push({										// Add matched info to temp array
							s4601: searchCoverArt,
							s4602: searchPlaylist,
							s4603: searchType,
							d4601: { tokens: {"[guid]": searchTokenGuiD} },
							d4602: { tokens: {"[guid]": searchToken2GuiD} },
							d4603: { tokens: {"[guid]": searchToken3GuiD} }
						});
					} // end if
				}// end for
				CF.listAdd(mms.lstPlaylist, templistArray);							// Add temp array to list
	},
	
	// -----------------------------------------------------------------------------------------------------------------------------
	// Radio Sources -> Radio Stations -> All multiple selections depending on the source
	// -----------------------------------------------------------------------------------------------------------------------------
	
	browseRadioSources: function() { 
		mms.arrayRadioSource = [];													// clear array of any previous data
		CF.listRemove(mms.lstRadioSource);											// clear list of any previous entries
		mms.clearSubPages();                                                        // hide all subpages
//        mms.radioStationsFlag = 1;
		CF.setJoin (mms.txtPicklistHeading, "select source above");		
        CF.setJoin (mms.txtPicklistCount, "");
        CF.setJoin(mms.subRadioSource, 1);                                          // show the correct subpage	
    //    CF.setJoin(mms.flagRadioNowPlaying, 1);
		mms.clearMusicFilter();														// clear all previous music filters
		mms.clearRadioFilter();														// clear all previous radio filters
		mms.sendCmd("BrowseRadioSources 1"); 											// send the command

	},


	
	selectRadioSource: function(list, listIndex, join) {

		CF.getJoin(list+":"+listIndex+":"+join, function(j,v,t) {

            CF.listUpdate(mms.lstRadioSource,[{index:CF.AllItems,d4601:0}]);	   //set fb on proper button		
            CF.listUpdate(mms.lstRadioSource,[{index:listIndex,d4601:1}]);		
            CF.setJoin(mms.txtRadioSource, mms.arrayRadioSource[listIndex].s4602);
            mms.log ("RS: "+ mms.txtRadioSource);
			if (t["[guid]"] == "fbbcedb1-af64-4c3f-bfe5-000000000010"){                  //pandora has no genres
                    mms.clearRadioFilter();									 // clear all previous radio filters							
	//				mms.arrayRadioStation = [];							     // clear array of any previous data
	//				CF.listRemove(mms.lstRadioStation);					     //clear list of any previous entries
					mms.arrayPickListItem = [];							     // clear array of any previous data
					CF.listRemove(mms.lstPickListItem);					     //clear list of any previous entries
                    mms.clearSubPages();                                     // hide all subpages
               //       CF.setJoin(mms.subRadioEdit, 1);                     //  show the correct subpage
                    CF.setJoin(mms.subPickListItem, 1);                     //  show the correct subpage               
					mms.setRadioFilter_RadioSource(t["[guid]"]);				//set the filter
					mms.sendCmd("BrowseRadioStations 1");
			} else if (t["[guid]"] == "fbbcedb1-af64-4c3f-bfe5-000000000008"){       //sirius has genre page
                    

                    mms.clearRadioFilter();														// clear all previous radio filters							
				//	mms.arrayRadioGenre = [];								// clear array of any previous data
				//	CF.listRemove(mms.lstRadioGenre);						//clear list of any previous entries
//18.32
          			mms.arrayPickListItem = [];							     // clear array of any previous dat
					CF.listRemove(mms.lstPickListItem);					     //clear list of any previous entries
                    mms.clearSubPages();                                     // hide all subpages
                    CF.setJoin(mms.subRadioToplist, 1);                        // show the correct subpage	
					mms.setRadioFilter_RadioSource(t["[guid]"]);			//set the filter
					mms.sendCmd("BrowseRadioGenres 1");
			
			}else {                                                          //all others use radio picklist
                    mms.clearRadioFilter();									 // clear all previous radio filters							
				//	mms.arrayRadioStation = [];							     // clear array of any previous data
				//	CF.listRemove(mms.lstRadioStation2);					     //clear list of any previous entries
					mms.arrayPickListItem = [];							     // clear array of any previous data
					CF.listRemove(mms.lstPickListItem);					     //clear list of any previous entries
                    mms.clearSubPages();                                     // hide all subpages
                    CF.setJoin(mms.subRadioToplist, 1);                      // show the correct subpage
 //18.3                   CF.setJoin(mms.subPickListItem, 1);                     //  show the correct subpage                                   
					mms.setRadioFilter_RadioSource(t["[guid]"]);				//set the filter
					mms.sendCmd("BrowseRadioStations 1");
			}
            });
 //           mms.radioStationsFlag = 1;
	},
	
	selectRadioGenre: function(list, listIndex, join) {							
		CF.getJoin(list+":"+listIndex+":"+join, function(j,v,t) {
			mms.arrayRadioStation = [];								// clear array of any previous data
			CF.listRemove(mms.lstRadioStation);						//clear list of any previous entries
            mms.clearSubPages();                                     // hide all subpages
    //        mms.radioStationsFlag = 1;            
            CF.setJoin(mms.subRadioStation, 1);                      // show the correct subpage	
			mms.setRadioFilter_RadioGenre(t["[guid]"]);				//set the filter
		//	mms.BrowseRadioStations();
			mms.sendCmd("BrowseRadioStations 1");
		});
	},
	
	playSelectedStation: function(list, listIndex, join) {							
		CF.getJoin(list+":"+listIndex+":"+join, function(j,v,t) {
			mms.playRadioStation(t["[guid]"]);				//play item using PlayRadioStation
		});
	},
	
	selectPickListItem: function(list, listIndex, join) {							//assumes we clear all, display another picklist
		CF.getJoin(list+":"+listIndex+":"+join, function(j,v,t) {
			mms.arrayPickListItem = [];							// clear array of any previous data
			CF.listRemove(mms.lstPickListItem);					//clear list of any previous entries
            mms.clearSubPages();                                     // hide all subpages
            CF.setJoin(mms.subPickListItem, 1);                      // show the correct subpage	
			mms.ackpickListItem(t["[guid]"]);				       //Play item using AckPickList OR
		});
	},
//NOT USED
	selectRadioPickListItem: function(list, listIndex, join) {							
		CF.getJoin(list+":"+listIndex+":"+join, function(j,v,t) {
			mms.arrayPickListItem = [];							// clear array of any previous data
			CF.listRemove(mms.lstPickListItem);					//clear list of any previous entries
            mms.clearSubPages();                                     // hide all subpages
            CF.setJoin(mms.subRadioPicklist, 1);                      // show the correct subpage	
			mms.ackpickListItem(t["[guid]"]);				//Play item using AckPickList OR
		});
	},	

	
	// Search the list of radio sources and display the searched results only.
	searchRadioSources: function(strSearch) {
	
				var templistArray = [];													//initialize temporary array
				CF.listRemove(mms.lstRadioSource);										//clear list of any previous entries
	
				for (var i = 0;i<mms.arrayRadioSource.length;i++)						//loop thru all the elements in the Albums array 
				{
					mms.searchCoverArt = mms.arrayRadioSource[i].s4601;
					mms.searchRadioSource = mms.arrayRadioSource[i].s4602;
					mms.searchType = mms.arrayRadioSource[i].s4603;
					mms.searchTokenGuiD = mms.arrayRadioSource[i].d4601.tokens["[guid]"];
					
					if(mms.search(searchRadioSource, strSearch))							// refer to search() from "Other functions" section
					{
						templistArray.push({										// Add matched info to temp array
							s4601: searchCoverArt,
							s4602: searchRadioSource,
							s4603: searchType,
							d4601: { tokens: {"[guid]": searchTokenGuiD} }
						});
					} // end if
				}// end for
				CF.listAdd(mms.lstRadioSource, templistArray);							// Add temp array to list
	},
	
	// -----------------------------------------------------------------------------------------------------------------------------
	// Queue - Shows all Now Playing Titles
	// -----------------------------------------------------------------------------------------------------------------------------
	
	browseQueue: function() { 
		mms.arrayQueue = [];															// clear array of any previous data
		CF.listRemove(mms.lstQueue);													// clear list of any previous entries
        mms.clearSubPages();                                                            // hide all subpages
        CF.setJoin(mms.subQueue, 1);                                                    // show the correct subpage	
		mms.clearMusicFilter();															// clear all previous music filters
		mms.clearRadioFilter();															// clear all previous radio filters
		mms.sendCmd("BrowseNowPlaying"); 												// send the command
	},
	
	playCurrentTitle: function(list, listIndex, join) {							
		CF.getJoin(list+":"+listIndex+":"+join, function(j,v,t) {
			mms.playTitleFalse(t["[guid]"]);				// Play the current title
		});
	},
	
	queueCurrentTitle: function(list, listIndex, join) {							
		CF.getJoin(list+":"+listIndex+":"+join, function(j,v,t) {
			mms.playTitleTrue(t["[guid]"]);				// Play the current title
		});
	},

	playCurrentItem: function(list, listIndex, join) {							
		CF.getJoin(list+":"+listIndex+":"+join, function(j,v,t) {
			mms.playNowPlayingItem(t["[guid]"]);				// Play the current item
		});
	},
	
	removeCurrentItem: function(list, listIndex, join) {							
		CF.getJoin(list+":"+listIndex+":"+join, function(j,v,t) {
	
			mms.removeNowPlayingItem(t["[guid]"]);				// Remove the current item
						mms.arrayQueue = [];															// clear array of any previous data
		CF.listRemove(mms.lstQueue);
			//mms.browseQueue();									// Refresh the list
		});
	},
	// -----------------------------------------------------------------------------------------------------------------------------
	// Favorite - Shows all Saved Favorite Stations/Music
	// -----------------------------------------------------------------------------------------------------------------------------
	
	browseFavorite: function() { 
		mms.arrayFavorite = [];															// clear array of any previous data
//		CF.listRemove(mms.lstFavorite);													// clear list of any previous entries
        mms.clearSubPages();                                                            // hide all subpages
        CF.setJoin(mms.subFavorite, 1);                                                    // show the correct subpage	
		mms.clearMusicFilter();															// clear all previous music filters
		mms.clearRadioFilter();															// clear all previous radio filters
		mms.sendCmd("BrowseFavorites 1"); 												// send the command
	},
	
	playFavorite: function(list, listIndex, join) {							
		CF.getJoin(list+":"+listIndex+":"+join, function(j,v,t) {
			mms.playFavoriteItem(t["[guid]"]);				// Play the current title
		});
	},

	addFavorite: function(list, listIndex, join) {							
		CF.getJoin(list+":"+listIndex+":"+join, function(j,v,t) {
			mms.addFavoriteItem(t["[guid]"]);				// Add to favorites
		});
	},	
	removeFavorite: function(list, listIndex, join) {							
		CF.getJoin(list+":"+listIndex+":"+join, function(j,v,t) {
			mms.removeFavoriteItem(t["[guid]"]);				// Remove the current item
			mms.browseFavorite();									// Refresh the list
		});
	},

	// -----------------------------------------------------------------------------------------------------------------------------
	// Radio Station Editing
	// -----------------------------------------------------------------------------------------------------------------------------
//NOT USED
 	editRadioStation: function(list, listIndex, join) {					// Message Box. Edit the station option.		
		CF.getJoin(list+":"+listIndex+":"+join, function(j,v,t) {
		mms.editRadioStationPopup(t["[guid]"]);
		});
		//???need popup here
	},		


	
	// Search the list of radio sources and display the searched results only.
	searchQueue: function(strSearch) {
	
				var templistArray = [];				//initialize temporary array
				CF.listRemove(mms.lstQueue);		//clear list of any previous entries
	
				for (var i = 0;i<mms.arrayQueue.length;i++)						//loop thru all the elements in the Albums array 
				{
					mms.searchCoverArt = mms.arrayQueue[i].s4601;
					mms.searchQueue = mms.arrayQueue[i].s4602;
					mms.searchType = mms.arrayQueue[i].s4603;
					mms.searchTokenGuiD = mms.arrayQueue[i].d4601.tokens["[guid]"];
					mms.searchToken2GuiD = mms.arrayQueue[i].d4602.tokens["[guid]"];
					
					if(mms.search(searchQueue, strSearch))							// refer to search() from "Other functions" section
					{
						templistArray.push({										// Add matched info to temp array
							s4601: searchCoverArt,
							s4602: searchQueue,
							s4603: searchType,
							d4601: { tokens: {"[guid]": searchTokenGuiD} },
							d4602: { tokens: {"[guid]": searchToken2GuiD} }
						});
					} // end if
				}// end for
				CF.listAdd(mms.lstQueue, templistArray);							// Add temp array to list
	},
	
	// -----------------------------------------------------------------------------------------------------------------------------
	// Title List Popup, fancy
	// -----------------------------------------------------------------------------------------------------------------------------
	popTitleList: function (list, listIndex, join){                    //bring up titlelist for the selected album, pop and rotate
	    mms.log("Index" + listIndex);
        CF.listInfo(list, function(list, count, first, numVisible, scrollPosition) {
        mms.log("List " + list + " has " + count + " items, showing " + numVisible + " items starting from " + first + " (scroll position: " + scrollPosition + "px)");
        var fF = first;
   	    CF.getJoin(list+":"+listIndex+":"+join, function(j,v,t) {
			mms.arrayQueue = [];															// clear array of any previous data
			CF.listRemove(mms.lstQueue);
            var ii = 0;						                           	// clear list of any previous entries
			if (join =="d4601"){                                                             // get the proper image
                ii =0;
            }else if (join =="d4602"){
               ii = 1;
            }else if (join =="d4603"){
              ii =2;
            }else if (join =="d4604"){
               ii = 3;
            }

         var calcIndex = listIndex*4+ii;
 
         mms.searchTokenGuiD = mms.arrayAlbum[calcIndex].d4601.tokens["[guid]"];
         CF.setToken("d4701","[guid]",mms.searchTokenGuiD);         //token for commands
         CF.setJoin(mms.imageTitlePopup, mms.arrayAlbum[listIndex*4+ii].s4601);
         CF.setJoin("s4701", mms.arrayAlbum[listIndex*4+ii].s4601);                          //grab the images in array for speed
         CF.setJoin("s4705", mms.arrayAlbum[listIndex*4+ii].s4602);                         //artist and album


                CF.getProperties(list+":"+listIndex+":"+join, function(j,v,t) {//18bs version
                CF.setJoin(mms.subTitlePopup, 1);//should be opaque already
 //               var ml = listIndex%3;
                var ml = listIndex - fF;
                mms.log("Calc ml: index = " + listIndex + "First = " + fF); 
                mms.vpos = ml*180 + 151-4;
                mms.hpos =  j.x+225-4 ; 
                mms.log("SubTitle Popup:Index " + listIndex +"Join " + join + " Vertical Pos" + mms.vpos + "ml" + ml); 
                mms.log("Joinj=" + j + "v=" + v);               
                CF.setProperties({join:mms.imageTitlePopup,x:0.0,y:0.0, w:160,h:160, opacity:1.0, yrotation:180}, 0.0, 0.0, CF.AnimationCurveEaseIn,                             
                 function(){CF.setProperties({join:mms.subTitlePopup, w:145,h:145, x:mms.hpos, y:mms.vpos, yrotation: 180, opacity:0.0}, 0.0, 0.0, CF.AnimationCurveEaseIn,
                   function(){CF.setProperties({join:mms.subTitlePopup, w:160,h:160, opacity:1.0}, 0.0, 0.3, CF.AnimationCurveEaseIn,
                      function(){CF.setProperties({join: mms.subTitlePopup,yrotation: 270  },0.2, 0.15, CF.AnimationCurveLinear,
                        function(){CF.setProperties({join:mms.imageTitlePopup, opacity: 0.0}, 0.0, 0.0,CF.AnimationCurveLinear,        
                           function() {CF.setProperties({ join: mms.subTitlePopup,w:500,h:500,x:351,y:157,yrotation:358 },0.0,0.45 , CF.AnimationCurveEaseIn,
                             function() {CF.setProperties({ join: mms.subTitlePopup,yrotation:0 },0.0,0.0 , CF.AnimationCurveEaseIn);
                             });
                           });           
                        });
                      });
                   });
                 }); 
  
        }); //end get properties
        });
          });
	},
		// -----------------------------------------------------------------------------------------------------------------------------
	// Actions
	// -----------------------------------------------------------------------------------------------------------------------------
	nowplayingart: function() {                                                     // for showing big art whenever desired (button press)
        mms.clearSubPages();
        if (mms.radioStationsFlag === 0){
            CF.setJoin(mms.subNowPlayingMusic, 1);
            
            }
        else {                                                          // hide all subpages
            CF.setJoin(mms.subNowPlaying, 1);                                               // show the correct subpage	
        }	//	mms.clearMusicFilter();															// clear all previous music filters
	//	mms.clearRadioFilter();															// clear all previous radio filters
	},
	
	selectMessageCommand: function (list, listIndex, join){                        //find proper message commend to send in message box
    
    	 CF.getJoin(list+":"+listIndex+":"+join, function(j,v,t) {
    	 var cmdMessage ="";
    		 cmdMessage = "\"" + (mms.arrayBox[listIndex].s4602) + "\"";
            mms.sendCmd("AckButton " + t["[guid]"] + " " + cmdMessage); 				// message cmd
              mms.log("msgboxcommand: " + cmdMessage);   
                 
      });
	},


	selectActionItem: function (list, listIndex, join){                            //command in action item list execute
      CF.getJoin(list+":"+listIndex+":"+join, function(j,v,t) {
 		mms.actionCommand(t["[guid]"]);                                            //send Command
                 
      });
	},	
	

	
	clarifyAction: function(list, listIndex, join) {                               //used for title choices in song lists popup 18.2
	                                                                               //this is a popup
        var actionMessage = "";	

        actionMessage = mms.arrayQueue[listIndex].s4606;
        if (actionMessage !== "")                            //is there a command?
         {
            mms.log("Clarify: List: " + list + "Index: " + listIndex +"Join: " + join + " action: " + actionMessage );				
            mms.arrayPickListItem = [];							                        // clear array of any previous data
            CF.listRemove(mms.lstPickListItem);					                        //clear list of any previous entries

            CF.setProperties({join:mms.subAction, w:48,h:44, x:368,y:165}, 0.0, 0.0, CF.AnimationCurveEaseIn,
          
            function(){CF.setProperties({join:mms.subAction, w:48,h:44, x:368, y:165}, 0.0, 0.3, CF.AnimationCurveEaseIn,
            function(){CF.setProperties({join:mms.subAction, w:480,h:440}, 0.0, 0.8, CF.AnimationCurveEaseIn);});}
        
            );
      	     CF.setJoin( mms.txtPicklistHeading ,mms.arrayQueue[listIndex].s4602);  //page heading	
 		     CF.getJoin(list+":"+listIndex+":"+join, function(j,v,t) {
        	   mms.sendCmd(actionMessage + " " + (t["[guid]"]));              //send clarify
		     });
            CF.setJoin(mms.subAction, 1);  
		 }
		else{
		 mms.playCurrentItem(list, listIndex, join);
		}
	
	},
		clarifyActionCommand: function (list, listIndex, join){                         //send clarify selection
    
    	 CF.getJoin(list+":"+listIndex+":"+join, function(j,v,t) {
		//	mms.arrayQueue = [];															// clear array of any previous data
		//	CF.listRemove(mms.lstQueue);
        	mms.arrayPickListItem = [];							// clear array of any previous data 18.3
			CF.listRemove(mms.lstPickListItem);					//clear list of any previous entries 18.3
  //            mms.clearSubPages();                                                        // hide all subpages 18.3
  //          CF.setJoin(mms.subPickListItem, 1);                      // show the correct subpage 18.3

		
		
		
		
            mms.sendCmd("AckPickItem " + t["[guid]"]); 				// message cmd
              //mms.log("msgboxcommand: " + "AckButton " + t["[guid]"] + " " + cmdMessage1);  
                 
      });
	},
	
	Tunebridge: function(list, listIndex, join) {							//this brings up tunebridge popup?
		CF.getJoin(list+":"+listIndex+":"+join, function(j,v,t) {					
        mms.arrayPickListItem = [];							                        // clear array of any previous data
        CF.listRemove(mms.lstPickListItem);					                        //clear list of any previous entries
//		mms.clearSubPages();                                                        // hide all subpages
        CF.setProperties({join:mms.subAction, w:48,h:44, x:368,y:165}, 0.0, 0.0, CF.AnimationCurveEaseIn,
          
          function(){CF.setProperties({join:mms.subAction, w:48,h:44, x:368, y:165}, 0.0, 0.3, CF.AnimationCurveEaseIn,
          function(){CF.setProperties({join:mms.subAction, w:480,h:440}, 0.0, 0.8, CF.AnimationCurveEaseIn);});}
        
        );
        CF.setJoin(mms.subAction, 1);       
    		
		mms.sendCmd("ackButton CONTEXT");
      });
	
	},	
	
	
	
	
		// -----------------------------------------------------------------------------------------------------------------------------
	// Back Commands
	// -----------------------------------------------------------------------------------------------------------------------------
	
	
	
	
		
	backTitlePopup: function() {
       
                CF.setProperties({join:mms.subTitlePopup, yrotation: 270  },0.2, 0.15, CF.AnimationCurveEaseIn,
                      function(){CF.setProperties({join: mms.imageTitlePopup, opacity: 1.0, w:435,h:435}, 0.0, 0.0, CF.AnimationCurveLinear,
                        function(){CF.setProperties({join:mms.subTitlePopup,yrotation:180, w:160,h:160, x:mms.hpos, y:mms.vpos}, 0.0, 0.45,CF.AnimationCurveLinear,        
                           //function() {CF.setProperties({ join: mms.subTitlePopup,yrotation:0.0 },0.0,0.05 , CF.AnimationCurveEaseIn,
                             function() {CF.setProperties({ join: mms.subTitlePopup,w:145, h:145 },0.0,0.1 , CF.AnimationCurveEaseIn,
                               function() {CF.setProperties({join:mms.subTitlePopup, opacity: 0.0}, 0.0, 0.0, CF.AnimationCurveLinear,
                                function(){CF.setJoin(mms.subTitlePopup, 0);                             
                             });
                           });           
                        });
                      });                
                    });                                               //drop title popup	
	},
	
	backAction: function() {
        CF.setProperties({join:mms.subAction, w:48,h:44, x:368,y:165}, 0.0, 0.3, CF.AnimationCurveEaseIn,function(){ CF.setJoin(mms.subAction, 0);});    
          CF.setProperties({join:mms.subAction, w:48,h:44, x:368,y:165}, 0.0, 0.3, CF.AnimationCurveEaseIn,function(){ CF.setJoin(mms.subMessageBox, 0);});
           CF.setProperties({join:mms.subAction, w:48,h:44, x:368,y:165}, 0.0, 0.3, CF.AnimationCurveEaseIn,function(){ CF.setJoin(mms.subMessageBoxBig, 0);});
                                                     //drop 	
	},	

	   	
	backAlbumList: function() {
        mms.clearSubPages();                                                            // hide all subpages
        CF.setJoin(mms.subAlbum, 1);                                                    // show the correct subpage	
		mms.clearMusicFilter();															// clear all previous music filters
		mms.clearRadioFilter();															// clear all previous radio filters
	},
	
	backArtistList: function() {
        mms.clearSubPages();                                                            // hide all subpages
        CF.setJoin(mms.subArtist, 1);                                                    // show the correct subpage	
		mms.clearMusicFilter();															// clear all previous music filters
		mms.clearRadioFilter();															// clear all previous radio filters
	},
	
	backArtistAlbumList: function() {
        mms.clearSubPages();                                                            // hide all subpages
        CF.setJoin(mms.subArtistAlbum, 1);                                                    // show the correct subpage	
	},
	
	backGenreList: function() {
        mms.clearSubPages();                                                            // hide all subpages
        CF.setJoin(mms.subGenre, 1);                                                    // show the correct subpage	
		mms.clearMusicFilter();															// clear all previous music filters
		mms.clearRadioFilter();															// clear all previous radio filters
	},
	backComposerList: function() {
        mms.clearSubPages();                                                            // hide all subpages
        CF.setJoin(mms.subComposer, 1);                                                    // show the correct subpage	
		mms.clearMusicFilter();															// clear all previous music filters
		mms.clearRadioFilter();															// clear all previous radio filters
	},	
	backGenreAlbumList: function() {
        mms.clearSubPages();                                                            // hide all subpages
        CF.setJoin(mms.subGenreAlbum, 1);                                                    // show the correct subpage	
	},
	
	backPlaylistList: function() {
        mms.clearSubPages();                                                            // hide all subpages
        CF.setJoin(mms.subPlaylist, 1);                                                    // show the correct subpage	
		mms.clearMusicFilter();															// clear all previous music filters
		mms.clearRadioFilter();															// clear all previous radio filters
	},
	
	backRadioSourceList: function() {
        mms.clearSubPages();  
 		CF.setJoin (mms.txtPicklistHeading, "");		
        CF.setJoin (mms.txtPicklistCount, "");                                                                 // hide all subpages
        CF.setJoin(mms.subRadioSource, 1);                                              // show the correct subpage	
		mms.clearMusicFilter();															// clear all previous music filters
		mms.clearRadioFilter();															// clear all previous radio filters
	},
	
	backRadioGenreStations: function() {                                               //for going back to radio genre
		//CF.listRemove(mms.lstPickListItem);
 		//CF.setJoin (mms.txtPicklistHeading, "");		
        //CF.setJoin (mms.txtPicklistCount, "");
         mms.clearSubPages();                                                                 // hide all subpages
        CF.setJoin(mms.subRadioGenre, 1);  
		mms.Back();																		// Go back browsing history
		
		
	},
	
	forwardRadioSourceStations: function() {
		CF.listRemove(mms.lstPickListItem);
		mms.Forward();																	// Move forward browsing history
	},
	
	clearSubPages: function()  {                                                        //universal subpage clearout - chap
			CF.setJoins([                                                               //makes it esier to add new subpages
 				{join: mms.subTitlePopup, value: 0},       
				{join: mms.subAlbum, value: 0},
				{join: mms.subAlbumTitle, value: 0},				
				{join: mms.subArtist, value: 0},			
				{join: mms.subArtistAlbum, value: 0},			
				{join: mms.subArtistAlbumTitle, value: 0},
				{join: mms.subComposer, value: 0},
				{join: mms.subComposerAlbum, value: 0},
				{join: mms.subComposerAlbumTitle, value: 0},				
				{join: mms.subGenre, value: 0},			
				{join: mms.subGenreAlbum, value: 0},
				{join: mms.subGenreAlbumTitle, value: 0},	
				{join: mms.subPlaylist, value: 0},		
				{join: mms.subPlaylistTitle, value: 0},		
				{join: mms.subRadioSource, value: 0},
				{join: mms.subRadioStation, value: 0},
				{join: mms.subRadioPicklist, value: 0},
   				{join: mms.subRadioGenre, value: 0},                				
				{join: mms.subPickListItem, value: 0},
				{join: mms.subQueue, value: 0},
				{join: mms.subFavorite, value: 0},
				{join: mms.subSearchRadioStations, value: 0},				
				{join: mms.subAction, value: 0},
				{join: mms.subNowPlaying, value: 0},				
				{join: mms.subRadioEdit, value: 0},
			//	{join: mms.subThumbsTimer, value: 0}
                {join: mms.subMessageBoxBig, value: 0},
                {join: mms.subNowPlayingMusic, value:  0},
				{join: mms.subMessageBox, value: 0},
				{join: mms.subRadioToplist, value: 0}				
                //False				

			]);
			mms.AlbumSelectFlag = 0;
         //   mms.backTitlePopup();
            CF.setJoin (mms.txtArtistCount, "");
       		CF.setJoin (mms.txtAlbumCount, ""); 		
            CF.setJoin (mms.txtGenreCount, "");
            CF.setJoin (mms.txtComposerCount, "");
            CF.setJoin (mms.txtQueueCount, "");
       		CF.setJoin (mms.txtFavoriteCount, ""); 		
            CF.setJoin (mms.txtPicklistHeading, "");
            CF.setJoin (mms.txtPicklistCount, "");            
	            
            
            
            				
	//		mms.radioStationsFlag = 0;
	},
	listToBig: function(){
	
	CF.listInfo("l4550", function(list, count, first, numVisible, scrollPosition) {
	if (count > numVisible)
	{
	CF.setJoin (mms.btnMoreScroll, 1);
	}
	else {
	CF.setJoin (mms.btnMoreScroll, 0);	
	}
	
    CF.log("List " + list + " has " + count + " items, showing " + numVisible + " items starting from " + first + " (scroll position: " + scrollPosition + "px)");
    });
	
	
	
	
	
	
	
	},
	clearAll: function() {
		mms.clearSubPages();                                                            // hide all subpages
		// clear all lists of previous entries
//		CF.listRemove(mms.lstAlbum);
        CF.listRemove(mms.tileArtist);				
        CF.listRemove(mms.tileGenre);
        CF.listRemove(mms.tileComposer);
        CF.listRemove(mms.tileFavorite);
//		CF.listRemove(mms.lstArtist);				
//		CF.listRemove(mms.lstGenre);
//		CF.listRemove(mms.lstComposer);        				
		CF.listRemove(mms.lstPlaylist);			
		CF.listRemove(mms.lstRadioSource);
		CF.listRemove(mms.lstRadioStation);
	//	CF.listRemove(mms.lstRadioPicklist);        		
		CF.listRemove(mms.lstPickListItem);
		CF.listRemove(mms.lstRadioGenre);
       	CF.listRemove(mms.lstQueue);
       	CF.listRemove(mms.lstMessageBox);      	
		
		// clear all arrays of previous entries
		mms.arrayAlbum = [];					// Album
		mms.arrayArtist = [];					// Artist
		mms.arrayGenre = [];					// Genre
		mms.arrayComposer = [];					// Genre
		mms.arrayPlaylist = [];				// Playlist
		mms.arrayRadioSource = [];				// Radio Sources
		mms.arrayRadioStation = [];			// Radio Stations
		mms.arrayPickListItem = [];			// PickListItem
		mms.arrayQueue = [];					// Now Playing
		mms.arrayFavorite = [];					// chap fav
		mms.arrayRadioGenre = [];
		mms.artistLetters = [];				// Artist letters
		
		// clear the irrelevant text fields and slider values
		CF.setJoins([																		
				{join: "s4601", value:""},
				{join: mms.txtPlayStatus, value:"--"},
				{join: mms.txtTrackStatus, value: "--"},				
				{join: mms.txtCoverArt, value: "--"},			
				{join: mms.txtTrackTitle, value: "--"},			
				{join: mms.txtAlbum, value: "--"},
				{join: mms.txtArtist, value: "--"},			
				{join: mms.txtTrackTime, value: ""},
				{join: mms.txtTrackDuration, value: ""},
				{join: mms.srchAlbum, value: ""},			
				{join: mms.srchArtist, value: ""},
				{join: mms.srchGenre, value: ""},			
				{join: mms.srchComposer, value: ""},
  				{join: mms.srchPlaylist, value: ""},
				{join: mms.srchRadioSource, value: ""},			
				{join: mms.srchQueue, value: ""},
				{join: mms.txtPlaylist, value: ""},
				{join: mms.txtVolumeLevel, value: ""},
				{join: mms.sldVolumeControl, value: 0},		// volume slider
				{join: mms.sldTrackTime, value: 0}
                

			
		]);
		mms.log("Clear Complete");
	},
	
	// -----------------------------------------------------------------------------------------------------------------------------
	// Other actions
	// -----------------------------------------------------------------------------------------------------------------------------
	
	// Play All commands
	playAlbumTrue: 			function(guid) { mms.sendCmd("PlayAlbum " + guid + " True"); },		// Play selected Album. Will be added to the queue without interrupting playback.
	playAlbumFalse: 		function(guid) { mms.sendCmd("PlayAlbum " + guid + " False"); },		// Play selected Album. The queue will be cleared before the tracks are added.
	playArtistTrue: 		function(guid) { mms.sendCmd("PlayArtist " + guid + " True"); },		// Play selected Artist. Will be added to the queue without interrupting playback.
	playArtistFalse: 		function(guid) { mms.sendCmd("PlayArtist " + guid + " False"); },		// Play selected Artist. The queue will be cleared before the tracks are added.
	playGenreTrue: 			function(guid) { mms.sendCmd("PlayGenre " + guid + " True"); },		// Play selected Genre. Will be added to the queue without interrupting playback.
	playGenreFalse: 		function(guid) { mms.sendCmd("PlayGenre " + guid + " False"); },		// Play selected Genre. The queue will be cleared before the tracks are added.
	playComposerTrue: 		function(guid) { mms.sendCmd("PlayComposer " + guid + " True"); },		// Play selected Composer. Will be added to the queue without interrupting playback.
	playComposerFalse: 		function(guid) { mms.sendCmd("PlayComposer " + guid + " False"); },		// Play selected Composer. The queue will be cleared before the tracks are added.	
	playPlaylistTrue: 		function(guid) { mms.sendCmd("PlayPlaylist " + guid + " True"); },		// Play selected Playlist. Will be added to the queue without interrupting playback.
	playPlaylistFalse: 		function(guid) { mms.sendCmd("PlayPlaylist " + guid + " False"); },	// Play selected Playlist. The queue will be cleared before the tracks are added.
	playTitleTrue: 			function(guid) { mms.sendCmd("PlayTitle " + guid + " True"); },		// Play selected Title. Will be added to the queue without interrupting playback.
	playTitleFalse: 		function(guid) { mms.sendCmd("PlayTitle " + guid + " False"); },		// Play selected Title. The queue will be cleared before the tracks are added.
	playRadioStation: 		function(guid) { mms.sendCmd("PlayRadioStation " + guid); },			// Play selected Radio Station. Will always clear the now playing queue.
	playNowPlayingItem: 	function(guid) { mms.sendCmd("JumpToNowPlayingItem " + guid); },		// Jump to the selected Item and begin playback.
	removeNowPlayingItem: 	function(guid) { mms.sendCmd("RemoveNowPlayingItem " + guid); },		// Remove the selected Item.
	playFavoriteItem: 	    function(guid) { mms.sendCmd("PlayFavorite " + guid); },		         // Jump to the selected Item and begin playback.
	removeFavoriteItem: 	function(guid) { mms.sendCmd("DeleteFavorite " + guid); },		          // Remove the selected Item.
	addFavoriteItem:    	function(guid) { mms.sendCmd("AddFavorite " + guid); },		          // Remove the selected Item.	
	// Browse library commands
	browseMusic: 			function() { mms.sendCmd("Browse Music"); },				// Browse Music
	browseRecordedTV: 		function() { mms.sendCmd("Browse RecordedTV"); },			// Browse Recorded TV
	browseMovies: 			function() { mms.sendCmd("Browse Movies"); },				// Browse Movies
	browseVideos: 			function() { mms.sendCmd("Browse Videos"); },				// Browse Videos
	browsePictures: 		function() { mms.sendCmd("Browse Pictures"); },			// Browse Pictures
	browseInstances: 		function() { mms.sendCmd("BrowseInstances"); },			// Browse Instances
	browseFavorites: 		function() { mms.sendCmd("BrowseFavorites"); },			// Browse Favorites
	browseRadioStations: 	function() { mms.sendCmd("BrowseRadioStations 1 "); },		// Browse Radio Stations

	
	// Basic transport commands
	PlayPause: 				function() { mms.sendCmd("PlayPause"); },					// Play/Pause
	Play: 					function() { mms.sendCmd("Play"); },						// Play
	Pause: 					function() { mms.sendCmd("Pause"); },						// Pause
	Stop: 					function() { mms.sendCmd("Stop"); },						// Stop
	SkipNext: 				function() { mms.sendCmd("SkipNext"); },					// Skip Next
	SkipPrevious: 			function() { mms.sendCmd("SkipPrevious"); },				// Skip Previous
	ShuffleOn: 				function() { mms.sendCmd("Shuffle True"); },				// Shuffle On
	ShuffleOff: 			function() { mms.sendCmd("Shuffle False"); },				// Shuffle Off
	ShuffleToggle: 			function() { mms.sendCmd("Shuffle Toggle"); },				// Shuffle Toggle
	RepeatOn: 				function() { mms.sendCmd("Repeat True"); },				// Repeat On
	RepeatOff: 				function() { mms.sendCmd("Repeat False"); },				// Repeat Off
	RepeatToggle: 			function() { mms.sendCmd("Repeat Toggle"); },				// Repeat Toggle
	ScrobbleOn: 			function() { mms.sendCmd("Scrobble True"); },				// Scrobble On
	ScrobbleOff: 			function() { mms.sendCmd("Scrobble False"); },				// Scrobble Off
	ScrobbleToggle: 		function() { mms.sendCmd("Scrobble Toggle"); },			// Scrobble Toggle
	MuteOn: 				function() { mms.sendCmd("Mute True"); },					// Mute On
	MuteOff: 				function() { mms.sendCmd("Mute False"); },					// Mute Off
	MuteToggle: 			function() { mms.sendCmd("Mute Toggle"); },				// Mute Toggle
	VolumeUp: 				function() { mms.sendCmd("VolumeUp"); },					// Volume Up. Volume range 0 - 50.
	VolumeDown: 			function() { mms.sendCmd("VolumeDown"); },					// Volume Down. Volume range 0 - 50.
	SetVolume: 				function(level) { mms.sendCmd("SetVolume " + level); },					// Volume Down. Volume range 0 - 50.
	
	// Other remote commands
	ChannelUp: 				function() { mms.sendCmd("SendRemote ch+"); },				// Channel Up
	ChannelDown: 			function() { mms.sendCmd("SendRemote ch-"); },				// Channel Down
	Rewind: 				function() { mms.sendCmd("SendRemote Rewind"); },			// Rewind
	FastForward: 			function() { mms.sendCmd("SendRemote FastForward"); },		// Fast Forward
	Record: 				function() { mms.sendCmd("SendRemote Record"); },			// Record
	Information: 			function() { mms.sendCmd("SendRemote MoreInfo"); },		// Information
	Guide: 					function() { mms.sendCmd("Navigate TVGuide"); },			// Guide 
	Back_IR: 				function() { mms.sendCmd("SendRemote Back"); },			// Back (IR Remote)
	DVDMenu: 				function() { mms.sendCmd("SendRemote DVDMenu"); },			// DVDMenu
	GreenButton: 			function() { mms.sendCmd("Navigate Start"); },				// Green Button
	Up: 					function() { mms.sendCmd("SendRemote up"); },				// Up
	Down: 					function() { mms.sendCmd("SendRemote down"); },			// Down
	Left: 					function() { mms.sendCmd("SendRemote left"); },			// Left
	Right: 					function() { mms.sendCmd("SendRemote right"); },			// Right
	Select: 				function() { mms.sendCmd("SendRemote ok"); },				// Select OK
	NumPad1: 				function() { mms.sendCmd("SendRemote 1"); },				// NumPad1
	NumPad2: 				function() { mms.sendCmd("SendRemote 2"); },				// NumPad2
	NumPad3: 				function() { mms.sendCmd("SendRemote 3"); },				// NumPad3
	NumPad4: 				function() { mms.sendCmd("SendRemote 4"); },				// NumPad4
	NumPad5: 				function() { mms.sendCmd("SendRemote 5"); },				// NumPad5
	NumPad6: 				function() { mms.sendCmd("SendRemote 6"); },				// NumPad6
	NumPad7: 				function() { mms.sendCmd("SendRemote 7"); },				// NumPad7
	NumPad8: 				function() { mms.sendCmd("SendRemote 8"); },				// NumPad8
	NumPad9: 				function() { mms.sendCmd("SendRemote 9"); },				// NumPad9
	NumPad0: 				function() { mms.sendCmd("SendRemote 0"); },				// NumPad0
	NumPadEnter: 			function() { mms.sendCmd("SendRemote enter"); },			// NumPadEnter
	NumPadClear: 			function() { mms.sendCmd("SendRemote clear"); },			// NumPadClear
	Slideshow: 				function() { mms.sendCmd("Navigate Slideshow"); },			// Slideshow
	LiveTV: 				function() { mms.sendCmd("Navigate LiveTV"); },			    // Live TV	
	ThumbsUp: 				function() { mms.sendCmd("ThumbsUp"); },			      	// 5.17
	ThumbsDown: 			function() { mms.sendCmd("ThumbsDown"); },			        // 5.17	
	
	
	
	// SetMusicFilter commands
	setMusicFilter_Album:		function(guid) { mms.sendCmd("SetMusicFilter Album=" + guid); },			// Set Album filter 
	setMusicFilter_Artist:		function(guid) { mms.sendCmd("SetMusicFilter Artist=" + guid); },			// Set Artist filter
	setMusicFilter_Genre:		function(guid) { mms.sendCmd("SetMusicFilter Genre=" + guid); },			// Set Genre filter
	setMusicFilter_Composer:	function(guid) { mms.sendCmd("SetMusicFilter Composer=" + guid); },			// Set Composer filter
    setMusicFilter_Playlist:	function(guid) { mms.sendCmd("SetMusicFilter Playlist=" + guid); },		    // Set Playlist filter
	setMusicFilter_RadioSource:	function(guid) { mms.sendCmd("SetMusicFilter RadioSource=" + guid); },	    // Set Radio Sources filter
	setMusicFilter_Queue:		function(guid) { mms.sendCmd("SetMusicFilter NowPlaying=" + guid); },		// Set Now Playing filter
	setMusicFilter_Search:		function(guid) { mms.sendCmd("SetMusicFilter Search=" + guid); },			// Search 
	clearMusicFilter:			function() { mms.sendCmd("SetMusicFilter Clear"); },						// Clear all Music filters
	
	// SetMusicFilter commands
	setRadioFilter_Album:		function(guid) { mms.sendCmd("SetRadioFilter Album=" + guid); },			// Set Album filter 
	setRadioFilter_Artist:		function(guid) { mms.sendCmd("SetRadioFilter Artist=" + guid); },			// Set Artist filter
	setRadioFilter_Genre:		function(guid) { mms.sendCmd("SetRadioFilter Genre=" + guid); },			// Set Genre filter
	setRadioFilter_Playlist:	function(guid) { mms.sendCmd("SetRadioFilter Playlist=" + guid); },		// Set Playlist filter
	setRadioFilter_RadioSource:	function(guid) { mms.sendCmd("PushRadioFilter RadioSource=" + guid); },		// Set Radio Sources filter
	setRadioFilter_RadioGenre:	function(guid) { mms.sendCmd("SetRadioFilter RadioGenre=" + guid); },	// Set Radio Sources filter
	setRadioFilter_Queue:		function(guid) { mms.sendCmd("SetRadioFilter NowPlaying=" + guid); },		// Set Now Playing filter
	setRadioFilter_Search:		function(guid) { mms.sendCmd("SetRadioFilter Search=" + guid); },			// Search 
	clearRadioFilter:			function() { mms.sendCmd("SetRadioFilter Clear"); },						// Clear all Radio filters
	
	// SetMediaFilter commands
	setMediaFilter_Album:		function(guid) { mms.sendCmd("SetMediaFilter Album=" + guid); },			// Set Album filter 
	setMediaFilter_Artist:		function(guid) { mms.sendCmd("SetMediaFilter Artist=" + guid); },			// Set Artist filter
	setMediaFilter_Genre:		function(guid) { mms.sendCmd("SetMediaFilter Genre=" + guid); },			// Set Genre filter
	setMediaFilter_Playlist:	function(guid) { mms.sendCmd("SetMediaFilter Playlist=" + guid); },		// Set Playlist filter
	setMediaFilter_RadioSource:	function(guid) { mms.sendCmd("SetMediaFilter RadioSource=" + guid); },		// Set Radio Sources filter
	setMediaFilter_Queue:		function(guid) { mms.sendCmd("SetMediaFilter NowPlaying=" + guid); },		// Set Now Playing filter
	setMediaFilter_Search:		function(guid) { mms.sendCmd("SetMediaFilter Search=" + guid); },			// Search 
	clearMediaFilter:			function() { mms.sendCmd("SetMediaFilter Clear"); },						// Clear all Media filters
	
	// AckButton commands
	deleteRadioStationCmd:		function(guid) { mms.sendCmd("AckButton " + guid + " \"Edit the station\""); },		// Message Box. Delete the station option.
	editRadioStationCmd:		function(guid) { mms.sendCmd("AckButton " + guid + " \"Edit the station\""); },		// Message Box. Edit the station option.
	ackpickListItem: 			function(guid) { mms.sendCmd("AckPickItem " + guid); },				// Ack Pick Item old way

    cancelRadioStation:			function(guid) { mms.sendCmd("AckButton " + guid + " \"Cancel\""); },					// Message Box. Cancel option. Default action.
	createRadioStation:			function(guid) { mms.sendCmd("AckButton " + guid); },								// Input Box. Pressing this option will send the string. Default action.


    //Action Commands
	actionCommand: 			    function(guid) { mms.sendCmd("Action " + guid); },				// Start Action  (used with Clarify) 	    
    
    
    //search related
//   	cancelSearch:				function(guid) { mms.sendCmd(guid + " " + "\"CANCEL\""); },
	sendSearch:				    function(guid, srchstring) { mms.sendCmd("AckButton " + guid + " OK \"" + srchstring + "\"");},
 	searchCancel: function() {	
			CF.getJoin(mms.btnCancel, function(join, value, tokens) {
			mms.log(	"Searchcancel " +  tokens["[guid]"]);
			mms.cancelRadioStation(tokens["[guid]"]);	
			mms.Back();
		});
	},
	
	searchSubmit: function(srchstring) {	
			CF.getJoin(mms.btnCancel, function(join, value, tokens) { 
				mms.sendSearch(tokens["[guid]"], srchstring);
                mms.log(	"Search " +  tokens["[guid]"] + srchstring);
//18.3              //  CF.setJoin(mms.subPickListItem, 1); 
			});
	},


	// ======================================================================
    // Other commands
    // ======================================================================

	setPickListCount:  		    function(count) { mms.sendCmd("SetPickListCount " + count); },			// create a new radio station.
	setEncoding:  		    	function() { mms.sendCmd("SetEncoding 20105"); },						// create a new radio station.
	//createRadioStation: 		function() { mms.sendCmd("CreateNewRadioStation"); },					// create a new radio station.
    editRadioStationPopup:		function(guid) { mms.sendCmd("action " + guid + " false"); },			// get radio station edit popup.
	getStatus: 					function() { mms.sendCmd("GetStatus"); },								// Get a report of all status on startup.
	setCurrentInstance: 		function() { mms.sendCmd("SetInstance *");	},							// Select current instance.
	subcribeEventOn: 			function() { mms.sendCmd("SubscribeEvents True"); },					// Turns ON feedback of StateChanged events for CURRENT instance only.
	subcribeEventOff: 			function() { mms.sendCmd("SubscribeEvents False"); },					// Turns OFF feedback of StateChanged events for CURRENT instance only.
	subcribeAllEventOn: 		function() { mms.sendCmd("SubscribeEventsAll True"); },				// Turns ON feedback of StateChanged events for ALL instances.
	subcribeAllEventOff: 		function() { mms.sendCmd("SubscribeEventsAll False"); },				// Turns OFF feedback of StateChanged events for ALL instances.
	setOption: 					function() { mms.sendCmd("SetOption supports_inputbox=true"); },
    setOption1:                 function() { mms.sendCmd("SetOption supports_playnow=true"); },
     setOption2:                 function() { mms.sendCmd("SetClientType Crestron"); },		// Turn on message boxes
    clearQueue:					function() { mms.sendCmd("ClearNowPlaying"); mms.browseQueue();},		// Stop all playing tracks and clear all now playing list.
// SetOption supports_inputbox=true
	
	Shutdown:					function() { mms.sendCmd2("Shutdown"); },								// System Shutdown
	Reboot:						function() { mms.sendCmd2("Reboot"); },								// System Reboot
	 
	
	Back: function() { 																					// Back
	//CF.listRemove(mms.lstRadioSource);
		CF.listRemove(mms.lstRadioStation);
		CF.listRemove(mms.lstPickListItem);		
		mms.sendCmd("Back 1"); 
	},
	
	Forward: function() { 																				// Forward
	//	CF.listRemove(mms.lstRadioSource);
		CF.listRemove(mms.lstRadioStation);
		CF.listRemove(mms.lstPickListItem);
		mms.sendCmd("Forward"); 
	},								

	// Select the zone instance and update the now playing info.
	selectZone:	function(zone) { 										
		mms.lastZone = zone;		//5.18.1  remeberlast zone
  //      mms.startControl();
		mms.sendCmd("SetInstance "+zone);
   mms.startControl();
	},		
	
	// Format the command string to send to system : CF.send(systemName, string [, outputFormat])
	sendCmd: function(command) { CF.send(mms.sysName, command+"\x0D\x0A"); 										// System 1 : Port 5004
                               //  mms.log("Tx: "+command+"\x0D\x0A");
                                  mms.log("Tx: "+command);                                
                                 },		
	sendCmd2: function(command) { CF.send(mms.sys2Name, command+"\x0D\x0A"); },									// System 2 : Port 23
	
	// Only allow logging calls when CF is in debug mode - better performance in release mode this way
	log: function(msg) {
			if (CF.debug) {
				CF.log(msg);
			}
			else{
			CF.getJoin(mms.btnDebug, function(join, value) {

			if (value == 1){
			     var d=new Date(), o="";
		  	   o = ("0"+d.getHours()).substr(-2)+":"+("0"+d.getMinutes()).substr(-2)+":"+("0"+d.getSeconds()).substr(-2)+"."+("00"+d.getMilliseconds()).substr(-2)+"> "+msg;
			     CF.listAdd(mms.lstDebug,[{
                            s4586:   ("Log:"+o)
                            }]);
			     CF.setJoin(mms.txtDebug, "Log:"+o);  //on screen
	    	  }
		
	    	});
	       }
		}};
  //CF.listRemove (mms.lstDebug)
CF.modules.push(
	{
		name:"Autonomic MMS5", 		// the name of the module (mostly for display purposes)
		setup:mms.setup,			// the setup function to call
		object: mms,       		// the object to which the setup function belongs
		version: "5.18.34"       // An optional module version number that is displayed in the Remote Debugger
	}
);
