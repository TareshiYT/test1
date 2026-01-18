<style>
    @import './style.css'; 
</style>

<template>   
    <div class="absolute w-full h-full flex justify-center items-center text-center font-inter select-none">  
        <div class="indigenous-wheel"> 
            <div class="center">
                <span>
                    <i class="fa-solid fa-xmark"></i>
                </span>
            </div> 
 
            <div class="tile" v-for="(item, index) in wheelOptions" v-bind:key="item" :class="{ [`tile-${index + 1}`]: index >= 0 }">

                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 202.8 129.6" enable-background="new 0 0 202.8 129.6" xml:space="preserve">
                    <path d="M131.9,128.9l70.8-100.3C171.8,9.1,136.4-0.7,99.7,0C80.4,0.5,61.4,3.8,43.1,10C27.8,15.3,13.4,22.4,0,31.3l73.5,98.3 C91.4,120.3,113.2,119.6,131.9,128.9z"/>
                </svg>

                <div class="content"> 
                    <h3 class="text-[45px] text-center"> 
                        <i class="text-[12rem]" :class="{ [item.icon]: item.icon.length }"></i> 
                    </h3>

                    <span class="block text-center font-medium text-[45px] tracking-wide">
                        {{ item.name}}
                    </span>
                </div>
            </div> 
        </div>
    </div>    
</template>
  
<script>  
    export default {
        name: 'WheelComponent',

        data: function() {
            return { 
                wheelOptions: [
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
                        icon: 'fa-solid fa-ellipsis',

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