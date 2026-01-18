<template>   
    <div class="absolute w-full h-full flex justify-center items-center text-center flex-col z-50 left-0 right-0 font-inter">  
        <div class="background-global-effect"></div> 

        <i  class="fa-solid fa-list text-8xl text-white"></i> 
        <div class="font-bold text-3xl mt-3 text-white">Vehicle Radio</div> 
        <div class="font-semibold text-normal tracking-wide mt-1 w-1/4 text-white"> 
            Select a radio station
        </div> 

        <div class="w-full flex flex-col items-center mt-3 text-white text-lg"> 
            <div :class="{'bg-[#a0a0a046]': selected == 0}" class="w-[18rem] h-[2.8rem] flex flex-col justify-center items-center bg-[#a0a0a01c] rounded mt-2 border-2 border-[#a0a0a01e] hover:bg-[#a0a0a046]" @click="this.selectRadio(0)">
                <div class="font-semibold text-[14px]">TURN OFF RADIO</div>  
            </div>  

            <div :class="{'bg-[#a0a0a046]': selected == 1}" class="w-[18rem] h-[2.8rem] flex flex-col justify-center items-center bg-[#a0a0a01c] rounded mt-2 border-2 border-[#a0a0a01e] hover:bg-[#a0a0a046]" @click="this.selectRadio(1)">
                <div class="font-semibold text-[14px]">RADIO PRO FM</div>  
            </div>  

            <div :class="{'bg-[#a0a0a046]': selected == 2}" class="w-[18rem] h-[2.8rem] flex flex-col justify-center items-center bg-[#a0a0a01c] rounded mt-2 border-2 border-[#a0a0a01e] hover:bg-[#a0a0a046]" @click="this.selectRadio(2)">
                <div class="font-semibold text-[14px]">VIRGIN RADIO</div>  
            </div>  

            <div :class="{'bg-[#a0a0a046]': selected == 3}" class="w-[18rem] h-[2.8rem] flex flex-col justify-center items-center bg-[#a0a0a01c] rounded mt-2 border-2 border-[#a0a0a01e] hover:bg-[#a0a0a046]" @click="this.selectRadio(3)">
                <div class="font-semibold text-[14px]">RADIO TEQUILA</div>  
            </div>  

            <div :class="{'bg-[#a0a0a046]': selected == 4}" class="w-[18rem] h-[2.8rem] flex flex-col justify-center items-center bg-[#a0a0a01c] rounded mt-2 border-2 border-[#a0a0a01e] hover:bg-[#a0a0a046]" @click="this.selectRadio(4)">
                <div class="font-semibold text-[14px]">RADIO MANELE FM</div> 
            </div>  

            <div :class="{'bg-[#a0a0a046]': selected == 5}" class="w-[18rem] h-[2.8rem] flex flex-col justify-center items-center bg-[#a0a0a01c] rounded mt-2 border-2 border-[#a0a0a01e] hover:bg-[#a0a0a046]" @click="this.selectRadio(5)">
                <div class="font-semibold text-[14px]">RADIO TARAF</div> 
            </div>  
        </div>  

        <div class="font-medium tracking-wider text-base flex flex-row mt-6 text-white">  
            <button @click="this.changeRadio()" :class="{'!bg-green-700': this.selected != null}" class="rounded bg-purple-600 w-40 h-9 mx-5"><i class="fa-solid fa-check"></i> PLAY</button> 
            <button @click = "cancelRadio()" class="rounded bg-purple-600 hover:bg-purple-700 w-40 h-9 mx-5"><i class="fa-solid fa-xmark"></i> CANCEL</button>
        </div> 
    </div>    
</template>
  
<script> 
    let audio = false;

    export default {
        name: 'RadioComponent',

        data: function() {
            return { 
                selected: 0, 
                stations:
                [
                    '',
                    'http://edge126.rdsnet.ro:84/profm/profm.mp3', //pro FM
                    'https://astreaming.edi.ro:8443/VirginRadio_aac',//virgin
                    'http://live.radiotequila.ro:7000/;',//tequila
                    'http://a.fmradiomanele.ro:8054/;', //radio manele fm
                    'https://ddos.radiotaraf.ro/7100/stream' //taraf
                ] 
            };
        },    

        mounted()
        { 
            window.RadioComponent = this;  
        },

        methods: 
        { 
            open(vehradio)
            {
                this.selected = vehradio; 
            },

            cancelRadio()
            { 
                if(window.mp) window.e_trigger("client:radio::closeMenu"); 
            },

            selectRadio(index)
            {
                this.selected = index;    
            },

            changeRadio()
            { 
                if(window.mp) window.e_trigger("client:radio::radioChange", this.selected); 

                if(this.selected == 0)
                {
                    return audio.muted = true;
                }  
            },

            startRadio(idRadio, volume)
            {
                if(audio) { audio.pause()}

                audio = new Audio(this.stations[idRadio]); 
                audio.volume = (volume/100).toFixed(2);
                audio.play();   
            },

            stopRadio()
            {
                if(audio) { audio.pause()}
            },

            radioChangeVolume(volume)
            { 
                if(audio)
                {
                    audio.volume = (volume/100).toFixed(2);
                } 
            }
        }, 
    }
</script>