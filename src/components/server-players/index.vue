<template>  
    <!-- eslint-disable vue/no-use-v-if-with-v-for,vue/no-confusing-v-for-v-if -->

    <div class="flex flex-col justify-center items-center w-full cursor-pointer font-inter font-semibold z-1 select-none text-white">    
        <div class="background-global-effect"></div>
 
        <div class="flex flex-col justify-center items-center w-full h-full mt-[5%]">   
            <div class="flex items-center w-[50%] h-[8rem] rounded mt-[10%] bg-[rgba(59,52,98,0.77)]">  
                <div class="flex flex-row justify-center items-center font-montserrat text-[15px] font-semibold ml-[20px]" style="zoom: 80%;">

                    <div class="user-photo">
                        <img class="rounded-full" :src="account.image" width="90" height="90">
                    </div>
 
                    <div class="flex flex-col text-left items-start ml-[15px]"> 
                        <div class="flex flex-row justify-center items-center">
                            <div class="text-[20px] font-bold tracking-wide">{{ account.name }}</div>
                            
                            <div class="flex items-center justify-center ml-[10px] w-[100px] h-[22px] rounded-full bg-red-600 text-[14px] font-bold tracking-wide" v-show="account.admin || account.helper" :style="{'background-color': account.helper ? 'chocolate' : account.admin <= 7 ? 'crimson' : 'lightseagreen', 'width': account.admin >= 7 ? '100px' : '120px'}"> 
                                {{ account.helper ? 'HELPER' : this.badges[this.account.admin] }}
                            </div> 
                        </div>
 
                        <div class="mt-[10px]">
                            <div class="font-semibold text-[13px] tracking-wide opacity-50">FACTION</div>
                            <div class="font-semibold text-[14px] tracking-wide">{{ account.faction.toUpperCase() }}</div>
                        </div>

                        <div class="mt-[10px]">
                            <div class="font-semibold text-[13px] tracking-wide opacity-50">JOB</div>
                            <div class="font-semibold text-[14px] tracking-wide">{{ account.job.toUpperCase() }}</div>
                        </div>
                    </div> 
                </div> 
            </div> 
 
            <div class="flex flex-row items-center w-[50%] h-[3rem] rounded bg-none mt-[5px]"> 
                <div @click="this.changePage(0)" :class="{'!opacity-100': this.page == 0}" class="flex flex-row justify-between items-center w-auto text-[12px] font-semibold opacity-70">PLAYERS ONLINE <div class="opacity-50 ml-[5px]">{{ this.players.length }}</div></div>
                <div @click="this.changePage(2)" :class="{'!opacity-100': this.page == 2}" class="flex flex-row justify-between items-center w-auto text-[12px] font-semibold opacity-70 ml-[20px]">STAFF <div class="opacity-50 ml-[5px]">{{this.players.filter(el => el.admin).length}}</div></div>
                <div @click="this.changePage(1)" :class="{'!opacity-100': this.page == 1}" class="flex flex-row justify-between items-center w-auto text-[12px] font-semibold opacity-70 ml-[20px]">LEADERS <div class="opacity-50 ml-[5px]">{{ this.players.filter(el => el.faction != 'Civilian' && el.rank >= 7).length }}</div></div>
            </div>
  
            <div class="flex items-start w-[50%] h-full rounded mt-[5px]" v-show="this.page == 0">   
              <table class="flex flex-col items-start h-full "> 
                    <thead class="flex items-end text-left text-white w-full font-semibold text-[13px]">
                        <tr>
                            <th class="w-[19rem] h-4">NAME</th>
                            <th class="w-[19rem] h-4">{{this.page == 0 || this.page == 1 ? 'FACTION' : this.page == 2 ? 'RANK' : ''}}</th> 
                            <th class="w-[19rem] h-4">LEVEL</th> 
                        </tr>
                    </thead>
 
                    <tbody class="flex flex-col overflow-y-scroll w-full mt-2 h-[30rem]">
                        <tr class="flex flex-row items-center" v-for="(item) in this.players" :key="item" v-if="this.page == 0">  
                            <th class="flex w-[19rem] flex-row items-center min-h-[3rem] tracking-wide text-xs"> 
                                <img class="mr-2 rounded-full" :src="item.image" width="35" height="35">
                                  
                                <div class="font-montserrat text-[14px] font-semibold tracking-wide ml-[10px] text-left">
                                    <div class="w-[8rem]">{{ item.name }}</div>
                                    <div class="text-[12px] font-medium tracking-wide opacity-70">Online for {{this.calculateSeconds(item.connected)}}</div>
                                </div>  
                            </th>
 
                            <th class="w-[19rem] text-left min-h-content font-medium tracking-wide text-sm">{{ item.faction }}</th> 
                            <th class="w-[19rem] text-left min-h-content font-medium tracking-wide text-sm">{{ item.level }}</th> 
                        </tr> 
                    </tbody>
                </table> 
            </div> 
                
            <div class="flex items-start w-[50%] h-full rounded mt-[5px]" v-show="this.page == 2">  
                <table class="flex flex-col items-start h-full "> 
                    <thead class="flex items-end text-left text-white w-full font-semibold text-[13px]">
                        <tr>
                            <th class="w-[19rem] h-4">NAME</th>
                            <th class="w-[19rem] h-4">{{this.page == 0 || this.page == 1 ? 'FACTION' : this.page == 2 ? 'RANK' : ''}}</th> 
                            <th class="w-[19rem] h-4">LEVEL</th> 
                        </tr>
                    </thead>
  
                    <tbody class="flex flex-col overflow-y-scroll w-full mt-2 h-[30rem]">
                        <tr class="flex flex-row items-center" v-for="(item) in this.players.filter(i => i.admin > 0)" v-if="this.page == 2" :key="item">
                            <th class="flex w-[19rem] flex-row items-center min-h-[3rem] tracking-wide text-xs"> 
                                <img class="mr-2 rounded-full" :src="item.image" width="35" height="35">
                                  
                                <div class="font-montserrat text-[14px] font-semibold tracking-wide ml-[10px] text-left">
                                    <div class="w-[8rem]">{{ item.name }}</div>
                                    <div class="text-[12px] font-medium tracking-wide opacity-70">Online for {{this.calculateSeconds(item.connected)}}</div>
                                </div>  
                            </th>

                            <th class="flex flex-row items-center w-[19rem] text-left min-h-content font-medium tracking-wide text-sm">
                                <div v-if="item.admin > 0" class="flex items-center justify-center font-semibold text-[13px] tracking-wide w-[90px] h-[20px] bg-red-600 rounded-full" :style="{'background-color': item.admin >= 7 ? 'crimson' : '#0066cc', 'width': item.admin >= 7 ? '90px' : '100px'}">
                                    {{ this.badges[item.admin] }}
                                </div>  
                                
                                <div v-if="item.helper > 0" class="ml-1 flex items-center justify-center font-semibold text-[13px] tracking-wide w-[90px] h-[20px] bg-orange-600 rounded-full">
                                    HELPER
                                </div>  
                            </th> 
                            <th class="w-[19rem] text-left min-h-content font-medium tracking-wide text-sm">{{ item.level }}</th> 
                        </tr> 
                    </tbody> 
                </table>  
            </div> 

            <div class="flex items-start w-[50%] h-full rounded mt-[5px]" v-show="this.page == 1">  
                <table class="flex flex-col items-start h-full "> 
                    <thead class="flex items-end text-left text-white w-full font-semibold text-[13px]">
                        <tr>
                            <th class="w-[19rem] h-4">NAME</th>
                            <th class="w-[19rem] h-4">{{this.page == 0 || this.page == 1 ? 'FACTION' : this.page == 2 ? 'RANK' : ''}}</th> 
                            <th class="w-[19rem] h-4">LEVEL</th> 
                        </tr>
                    </thead>
  
                    <tbody class="flex flex-col overflow-y-scroll w-full mt-2 h-[30rem]">
                        <tr class="flex flex-row items-center" v-for="(item) in this.players.filter(i => i.faction != 'Civilian' && i.rank >= 7)" v-if="this.page == 1" :key="item">
                            <th class="flex w-[19rem] flex-row items-center min-h-[3rem] tracking-wide text-xs"> 
                                <img class="mr-2 rounded-full" :src="item.image" width="35" height="35">
                                  
                                <div class="font-montserrat text-[14px] font-semibold tracking-wide ml-[10px] text-left">
                                    <div class="w-[8rem]">{{ item.name }}</div>
                                    <div class="text-[12px] font-medium tracking-wide opacity-70">Online for {{this.calculateSeconds(item.connected)}}</div>
                                </div>  
                            </th>
                            <th class="w-[19rem] text-left min-h-content font-medium tracking-wide text-sm">{{ item.faction }}</th> 
                            <th class="w-[19rem] text-left min-h-content font-medium tracking-wide text-sm">{{ item.level }}</th> 
                        </tr> 
                    </tbody>
                </table> 
            </div> 
        </div> 
    </div>     
</template>
  
<script>
    export default {
        name: 'PlayersComponent',

        data: function() 
        {
            return {

                badges: 
                [
                    '', 'MODERATOR', 'MODERATOR', 'MODERATOR', 'MODERATOR', 'MODERATOR', 'MODERATOR', 'FOUNDER' 
                ],

                page: 0,

                account: 
                {
                    name: 'MihaiADV', admin: 1, level: 5, faction: 'None', job: 'None', image: 'https://i.imgur.com/nnzVjHY.png', helper: 0, rank: 0
                },

                players: [
                    { name: 'MihaiADV', connected: 2000, level: 10, admin: 5, helper: 0, rank: 0, faction: 'Civilian', job: 'None', image: 'https://i.imgur.com/nnzVjHY.png' }
                ] 
            };
        },    

        mounted() {  window.PlayersComponent = this; },

        methods: 
        { 
            showPlayersData(account, players)
            {  
                this.account = account;
                this.players = players;
 
                this.page = 0; 
            },
 
            calculateSeconds(time)
            {  
                return (time < 60 ? 'a few seconds' : Math.floor(time / 60) + ' minutes');
            }, 

            changePage(page)
            {
                this.page = page;
            }
        }  
    }
</script>