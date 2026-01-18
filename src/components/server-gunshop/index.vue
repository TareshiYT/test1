<template>  
    <div class="w-full h-full absolute box-border flex flex-col justify-around overflow-hidden select-none font-inter cursor-pointer">
        <div class="background-global-effect"></div> 

        <div class="w-full h-full flex-col items-center justify-center">
            <div class="flex flex-row justify-between w-full h-[20%]">  
                <div class="flex flex-col text-white h-full ml-5">  
                    <div class="text-[#6b6bfa] tracking-wide text-[2rem] font-extrabold">LOS SANTOS</div>
                    <div class="text-white tracking-wide text-[1.5rem] font-semibold mt-[-15px]">GUN SHOP</div>   
                </div>
  
                <div class="flex flex-col text-white items-center h-full mr-[27px]"> 
                    <div class="flex flex-row justify-center items-center w-full h-[3rem]">   
                        <div class="flex justify-center items-center bg-white text-black w-[50px] h-[25px] rounded font-semibold text-sm text-left mr-2">ESC</div> |  
                        <span class="ml-2 text-sm font-normal tracking-wide opacity-80"> close menu</span>
                    </div>

                    <div class="bg-gradient-to-l from-purple-400  w-full rounded h-[2px]"></div>

                    <div class="flex flex-row justify-end items-center w-full h-[3rem]">  
                        <img class=" text-left" src="https://i.imgur.com/Yi7bEsF.png" width="30" height="30">    
                        <span class="ml-2 text-sm font-normal tracking-wide text-right opacity-80"> purchase weapon</span>
                    </div>
                </div>
            </div> 

            <div class="flex justify-center w-full h-full mt-[7rem]">   
                <div class="w-[61rem] h-[30rem] flex flex-row flex-wrap bg-[rgba(59,52,98,0.4)] rounded">

                    <div v-for="(item) in this.weapons" :key="item" class="flex flex-col justify-center items-center w-[14rem] h-[13rem] rounded bg-[rgba(59,52,98,0.52)] mt-4 ml-4 opacity-50 ease-in duration-200 hover:opacity-100 hover:border-b-[3px] border-green-500 hover:rounded-b-none">
                        <div class="price text-white font-semibold text-[15px] opacity-50 tracking-wide uppercase">{{item.name}}</div>
                        <div class="price text-green-600 font-semibold text-[14px] tracking-wide">${{this.formatThousands(item.price)}}</div> 

                        <div class="w-full h-[50%] flex justify-center items-center">
                            <img :src="'https://www.pro-gaming.ro/weapons/' + item.image" width="140" height="140">
                        </div>
 
                       <div @click="this.purchaseItem(item)" class="flex justify-center items-center w-[7rem] h-[1.8rem] bg-green-700 text-white tracking-wide rounded font-semibold text-[14px]">Purchase</div> 
                    </div> 
                </div> 
            </div> 
        </div> 
    </div>  
</template>
  
<script>  
    export default {
        name: 'GunComponent',

        data: function() 
        {
            return { 

                weapons: [
                    {
                        name: 'Pistol',
                        hash: 'weapon_pistol',
                        image: 'Pistol.webp',
                        price: 1000
                    },

                    {
                        name: 'Micro SMG',
                        hash: 'weapon_microsmg',
                        image: 'Micro-smg.webp',
                        price: 2500 
                    },

                    {
                        name: 'Knife',
                        hash: 'weapon_knife',
                        image: 'Knife.png',
                        price: 70 
                    },

                    {
                        name: 'Switch Blade',
                        hash: 'weapon_switchblade',
                        image: 'Switch-blade.webp',
                        price: 35 
                    },

                    {
                        name: 'Knuckles',
                        hash: 'weapon_knuckle',
                        image: 'Knuckles.png',
                        price: 30 
                    }
                ]
             
            };
        },    

        mounted()
        { 
            window.GunComponent = this;  
        },

        methods: 
        { 
            purchaseItem(item)
            {
                if(window.mp) {
                    return window.e_rpc("server::gunshop:purhcase", JSON.stringify(item)); 
                }
            },
         
            formatThousands(x)
            {
                return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); 
            } 
        } 
    }
</script>