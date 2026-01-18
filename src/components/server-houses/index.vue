<template>  
    <div class="flex flex-col justify-center items-center w-full cursor-pointer font-inter font-semibold z-1 select-none text-white mt-[13.5%]" :class="{'mt-[20%]': this.page == 8 || this.page == 9 || this.page == 12}">   
        <div class="background-global-effect"></div>

        <div class="flex flex-col justify-center items-center">
            <i class="fa-solid fa-list text-[50px]"></i>
            
            <div class="text-[1.8rem] h-auto"> 
                {{page == 1 ? 'Visitors' : page == 2 ? 'Safebox' : page == 4 ? 'Renters' : page == 9 ? 'House Options' : page == 10 ? 'Rent Price' : page == 8 ? 'Purchase House' : 'House Options'}} 
            </div>

            <div v-if="this.page == 8" class="font-semibold tracking-wide w-auto h-auto mt-1 text-[1rem]"> 
                You want to buy this house for <span style="color: forestgreen;">${{ this.formatThousands(this.house.price) }}</span>? 
            </div> 
            
            <div v-if="this.page != 8" class="w-auto h-auto font-semibold tracking-wide mt-[5px] text-[1rem]"> 
                Select your desired option 
            </div> 
        </div>
        
        <div class="mt-2" v-show="this.page == 0 && !this.visitor"> 
            <div class="w-[20rem] min-h-[3rem] flex flex-col justify-center items-center bg-[#a0a0a01c] border-2 border-[#a0a0a01e] rounded mt-2 hover:bg-[#a0a0a046]" :class = "{'bg-[#a0a0a046]': this.selected == 0}" @click="this.selectItem(0)">
                <div class="font-bold tracking-wide text-[15px]">LOCK / UNLOCK</div>
                <div class="font-semibold tracking-wide text-[12px]">{{house.locked ? 'UNLOCK' : 'LOCK'}} YOUR PROPERTY</div>
            </div>

            <div class="w-[20rem] min-h-[3rem] flex flex-col justify-center items-center bg-[#a0a0a01c] border-2 border-[#a0a0a01e] rounded mt-2 hover:bg-[#a0a0a046]" :class = "{'bg-[#a0a0a046]': this.selected == 1}" @click="this.selectItem(1)">
                <div class="font-bold tracking-wide text-[15px]">DOOR</div>
                <div class="font-semibold tracking-wide text-[12px]">CHECK YOUR DOOR FOR VISITORS</div>
            </div>

            <div class="w-[20rem] min-h-[3rem] flex flex-col justify-center items-center bg-[#a0a0a01c] border-2 border-[#a0a0a01e] rounded mt-2 hover:bg-[#a0a0a046]" :class = "{'bg-[#a0a0a046]': this.selected == 2}" @click="this.selectItem(2)">
                <div class="font-bold tracking-wide text-[15px]">SAFEBOX</div>
                <div class="font-semibold tracking-wide text-[12px]">MANAGE YOUR PROPERTY SAFEBOX</div>
            </div>
            
            <div class="w-[20rem] min-h-[3rem] flex flex-col justify-center items-center bg-[#a0a0a01c] border-2 border-[#a0a0a01e] rounded mt-2 hover:bg-[#a0a0a046]" :class = "{'bg-[#a0a0a046]': this.selected == 4}" @click="this.selectItem(4)">
                <div class="font-bold tracking-wide text-[15px]">ROOMATES</div>
                <div class="font-semibold tracking-wide text-[12px]">VIEW YOUR PROPERTY ROOMATES</div>
            </div> 

            <div class="w-[20rem] min-h-[3rem] flex flex-col justify-center items-center bg-[#a0a0a01c] border-2 border-[#a0a0a01e] rounded mt-2 hover:bg-[#a0a0a046]" :class = "{'bg-[#a0a0a046]': this.selected == 16}" @click="this.selectItem(16)">
                <div class="font-bold tracking-wide text-[15px]">RENT PRICE</div>
                <div class="font-semibold tracking-wide text-[12px]">MANAGE YOUR RENT PRICE</div>
            </div> 

            <div class="w-[20rem] min-h-[3rem] flex flex-col justify-center items-center bg-[#a0a0a01c] border-2 border-[#a0a0a01e] rounded mt-2 hover:bg-[#a0a0a046]" :class = "{'bg-[#a0a0a046]': this.selected == 6}" @click="this.selectItem(6)">
                <div class="font-bold tracking-wide text-[15px]">SEEL TO STATE</div>
                <div class="font-semibold tracking-wide text-[12px]">RETURN YOUR PROPERTY TO STATE</div>
            </div>
        </div>

        <!----------------------------- VIEW HOUSE ENTER REQUESTS ------------------------------>
        <div class="mt-2" v-show="this.page == 1" v-if = "house.doors.length">  
            <div class="w-[20rem] min-h-[3rem] flex flex-col justify-center items-center bg-[#a0a0a01c] border-2 border-[#a0a0a01e] rounded mt-2 hover:bg-[#a0a0a046]" v-for = "(item) in house.doors" v-bind:key="item" v-bind:item="item" :class = "{'bg-[#a0a0a046]': this.selectedUser != null && selectedUser == index}" @click = "selectUser(index)">
                <div class="font-bold tracking-wide text-[15px]" style="font-weight: 600;">{{item.name.toUpperCase()}}</div>
                <div class="font-semibold tracking-wide text-[12px]">{{item.faction}}</div>
            </div> 
        </div>

        <!--------------------------------- VIEW HOUSE SAFEBOX --------------------------------->
        <div class="mt-2" v-show="this.page == 2">
            <div class="w-[20rem] min-h-[3rem] flex flex-col justify-center items-center bg-[#a0a0a01c] border-2 border-[#a0a0a01e] rounded mt-2 hover:bg-[#a0a0a046]" :class = "{'bg-[#a0a0a046]': this.selected == 5}" @click="this.selectItem(5)">
                <div class="font-bold tracking-wide text-[15px]" style="font-weight: 600;">WITHDRAW</div>
                <div class="font-semibold tracking-wide text-[12px]">Balance <b style="color: #039151;">${{formatThousands(house.safebox)}}</b> </div>
            </div> 
        </div>

        <!-------------------------------- INSPECT HOUSE RENTERS ------------------------------->
        <div class="mt-2" v-show="page == 4" v-if="this.house.renters.length">
            <div class="w-[20rem] min-h-[3rem] flex flex-col justify-center items-center bg-[#a0a0a01c] border-2 border-[#a0a0a01e] rounded mt-2 hover:bg-[#a0a0a046]" v-for="(item) in house.renters" v-bind:key="item" v-bind:item="item">
                <div class="font-bold tracking-wide text-[15px]" style="font-weight: 600;">{{item.name.toUpperCase()}}</div>
                <div class="font-semibold tracking-wide text-[12px]">Rent for {{item.rent}} days</div>
            </div> 
        </div>

        <!--------------------------------- SELL HOUSE TO STATE -------------------------------->
        <div class="mt-2" v-show="this.page == 6">
            <div class="w-[20rem] min-h-[3rem] flex flex-col justify-center items-center bg-[#a0a0a01c] border-2 border-[#a0a0a01e] rounded mt-2 hover:bg-[#a0a0a046]" :class = "{'bg-[#a0a0a046]': this.selected == 7}" @click="this.selectItem(7)">
                <div class="font-bold tracking-wide text-[15px]" style="font-weight: 600;">SELL HOUSE TO STATE</div>
                <div class="font-semibold tracking-wide text-[12px]">STATE OFFER: <b style="color: #039151;">${{formatThousands(10000000)}}</b> </div>
            </div> 
        </div>

         <!--------------------------------------------------------------[HOUSE MENU PLAYERS]--------------------------------------------------------------> 
         <div class="mt-2" v-show="this.page == 9"> 
            <div v-if="this.house.rent > 0" class="w-[20rem] min-h-[3rem] flex flex-col justify-center items-center bg-[#a0a0a01c] border-2 border-[#a0a0a01e] rounded mt-2 hover:bg-[#a0a0a046]" :class = "{'bg-[#a0a0a046]': this.selected == 9}" @click="this.selectItem(9)">
                <div class="font-bold tracking-wide text-[15px]">RENT HOUSE</div>
                <div class="font-semibold tracking-wide text-[12px]">${{formatThousands(house.rent * 1)}} / PER DAY</div>
            </div>

            <div v-if="this.house.price > 0" class="w-[20rem] min-h-[3rem] flex flex-col justify-center items-center bg-[#a0a0a01c] border-2 border-[#a0a0a01e] rounded mt-2 hover:bg-[#a0a0a046]" :class = "{'bg-[#a0a0a046]': this.selected == 10}" @click="this.selectItem(10)">
                <div class="font-bold tracking-wide text-[15px]">BUY HOUSE</div>
                <div class="font-semibold tracking-wide text-[12px]">Price: ${{formatThousands(house.price)}}</div>
            </div>

            <div v-if="this.house.locked" class="w-[20rem] min-h-[3rem] flex flex-col justify-center items-center bg-[#a0a0a01c] border-2 border-[#a0a0a01e] rounded mt-2 hover:bg-[#a0a0a046]" :class = "{'bg-[#a0a0a046]': this.selected == 20}" @click="this.selectItem(20)">
                <div class="font-bold tracking-wide text-[15px]">REQUEST ENTER</div>
                <div class="font-semibold tracking-wide text-[12px]">This house is locked, call the intercom</div>
            </div> 
        </div>
        <!--------------------------------------------------------------------------------------------------------------------------------------------->

        <!--------------------------------------------------------------[HOUSE MENU RENT]--------------------------------------------------------------> 
        <div class="mt-2" v-show="this.page == 12"> 
            <div class="w-[20rem] min-h-[3rem] flex flex-col justify-center items-center bg-[#a0a0a01c] border-2 border-[#a0a0a01e] rounded mt-2 hover:bg-[#a0a0a046]" :class = "{'bg-[#a0a0a046]': this.selected == 17}" @click="this.selectItem(17)">
                <div class="font-bold tracking-wide text-[15px]">RENT HOUSE</div>
                <div class="font-semibold tracking-wide text-[12px]">1 DAYS / ${{formatThousands(house.rent * 1)}}</div>
            </div>

            <div class="w-[20rem] min-h-[3rem] flex flex-col justify-center items-center bg-[#a0a0a01c] border-2 border-[#a0a0a01e] rounded mt-2 hover:bg-[#a0a0a046]" :class = "{'bg-[#a0a0a046]': this.selected == 18}" @click="this.selectItem(18)">
                <div class="font-bold tracking-wide text-[15px]">RENT HOUSE</div>
                <div class="font-semibold tracking-wide text-[12px]">3 DAYS / ${{formatThousands(house.rent * 3)}}</div>
            </div>

            <div class="w-[20rem] min-h-[3rem] flex flex-col justify-center items-center bg-[#a0a0a01c] border-2 border-[#a0a0a01e] rounded mt-2 hover:bg-[#a0a0a046]" :class = "{'bg-[#a0a0a046]': this.selected == 19}" @click="this.selectItem(19)">
                <div class="font-bold tracking-wide text-[15px]">RENT HOUSE</div>
                <div class="font-semibold tracking-wide text-[12px]">7 DAYS / ${{formatThousands(house.rent * 7)}}</div>
            </div> 
        </div>
        <!--------------------------------------------------------------------------------------------------------------------------------------------->


        <!--------------------------------------------------------------[HOUSE SET RENT]---------------------------------------------------------------> 
        <div class="mt-2" v-show="this.page == 10 && this.visitor"> 
            <div class="w-[20rem] min-h-[3rem] flex flex-col justify-center items-center bg-[#a0a0a01c] border-2 border-[#a0a0a01e] rounded mt-2 hover:bg-[#a0a0a046]" :class = "{'bg-[#a0a0a046]': this.selected == 12}" @click="this.selectItem(12)">
                <div class="font-bold tracking-wide text-[15px]">RENT PRICE</div>
                <div class="font-semibold tracking-wide text-[12px]">${{formatThousands(500)}} / day</div>
            </div>

            <div class="w-[20rem] min-h-[3rem] flex flex-col justify-center items-center bg-[#a0a0a01c] border-2 border-[#a0a0a01e] rounded mt-2 hover:bg-[#a0a0a046]" :class = "{'bg-[#a0a0a046]': this.selected == 13}" @click="this.selectItem(13)">
                <div class="font-bold tracking-wide text-[15px]">RENT PRICE</div>
                <div class="font-semibold tracking-wide text-[12px]">${{formatThousands(1000)}} / day</div>
            </div>

            <div class="w-[20rem] min-h-[3rem] flex flex-col justify-center items-center bg-[#a0a0a01c] border-2 border-[#a0a0a01e] rounded mt-2 hover:bg-[#a0a0a046]" :class = "{'bg-[#a0a0a046]': this.selected == 14}" @click="this.selectItem(14)">
                <div class="font-bold tracking-wide text-[15px]">RENT PRICE</div>
                <div class="font-semibold tracking-wide text-[12px]">${{formatThousands(1500)}} / day</div>
            </div> 

            <div class="w-[20rem] min-h-[3rem] flex flex-col justify-center items-center bg-[#a0a0a01c] border-2 border-[#a0a0a01e] rounded mt-2 hover:bg-[#a0a0a046]" :class = "{'bg-[#a0a0a046]': this.selected == 15}" @click="this.selectItem(15)">
                <div class="font-bold tracking-wide text-[15px]">RENT PRICE</div>
                <div class="font-semibold tracking-wide text-[12px]">${{formatThousands(2000)}} / day</div>
            </div> 
        </div> 
        <!--------------------------------------------------------------------------------------------------------------------------------------------->
 
        <div class="flex flex-row justify-between items-center mt-[15px]">   
            <div :class = "{'!bg-green-600': this.selected != null}" class="flex justify-center bg-purple-600 items-center font-semibold text-[14px] w-[9.5rem] h-[2.2rem] rounded tracking-wide mx-2" @click="this.changeData()">
                <i class="fa-solid fa-check mr-1"></i> {{this.page == 8 ? 'BUY' : 'SELECT'}} 
            </div>

            <div class="flex justify-center items-center font-semibold text-[14px] w-[9.5rem] h-[2.2rem] bg-purple-600 rounded tracking-wide mx-2 hover:bg-purple-700" @click="this.cancelData()">
                <i class="fa-solid fa-xmark mr-2"></i> CANCEL
            </div>
        </div>  
    </div>     
