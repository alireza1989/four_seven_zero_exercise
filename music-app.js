/////////////////////////////////////////////////////
// Create a data base object for locally stored data
/////////////////////////////////////////////////////

var database = window.MUSIC_DATA;
var playlists_data = database.playlists;
var songs_data = database.songs;


/////////////////////////////////////////////////////
//                 The Tab View JS
/////////////////////////////////////////////////////

// Content of tabs
var libraryList = document.getElementById("library-tab");
var playlistsList = document.getElementById("playlist-tab");
var searchTab = document.getElementById("search-tab");


loadLibraryButton = document.getElementById("load-library");
loadPlaylistsButton = document.getElementById("load-playlists");
loadSearchButton = document.getElementById("load-search");


// var libraryIconColor = loadLibraryButton.getElementsByClassName('glyphicon glyphicon-music')[0].innerHTML;
// console.log(libraryIconColor);
// var playListsIconColor = loadPlaylistsButton.getElementsByClassName('glyphicon glyphicon-th-list')[0].getElementsByTagName('p')[0];
// var searchIconColor = loadSearchButton.getElementsByClassName('glyphicon glyphicon-search')[0].getElementsByTagName('p')[0];


// Load library callback function
var libraryCallback = function(){
	    
    libraryList.style.display = "block";
    playlistsList.style.display = "none";
    searchTab.style.display = "none";

    // libraryIconColor = "#9772A9";
    // playListsIconColor = "black";
    // earchIconColor = "black";

    sort_by_artist();
 	load_songs();

};
// Library event Listener
loadLibraryButton.addEventListener('click', libraryCallback, false);



// Load Plalists callback function

var playlistsCallback = function(){

	libraryList.style.display = "none";
	playlistsList.style.display = "block";
	searchTab.style.display = "none";

	// libraryIconColor = "black";
 //    playListsIconColor = "#9772A9";
 //    searchIconColor = "black";

	load_playlists();
};

// Playlist load on loading the page
window.addEventListener('load', playlistsCallback, false);

// Playlists event listener

loadPlaylistsButton.addEventListener('click', playlistsCallback, false);




// Load Saerch callback function

var searchCallback = function(){

	libraryList.style.display = "none";
	playlistsList.style.display = "none";
	searchTab.style.display = "block";

	// libraryIconColor = "black";
 //    playListsIconColor = "black";
 //    searchIconColor = "#9772A9";
};

// Playlists event listener

loadSearchButton.addEventListener('click', searchCallback, false);


/////////////////////////////////////////////////////
//           Load the content of each tab 
/////////////////////////////////////////////////////


// LOAD ALL THE SONGS IN DB TO LIBRARY PAGE
function load_songs(){

	

	var songs_list = '<ul>';
	for(i in songs_data){

		var songRow = '<li class="container list-item"><img src="album_cover.jpg" alt="album cover" class="alb-cover">' +
                      '<span class="song-name-album"><span class="music-title">' +
                      songs_data[i].title + '</span><span class="album-title">' + songs_data[i].artist + 
                      '</span></span><span class="glyphicon glyphicon-play song-play">  </span>' +
                      '<span class="glyphicon glyphicon-plus-sign song-select">  </span>';

        songs_list += songRow;      
         

	}

	songs_list += '</ul>';

	document.getElementById('song-list').innerHTML = songs_list;

}


// Load all the playlists into playlists page
function load_playlists(){
	
	var playlists_list = '<ul>';
	for(i in playlists_data){

		var playlist_row = '<li class="container list-item"><img src="album_cover.jpg" alt="album cover" class="alb-cover">' + 
		                   '<span class="playlist-title">' + playlists_data[i].name + 
		                   '</span><span class="glyphicon glyphicon-chevron-right playlist-select"></span></li>';

		playlists_list += playlist_row;
	}

	playlists_list += '</ul>';

	document.getElementById('playlists-list').innerHTML = playlists_list;

}



/////////////////////////////////////////////////////
//           Sort Songs by title and artist
/////////////////////////////////////////////////////


