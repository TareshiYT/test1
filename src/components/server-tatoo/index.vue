<template>  
    <div class="absolute w-full h-full flex flex-col items-center justify-center font-inter bg-none">
        <div class="flex flex-row justify-between w-full h-[10%]">  
            <div class="flex flex-col text-white h-full ml-7">  
                <div class="text-[#6b6bfa] tracking-wide text-[2rem] font-extrabold">LOS SANTOS</div>
                <div class="text-white tracking-wide text-[1.5rem] font-semibold mt-[-15px]">TATTO SHOP</div>   
            </div> 

            <div class="flex flex-col text-white items-center h-full mr-[27px]">

                <!--<div class="flex flex-row justify-center items-center w-full h-[3rem]">  
                    <img class="mr-2 text-left" src="https://i.imgur.com/Yi7bEsF.png" width="30" height="30"> | <i class="fa-solid fa-rotate fa-spin ml-2 text-[25px] text-purple-400"></i>  
                    <span class="ml-2 text-sm font-normal tracking-wide opacity-80"> rotate vehicle</span>
                </div>

                <div class="bg-gradient-to-l from-purple-400  w-full rounded h-[2px]"></div>-->

                <div class="flex flex-row justify-end items-center w-full h-[3rem]">   
                    <div class="flex justify-center items-center bg-white text-black font-bold tracking-wide text-[13px] rounded w-[3rem] h-[1.5rem]">ESC</div> 
                    <span class="ml-2 text-sm font-normal tracking-wide text-right opacity-80">  
                        {{ this.selected.category != 'none' ? 'back to body parts' : 'close menu' }} 
                    </span>
                </div>
            </div>
        </div> 

        
        <div class="flex flex-row w-full h-[90%] justify-center items-start cursor-pointer" v-if="this.selected.category != 'none'">    
            
            <!--HERE IS LISTED ITEMS-->
            <div class="flex flex-col w-full h-[90%] justify-center items-start cursor-pointer">    
                <div class="min-w-[30%] h-[29.7rem] ml-7 mt-[2rem] overflow-y-auto text-white">  
                    <div class="w-full h-full flex flex-col justify-start">
                        <div class="w-[16rem] min-h-[2.8rem] flex flex-row justify-between items-center bg-[#4444441c] border-2 border-[#a0a0a01e] rounded mt-2 hover:bg-gradient-to-r from-purple-400 hover:border-none hover:rounded" v-for="(item) in this.getItems()" :class="{'!bg-gradient-to-r from-purple-400 !border-none !rounded': this.selected.item != null && this.selected.item == item}"  @click="this.selectItem(item)" v-bind:key="item"> 
                            <div class="font-semibold text-[15px] tracking-wide ml-2">{{item.LocalizedName}}</div>
                            <div class="font-semibold text-[13px] tracking-wide mr-2 text-green-500">${{item.Price}}</div> 
                        </div> 
                    </div>  
                </div> 

                <div @click="this.addItemToCart()" class="flex justify-center items-center w-[16rem] min-h-[2.4rem] bg-white text-black font-bold text-[13px] rounded ml-7 mt-4 tracking-wide font-montserrat hover:shadow-[0px_0px_10px_#fff]">
                    <i class="fa-solid fa-cart-shopping mr-1"></i> ADD TO CART
                </div> 


                <div class="flex justify-start items-center w-[16rem] mt-4 font-medium text-[14px] ml-7 rounded tracking-wide text-white">
                    <i class="fa-solid fa-camera-rotate mr-1"></i> Rotate Camera
                </div> 
                <input v-model="this.rotation" @mousemove="this.rotatePlayer($event)" class="ml-7 w-[16rem] h-[5px] mt-2 appearance-none [&::-webkit-slider-runnable-track]:rounded-full bg-[rgb(93,81,158)] rounded-full    
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[15px] [&::-webkit-slider-thumb]:w-[15px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500" type="range" max="1150">
            </div>

            <!--HERE IS YOUR ITEMS FROM CHECKOUT-->
            <div class="flex flex-col w-full h-[90%] justify-center items-end cursor-pointer" v-if="this.checkout.length">    

                <div class="flex justify-start items-start w-[16rem] font-semibold text-[14px] mr-7 rounded tracking-wide text-white">
                    <i class="fa-solid fa-cart-shopping mr-1"></i> Your Cart
                </div> 

                <div class="min-w-[30%] max-h-[29.7rem] ml-7 overflow-y-auto text-white">  
                    <div class="w-full h-full flex flex-col justify-start">
                        <div class="w-[16rem] min-h-[2.8rem] flex flex-row justify-between items-center bg-[#a0a0a01c] border-2 border-[#a0a0a01e] rounded mt-2" v-for="(item) in this.checkout" v-bind:key="item"> 
                            <div class="font-semibold text-[15px] tracking-wide ml-2 w-full">{{item.LocalizedName}}</div>
                             
                            <div class="flex flex-row justify-center items-center font-semibold h-[23px] text-[13px] tracking-wide mr-2 text-green-500">
                                ${{item.Price}}
                            
                                <div @click="this.removeTatoo(item)" class="flex justify-center items-center w-[20px] h-[20px] rounded font-semibold text-[17px] tracking-wide ml-2 text-red-400 hover:text-red-600">
                                
                                    <i class="fa-solid fa-xmark"></i>
                                </div> 
                            </div>  
                        </div> 
                    </div>  
                </div>  

                <div class="flex justify-end items-start w-[16rem] font-semibold mt-6 text-[12px] mr-7 rounded tracking-wider text-white">
                    Total Price: <span class="text-green-500 ml-1"> ${{ this.formatThousands(this.checkoutPrice()) }}</span>  
                </div> 

                <div @click="this.purchaseItems()" class="flex justify-center items-center w-[16rem] h-[2.2rem] bg-white text-gray-900 font-bold mr-7 text-[13px] rounded mt-2 tracking-wider hover:shadow-[0px_0px_10px_#fff]">
                    <i class="fa-solid fa-check-double mr-1 font-bold"></i> CHECKOUT
                </div>  
            </div>
        </div> 

        <div class="flex flex-col w-full h-[90%] justify-center items-center" v-if="this.selected.category == 'none'">  
 
            <div class="w-[34rem] h-[55rem] flex flex-col items-center">
                
                <div class="w-full h-[10%] flex flex-col justify-center items-start"> 

                    <div class="w-auto h-auto flex flex-col justify-center items-center text-center text-white" style="zoom: 92%;">   
                        <div class="text-[12px] font-semibold tracking-wider w-full" v-if="Object.keys(this.tattoos).length">{{this.getCountItems('head')}} TATOOS</div>  
                        <div @click="this.changeCategory('head')" class="w-[7rem] h-[7rem] flex flex-col justify-center items-center text-center rounded-full bg-[#a0a0a070] text-white mt-1 hover:bg-[#a0a0a017]"> 
                            <img src="https://i.imgur.com/o7pis29.png" width="52" height="52"> 
                            <div class="text-[12px] font-semibold tracking-wide w-full mt-1">HEAD</div> 
                        </div> 
                        
                        <div class="text-[13px] font-medium tracking-wider w-full mt-[5px]">
                            {{2 - this.getAvailableSlots('head')}} slots available
                        </div>   
                    </div>  
                </div>  

                <div class="w-full h-[38%] flex flex-row justify-between items-end"> 
                    <div class="w-auto h-auto flex flex-col justify-center items-center text-center  text-white mt-2" style="zoom: 92%;">  
                        <div class="text-[12px] font-semibold tracking-wider w-full" v-if="Object.keys(this.tattoos).length">{{this.getCountItems('leftarm')}} TATOOS</div> 

                        <div @click="this.changeCategory('leftarm')" class="w-[7rem] h-[7rem] flex flex-col justify-center items-center text-center rounded-full bg-[#a0a0a070] text-white mt-1 hover:bg-[#a0a0a017]"> 
                            <img src="https://i.imgur.com/iuT9ieE.png" width="52" height="52"> 
                            <div class="text-[12px] font-semibold tracking-wide w-full mt-1">LEFT ARM</div> 
                        </div>
 
                        <div class="text-[13px] font-medium tracking-wider w-full mt-[5px]">
                            {{2 - this.getAvailableSlots('leftarm')}} slots available
                        </div>
                    </div>    

                    <div class="w-auto h-auto flex flex-col justify-start items-start text-center text-white mb-[5rem]" style="zoom: 92%;">  
                        <div class="text-[12px] font-semibold tracking-wider w-full" v-if="Object.keys(this.tattoos).length">{{this.getCountItems('torso')}} TATOOS</div> 

                        <div @click="this.changeCategory('torso')" class="w-[7rem] h-[7rem] flex flex-col justify-center items-center text-center rounded-full bg-[#a0a0a070] text-white mt-1 hover:bg-[#a0a0a017]"> 
                            <img src="https://i.imgur.com/vfl3Jjx.png" width="52" height="52"> 
                            <div class="text-[12px] font-semibold tracking-wide w-full mt-1">TORSO</div> 
                        </div>

                        <div class="text-[13px] font-medium tracking-wider w-full mt-[5px]">
                            {{2 - this.getAvailableSlots('torso')}} slots available
                        </div>
                    </div>     

                    <div class="w-auto h-auto flex flex-col justify-center items-center text-center  text-white mt-2" style="zoom: 92%;">  
                        <div class="text-[12px] font-semibold tracking-wider w-full" v-if="Object.keys(this.tattoos).length">{{this.getCountItems('rightarm')}} TATOOS</div> 

                        <div @click="this.changeCategory('rightarm')" class="w-[7rem] h-[7rem] flex flex-col justify-center items-center text-center rounded-full bg-[#a0a0a070] text-white mt-1 hover:bg-[#a0a0a017]"> 
                            <img src="https://i.imgur.com/iuT9ieE.png" width="52" height="52"> 
                            <div class="text-[12px] font-semibold tracking-wide w-full mt-1">RIGHT ARM</div> 
                        </div>

                        <div class="text-[13px] font-medium tracking-wider w-full mt-[5px]">
                            {{2 - this.getAvailableSlots('rightarm')}} slots available
                        </div>
                    </div>   
                </div>  

                <div class="w-full h-[36%] flex flex-row justify-between items-end"> 

                    <div class="w-auto h-auto flex flex-col justify-center items-center text-center  text-white mt-2" style="zoom: 92%;">  
                        <div class="text-[12px] font-semibold tracking-wider w-full" v-if="Object.keys(this.tattoos).length">{{this.getCountItems('rightleg')}} TATOOS</div> 

                        <div @click="this.changeCategory('rightleg')" class="w-[7rem] h-[7rem] flex flex-col justify-center items-center text-center rounded-full bg-[#a0a0a070] text-white mt-1 hover:bg-[#a0a0a017]"> 
                            <img src="https://i.imgur.com/6vyHcqr.png" width="52" height="52"> 
                            <div class="text-[12px] font-semibold tracking-wide w-full mt-1">RIGHT LEG</div> 
                        </div>

                        <div class="text-[13px] font-medium tracking-wider w-full mt-[5px]">
                            {{2 - this.getAvailableSlots('rightleg')}} slots available
                        </div>
                    </div>     
    
                    <div class="w-auto h-auto flex flex-col justify-center items-center text-center  text-white mt-2" style="zoom: 92%;">  
                        <div class="text-[12px] font-semibold tracking-wider w-full" v-if="Object.keys(this.tattoos).length">{{this.getCountItems('leftleg')}} TATOOS</div> 

                        <div @click="this.changeCategory('leftleg')" class="w-[7rem] h-[7rem] flex flex-col justify-center items-center text-center rounded-full bg-[#a0a0a070] text-white mt-1 hover:bg-[#a0a0a017]"> 
                            <img src="https://i.imgur.com/6vyHcqr.png" width="52" height="52"> 
                            <div class="text-[12px] font-semibold tracking-wide w-full mt-1">LEFT LEG</div> 
                        </div>

                        <div class="text-[13px] font-medium tracking-wider w-full mt-[5px]">
                            {{2 - this.getAvailableSlots('leftleg')}} slots available
                        </div>
                    </div>     
                </div>  
            </div> 
        </div>  
    </div>  
</template>
  
<script>    
    export default {
        name: 'TatooComponent',

        data: function() 
        {
            return {  
                category: ["torso", "head", "leftarm", "rightarm", "leftleg", "rightleg"],
                 
                checkout: [], 
                tattoos: {},
                playerTatoos: [],
                rotation: 0,

                selected: {
                    category: 'none',

                    item: null
                }     
            }
        },    

        mounted()
        { 
            window.TatooComponent = this;
            
            if(window.mp) {
                window.e_rpc.add('reloadBrowserTatoo', (checkouts) => {  
                    if(checkouts == false) {
                        this.selected.category = 'none';

                        this.selected.item = null;
                    }
                     
                    if(checkouts != false) {
                        this.checkout = JSON.parse(checkouts);
                    }  
                });
            } 
        },

        methods: 
        { 
            open(rotation, data, ptatoo) {  
                this.rotation = parseFloat(rotation);

                this.playerTatoos = JSON.parse(ptatoo); 
 
                return this.tattoos = data;
            },
 
            formatThousands(x) {
                return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); 
            },

            changeCategory(option) {
                this.selected.category = option;

                if(window.mp) {
                    window.e_trigger('client::tatoo:changeCategory', option);
                }
            },

            getCountItems(category) {    
                let swapCategory =  {
                    "torso": this.tattoos.Torso, 
                    "head": this.tattoos.Head, 
                    "leftarm": this.tattoos.LeftArm, 
                    "rightarm": this.tattoos.RightArm, 
                    "leftleg": this.tattoos.LeftLeg, 
                    "rightleg": this.tattoos.RightLeg
                };
 
                return Object.keys(swapCategory[category]).length;
            },

            getItems() {
 
                let categoryesString =  {
                    "torso": this.tattoos.Torso, 
                    "head": this.tattoos.Head, 
                    "leftarm": this.tattoos.LeftArm, 
                    "rightarm": this.tattoos.RightArm, 
                    "leftleg": this.tattoos.LeftLeg, 
                    "rightleg": this.tattoos.RightLeg
                };

                return categoryesString[this.selected.category];
            },

            checkoutPrice() {
                let count = 0;

                for(let x = 0; x < this.checkout.length; x++) {
                    count += this.checkout[x].Price;
                }

                return count;
            }, 

            selectItem(item) {  
                if(this.selected.item == item) {
                    this.selected.item = null;
                }
                else {
                    this.selected.item = item;
                }
              
                if(window.mp) {
                    window.e_trigger('client::tatoo:select', JSON.stringify(item));
                }
            },

            addItemToCart() {  
                if(this.selected.item == null)
                    return;

                this.selected.item = null;

                if(window.mp) {
                    window.e_trigger('client::tatoo:addItemToCart');
                }
            },

            removeTatoo(item) {
                if(window.mp) {
                    window.e_trigger('client::tatoo:remove', JSON.stringify(item));
                }
            },

            rotatePlayer(event) {     
                if(window.mp) {
                    return window.e_trigger("client::tatoo:rotatePlayer", event.target.value);  
                }    
            },

            consoled(text) {
                console.log(text)
            },

            purchaseItems() {
                if(window.mp) { 
                    return window.e_rpc('server::tatoo:purchaseItems', JSON.stringify({ items: this.checkout, price: this.checkoutPrice() }));
                } 
            }, 
 
            getAvailableSlots(slot) {
                let countActual = 0;

                for(let x = 0; x < this.playerTatoos.length; x++) {  
                    if(this.playerTatoos[x].slot == slot) {
                        countActual ++;
                    }
                } 
                return countActual;
            }, 
        } 
    }
</script>