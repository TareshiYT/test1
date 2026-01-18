<template>   
    <div class="absolute w-full h-full flex justify-center flex-col z-50 left-0 right-0 font-inter cursor-pointer overflow-x-hidden select-none ">  
         
        <div class="flex flex-col justify-center items-center w-full cursor-pointer font-inter font-semibold z-1 select-none text-white " v-show="!this.page">   
            <div class="background-global-effect"></div>

            <div class="flex flex-col justify-center items-center">
                <i class="fa-solid fa-list text-[50px]"></i>
                
                <div class="text-[1.8rem] h-auto"> 
                    Tunning Shop
                </div>
 
                <div class="w-auto h-auto font-semibold tracking-wide mt-[5px] text-[1rem]"> 
                    Select your desired action 
                </div> 
            </div> 

            <div class="mt-2"> 
                <div class="w-[20rem] min-h-[3rem] flex flex-col justify-center items-center bg-[#a0a0a01c] border-2 border-[#a0a0a01e] rounded mt-2 hover:bg-[#a0a0a046]" :class = "{'bg-[#a0a0a046]': this.selectedAction == 0}" @click="this.selectAction(0)">
                    <div class="font-bold tracking-wide text-[15px]">MODIFY</div>
                    <div class="font-semibold tracking-wide text-[12px]">MODIFY YOUR VEHICLE</div>
                </div>

                 
                <div class="w-[20rem] min-h-[3rem] flex flex-col justify-center items-center bg-[#a0a0a01c] border-2 border-[#a0a0a01e] rounded mt-2 hover:bg-[#a0a0a046]" :class = "{'bg-[#a0a0a046]': this.selectedAction == 1}" @click="this.selectAction(1)">
                    <div class="font-bold tracking-wide text-[15px]">REPAIR</div>
                    <div class="font-semibold tracking-wide text-[12px]">REPAIR YOUR VEHICLE</div>
                </div> 
            </div> 

            <div class="flex flex-row justify-between items-center mt-[15px] text-gray-800">   
                <div :class = "{'!bg-green-600 !text-white': this.selectedAction != null}" class="flex justify-center bg-yellow-600 items-center font-semibold text-[14px] w-[9.5rem] h-[2.2rem] rounded tracking-wide mx-2" @click="this.executeAction();">
                    <i class="fa-solid fa-check mr-1"></i> SELECT
                </div>

                <div class="flex justify-center items-center font-semibold text-[14px] w-[9.5rem] h-[2.2rem] bg-yellow-600 rounded tracking-wide mx-2 hover:bg-yellow-500">
                    <i class="fa-solid fa-xmark mr-2"></i> CANCEL
                </div>
            </div>  
        </div>
          
        <div class="w-full h-full flex-col items-center justify-between font-inter" v-show="this.page">
            <div class="flex flex-row justify-between w-full h-[10%]">  
                <div class="flex flex-col text-white h-full ml-7">  
                    <div class="text-[#6b6bfa] tracking-wide text-[2rem] font-extrabold">LOS SANTOS</div>
                    <div class="text-white tracking-wide text-[1.5rem] font-semibold mt-[-15px]">TUNNING VEHICLE</div>   
                </div>
  
                <div class="flex flex-col text-white items-center h-full mr-[27px]">

                    <div class="flex flex-row justify-center items-center w-full h-[3rem]">  
                        <img class="mr-2 text-left" src="https://i.imgur.com/Yi7bEsF.png" width="30" height="30"> | <i class="fa-solid fa-rotate fa-spin ml-2 text-[25px] text-purple-400"></i>  
                        <span class="ml-2 text-sm font-normal tracking-wide opacity-80"> rotate vehicle</span>
                    </div>

                    <div class="bg-gradient-to-l from-purple-400  w-full rounded h-[2px]"></div>

                    <div class="flex flex-row justify-end items-center w-full h-[3rem]">   
                        <div class="flex justify-center items-center bg-white text-black font-bold tracking-wide text-[13px] rounded w-[3rem] h-[1.5rem]">ESC</div> 
                        <span class="ml-2 text-sm font-normal tracking-wide text-right opacity-80"> close menu</span>
                    </div>
                </div>
            </div> 

            <div class="flex flex-col w-full h-[90%] justify-center items-center">  
                <div class="flex flex-col w-full h-[89%] justify-center"> 
                    
                    <div class="w-[30%] h-[26.38rem] ml-7 mt-[2rem] overflow-y-auto text-white">  
                        <div class="w-full h-full flex flex-col justify-start items-cebter">
                            
                            <div class="w-[15rem] min-h-[2.8rem] flex flex-col justify-center items-start bg-[#a0a0a01c] border-2 border-[#a0a0a01e] rounded mt-2 cursor-pointer hover:bg-[#3535353b]" v-for="(item, index) in this.categoryes" :key="item" :class="{'!border-yellow-500 shadow-[0px_0px_10px_rgb(234,179,8)]': this.selected == index}" @click="this.changeCategory(item.name, index)"> 
                                <div class="flex flex-row font-semibold text-[15px] tracking-wide ml-2 h-full w-full"> 
                                    <div class="flex justify-start items-center h-full w-[2.3rem]">
                                        <img :src="item.image" width="26" height="26"> 
                                    </div>
                                     
                                    <div class="flex justify-center items-center h-full ml-2 text-[13px] tracking-wider font-semibold">
                                        {{ item.name }}
                                    </div> 
                                </div>  
                            </div>  
                        </div>  
                    </div> 
                </div> 

                <div class="flex w-full h-[17%] justify-center items-center flex-col text-white overflow-x-hidden"> 
                       
                    <div class="w-[98%] h-[2rem] flex justify-between flex-row items-center mt-1"> 
                        <div class="bg-gradient-to-l from-[#a0a0a01c] w-[100%] rounded-full h-[2px]"></div>
    
                        <div class="w-[8rem] h-full flex flex-row justify-center items-center">
                            
                            <button @click="this.scrollItemLeft()" class="hover:bg-[#3535353b] hover:border-purple-400 w-[35px] h-[35px] flex justify-center items-center text-white rounded-full bg-[#a0a0a01c] border-2 border-[#a0a0a01e] ml-5">
                                <i class="fa-solid fa-chevron-left opacity-50"></i>
                            </button>  
    
                            <button @click="this.scrollItemRight()" class="hover:bg-[#3535353b] hover:border-purple-400 w-[35px] h-[35px] flex justify-center items-center text-white rounded-full bg-[#a0a0a01c] border-2 border-[#a0a0a01e] ml-5">
                                <i class="fa-solid fa-chevron-right opacity-50"></i>
                            </button>  
                        </div> 
                    </div> 
                      
                    <div id="scrollRight" class="flex flex-row h-full justify-start items-end overflow-x-hidden w-[75.4rem] mb-4" v-if="this.selected != null && Object.keys(this.categoryes[this.selected].data).length"> 

                        <div v-for="(item, index) in this.categoryes[this.selected].data" :key="item" :class="{'!ml-8': index > 0}" @click="this.changeMod(this.categoryes[this.selected].type, this.categoryes[this.selected].data[index])" class="group flex flex-col justify-center items-start min-w-[12rem] max-w-[12rem] h-[5rem] rounded-xl text-[15px]   bg-[#a0a0a01c] border-[3px] border-[#a0a0a01e] px-2 hover:border-yellow-500 whitespace-nowrap hover:shadow-[0px_0px_10px_rgb(234,179,8)] hover:opacity-100" style="zoom: 90%;">
                            <div class="relative z-10 ml-[10rem]  flex opacity-60 justify-center group-hover:opacity-100 items-center min-h-[2.5rem] min-w-[2.5rem] bg-[#35353575] rounded-full shadow-[0px_0px_10px_#fff] ">
                                <img class="blur-none" :src="this.categoryes[this.selected].image" width="26" height="26"> 
                            </div>
                            
                            <div class="w-full mb-[1.7rem]">
                                <div class="relative font-semibold text-[14px] tracking-wider opacity-60 group-hover:opacity-100">{{ item.name }}</div>
                                <div class="relative font-semibold text-[13px] tracking-wider opacity-60 group-hover:opacity-100">Price: <span class="text-green-500">$0</span></div>
                            </div> 
                        </div>  
                    </div>  
                </div> 
            </div> 
        </div>    
    </div>    
