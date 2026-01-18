<template> 
    <!-- eslint-disable vue/no-use-v-if-with-v-for,vue/no-confusing-v-for-v-if --> 
    <div class="absolute border-box w-full h-full text-white flex flex-col justify-center items-center cursor-pointer">
        <div class="background-global-effect"></div>
 
        <div class="flex flex-col justify-center items-center tracking-wide">
            <div class="text-[29px] font-semibold"><i class="fa-solid fa-truck"></i> Trucker Job</div>
            <div class="text-[17px] opacity-70 font-semibold">Select your cargo.</div>
        </div> 

        <div class="flex flex-col justify-center items-center w-full ">
 
            <div class="flex flex-col items-center w-[50rem] h-[39rem] overflow-x-auto mt-10"> 
                <div class="item" v-for = "(item, index) in this.courses" v-bind:key="item" @click="this.selectCourse(index)"> 
                    <div class="flex flex-row bg-[rgba(59,52,98,0.77)] hover:bg-[rgba(59,52,98,0.98)] w-[45rem] h-[5rem] mt-2 rounded" :class="{'!bg-[rgba(59,52,98,0.98)]': this.selected == item}">
                        <div class="flex justify-center items-center w-[8rem] h-full">
                            <img src="https://i.imgur.com/9Wgu4fL.png" width="150" height="100" style="zoom: 70%; opacity: 0.7;"> 
                        </div>
  
                        <div class="flex flex-col justify-center w-[29rem] h-full"> 
                            <div class="font-semibold text-[15px] tracking-wide">
                                <i class="fa-solid fa-location-dot"></i> 
                                {{ item.name }} 
                            </div>

                            <div class="font-medium text-[14px] tracking-wide opacity-50 mt-[5px]">
                                <i class="fa-solid fa-truck-ramp-box"></i>  
                                {{ Math.round(this.calculateDistance({x: item.x, y: item.y, z: item.z}, {x: this.position.x, y: this.position.y, z: this.position.z}).toFixed(0) / 100) / 10 }} km 
                            </div>  
                        </div> 

                        <div class="flex flex-col justify-center text-right w-[6.8rem] h-full"> 
                            <div class="font-bold text-[15px] text-green-600 tracking-wide">${{ this.formatThousands(item.price * Math.round(this.calculateDistance({x: item.x, y: item.y, z: item.z}, {x: this.position.x, y: this.position.y, z: this.position.z}).toFixed(0) / 100) / 10) }}</div> 
                            <div class="font-semibold text-[14px] tracking-wide opacity-50 mt-[5px]">${{ item.price }}/KM</div>
                        </div>  
                    </div> 
                </div> 
            </div>  

            <div class="flex justify-center items-center w-[45rem] h-[2rem] rounded text-[14px] font-semibold tracking-wide mt-2 bg-green-600 hover:bg-green-500" v-if="this.selected != null" @click="this.acceptCargo()">
                <i class="fa-solid fa-truck mr-1"></i> 
                
                TAKE JOB FOR ${{ this.formatThousands(this.courses[this.selected].price * Math.round(this.calculateDistance({x: this.courses[this.selected].x, y: this.courses[this.selected].y, z: this.courses[this.selected].z}, {x: this.position.x, y: this.position.y, z: this.position.z}).toFixed(0) / 100) / 10) }}
            </div>
        </div>
    </div> 
</template>
  
<script>  
    export default {
        name: 'TruckerComponent',

        data: function() 
        {
            return {
 
                position: { x: 721.943, y: -2016.325, z: 29.431 },  
                selected: null, 
                courses:
                [ 
                    {id: 0, x: 2477.498, y: 5653.393, z: 44.947, name: 'Union Red, Chianski Passage', price: 25},
                    {id: 1, x: 2743.742, y: 4689.531, z: 44.315, name: 'Grapeseed Ave, Senora Fwy', price: 15},
                    {id: 2, x: 2013.637, y: 5177.961, z: 48.535, name: 'Road Ln, Union Rd', price: 16},
                    {id: 3, x: 1552.671, y: 4571.179, z: 50.129, name: 'Calafia Rd, North Calafia Way', price: 65},
                    {id: 4, x: 365.1262, y: 4436.654, z: 62.794, name: 'Zancudo Grande Valley, North Calafia Way', price: 65},
                    {id: 5, x: 47.39345, y: 3610.040, z: 39.718, name: 'Route 68 Approach, Calafia Rd', price: 15},
                    {id: 6, x: 696.6671, y: 2275.242, z: 50.655, name: 'Baytree Canyon Rd, Senora Rd', price: 15} 
                ]  
            };
        },    

        mounted() { window.TruckerComponent = this; },

        methods: 
        { 
            open(position)
            {   
                this.selected = null;
                  
                this.position = position;
            }, 
  
            exit()
            {  
                if(window.mp) {
                    return window.e_trigger('client::job:trucker:closeMenu', true);
                } 
            },

            selectCourse(index)
            {    
                if(this.selected == index) {
                    return this.selected = null;
                }

                return this.selected = index; 
            },

            acceptCargo()
            {  
                if(window.mp) {  
                    window.e_rpc('server::job:trucker:selectCourse', JSON.stringify({ data: this.courses[this.selected], received: this.formatThousands(this.courses[this.selected].price * Math.round(this.calculateDistance({x: this.courses[this.selected].x, y: this.courses[this.selected].y, z: this.courses[this.selected].z}, {x: this.position.x, y: this.position.y, z: this.position.z}).toFixed(0) / 100) / 10) }));
                }  
            },
                 
            formatThousands(x)
            {
                return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); 
            },

            calculateDistance(p1, p2) 
            {
                var a = p2.x - p1.x;
                var b = p2.y - p1.y;
                var c = p2.z - p1.z;

                return Math.sqrt(a * a + b * b + c * c);
            }
        }  
    }
</script>