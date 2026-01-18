<template>  
    <div class="w-full h-full absolute flex flex-col justify-around overflow-hidden animate-openPage"> <!--[#0d1627d3]--> 
        
        <div class="w-full h-full flex-col items-center justify-between font-inter">
            <div class="flex flex-row justify-between w-full h-[20%]">  
                <div class="flex flex-col text-white h-full ml-7">  
                    <div class="text-[#6b6bfa] tracking-wide text-[2rem] font-extrabold">LOS SANTOS</div>
                    <div class="text-white tracking-wide text-[1.5rem] font-semibold mt-[-15px]">SHOWROOM</div>   
                </div>
  
                <div class="flex flex-col text-white items-center h-full mr-[27px]">

                    <div class="flex flex-row justify-center items-center w-full h-[3rem]">  
                        <img class="mr-2 text-left" src="https://i.imgur.com/Yi7bEsF.png" width="30" height="30"> | <i class="fa-solid fa-rotate fa-spin ml-2 text-[25px] text-purple-400"></i>  
                        <span class="ml-2 text-sm font-normal tracking-wide opacity-80"> rotate vehicle</span>
                    </div>

                    <div class="bg-gradient-to-l from-purple-400  w-full rounded h-[2px]"></div>

                    <div class="flex flex-row justify-end items-center w-full h-[3rem]">  
                        <img class=" text-left" src="https://i.imgur.com/Yi7bEsF.png" width="30" height="30">    
                        <span class="ml-2 text-sm font-normal tracking-wide text-right opacity-80"> select option</span>
                    </div>
                </div>
            </div> 
 
            <div class="flex flex-row w-full h-[62%] justify-between"> 

                <div class="flex flex-col w-full h-full justify-center ml-7"> 
                    
                    <div class="w-[17rem] h-[5rem] flex flex-row justify-between items-center text-white font-montserrat" v-if="Object.keys(this.selected).length">   
                        <div class="header-one">
                            <div class="text-[22px] font-bold tracking-[0.2px]">COLORS</div>
                            <div class="text-[16px] font-normal tracking-[0.2px] opacity-50">{{this.selected.colorselect ? 'Secondary' : 'Primary'}}</div>
                        </div>

                        <div class="flex items-center justify-center bg-white text-black w-[2.8rem] h-[2.8rem] rounded text-[22px] font-bold hover:shadow-customindigo" @click="this.swapColor()">
                            <i class="fa-solid fa-arrow-right-arrow-left"></i>
                        </div>

                        <div class="font-semibold text-[17px]">  
                            <div class="title">Change to</div>
                            <div class="subtitle">{{this.selected.colorselect ? 'Primary' : 'Secondary'}}</div>
                        </div>
                    </div> 

                    <div class="flex flex-row w-[42rem] h-[25rem] items-center" v-if="Object.keys(this.selected).length">   
                        <div class="flex flex-col justify-evenly items-center w-[3.5rem] h-[20rem] bg-[rgba(3,3,3,0.53)] text-white rounded">

                            <div class="flex justify-center items-center w-[2.3rem] h-[2.3rem] text-[19px] bg-red-600 rounded-full" 
                            v-for="(item, index) in this.colors" @click="this.selectColor(item.hex, index)"  :style="{'background-color': '#' + item.hex}" 
                            v-bind:key="item" v-bind:class = "{'scale-1 border-2 border-[#fff]': this.selected.colors[this.selected.colorselect] == item.hex}">
                                <i v-if="this.selected.colors[0] == item.hex && this.selected.colorselect == 0" class="fa-solid fa-check" :style="{color: item.hex == 'fff' ? '#000' : '#fff'}"></i>
                                <i v-if="this.selected.colors[1] == item.hex && this.selected.colorselect == 1" class="fa-solid fa-check" :style="{color: item.hex == 'fff' ? '#000' : '#fff'}"></i>
                            </div> 
                        </div>

                        <div class="flex flex-col justify-center w-[37rem] h-[25rem]"> 
                            <div class="ml-10">  
                                <div class="text-[20px] text-white font-semibold tracking-wide">{{ this.selected.model }}</div>
                                <div class="text-[15px] text-green-500 font-semibold tracking-wide">${{ this.formatThousands(this.selected.price) }}</div>
                            </div> 

                            <div class="flex flex-col w-full h-[15rem]"> 
                                <div class="flex flex-row justify-center items-center text-white w-full h-[3.3rem] ml-10"> 
                                    <div class="flex items-center justify-center w-[38px] h-[38px] border-2 border-[rgba(255, 255, 255, 0.50)] rounded">
                                        <img src="https://i.imgur.com/HzZGRMJ.png" width="25" height="25">
                                    </div>
                
                                    <div class="flex flex-col w-full h-[3rem] justify-center">
                                        <div class="text-[16px] font-semibold tracking-wide ml-2">Speed</div>
                                        <div class="flex flex-row justify-between items-center w-[12rem] ml-2"> 
                                            <div class="w-[2.5rem] h-[8px] relative rounded bg-[rgba(3,3,3,0.53)]">
                                                <div class="relative w-[2.5rem] h-[8px] rounded bg-white" v-if="this.selected.specifications.speed >= 20.0"></div>
                                            </div>

                                            <div class="w-[2.5rem] h-[8px] relative rounded bg-[rgba(3,3,3,0.53)]">
                                                <div class="relative w-[2.5rem] h-[8px] rounded bg-white" v-if="this.selected.specifications.speed >= 45.0"></div>
                                            </div>

                                            <div class="w-[2.5rem] h-[8px] relative rounded bg-[rgba(3,3,3,0.53)]">
                                                <div class="relative w-[2.5rem] h-[8px] rounded bg-white" v-if="this.selected.specifications.speed >= 50.0"></div>
                                            </div>

                                            <div class="w-[2.5rem] h-[8px] relative rounded bg-[rgba(3,3,3,0.53)]">
                                                <div class="relative w-[2.5rem] h-[8px] rounded bg-white" v-if="this.selected.specifications.speed >= 55.0"></div>
                                            </div> 
                                        </div>
                                    </div>  
                                </div>

                                <div class="flex flex-row justify-center items-center text-white w-full h-[3.3rem] ml-10"> 
                                    <div class="flex items-center justify-center w-[35px] h-[35px] text-[22px] border-2 border-[rgba(255, 255, 255, 0.50)] rounded">
                                        <i class="fa-solid fa-bolt"></i>
                                    </div>
                
                                    <div class="flex flex-col w-full h-[5rem] justify-center">
                                        <div class="text-[16px] font-semibold tracking-wide ml-2">Acceleration</div>
                                        <div class="flex flex-row justify-between items-center w-[12rem] ml-2"> 
                                            <div class="w-[2.5rem] h-[8px] relative rounded bg-[rgba(3,3,3,0.53)]">
                                                <div class="relative w-[2.5rem] h-[8px] rounded bg-white" v-if="this.selected.specifications.acceleration >= 0.10"></div>
                                            </div>

                                            <div class="w-[2.5rem] h-[8px] relative rounded bg-[rgba(3,3,3,0.53)]">
                                                <div class="relative w-[2.5rem] h-[8px] rounded bg-white" v-if="this.selected.specifications.acceleration >= 0.30"></div>
                                            </div>

                                            <div class="w-[2.5rem] h-[8px] relative rounded bg-[rgba(3,3,3,0.53)]">
                                                <div class="relative w-[2.5rem] h-[8px] rounded bg-white" v-if="this.selected.specifications.acceleration >= 0.35"></div>
                                            </div> 

                                            <div class="w-[2.5rem] h-[8px] relative rounded bg-[rgba(3,3,3,0.53)]">
                                                <div class="relative w-[2.5rem] h-[8px] rounded bg-white" v-if="this.selected.specifications.acceleration >= 0.40"></div>
                                            </div> 
                                        </div>
                                    </div>  
                                </div>

                                <div class="flex flex-row justify-center items-center text-white w-full h-[3.3rem] ml-10"> 
                                    <div class="flex items-center justify-center w-[35px] h-[35px] text-[22px] border-2 border-[rgba(255, 255, 255, 0.50)] rounded">
                                        <img src="https://i.imgur.com/juUoZku.png" width="25" height="25">
                                    </div>
                
                                    <div class="flex flex-col w-full h-[5rem] justify-center">
                                        <div class="text-[16px] font-semibold tracking-wide ml-2">Braking</div>
                                        <div class="flex flex-row justify-between items-center w-[12rem] ml-2"> 
                                            <div class="w-[2.5rem] h-[8px] relative rounded bg-[rgba(3,3,3,0.53)]">
                                                <div class="relative w-[2.5rem] h-[8px] rounded bg-white" v-if="this.selected.specifications.braking >= 0.3"></div>
                                            </div>

                                            <div class="w-[2.5rem] h-[8px] relative rounded bg-[rgba(3,3,3,0.53)]">
                                                <div class="relative w-[2.5rem] h-[8px] rounded bg-white" v-if="this.selected.specifications.braking >= 0.6"></div>
                                            </div>

                                            <div class="w-[2.5rem] h-[8px] relative rounded bg-[rgba(3,3,3,0.53)]">
                                                <div class="relative w-[2.5rem] h-[8px] rounded bg-white" v-if="this.selected.specifications.braking >= 0.8"></div>
                                            </div>

                                            <div class="w-[2.5rem] h-[8px] relative rounded bg-[rgba(3,3,3,0.53)]">
                                                <div class="relative w-[2.5rem] h-[8px] rounded bg-white" v-if="this.selected.specifications.braking >= 1.0"></div>
                                            </div> 
                                        </div>
                                    </div>  
                                </div>
        
                                <div class="flex flex-row justify-center items-center text-white w-full h-[3.3rem] ml-10"> 
                                    <div class="flex items-center justify-center w-[35px] h-[35px] text-[22px] border-2 border-[rgba(255, 255, 255, 0.50)] rounded">
                                        <img src="https://i.imgur.com/aWkOtnC.png" width="25" height="25">
                                    </div>
                
                                    <div class="flex flex-col w-full h-[5rem] justify-center">
                                        <div class="text-[16px] font-semibold tracking-wide ml-2">Traction</div>
                                        <div class="flex flex-row justify-between items-center w-[12rem] ml-2"> 
                                            <div class="w-[2.5rem] h-[8px] relative rounded bg-[rgba(3,3,3,0.53)]">
                                                <div class="relative w-[2.5rem] h-[8px] rounded bg-white" v-if="this.selected.specifications.traction >= 1.0"></div>
                                            </div>

                                            <div class="w-[2.5rem] h-[8px] relative rounded bg-[rgba(3,3,3,0.53)]">
                                                <div class="relative w-[2.5rem] h-[8px] rounded bg-white" v-if="this.selected.specifications.traction >= 2.0"></div>
                                            </div>

                                            <div class="w-[2.5rem] h-[8px] relative rounded bg-[rgba(3,3,3,0.53)]">
                                                <div class="relative w-[2.5rem] h-[8px] rounded bg-white" v-if="this.selected.specifications.traction >= 2.3"></div>
                                            </div>

                                            <div class="w-[2.5rem] h-[8px] relative rounded bg-[rgba(3,3,3,0.53)]">
                                                <div class="relative w-[2.5rem] h-[8px] rounded bg-white" v-if="this.selected.specifications.traction >= 2.5"></div>
                                            </div> 
                                        </div>
                                    </div>  
                                </div>

                                <div class="flex flex-row justify-center items-center text-white w-full h-[3.3rem] ml-10"> 
                                    <div class="flex items-center justify-center w-[35px] h-[35px] text-[22px] border-2 border-[rgba(255, 255, 255, 0.50)] rounded">
                                        <img src="https://i.imgur.com/5ZcuSzg.png" width="25" height="25">
                                    </div>
                
                                    <div class="flex flex-col w-full h-[5rem] justify-center">
                                        <div class="text-[16px] font-semibold tracking-wide ml-2">Fuel Tank Volume</div>
                                        <div class="flex flex-row justify-between items-center w-[12rem] ml-2"> 
                                            <div class="w-[2.5rem] h-[8px] relative rounded bg-[rgba(3,3,3,0.53)]">
                                                <div class="relative w-[2.5rem] h-[8px] rounded bg-white"></div>
                                            </div>

                                            <div class="w-[2.5rem] h-[8px] relative rounded bg-[rgba(3,3,3,0.53)]">
                                                <div class="relative w-[2.5rem] h-[8px] rounded bg-white"></div>
                                            </div>

                                            <div class="w-[2.5rem] h-[8px] relative rounded bg-[rgba(3,3,3,0.53)]">
                                                <div class="relative w-[2.5rem] h-[8px] rounded bg-white"></div>
                                            </div>

                                            <div class="w-[2.5rem] h-[8px] relative rounded bg-[rgba(3,3,3,0.53)]">
                                                <div class="relative w-[2.5rem] h-[8px] rounded bg-white"></div>
                                            </div> 
                                        </div>
                                    </div>  
                                </div> 
                            </div> 
                        </div>   
                    </div>   

                    <button v-if="Object.keys(this.selected).length" @click="this.purchaseVehicle();"  class="h-[2.2rem] w-[20.5rem] font-semibold tracking-wide flex justify-center items-center bg-white text-black rounded hover:shadow-customindigo">
                        <i class="fa-solid fa-cart-shopping"></i> Purchase
                    </button> 
                </div>   

            
                <div class="flex w-full h-full justify-center items-end flex-col mr-[27px]">     
                    <div class="flex flex-col justify-center items-end text-white h-[30rem]">
 
                        <div class="text-white">
                            <div class="text-[22px] font-bold tracking-[0.2px] h-6">VEHICLES CATEGORY</div>
                            <div class="text-[18px] font-normal tracking-[0.2px] opacity-80 text-right">{{this.selectCategory}}</div>
                        </div>

                        <div class="flex flex-col justify-center items-center">
                            <button @click="this.changeCategory('basic')" :class="{'bg-purple-600 text-white': this.selectCategory == 'basic'}" class="h-[2rem] w-[20.5rem] font-[500] text-sm tracking-wide flex justify-center items-center bg-[rgba(3,3,3,0.30)] text-gray-200 rounded mt-2 hover:bg-purple-600 hover:text-white">
                                <i class="fa-solid fa-car mr-1"></i> Basic
                            </button> 

                            <button @click="this.changeCategory('sport')" :class="{'bg-purple-600 text-white': this.selectCategory == 'sport'}" class="h-[2rem] w-[20.5rem] font-[500] text-sm tracking-wide flex justify-center items-center bg-[rgba(3,3,3,0.30)] text-gray-200 rounded mt-2 hover:bg-purple-600 hover:text-white">
                                <i class="fa-solid fa-car mr-1"></i> Sports
                            </button> 
 
                            <button @click="this.changeCategory('suv')" :class="{'bg-purple-600 text-white': this.selectCategory == 'suv'}" class="h-[2rem] w-[20.5rem] font-[500] text-sm tracking-wide flex justify-center items-center bg-[rgba(3,3,3,0.30)] text-gray-200 rounded mt-2 hover:bg-purple-600 hover:text-white">
                                <i class="fa-solid fa-car mr-1"></i> Suv
                            </button> 

                            <button @click="this.changeCategory('moto')" :class="{'bg-purple-600 text-white': this.selectCategory == 'moto'}" class="h-[2rem] w-[20.5rem] font-[500] text-sm tracking-wide flex justify-center items-center bg-[rgba(3,3,3,0.30)] text-gray-200 rounded mt-2 hover:bg-purple-600 hover:text-white">
                                <i class="fa-solid fa-motorcycle mr-1"></i> Motorcycles
                            </button>  
                        </div>
                    </div>
                </div> 
            </div> 

            <div class="flex w-full h-[12rem] justify-start items-center flex-col">   
                <div class="w-[98%] h-[2rem] flex justify-between flex-row items-center">
                     
                    <div class="bg-gradient-to-l from-purple-400 w-[100%] rounded-full h-[2px]"></div>

                    <div class="w-[8rem] h-full flex flex-row justify-center items-center">
                        
                        <button @click="this.scroll_left()" class="hover:bg-[rgba(36,36,36,0.63)] hover:border-purple-600 w-[35px] h-[35px] flex justify-center items-center text-white rounded-full bg-[rgba(36,36,36,0.27)] border-2 border-purple-400 ml-5">
                            <i class="fa-solid fa-chevron-left opacity-50"></i>
                        </button>  

                        <button @click="this.scroll_right()" class="hover:bg-[rgba(36,36,36,0.63)] hover:border-purple-600 w-[35px] h-[35px] flex justify-center items-center text-white rounded-full bg-[rgba(36,36,36,0.27)] border-2 border-purple-400 ml-5">
                            <i class="fa-solid fa-chevron-right opacity-50"></i>
                        </button>  
                    </div> 
                </div> 

                <div class="wrapper-box flex flex-row h-[9rem] justify-center overflow-x-hidden w-[99%]">  
                    <div v-for="(item) in this.vehicles.filter(property => property.category == this.selectCategory)" :key="item" @click="this.selectVehicle(item)" :class="{'border-purple-600 shadow-customindigo' : Object.keys(this.selected).length && this.selected.id == item.id}" class="m-2 min-w-[15.8rem] min-h-[5rem] flex flex-col justify-center items-center border-2 border-[rgba(126,126,126,0.64)] rounded bg-[rgba(36,36,36,0.83)] hover:border-purple-600 hover:bg-[rgba(36,36,36,0.27)] hover:shadow-customindigo">

                        <div class="text-white opacity-70 font-inter text-[12px] font-normal tracking-[1.2px] text-left ml-4 flex items-center w-full h-[10%]">
                            {{ item.model }}
                        </div>

                        <div class="flex justify-center items-center w-full h-[70%]">
                            <img v-bind:src="'https://www.pro-gaming.ro/vehicles/' + item.model + '.png'" width="128" height="128"/> 
                        </div>
    
                        <div class="text-[#009933] font-inter text-[12px] font-semibold text-left ml-4 flex items-center w-full h-[10%]">
                            ${{this.formatThousands(item.price)}}
                        </div>
                    </div> 
                </div>   
            </div>  
        </div>  
    </div>  
</template>
  
<script>  
    export default {
        name: 'DealershipComponent',

        data: function() {
            return { 
 
                colors: 
                [
                    { hex: 'ffffff' },  
                    { hex: '000000' },   
                    { hex: 'ff0000' },  
                    { hex: '0066ff' },
                    { hex: 'ff6600' },
                    { hex: '7f39ff' }
                ],
  
                vehicles:
                [ 
                    { id: 1, model: 'Jester', price: 12000, category: 'coupes', specifications: {speed: 100, acceleration: 150, braking:2, traction:3, tank:2} }, 
                    { id: 2, model: 'Jester', price: 12000, category: 'coupes', specifications: {speed: 100, acceleration: 150, braking:2, traction:3, tank:2} },
                    { id: 3, model: 'Jester', price: 12000, category: 'coupes', specifications: {speed: 100, acceleration: 150, braking:2, traction:3, tank:2} },
                    { id: 4, model: 'Jester', price: 12000, category: 'coupes', specifications: {speed: 100, acceleration: 150, braking:2, traction:3, tank:2} },
                    { id: 5, model: 'Jester', price: 12000, category: 'coupes', specifications: {speed: 100, acceleration: 150, braking:2, traction:3, tank:2} },
                    { id: 6, model: 'Jester', price: 12000, category: 'coupes', specifications: {speed: 100, acceleration: 150, braking:2, traction:3, tank:2} },
                    { id: 7, model: 'Jester', price: 12000, category: 'coupes', specifications: {speed: 100, acceleration: 150, braking:2, traction:3, tank:2} },  
                ],

                selectCategory: 'coupes',
                selected: []
            };
        },    

        mounted()
        { 
            window.DealershipComponent = this;  
        },

        methods: 
        { 

            open(vehicles)
            {
                this.vehicles = vehicles;

                this.selected = [];
                this.selectCategory = 'coupes';

                //this.selectVehicle(this.vehicles[0]); //auto select vehicle
            },

            selectVehicle(vehicle)
            {
                if(this.selected.id == vehicle.id)
                {
                    return this.selected = [];
                }

                this.selected = { 
                    id: vehicle.id,
                    model: vehicle.model,
                    price: vehicle.price,

                    colorselect: 0,
                    colors: [ 'ffffff', 'ffffff' ],
                      
                    specifications: vehicle.specifications
                }

                if(window.mp)
                { 
                    return window.e_rpc('server::showroom:changeVehicle', JSON.stringify(this.selected));  
                }
            },

            changeCategory(category)
            {
                this.selected = [];
                this.selectCategory = category;

                if(window.mp)
                { 
                    return window.e_rpc('server::showroom:changeVehicle', JSON.stringify(this.selected));  
                }
            },  

            purchaseVehicle()
            {
                if(!Object.keys(this.selected).length)
                    return;
 
                if(window.mp)
                { 
                    return window.e_rpc('server::showroom:purchaseVehicle', JSON.stringify(this.selected));  
                } 
            },
 
            selectColor(hex)
            {
                this.selected.colors[this.selected.colorselect] = hex;  

                if(window.mp)
                { 
                    return window.e_rpc('server::showroom:::color:change', JSON.stringify(this.selected));  
                }
            },

            scroll_left() {
                let content = document.querySelector(".wrapper-box");
                content.scrollLeft -= 2000;
            },
            scroll_right() {
                let content = document.querySelector(".wrapper-box");
                content.scrollLeft += 2000;
            },

            swapColor()
            {
                this.selected.colorselect = (this.selected.colorselect ? 0 : 1);

                console.log('Color category changed to: ' + this.selected.colorselect ? 'Primary' : 'Secondary')
            },

            formatThousands(x)
            {
                return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); 
            },
        } 
    }
</script>