</template>
  
<script>
    const days = {
        17: 1, 18: 3, 19: 7, 
        12: 500, 13: 1000, 14: 1500, 15: 2000
    }

    export default {
        name: 'HousesComponent',

        data: function() {
            return {
                page: 9,
                selected: null,
                selectedUser: null, 
                visitor: false,

                house:
                {
                    locked: false,
                    safebox: 100000,
                    price: 1000, 
                    rent: 1000,
        
                    doors: [{name: 'Mihai', faction: 'civilian'}], 
                    renters: [
                        {name: 'MihaiADV', rent: 3}
                    ]
                } 
            };
        },    

        mounted()
        { 
            window.HousesComponent = this;  
        },

        methods: 
        { 
            formatThousands(x)
            {
                return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); 
            },

            open(result, page, visitor = false)
            { 
                this.selected = null;
                this.selectedUser = null;
                
                this.visitor = visitor;
                this.house = result; 
                this.page = page; 
            },
    
            selectItem(index)
            {
                if(this.selected == index) {
                    return this.selected = null;
                }

                return this.selected = index;
            },

            selectUser(index)
            { 
                this.selectedUser = index; 
            },

            cancelData()
            {
                if(!this.page || this.page == 9)
                { 
                    if(window.mp) {
                        return window.e_trigger("client::house:closeMenu");
                    }  
                }
    
                this.selected = null;
                this.selectedUser = null;
                this.page = (!this.visitor ? 0 : 9);
            },
    
            changeData: function()
            {
                switch(this.selected)
                {
                    case null: break;
                    case 0: //lock unlock house
                    {
                        this.house.locked = !this.house.locked;
                        this.selected = null;
 
                        if(window.mp) {
                            window.e_rpc('server:houses::changeLock');
                        }
                        break;
                    }
                    case 1:
                    {
                        if(!this.house.doors.length)
                        {
                            this.page = 0; 
                            this.selected = null;
                            if(window.mp) {
                                return window.e_trigger('client::hud:sendNotify', 'info', 'You dont have doors request.', 'House:');
                            }   
                        }

                        if(this.page == 0) 
                        {
                            this.page = 1;
                        } 

                        if(this.page == 1 && this.selectedUser != null) 
                        { 
                            if(window.mp) {
                                window.e_rpc('server:houses::acceptDoor', this.selectedUser);
                            }
  
                            this.selected = null;
                            this.selectedUser = null;
                            this.page = 0;   
                        }
                        break;
                    } 

                    case 2: //withdraw
                    {    
                        if(this.page == 0)
                        {
                            this.page = 2; 
                            this.selected = null;
                        }  
                        break;
                    }

                    case 3: break; 
                    case 4:
                    {
                        this.selected = null;

                        if(!Object.keys(this.house.renters).length)
                        {
                            this.page = 0;  

                            if(window.mp) {
                                return window.e_trigger('client::hud:sendNotify', 'info', 'You dont have roomates.', 'House:');
                            }  
                        }
                        
                        if(this.page == 0) {
                            this.page = 4;  
                        } 
                        break;
                    }
    
                    case 5:
                    {
                        this.selected = null;
                        this.page = 0; 
                          
                        if(window.mp) {
                            window.e_rpc('server:houses::withdrawMoney');
                        }
                        break;
                    }

                    case 6:
                    { 
                        this.selected = null; 
                        this.page = 6;   
                        break
                    }

                    case 7:
                    {   
                        if(window.mp) {
                            window.e_rpc('server:houses::sellToState');
                        } 
                        break;
                    }

                    case 8:
                    { 
                        this.selected = null; 
                        
                        if(window.mp) {
                            window.e_rpc('server:houses::purchaseHouse');
                        }  
                        break;
                    }

                    //call menu for rent house
                    case 9: 
                    { 
                        this.selected = null; 
                        this.page = 12; 
                        break;
                    } 

                    //call menu for buy house
                    case 10:
                    {   
                        this.selected = 8;  
                        this.page = 8;
                        break;
                    } 
 
                    case 12: { this.setRentPrice(); break; } 
                    case 13: { this.setRentPrice(); break; }  
                    case 14: { this.setRentPrice(); break; } 
                    case 15: { this.setRentPrice(); break; }

                    case 16:
                    {
                        this.selected = null;
                        this.page = 10;
                        break; 
                    } 

                    case 17: { this.rentHouse(); break; } 
                    case 18: { this.rentHouse(); break; } 
                    case 19: { this.rentHouse(); break; }

                    case 20:
                    {
                        this.selected = null; 

                        if(window.mp)
                        {
                            window.e_rpc('server:houses::requestEnter'); 
                        }  
                        break;
                    }
                }
            },

            rentHouse()
            { 
                if(window.mp)
                {
                    window.e_rpc('server:houses::rentHouse', days[this.selected]); 
                } 

                return this.selected = null; 
            },

            setRentPrice()
            {
                if(window.e_rpc)
                {
                    window.e_rpc('server:houses::setRentPrice', days[this.selected]); 
                } 

                this.selected = null;
                this.page = 0; 
            }
        } 
    }
</script>