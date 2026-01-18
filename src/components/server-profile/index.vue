<template>  
    <div class="flex flex-col justify-center items-center w-full mt-[9%] cursor-pointer font-inter font-semibold z-1 select-none">   
        <div class="background-global-effect"></div>
   
        <div class="flex flex-col justify-center items-center w-full h-full absolute text-white cursor-pointer" v-show="this.clanModal.status">
            <div class="global-modal-effect" style="z-index:1;"></div>

            <div class="flex flex-col justify-center items-center" style="z-index: 2;">  
                <i v-if="this.clanModal.option == 4 || this.clanModal.option == 11" class="fa-solid fa-sack-dollar text-green-600 text-[85px]"></i> 
                <i v-if="this.clanModal.option == 5" class="fa-solid fa-pencil text-white text-[85px]"></i>
                <i v-if="this.clanModal.option == 6 || this.clanModal.option == 8" class="fa-solid fa-users-gear text-white text-[85px]"></i>
                <i v-if="this.clanModal.option != 4 && this.clanModal.option != 5 && this.clanModal.option != 6 && this.clanModal.option != 8 && this.clanModal.option != 11" class="fa-solid fa-triangle-exclamation text-yellow-600 text-[85px]"></i>
                  
                <div class="text-[1.5rem] opacity-80 m-2 tracking-wide font-bold" :style="{color: this.clanModal.option == 4 || this.clanModal.option == 11 ? '#019e57' : this.clanModal.option == 6 || this.clanModal.option == 8 ? '#fff' : '#d68b00'}">
                    {{this.clanModal.title}}
                </div>

                <div v-if="this.clanModal.option == 1" class="opacity-80 font-semibold tracking-wide w-[30rem]"> 
                    Are you sure you want to upgrade your clan with 10 slots? <b style="color: rgb(235, 169, 2); opacity: 1;">500 GOLD</b> will be withdrawn from clan safebox. 
                </div> 
 
                <div v-else-if="this.clanModal.option == 2" class="opacity-80 font-semibold tracking-wide w-[31rem]"> 
                    Are you sure you want to upgrade your clan vehicle slots with 10 slots? <b style="color: rgb(235, 169, 2); opacity: 1;">1.000 GOLD</b> will be withdrawn from clan safebox. 
                </div> 

                <div v-else-if="this.clanModal.option == 3" class="opacity-80 font-semibold tracking-wide w-[30rem]"> 
                    Are you sure you want to extend your clan for 30 days? <b style="color: rgb(235, 169, 2); opacity: 1;">5.000 GOLD</b> will be withdrawn from clan safebox. 
                </div> 

                <div v-else-if="this.clanModal.option == 4" class="opacity-80 font-semibold tracking-wide w-[34rem]"> 
                    Please insert how much money you want to deposit in clan safebox. You have <a style="color: #019e57;">${{ this.formatThousands(this.bank) }}</a> in your bank account.
                </div>  

                <div v-else class="opacity-80 font-semibold tracking-wide w-auto">{{this.clanModal.description}}</div> 
            </div>

  
            <div class="flex flex-col justify-center items-center mt-[20px] w-full" style="z-index: 2;">   
                <input v-if="this.clanModal.option == 4" spellcheck="false" class="w-[30rem] h-8 bg-darkPurple text-white rounded-lg text-center font-medium tracking-normal mt-1 focus:border-2 border-violet-500 focus:rounded-full" type="number" placeholder="Enter amount" v-model="this.clanModal.input" v-model.number="this.clanModal.input" onkeyup="this.value">
                <input v-if="this.clanModal.option == 5" spellcheck="false" class="w-[30rem] h-8 bg-darkPurple text-white rounded-lg text-center font-medium tracking-normal mt-1 focus:border-2 border-violet-500 focus:rounded-full" type="name" placeholder="Enter name" v-model="this.clanModal.input" v-model.number="this.clanModal.input" onkeyup="this.value">
                <input v-if="this.clanModal.option == 12" spellcheck="false" class="w-[30rem] h-8 bg-darkPurple text-white rounded-lg text-center font-medium tracking-normal mt-1 focus:border-2 border-violet-500 focus:rounded-full" type="name" :placeholder="'#' + this.clan.color" v-model="this.clanModal.input" v-model.number="this.clanModal.input" onkeyup="this.value">
 
                <div v-if="this.clanModal.option == 12" class="w-[3rem] h-[3rem] mt-[10px] rounded bg-red-400" :style="{'background-color': '#' + (!this.clanModal.input ? this.clan.color : this.clanModal.input)}"></div>
  
                <div class="list-items" v-if="this.clanModal.option == 6">  
                    <div class="flex flex-col justify-center items-center bg-[#a0a0a01c] border-2 border-[#a0a0a01e] rounded w-[20rem] h-[3rem] m-2 hover:bg-[#a0a0a046]" :class = "{'bg-[#a0a0a046]': this.clanModal.selectedAction == 0}" @click="this.selectModalOption(0, this.clanModal.selected)">
                        <div class="font-bold tracking-wide text-[15px]">MANAGE MEMBER PERMISSIONS</div>
                        <div class="font-semibold tracking-wide text-[12px]">ALLOW USER TO TO INVITE OR KICK MEMBERS.</div>
                    </div> 
 
                    <div class="flex flex-col justify-center items-center bg-[#a0a0a01c] border-2 border-[#a0a0a01e] rounded w-[20rem] h-[3rem] m-2 hover:bg-[#a0a0a046]" :class = "{'bg-[#a0a0a046]': this.clanModal.selectedAction == 1}" @click="this.selectModalOption(1, this.clanModal.selected)">
                        <div class="font-bold tracking-wide text-[15px]">CHANGE MEMBER RANK</div>
                        <div class="font-semibold tracking-wide text-[12px]">CURRENT: RANK 1 [1]</div>
                    </div> 
 
                    <div class="flex flex-col justify-center items-center bg-[#a0a0a01c] border-2 border-[#a0a0a01e] rounded w-[20rem] h-[3rem] m-2 hover:bg-[#a0a0a046]" :class = "{'bg-[#a0a0a046]': this.clanModal.selectedAction == 2}" @click="this.selectModalOption(2)">
                        <div class="font-bold tracking-wide text-[15px]">TRANSFER CLAN OWNERSHIP</div>
                        <div v-if="this.clanModal.selected" class="font-semibold tracking-wide text-[12px]">SET {{this.clanModal.selected.name}} AS AS CLAN LEADER</div>
                    </div>
                </div>

                <div class="list-items" v-if = "this.clanModal.option == 7">   
                    <div class="flex flex-col justify-center items-center bg-[#a0a0a01c] border-2 border-[#a0a0a01e] rounded w-[20rem] h-[3rem] m-2 hover:bg-[#a0a0a046]" :class = "{'bg-[#a0a0a046]': this.clanModal.selectedAction == 3}" @click="this.selectModalOption(3)">
                        <div class="font-bold tracking-wide text-[15px]">{{ this.clan.ranks[0] }} [1]</div>
                        <div class="font-semibold tracking-wide text-[12px]"></div>
                    </div> 

                    <div class="flex flex-col justify-center items-center bg-[#a0a0a01c] border-2 border-[#a0a0a01e] rounded w-[20rem] h-[3rem] m-2 hover:bg-[#a0a0a046]" :class = "{'bg-[#a0a0a046]': this.clanModal.selectedAction == 4}" @click="this.selectModalOption(4)">
                        <div class="font-bold tracking-wide text-[15px]">{{ this.clan.ranks[1] }} [2]</div>
                        <div class="font-semibold tracking-wide text-[12px]"></div>
                    </div> 
 
                    <div class="flex flex-col justify-center items-center bg-[#a0a0a01c] border-2 border-[#a0a0a01e] rounded w-[20rem] h-[3rem] m-2 hover:bg-[#a0a0a046]" :class = "{'bg-[#a0a0a046]': this.clanModal.selectedAction == 5}" @click="this.selectModalOption(5)">
                        <div class="font-bold tracking-wide text-[15px]">{{ this.clan.ranks[2] }} [3]</div>
                        <div class="font-semibold tracking-wide text-[12px]"></div>
                    </div>

                    <div class="flex flex-col justify-center items-center bg-[#a0a0a01c] border-2 border-[#a0a0a01e] rounded w-[20rem] h-[3rem] m-2 hover:bg-[#a0a0a046]" :class = "{'bg-[#a0a0a046]': this.clanModal.selectedAction == 6}" @click="this.selectModalOption(6)">
                        <div class="font-bold tracking-wide text-[15px]">{{ this.clan.ranks[3] }} [4]</div>
                        <div class="font-semibold tracking-wide text-[12px]"></div>
                    </div>
                </div>
 
                <div class="list-items" v-if = "this.clanModal.option == 8 && this.clanModal.selected">  
                    <div class="flex flex-col justify-center items-center bg-[#a0a0a01c] border-2 border-[#a0a0a01e] rounded w-[20rem] h-[3rem] m-2 hover:bg-[#a0a0a046]" :class = "{'bg-[#a0a0a046]': this.clanModal.selectedAction == 8}" @click="this.selectModalOption(8)">
                        <div class="font-bold tracking-wide text-[15px]">INVITE MEMBERS</div>
                        <div class="font-semibold tracking-wide text-[12px]">{{this.clanModal.selected.name}} {{this.clanModal.selected.permissions[0] ? 'CAN' : `CAN'T`}} INVITE MEMBERS</div>
                    </div> 

                    <div class="flex flex-col justify-center items-center bg-[#a0a0a01c] border-2 border-[#a0a0a01e] rounded w-[20rem] h-[3rem] m-2 hover:bg-[#a0a0a046]" :class = "{'bg-[#a0a0a046]': this.clanModal.selectedAction == 9}" @click="this.selectModalOption(9)">
                        <div class="font-bold tracking-wide text-[15px]">UNINVITE MEMBERS</div>
                        <div class="font-semibold tracking-wide text-[12px]">{{this.clanModal.selected.name}} {{this.clanModal.selected.permissions[1] ? 'CAN' : `CAN'T`}} KICK MEMBERS</div>
                    </div> 
 
                    <div class="flex flex-col justify-center items-center bg-[#a0a0a01c] border-2 border-[#a0a0a01e] rounded w-[20rem] h-[3rem] m-2 hover:bg-[#a0a0a046]" :class = "{'bg-[#a0a0a046]': this.clanModal.selectedAction == 10}" @click="this.selectModalOption(10)">
                        <div class="font-bold tracking-wide text-[15px]">MANAGE VEHICLES</div>
                        <div class="font-semibold tracking-wide text-[12px]">{{this.clanModal.selected.name}} {{this.clanModal.selected.permissions[2] ? 'CAN' : `CAN'T`}} MANAGE VEHICLES</div>
                    </div>
                </div>

                <div class="list-items" v-if="this.clanModal.option == 13">  
                    <div class="flex flex-col justify-center items-center bg-[#a0a0a01c] border-2 border-[#a0a0a01e] rounded w-[20rem] h-[3rem] m-2 hover:bg-[#a0a0a046]" :class = "{'bg-[#a0a0a046]': this.clanModal.selectedAction == 11}" @click="this.selectModalOption(11)">
                        <div class="font-bold tracking-wide text-[15px]">{{ this.clan.ranks[0] }} [1]</div>
                        <div class="font-semibold tracking-wide text-[12px]"></div>
                    </div> 

                    <div class="flex flex-col justify-center items-center bg-[#a0a0a01c] border-2 border-[#a0a0a01e] rounded w-[20rem] h-[3rem] m-2 hover:bg-[#a0a0a046]" :class = "{'bg-[#a0a0a046]': this.clanModal.selectedAction == 12}" @click="this.selectModalOption(12)">
                        <div class="font-bold tracking-wide text-[15px]">{{ this.clan.ranks[1] }} [2]</div>
                        <div class="font-semibold tracking-wide text-[12px]"></div>
                    </div> 
 
                    <div class="flex flex-col justify-center items-center bg-[#a0a0a01c] border-2 border-[#a0a0a01e] rounded w-[20rem] h-[3rem] m-2 hover:bg-[#a0a0a046]" :class = "{'bg-[#a0a0a046]': this.clanModal.selectedAction == 13}" @click="this.selectModalOption(13)">
                        <div class="font-bold tracking-wide text-[15px]">{{ this.clan.ranks[2] }} [3]</div>
                        <div class="font-semibold tracking-wide text-[12px]"></div>
                    </div>

                    <div class="flex flex-col justify-center items-center bg-[#a0a0a01c] border-2 border-[#a0a0a01e] rounded w-[20rem] h-[3rem] m-2 hover:bg-[#a0a0a046]" :class = "{'bg-[#a0a0a046]': this.clanModal.selectedAction == 14}" @click="this.selectModalOption(14)">
                        <div class="font-bold tracking-wide text-[15px]">{{ this.clan.ranks[3] }} [4]</div>
                        <div class="font-semibold tracking-wide text-[12px]"></div>
                    </div>
                </div>
            </div>
 

            <div class="flex flex-row justify-between items-center mt-[15px]" style="z-index: 2;">  
                <div class="flex justify-center items-center font-semibold text-[14px] w-[8.8rem] h-[2.2rem] bg-purple-600 rounded tracking-wide mx-2" :class="{'!bg-green-600': this.clanModal.selectedAction != null || this.clanModal.option == 9 || this.clanModal.option == 12}" @click="this.executeModal()">
                    <i class="fa-solid fa-check mr-2"></i>  

                    {{ this.clanModal.option == 1 || this.clanModal.option == 2 || this.clanModal.option == 3 || this.clanModal.option == 4 || this.clanModal.option == 5 || this.clanModal.option == 9 ? 'SUBMIT' : this.clanModal.option == 12 ? 'CHANGE' : 'SELECT'}}       
                </div>

                <div class="flex justify-center items-center font-semibold text-[14px] w-[8.8rem] h-[2.2rem] bg-red-600 rounded tracking-wide mx-2 hover:bg-red-700" @click="showModal('exit')">
                    <i class="fa-solid fa-xmark mr-2"></i> CANCEL
                </div>
            </div> 
        </div>
 
        <div class="flex flex-row justify-between items-center bg-[rgba(59,52,98,0.77)] rounded min-w-[70%] h-[3rem] text-white">
            <div class="flex flex-row justify-center items-center ml-[15px]">
                
                <img class="rounded-full" :src="this.image" width="40" height="40">
                
                <div class="flex flex-col justify-center items-left text-left ml-[10px]">
                    <div class="tracking-wide font-semibold text-[14px]">{{this.name}}</div>
                    <div class="tracking-wide font-medium opacity-70 text-[12px]">{{'Normal user'}}</div>
                </div> 
            </div>
            <div class="flex flex-row items-center mr-[5px]">
                <span class="flex flex-row justify-center items-center rounded w-[8rem] h-[1.8rem] font-semibold text-[13px] bg-purple-500 mr-2 hover:bg-purple-700" :class = "{'!bg-purple-700': this.page == 0}" @click = "changePage(0)"><i style="margin-right: 5px;" class="fa-solid fa-bars"></i> General</span>
                <span class="flex flex-row justify-center items-center rounded w-[8rem] h-[1.8rem] font-semibold text-[13px] bg-purple-500 mr-2 hover:bg-purple-700" :class = "{'!bg-purple-700': this.page == 1}" @click = "changePage(1)"><i style="margin-right: 5px;" class="fa-solid fa-briefcase"></i> Faction</span>
                <span class="flex flex-row justify-center items-center rounded w-[8rem] h-[1.8rem] font-semibold text-[13px] bg-purple-500 mr-2 hover:bg-purple-700" :class = "{'!bg-purple-700': this.page == 3}" @click = "changePage(3)"><i style="margin-right: 5px;" class="fa-solid fa-users"></i> Clan</span>
                <span class="flex flex-row justify-center items-center rounded w-[8rem] h-[1.8rem] font-semibold text-[13px] bg-purple-500 mr-2 hover:bg-purple-700" :class = "{'!bg-purple-700': this.page == 2}" @click = "changePage(2)"><i style="margin-right: 5px;" class="fa-solid fa-gear"></i> Settings</span>
                <span class="flex flex-row justify-center items-center rounded w-[8rem] h-[1.8rem] font-semibold text-[13px] bg-purple-500 mr-2 hover:bg-purple-700" :class = "{'!bg-purple-700': this.page == 4}" @click = "changePage(4)"><i style="margin-right: 5px;" class="fa-solid fa-trophy"></i> Achievements</span>
            </div>
        </div>
 
        <!------------------------------------------------------------------[GENERAL CATEGORY]------------------------------------------------------------------>
        <div class="flex flex-row justify-between w-[70%] text-white" v-show = "page == 0"> 
            <div class="w-[60%]"> 
                <div class="bg-darkPurple rounded w-auto h-auto mt-[20px]"> 
                    <div class="flex flex-row justify-between items-center h-[20px] p-4 text-[15px] font-semibold"> 
                        <div class="w-[60%]">
                            <i class="fa-solid fa-bars"></i> {{config.dashboardTitle[page][0]}}
                        </div>
                    </div>   
                    <div class="h-[3px] w-full rounded-full bg-[rgba(93,87,204,0.815)]"></div> 

                    <div class="flex flex-col text-[13px] tracking-wide p-4"> 

                        <div class="flex justify-between items-center rounded p-[5px] bg-gradient-to-r from-[rgba(86,82,163,0.46)] to-[rgba(68,63,167,0.44)] text-[rgb(221,221,221)]">
                            <span><i class="fa-solid fa-arrow-up-9-1"></i> Level</span>

                            <span class="flex flex-row justify-center items-center min-w-[20px] min-h-[20px] rounded-[2px]">{{this.level}} ({{this.levelPercent}}%)</span>
                        </div>

                        <div class="mt-[5px] flex justify-between items-center rounded p-[5px] bg-gradient-to-r from-[rgba(86,82,163,0.46)] to-[rgba(68,63,167,0.44)] text-[rgb(221,221,221)]">
                            <span><i class="fa-solid fa-clock"></i> Hours Played</span>

                            <span class="flex flex-row justify-center items-center min-w-[20px] min-h-[20px] rounded-[2px]">{{fmHoursMinutesSeconds(hours)}}</span>
                        </div> 

                        <div class="mt-[5px] flex justify-between items-center rounded p-[5px] bg-gradient-to-r from-[rgba(86,82,163,0.46)] to-[rgba(68,63,167,0.44)] text-[rgb(221,221,221)]">
                            <span><i class="fa-solid fa-clock"></i> Payday</span>

                            <span class="flex flex-row justify-center items-center min-w-[20px] min-h-[20px] rounded-[2px]">{{fmtMSS(payday)}}</span>
                        </div> 

                        <div class="mt-[5px] flex justify-between items-center rounded p-[5px] bg-gradient-to-r from-[rgba(86,82,163,0.46)] to-[rgba(68,63,167,0.44)] text-[rgb(221,221,221)]">
                            <span>
                                <i class="fa-solid fa-calendar-days"></i> Registered
                            </span>

                            <span class="flex flex-row justify-center items-center min-w-[20px] min-h-[20px] rounded-[2px]">{{this.getTimeAgo(registered)}}</span>
                        </div> 

                        <div class="mt-[5px] flex justify-between items-center rounded p-[5px] bg-gradient-to-r from-[rgba(86,82,163,0.46)] to-[rgba(68,63,167,0.44)] text-[rgb(221,221,221)]">
                            <span><i class="fa-solid fa-wallet"></i> Cash</span>

                            <span class="flex flex-row justify-center items-center min-w-[20px] min-h-[20px] rounded-[2px] text-green-600">${{formatThousands(money)}}</span>
                        </div> 

                        <div class="mt-[5px] flex justify-between items-center rounded p-[5px] bg-gradient-to-r from-[rgba(86,82,163,0.46)] to-[rgba(68,63,167,0.44)] text-[rgb(221,221,221)]">
                            <span><i class="fa-solid fa-credit-card"></i> Bank</span>

                            <span class="flex flex-row justify-center items-center min-w-[20px] min-h-[20px] rounded-[2px] text-green-600">${{formatThousands(bank)}}</span>
                        </div>  
                    </div>
                </div> 

                <div class="bg-darkPurple rounded w-auto h-auto mt-[20px]">  
                    <div class="flex flex-row justify-between items-center h-[20px] p-4 text-[15px] font-semibold"> 
                        <div class="w-[60%]">
                            <i class="fa-solid fa-house"></i> {{config.dashboardTitle[page][3]}}
                        </div>
                    </div>   
                    <div class="h-[3px] w-full rounded-full bg-[rgba(93,87,204,0.815)]"></div> 

  
                    <div class="flex flex-col text-[13px] tracking-wide p-4"> 

                        <div class="flex justify-between items-center rounded p-[5px] bg-gradient-to-r from-[rgba(86,82,163,0.46)] to-[rgba(68,63,167,0.44)] text-[rgb(221,221,221)]">
                            <a><i class="fa-solid fa-house"></i> House</a>

                            <span v-if="this.house == -1" class="flex flex-row justify-center items-center min-w-[20px] min-h-[20px] rounded-[2px]">no house</span>
                            
                            <div v-if="this.house != -1" @click="findProperty('House')" class="bg-purple-600 flex flex-row justify-center items-center min-w-[22px] min-h-[22px] rounded-[2px]">
                                <i class="fa-sharp fa-solid fa-location-dot"></i>
                            </div>
                        </div> 

                        <div class="mt-[5px] flex justify-between items-center rounded p-[5px] bg-gradient-to-r from-[rgba(86,82,163,0.46)] to-[rgba(68,63,167,0.44)] text-[rgb(221,221,221)]">
                            <span><i class="fa-solid fa-landmark"></i> Business</span>

                            <span v-if="this.business == -1" class="flex flex-row justify-center items-center min-w-[20px] min-h-[20px] rounded-[2px]">no business</span> 
                            <span v-if="this.business != -1" @click="findProperty('Business')" class="bg-purple-600 flex flex-row justify-center items-center min-w-[22px] min-h-[22px] rounded-[2px]">
                                <i class="fa-sharp fa-solid fa-location-dot"></i>
                            </span>
                        </div> 

                        <div class="mt-[5px] flex justify-between items-center rounded p-[5px] bg-gradient-to-r from-[rgba(86,82,163,0.46)] to-[rgba(68,63,167,0.44)] text-[rgb(221,221,221)]">
                            <span>
                                <i class="fa-solid fa-car"></i> Vehicles
                            </span>

                            <span class="flex flex-row justify-center items-center min-w-[20px] min-h-[20px] rounded-[2px]">
                                {{vehicles}}
                            </span> 
                        </div> 
                    </div>
                </div> 
            </div>

            <div class="w-full ml-[10px]"> 
                <div class="bg-darkPurple rounded w-auto h-auto mt-[20px]"> 
                    <div class="flex flex-row justify-between items-center h-[20px] p-4 text-[15px] font-semibold"> 
                        <div class="w-[60%]">
                            <i class="fa-solid fa-id-card"></i> {{config.dashboardTitle[page][1]}}
                        </div>
                    </div>   
                    <div class="h-[3px] w-full rounded-full bg-[rgba(93,87,204,0.815)]"></div> 

 
                    <div class="flex flex-col text-[13px] tracking-wide p-4"> 

                        <div class="flex justify-between items-center rounded p-[5px] bg-gradient-to-r from-[rgba(86,82,163,0.46)] to-[rgba(68,63,167,0.44)] text-[rgb(221,221,221)]">
                            <a><i class="fa-solid fa-car"></i> Driver's Licence</a>

                            <span class="flex flex-row justify-center items-center min-w-[20px] min-h-[20px] rounded-[2px]">{{driving ? 'Passed' : 'Not passed'}}</span>
                        </div>

                        <div class="mt-[5px] flex justify-between items-center rounded p-[5px] bg-gradient-to-r from-[rgba(86,82,163,0.46)] to-[rgba(68,63,167,0.44)] text-[rgb(221,221,221)]">
                            <a><i class="fa-solid fa-motorcycle"></i> Motorcycle's Licence</a>

                            <span class="flex flex-row justify-center items-center min-w-[20px] min-h-[20px] rounded-[2px]">{{motorbike ? 'Passed' : 'Not passed'}}</span>
                        </div> 
                    </div>
                </div> 
 
                <div class="bg-darkPurple rounded w-auto h-auto mt-[20px]"> 
                    <div class="flex flex-row justify-between items-center h-[20px] p-4 text-[15px] font-semibold"> 
                        <div class="w-[60%]">
                            <i class="fa-solid fa-circle-exclamation"></i> {{config.dashboardTitle[page][2]}}
                        </div>
                    </div>   
                    <div class="h-[3px] w-full rounded-full bg-[rgba(93,87,204,0.815)]"></div> 

                    <div class="flex flex-col text-[13px] tracking-wide p-[10px]"> 
                        <div class="flex justify-between items-center rounded p-[5px] bg-gradient-to-r from-[rgba(86,82,163,0.46)] to-[rgba(68,63,167,0.44)] text-[rgb(221,221,221)]">
                            <a><i class="fa-solid fa-triangle-exclamation"></i> Warns</a>

                            <span class="flex flex-row justify-center items-center min-w-[20px] min-h-[20px] rounded-[2px]">{{warns ? warns : 'no warns'}} {{warns ? 'warns' : ''}}</span>
                        </div> 

                        <div class="mt-[5px] flex justify-between items-center rounded p-[5px] bg-gradient-to-r from-[rgba(86,82,163,0.46)] to-[rgba(68,63,167,0.44)] text-[rgb(221,221,221)]">
                            <a><i class="fa-solid fa-comment-slash"></i> Mute</a>

                            <span class="flex flex-row justify-center items-center min-w-[20px] min-h-[20px] rounded-[2px]">no</span>
                        </div> 
                    </div>
                </div>  
            </div> 
        </div> 
        <!------------------------------------------------------------------------------------------------------------------------------------------------------>

        <!------------------------------------------------------------------[FACTIONS CATEGORY]-----------------------------------------------------------------> 
        <div class="flex flex-row justify-between w-[70%] text-white" v-show = "page == 1">  
            <div class="w-[60%]"> 
                <div class="bg-darkPurple rounded w-auto h-auto mt-[20px]">
                    <div class="flex flex-row justify-between items-center h-[20px] p-4 text-[15px] font-semibold"> 
                        <div class="w-[60%]">
                            <i class="fa-solid fa-bars"></i> {{config.dashboardTitle[page][0]}}
                        </div> 
                    </div> 
                    <div class="h-[3px] w-full rounded-full bg-[rgba(93,87,204,0.815)]"></div> 
  
                    <div v-if = "!factionid" class="flex flex-col text-[13px] tracking-wide p-4">  
                        <div class="flex justify-between items-center rounded p-1 bg-gradient-to-r from-[rgba(86,82,163,0.46)] to-[rgba(68,63,167,0.44)] text-[rgb(221,221,221)]">You don't have a faction.</div> 
                    </div>
  
                    <div v-else class="flex flex-col text-[13px] tracking-wide p-4">  
                        <div class="flex justify-between items-center rounded p-[5px] bg-gradient-to-r from-[rgba(86,82,163,0.46)] to-[rgba(68,63,167,0.44)] text-[rgb(221,221,221)]">
                            <span><i class="fa-solid fa-briefcase"></i> Faction</span>

                            <span class="flex flex-row justify-center items-center min-w-[20px] min-h-[20px] rounded-[2px]" style="background: none;">{{faction}}</span>
                        </div>
                      
                        <div class="mt-[5px] flex justify-between items-center rounded p-[5px] bg-gradient-to-r from-[rgba(86,82,163,0.46)] to-[rgba(69,63,167,0.44)] text-[rgb(221,221,221)]">
                            <span><i class="fa-solid fa-calendar-days"></i> Joined</span>

                            <span class="flex flex-row justify-center items-center min-w-[20px] min-h-[20px] rounded-[2px]">{{joined}}</span>
                        </div>
 
                        <div class="mt-[5px] flex justify-between items-center rounded p-[5px] bg-gradient-to-r from-[rgba(86,82,163,0.46)] to-[rgba(69,63,167,0.44)] text-[rgb(221,221,221)]">
                            <span><i class="fa-solid fa-ranking-star"></i> Rank</span>

                            <span class="flex flex-row justify-center items-center min-w-[20px] min-h-[20px] rounded-[2px]">{{rank}}</span>
                        </div>
 
                        <div v-if="factionid == 1" class="mt-[5px] flex justify-between items-center rounded p-[5px] bg-gradient-to-r from-[rgba(86,82,163,0.46)] to-[rgba(69,63,167,0.44)] text-[rgb(221,221,221)]">
                            <span><i class="fa-solid fa-handcuffs"></i> Arrests</span>

                            <span class="flex flex-row justify-center items-center min-w-[20px] min-h-[20px] rounded-[2px]">{{arrests}}</span>
                        </div>

                        <div v-if="factionid == 2" class="mt-[5px] flex justify-between items-center rounded p-[5px] bg-gradient-to-r from-[rgba(86,82,163,0.46)] to-[rgba(69,63,167,0.44)] text-[rgb(221,221,221)]">
                            <span><i class="fa-solid fa-taxi"></i> Commands</span>

                            <span class="flex flex-row justify-center items-center min-w-[20px] min-h-[20px] rounded-[2px]">{{commands}}</span>
                        </div>  
                    </div>
                </div>
            </div> 
        </div>
        <!------------------------------------------------------------------------------------------------------------------------------------------------------> 
        <div class="flex flex-row justify-between w-[70%] text-white" v-show = "this.page == 4"> 
            <div class="w-[80%]">  
                <div class="flex flex-col justify-start items-start bg-darkPurple rounded w-auto min-h-[9.4rem] mt-[20px]"> 
                    
                    <div class="header flex flex-col justify-center items-start w-full h-[2.2rem] tracking-wide"> 
                        <div class="flex flex-row items-center h-full w-[96%] text-[15px] font-semibold ml-[15px] mt-1"> 
                            <div class="w-[60%]">
                                <i class="fa-solid fa-trophy"></i> {{config.dashboardTitle[page][0]}}
                            </div>
                        </div>   
                        <div class="h-[5px] w-full rounded-full bg-[rgba(93,87,204,0.815)]"></div> 
                    </div>
 
                    <div class="header flex flex-col justify-center items-center w-full h-full mt-4"> 
                        <div v-for="(item, index) in this.quests" :key="item" :class="{'!mt-[5px]': index > 0}" class="flex flex-row items-center justify-center rounded h-[2.5rem] w-[96%] bg-gradient-to-r from-[rgba(86,82,163,0.46)] to-[rgba(68,63,167,0.44)] text-[rgb(221,221,221)]">
                   
                            <div class="w-[2rem] h-full flex justify-center items-center ml-[10px]">
                                <i class="fa-solid fa-bars-progress text-[2rem]"></i>
                            </div>
 
                            <div class="flex flex-col justify-center items-start w-full h-full ml-[10px]"> 
                                <span class="flex flex-row justify-start h-auto items-start text-[15px]">{{item.title}}</span>
                                 
                                <div class="relative w-[14rem] h-[5px] bg-[rgba(49,46,90,0.93)] rounded mt-[0.5px]">
                                    <div class="relative w-[50%] h-[5px] bg-indigo-500 rounded" :style="{'width': (this.getQuestProgress(index)) + '%'}"></div>
                                </div> 
                            </div>
                        </div>
                    </div>     
                </div>     
            </div> 
 
            <div class="w-full ml-[10px]"> 
                <div class="flex flex-col justify-start items-start bg-darkPurple rounded w-auto min-h-[23.5rem] mt-[20px]"> 
                    
                    <div class="flex flex-col justify-center items-start w-full h-[2.2rem] tracking-wide"> 
                        <div class="flex flex-row items-center h-full w-[96%] text-[15px] font-semibold ml-[15px] mt-1"> 
                            <div class="w-[60%]">
                                <i class="fa-solid fa-trophy"></i> {{config.dashboardTitle[page][1]}}
                            </div>
                        </div>   
                        <div class="h-[5px] w-full rounded-full bg-[rgba(93,87,204,0.815)]"></div> 
                    </div>
                    
                    <div class="flex flex-col justify-center items-center w-full h-full mt-4 overflow-y-scroll"> 
                        <div v-for="(item, index) in this.achievements.data" :key="item" :class="{'!mt-[5px]': index > 0}" class="flex flex-row items-center justify-center rounded h-[2.5rem] w-[96%] bg-gradient-to-r from-[rgba(86,82,163,0.46)] to-[rgba(68,63,167,0.44)] text-[rgb(221,221,221)]">
                   
                            <div class="flex justify-center items-center ml-[5px] w-[2rem] h-full">
                                <i class="fa-solid fa-bars-progress text-[2rem]"></i>
                            </div>

                            <div class="flex flex-col items-start justify-center w-full h-full ml-[10px]"> 
                                <span class="flex flex-row justify-start h-auto items-start text-[15px]">{{item}}</span>  
                            </div>

                            <div class="flex flex-col items-end justify-center w-full h-full mr-[10px]" v-if="this.achievements.achievement[index]"> 
                                <i class="fa-solid fa-check text-[1.5rem] text-green-500"></i>
                            </div>
                        </div>
                    </div> 
                </div> 
            </div> 
        </div> 

        <!------------------------------------------------------------------[SETTINGS CATEGORY]----------------------------------------------------------------->
        <div class="flex flex-row justify-between w-[70%] text-white" v-show = "page == 2"> 
            <div class="w-[60%]">  
                <div class="bg-darkPurple rounded w-auto h-auto mt-[20px]">
                    <div class="flex flex-row justify-between items-center h-[20px] p-4 text-[15px] font-semibold"> 
                        <div class="w-[60%]">
                            <i class="fa-solid fa-bars"></i> {{config.dashboardTitle[page][0]}}
                        </div> 
                    </div> 
                    <div class="h-[3px] w-full rounded-full bg-[rgba(93,87,204,0.815)]"></div> 
 
                    <div class="flex flex-col text-[13px] tracking-wide p-4"> 
                        <div class="flex justify-between items-center rounded p-[5px] bg-gradient-to-r from-[rgba(86,82,163,0.46)] to-[rgba(69,63,167,0.44)] text-[rgb(221,221,221)]">
                            <a><i class="fa-solid fa-keyboard"></i> DISPLAY HOTKEYS</a>

                            <div class="flex flex-row justify-center items-center min-w-[20px] min-h-[20px] rounded-[2px]">
                                     
                                <label class="relative inline-flex cursor-pointer ml-2">
                                    <input @click="this.changeSetting('hotkeys')" type="checkbox" class="sr-only peer" v-model="this.setting['hotkeys']" v-bind:value="this.setting['hotkeys']">
                                    <div class="w-[50px] h-6 bg-[rgb(93,81,158)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-[29px] after:absolute after:top-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                                </label>  
                            </div> 
                        </div> 

                        <div class="mt-[5px] flex justify-between items-center rounded p-[5px] bg-gradient-to-r from-[rgba(86,82,163,0.46)] to-[rgba(69,63,167,0.44)] text-[rgb(221,221,221)]">
                            <a><i class="fa-solid fa-circle-question"></i> SHOW NEWBIE QUESTIONS</a>

                            <div class="flex flex-row justify-center items-center min-w-[20px] min-h-[20px] rounded-[2px]">
                                     
                                <label class="relative inline-flex cursor-pointer ml-2">
                                    <input @click="this.changeSetting('newbie')" type="checkbox" class="sr-only peer" v-model="this.setting['newbie']" v-bind:value="this.setting['newbie']">
                                    <div class="w-[50px] h-6 bg-[rgb(93,81,158)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-[29px] after:absolute after:top-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                                </label>  
                            </div> 
                        </div> 
                    </div>
                </div>    

                <div class="bg-darkPurple rounded w-auto h-auto mt-[20px]">
                    <div class="flex flex-row justify-between items-center h-[20px] p-4 text-[15px] font-semibold"> 
                        <div class="w-[60%]">
                            <i class="fa-solid fa-volume-low"></i> {{config.dashboardTitle[page][1]}}
                        </div> 
                    </div> 
                    <div class="h-[3px] w-full rounded-full bg-[rgba(93,87,204,0.815)]"></div> 
 
                    <div class="flex flex-col text-[13px] tracking-wide p-4"> 
                        <div class="flex justify-between items-center rounded p-[5px] bg-gradient-to-r from-[rgba(86,82,163,0.46)] to-[rgba(69,63,167,0.44)] text-[rgb(221,221,221)]">
                            <a><i class="fa-solid fa-headset"></i> VOICE CHAT</a>

                            <div class="flex flex-row justify-center items-center min-w-[20px] min-h-[20px] rounded-[2px]">
                                    
                                <label class="relative inline-flex cursor-pointer ml-2">
                                    <input @click="this.changeSetting('voice')" type="checkbox" class="sr-only peer" v-model="this.setting['voice']" v-bind:value="this.setting['hotkeys']">
                                    <div class="w-[50px] h-6 bg-[rgb(93,81,158)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-[29px] after:absolute after:top-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                                </label>   
                            </div> 
                        </div> 

                        <div class="mt-[5px] flex justify-between items-center rounded p-[5px] bg-gradient-to-r from-[rgba(86,82,163,0.46)] to-[rgba(69,63,167,0.44)] text-[rgb(221,221,221)]">
                            <a><i class="fa-solid fa-radio"></i> VEHICLE RADIO</a>

                            <div class="flex flex-row justify-center items-center min-w-[20px] min-h-[20px] rounded-[2px]">
                                   
                                <label class="relative inline-flex cursor-pointer ml-2">
                                    <input @click="this.changeSetting('radio')" type="checkbox" class="sr-only peer" v-model="this.setting['radio']" v-bind:value="this.setting['hotkeys']">
                                    <div class="w-[50px] h-6 bg-[rgb(93,81,158)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-[29px] after:absolute after:top-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                                </label>   
                            </div> 
                        </div> 

                        <div class="mt-[5px] flex justify-between items-center rounded p-[5px] bg-gradient-to-r from-[rgba(86,82,163,0.46)] to-[rgba(69,63,167,0.44)] text-[rgb(221,221,221)]" v-if = "setting['radio']">
                            <a><i class="fa-solid fa-radio"></i> RADIO VOLUME</a>

                            <div class="flex flex-row justify-center items-center min-w-[20px] min-h-[20px] rounded-[2px]">
                                     
                                <input v-model="setting['radioVolume']" @change="this.updateSlider($event, 4)" class="w-[94.5%] h-[5px] mt-1 appearance-none [&::-webkit-slider-runnable-track]:rounded-full bg-[rgb(93,81,158)] rounded-full    
                                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[15px] [&::-webkit-slider-thumb]:w-[15px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500" type="range" min="0" max="100">
                            </div> 
                        </div> 

                        <div class="mt-[5px] flex justify-between items-center rounded p-[5px] bg-gradient-to-r from-[rgba(86,82,163,0.46)] to-[rgba(69,63,167,0.44)] text-[rgb(221,221,221)]" v-if = "setting['voice']">
                            <a><i class="fa-solid fa-headset"></i> VOICE VOLUME</a>

                            <div class="flex flex-row justify-center items-center min-w-[20px] min-h-[20px] rounded-[2px]">
                                     
                                <input v-model="setting['voiceVolume']" @change="this.updateSlider($event, 5)" class="w-[94.5%] h-[5px] mt-1 appearance-none [&::-webkit-slider-runnable-track]:rounded-full bg-[rgb(93,81,158)] rounded-full    
                                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[15px] [&::-webkit-slider-thumb]:w-[15px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500" type="range" min="0" max="100">
                            </div> 
                        </div> 
                    </div>
                </div>
            </div>

            <div class="w-full ml-[10px]">  
                <div class="bg-darkPurple rounded w-auto h-auto mt-[20px]">
                    <div class="flex flex-row justify-between items-center h-[20px] p-4 text-[15px] font-semibold"> 
                        <div class="w-[60%]">
                            <i class="fa-solid fa-bars"></i> {{config.dashboardTitle[page][2]}}
                        </div> 
                    </div> 
                    <div class="h-[3px] w-full rounded-full bg-[rgba(93,87,204,0.815)]"></div> 
 
                    <div class="flex flex-col text-[13px] tracking-wide p-4"> 
                        <div :class="{'mt-[5px]': index != 'CHAT'}" class="flex justify-between items-center rounded p-[5px] bg-gradient-to-r from-[rgba(86,82,163,0.46)] to-[rgba(69,63,167,0.44)] text-[rgb(221,221,221)]" v-for = "(item, index) in bindKeys" v-bind:key="item" v-bind:item="item"> 
                            <span>{{index}}</span>  
                            
                            <div v-if="this.keysData.bind != null && this.keysData.bind == index" class="flex flex-row justify-center items-center min-w-[20px] min-h-[20px] rounded-[2px] bg-purple-700" style="width: 5rem;" @click="this.changeKey(index)">select key</div>  
                            <div v-else class="flex flex-row justify-center items-center min-w-[20px] min-h-[20px] rounded-[2px] bg-purple-700" @click="this.changeKey(index)">{{item.key}}</div>  
                        </div>   
                    </div>
                </div>   
            </div>
        </div> 
        <!------------------------------------------------------------------------------------------------------------------------------------------------------>


        <!------------------------------------------------------------- [CLAN PAGE] ---------------------------------------------------------------------------->
        <div class="flex flex-row justify-between w-[70%] text-white" v-if="this.page == 3">
            <div class="w-[35rem]">   
                <div class="bg-darkPurple rounded w-full h-auto mt-[20px]">
                    <div class="flex flex-row justify-between items-center h-[20px] p-4 text-[15px] font-semibold"> 
                        <div class="w-auto">
                            <i class="fa-solid fa-user"></i> YOUR CLAN
                        </div> 

                        <div v-if="this.cdata.id" class="flex justify-center items-center w-[6rem] h-[1.4rem] rounded text-[14px] bg-red-500" @click="showModal('quit')">
                            <i class="fa-solid fa-person-walking-dashed-line-arrow-right"></i> Quit clan
                        </div>
                    </div> 
                    <div class="h-[3px] w-full rounded-full bg-[rgba(93,87,204,0.815)]"></div> 
 
                    <div v-if="!this.cdata.id" class="flex flex-col text-[13px] tracking-wide p-4">  
                        <div class="flex justify-between items-center rounded p-1 bg-gradient-to-r from-[rgba(86,82,163,0.46)] to-[rgba(68,63,167,0.44)] text-[rgb(221,221,221)]">You don't have a clan.</div> 
                    </div>

                    <div v-else class="flex flex-col text-[13px] tracking-wide p-4"> 
                        <div class="flex justify-between items-center rounded p-[5px] bg-gradient-to-r from-[rgba(86,82,163,0.46)] to-[rgba(68,63,167,0.44)] text-[rgb(221,221,221)]">
                            <span><i class="fa-solid fa-signature"></i> Clan Name</span>

                            <span class="flex flex-row justify-center items-center min-w-[20px] min-h-[20px] rounded-[2px]" style="background: none;">{{this.clan.name}}</span>
                        </div>

                        <div class="mt-[5px] flex justify-between items-center rounded p-[5px] bg-gradient-to-r from-[rgba(86,82,163,0.46)] to-[rgba(69,63,167,0.44)] text-[rgb(221,221,221)]">
                            <span><i class="fa-solid fa-tag"></i> Clan Tag</span>

                            <span class="flex flex-row justify-center items-center min-w-[20px] min-h-[20px] rounded-[2px]">{{this.clan.tag}}</span>
                        </div> 

                        <div class="mt-[5px] flex justify-between items-center rounded p-[5px] bg-gradient-to-r from-[rgba(86,82,163,0.46)] to-[rgba(69,63,167,0.44)] text-[rgb(221,221,221)]">
                            <span><i class="fa-solid fa-user"></i> Display Name</span>
  
                            <div class="flex flex-row justify-end items-center">  
                                <span class="flex flex-row justify-center items-center min-w-[20px] min-h-[20px] rounded-[2px]" v-if="this.cdata.tag == 0"> 
                                    <span :style="{color: '#' + this.clan.color}">{{this.clan.tag}}</span>{{this.name}} 
                                </span>
 
                                <span class="flex flex-row justify-center items-center min-w-[20px] min-h-[20px] rounded-[2px]" v-if="this.cdata.tag == 1"> 
                                    <span :style="{color: '#' + this.clan.color}">{{this.clan.tag}}.</span>{{this.name}} 
                                </span>  

                                <span class="flex flex-row justify-center items-center min-w-[20px] min-h-[20px] rounded-[2px]" v-if="this.cdata.tag == 2"> 
                                    <span :style="{color: '#' + this.clan.color}">[{{this.clan.tag}}]</span>{{this.name}} 
                                </span>  

                                <span class="flex flex-row justify-center items-center min-w-[20px] min-h-[20px] rounded-[2px]" v-if="this.cdata.tag == 3"> 
                                    {{this.name}}<span :style="{color: '#' + this.clan.color}">{{this.clan.tag}}</span> 
                                </span> 
                                
                                <span class="flex flex-row justify-center items-center min-w-[20px] min-h-[20px] rounded-[2px]" v-if="this.cdata.tag == 4"> 
                                    {{this.name}}<span :style="{color: '#' + this.clan.color}">.{{this.clan.tag}}</span> 
                                </span> 

                                <span class="flex flex-row justify-center items-center min-w-[20px] min-h-[20px] rounded-[2px]" v-if="this.cdata.tag == 5"> 
                                    {{this.name}}<span :style="{color: '#' + this.clan.color}">[{{this.clan.tag}}]</span> 
                                </span> 

                                <span class="flex flex-row justify-center items-center min-w-[20px] min-h-[20px] rounded-[2px]" v-if="this.cdata.tag == 6"> 
                                    {{this.name}} 
                                </span> 
 
                                <div class="flex flex-row justify-between items-center w-[2rem] ml-1">
                                    <i class="fa-solid fa-chevron-left hover:text-green-600" @click="changeClanTag(0)"></i>
                                    <i class="fa-solid fa-chevron-right hover:text-green-600" @click="changeClanTag(1)"></i>
                                </div> 
                            </div>   
                        </div>  
 
                        <div class="mt-[5px] flex justify-between items-center rounded p-[5px] bg-gradient-to-r from-[rgba(86,82,163,0.46)] to-[rgba(69,63,167,0.44)] text-[rgb(221,221,221)]">
                            <span><i class="fa-solid fa-clock"></i> Expires In</span>

                            <span class="flex flex-row justify-center items-center min-w-[20px] min-h-[20px] rounded-[2px]">
                                in {{ this.clan.expire }} days
                                    
                                <i v-if="this.cdata.rank >= 5" class="fa-solid fa-circle-plus text-[17px] text-green-500 hover:text-green-600 ml-1" @click="this.showModal('extend clan');"></i>
                            </span>
                        </div> 

                        <div class="mt-[5px] flex justify-between items-center rounded p-[5px] bg-gradient-to-r from-[rgba(86,82,163,0.46)] to-[rgba(69,63,167,0.44)] text-[rgb(221,221,221)]">
                            <span><i class="fa-solid fa-users"></i> Members</span>

                            <span class="flex flex-row justify-center items-center min-w-[20px] min-h-[20px] rounded-[2px]">
                                {{ Object.keys(this.clan.members).length }} / {{ this.clan.slots }}
                                    
                                <i v-if="this.cdata.rank >= 5" class="fa-solid fa-circle-plus text-[17px] text-green-500 hover:text-green-600 ml-1" @click="this.showModal('upgrade clan');"></i>
                            </span>
                        </div> 

                        <div class="mt-[5px] flex justify-between items-center rounded p-[5px] bg-gradient-to-r from-[rgba(86,82,163,0.46)] to-[rgba(69,63,167,0.44)] text-[rgb(221,221,221)]">
                            <span><i class="fa-solid fa-car"></i> Vehicles</span>

                            <span class="flex flex-row justify-center items-center min-w-[20px] min-h-[20px] rounded-[2px]">
                                {{ Object.keys(this.clanVehicles).length }} / {{ this.clan.vehslots }}
                                    
                                <i v-if="this.cdata.rank >= 5" class="fa-solid fa-circle-plus text-[17px] text-green-500 hover:text-green-600 ml-1" @click="this.showModal('upgrade clan vehicles');"></i>
                            </span>
                        </div> 
 
                        <div @click="this.showModal('change color')" class="mt-[5px] flex justify-between items-center rounded p-[5px] bg-gradient-to-r from-[rgba(86,82,163,0.46)] to-[rgba(69,63,167,0.44)] text-[rgb(221,221,221)]">
                            <span><i class="fa-solid fa-palette"></i> Color</span>

                            <span :style="{'background': '#' + this.clan.color}" class="flex flex-row justify-center items-center min-w-[20px] min-h-[20px] rounded-[2px]"></span>
                        </div>   
                    </div>
                </div>  
 
                <div class="bg-darkPurple rounded w-full h-auto mt-[20px]" v-if="this.cdata.id">
                    <div class="flex flex-row justify-between items-center h-[20px] p-4 text-[15px] font-semibold"> 
                        <div class="w-auto">
                            <i class="fa-solid fa-vault"></i> CLAN SAFEBOX
                        </div> 

                        <div class="flex justify-center items-center w-[5rem] h-[1.4rem] rounded text-[14px] bg-purple-500" @click="showModal('deposit')">
                            <i class="fa-solid fa-plus" style="margin-right: 3px;"></i> Deposit
                        </div>
                    </div> 
                    <div class="h-[3px] w-full rounded-full bg-[rgba(93,87,204,0.815)]"></div>
 
                    <div class="flex flex-col text-[13px] tracking-wide p-4">   
                        <div class="flex justify-between items-center rounded p-[5px] bg-gradient-to-r from-[rgba(86,82,163,0.46)] to-[rgba(69,63,167,0.44)] text-[rgb(221,221,221)]">
                            <span><i class="fa-solid fa-sack-dollar"></i> Money</span>

                            <span class="flex flex-row justify-center items-center min-w-[20px] min-h-[20px] text-green-600">
                                ${{ this.formatThousands(this.clan.money) }}
                            </span>
                        </div> 

                        <div class="mt-[5px] flex justify-between items-center rounded p-[5px] bg-gradient-to-r from-[rgba(86,82,163,0.46)] to-[rgba(69,63,167,0.44)] text-[rgb(221,221,221)]">
                            <span><i class="fa-solid fa-coins"></i> Gold</span>

                            <span class="flex flex-row justify-center items-center min-w-[20px] min-h-[20px] text-yellow-600">
                                {{ this.formatThousands(this.clan.gold) }} Gold
                            </span>
                        </div>  
                    </div>
                </div>  
 
                <div class="bg-darkPurple rounded w-full h-auto mt-[20px]" v-if = "this.cdata.id">
                    <div class="flex flex-row justify-between items-center h-[20px] p-4 text-[15px] font-semibold"> 
                        <div class="w-auto">
                            <i class="fa-solid fa-gear"></i> MANAGE RANKS 
                        </div>  
                    </div> 
                    <div class="h-[3px] w-full rounded-full bg-[rgba(93,87,204,0.815)]"></div>
  
                    <div class="flex flex-col text-[13px] tracking-wide p-4">   
                        <div class="flex justify-between items-center rounded p-[5px] bg-gradient-to-r from-[rgba(86,82,163,0.46)] to-[rgba(69,63,167,0.44)] text-[rgb(221,221,221)]">
                            <span><i class="fa-solid fa-user-tag"></i> Rank 1</span>
 
                            <span class="flex flex-row justify-center items-center min-w-[20px] min-h-[20px]">
                                {{ this.clan.ranks[0] }} 

                                <i v-if="this.cdata.rank >= 5" class="fa-solid fa-pen-to-square ml-1 text-green-500 hover:text-green-600" @click="showModal('change rank name', 0)"></i>
                            </span> 
                        </div>  

                        <div class="mt-[5px] flex justify-between items-center rounded p-[5px] bg-gradient-to-r from-[rgba(86,82,163,0.46)] to-[rgba(69,63,167,0.44)] text-[rgb(221,221,221)]">
                            <span><i class="fa-solid fa-user-tag"></i> Rank 2</span>

                            <span class="flex flex-row justify-center items-center min-w-[20px] min-h-[20px]">
                                {{ this.clan.ranks[1] }} 

                                <i v-if="this.cdata.rank >= 5" class="fa-solid fa-pen-to-square ml-1 text-green-500 hover:text-green-600" @click="showModal('change rank name', 1)"></i>
                            </span> 
                        </div>  
                            
                        <div class="mt-[5px] flex justify-between items-center rounded p-[5px] bg-gradient-to-r from-[rgba(86,82,163,0.46)] to-[rgba(69,63,167,0.44)] text-[rgb(221,221,221)]">
                            <span><i class="fa-solid fa-user-tag"></i> Rank 3</span>

                            <span class="flex flex-row justify-center items-center min-w-[20px] min-h-[20px]">
                                {{ this.clan.ranks[2] }} 

                                <i v-if="this.cdata.rank >= 5" class="fa-solid fa-pen-to-square ml-1 text-green-500 hover:text-green-600" @click="showModal('change rank name', 2)"></i>
                            </span> 
                        </div>  

                        <div class="mt-[5px] flex justify-between items-center rounded p-[5px] bg-gradient-to-r from-[rgba(86,82,163,0.46)] to-[rgba(69,63,167,0.44)] text-[rgb(221,221,221)]">
                            <span><i class="fa-solid fa-user-tag"></i> Rank 4</span>

                            <span class="flex flex-row justify-center items-center min-w-[20px] min-h-[20px]">
                                {{ this.clan.ranks[3] }} 

                                <i v-if="this.cdata.rank >= 5" class="fa-solid fa-pen-to-square ml-1 text-green-500 hover:text-green-600" @click="showModal('change rank name', 3)"></i>
                            </span> 
                        </div>  

                        <div class="mt-[5px] flex justify-between items-center rounded p-[5px] bg-gradient-to-r from-[rgba(86,82,163,0.46)] to-[rgba(69,63,167,0.44)] text-[rgb(221,221,221)]">
                            <span><i class="fa-solid fa-user-tag"></i> Rank 5</span>

                            <span class="flex flex-row justify-center items-center min-w-[20px] min-h-[20px]">
                                {{ this.clan.ranks[4] }} 

                                <i v-if="this.cdata.rank >= 5" class="fa-solid fa-pen-to-square ml-1 text-green-500 hover:text-green-600" @click="showModal('change rank name', 4)"></i>
                            </span>
                        </div>  
                    </div>
                </div>  
            </div>

            <div class="w-full ml-[10px]" v-if="this.cdata.id"> 
                <div class="bg-darkPurple rounded w-full h-auto mt-[20px]">
                    <div class="flex flex-row justify-between items-center h-[20px] p-4 text-[15px] font-semibold"> 
                        <div class="w-auto" v-if="this.clanPage == 0">
                            <i class="fa-solid fa-gear"></i> CLAN VEHICLES    
                        </div>  

                        <div class="w-auto" v-if="this.clanPage == 1">
                            <i class="fa-solid fa-users"></i> CLAN MEMBERS     
                        </div>  

                        <div class="w-auto" v-if="this.clanPage == 2">
                            <i class="fa-solid fa-clock-rotate-left"></i> CLAN LOGS   
                        </div>  

                        <div class="flex flex-row items-center">
                            <div class="skew-[-15deg] flex items-center justify-center bg-[#6f6ab1] w-[8rem] h-[1.5rem] opacity-80 text-[14px]" :class="{'bg-[#9893df]': this.clanPage == 0}" @click="this.changeClanPage(0)">
                                <i class="fa-solid fa-warehouse mr-1"></i> Vehicles
                            </div>

                            <div class="skew-[-15deg] flex items-center justify-center bg-[#6f6ab1] w-[8rem] h-[1.5rem] opacity-80 text-[14px]" :class="{'bg-[#9893df]': this.clanPage == 1}" @click="this.changeClanPage(1)">
                                <i class="fa-solid fa-users mr-1"></i> Members
                            </div>
 
                            <div class="skew-[-15deg] flex items-center justify-center bg-[#6f6ab1] w-[8rem] h-[1.5rem] opacity-80 text-[14px]" :class="{'bg-[#9893df]': this.clanPage == 2}" @click="this.changeClanPage(2)">
                                <i class="fa-solid fa-clock-rotate-left mr-1"></i> Logs
                            </div>
                        </div>
                    </div> 
                    <div class="h-[3px] w-full rounded-full bg-[rgba(93,87,204,0.815)]"></div>
  
                    <div class="flex flex-col text-[13px] tracking-wide p-4" v-if="this.clanPage == 0"> 
                        <table class="w-full h-full border-separate"> 
                            <thead class="flex text-white w-full">
                                <tr>
                                    <th class="bg-[#302d58] w-[20rem] h-[28px]">VEHICLE</th>
                                    <th class="bg-[#302d58] w-[20rem] h-[28px]">RANK</th> 
                                    <th class="bg-[#302d58] w-[20rem] h-[28px]">ACTIONS</th> 
                                </tr>
                            </thead>

                            <tbody class="flex flex-col overflow-y-scroll w-full mt-2 h-[21.8rem]">
                                <tr v-for="(item) in this.clanVehicles" :key="item" class="border-b-[2px] border-[rgba(105,90,205,0.404)]"> 
                                    <th class="w-[20rem] min-h-content font-semibold tracking-wide text-sm">
                                   
                                        {{ item.name }}  
                                        <i class="fa-solid fa-circle fa-fade fa-2xs" :style="{color: item.vehicle != null ? '#019e57' : '#FF3A19', 'margin-left': '5px'}"></i> 
                                    </th>
                                    <th class="w-[20rem] min-h-content font-bold tracking-wide text-sm">
                                        
                                        {{ this.clan.ranks[item.rank - 1] }} ({{ item.rank }})
                                        <i style="color: #1b990a; margin-left: 10px;" @click="this.showModal('manage vehicle rank', item);" class="fa-solid fa-pen-to-square edit-hover"></i>

                                    </th> 
                                    <th class="w-[20rem] min-h-content p-1">
                                        
                                        <span class="bg-orange-600 rounded p-[0.22rem] px-[0.32rem] mr-2 hover:bg-orange-600" @click="this.manageVehicle(item, 'tow')" >
                                            <i class="fa-solid fa-square-parking text-sm"></i>
                                        </span>  

                                        <span class="bg-blue-600 rounded p-[0.22rem] px-[0.4rem] mr-2 hover:bg-blue-600" @click="this.manageVehicle(item, 'find')">
                                            <i class="fa-solid fa-location-dot text-sm"></i>
                                        </span>  

                                        <span class="bg-red-500 rounded p-[0.25rem] px-[0.3rem] mr-2 hover:bg-red-500" @click="this.showModal('sell vehicle', item)">
                                            <i class="fa-solid fa-sack-dollar text-sm"></i>
                                        </span>  
                                    </th> 
                                </tr> 
                            </tbody>
                        </table>    
                    </div>

                    <div class="flex flex-col text-[13px] tracking-wide p-4" v-if="this.clanPage == 1" style="zoom:95%;">
                        <table class="w-full h-full border-separate"> 
                            <thead class="flex flex-row items-center justify-center text-white w-full">
                                <tr>
                                    <th class="bg-[#302d58] w-[25rem] h-[28px]">NAME</th>
                                    <th class="bg-[#302d58] w-[22rem] h-[28px]">RANK</th>  
                                    <th class="bg-[#302d58] w-[22rem] h-[28px]">JOINED</th>  
                                    <th class="bg-[#302d58] w-[22rem] h-[28px]">DEPOSITED</th>  
                                    <th class="bg-[#302d58] w-[22rem] h-[28px]">MANAGE</th>  
                                </tr>
                            </thead>

                            <tbody class="flex flex-col overflow-y-scroll w-full mt-2 h-[22rem]">
                                <tr v-for="(item) in this.clan.members" :key="item" class="flex flex-row w-full border-b-[2px] border-[rgba(105,90,205,0.404)]"> 
                                    <th class="flex flex-row items-center w-[13rem] min-h-[3rem] tracking-wide text-xs">
                                   
                                        <img class="mr-2 rounded-full" :src="item.photo" width="35" height="35">
                                        
                                        <div class="font-semibold tracking-wide text-xs" v-if="item.tag == 0"> 
                                            <span :style="{color: '#' + this.clan.color}">{{this.clan.tag}}</span>{{item.name}} 
                                        </div>
        
                                        <div class="font-semibold tracking-wide text-xs" v-if="item.tag == 1"> 
                                            <span :style="{color: '#' + this.clan.color}">{{this.clan.tag}}.</span>{{item.name}} 
                                        </div>  

                                        <div class="font-semibold tracking-wide text-xs" v-if="item.tag == 2"> 
                                            <span :style="{color: '#' + this.clan.color}">[{{this.clan.tag}}]</span>{{item.name}} 
                                        </div>  

                                        <div class="font-semibold tracking-wide text-xs" v-if="item.tag == 3"> 
                                            {{item.name}}<span :style="{color: '#' + this.clan.color}">{{this.clan.tag}}</span> 
                                        </div> 
                                        
                                        <div class="font-semibold tracking-wide text-xs" v-if="item.tag == 4"> 
                                            {{item.name}}<span :style="{color: '#' + this.clan.color}">.{{this.clan.tag}}</span> 
                                        </div> 

                                        <div class="font-semibold tracking-wide text-xs" v-if="item.tag == 5"> 
                                            {{item.name}}<span :style="{color: '#' + this.clan.color}">[{{ this.clan.tag }}]</span> 
                                        </div> 

                                        <div class="font-semibold tracking-wide text-xs" v-if="item.tag == 6"> 
                                            {{item.name}} 
                                        </div>  
                                    </th>

                                    <th class="flex flex-row items-center justify-center w-[12rem] min-h-[3rem] font-bold tracking-wide text-sm">
                                        {{ this.clan.ranks[item.rank - 1] }} ({{ item.rank }}) 
                                    </th> 

                                    <th class="flex flex-row items-center justify-center w-[12rem] min-h-[3rem] font-semibold tracking-wide text-[13px]">
                                        {{ this.getTimeAgo(item.joined) }}
                                    </th> 

                                    <td class="flex flex-col items-center justify-center w-[12rem] min-h-[3rem] font-bold tracking-wide text-xs">
                                        <div class="text-green-600">
                                            <i class="fa-solid fa-sack-dollar"></i> ${{ this.formatThousands(item.money) }}
                                        </div>

                                        <div class="text-yellow-500 mt-1">
                                            <i class="fa-solid fa-coins"></i> {{ item.gold }} gold
                                        </div>
                                    </td>
                                     
                                    <th class="flex flex-row items-center justify-center w-[12rem] min-h-[3rem] font-bold tracking-wide text-sm">
                                        <i v-if="this.cdata.rank >= 5" @click="showModal('manage member', item)" class="fa-solid fa-pen-to-square text-[15px] text-green-500 hover:text-green-600"></i>
                                        <i v-if="this.cdata.permissions[1]" @click="showModal('manage member', item)" class="fa-solid fa-xmark text-[17px] text-red-500 hover:text-red-600 ml-2"></i> 
                                    </th> 
                                </tr> 
                            </tbody>
                        </table>  
                    </div>   
                     
                    <div class="flex flex-col text-[13px] tracking-wide p-4 overflow-y-scroll h-[26.9rem]" v-if="this.clanPage == 2 && this.cdata.rank >= 5 && Object.keys(this.clan.logs).length">   
                        <div v-for="(item, index) in this.clan.logs" :key="item" :class="{'mt-[5px]': index > 0}" class="flex justify-between items-center rounded p-[5px] bg-gradient-to-r from-[rgba(86,82,163,0.46)] to-[rgba(69,63,167,0.44)] text-[rgb(221,221,221)]">
                            <span class="text-[13px] font-medium">
                                {{item}}
                            </span>
 
                            <i class="fa-solid fa-xmark text-[17px] mr-2 text-red-500 hover:text-red-600" @click="this.showModal('delete log', index)"></i> 
                        </div>  
                    </div> 
                </div>                   
            </div>                       
        </div>               
    </div>         
</template>
  
<script> 
    export default {
        name: 'ProfileComponent',

        data: function() {
            return { 
                clanPage: 1,
                clanModal: { status: false, title: '', description: '', option: '', input: 0, selected: null, selectedAction: null },
                cdata: { id: 1, tag: 5, rank: 5, permissions: [true, true, true, true] },
                clanVehicles: 
                [
                    {name: 'infernus', rank: 1},
                    {name: 'infernus', rank: 1},  
                ],
                clan:
                {
                    id: 1,
                    name: 'The Legends',
                    tag: 'GANG',
                    color: 'ff00ff', 

                    slots: 20,
                    vehslots: 10,
                    money: 100000,
                    gold: 20,
                    expire: '29', 
                    
                    logs: ['MihaiADV a fost data afara din clan de catre Flint','MihaiADV a fost data afara din clan de catre Flint','MihaiADV a fost data afara din clan de catre Flint','MihaiADV a fost data afara din clan de catre Flint','MihaiADV a fost data afara din clan de catre Flint','MihaiADV a fost data afara din clan de catre Flint','MihaiADV a fost data afara din clan de catre Flint','MihaiADV a fost data afara din clan de catre Flint','MihaiADV a fost data afara din clan de catre Flint','MihaiADV a fost data afara din clan de catre Flint','MihaiADV a fost data afara din clan de catre Flint','MihaiADV a fost data afara din clan de catre Flint','MihaiADV a fost data afara din clan de catre Flint','MihaiADV a fost data afara din clan de catre Flint','MihaiADV a fost data afara din clan de catre Flint','MihaiADV a fost data afara din clan de catre Flint','MihaiADV a fost data afara din clan de catre Flint','MihaiADV a fost data afara din clan de catre Flint'],
                    ranks: [ 'Rank 1', 'Rank 2', 'Rank 3', 'Rank 4', 'Owner' ],  
                    members: [], 
                },
 
                page: 0,
              
                level: 20,
                hours: 0,
                experience: 2000,
                name: 'MihaiADV',
                image: 'https://i.imgur.com/nnzVjHY.png', 
                levelPercent: 20,
                registered: '3 months ago',
                payday: 200,
                money: 10000,
                bank: 1000, 
                house: 1,
                business: 1, 
                vehicles: 20, 
                driving: 0,
                motorbike: 1, 
                warns: 0,
                mute: 100,  
                faction: 'Los Santos Police',
                factionid: 1,
                joined: '21 ian 2023 [12:20]',
                rank: 1,
                arrests: 20,
                commands: 20, 
                factionsLogs: [], 

                setting:
                {
                    'hotkeys': false,
                    'newbie': true,
                    'voice': false,
                    'radio': false, 
                    'radioVolume': 50,
                    'voiceVolume': 50,
                },

                config: 
                {   
                    dashboardTitle: 
                    [ 
                        ['Account', 'Licences', 'Account Penalties', 'Properties'], 
                        ['GENERAL', 'FACTIONS HISTORY'], 
                        ['HUD & CHAT', 'AUDIO', 'HOTKEYS'],
                        ['s', 's', 's'],
                        ['DAILY QUESTS', 'ACHIEVEMENTS', 's']
                    ] 
                }, 

                keysData: { 
                    selected: '',
                    hash: '',
                    bind: null,
                    id: null 
                }, 

                keys: 
                [
                    {id: 38, key: "UP", hash: "0x26"},  
                    {id: 48, key: "0", hash: "0x30"}, 
                    {id: 49, key: "1", hash: "0x31"},
                    {id: 50, key: "2", hash: "0x32"}, 
                    {id: 51, key: "3", hash: "0x33"},
                    {id: 52, key: "4", hash: "0x34"}, 
                    {id: 53, key: "5", hash: "0x35"},
                    {id: 54, key: "6", hash: "0x36"}, 
                    {id: 55, key: "7", hash: "0x37"},
                    {id: 56, key: "8", hash: "0x38"}, 
                    {id: 57, key: "9", hash: "0x39"},  
                    {id: 65, key: "A", hash: "0x41"}, 
                    {id: 66, key: "B", hash: "0x42"},
                    {id: 67, key: "C", hash: "0x43"}, 
                    {id: 68, key: "D", hash: "0x44"},
                    {id: 69, key: "E", hash: "0x45"}, 
                    {id: 70, key: "F", hash: "0x46"},
                    {id: 71, key: "G", hash: "0x47"}, 
                    {id: 72, key: "H", hash: "0x48"},
                    {id: 73, key: "I", hash: "0x49"}, 
                    {id: 74, key: "J", hash: "0x4A"},
                    {id: 75, key: "K", hash: "0x4B"}, 
                    {id: 76, key: "L", hash: "0x4C"},
                    {id: 77, key: "M", hash: "0x4D"}, 
                    {id: 78, key: "N", hash: "0x4E"},
                    {id: 79, key: "O", hash: "0x4F"}, 
                    {id: 80, key: "P", hash: "0x50"},
                    {id: 81, key: "Q", hash: "0x51"}, 
                    {id: 82, key: "R", hash: "0x52"},
                    {id: 83, key: "S", hash: "0x53"}, 
                    {id: 84, key: "T", hash: "0x54"},
                    {id: 85, key: "U", hash: "0x55"}, 
                    {id: 86, key: "V", hash: "0x56"},
                    {id: 87, key: "W", hash: "0x57"}, 
                    {id: 88, key: "X", hash: "0x58"},
                    {id: 89, key: "Y", hash: "0x59"}, 
                    {id: 90, key: "Z", hash: "0x5A"},  
                     
                ],
        
                //Aici sunt bindurile pe care playeru le poate folosi [PRESETATE]
                bindKeys: 
                { 
                    'CHAT': { id: 84, has: 0x43, key: 'T'}, 
                    'TALK': { id: 75, has: 0x4B, key: 'K'},
                    'PHONE': { id: 38, has: 0x26, key: 'UP'}, 
                    'INVENTORY': {id: 89, has: 0x43, key: 'Y'}, 
                    'PROFILE & SETTINGS': { id: 77, has: 0x43, key: 'M'},
                    'PLAYERS LIST': { id: 90, has: 0x43, key: 'Z'}, 
                    'VEHICLE LOCK': { id: 76, has: 0x43, key: 'L'}, 
                    'VEHICLE ENGINE': {id: 50, has: 0x43, key: '2'}, 
                    'VEHICLE SEATBELT': {id: 71, has: 0x43, key: 'G'}
                },
                 
                quests: 
                [
                    {
                        title: '',
                        progress: 5,
                        totalProgress: 5
                    },

                    {
                        title: '',
                        progress: 5,
                        totalProgress: 5
                    },
                ],

                achievements: 
                { 
                    data: [ 
                        'Obtine licenta de condus',
                        'Munceste la unul din joburile de pe server',
                        'Achizitioneaza o masina din Showroom',
                        'Devino membrul unei factiuni'
                    ],

                    achievement: [ false, false, false, false, false, false, false ]
                }
            };
        },    

        mounted()
        { 
            window.ProfileComponent = this; 
            
            if(window.mp)
            {
                window.e_rpc.add('reloadClanProfile', (data) =>
                {
                    const raw = JSON.parse(data)

                    this.clan = raw.clanData;
                    this.cdata = raw.clan;  
                    this.clanVehicles = raw.clanVehicles;
                     
                    this.page = (!this.clan.id ? 0 : 3);

                    return this.showModal('exit');
                }); 
            }
            if(window.mp)
            {
                window.e_rpc.add('closeClanModal', () =>
                { 
                    return this.showModal('exit');
                }); 
            } 

            setTimeout(() => {
                document.onkeydown = evt => {
  
                    evt = evt || window.event;

                    const index = this.keys.findIndex(object => object.id == evt.keyCode);

                    if(evt.keyCode == 27) //ESC key 
                    {
                        this.keysData = { 
                            selected: '',
                            hash: '',
                            bind: null,
                            id: null 
                        }; 
                    } 
                    if(index != -1)
                    {  
                        if(this.keys[index].id == evt.keyCode)
                        {    
                            if(this.keysData.bind != null)
                            {   
                                if(evt.keyCode == 27 || evt.keyCode == 69 || evt.keyCode == 70 || evt.keyCode == 71)
                                {
                                    if(window.mp) {
                                        return window.e_trigger("client::hud:sendNotify", 'error', 'This keys is invalid (use: A - Z / 0 - 9) (excepting F/G/E/ESC).');  
                                    }   
                                    return true;
                                }

                                if(this.haveAlreadyBind(evt.keyCode))
                                {  
                                    if(window.mp) {
                                        return window.e_trigger("client::hud:sendNotify", 'error', 'You already have a bind on this key.');  
                                    } 
                                    return;  
                                }

                                this.keysData.selected = this.keys[index].key;   
                                this.keysData.hash = this.keys[index].hash;   
                                this.keysData.id = this.keys[index].id; 
                                
                                this.bindKeys[this.keysData.bind].key = this.keysData.selected;
                    
                                if(window.mp) {  
                                    window.e_rpc('server::profile:changeKey', JSON.stringify({
                                        key: this.keysData.selected, forBind: this.keysData.bind, hash: this.keysData.hash, id: this.keysData.id
                                    }));
                                }  

                                return this.keysData.bind = null;
                            } 
                        }
                    }
                }
            }, 1000);    
        },
  
        methods: 
        {  
            fmHoursMinutesSeconds(seconds) {
                return [
                    parseInt(seconds / 60 / 60),
                    parseInt(seconds / 60 % 60),
                    parseInt(seconds % 60)
                ]
                .join(":")
                .replace(/\b(\d)\b/g, "0$1")
            },
 
            getTimeAgo(databaseTimestamp) 
            {
                const timestamp = new Date(databaseTimestamp);
                const now = new Date();
                const diffInMilliseconds = now - timestamp;
                const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
            
                if(diffInMinutes < 1) 
                {
                    return 'just now';
                } 
                else if(diffInMinutes === 1) 
                {
                    return '1 minute ago';
                } 
                else if(diffInMinutes < 60) 
                {
                    return `${diffInMinutes} minutes ago`;
                } 
                else if(diffInMinutes < 1440) 
                {
                    const diffInHours = Math.floor(diffInMinutes / 60);
                    return `${diffInHours} hour ${diffInHours > 1 ? 's' : ''} ago`;
                } 
                else 
                {
                    const diffInDays = Math.floor(diffInMinutes / 1440);
                    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
                }
            },

            updateSlider(event, index) 
            {     
                if(window.mp) {
                    return window.e_trigger("client::profile:changeVolume", index, event.target.value);  
                }    
            },
 
            formatThousands(x)
            {
                return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); 
            },

            open: function(data, settings, bindsData, logsFactions)
            {
                data = JSON.parse(data);
                settings = JSON.parse(settings);
            
                this.level = data.level,
                this.experience = data.experience;
                this.image = data.image;
                this.name = data.name;
                this.hours = data.hours;
                this.levelPercent = data.levelPercent; 
                this.registered = data.registered;
                this.payday = data.payday;
                this.money = data.money;
                this.bank = data.bank; 
                this.house = data.house;
                this.business = data.business; 
                this.vehicles = data.vehicles; 
                this.driving = data.driving;
                this.motorbike = data.motorbike; 
                this.warns = data.warns;
                this.mute = data.mute;

                this.faction = data.faction, 
                this.factionid = data.factionid, 
                this.joined = data.joined, 
                this.rank = data.rank, 
                this.arrests = data.arrests, 
                this.commands = data.commands, 
                this.factionsLogs = logsFactions;

                this.cdata = data.clan;
                this.clan = data.clanData;
                this.clanVehicles = data.clanVehicles;

                this.quests = data.quests;
                this.achievements = data.achievements;

                //Settings
                this.setting = 
                {
                    'hotkeys': settings.hotkeys,
                    'newbie': settings.newbie,
                    'voice': settings.voice,
                    'radio': settings.radio,

                    'radioVolume': settings.radioVolume,
                    'voiceVolume': settings.voiceVolume,
                } 

                this.bindKeys = bindsData; 
                this.page = 0; 
                this.active = true;
            },
    
            changePage: function(index)
            {
                this.page = index;

                this.keysData = { 
                    selected: '',
                    hash: '',
                    bind: null,
                    id: null 
                }; 
            },

            calculateExperience: function(x)
            {
                return x.toString().replace(/\B(?=(\d{2})+(?!\d))/g, ".")  
            },

            changeSetting: function(index)
            {
                this.setting[index] = !this.setting[index];

                if(window.mp) 
                {
                    return window.e_trigger("client::profile:changeSetting", index, this.setting[index]);  
                }    
            },

            findProperty: function(option) 
            {
                if(window.e_rpc)
                {  
                    window.e_rpc('server::profile:findProperty', option);
                } 
            },
 
            fmtMSS: function(s)
            {
                return(s-(s%=60))/60+(9<s?':':':0')+s
            },   

            changeKey: function(index) 
            {
                if(this.keysData.bind != null)
                    return;
 
                this.keysData.selected = this.bindKeys[index].key;
                this.keysData.bind = index; 
            }, 
   
            haveAlreadyBind: function(key)
            {
                let status = false;

                for(var index in this.bindKeys)
                {
                    if(this.bindKeys[index].id == key)
                    {
                        status = true;
                        console.log(1)
                    } 
                } 
                return status;
            },

 
            //--------------------------------------------------------------[CLAN SYSTEM]--------------------------------------------------------------//
            showModal(option, id = 0)
            { 
                switch(option)
                {
                    case 'exit': { this.clanModal = { status: false, title: '', description: '', option: 'option', selected: null, input: '' }; break; }
                    case 'quit':
                    {
                        this.clanModal = { status: true, title: 'QUIT CLAN', description: 'Are you sure you want to leave this clan?', option: 0, selected: null, selectedAction: null, input: '' };
                        break;
                    } 

                    case 'upgrade clan': //1
                    { 
                        this.clanModal = { status: true, title: 'UPGRADE CLAN', description: '', option: 1, selected: null, selectedAction: null, input: '' };
                        break;
                    }

                    case 'upgrade clan vehicles': //2
                    { 
                        this.clanModal = { status: true, title: 'UPGRADE CLAN', description: '', option: 2, selected: null, selectedAction: null, input: '' };
                        break;
                    }

                    case 'extend clan': //3
                    {
                        this.clanModal = { status: true, title: 'EXTEND CLAN', description: '', option: 3, selected: null, selectedAction: null, input: '' };
                        break;
                    }

                    case 'deposit':  //4
                    {
                        this.clanModal = { status: true, title: 'CLAN SAFEBOX', description: 'Enter the amount you wish to deposit into the clan safebox', option: 4, selected: null, selectedAction: null, input: '' };
                        break; 
                    }

                    case 'change rank name':  //5
                    {  
                        this.clanModal = { status: true, title: 'CHANGE RANK NAME', description: 'Please enter the new name of ' + this.clan.ranks[id] , option: 5, selected: id, selectedAction: null, input: '' };
                        break; 
                    }

                    case 'manage member':
                    {
                        this.clanModal = { status: true, title: 'MEMBER MANAGEMENT', description: 'Please select what action you want to take for ' + id.name, option: 6, selected: id, selectedAction: null, input: '' }; 
                        break; 
                    }

                    case 'manage rank':
                    {
                        this.clanModal = { status: true, title: 'Change Member Rank', description: 'Please select the new rank for ' + id.name, option: 7, selected: id, selectedAction: null, input: '' }; 
                        break;
                    }

                    case 'manage permissions':
                    {
                        this.clanModal = { status: true, title: 'Manage Member Permissions', description: 'Please select what permissions you want to toggle for ' + id.name, option: 8, selected: id, selectedAction: null, input: '' }; 
                        break;
                    }

                    case 'kick member':
                    {
                        this.clanModal = { status: true, title: 'KICK MEMBER', description: 'Are you sure you want to kick member ' + id.name + '?', option: 9, selected: id, selectedAction: null, input: '' }; 
                        break; 
                    }

                    case 'delete log':
                    {
                        this.clanModal = { status: true, title: 'DELETE LOG', description: 'Are you sure you want to delete this log?', option: 10, selected: id, selectedAction: null, input: '' }; 
                        break; 
                    }

                    case 'sell vehicle':
                    { 
                        this.clanModal = { status: true, title: 'SELL VEHICLE', description: 'Are you sure you want to sell this ' + id.name + ' to state for $5.000.000?', option: 11, selected: id, selectedAction: null, input: '' }; 
                        break; 
                    }

                    case 'change color':
                    { 
                        if(this.cdata.rank != 5)
                            return; //TODO de verficiat
 
                        this.clanModal = { status: true, title: 'CHANGE COLOR', description: 'Enter the hex color in the box below (ex: ff00ff).', option: 12, selected: null, selectedAction: null, input: this.clan.color }; 
                        break; 
                    }

                    case 'manage vehicle rank':
                    {
                        this.clanModal = { status: true, title: 'CHANGE VEHICLE RANK', description: 'Please select the new rank for ' + id.name, option: 13, selected: id, selectedAction: null, input: '' }; 
                        break; 
                    }
                } 
            },

            executeModal()
            {
                switch(this.clanModal.option)
                {
                    case 0:
                    {
                        if(window.e_rpc)
                        {
                            window.e_rpc('server:clans::leave');
                        }
                        break;
                    }

                    case 1:
                    {
                        if(window.e_rpc)
                        {
                            window.e_rpc('server:clans::upgrade:slots');
                        }
                        break;
                    }

                    case 2:
                    {
                        if(window.e_rpc)
                        {
                            window.e_rpc('server:clans::upgrade:vehicles');
                        }
                        break;
                    }

                    case 3:
                    {
                        if(window.e_rpc)
                        {
                            window.e_rpc('server:clans::upgrade:days');
                        }
                        break;
                    }
                    
                    case 4:
                    {
                        if(!this.clanModal.input)
                            return;

                        if(window.e_rpc)
                        {
                            window.e_rpc('server:clans::safebox:deposit', this.clanModal.input);
                        }
                        break;
                    }

                    case 5:
                    {
                        if(window.e_rpc)
                        {
                            window.e_rpc('server:clans::ranks:changename', JSON.stringify({input: this.clanModal.input, selected: this.clanModal.selected}));
                        }
                        break;
                    }
                    case 6: { break; }
                    case 7: 
                    {  
                        if(window.e_rpc)
                        {
                            window.e_rpc('server:clans::ranks:change', JSON.stringify({ rank: this.clanModal.selectedAction - 2, selected: this.clanModal.selected }));
                        }
                        break;
                    }
 
                    case 8:
                    {
                        switch(this.clanModal.selectedAction)
                        {
                            case 8:
                            {  
                                if(window.e_rpc)
                                {
                                    window.e_rpc('server:clans::members:permissions:manage', JSON.stringify({ selected: this.clanModal.selected, option: 0 }));
                                }
                                break;
                            }
                            case 9:
                            { 
                                if(window.e_rpc)
                                {
                                    window.e_rpc('server:clans::members:permissions:manage', JSON.stringify({ selected: this.clanModal.selected, option: 1 }));
                                }
                                break;
                            }
                            case 10:
                            { 
                                if(window.e_rpc)
                                {
                                    window.e_rpc('server:clans::members:permissions:manage', JSON.stringify({ selected: this.clanModal.selected, option: 2 }));
                                }
                                break;
                            }
                        }
                        break;
                    }
                    case 9:
                    {
                        if(window.e_rpc)
                        {
                            window.e_rpc('server:clans::members:kick', JSON.stringify({ selected: this.clanModal.selected }));
                        }
                        break;
                    }
                    case 10:
                    {
                        if(window.e_rpc)
                        {
                            window.e_rpc('server:clans::log:delete', JSON.stringify({ selected: this.clanModal.selected }));
                        }
                        break;
                    }

                    case 11:
                    {   
                        this.manageVehicle(this.clanModal.selected, 'sell');
                        break; 
                    }

                    case 12:
                    {  
                        let Reg_Exp = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;
 
                        if(Reg_Exp.test('#' + this.clanModal.input) && (this.clanModal.input).length >= 6)
                        {
                            if(window.e_rpc)
                            {
                                return window.e_rpc('server:clans::manage:color', this.clanModal.input);
                            }
                        }  
                        break;   
                    }

                    case 13: //11/12/13/14 - ranks
                    { 
                        if(window.e_rpc)
                        {
                            window.e_rpc('server:clans::vehicles:rank:change', JSON.stringify({ selected: this.clanModal.selected, rank: (this.clanModal.selectedAction - 10) }));
                        }
                        break;
                    }
                }
            },

            selectModalOption(option, user)
            { 
                if(this.clanModal.selectedAction == option) {
                    return this.clanModal.selectedAction = null;
                }
 
                if(option == 0) { 
                    return this.showModal('manage permissions', user);
                }

                if(option == 1) {
                    return this.showModal('manage rank', user);
                }
 
                return this.clanModal.selectedAction = option;
            },

            changeClanPage(page)
            {
                this.clanPage = page;
            },

            changeClanTag(option)
            {
                if(window.e_rpc) {
                    return window.e_rpc('server:clans::tag:change', option);
                }
            },

            manageVehicle(item, action)
            { 
                if(window.e_rpc) {
                    return window.e_rpc('server:clans::vehicles:manage', JSON.stringify({item: item, action: action}));
                }
            },

            isValidHex(testNum)
            {
                let validHex = false;
                let numLength = testNum.length;
                let parsedNum = parseInt(testNum, 16);
                if(!isNaN(parsedNum) && parsedNum.length===numLength){
                    validHex = true;
                }
                return validHex;
            },

            getQuestProgress(index)
            { 
                const progress =
                { 
                    0: 0,
                    1: 20,
                    2: 45,
                    3: 65,
                    4: 75,
                    5: 100
                };

                return (this.quests[index].progress == this.quests[index].totalProgress ? 100 : progress[this.quests[index].progress])
            }
        }    
    } 
</script>