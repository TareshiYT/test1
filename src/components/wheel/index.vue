<style> 
    .polygon {
        clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        position: absolute;  
    }

    .menu{
        display: block;
        position:absolute; 
        top:30%;
        left:35%;
        color:white;
        
        animation: fadeIn 2s;
    }

    /*.hex-0 {  
        margin-top: 108px;
        margin-left: 172px;
    }
  
    .hex-1 {
        margin-top: 5px;
        margin-left: 107px;
    }
    .hex-2 {
        margin-top: 108px;
        margin-left: 41px;
    }
    .hex-3 {
        margin-top: 212px;
        margin-left: 106px;
    }
    .hex-4 {
        margin-top: 5px;
        margin-left: 237px;
    }
    .hex-5 {
        margin-top: 212px;
        margin-left: 238px;
    }
    .hex-6 {
        margin-top: 108px;
        margin-left: 303px;
    }*/
     

    
  
    .hex-0 {
        margin-top: 5px;
        margin-left: 107px;
    }
    .hex-1 {
        margin-top: 108px;
        margin-left: 41px;
    }
    .hex-2 {
        margin-top: 212px;
        margin-left: 106px;
    }
    .hex-3 {
        margin-top: 5px;
        margin-left: 237px;
    }
    .hex-4 {
        margin-top: 212px;
        margin-left: 238px;
    }
    .hex-5 {
        margin-top: 108px;
        margin-left: 303px;
    }

    .hex-6 { /* THIS IS CLOSE BUTONS !! BECARFOUL */
        margin-top: 108px;
        margin-left: 172px;
    }
     
</style>

<template>   
    <div class="absolute w-full h-full flex justify-center items-center text-center font-inter select-none cursor-pointer">  
         
        <div class="menu font-semibold text-[14px] tracking-wide">

            <div class="polygon flex flex-col justify-center items-center w-[8rem] h-[8rem] bg-[#000000bb] text-white hover:bg-[#F9A602D0]" v-for="(item, index) in wheelOptions" v-bind:key="item" :class="{ [`hex-${index}`]: index >= 0, '!invisible': !item.name.length }">
            
                <h3 class="text-center"> 
                    <i class="text-[2rem]" :class="{ [item.icon]: item.icon.length }" :style="{'!text-[5rem]': item.name == 'Close'}"></i> 
                </h3>

                <span class="block text-center font-medium text-[13px] tracking-wide" v-if="item.name != 'Close'">
                    {{ item.name}}
                </span>

            </div> 
        </div> 
    </div>    
</template>
  
<script>  
    export default {
        name: 'WheelComponent',

        data: function() {
            return { 

                selectedOption: null,

                wheelOptions: [
                     
  
                    {
                        name: 'Expressions',
                        icon: 'fa-solid fa-masks-theater',

                        subtitle: [
                            {
                                name: 'General',
                                icon: 'fa-regular fa-face-smile',
                            }
                        ]
                    },

                    {
                        name: 'Select Entity',
                        icon: 'fa-solid fa-hand-pointer',
 
                        subtitle: [
                            {
                                name: 'General',
                                icon: 'fa-solid fa-xmark',
                            }
                        ]
                    },

                    {
                        name: 'Emotes',
                        icon: 'fa-solid fa-person-praying',

                        subtitle: [
                            {
                                name: 'General',
                                icon: 'fa-solid fa-xmark',
                            }
                        ]
                    },

                    {
                        name: 'Walking Styles',
                        icon: 'fa-solid fa-person-walking',

                        subtitle: [
                            {
                                name: 'General',
                                icon: 'fa-solid fa-xmark',
                            }
                        ]
                    },
  
                    {
                        name: 'More',
                        icon: 'fa-solid fa-bars',

                        subtitle: [
                            {
                                name: 'General',
                                icon: 'fa-solid fa-xmark',
                            }
                        ]
                    },
  
                    {
                        name: 'More',
                        icon: 'fa-solid fa-bars',

                        subtitle: [
                            {
                                name: 'General',
                                icon: 'fa-solid fa-xmark',
                            }
                        ]
                    },    

                    {
                        name: 'Close',
                        icon: (this.selectedOption == null ? 'fa-solid fa-xmark' : 'fa-solid fa-rotate-left'), 
                    },
                ]

            };
        },    

        mounted()
        { 
            window.WheelComponent = this;  
        },

        methods: 
        {  
             
           
        }, 
    }
</script>