// Sort by title
var sort_by_title = function(){
	songs_data.sort(function(a, b) {
	var titleA = a.title.toUpperCase(); 
	var titleB = b.title.toUpperCase(); 
	
	if(titleA.substring(0, 4) === "THE "){
		titleA = titleA.substring(4);
	}
	if(titleB.substring(0, 4) === "THE "){
		titleB = titleB.substring(4);
	}

	if (titleA < titleB) {
  		return -1;
	}
	if (titleA > titleB) {
  		return 1;
	}
	return 0;

});

	load_songs();

}  

document.getElementById('sort-by-title').addEventListener('click',sort_by_title, false);


// Sort by artist
var sort_by_artist = function(){
	songs_data.sort(function(a, b) {
	var artistA = a.artist.toUpperCase(); 
	var artistB = b.artist.toUpperCase(); 
	
	if(artistA.substring(0, 4) === "THE "){
		artistA = artistA.substring(4);
	}
	if(artistB.substring(0, 4) === "THE "){
		artistB = artistB.substring(4);
	}

	if (artistA < artistB) {
  		return -1;
	}
	if (artistA > artistB) {
  		return 1;
	}
	return 0;

});

	load_songs();

}  

document.getElementById('sort-by-artist').addEventListener('click',sort_by_artist, false);

/////////////////////////////////////////////////////
//           Add songs to playlist + modal
/////////////////////////////////////////////////////

// DOM objects required for modal and add song function
var addsong_modal;
var library_addsong_modal = document.getElementById('library-addsong-modal');
var playlists_addsong_modal = document.getElementById('playlists-addsong-modal');
var search_addsong_modal = document.getElementById('search-addsong-modal');
var close_span = document.getElementsByClassName('close')[0];
var playlists_elements;  

// Global variable to keep track of song selected and playlist selected
var song_selected;
var play_list_selected;

// make the modal function

function make_modal(){


    window.song_selected = event.target.parentElement;
    addsong_modal.style.display = "block";

    var modal_playlists = '<ul>';

    for (i in playlists_data){

    	modal_playlists += '<li class="container list-item modal-list-item">' +'<span class="modal-list-item-playlist-title">' + 
    		                playlists_data[i].name + '</span>' + '</li>';
    }

    modal_playlists += '</ul>';
    console.log(modal_playlists);
    playlists_elements.innerHTML = modal_playlists;	
}

// add_to_play_list function

function add_to_playlist(){

	window.play_list_selected = event.target;

	var playlist_selected_name = play_list_selected.getElementsByTagName('span')[0].innerHTML;

    var song_element = song_selected.getElementsByTagName('span')[0];
  
   	var song_name = song_element.getElementsByClassName('music-title')[0].innerHTML;
 
   	var song_id ='';

   	for (i in songs_data){
   		// console.log(songs_data[i]);
   		// console.log(songs_data[i].title);
   		// console.log(song_name);
   		if ( songs_data[i].title === song_name ){
   	
   			song_id = songs_data[i].id;
   		}
   	}

   	for (j in playlists_data){
   		if ( playlist_selected_name === playlists_data[j].name ){

   			playlists_data[j].songs.push(song_id);
   		}
   	}
}


// add song to a playlist function
var add_song_to_playlist = function (){

	// if user clicks on add song in library tab
	if (libraryList.style.display == "block"){
		    
		if (event.target.className == 'glyphicon glyphicon-plus-sign song-select') {

			addsong_modal = library_addsong_modal;
			playlists_elements = document.getElementById('library-modal-playlists');
		    make_modal();

		    // Close the modal when click on X
        	library_addsong_modal.getElementsByClassName('close')[0].onclick = function() {
        		library_addsong_modal.style.display = "none";
            }


	    }

	    if (event.target.className == 'container list-item modal-list-item' || event.target.className == 'playlist-title'){
	    	

	    	add_to_playlist();
	    	addsong_modal.style.display = "none";

	    }

    }

    // if user clicks on add song in playlists tab 
	if (playlistsList.style.display == "block"){
		    
		if (event.target.className == 'glyphicon glyphicon-plus-sign song-select') {

			addsong_modal = playlists_addsong_modal;
			playlists_elements = document.getElementById('playlists-modal-playlists');
		    make_modal();

		    // Close the modal when click on X
        	playlists_addsong_modal.getElementsByClassName('close')[0].onclick = function() {
 		    	playlists_addsong_modal.style.display = "none";
            }


	    }

	    if (event.target.className == 'container list-item modal-list-item' || event.target.className == 'playlist-title'){
	    	

	    	add_to_playlist();
	    	addsong_modal.style.display = "none";

	    }

    }


    // if user clicks on add song in search tab 
	if (searchTab.style.display == "block"){
		    
		if (event.target.className == 'glyphicon glyphicon-plus-sign song-select') {

			addsong_modal = search_addsong_modal;
			playlists_elements = document.getElementById('search-modal-playlists');
		    make_modal();

		    // Close the modal when click on X
        	search_addsong_modal.getElementsByClassName('close')[0].onclick = function() {
        		search_addsong_modal.style.display = "none";
            }

	    }

	    if (event.target.className == 'container list-item modal-list-item' || event.target.className == 'playlist-title'){
	    	

	    	add_to_playlist();
	    	addsong_modal.style.display = "none";

	    }
    }


};

