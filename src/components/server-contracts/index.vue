<template> 
    <div class="absolute w-full h-full flex justify-center items-center text-center flex-col z-50 left-0 right-0 font-inter cursor-pointer text-white">  
        <div class="background-global-effect"></div> 

        <i  class="fa-solid fa-crosshairs text-8xl"></i> 
        <div class="font-bold text-3xl mt-3">Contract list</div> 
        <div class="font-semibold text-normal tracking-wide mt-1 w-1/4"> 
            Choose your hit and kill the target as fast as possible.
        </div> 

        <div class="w-full flex flex-col items-center mt-3 max-h-[17.5rem] overflow-y-auto" v-if="contracts.length">  
            <div :class="{'bg-[#a0a0a046]': selected === index}" class="w-[20rem] min-h-[3rem] flex flex-col justify-center items-center bg-[#a0a0a01c] border-2 border-[#a0a0a01e] rounded mt-2 hover:bg-[#a0a0a046]" @click = "selectItem(index)" v-for="(item, index) in contracts" v-show ="!item.status" :key="item.id"> 
                <div class="flex flex-row justify-between items-center w-[93%] h-full">
                    
                    <div class="flex flex-col text-left justify-center items-start h-[95%]">
                        <div class="font-semibold tracking-wide text-sm w-full">
                            Target: <span>{{item.name}}</span>
                        </div>

                        <div class="font-semibold tracking-wide text-[13px] w-full">
                            Price: <span class="text-green-600">${{formatThousands(item.price)}}</span>
                        </div>
                    </div>
                    
                    <div class="flex flex-col text-right justify-center items-end h-full">
                        <div class="font-semibold tracking-wide text-[13px] w-full">
                            <i class="fa-solid fa-crosshairs text-red-500"></i> <span>{{item.type}}</span>
                        </div>

                        <div class="font-semibold tracking-wide text-[13px] w-full">
                            <i class="fa-solid fa-clock opacity-50"></i> {{item.time}}
                        </div>
                    </div> 
                </div>  
            </div>   
        </div>  
      
        <div class="font-semibold tracking-wider text-[15px] flex flex-row mt-6">  
            <button @click="getContract()" :class="{'!bg-green-700': this.selected != null}" class="rounded bg-purple-600 w-40 h-9 mx-5"><i class="fa-solid fa-check"></i> SELECT</button> 
            <button @click="cancelData()" class="rounded bg-purple-600 hover:bg-purple-700 w-40 h-9 mx-5"><i class="fa-solid fa-xmark"></i> CANCEL</button>
        </div> 
    </div>    
</template>
  
<script> 
    export default {
        name: 'ContractsComponent',

        mounted()
        { 
            window.ContractsComponent = this;  
        },
        data: function() 
        {
            return {  
                selected: null,  
                contracts: 
                [
                    { status: false, name: 'Flint', price: 25000, type: 'SILENT', time: '20:00' }, 
                    { status: false, name: 'PericolRPG', price: 100, type: 'BRUTAL', time: '20:00' }, 
                    { status: false, name: 'Laura', price: 100, type: 'BRUTAL', time: '20:00' },
                    { status: false, name: 'Flint', price: 25000, type: 'SILENT', time: '20:00' }, 
                    { status: false, name: 'PericolRPG', price: 100, type: 'BRUTAL', time: '20:00' }, 
                    { status: false, name: 'Laura', price: 100, type: 'BRUTAL', time: '20:00' },
                    { status: false, name: 'Flint', price: 25000, type: 'SILENT', time: '20:00' }, 
                    { status: false, name: 'PericolRPG', price: 100, type: 'BRUTAL', time: '20:00' }, 
                    { status: false, name: 'Laura', price: 100, type: 'BRUTAL', time: '20:00' },
                    { status: false, name: 'Flint', price: 25000, type: 'SILENT', time: '20:00' }, 
                    { status: false, name: 'PericolRPG', price: 100, type: 'BRUTAL', time: '20:00' }, 
                    { status: false, name: 'Laura', price: 100, type: 'BRUTAL', time: '20:00' },
                    { status: false, name: 'Flint', price: 25000, type: 'SILENT', time: '20:00' }, 
                    { status: false, name: 'PericolRPG', price: 100, type: 'BRUTAL', time: '20:00' }, 
                    { status: false, name: 'Laura', price: 100, type: 'BRUTAL', time: '20:00' },
                    { status: false, name: 'Flint', price: 25000, type: 'SILENT', time: '20:00' }, 
                    { status: false, name: 'PericolRPG', price: 100, type: 'BRUTAL', time: '20:00' }, 
                    { status: false, name: 'Laura', price: 100, type: 'BRUTAL', time: '20:00' },
                ] 
                
            };
        },    
 
        methods: 
        {  
            showContracts(data)
            {  
                this.selected = null;
                this.contracts = data; 
            },
  
            selectItem(index)
            {
                if(this.selected == index)
                    return this.selected = null;

                this.selected = index;
            },
  
            cancelData()
            {
                if(this.selected != null) {
                    return this.selected = null;
                }

                return window.e_trigger("client::hitman:closeMenu");
            },
    
            getContract: function()
            {
                if(this.selected != null) {
                    return window.e_trigger("client::hitman:getContract", this.selected);
                } 
            },  

            formatThousands(x)
            {
                return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); 
            },
        }, 
    }
</script>