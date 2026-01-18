<template>   
    <div class="w-full h-full flex justify-center items-center mt-[10%] font-inter box-border"> 
        <div class="background-global-effect"></div>

        <div class="z-1 h-full flex flex-col mt-[30%] w-[42rem] text-white" style="zoom: 90%;">    
            <div class="flex text-left items-start justify-start font-medium tracking-wide text-xl">{{this.npc}}</div>
            <div class="flex text-left items-start justify-start font-medium tracking-wide text-sm opacity-50">{{this.job}}</div>   

            <div class="flex flex-col justify-center bg-[rgba(59,52,98,0.77)] w-full h-[5rem] rounded font-medium tracking-wider text-[13px] mt-2" :class="{'!h-[3rem]': this.selling}">    
                <span class="ml-2" v-if="this.selling">
                    Salut, eu te pot ajuta sa-ti vinzi pestele, sunt dispus sa platesc <b class="text-green-600">${{this.formatMoney(this.price)}}</b> pentru acesta.
                </span> 

                <span class="ml-2" v-else v-for="(item) in this.description[id]" v-bind:key="item" v-bind:item="item">{{ item }}</span>   
            </div>   

            <div class="flex flex-row flex-wrap justify-center items-center w-full h-[6rem] font-medium tracking-wide text-sm mt-4">   
                <button @click ="this.getJob();" class="rounded bg-[rgba(59,52,98,0.77)] hover:bg-[rgba(59,52,98,0.98)] w-[20.7rem] h-[2.4rem]">
                    <i class="fa-solid fa-file-signature"></i> {{!this.selling ? 'Get job' : 'Sell Fish'}}
                </button> 
            
                <button @click="this.quitJob();" v-show="!this.selling" class="rounded bg-[rgba(59,52,98,0.77)] hover:bg-[rgba(59,52,98,0.98)] w-[20.7rem] h-[2.4rem] ml-2">
                    <i class="fa-solid fa-user-slash"></i> Quit job
                </button> 

                <button @click="this.stopWorking();" v-show="!this.selling && this.working" class="rounded bg-[rgba(59,52,98,0.77)] hover:bg-[rgba(59,52,98,0.98)] w-[20.7rem] h-[2.4rem]"> 
                    <i class="fa-solid fa-handshake"></i> Stop work 
                </button> 

                <button @click="this.startWorking();" v-show="!this.selling && !this.working" class="rounded bg-[rgba(59,52,98,0.77)] hover:bg-[rgba(59,52,98,0.98)] w-[20.7rem] h-[2.4rem]"> 
                    <i class="fa-solid fa-person-digging"></i> Start work  
                </button>

                <button @click="this.closeMenu()" class="rounded bg-[rgba(59,52,98,0.77)] hover:bg-[rgba(59,52,98,0.98)] w-[20.7rem] h-[2.4rem] ml-2">
                    <i class="fa-solid fa-xmark"></i> Close menu
                </button> 
            </div>   
        </div> 
    </div>  
</template> 
 
<script>  
    export default {
        name: 'JobMenuComponent',
       
        mounted()
        { 
            window.JobMenuComponent = this;  
        },

        data: function() 
        {
            return { 

                id: 0,
                job: 'Farmer',
                npc: 'Petrica',
                working: true,
 
                selling: false, 
                price: 0,

                description: 
                [ 
                    [
                        'Noi ne ocupam cu livrarea coletelor.',
                        'Ti-am dat o dubita si cateva colete pe care le vei livra la casele marcate cu albastru.', //COURIER
                        'Pentru a lua un colet din masina / livra coletul foloseste tasta [E].' 
                    ],

                    [  
                        'Noi ne ocupam cu prinderea pestilor din mare.',
                        'Pentru a prinde peste ai nevoie de o undita, momeala si bineinteles noroc.', //FISHERMAN
                        'Foloseste undita si momeala pentru a prinde pesti.' 
                    ],

                    [
                        'Noi ne ocupam de electricitatea orasului',
                        'Din pacate avem putine panouri de curent care nu functioneaza.', //MINER
                        'Mergi acolo si lipeste firele corect si cu atentie.' 
                    ], 
                    
                    [
                        'Noi ne ocupam cu transportarea marfurilor.',
                        'Suntem responsabili cu transportul de mare tonaj, noi transportam diferite obiecte dintr-un depozit in altu.', //TRUCKER
                        'Foloseste camionul si mergi la punctul marcat pe harta pentru a lua o cursa.' 
                    ] 
                ]
            };
        },    
 
        methods: 
        { 
            formatMoney(x) 
            {
                return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); 
            },

            closeMenu() 
            {
                if(window.mp) 
                {
                    return window.e_trigger("client::job:closeMenu"); 
                }
            },

            open(data)
            {
                const raw = JSON.parse(data);

                this.id = raw.id;
                this.job = raw.job;
                this.npc = raw.npc;
                this.working = raw.working; 

                this.selling = raw.selling; 
                this.price = raw.price;
            },

            getJob() 
            { 
                if(window.mp) 
                {
                    window.e_rpc((this.selling ? 'server::job:sellFish' : 'server::job:jobGet')); 
                } 
            },

            quitJob() 
            {  
                if(window.e_rpc)
                {  
                    window.e_rpc('server::job:jobQuit');
                } 
            },
            
            startWorking() 
            {  
                if(window.e_rpc)
                {  
                    window.e_rpc('server::job:jobStart');
                } 
            },

            stopWorking() 
            {  
                if(window.e_rpc)
                {  
                    window.e_rpc('server::job:jobStop');
                } 
            } 
        }
    }
</script>