document.addEventListener('click', add_song_to_playlist, false);




/////////////////////////////////////////////////////
//                    Search
/////////////////////////////////////////////////////

// DOM object of the search input 
var search_item = document.getElementById('search');


function search_music (){
	
	var search_regex = new RegExp(search_item.value, 'i');

	var search_list = '<ul>'

	if (search_item.value === ''){
		search_list = "";
	}
	else{	
		for (k in playlists_data){
			if (search_regex.test(playlists_data[k].name)){

				search_list +='<li class="container list-item"><img src="album_cover.jpg" alt="album cover" class="alb-cover">' + 
			                  '<span class="playlist-title">' + playlists_data[k].name + 
			                  '</span><span class="glyphicon glyphicon-chevron-right playlist-select"></span></li>';

			}

		}

		for (i in songs_data){
			if ( search_regex.test(songs_data[i].title) || search_regex.test(songs_data[i].artist) ){

				search_list += '<li class="container list-item"><img src="album_cover.jpg" alt="album cover" class="alb-cover">' +
	                           '<span class="song-name-album"><span class="music-title">' +
	                           songs_data[i].title + '</span><span class="album-title">' + songs_data[i].artist + 
	                           '</span></span><span class="glyphicon glyphicon-play song-play">  </span>' +
	                           '<span class="glyphicon glyphicon-plus-sign song-select">  </span>';
			}
		}


		search_list += '</ul>'
	

	}

	document.getElementById('search-list').innerHTML = search_list;
}


search_item.addEventListener( 'input', search_music, false);


/////////////////////////////////////////////////////
//      Load the content of a playlist on click
/////////////////////////////////////////////////////
function find_song(song){
	return song.id === playlists_data[i].songs[j];
}

var load_playlist_songs = function(){

	if(event.target.className == 'glyphicon glyphicon-chevron-right playlist-select'){
		
		var playlist = event.target.parentElement;
		var playlist_name = playlist.getElementsByClassName('playlist-title')[0].innerText;
		var matching_playlist = {};
		
		for (i in playlists_data){
			if (playlists_data[i].name == playlist_name){

				// matching_playlist = playlists_data[i];
				var songs_in_a_playlist = '<h3 class="playlist-page-title">' + playlists_data[i].name + '</h3><ul>';

				for (j in playlists_data[i].songs){

					var song = songs_data.find(find_song);
					songs_in_a_playlist += '<li class="container list-item"><img src="album_cover.jpg" alt="album cover" class="alb-cover">' +
                                       '<span class="song-name-album"><span class="music-title">' +
                                       song.title + '</span><span class="album-title">' + song.artist + 
                                       '</span></span><span class="glyphicon glyphicon-play song-play">  </span>' +
                                       '<span class="glyphicon glyphicon-plus-sign song-select">  </span>';
                }

				songs_in_a_playlist += '</ul>'
			}

			document.getElementById('playlists-list').innerHTML	= songs_in_a_playlist;			
		}

		libraryList.style.display = "none";
		playlistsList.style.display = "block";
		searchTab.style.display = "none";
	}
}


document.addEventListener('click', load_playlist_songs, false);