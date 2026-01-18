<template>     
    <!-- eslint-disable vue/no-use-v-if-with-v-for,vue/no-confusing-v-for-v-if -->   
        <div class="absolute w-full h-full text-white font-inter box-border overflow-auto overflow-y-hidden select-none">
            <div v-show="this.war.status" class="absolute flex flex-row justify-center items-start h-[8rem] w-full mt-6" style="zoom:90%;">  
                <div :style="{'color': this.war.attackers == 'Ballas' ? '#9333ea' : this.war.attackers == 'Grove' ? '#16a34a' : this.war.attackers == 'Vagos' ? '#ca8a04' : this.war.attackers == 'Aztecaz' ? '#2563eb' : '#fff'}" class="flex flex-row justify-between bg-[rgba(59,52,98,0.66)] w-[12rem] h-[2.7rem] rounded-l-lg font-bold tracking-wide text-[20px] uppercase font-montserrat">
                    <div class="flex justify-center text-center items-center w-[9rem] font-extrabold">{{ this.war.attackers }}</div>
                    <div class="flex justify-center text-center items-center bg-[rgba(37,32,66,0.95)] h-full w-[3rem] rounded-r-md text-[18px]">{{ this.war.attackersScore }}</div>
                </div>

                <div class="drop-shadow-md flex justify-center items-center text-center bg-[rgba(59,52,98,0.62)] text-white font-bold w-[7rem] h-[2.7rem] text-[20px] font-onest" style="text-shadow: 0px 0px 30px #000;">
                    {{ this.fmtMSS(this.war.time) }}
                </div>

                <div :style="{'color': this.war.defenders == 'Ballas' ? '#9333ea' : this.war.defenders == 'Grove' ? '#16a34a' : this.war.defenders == 'Vagos' ? '#ca8a04' : this.war.defender == 'Aztecaz' ? '#2563eb' : '#fff'}" class="flex flex-row justify-between bg-[rgba(59,52,98,0.66)] w-[12rem] h-[2.7rem] rounded-r-lg font-bold tracking-wide text-[20px] uppercase font-montserrat">
                    <div class="flex justify-center text-center items-center bg-[rgba(37,32,66,0.95)] h-full w-[3rem] rounded-l-md text-[18px]">{{ this.war.defendersScore }}</div>
                    <div class="flex justify-center text-center items-center h-full w-[9rem] font-extrabold">{{ this.war.defenders}}</div>
                </div> 
            </div>
 
            <div class="flex flex-row justify-between w-full h-full">   
 
                <div class="w-[40%] h-full flex flex-col justify-between">  
                    <!---------------------------------- SERVER CHAT ---------------------------------->
                    <div class="flex flex-col w-[90%] h-[30rem] mt-5 ml-[1rem]"> 
                        <div class="group-messages flex flex-col h-[10rem] w-full font-inter text-sm font-normal tracking-wide overflow-y-scroll" :style = "{height: this.chat.page + 'rem'}"> 
                        
                            <div class="chatEntries flex flex-col drop-shadow-lg h-full w-full" :style="{'font-size': this.chat.font + 'px'}"></div> 
                        </div> 
                        
                        <div class="flex flex-col h-[3rem] w-full items-start justify-between mt-4" v-show="this.chat.show"> 
                            
                            <div class="flex flex-row w-full items-center"> 
                                <input class="flex justify-end items-center w-[35rem] h-[2.3rem] p-4 rounded bg-[rgba(59,52,98,0.60)] text-left font-semibold text-sm tracking-wide text-white" maxlength="200" type="text" id = "text" placeholder="Use '/' to execute a command" spellcheck="false" v-model="this.chat.input" v-model.number="this.chat.input" onkeyup="this.value" @keyup.up="this.onArrowUp()" @keyup.down="this.onArrowDown()" @keyup="this.searchCommands()" v-on:keyup.enter="this.sendMessage()">
    
                                <div @click="this.manageChat('container');" class="flex justify-center items-center w-[2.5rem] h-[2.3rem] rounded text-white bg-[rgba(59,52,98,0.60)] ml-2 text-normal hover:bg-[rgba(59,52,98,0.50)]">
                                    <i class="fa-solid fa-gear" :class="{'fa-rotate-270': this.chat.container}"></i>    
                                </div> 
                            </div> 
    
                            <div class="flex flex-row w-[89%] justify-between mt-2">   
                                <div class="flex flex-col w-[13rem] h-[10rem] overflow-y-scroll rounded" :style="{'visibility': this.chat.showCommands && this.player.admin > 0 ? 'visible' : 'hidden'}" style="zoom: 98%">
                                 
                                    <span class="flex flex-row items-center font-medium text-sm tracking-wide" v-for="(item, index) in this.availableCommandsFnc()" :key="item">
                                        
                                        <div class="flex justify-center w-[2rem] h-[1.5rem] text-[12px] rounded items-center bg-purple-500 text-white" v-if="index == 0">TAB</div>
    
                                        <div class="font-medium text-[12px]" :class="{'ml-1': index == 0}">{{ item }}</div>
                                    </span> 
                                </div>
                                 
                                <div class="flex flex-col w-[15rem] h-[20rem] rounded bg-[rgba(59,52,98,0.90)]" v-show="this.chat.container">
                                
                                    <div class="w-full h-[2.6rem] flex flex-col mt-2 ml-2 justify-center text-left ">
                                        <div class="text-sm font-semibold tracking-wide">Font size</div>  
            
                                        <input @change="this.manageChat('font', $event)" v-model="this.chat.font" class="w-[94.5%] h-[5px] mt-1 appearance-none [&::-webkit-slider-runnable-track]:rounded-full bg-[rgb(93,81,158)] rounded-full    
                                        [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[15px] [&::-webkit-slider-thumb]:w-[15px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500" type="range" min="13" max="25">
                                    </div> 
    
                                    <div class="w-full h-[2.6rem] flex flex-col mt-2 ml-2 justify-center text-left ">
                                        <div class="text-sm font-semibold tracking-wide">Page size</div>  
            
                                        <input @change="this.manageChat('page', $event)" v-model="this.chat.page" class="w-[94.5%] h-[5px] mt-1 appearance-none [&::-webkit-slider-runnable-track]:rounded-full bg-[rgb(93,81,158)] rounded-full    
                                        [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[15px] [&::-webkit-slider-thumb]:w-[15px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500" type="range" min="10" max="30">
                                    </div> 
    
                                    <div class="w-[94.5%] h-[2.6rem] flex flex-row mt-2 ml-2 justify-between text-left ">
                                        <div class="text-sm font-semibold tracking-wide">Chat timestamp</div>  
            
                                        <label class="relative inline-flex cursor-pointer ml-2">
                                            <input type="checkbox" value="" class="sr-only peer">
                                            <div class="w-[50px] h-6 bg-[rgb(93,81,158)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-[29px] after:absolute after:top-[2px]  after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                                        </label> 
                                    </div>  
            
                                    <div class="w-[94.5%] h-[2.6rem] flex flex-col mt-2 ml-2 justify-center">
                                        <div class="text-sm font-semibold tracking-wide">Chat category</div>  
    
                                        <div class="flex flex-row items-center mt-2 font-[500] tracking-wide">
                                            <div :class="{'bg-purple-500': this.chat.category === 'local'}" class="w-[5rem] h-[1.8rem] bg-[rgb(93,81,158)] text-sm tracking-wide flex items-center justify-center rounded hover:bg-purple-500" @click = "this.manageChat('category', 'local')">Global</div>
                                            <div :class="{'bg-purple-500': this.chat.category === 'staff'}" class="w-[5rem] h-[1.8rem] bg-[rgb(93,81,158)] text-sm tracking-wide flex items-center justify-center rounded ml-2 hover:bg-purple-500" @click = "this.manageChat('category', 'staff')">Staff</div>
                                            <div :class="{'bg-purple-500': this.chat.category === 'group'}" class="w-[5rem] h-[1.8rem] bg-[rgb(93,81,158)] text-sm tracking-wide flex items-center justify-center rounded ml-2 hover:bg-purple-500" @click = "this.manageChat('category', 'group')">Group</div>
                                        </div>
                                    </div> 
                                </div>
                            </div>
                        </div> 
                    </div>
 
                    <div class="flex flex-col justify-end items-start w-[50%] h-[15rem] mb-20 mr-[18rem] text-black" v-show="this.hitman.show"> 
                        <div class="text-[12px] font-bold tracking-wide text-yellow-500">Task list for your current kill:</div> 
                        <div class="fle flex-col justify-center items-center mt-[2px]">
                            <div class="text-white tracking-wide font-medium text-[13px]">Get equipped for your hit <i v-show="hitman.eqquiped" class="fa-solid fa-circle-check" style="color:#019e57;"></i></div> 
                            <div class="text-white tracking-wide font-medium text-[13px]">Assassinate the target <i v-show="hitman.assasinate" class="fa-solid fa-circle-check" style="color:#019e57;"></i></div>  
                            <div class="text-white tracking-wide font-medium text-[13px]" :style="{opacity: hitman.type == 0 ? '1' : '0.5'}">Assassinate from at least 150m <i v-show="hitman.distance" class="fa-solid fa-circle-check" style="color:#019e57;"></i></div>
                        </div> 
                    </div>
 
                    <div class="flex flex-col justify-center items-center w-[50%] h-[10rem] mb-2 ml-[20rem]">   
                        <div v-if="(this.isVeh || this.radar.status) && this.limit > 0" class="absolute flex justify-center items-center w-[35px] h-[35px] bg-white text-black border-4 border-red-600 rounded-full text-[11px] font-semibold mr-[27.2rem] mt-[4rem]" :style="{animation: this.speed > this.limit && this.limit > 0 ? 'globalPulse 1s infinite' : 'none'}">
                            {{this.limit}}
                        </div>

                        <div class="flex flex-col items-start justify-center font-inter w-full h-full ml-2">    
                            <div class="flex flex-row justify-center items-center mt-2">
                                <div class="flex justify-center items-center bg-indigo-500 rounded w-[35px] h-[35px] text-[20px]">
                                    <i class="fa-solid fa-location-dot"></i>
                                </div>
    
                                <div class="flex flex-col justify-center items-left w-[10rem] ml-2">
                                    <div class="text-indigo-500 tracking-wide text-[14px] font-bold w-[20rem] h-5">{{crossingRoad}}</div>
                                    <div class="text-[13px] font-semibold w-[20rem] h-auto tracking-wide">{{street}}</div>
                                </div>
                            </div>
     
                            <div class="flex flex-row justify-center items-center mt-2">
                                <div class="flex justify-center items-center bg-indigo-500 rounded w-[35px] h-[35px] text-[20px]">
                                    <i class="fa-solid fa-sack-dollar"></i>
                                </div>
    
                                <div class="flex flex-col justify-center items-left w-[10rem] ml-2">
                                    <div class="text-indigo-500 tracking-wide text-[14px] font-bold w-[20rem] h-5 ">Paycheck</div>
                                    <div class="text-[13px] font-semibold w-[20rem] h-auto tracking-wide">{{fmtMSS(paydayTime)}}</div>
                                </div>
                            </div>
      
                            <div class="flex flex-row justify-end items-end mt-2">  
                                <div :class="{'!bg-[linear-gradient(-45deg,#02884c,#017440)] border-[#019e57]': mic}" class="flex justify-center items-center w-[35px] h-[35px] rounded bg-[linear-gradient(-45deg,#e0e0e031,#6d6d6d31)] border-2 border-[#b4b4b431]">
                                    <img width="20" height="20" :src="mic ? 'https://i.imgur.com/ijajHaL.png' : 'https://i.imgur.com/WSQMzrd.png'">  
                                </div>
    
                                <div class="ml-2 flex justify-center items-center w-[35px] h-[35px] rounded bg-[linear-gradient(-45deg,#2989cc60,#2b619f60)] border-2 border-[#44adfd]" v-if="fishzone">
                                    <img width="20" height="20" src="https://i.imgur.com/nKH2nRr.png"> 
                                </div> 
      
                                <div class="ml-2 flex justify-center items-center w-[35px] h-[35px] rounded bg-[linear-gradient(-45deg,#a9641360,#eba83060)] border-2 border-[#fd7d44]" v-if = "farmzone">
                                    <img width="20" height="20" src="https://i.imgur.com/wTsyqx3.png"> 
                                </div>
    
                                <div class="ml-2 flex justify-center items-center w-[35px] h-[35px] rounded bg-[linear-gradient(91.02deg,rgba(50,50,50,0.76)0.84%,rgba(93,146,117,0.038)140%)] border-2 border-[#d3aa51]"  v-if = "taximod ">
                                    <img width="20" height="20" src="https://i.imgur.com/jvIjIsO.png"> 
                                </div>
    
                                <div class="ml-2 flex justify-center items-center w-[35px] h-[35px] rounded bg-[linear-gradient(-45deg,#e9000060,#d6403660)] border-2 border-[#fc3939]" v-if = "adminmod">
                                    <img width="20" height="20" src="https://i.imgur.com/rLcCfkJ.png">
                                </div>  
                                
                                <div class="ml-2 flex justify-center items-center w-[35px] h-[35px] rounded bg-[linear-gradient(-45deg,#e9000060,#d6403660)] border-2 border-[#a30b0b] animate-pulse" v-if="this.wanted.level">
                                    <img width="20" height="20" src="https://i.imgur.com/UA5ty9H.png">
                                </div> 

                                <div class="ml-2 flex justify-center items-center w-[35px] h-[35px] rounded bg-[linear-gradient(-45deg,#02884c,#017440)] border-2 border-[#019e57] animate-pulse" v-if="this.safezone">
                                    <i class="fa-solid fa-shield-heart"></i>
                                </div> 
                                
                                <div class="ml-2 flex flex-col justify-end items-center w-[20px] h-[47px]"> 
                                    <i class="fa-solid fa-droplet mb-1"></i>

                                    <div class="flex flex-col justify-end items-center w-full h-full"> 
                                        <div :class="{'!bg-blue-500': this.water >= 100}" class="w-full h-[3px] bg-[#b4b4b431] rounded-full"></div>
                                        <div :class="{'!bg-blue-500': this.water >= 75}" class="w-full h-[3px] bg-[#b4b4b431] rounded-full mt-[5px]"></div>
                                        <div :class="{'!bg-blue-500': this.water >= 50}" class="w-full h-[3px] bg-[#b4b4b431] rounded-full mt-[5px]"></div>
                                        <div :class="{'!bg-blue-500': this.water > 0}" class="w-full h-[3px] bg-[#b4b4b431] rounded-full mt-[5px]"></div> 
                                    </div> 
                                </div> 

                                <div class="ml-2 flex flex-col justify-end items-center w-[20px] h-[47px]"> 
                                    <i class="fa-solid fa-burger mb-1"></i>

                                    <div class="flex flex-col justify-end items-center w-full h-full"> 
                                        <div :class="{'!bg-orange-500': this.hunger >= 100}" class="w-full h-[3px] bg-[#b4b4b431] rounded-full"></div>
                                        <div :class="{'!bg-orange-500': this.hunger >= 75}" class="w-full h-[3px] bg-[#b4b4b431] rounded-full mt-[5px]"></div>
                                        <div :class="{'!bg-orange-500': this.hunger >= 50}" class="w-full h-[3px] bg-[#b4b4b431] rounded-full mt-[5px]"></div>
                                        <div :class="{'!bg-orange-500': this.hunger > 0}" class="w-full h-[3px] bg-[#b4b4b431] rounded-full mt-[5px]"></div> 
                                    </div> 
                                </div> 
                            </div>   
                        </div> 
                    </div> 
                </div> 
     
                <div class="flex flex-col justify-end items-center w-[20%] h-[98%]">  
                    <div v-if="this.radar.status" class="absolute flex flex-col items-center justify-center mb-12 w-[28rem] h-[10rem] bg-darkBlack rounded" style="zoom: 90%;"> 
                        
                        <div class="flex flex-row items-center justify-center w-[80%] h-[50%] bg-[#5d539e] rounded-full">
                            <div class="flex flex-col items-end justify-center min-w-[8rem] h-auto">
                                <div class="font-bold text-[36px] tracking-wide h-[45px]">{{ this.radar.speed }}</div>
                                <div class="font-semibold text-[13px] tracking-wide h-auto">km/h</div>
                            </div>
                            
                            <div class="flex items-center justify-center h-[90%] w-[4px] bg-white rounded-full ml-4"></div>
 
                            <div class="flex flex-col justify-center items-start h-full min-w-[8rem] ml-4" v-if="this.radar.vehicle"> 
                                <div class="font-semibold text-[20px] tracking-wide">{{ this.radar.vehicle }}</div>
                                <div class="font-semibold text-[13px] tracking-wide">{{ this.radar.distance }}m</div> 
                            </div>
                        </div> 

                        <div class="flex flex-row justify-center items-center w-full mt-3"> 
                            <div @click="this.manageRadar(0)" class="flex justify-center items-center rounded bg-white text-black w-[2rem] h-[2rem] text-[20px] hover:bg-[#5f5f5f] hover:text-white">
                                <i class="fa-solid fa-power-off"></i>
                            </div> 
                         
                            <div @click="this.manageRadar(1)" class="ml-2 flex justify-center items-center rounded bg-white text-black w-[2rem] h-[2rem] text-[20px] hover:bg-[#5f5f5f] hover:text-white">
                                <i class="fa-solid fa-check"></i>
                            </div> 
                        </div>
                    </div> 
                    
                    <div v-if="payday.status" class="payday-block flex flex-col items-center justify-end w-full  animate-openPage"> 
                        <i class="fa-solid fa-sack-dollar text-[3rem] text-indigo-500"></i>
     
                        <div class="text-[2rem] font-bold text-indigo-500 mt-[3px]">PAYDAY</div> 
                        <div class="relative w-[14rem] h-[3px] bg-indigo-200 rounded-full">
                            <div class="line-level relative w-full h-[3px] bg-indigo-500"></div>
                        </div>
      
                        <div class="flex flex-col justify-center items-center mt-[5px] font-medium text-[15px] tracking-wide"> 
                            <span>You played <b>[{{fmtMSS(payday.minutes)}}]</b>.</span> 
                            <span>You received <b style="color: #029251;">${{formatThousands(payday.money)}}.</b></span> 
                            <span>You received <b style="color: #ffb31a;">{{payday.experience}}</b> experience.</span>  
                        </div>
                    </div> 
     
                    <div v-if="interract.status" class="flex flex-col items-center justify-end w-full h-[30%] mb-[4rem]" style="zoom: 80%;">  
                        <i class="fa-solid fa-location-dot text-[4rem]"></i> 
                       
                        <div class="justify-center items-center text-[1.5rem] font-bold mt-[5px]">{{interract.title}}</div> 
                        <div class="flex flex-col justify-center items-center font-[500] text-[16px] tracking-wide opacity-50" v-for = "(item) in interract.subtitle" v-bind:key="item" v-bind:item="item"> 
                            <span>{{item}}</span> 
                        </div>
              
                        <div class="flex flex-row justify-center items-center mt-[10px]">
                            <div class="flex flex-row justify-center items-center ml-2" v-for = "(item) in interract.data" v-bind:key="item" v-bind:item="item"> 
                                <div class="flex justify-center items-center w-[2.5rem] h-[2.5rem] rounded-full border-4 border-indigo-500 text-[1.5rem] font-semibold">{{item.key}}</div>  
                                <div class="tracking-wide font-semibold text-[1rem] ml-2">{{item.text}}</div>
                            </div> 
                        </div> 
                    </div>   
                </div> 
     
                <div class="flex justify-end w-[40%] h-full">
     
                    <div class="flex flex-col w-full h-full mr-4"> 
                        <div class="flex flex-row justify-end mt-4"> 
                           
                            <div class="flex flex-row font-normal text-sm items-center justify-end ml-2 w-[10rem] h-[3rem]"> 
                                <div class="flex justify-center items-center w-[2.2rem] h-[2.2rem] border-2 rounded-full border-[rgba(255,255,255,0.50)] text-[1rem]">
                                    <i class="fa-solid fa-hashtag"></i>
                                </div>
                                
                                <div class="h-[2rem] flex flex-col justify-center items-start ml-2"> 
                                    <div class="text-sm font-[600] tracking-wide">ID</div> 
                                    <div class="text-sm font-[500] tracking-wide text-indigo-500">{{playerId}}</div>  
                                </div>
                            </div>
      
                            <div class="flex flex-row font-normal text-sm items-center justify-end ml-2 w-[10rem] h-[3rem]"> 
                                <div class="flex justify-center items-center w-[2.2rem] h-[2.2rem] border-2 rounded-full border-[rgba(255,255,255,0.50)] text-[1rem]">
                                    <i class="fa-solid fa-user"></i>
                                </div>
    
                                <div class="h-[2rem] flex flex-col justify-center items-start ml-2"> 
                                    <div class="text-sm font-[600] tracking-wide">{{playername}}</div> 
                                    <div class="text-sm font-[500] tracking-wide text-indigo-500">{{online}}/1000</div>  
                                </div>
                            </div>
    
                            <div class="flex flex-row font-normal text-sm items-center justify-end ml-2 w-[10rem] h-[3rem]"> 
                                <div class="flex justify-center items-center w-[2.2rem] h-[2.2rem] border-2 rounded-full border-[rgba(255,255,255,0.50)] text-[1rem]">
                                    <i class="fa-solid fa-calendar-days"></i>
                                </div>
    
                                <div class="h-[2rem] flex flex-col justify-center items-center ml-2"> 
                                    <div class="text-sm font-[600] tracking-wide">{{date}}</div> 
                                    <div class="text-sm font-[500] tracking-wide text-indigo-500">{{time}}</div>  
                                </div>
                            </div>
    
                            <div class="flex flex-row font-normal text-sm items-center justify-end ml-2 w-[5rem] h-[3rem]">  
                                <img src="https://i.imgur.com/AQCNKZ3.png" width="70" height="70"> 
                            </div>  
                        </div> 
    
                        <div class="flex flex-col justify-start items-end min-h-[20rem] mt-4 mr-4">
                             
                            <div class="flex flex-col justify-center font-[600] text-sm tracking-wide h-[3rem] border-2 border-l-0 border-t-0 border-b-0 border-r-indigo-500">  
                                 
                                <div class="flex flex-row justify-end items-end text-right"> 
                                    <div class="font-[600] text-sm tracking-wide drop-shadow-md shadow-black mr-1">${{this.formatThousands(money)}}</div>
     
                                    <div class="flex justify-center w-6 items-center text-indigo-500 font-bold text-[20px] mr-1">
                                        <i class="fa-solid fa-dollar-sign"></i>
                                    </div>  
                                </div>
    
                                <div class="flex flex-row justify-end items-end text-right mt-[0.5px]"> 
                                    <div class="font-[600] text-sm tracking-wide drop-shadow-md shadow-black mr-1">${{this.formatThousands(bank)}}</div>
     
                                    <div class="flex justify-center w-6 items-center text-indigo-500 font-bold text-[20px] mr-1">
                                        <i class="fa-solid fa-wallet"></i>
                                    </div>  
                                </div>  
                            </div>  
    
                            <div class="flex flex-row justify-center items-center mt-8" v-if="this.jail"> 
                                <div class="text-sm font-[600] tracking-wide mr-2">JAIL TIME {{this.fmtMSS(jail)}}</div>
    
                                <div class="w-[28px] h-[26px] bg-yellow-600 text-sm flex justify-center items-center rounded">
                                    <i class="fa-solid fa-handcuffs"></i> 
                                </div>  
                            </div>
    
                            <div class="flex flex-row justify-center items-center mt-2" v-if="this.wanted.level && !this.jail"> 
                                <div class="text-sm font-[600] tracking-wide mr-2">WANTED EXPIRES IN: {{this.fmtMSS(this.wanted.time)}}</div>
    
                                <div class="w-[28px] h-[26px] bg-red-600 text-sm flex justify-center items-center rounded">
                                    <i class="fa-solid fa-handcuffs"></i> 
                                </div>  
                            </div>  
    
                            <div v-if="this.dailyQuest.status" class="dailyQuest-container flex flex-row w-full h-[4rem] justify-end items-center mt-2 animate-openPage"> 
                                <div class="flex flex-col justify-center items-start h-full mr-2"> 
                                    <div class="flex items-end text-right justify-end text-[13.2px] font-bold mr-2 tracking-wide w-full shadow-custom">{{this.dailyQuest.name}}</div>
                                    
                                    <div class="flex flex-row-reverse justify-end items-end w-full mt-1">
                                        <div class="relative w-[3rem] h-[8px] rounded-full mx-1 bg-[rgba(170,167,167,0.57)]" v-for="(index) in this.dailyQuest.maxProgress" :key="index">
                                            <div class="line-level relative w-full h-[8px] rounded-full bg-purple-600" v-show="this.dailyQuest.progress >= index"></div>
                                        </div>  
                                    </div> 
                                </div>
     
                                <i class="fa-solid fa-trophy text-[2rem] mr-2 text-purple-600"></i> 
                            </div>
                        </div> 
    
                        <div class="flex justify-center items-end min-h-[22rem] flex-col mr-4" :style="{'visibility': this.hotkeys ? 'visible' : 'hidden'}">
                            <div class="flex flex-row justify-center items-center mt-2">
                                <div class="flex justify-center items-center w-[32px] h-[32px] rounded font-bold bg-white text-black">{{binds['TALK'].key}}</div>
                                <svg class="ml-4 w-[1.5rem] h-[1.5rem] opacity-50" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 512 512" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 512 512"><g><g><path d="m439.5,236c0-11.3-9.1-20.4-20.4-20.4s-20.4,9.1-20.4,20.4c0,70-64,126.9-142.7,126.9-78.7,0-142.7-56.9-142.7-126.9 0-11.3-9.1-20.4-20.4-20.4s-20.4,9.1-20.4,20.4c0,86.2 71.5,157.4 163.1,166.7v57.5h-23.6c-11.3,0-20.4,9.1-20.4,20.4 0,11.3 9.1,20.4 20.4,20.4h88c11.3,0 20.4-9.1 20.4-20.4 0-11.3-9.1-20.4-20.4-20.4h-23.6v-57.5c91.6-9.3 163.1-80.5 163.1-166.7z"/><path d="m256,323.5c51,0 92.3-41.3 92.3-92.3v-127.9c0-51-41.3-92.3-92.3-92.3s-92.3,41.3-92.3,92.3v127.9c0,51 41.3,92.3 92.3,92.3zm-52.3-220.2c0-28.8 23.5-52.3 52.3-52.3s52.3,23.5 52.3,52.3v127.9c0,28.8-23.5,52.3-52.3,52.3s-52.3-23.5-52.3-52.3v-127.9z"/></g></g></svg>
                            </div> 
    
                            <div class="flex flex-row justify-center items-center mt-2">
                                <div class="flex justify-center items-center w-[32px] h-[32px] rounded font-bold bg-white text-black">{{binds['PROFILE & SETTINGS'].key}}</div>
                                <svg class="ml-4 w-[1.5rem] h-[1.5rem] opacity-50" version="1.1" id="Capa_1" fill="#fff" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 384.97 384.97" style="enable-background:new 0 0 384.97 384.97;" xml:space="preserve"><g><g id="Grid"><path d="M144.364,0H24.061C10.767,0,0,10.767,0,24.061v120.303c0,13.281,10.767,24.061,24.061,24.061h120.303 c13.293,0,24.061-10.779,24.061-24.061V24.061C168.424,10.767,157.657,0,144.364,0z M144.364,144.364H24.061V24.061h120.303 V144.364z"/><path d="M360.909,0H240.606c-13.293,0-24.061,10.767-24.061,24.061v120.303c0,13.281,10.767,24.061,24.061,24.061h120.303 c13.281,0,24.061-10.779,24.061-24.061V24.061C384.97,10.767,374.191,0,360.909,0z M360.909,144.364H240.606V24.061h120.303 V144.364z"/><path d="M360.909,216.545H240.606c-13.293,0-24.061,10.779-24.061,24.061v120.303c0,13.293,10.767,24.061,24.061,24.061h120.303 c13.281,0,24.061-10.767,24.061-24.061V240.606C384.97,227.313,374.191,216.545,360.909,216.545z M360.909,360.909H240.606 V240.606h120.303V360.909z"/><path d="M144.364,216.545H24.061C10.767,216.545,0,227.325,0,240.606v120.303c0,13.293,10.767,24.061,24.061,24.061h120.303 c13.293,0,24.061-10.767,24.061-24.061V240.606C168.424,227.313,157.657,216.545,144.364,216.545z M144.364,360.909H24.061 V240.606h120.303V360.909z"/></g><g></g><g></g><g></g><g></g><g></g><g></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
                            </div>
    
                            <div class="flex flex-row justify-center items-center mt-2">
                                <div class="flex justify-center items-center w-[32px] h-[32px] rounded font-bold bg-white text-black">{{binds['INVENTORY'].key}}</div>
                                <svg class="ml-4 w-[1.5rem] h-[1.5rem] opacity-50" version="1.1" id="Capa_1" fill="#fff" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="45.875px" height="45.875px" viewBox="0 0 45.875 45.875" style="enable-background:new 0 0 45.875 45.875;" xml:space="preserve"><g><path d="M39.961,19.971v-1.31c0-5.47-3.067-9.938-7.349-11.269C31.447,3.139,27.557,0,22.939,0c-4.619,0-8.508,3.138-9.676,7.391 c-4.278,1.33-7.348,5.798-7.348,11.269v1.31c-2.988,0.343-5.311,2.878-5.311,5.958v13.947c0,3.312,2.687,6,6,6 c0.955,0,1.854-0.229,2.654-0.625c0.803,0.396,1.701,0.625,2.656,0.625h22.049c0.93,0,1.834-0.223,2.654-0.626 c0.801,0.397,1.698,0.626,2.653,0.626c3.313,0,6-2.688,6-6V25.928C45.273,22.848,42.95,20.312,39.961,19.971z M22.94,5 c1.621,0,3.051,0.783,3.977,1.977h-7.951C19.888,5.784,21.318,5,22.94,5z M31.607,39.105H14.274c-1.657,0-3-1.344-3-3 c0-6.435,5.233-11.668,11.667-11.668c6.435,0,11.666,5.232,11.666,11.668C34.607,37.762,33.263,39.105,31.607,39.105z"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
                            </div>
    
                            <div class="flex flex-row justify-center items-center mt-2">
                                <div class="flex justify-center items-center w-[32px] h-[32px] rounded font-bold bg-white text-black">{{binds['PHONE'].key}}</div>
                                <svg class="ml-4 w-[1.5rem] h-[1.5rem] opacity-50" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="365.449px" height="365.449px" viewBox="0 0 365.449 365.449" style="enable-background:new 0 0 365.449 365.449;" xml:space="preserve"><g><path d="M281.507,10.85C274.279,3.614,265.71,0,255.813,0H109.637c-9.9,0-18.464,3.617-25.697,10.85 c-7.233,7.229-10.85,15.796-10.85,25.693v292.361c0,9.896,3.617,18.462,10.85,25.693c7.233,7.234,15.797,10.852,25.697,10.852 h146.176c9.896,0,18.466-3.621,25.693-10.852c7.234-7.231,10.852-15.797,10.852-25.693V36.543 C292.358,26.646,288.745,18.083,281.507,10.85z M159.885,36.543h45.685c3.046,0,4.565,1.523,4.565,4.569 c0,3.045-1.52,4.57-4.565,4.57h-45.685c-3.045,0-4.568-1.525-4.568-4.57C155.316,38.066,156.839,36.543,159.885,36.543z  M198.861,345.036c-4.476,4.469-9.852,6.707-16.135,6.707c-6.28,0-11.656-2.238-16.13-6.707c-4.474-4.477-6.711-9.856-6.711-16.132 c0-6.283,2.24-11.66,6.711-16.133c4.471-4.469,9.851-6.714,16.13-6.714c6.284,0,11.66,2.245,16.135,6.714 c4.473,4.473,6.708,9.85,6.708,16.133S203.331,340.56,198.861,345.036z M264.954,283.225c0,2.471-0.903,4.62-2.714,6.424 c-1.813,1.807-3.949,2.707-6.42,2.707H109.637c-2.474,0-4.615-0.903-6.423-2.707s-2.712-3.953-2.712-6.424V82.229 c0-2.474,0.903-4.617,2.712-6.423c1.809-1.805,3.949-2.714,6.423-2.714h146.176c2.478,0,4.616,0.905,6.427,2.714 c1.811,1.807,2.71,3.949,2.71,6.423v200.995H264.954z" id="id_102" style="fill: rgb(255, 255, 255);"></path></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
                            </div> 
    
                            <div v-if="isVeh" class="flex flex-row justify-center items-center mt-2">
                                <div class="flex justify-center items-center w-[32px] h-[32px] rounded font-bold bg-white text-black">{{binds['VEHICLE ENGINE'].key}}</div>
                                <svg class="ml-4 w-[1.5rem] h-[1.5rem] opacity-50" width="250" height="250" viewBox="0 0 250 250" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M172.535 23H103.908L76.4668 133.681H103.964L80.5839 228H88.8202L168.412 117.315H128.091L172.535 23Z" fill="white"/></svg>
                            </div>
    
                            <div v-if="isVeh" class="flex flex-row justify-center items-center mt-2">
                                <div class="flex justify-center items-center w-[32px] h-[32px] rounded font-bold bg-white text-black">{{binds['VEHICLE SEATBELT'].key}}</div>
                                <svg class="ml-4 w-[1.5rem] h-[1.5rem] opacity-50" width="250" height="250" viewBox="0 0 250 250" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path d="M142.909 61.9144L121.599 82.5518L168.831 128.292L190.141 107.656L194.883 92.5338L158.524 57.3223L142.909 61.9144ZM164.895 101.611L149.151 86.3637L157.023 78.7396L172.767 93.9868L164.895 101.611Z" fill="white"/><path d="M29.998 194.131L53.6143 217.002L86.1721 185.472L62.5558 162.602L29.998 194.131Z" fill="white"/><path d="M90.1095 113.047L68.7998 133.683L64.0576 148.806L100.417 184.016L116.032 179.425L137.343 158.787L125.534 147.352L149.151 124.482L125.534 101.611L101.918 124.482L90.1095 113.047ZM101.918 162.599L86.1737 147.352L94.0457 139.728L109.79 154.976L101.918 162.599Z" fill="white"/><path d="M196.382 33.0006L172.766 55.8711L196.381 78.7411L219.998 55.8706L196.382 33.0006Z" fill="white"/></g><defs><clipPath id="clip0"><rect width="190" height="184" fill="white" transform="translate(30 33)"/></clipPath></defs></svg>
                            </div>
    
                            <div v-if="isVeh" class="flex flex-row justify-center items-center mt-2">
                                <div class="flex justify-center items-center w-[32px] h-[32px] rounded font-bold bg-white text-black">{{binds['VEHICLE LOCK'].key}}</div>
                                <svg class="ml-4 w-[1.5rem] h-[1.5rem] opacity-50" width="250" height="250" viewBox="0 0 250 250" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path d="M106.25 82.0845C107.209 82.0845 108.169 81.6652 108.901 80.8271L116.401 72.2439C117.866 70.5674 117.866 67.8516 116.401 66.1754C114.936 64.4988 112.563 64.4988 111.099 66.1754L103.599 74.7586C102.134 76.4352 102.134 79.151 103.599 80.8271C104.331 81.6656 105.29 82.0845 106.25 82.0845Z" fill="white"/><path d="M126.099 66.1754L103.599 91.9254C102.134 93.602 102.134 96.3178 103.599 97.994C104.331 98.832 105.291 99.2513 106.25 99.2513C107.21 99.2513 108.169 98.832 108.902 97.994L131.402 72.2439C132.867 70.5674 132.867 67.8516 131.402 66.1754C129.937 64.4988 127.564 64.4988 126.099 66.1754Z" fill="white"/><path d="M212.531 45.3786C208.547 36.2546 200.529 30.584 191.61 30.584H118.942C105.028 30.584 91.7465 37.4069 82.5019 49.3099L47.2887 94.6407C39.3444 104.863 34.971 118.027 35.0001 132.26L41.2745 187.649C42.1717 195.587 45.3913 203.081 50.3395 208.739C56.3572 215.625 64.3567 219.418 72.8687 219.418H199.998C208.272 219.418 215 211.718 215 202.251V57.3483C215 53.2158 214.147 49.0753 212.531 45.3786ZM64.1285 111.744L99.3361 66.4179C104.317 60.0098 111.469 56.334 118.958 56.334H191.614C191.962 56.334 192.252 56.5352 192.501 57.3483V125.001H57.8004C58.4891 120.458 60.4114 116.539 64.1285 111.744ZM196.25 185.084H61.2503C59.1774 185.084 57.5001 183.164 57.5001 180.792C57.5001 178.42 59.1774 176.501 61.2503 176.501H196.25C198.323 176.501 200 178.42 200 180.793C200 183.165 198.323 185.084 196.25 185.084ZM196.25 159.334H173.75C171.677 159.334 170 157.414 170 155.042C170 152.67 171.677 150.75 173.75 150.75H196.25C198.323 150.75 200 152.67 200 155.042C200 157.415 198.323 159.334 196.25 159.334Z" fill="white"/></g><defs><clipPath id="clip0"><rect width="180" height="206" fill="white" transform="translate(35 22)"/></clipPath></defs></svg>
                            </div>   
                        </div>
 
                        <div v-show="this.isVeh" class="flex h-[15rem] flex-col justify-end items-end mr-4">  
                             <div class="flex flex-row-reverse justify-start"> 
                                <div class="flex flex-row justify-center h-[4.4rem]"> 
    
                                    <div class="flex justify-end items-end text-[15px] opacity-50 mr-2">
                                        <i class="fa-solid fa-gas-pump fa-icon"></i> 
                                    </div>
      
                                    <div class="relative w-[5px] h-[70px] rounded bg-[rgba(160,160,160,0.40)] rotate-180">
                                        <div class="block relative w-[5px] h-[20%] rounded bg-[#FF8008]" :style = "{height: this.fuel + '%'}"></div> 
                                    </div> 
                                </div> 
               
                                <div class="flex flex-col min-w-[5rem] mr-5"> 
                                    <div class="flex items-end justify-end text-sm font-normal opacity-50">km/h</div> 
                                    <div class="font-bold text-[45px]  flex items-end justify-end">{{this.speed}}</div>  
                                </div>   
                            </div>   
                       
                            <div class="flex flex-col mt-1">  
                                <div class="flex flex-row-reverse items-center"> 
                                    <img class="opacity-75" :style="{'opacity': this.engine ? '1' : '0.5'}" src="https://i.imgur.com/oIsYnin.png" width="18" height="18"> 
                                    <img class="mx-3 opacity-75" :style="{'opacity': this.doors ? '1' : '0.5'}" src="https://i.imgur.com/jnU3MO2.png" width="18" height="18"> 
                                    <img class="opacity-75" :style="{'opacity': this.belt ? '1' : '0.5'}" src="https://i.imgur.com/z32AvJa.png" width="18" height="18">  
                                </div>  
                                <div class="flex items-end justify-end font-bold" v-if="this.odometer">{{this.formatKM(this.odometer)}}</div>
                            </div>   
                        </div>   
  
                        <div v-show="this.war.status" :class="{'!mt-[15rem]': !this.isVeh}" class="flex h-[3.5rem] w-full justify-end items-center mr-4">   
                            <div class="flex flex-row justify-center items-center h-[2.5rem] w-[31rem] bg-[rgba(59,52,98,0.66)] rounded" style="zoom:88%;">   
                                <div class="flex flex-row  justify-between items-center text-white w-[6rem] h-full font-inter ">
                                    <div class="flex justify-center text-center items-center bg-white text-black h-[2rem] w-[2rem] rounded text-[18px] font-bold">{{ this.userWar.kills }}</div>
                                    <div class="flex justify-center text-center items-center font-semibold tracking-wide text-[15px] ml-1 font-montserrat">Kills</div> 
                                    <div class="flex justify-end items-end h-full w-[1.5px] bg-white ml-2 opacity-40"></div>
                                </div>

                                <div class="flex flex-row  justify-between items-center text-white w-[7rem] h-full font-inter ml-2">
                                    <div class="flex justify-center text-center items-center bg-white text-black h-[2rem] w-[2rem] rounded text-[18px] font-bold">{{ this.userWar.assists }}</div>
                                    <div class="flex justify-center text-center items-center font-semibold tracking-wide text-[15px] ml-1 font-montserrat">Assists</div> 
                                    <div class="flex justify-end items-end h-full w-[1.5px] bg-white ml-2 opacity-40"></div>
                                </div>

                                <div class="flex flex-row  justify-between items-center text-white w-[7rem] h-full font-inter  ml-2">
                                    <div class="flex justify-center text-center items-center bg-white text-black h-[2rem] w-[2rem] rounded text-[18px] font-bold">{{ this.userWar.deaths }}</div>
                                    <div class="flex justify-center text-center items-center font-semibold tracking-wide text-[15px] ml-1 font-montserrat">Deaths</div>
                                    <div class="flex justify-end items-end h-full w-[1.3px] bg-white ml-2 opacity-40"></div>
                                </div>

                                <div class="flex flex-row justify-center items-center text-white w-[8rem] h-full font-inter ml-2">
                                    <div class="flex justify-center text-center items-center bg-white text-black h-[2rem] w-[4rem] rounded text-[18px] font-bold">{{ this.fmtMSS(this.userWar.time) }}</div>
                                    <div class="flex justify-center text-center items-center font-semibold tracking-wide text-[15px] ml-1 font-montserrat">On turf</div>  
                                </div>
                            </div>
                        </div> 
                    </div> 
                </div> 
 
                <div v-show="this.war.showWarStats" class="absolute z-10 flex items-center flex-col w-full h-full font-montserrat animate-openPage">
                    <div class="background-global-effect"></div>

                    <div class="w-full h-full flex flex-col"> 
                        <div class="w-full h-[7rem] flex flex-row mt-[3rem]">
    
                            <div class="w-[40%] h-full justify-center text-left items-start">

                                <div class="w-full h-[6rem] flex flex-row items-center">
                                    <div class="flex flex-col items-start w-full font-bold ml-[2rem]"> 
                                        <div class="flex flex-col justify-center items-center text-blue-500 font-extrabold text-[2rem]">
                                            ATTACKING
                                        </div> 

                                        <div class="flex flex-col justify-center items-center text-white font-extrabold text-[1.8rem] h-[1rem]" :style="{'color': this.war.attackers == 'Ballas' ? '#9333ea' : this.war.attackers == 'Grove' ? '#16a34a' : this.war.attackers == 'Vagos' ? '#ca8a04' : this.war.attackers == 'Aztecaz' ? '#2563eb' : '#fff'}">
                                            {{this.war.attackers}}
                                        </div>
                                    </div>

                                    <div class="flex flex-col justify-center items-end w-full h-full text-[3.2rem] font-bold" style="text-shadow: 0px 0px 20px rgb(37, 99, 235);"> 
                                        {{this.war.attackersScore}}
                                    </div>
                                </div> 
                            </div>

                            <div class="w-[20%] h-full justify-center text-center items-center">
                                <div class="w-full h-[6rem] justify-center text-center items-center font-extrabold text-[4rem]">VS</div> 
                            </div> 

                            <div class="w-[40%] h-full justify-center text-left items-start">

                                <div class="w-full h-[6rem] flex flex-row items-center"> 
                                    <div class="flex flex-col justify-center items-start w-full h-full text-[3.2rem] font-bold" style="text-shadow: 0px 0px 20px rgb(239, 68, 68);"> 
                                        {{this.war.defendersScore}}
                                    </div>

                                    <div class="flex flex-col items-end w-full font-bold mr-[2rem]"> 
                                        <div class="flex flex-col justify-center items-center text-red-500 font-extrabold text-[2rem]">
                                            DEFENDING
                                        </div> 

                                        <div class="flex flex-col justify-center items-center text-white font-extrabold text-[1.8rem] h-[1rem]" :style="{'color': this.war.defenders == 'Ballas' ? '#9333ea' : this.war.defenders == 'Grove' ? '#16a34a' : this.war.defenders == 'Vagos' ? '#ca8a04' : this.war.defender == 'Aztecaz' ? '#2563eb' : '#fff'}">
                                            {{this.war.defenders}}
                                        </div>
                                    </div>
                                </div> 
                            </div>
                        </div>


                        <div class="h-full w-full justify-between text-center flex flex-row" style="zoom: 90%;"> 
                            <div class="w-[40%] h-full flex flex-row justify-start items-start mt-[1rem]"> 
                                <table class="w-full h-full flex flex-col items-end"> 
                                    <thead class="flex flex-row text-white">
                                        <tr> 
                                            <th class="w-[12rem] h-[28px] text-[12px] text-left"><i class="fa-solid fa-signature"></i> NAME</th>
                                            <th class="w-[8rem] h-[28px] text-[12px] text-right"><i class="fa-solid fa-bookmark"></i> SCORE</th> 
                                            <th class="w-[8rem] h-[28px] text-[12px] text-right"><i class="fa-solid fa-skull-crossbones"></i> KILLS</th> 
                                            <th class="w-[8rem] h-[28px] text-[12px] text-right"><i class="fa-solid fa-skull"></i> DEATHS</th> 
                                            <th class="w-[8rem] h-[28px] text-[12px] text-right"><i class="fa-solid fa-handshake"></i> ASSISTS</th> 
                                        </tr>
                                    </thead>

                                    <tbody class="flex flex-col overflow-y-scroll mt-2 h-[30rem]" v-if="this.war.members.length">
                                        <tr class="flex flex-row w-full" v-for="(item, index) in this.war.members.filter(property => property.group == this.war.attackers).sort((a, b) => ((b.kills + b.assists + b.time) - b.deaths) - ((a.kills + a.assists + a.time) - a.deaths))" :key="item">  
                                            <th class="flex flex-row items-center w-[12rem] min-h-[3rem] tracking-wide text-xs">
                                        
                                                <img class="mr-2 rounded-full" :src="item.photo" width="35" height="35">
                                                
                                                <div class="flex flex-col justify-center items-center h-full font-montserrat text-[14px] font-semibold tracking-wide  text-left">
                                                    <div class="w-full">
                                                        {{item.name}} <i v-if="index == 0" class="fa-solid fa-medal text-yellow-600 text-[18px]"></i>
                                                    </div>
                                                    <div class="text-[12px] font-medium tracking-wide opacity-50">{{this.fmHoursMinutesSeconds(item.time)}} on turf</div>
                                                </div>  

                                                 
                                            </th>

                                            <th class="flex flex-row items-center justify-end w-[8rem] min-h-[3rem] font-bold tracking-wide text-sm">
                                                {{(item.kills + item.assists) - item.deaths}}
                                            </th> 

                                            <th class="flex flex-row items-center justify-end w-[8rem] min-h-[3rem] font-semibold tracking-wide text-[13px]">
                                                {{item.kills}}
                                            </th> 

                                            <th class="flex flex-row items-center justify-end w-[8rem] min-h-[3rem] font-semibold tracking-wide text-[13px]">
                                                {{item.deaths}}
                                            </th> 

                                            <th class="flex flex-row items-center justify-end w-[8rem] min-h-[3rem] font-semibold tracking-wide text-[13px]">
                                                {{item.assists}}
                                            </th> 
                                        </tr>   
                                    </tbody>
                                </table>   
                            </div>  

                            <div class="w-[40%] h-full flex flex-row ml-[2rem] mt-[1rem]"> 
                                <table class="w-full h-full"> 
                                    <thead class="flex flex-row items-start text-white w-full">
                                        <tr> 
                                            <th class="w-[12rem] h-[28px] text-[12px] text-left"><i class="fa-solid fa-signature"></i> NAME</th>
                                            <th class="w-[8rem] h-[28px] text-[12px] text-right"><i class="fa-solid fa-bookmark"></i> SCORE</th> 
                                            <th class="w-[8rem] h-[28px] text-[12px] text-right"><i class="fa-solid fa-skull-crossbones"></i> KILLS</th> 
                                            <th class="w-[8rem] h-[28px] text-[12px] text-right"><i class="fa-solid fa-skull"></i> DEATHS</th> 
                                            <th class="w-[8rem] h-[28px] text-[12px] text-right"><i class="fa-solid fa-handshake"></i> ASSISTS</th> 
                                        </tr>
                                    </thead>

                                    <tbody class="flex flex-col overflow-y-scroll w-full mt-2 h-[30rem]" v-if="this.war.members.length"> 
                                        <tr class="flex flex-row w-full" v-for="(item, index) in this.war.members.filter(property => property.group == this.war.defenders).sort((a, b) => ((b.kills + b.assists + b.time) - b.deaths) - ((a.kills + a.assists + a.time) - a.deaths))" :key="item">  
                                            
                                            <th class="flex flex-row items-center w-[12rem] min-h-[3rem] tracking-wide text-xs"> 
                                                <img class="mr-2 rounded-full" :src="item.photo" width="35" height="35">
                                                
                                                <div class="flex flex-col justify-center items-center h-full font-montserrat text-[14px] font-semibold tracking-wide  text-left">
                                                    <div class="w-full">
                                                        {{item.name}} <i v-if="index == 0" class="fa-solid fa-medal text-yellow-600 text-[18px]"></i>
                                                    </div>
                                                    <div class="text-[12px] font-medium tracking-wide opacity-50">{{this.fmHoursMinutesSeconds(item.time)}} on turf</div>
                                                </div>  
                                            </th>

                                            <th class="flex flex-row items-center justify-end w-[8rem] min-h-[3rem] font-bold tracking-wide text-sm">
                                                {{(item.kills + item.assists) - item.deaths}}
                                            </th> 

                                            <th class="flex flex-row items-center justify-end w-[8rem] min-h-[3rem] font-semibold tracking-wide text-[13px]">
                                                {{item.kills}}
                                            </th> 

                                            <th class="flex flex-row items-center justify-end w-[8rem] min-h-[3rem] font-semibold tracking-wide text-[13px]">
                                                {{item.deaths}}
                                            </th> 

                                            <th class="flex flex-row items-center justify-end w-[8rem] min-h-[3rem] font-semibold tracking-wide text-[13px]">
                                                {{item.assists}}
                                            </th> 
                                        </tr>  
                                    </tbody>
                                </table>   
                            </div>  
                        </div>  
                    </div> 
                </div> 
            </div>
        </div>  
    </template>
      
    <script>
        import $ from "jquery";
    
        export default {
            name: 'HudComponent',
    
            mounted() 
            { 
                window.HudComponent = this;   
 
                if(window.mp) {
                    window.e_rpc.add('showQuestProgress', (data) => {
                        this.dailyQuest = JSON.parse(data);
     
                        if(this.dailyQuest.timeout == null) {
                            this.dailyQuest.timeout = setTimeout(() => {
                                
                                document.querySelector('.dailyQuest-container').style = 'animation: fadeOut 0.5s linear forwards;';  
    
                                this.dailyQuest.status = false; 
                                clearTimeout(this.dailyQuest.timeout);
                                this.dailyQuest.timeout = null;
    
                            }, 5000);   
                        } 
                    });
             
                    window.e_rpc.add('setChatGrades', (data) => {
                        const raw = JSON.parse(data);
     
                        this.player = {
                            admin: raw.admin,
                            group: raw.group,
                        }
    
                        if(raw.reload) {
                            this.chat.category = 'local'; 
                            this.updateChat();
                        }  
                    });

                    window.e_rpc.add('showWarHud', (data) => {
                        const raw = JSON.parse(data);
     
                        this.war = raw.war;
                        this.userWar = raw.userWar; 
                    });  
                }    
            },
     
            data: function() {
                return {
                    money: 10000000, 
                    bank: 5999, 
                    time: '20:28', date: '28:11:2023',
    
                    street: "Train station", crossingRoad: "Crosing road LS", 
                    playerId : 0, 
                    playername: 'MihaiADV',
                    paydayTime: 3600,
                    online: 74,	 
                    server: 'Apex Roleplay', 
                    mic: false,
                    greenzone: false,
                    fishzone: false,
                    farmzone: false,
                    adminmod: false,
                    taximod: false, 
       
                    water: 25,
                    hunger: 25,

                    safezone: false,
            
                    jail: 0, //1800seconds - 30 minutes
                    wanted: { level: 0, time: 0, reporters: [], reasons: [] },
                    hotkeys: true,
    
                    finding: false,
                    findingText: '',
    
                    isVeh: false,
                    speed: 100,
                    fuel: 100,
                    limit: 0,
                    engine: false,
                    doors: false,
                    belt: false, 
                    odometer: 0,
                    binds: {  
                        "CHAT": {"id":84,"has":"0x54","key":"T"},
                        "TALK":{"id":66,"has":"0x42","key":"B"},
                        "PHONE":{"id":38,"has":"0x26","key":"UP"},
                        "INVENTORY":{"id":89,"has":"0x59","key":"Y"},
                        "PROFILE & SETTINGS":{"id":77,"has":"0x4D","key":"M"},
                        "PLAYERS LIST":{"id":90,"has":"0x5A","key":"Z"},
                        "VEHICLE LOCK":{"id":76,"has":"0x4C","key":"L"},
                        "VEHICLE ENGINE":{"id":50,"has":"0x32","key":"2"},
                        "VEHICLE SEATBELT":{"id":71,"has":"0x47","key":"G"} 
                    }, 
    
                    interract: { status: false, title: 'Los Santos Police', subtitle: ['Los Santos HQ', 'Los Santos HQ'], data: [{key: 'E', text: 'Enter HQ'}, {key: 'E', text: 'Enter HQ'}, {key: 'E', text: 'Enter HQ'}] }, 
                    hitman: { show: false, type: 0, eqquiped: true, assasinate: false, distance: false },
                    payday: { status: false, minutes: 20, money: 2000, experience: 20, interval: null },
    
                    dailyQuest: {
                        status: false, 
                        timeout: null,
    
                        name: 'დაიჭირე 5 თევზი',
                        progress: 0,
                        maxProgress: 0
                    },
     
                    messages: { 
                        'local': [], 
                        'staff': [], 
                        'group': [] 
                    },
    
                    chat: {
                        show: false,
    
                        font: 13,
                        page: 10,

                        timeout: null,
    
                        input: '', 
                        history: -1,
                        lasts: [],
                        showCommands: false,
    
                        timestamp: false,
                        container: false,
                        category: 'local'
                    },
    
                    player: {
                        admin: 0,
                        group: 0,
                    },
    
                    availableCommands: ['/goto', '/gethere', '/spawn', '/respawn', '/settime', '/gotom', '/gotofaction', '/gotojob', '/spawncar', '/dl', '/gotocar', '/getcar', '/mark', '/gotomark', '/givegun', '/disarm', '/slap', '/fv', '/freeze', '/unfreeze', '/gotods', '/gotospawn', '/aa2', '/heal', '/healme', '/mute', '/unmute', '/anno', '/setadmin', '/sethelper', '/reports', '/cr', '/warn', '/unwarn', '/vre', '/ban', '/kick', '/checkv', '/set', '/createsafezone'],
                    
                    radar: {
                        status: false,
                        speed: 0, 
                        vehicle: '',
                        distance: 0,
                    },

                    war: {
                        status: false, 

                        attackers: 'Ballas',
                        attackersScore: 49,

                        defenders: 'Vagos',
                        defendersScore: 65, 
                        time: 0,
 
                        showWarStats: false,
                        members: []
                    },

                    userWar: {
                        kills: 0, 
                        deaths: 0, 
                        assists: 0, 
                        time: 100
                    },

                    factionColors: {
                        'Ballas': '#9333ea',
                        'Grove': '#16a34a',
                        'Vagos': '#ca8a04',
                        'Aztecaz': '#2563eb',
                    } 
                };
            }, 
             
            methods: 
            {   
                calculateBestScore(group) {  
                    return this.war.members.sort((a, b) => (b.group == group && (b.kills + b.assists + b.time) - b.deaths) - (a.group == group && (a.kills + a.assists + a.time) - a.deaths))[0]
                },
                 
                showHudData(playerID, money, bank, admin, taxi, players, serverName, hungerP, waterP, wanted, jailTime, binds, showHotkeys, playername, payday) 
                {
                    this.playerId = playerID;
                    this.playername = playername;
                    this.paydayTime = payday;
                    this.money = money;
                    this.bank = bank;
                    this.online = players;
                    this.adminmod = admin;
                    this.taximod = taxi;
                    this.server = serverName;
    
                    this.hunger = hungerP;
                    this.water = waterP;
    
                    this.wanted = wanted; 
                    this.jail = jailTime;
    
                    this.binds = binds;
                    this.hotkeys = showHotkeys; 
                },
    
                formatKM(x) { 
                    return x.toString().replace(/\B(?=(\d{2})+(?!\d))/g, ".")
                },
    
                formatThousands(x) {
                    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); 
                },
    
                fmtMSS(s) {
                    return (s-(s%=60))/60+(9<s?':':':0') + s
                },

                fmHoursMinutesSeconds(seconds) {
                    return [
                        parseInt(seconds / 60 / 60),
                        parseInt(seconds / 60 % 60),
                        parseInt(seconds % 60)
                    ]
                    .join(":")
                    .replace(/\b(\d)\b/g, "0$1")
                },
    
                setStreet(data) { 
                    this.street = data.street;
                    this.crossingRoad = data.area;
                },
     
                showPayday(data) { 
                    this.payday = data;
                    let count = 100;
    
                    if(this.payday.interval == null)
                    {
                        this.payday.interval = setInterval(() => {
    
                            count --;
    
                            if(count == 0)
                            {  
                                document.querySelector('.payday-block').style = 'animation: fadeOut 0.5s linear forwards;';  
     
                                setTimeout(() => {
    
                                    this.payday.status = false; 
                                    clearInterval(this.payday.interval);
                                    this.payday.interval = null;
        
                                }, 500); 
                            }
    
                            return document.querySelector('.line-level').style = `width: ${count}%;`;
                        }, 100);  
                    }      
                },
     
                showInterract(statuss, titles, subtitle, datas) { 
                    if(statuss != false)
                    {
                        this.interract.title = titles; 
                        this.interract.subtitle = subtitle;
                        this.interract.data = datas;
                    } 
                    
                    return this.interract.status = statuss; 
                },
    
                setTime(time, date, payday) {
                    this.time = time;
                    this.date = date;
    
                    this.paydayTime = payday;
                }, 
                  
                haveCallTaxi() { 
                    document.querySelector('.taxi').classList.add('blink_me');
    
                    return setTimeout(() => {document.querySelector('.taxi').classList.remove('blink_me')}, 5000);
                }, 
    
    
                //---------------------------------------------------- [ CHAT SYSTEM ] ----------------------------------------------------// 
                manageChat: function(option, result) { 
                    switch(option) {
                        case 'container':
                        {
                            this.chat.container = !this.chat.container;
                            break;
                        }
    
                        case 'category':
                        { 
                            if((result == 'staff' && !this.player.admin) || (result == 'group' && !this.player.group))
                                return;
     
                            this.chat.category = result; 
                            this.updateChat(); 
                            break;
                        }
    
                        case 'font':
                        { 
                            this.chat.font = result.target.value;
     
                            break;
                        }
    
                        case 'page':
                        { 
                            this.chat.page = result.target.value;
      
                            $(".group-messages").scrollTop(9999); 
                            break;
                        }
                    } 
    
                    if(window.mp) { 
                        return window.e_rpc('server::chat:changeSettings', JSON.stringify({option: option, result: this.chat.category})); 
                    } 
                },
    
                push: function(text, color, category) {
                    text = unescape(text);
     
                    let object = `<p class="font-semibold" style=" ${color == null ? "" : "color: " + color};">${text}</p>`
                    this.messages[category].push(object); 
    
                    return this.updateChat();
                },
     
                updateChat: function() {
                    $(".chatEntries").empty();
                    
                    this.messages[this.chat.category].forEach(entry => {
                        $(".chatEntries").append(entry);
                    });
     
                    $(".group-messages").scrollTop(9999); 
                },
    
                sendMessage() { 
                    let value = this.chat.input;
    
                    this.openChat(false);
     
                    if(value && value.length > 0) 
                    { 
                        if(this.chat.lasts.length <= 10) {
                            this.chat.lasts.push(value);
                        }
    
                        if(value[0] == "/") 
                        {
                            value = value.substr(1);
    
                            if(window.mp) {
                                window.e_invoke("command", value);
                            } 
                        } 
                        else
                        { 
                            if(window.mp) {
                                window.e_invoke("chatMessage", value);
                            }   
                        }    
                    }
     
                    this.chat.input = '';
                },
     
                openChat(status) {
                    this.chat.show = status;

                    if(status && this.chat.timeout) { 
                        $(".group-messages").css('opacity', '1'); 

                        clearTimeout(this.chat.timeout);
                        this.chat.timeout = null; 
                    }
 
                    if(!status && !this.chat.timeout) {
                        this.chat.timeout = setTimeout(() => { 
                            $(".group-messages").css('opacity', '0.4');  
                        }, 10000);
                    }
    
                    setTimeout(() => {
    
                        if(this.chat.show) {
                            $("#text").focus();
                        }   
                    }, 200); 
      
                    if(window.mp) {
                        window.e_invoke('setTypingInChatState', this.chat.show);
                    } 
    
                    if(window.mp) {
                        window.e_invoke('focus', this.chat.show);
                    }  
                },
    
                onArrowUp() {  
                    if(this.chat.history >= Object.keys(this.chat.lasts).length - 1)
                        return;
                    
                    this.chat.history ++; 
                    this.chat.input = this.chat.lasts[this.chat.history];
       
                    setTimeout(() => {
                        const inputElement = document.getElementById('text');
                        inputElement.setSelectionRange(inputElement.value.length, inputElement.value.length);
                    }, 1);  
                },
    
                onArrowDown() { 
                    if(this.chat.history <= 0)
                        return;
    
                    this.chat.history --;
                    this.chat.input = this.chat.lasts[this.chat.history]; 
                },
    
                searchCommands() {
                    if(this.player.admin < 1)
                        return;
      
                    if(this.chat.input.length < 2)
                        return this.chat.showCommands = false;
      
                    this.availableCommands.forEach(element => {
                         
                        if(element.startsWith(this.chat.input)) {
                            this.chat.showCommands = true; 
                        }  
                    });  
                },
    
                availableCommandsFnc() {
                    let string = [];
    
                    if(this.player.admin < 1)
                        return;
    
                    if(this.chat.input.length < 2)
                        return;
                     
                    this.availableCommands.forEach(element => {
                         
                        if(element.startsWith(this.chat.input)) {
                            string.push(element); 
                        }  
                    });  
                    return string;
                },

                updatePistolRadar(data) { 
                    this.radar = data;
                },

                manageRadar(index) {
                    let options = [ 
                        'server::radar:power', 'server::radar:send'
                    ];

                    if(window.mp) { 
                        return window.e_rpc(options[index]); 
                    } 
                }
            }, 
    
            created() {
                var chatAPI = {
                    push: (text) => {  
                        this.push(text, 'fff', 'local');
                    },
                
                    clear: () => {},
                    show: () => {},
                    activate: () => {}, 
                };
                 
                let api = {"chat:push": chatAPI.push, "chat:clear": chatAPI.clear, "chat:activate": chatAPI.activate, "chat:show": chatAPI.show}; 
            
                if(window.mp) {
                    for(let fn in api) {
                        window.e_add(fn, api[fn]);
                    } 
                }  
            }, 
        }
    </script>