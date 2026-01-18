 
<template>   
    <div class="w-full h-full">  
        <div v-show="this.modalPage.status" class="absolute text-white w-full h-full font-inter z-1 left-0 right-0">   
            <div class="global-modal-effect"></div> 

            <div class="absolute w-full h-full flex justify-center items-center text-center flex-col z-50 left-0 right-0">  
             
                <i class="fa-solid fa-triangle-exclamation text-orange-400 text-8xl"></i>
                
                <div class="font-bold text-3xl mt-3 text-orange-400">{{this.modalPage.title}}</div>

                <div class="font-semibold text-normal tracking-wide mt-1 w-1/4"> 
                    {{ this.modalPage.description }}
                </div> 
 
                <div class="w-full flex flex-col items-center mt-3" v-if="this.modalPage.option === 'wanted'"> 
                    <div :class="{'bg-[#a0a0a046]': this.modalPage.selected == item}" class="w-[22.5rem] h-[3.2rem] flex flex-col justify-center items-center bg-[#a0a0a01c] rounded mt-2 border-2 border-[#a0a0a01e] hover:bg-[#a0a0a046]" v-for="(item) in this.wantedData" :key="item" @click="this.selectModalOption(item)">
                        <div class="font-semibold text-[14px]">{{ item.reason }}</div> 
                        <div class="font-medium tracking-[1px] text-xs">Wanted: {{ item.level }}</div> 
                    </div>  
                </div>  
 
                <div class="w-full flex flex-col items-center mt-3" v-if="this.modalPage.option === 'ticket'"> 
                    <div :class="{'bg-[#a0a0a046]': this.modalPage.selected == item}" class="w-[22.5rem] h-[3.2rem] flex flex-col justify-center items-center bg-[#a0a0a01c] rounded mt-2 border-2 border-[#a0a0a01e] hover:bg-[#a0a0a046]" v-for="(item) in this.ticketData" :key="item" @click="this.selectModalOption(item)">
                        <div class="font-semibold text-[14px]">{{ item.reason }}</div> 
                        <div class="font-medium tracking-[1px] text-xs">
                            Amount: <span class="text-green-500">${{ this.formatThousands2(item.amount) }}</span>  
                        </div> 
                    </div>  
                </div> 

                <div class="w-full flex flex-col items-center mt-3" v-if="this.modalPage.option === 'licence'">  
                    <div :class="{'bg-[#a0a0a046]': this.modalPage.selected == 'car'}" class="w-[20rem] h-[3.2rem] flex flex-col justify-center items-center bg-[#a0a0a01c] rounded mt-2 border-2 border-[#a0a0a01e] hover:bg-[#a0a0a046]" @click="this.selectModalOption('car')">
                        <div class="font-semibold text-[16px]">Car licence</div>  
                        <div class="font-medium tracking-[1px] text-xs">
                            Status: <span :class="{'!text-red-600': !this.players_results[this.selected].licences[0]}" class="text-green-600 font-semibold">{{this.players_results[this.selected].licences[0] ? 'owned' : 'not owned'}}</span>   
                        </div> 
                    </div>  

                    <div :class="{'bg-[#a0a0a046]': this.modalPage.selected == 'motorycle'}" class="w-[20rem] h-[3.2rem] flex flex-col justify-center items-center bg-[#a0a0a01c] rounded mt-2 border-2 border-[#a0a0a01e] hover:bg-[#a0a0a046]" @click="this.selectModalOption('motorycle')">
                        <div class="font-semibold text-[16px]">Moto licence</div>  
                        <div class="font-medium tracking-[1px] text-xs"> 
                            Status: <span :class="{'!text-red-600': !this.players_results[this.selected].licences[1]}" class="text-green-600 font-semibold">{{this.players_results[this.selected].licences[1] ? 'owned' : 'not owned'}}</span>   
                        </div> 
                    </div>  
                </div> 
 
                <div class="font-medium tracking-wider text-base flex flex-row mt-6">  
                    <button @click="this.executePageModal();" :class="{'!bg-green-700': this.modalPage.selected != null}" class="rounded bg-purple-800 w-40 h-10 mx-5"><i class="fa-solid fa-check"></i> Select</button> 
                    <button @click="this.closePageModal();" class="rounded bg-purple-800 hover:bg-red-700 w-40 h-10 mx-5"><i class="fa-solid fa-xmark"></i> Close</button>
                </div> 
            </div> 
        </div>


        <div class="absolute w-full h-full "> 
            <div class="background-global-effect"></div> 
            <div class="w-full h-full flex flex-col justify-center items-center"> 
                <div class="w-3/5 h-12 rounded flex flex-row justify-between items-center text-white bg-darkBlack font-inter">    
                    <div class="h-full w-auto flex flex-row justify-center items-center ml-4"> 
                        
                        <img :src="player.photo" class="rounded-full w-10"> 
                        
                        <div class="flex flex-col text-left ml-2"> 
                            <div class="font-medium text-sm opacity-100">{{player.name}}</div>
                            <div class="font-medium text-xs opacity-90">Faction: {{player.faction}} (rank {{ player.rank }})</div>
                        </div> 
                    </div>

                    <div class="flex flex-row justify-center items-center mr-4">
                        <div :class="{'!border-red-500': this.page == 1}" class="flex justify-center items-center border-b-[2px] border-gray-300 hover:border-red-500 w-44 h-8 font-medium tracking-wide text-sm ml-2" @click="change_page(1)"><i style="margin-right: 3px;" class="fa-solid fa-star"></i> Wanted List</div>
                        <div :class="{'!border-red-500': this.page == 2}" class="flex justify-center items-center border-b-[2px] border-gray-300 hover:border-red-500 w-44 h-8 font-medium tracking-wide text-sm ml-2" @click="change_page(2)"><i style="margin-right: 3px;" class="fa-solid fa-handcuffs"></i> Arrested Players</div>
                        <div :class="{'!border-red-500': this.page == 3}" class="flex justify-center items-center border-b-[2px] border-gray-300 hover:border-red-500 w-44 h-8 font-medium tracking-wide text-sm ml-2" @click="change_page(3)"><i style="margin-right: 3px;" class="fa-solid fa-magnifying-glass"></i> Search Player</div> 
                    </div> 
                </div> 


                <div class="w-3/5 rounded flex justify-center items-center text-white bg-darkBlack font-inter mt-4" :style="{height: this.selected != null ? '20rem' : '40rem'}">    
                    <div class="w-full h-full p-2 " v-show="this.page == 1"> 
                        <table class="w-full h-full border-separate"> 
                            <thead class="flex text-white w-full">
                                <tr>
                                    <th class="bg-[#7863d4] w-72 h-4"><i class="fa-solid fa-signature"></i> Player</th>
                                    <th class="bg-[#7863d4] w-72 h-4"><i class="fa-solid fa-star"></i> Wanted</th> 
                                    <th class="bg-[#7863d4] w-72 h-4"><i class="fa-solid fa-location-arrow"></i> Distance</th>
                                    <th class="bg-[#7863d4] w-72 h-4"><i class="fa-solid fa-user-gear"></i> Options</th> 
                                </tr>
                            </thead>

                            <tbody class="flex flex-col overflow-y-scroll w-full mt-2 h-[30rem]" v-if = "wantedList.length">
                                <tr v-for="(item) in this.wantedList" :key="item"> 
                                    <th class="border-2 border-[#7863d4] w-72 min-h-content font-semibold tracking-wide text-sm">{{item.name}}</th>
                                    <th class="border-2 border-[#7863d4] w-72 min-h-content font-bold tracking-wide text-sm">{{item.wanted.level}}</th> 
                                    <th class="border-2 border-[#7863d4] w-72 min-h-content font-semibold tracking-wide text-sm">{{this.calculateDistance({x: item.position.x, y: item.position.y, z: item.position.z}, {x: this.player.position.x, y: this.player.position.y, z: this.player.position.z}).toFixed(0)}} M</th>
                                    <th class="border-2 border-[#7863d4] w-72 min-h-content p-1">
                                        
                                        <span class="bg-orange-500 rounded p-[0.1rem] px-2 hover:bg-orange-700" @click="wantedTracking(item.name)">
                                            <i class="fa-solid fa-location-dot text-sm"></i>
                                        </span> 

                                        <span class="bg-red-500 rounded p-[0.1rem] px-1 ml-2 hover:bg-red-600" @click="clearWanted(item.name)">
                                            <i class="fa-solid fa-user-slash text-sm"></i>
                                        </span>  
                                    </th> 
                                </tr> 
                            </tbody>
                        </table>
                    </div> 
    
                    <div class="w-full h-full p-2 " v-show="this.page == 2"> 
                        <table class="w-full h-full border-separate"> 
                            <thead class="flex text-white w-full">
                                <tr>
                                    <th class="bg-[#7863d4] w-96 h-4"><i class="fa-solid fa-signature"></i> Player</th>
                                    <th class="bg-[#7863d4] w-96 h-4"><i class="fa-regular fa-clock"></i> Time</th>  
                                    <th class="bg-[#7863d4] w-96 h-4"><i class="fa-solid fa-user-gear"></i> Options</th> 
                                </tr>
                            </thead>

                            <tbody class="flex flex-col overflow-y-scroll w-full mt-2 h-[30rem]" v-if = "arrestedPlayers.length">
                                <tr v-for="(item) in this.arrestedPlayers" :key="item"> 
                                    <th class="border-2 border-[#7863d4] w-96 min-h-content font-semibold tracking-wide text-sm">{{item.name}}</th>
                                    <th class="border-2 border-[#7863d4] w-96 min-h-content font-bold tracking-wide text-sm">{{this.fmtMSS(item.time)}}</th> 
                                    <th class="border-2 border-[#7863d4] w-96 min-h-content p-1">
                                        
                                        <span class="bg-orange-500 rounded p-[0.1rem] px-2 hover:bg-orange-700" @click="wantedTracking(item.name)">
                                            <i class="fa-solid fa-location-dot text-sm"></i>
                                        </span>  
                                    </th> 
                                </tr> 
                            </tbody>
                        </table> 
                    </div>  

                    <div class="w-full h-full p-2 flex flex-col items-center min-h-[33.6rem]" v-show="this.page == 3"> 

                        <input v-if="!this.modal" spellcheck="false" class="w-[30rem] h-8 bg-darkPurple text-white rounded-lg text-center font-medium tracking-normal mt-2 focus:border-2 border-violet-500 focus:rounded-full" type="name" placeholder="Search player" v-model="input" v-model.number="input" onkeyup="this.value" @keyup="searchData()">
                        <div v-if="!this.modal" class="flex justify-center items-center w-full h-[2px] bg-darkPurple rounded mt-2"></div>
    
                        <table class="w-full border-separate mt-2" v-if="!this.modal"> 
                            <thead class="flex text-white w-full">
                                <tr>
                                    <th class="bg-[#7863d4] w-96 h-4"><i class="fa-solid fa-signature"></i> Player</th>
                                    <th class="bg-[#7863d4] w-96 h-4"><i class="fa-solid fa-arrow-up-wide-short"></i> Level</th>
                                    <th class="bg-[#7863d4] w-96 h-4"><i class="fa-solid fa-star"></i> Wanted</th>
                                </tr> 
                            </thead>

                            <tbody class="flex flex-col overflow-y-scroll w-full mt-2 h-[30rem]" v-if="this.players_results.length">
                                <tr v-for="(item, index) in this.players_results" :key="item">  
                                    <th class="border-2 border-[#7863d4] w-96 min-h-content font-semibold tracking-wide text-sm">
                                        <i class="fa-solid fa-eye hover:text-yellow-600" @click="this.viewPlayer(index)"></i> {{ item.name }}
                                    </th>

                                    <th class="border-2 border-[#7863d4] w-96 min-h-content font-semibold tracking-wide text-sm">{{ item.level }}</th>
                                    <th class="border-2 border-[#7863d4] w-96 min-h-content font-semibold tracking-wide text-sm">{{ item.wanted.level ? 'Yes (wanted ' + item.wanted.level + ')': 'No' }}</th> 
                                </tr> 
                            </tbody> 
                        </table> 
                        
                        <div class="w-full flex flex-row justify-between mt-40" v-if="this.modal == 1 && this.selected != null">
    
                            <div class="flex flex-col justify-center items-center min-w-[20rem] max-w-[45rem] ml-5">
                                <div class="flex flex-col items-center w-full">
                                    <div class="flex flex-row items-center w-full"> 
                                        <i class="fa-regular fa-circle-left font-bold text-2xl mr-2 hover:text-orange-400" @click="this.goBack()"></i>  
                                    
                                        <span class="text-orange-400 font-bold text-lg">
                                            {{players_results[selected].name}}
                                        </span> 
                                    </div>

                                    <div class="w-full h-[2px] bg-darkPurple rounded mt-1"></div>
                                </div> 
    
                                <div class="flex flex-col justify-items-start text-left w-full mt-2 opacity-80" v-show="!this.showWanted"> 
                                    <div class="font-medium tracking-wide text-sm flex justify-between items-center w-full h-auto">
                                        Level: <span>{{players_results[selected].level}}</span> 
                                    </div>

                                    <div class="font-medium tracking-wide text-sm flex justify-between items-center w-full h-auto">
                                        Gender: <span>{{players_results[selected].gender}}</span>
                                    </div> 
                                    
                                    <div class="font-medium tracking-wide text-sm flex justify-between items-center w-full h-auto">
                                        Faction: <span>{{players_results[selected].faction}}</span>
                                    </div> 

                                    <div class="font-medium tracking-wide text-sm flex justify-between items-center w-full h-auto">
                                        Wanted: 
                                        <span>{{!players_results[selected].wanted.level ? 'No' : 'Yes ' + '(wanted ' + players_results[selected].wanted.level  + ')'}} 
                                            <i v-if="players_results[selected].wanted.level" class="fa-solid fa-eye hover:text-red-400 text-opacity-100" @click="showWantedReasons()"></i>
                                        </span>
                                    </div> 

                                    <div class="font-medium tracking-wide text-sm flex justify-between items-center w-full h-auto">
                                        Arrested: <span>{{players_results[selected].arrested}}</span>
                                    </div>  

                                    <div class="font-medium tracking-wide text-sm flex justify-between items-center w-full h-auto">
                                        
                                        Licences:   
                                        <div class="flex flex-row justify-items-start text-right w-auto h-auto">
                                            <i class="fa-solid fa-car ml-2" v-if="players_results[selected].licences[0]"></i> 
                                            <i class="fa-solid fa-motorcycle ml-2" v-if="players_results[selected].licences[1]"></i>   
                                        </div> 
                                    </div> 
                                </div>   
    
                                <table class="w-full h-full border-separate mt-2" v-if="players_results.length && this.showWanted && selected != null && this.players_results[selected].wanted"> 
                                    <thead class="flex text-white w-full">
                                        <tr>
                                            <th class="bg-[#7863d4] w-60 h-4 tracking-wide font-medium text-[13px]"><i class="fa-solid fa-star"></i> Reason</th>
                                            <th class="bg-[#7863d4] w-40 h-4 tracking-wide font-medium text-[14px]"><i class="fa-solid fa-user"></i> Issuer</th>  
                                        </tr> 
                                    </thead>

                                    <tbody class="flex flex-col overflow-y-scroll w-full mt-2 h-[9.4rem]" v-if="this.players_results.length">
                                        <tr v-for="(item, index) in players_results[selected].wanted.reporters" :key="item">  
                                            <th class="border-2 border-[#7863d4] w-60 min-h-content font-medium tracking-wide text-[13.2px]">{{ players_results[selected].wanted.reasons[index] }}</th>
                                            <th class="border-2 border-[#7863d4] w-40 min-h-content font-medium tracking-wide text-[13.2px]">{{ players_results[selected].wanted.reporters[index] }}</th>
                                        </tr> 
                                    </tbody> 
                                </table>  
                            </div>
                            
                            <div class="flex flex-col items-center w-80 mr-5"> 
                                <div class="flex flex-col items-center w-full">
                                    <div class="flex flex-row items-center w-full font-semibold text-sm"> 
                                        <i class="fa-solid fa-user-gear mr-1"></i> 
                                        <span>Options</span>
                                    </div>

                                    <div class="w-full h-[2px] bg-darkPurple rounded mt-1"></div>
                                </div> 

                                <div class="flex flex-col justify-center items-center w-full h-auto"> 
                                    <button @click="this.showPageModal('licence', players_results[selected]);" class="rounded bg-purple-700 hover:bg-purple-800 w-full h-7 mt-2"><i class="fa-solid fa-id-card"></i> Suspend Licence</button> 
                                    <button @click="this.showPageModal('wanted', players_results[selected]);" class="rounded bg-red-600 hover:bg-red-700 w-full h-7 mt-2"><i class="fa-solid fa-handcuffs"></i> Issue Wanted</button>
                                    <button @click="this.showPageModal('ticket', players_results[selected]);" class="rounded bg-orange-500 hover:bg-orange-600 w-full h-7 mt-2"><i class="fa-solid fa-ticket"></i> Send Ticket</button>
                                </div>
                            </div>
                        </div>
                    </div>  
                </div>    
            </div>   
        </div>   
    </div>     