</template>
  
<script>   

    let rpc = '';

    if(window.mp) {
        rpc = require('rage-rpc');
    }

    export default {
        name: 'TunningComponent',

        data: function() {
            return {  

                selected: null,
                selectedAction: null,

                page: 0,
                

                categoryes: [ 
                    {
                        name: 'Colors',
                        image: 'https://i.imgur.com/lkTfbFe.png', 

                        data: []
                    },

                    {
                        name: 'Neon',
                        image: 'https://i.imgur.com/FRD0af3.png', 

                        data: []
                    },

                    {
                        name: 'Tyre Smoke',
                        image: 'https://i.imgur.com/ALFNZ8q.png', 

                        data: []
                    },

                    {
                        name: 'Head Lights',
                        image: 'https://i.imgur.com/egauq5P.png', 
                        type: 22,

                        data: [
                            { name: 'Standard', price: 0, index: -1, },
                            { name: 'Xenon Headlights', price: 0, index: 0, } 
                        ]
                    },

                    {
                        name: 'Spoiler',
                        image: 'https://i.imgur.com/XwgpbfK.png', 
                        type: 0,

                        data: []
                            /*{ name: 'Standard', price: 0, index: -1, },
                            { name: 'Black Roll Bars 1', price: 0, index: 0, },
                            { name: 'Black Roll Bars 2', price: 0, index: 1, },
                            { name: 'Black Roll Bars 3', price: 0, index: 2, },
                            { name: 'Black Roll Bars 4', price: 0, index: 3, },
                            { name: 'Black Roll Bars 5', price: 0, index: 3, },
                            { name: 'Black Roll Bars 6', price: 0, index: -1, },
                            { name: 'Black Roll Bars 7', price: 0, index: 0, },
                            { name: 'Black Roll Bars 8', price: 0, index: 1, },
                            { name: 'Black Roll Bars 9', price: 0, index: 2, },
                            { name: 'Black Roll Bars 10', price: 0, index: 3, },
                            { name: 'Black Roll Bars 11', price: 0, index: 3, },*/
                         
                    },

                    {
                        name: 'Front Bumper',
                        image: 'https://i.imgur.com/3DywzO3.png', 
                        type: 1,

                        data: [
                            { name: 'Standard', price: 0, index: -1, },
                            { name: 'Front Bumper', price: 0, index: 0, },
                            { name: 'Front Bumper 2', price: 0, index: 1, },
                            { name: 'Front Bumper 3', price: 0, index: 2, },
                            { name: 'Front Bumper 4', price: 0, index: 3, },
                            { name: 'Front Bumper 5', price: 0, index: 4, },
                            { name: 'Front Bumper 6', price: 0, index: 5, },
                            { name: 'Front Bumper 7', price: 0, index: 6, },
                            { name: 'Front Bumper 8', price: 0, index: 7, },
                            { name: 'Front Bumper 9', price: 0, index: 8, },
                            { name: 'Front Bumper 10', price: 0, index: 9, },
                            { name: 'Front Bumper 11', price: 0, index: 10, }
                        ]
                    },

                    {
                        name: 'Rear Bumper',
                        image: 'https://i.imgur.com/3DywzO3.png', 
                        type: 2, 
                        data: []
                    },

                    {
                        name: 'Exhaust',
                        image: 'https://i.imgur.com/CiBUktb.png', 
                        type: 4,

                        data: [
                            { name: 'Standard', price: 0, index: -1, },
                            { name: 'Black Roll Bars', price: 0, index: 0, },
                            { name: 'Black Roll Bars 2', price: 0, index: 1, },
                            { name: 'Black Roll Bars 3', price: 0, index: 2, },
                            { name: 'Black Roll Bars 4', price: 0, index: 3, }, 
                        ]
                    },

                    {
                        name: 'Griller',
                        image: 'https://i.imgur.com/AwYhp9i.png', 
                        type: 6,

                        data: []
                    },

                    {
                        name: 'Hood',
                        image: 'https://i.imgur.com/5uEwOGN.png', 
                        type: 7,

                        data: []
                    },

                    {
                        name: 'Fender',
                        image: 'https://i.imgur.com/PHIA6Qe.png', 
                        type: 8,

                        data: []
                    },

                    {
                        name: 'Roof',
                        image: 'https://i.imgur.com/AwYhp9i.png', 
                        type: 10,

                        data: []
                    },

                    {
                        name: 'Wheels',
                        image: 'https://i.imgur.com/609JNzN.png', 
                        type: 23,

                        data: [
                            { name: 'Standard', price: 0, index: -1, },
                            { name: 'Wheels', price: 0, index: 0, },
                            { name: 'Wheels 2', price: 0, index: 1, },
                            { name: 'Wheels 3', price: 0, index: 2, },
                            { name: 'Wheels 4', price: 0, index: 3, },
                            { name: 'Wheels 5', price: 0, index: 4, },
                            { name: 'Wheels 6', price: 0, index: 5, },
                            { name: 'Wheels 7', price: 0, index: 6, },
                            { name: 'Wheels 8', price: 0, index: 7, },
                            { name: 'Wheels 9', price: 0, index: 8, },
                            { name: 'Wheels 10', price: 0, index: 9, },
                            { name: 'Wheels 11', price: 0, index: 10, }
                        ]
                    },

                    {
                        name: 'Livery',
                        image: 'https://i.imgur.com/AwYhp9i.png', 
                        type: 48,

                        data: []
                    },

                    {
                        name: 'Horn',
                        image: 'https://i.imgur.com/UXAWgrg.png', 
                        type: 14,

                        data: []
                    },

                    {
                        name: 'Engine',
                        image: 'https://i.imgur.com/RINVpUC.png', 
                        type: 11,

                        data: [
                            { name: 'Standard', price: 0, index: -1, },
                            { name: 'Stage I', price: 2000, index: 0, }, 
                            { name: 'Stage II', price: 2000, index: 1, }, 
                            { name: 'Stage III', price: 2000, index: 2, }, 
                            { name: 'Stage IV', price: 2000, index: 3, } 
                        ]
                    },

                    {
                        name: 'Turbo',
                        image: 'https://i.imgur.com/ZovXYWy.png', 
                        type: 18,

                        data: [
                            { name: 'Standard', price: 0, index: -1, },
                            { name: 'Hybrid Turbo', price: 2000, index: 0, }, 
                        ]
                    },

                    {
                        name: 'Transmision',
                        image: 'https://i.imgur.com/AwYhp9i.png', 
                        type: 13,

                        data: [
                            { name: 'Standard', price: 0, index: -1, }, 
                            { name: 'Street Transmision', price: 2000, index: 0, }, 
                            { name: 'Sport Transmision', price: 2000, index: 1, }, 
                            { name: 'Race Transmision', price: 2000, index: 2, } 
                        ] 
                    },

                    {
                        name: 'Suspension',
                        image: 'https://i.imgur.com/sqPJy9H.png', 
                        type: 15,

                        data: [
                            { name: 'Standard', price: 0, index: -1, },
                            { name: 'Lower Suspension', price: 2000, index: 0, }, 
                            { name: 'Street Suspension', price: 2000, index: 1, }, 
                            { name: 'Sport Suspension', price: 2000, index: 2, }, 
                            { name: 'Race Suspension', price: 2000, index: 3, } 
                        ] 
                    },

                    {
                        name: 'Trunk',
                        image: 'https://i.imgur.com/AwYhp9i.png', 
                        type: 37,

                        data: []
                    },
                ] 
            };
        },    

        mounted()
        { 
            window.TunningComponent = this;  
        },

        methods: 
        { 
            open(page) {
                this.page = page;
            },

            async changeCategory(item, index) {
 
                this.selected = index;
                 
 
                if(window.mp) {
                    this.categoryes[index].data = [];

                    let items = await rpc.callClient("getListOfAvailabeVehicleMods", this.categoryes[index].type);
                    this.categoryes[index].data = JSON.parse(items);
             
                    window.e_trigger('client::tunning:change', item);
                }
            },

            changeMod(type, item) {
                if(window.mp) {
                    window.e_trigger('client::tunning:changeMod', JSON.stringify({ data: JSON.stringify(item), category: type }));
                } 
            },

            scrollItemLeft() {
                let content = document.getElementById('scrollRight');
                
                content.scrollBy(-30, 0); // for left scroll
            },

            scrollItemRight() {
                let content = document.getElementById('scrollRight');
                 
                content.scrollBy(30, 0); // for right scroll 
            },

            selectAction(action) {

                if(this.selectedAction == action) {
                    return this.selectedAction = null;
                }

                this.selectedAction = action;
            },

            executeAction() {
                switch(this.selectedAction) {

                    case 0: {
                        window.e_rpc('server::tunning:start');
                        break;
                    }

                    case 1: {
                        window.e_rpc('server::tunning:repariVehicle');
                        break;
                    }
                }
            }
        } 
    }
</script>