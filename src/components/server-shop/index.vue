 
  
<script>  
    import $ from "jquery"; 
    var API_KEY = "AIzaSyBd1coOGyCegix7PC4rCZhIdz75YcxagQ8"; 
     
    var tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
 
    
    export default {
        name: 'ShopComponent',

        mounted() 
        { 
            window.ShopComponent = this;    
 
            //this.initYoutube();
        },

        data: function() 
        {
            return { 
                input: '',
                player: null
            };
        },    
 
        methods: 
        {    
            initYoutube(videoID) 
            { 
                if(!videoID)
                    return;

                console.log("initYoutube");

                this.player = new window.YT.Player("player", {
                    width: 600,
                    height: 400,
                    videoId: videoID,
                    events: 
                    {
                        onReady: this.onPlayerReady,
                        onStateChange: this.onPlayerStateChange
                    }
                });
            },

            onPlayerReady(evt) 
            {
                console.log("Player ready");
                evt.target.playVideo();
            },

            onPlayerStateChange(evt) 
            {
                console.log("Player state changed", evt);
            },

            searchVideo(search, maxResults)
            {
                $.get("https://www.googleapis.com/youtube/v3/search?key=" + API_KEY + "&type=video&part=snippet&maxResults=" + maxResults + "&q=" + search, function(data){
 
                    data.items.forEach(item => {
  
                        $("#videos").append(`
                     
                            <div class="mt-1 flex flex-row items-center justify-between w-[50%] min-h-[4rem] bg-[#8d8d8d59] text-black rounded">  
                                <div class="flex flex-col items-start ml-2">
                                    <div class="text-[15px] font-semibold opacity-70">${item.snippet.title}</div>
                                    <div class="text-[13px] font-semibold opacity-70">
                                        <i class="fa-solid fa-music"></i> 254k
                                    </div>
                                </div>

                                <div class="flex justify-end items-center mr-2 rounded-full w-[5rem]"> 
                                    <img class="rounded-full" :src="${item.snippet.thumbnails.default.url}" width="42" height="42">
                                </div>  
                            </div>     
                        `)
                    });
                });   
            }, 

            playVideo()
            {
                var state = this.player.getPlayerState();

                if(state == 2) {
                    this.player.playVideo();
                }

                console.log('Youtube video resume.');
            },

            pauseVideo()
            {
                var state = this.player.getPlayerState();

                if(state) {
                    this.player.pauseVideo();
                }


                console.log('Youtube video put on pause.');
            }
        }, 
    }

     
</script>

<template> 
    
    <div class="absolute w-full h-full flex justify-center items-center">
        
        <div class="text-white w-full h-full flex flex-col justify-center items-center font-inter">   
             
            <input id="search" spellcheck="false" class="w-[30rem] h-8 bg-darkPurple text-white rounded-lg text-center font-medium tracking-normal mt-1 focus:border-2 border-violet-500 focus:rounded-full" type="name" placeholder="Enter amount" v-model="this.input" v-model.number="this.input" onkeyup="this.value">
 
            <button @click="this.searchVideo(this.input, 1);" class="flex justify-center items-center w-[10rem] h-[2rem] bg-red-500 text-white rounded mt-10">Submite</button>
         
            <div class="flex flex-col items-center w-auto h-auto mt-2 bg-red-500" id="videos"></div>  
             
            
            <div id="app" v-show="false">
                <div id="player"></div>
            </div>

 
            <div class="flex flex-row justify-center items-center">
                <button @click="this.playVideo();" class="flex justify-center items-center w-[10rem] h-[2rem] bg-red-500 text-white rounded mt-10">Play</button>
                <button @click="this.pauseVideo();" class="ml-2 flex justify-center items-center w-[10rem] h-[2rem] bg-red-500 text-white rounded mt-10">Pause</button>
            </div> 
         </div> 
    </div> 
</template>