</template>
  
<script> 
    export default {
        name: 'FactionsComponent',

        data: function() {
            return { 
                page: 1,
                modal: 0,
                showWanted: false, 
                input: '',
                selected: null,
 
                modalPage:
                {
                    status: false, 
                    selected: null,
                    option: '',

                    title: '',
                    description: ''
                },


                wantedData:
                [
                    {
                        level: 1,
                        reason: 'Unlicense driving'
                    },

                    {
                        level: 2,
                        reason: 'Failure to comply with the order'
                    },

                    {
                        level: 3,
                        reason: 'Driving under the influence of alcohol / drugs'
                    } 
                ],

                ticketData: [
                    {
                        amount: 1000,
                        reason: 'Driven in the opposite direction'
                    },

                    {
                        amount: 1500,
                        reason: 'Driving with the headlights off'
                    },

                    {
                        amount: 2000,
                        reason: 'Drive motorcycle without helmet'
                    },

                    {
                        amount: 2500,
                        reason: 'Driving without a seat belt'
                    }
                ],


                wantedSelected: null,
                wantedReasons:
                [
                    'Fuga de la locul accidentului',
                    'Runner',
                    'Oprire neregulamentara'
                ],

                player: 
                { 
                    name: 'MihaiADV', 
                    group: 1, 
                    faction: 'Los Santos Police', 
                    rank: 2, warns: 2, 
                    joined: '21 feb 2023 [19 : 22]',
                    photo: 'https://i.imgur.com/nnzVjHY.png',
                    position: {x: 0, y: 0, z: 0}
                }, 

                players_results: [],
                arrestedPlayers:
                [
                    {name: 'DomnulEMI', time: 2000, level: 1},
                    {name: 'DomnulEMI', time: 2000, level: 1}, 

                ],
                wantedList:
                [
                    {
                        name: 'Flint',
                        position: { x: 0, y: 0, z: 0 },
                        wanted: 
                        { 
                            level: 5, 
                            reporters: ['s', 's', 's', 's', 's', 's', 's', 's', 's', 's', 's', 's'], 
                            reasons:['ia la muiee', 'ia la muie2', 'ia la muiee', 'ia la muie2', 'ia la muiee', 'ia la muie2', 'ia la muiee', 'ia la muie2', 'ia la muiee', 'ia la muie2', 'ia la muiee', 'ia la muie2']  
                        }
                    } 
                ],
 
                localPlayers:
                [ 
                    { 
                        name: 'MihaiADV', level: 1,
                        gender: 'Male', faction: 'Los Santos Police', arrested: 'No', licences: [false, true], 
                        wanted:
                        {
                            level: 5, 
                            reporters: ['s', 's', 's', 's', 's', 's', 's', 's', 's', 's', 's', 's'], 
                            reasons:['ia la muiee', 'ia la muie2', 'ia la muiee', 'ia la muie2', 'ia la muiee', 'ia la muie2', 'ia la muiee', 'ia la muie2', 'ia la muiee', 'ia la muie2', 'ia la muiee', 'ia la muie2']  
                        } 
                    }  
                ],  
            };
        },    

        mounted()
        { 
            window.FactionsComponent = this;  

            if(window.mp)
            {
                window.e_rpc.add('client::faction:showPlayers', (data) =>
                {
                    const raw = JSON.parse(data)

                    this.players_results = raw.resPlayers;  

                    this.closePageModal();
                });
            }

            if(window.mp)
            {
                window.e_rpc.add('client::faction:reloadPlayerProfile', (data) =>
                {
                    const raw = JSON.parse(data)

                    this.players_results = raw.resPlayers;  
                });
            }
        },
        
        methods: 
        { 
            openMenu(wantedList, jailedPlayers, playerdata) 
            {
                this.arrestedPlayers = jailedPlayers; 
                this.wantedList = wantedList;
                this.player = playerdata;
 
                this.modal = 0;
                this.selected = null;
                this.input = null;

                this.wantedSelected = null;
                this.modalPage.status = false;
                this.showWanted = false;
                
                return this.page = 1; 
            },
 
            /*------------------------------------------------------------ GIVE PLAYER WANTED ------------------------------------------------------------*/
            showWantedReasons() { this.showWanted = true; },  
            closePageModal()
            {
                this.modalPage = {
                    status: false, 
                    selected: null,

                    option: '', 
                    title: '',
                    description: ''
                } 
            },

            showPageModal(option, item) 
            { 
                switch(option)
                {
                    case 'wanted':
                    {
                        this.modalPage = {

                            status: true, 
                            title: 'CREATE WANTED',
                            option: option,
                            description: 'Please select wanted reason for player ' + item.name
                        }; 
                        break;
                    }

                    case 'ticket':
                    {
                        this.modalPage = {

                            status: true, 
                            title: 'SEND TICKET',
                            option: option,
                            description: 'Please select ticket reason for player ' + item.name
                        }; 
                        break;
                    }

                    case 'licence':
                    {
                        this.modalPage = {

                            status: true, 
                            title: 'SUSPEND LICENCE',
                            option: option,
                            description: 'Select the license you want to confiscate from ' + item.name
                        }; 
                        break;
                    }
                } 
            }, 

            executePageModal()
            {   
                const user = (this.players_results.length && this.selected != null ? this.players_results[this.selected] : null);
                const raw = this.modalPage.selected;

                if(this.modalPage.selected == null || user == null)
                    return;
 
                switch(this.modalPage.option)
                {
                    case 'wanted':
                    {
                        console.log('create wanted for ' + user.name + ' wanted level ' + raw.level);

                        if(window.mp)
                        {  
                            window.e_rpc('server::faction:sendWanted', JSON.stringify({username: user.name, level: raw.level, reason: raw.reason})); 
                        }  
                        break;
                    }

                    case 'ticket':
                    {
                        console.log('create ticket for ' + user.name + ' ticket level ' + raw.amount + ' ticket reason ' + raw.reason);

                        if(window.mp)
                        {  
                            window.e_rpc('server::faction:sendTicket', JSON.stringify({username: user.name, amount: raw.amount, reason: raw.reason})); 
                        }  
                        break;
                    }

                    case 'licence':
                    {
                        console.log('suspend licence ' + this.modalPage.selected + ' for ' + user.name); 

                        if(window.mp)
                        {  
                            window.e_rpc('server::faction:suspendLicence', JSON.stringify({username: user.name, licence: this.modalPage.selected})); 
                        }  
                        break;
                    }
                }  
            },

            selectModalOption(item)
            {
                if(this.modalPage.selected == item)
                {
                    return this.modalPage.selected = null;
                }

                return this.modalPage.selected = item;
            }, 
            /*--------------------------------------------------------------------------------------------------------------------------------------------*/


            /*------------------------------------------------------------- SEARCHING PLAYER -------------------------------------------------------------*/
            searchData()
            {   
                if(window.mp)
                {  
                    window.e_rpc('server::faction:searchPlayer', this.input); 
                } 
                else 
                {
                    if(this.localPlayers.some(item => item.name === this.input))
                    { 
                        this.players_results.push({ 
                            name: 'MihaiADV', level: 1,
                            gender: 'Male', faction: 'Los Santos Police', arrested: 'No', licences: [false, true], 
                            wanted:
                            {
                                level: 6,
                                reporters: ['s', 's', 's', 's', 's', 's', 's', 's', 's', 's', 's', 's'], 
                                reasons:['ia la muiee', 'ia la muie2', 'ia la muiee', 'ia la muie2', 'ia la muiee', 'ia la muie2', 'ia la muiee', 'ia la muie2', 'ia la muiee', 'ia la muie2', 'ia la muiee', 'ia la muie2']  
                            } 
                        })
                    } 
                    else 
                    {
                        this.players_results = [];
                    }
                }
            },

            viewPlayer(index) 
            {
                this.modal = 1;
                this.selected = index; 

                console.log(index);
            },

            goBack()
            {
                if(this.showWanted)
                {
                    return this.showWanted = false;
                }
 
                this.selected = null;
                this.modal = 0; 
            },

            wantedTracking(username)
            {  
                if(window.mp)
                {  
                    return window.e_rpc('server::faction:wantedTracking', username); 
                }   
            },

            clearWanted(username)
            {
                if(window.mp)
                {  
                    return window.e_rpc('server::faction:clearWanted', username); 
                }   
            },
            /*--------------------------------------------------------------------------------------------------------------------------------------------*/


            /*------------------------------------------------------------- GLOBAL FUNCTIONS -------------------------------------------------------------*/
            change_page(page) 
            {
                this.modal = 0;
                this.input = '';

                this.players_results = [];
                this.selected = null;
                
                return this.page = page;
            }, 

            fmtMSS: function(s) { return (s - (s %= 60 )) / 60 + (9 < s ? ':' : ':0') + s },   
            calculateDistance(p1, p2) 
            {
                var a = p2.x - p1.x;
                var b = p2.y - p1.y;
                var c = p2.z - p1.z;

                return Math.sqrt(a * a + b * b + c * c);
            }, 

            formatThousands2(x)
            {
                return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); 
            },
            /*--------------------------------------------------------------------------------------------------------------------------------------------*/   
        } 
    }
</script>