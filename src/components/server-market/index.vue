<template>   
    <div class="absolute w-full h-full flex justify-center items-center text-center flex-col z-50 left-0 right-0 font-inter select-none">  
        <div class="background-global-effect"></div> 
 
        <div v-show="this.modal.status" class="absolute w-full h-full flex justify-center items-center text-center flex-col z-50 left-0 right-0">  
             
            <i class="fa-solid fa-triangle-exclamation text-orange-500 text-8xl"></i>
            
            <div class="font-bold text-3xl mt-3 text-orange-500">{{this.modal.title}}</div>

            <div class="font-semibold text-normal tracking-wider mt-1 w-1/4 text-white"> 
                {{ this.modal.description }}
            </div> 

            <input v-show="this.modal.option == 'Adding Announce'" spellcheck="false" type="text" placeholder="Enter text" class="w-[23rem] h-10 bg-darkPurple text-white rounded-lg text-center font-medium tracking-normal mt-4 focus:border-2 border-violet-500 focus:rounded-full" v-model="this.modal.input" v-model.number="this.modal.input" onkeyup="this.value"> 

  
            <div class="flex flex-row mt-6 text-white font-semibold tracking-wide">  
                <button @click="this.executePageModal();" :class="{'!bg-green-700': this.modal.selected != null}" class="rounded bg-purple-600 w-40 h-10 mx-5">
                    <i class="fa-solid fa-check"></i> {{ this.modal.option == 'Adding Announce' ? 'Add' : 'Select'}}
                </button>

                <button @click="this.closePageModal();" class="rounded bg-purple-600 hover:bg-red-700 w-40 h-10 mx-5">
                    <i class="fa-solid fa-xmark"></i> Close
                </button>
            </div> 
        </div> 
       
        <div v-show="this.market.page != 0" class="flex flex-col justify-center items-center w-full h-full text-white font-inter cursor-pointer"> 
            <div class="header w-full h-[20%] flex flex-col justify-end items-center">
 
                <i  class="fa-solid fa-shop text-8xl"></i> 
                <div class="font-bold text-3xl mt-3">Server Market</div> 
                <div class="font-medium text-normal tracking-wide mt-1 w-1/4"> 
                    Buy or sell items
                </div>  
            </div>

            <div class="footer w-[80%] h-[70%] flex flex-col justify-start items-center mt-[2rem]"> 
                <div class="flex flex-row justify-center items-center h-[3rem] w-full bg-[rgba(59,52,98,0.77)] rounded" v-show="false"></div> 

                <div class="flex flex-row justify-between items-center h-[80%] w-full rounded mt-2" v-show="this.market.page == 1">
 
                    <div class="flex flex-col justify-start items-start h-full w-[79%] rounded">
 
                        <div class="flex flex-col items-center w-full rounded overflow-y-visible h-[40rem]"> 
                            <div v-for="(item, index) in this.listedItems" :key="item" :class="{'!mt-1': index > 0}" class="flex justify-between items-center rounded bg-[#61616110] min-h-[4.8rem] w-full font-semibold tracking-wide hover:bg-[#6161612a]">
                                <div class="flex justify-center items-center w-[5rem] h-full rounded">  
                                    <img v-bind:src="'https://www.pro-gaming.ro/vehicles/' + 'Jester' + '.png'" width="64" height="64"/> 
                                </div>  
 
                                <div class="flex flex-col justify-center items-start w-[50%] h-full rounded ml-2">   
                                    <div class="font-semibold text-[15px] tracking-wide">{{ item.name }}</div>
                                    <div class="font-medium text-[12px] tracking-wide opacity-60">
                                        PRICE: <span class="text-green-600">${{ this.formatThousands(item.price) }}</span>
                                    </div> 
                                </div>   
 
                                <div class="flex flex-col justify-center items-end w-[30rem] h-full rounded mr-2">   
                                    <div class="flex justify-center items-center w-[6rem] h-[1.5rem] bg-green-600 rounded text-[13px]">
                                        <i class="fa-solid fa-money-bill mr-1"></i> FOR SALE
                                       
                                    </div>

                                    <div class="font-medium text-[12px] tracking-wide opacity-60 mt-1">
                                        <i class="fa-solid fa-calendar-days"></i> {{ this.getTimeAgo(item.date) }}
                                    </div> 
                                </div>   
                            </div>  
                        </div>
                    </div>

                    <div class="flex flex-col items-start h-full w-[20%] rounded"> 
                        <div class="flex flex-col items-start w-full h-[3rem] ml-2">   
                            <div class="flex justify-center items-center w-full h-[35px] rounded bg-white text-[#272727] text-[15px] font-semibold tracking-wide hover:shadow-[0px_0px_10px_rgba(255,255,255)]">Manage your items</div>                   
                        </div> 

                        <div class="flex flex-col items-start w-full h-[3rem] ml-2 mt-4"> 
                            <div class="font-semibold text-[14px] tracking-wide"><i class="fa-solid fa-filter"></i> SEARCH FOR ITEMS</div>

                            <div class="font-bold text-[15px] tracking-wide text-white w-full">
                                <div class="w-full relative flex">  
                                    <div class="flex items-center justify-center w-[35px] h-[35px] rounded-bl rounded-tl bg-[#61616110] text-white font-medium text-[15px] cursor-pointer">
                                        <i class="fa fa-search"></i>
                                    </div> 

                                    <input spellcheck="false" class="w-[86%] h-[35px] border-none rounded-br rounded-tr bg-[#61616110] text-white placeholder:text-white text-[13px] font-semibold tracking-wide" type="name" placeholder="Search item" onkeyup="this.value">
                                </div> 
                            </div> 
                        </div> 

                        <div class="flex flex-col items-start w-full h-full ml-2 mt-6"> 
                            <div class="font-semibold text-[14px] tracking-wide"><i class="fa-solid fa-filter"></i> FILTER BY TYPE</div>

                            <div class="flex flex-col items-center w-[97%] rounded overflow-y-scroll h-[40rem]">
                                 
                                <div v-for="(item, index) in this.categoryes"  :key="item" :class="{'!mt-1': index > 0}" class="flex justify-start items-center rounded bg-[#61616110] min-h-[2.5rem] w-full font-semibold tracking-wide hover:bg-[#6161612a]">
                                     
                                    <div class="flex justify-center items-center h-full w-[3rem]"> 
                                        <img v-if="item == 'Vehicles'" v-bind:src="'https://www.pro-gaming.ro/vehicles/' + 'Jester' + '.png'" width="32" height="32"/>   
                                        <img v-else-if="item == 'Vouchers'" v-bind:src="'https://i.imgur.com/Dx6oErP.png'" width="35" height="35"/>   
                                        <img v-else-if="item == 'Clothes'" v-bind:src="'https://i.imgur.com/xMCo5jW.png'" width="35" height="35"/>   
                                        <img v-else-if="item == 'Food'" v-bind:src="'https://i.imgur.com/xyFGhdh.png'" width="35" height="35"/>   
                                        <img v-else-if="item == 'Weapons'" v-bind:src="'https://www.pro-gaming.ro/weapons/' + 'Pistol' + '.webp'" width="35" height="35"/>    
                                    </div>
 
                                    <div class="font-semibold text-[14px] tracking-wide ml-1">{{ item }}</div>  
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
        name: 'MarketComponent',

        data: function() {
            return {  
 
                market: {
                    page: 0,
                },

                modal: {
                    status: false,
                    title: '',
                    description: '',
                    option: '',
                    input: '',
                    item: null,
                    selected: null 
                },
 
                categoryes: [
                    'Vehicles',
                    'Clothes',
                    'Food',
                    'Weapons',
                    'Vouchers'
                ],

                listedItems: [ 
                    {
                        id: 1,
                        name: 'Elegy retro custom #11111',
                        price: 1000,
                        category: 'vehicles',

                        seller: 'MihaiADV',
                        date: '2023-07-22 21:20:32'
                    }
                ] 
            };
        },    

        mounted() { 
 
            window.MarketComponent = this;   
        },

        methods: 
        {
            open(page, items) {

                console.log(items)
                 
                this.market = {
                    page: page,
                };

                if(page == 0) {
                    this.showModal(true, 'Server Market', 'Please enter your announce', 'Adding Announce', null);
                } 
            },

            getTimeAgo(databaseTimestamp) {
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

            formatThousands(x) {
                return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); 
            }, 

            createAnnounce() { 
                if(!this.modal.input || this.modal.input.length < 5)
                    return;
 
                console.log('announce created ' + this.modal.input)
            },

            showModal(status, title, description, option, item) {
                this.modal = {
                    status: status,
                    title: title,
                    description: description,
                    option: option,
                    input: '',

                    item: item,
                    selected: null
                } 
            },

            executePageModal() {
                switch(this.modal.option) {

                    case 'Adding Announce': {
                        this.createAnnounce();
                        break;
                    }
                }
            }
        } 
    }
</script>