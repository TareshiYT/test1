<template>  
    <div class="w-full h-full absolute flex flex-col justify-around overflow-hidden animate-openPage select-none">
        <div class="background-global-effect"></div> 

        <div class="w-full h-full flex-col items-center justify-center font-inter">
            <div class="flex flex-row justify-between w-full h-[20%]">  
                <div class="flex flex-col text-white h-full ml-5">  
                    <div class="text-[#6b6bfa] tracking-wide text-[2rem] font-extrabold">LOS SANTOS</div>
                    <div class="text-white tracking-wide text-[1.5rem] font-semibold mt-[-15px]">GAS STATION</div>   
                </div>
  
                <div class="flex flex-col text-white items-center h-full mr-[27px]"> 
                    <div class="flex flex-row justify-center items-center w-full h-[3rem]">   
                        <div class="flex justify-center items-center bg-white text-black w-[50px] h-[25px] rounded font-semibold text-sm text-left mr-2">ESC</div> |  
                        <span class="ml-2 text-sm font-normal tracking-wide opacity-80"> close menu</span>
                    </div>

                    <div class="bg-gradient-to-l from-purple-400  w-full rounded h-[2px]"></div>

                    <div class="flex flex-row justify-end items-center w-full h-[3rem]">  
                        <img class=" text-left" src="https://i.imgur.com/Yi7bEsF.png" width="30" height="30">    
                        <span class="ml-2 text-sm font-normal tracking-wide text-right opacity-80"> select option</span>
                    </div>
                </div>
            </div> 

            <div class="flex justify-start items-center w-full h-full">  
                <div class="flex flex-col justify-start items-center w-full h-full mt-[30rem]"> 
                    <div class="flex flex-row justify-between items-center w-[30rem]">
                        <div class="w-[15rem] h-[6rem]">
                            <div class="text-purple-600 text-[2rem] font-semibold">{{(this.price).toFixed()}}$</div>
                            <div class="text-white text-[1.5rem] font-semibold opacity-50">PRICE PER LITER</div>
                        </div>

                        <div class="w-[10rem] h-[6rem]">
                            <div class="text-purple-600 text-[2rem] font-semibold">{{this.maxfuel}}</div>
                            <div class="text-white text-[1.5rem] font-semibold opacity-50">MAX LITER</div>
                        </div>
                    </div>
    
                    <div class="flex flex-row items-center w-[30rem] h-auto mt-[10px] text-white">
                        <input class="outline-none border-none bg-[#ffffff10] border-2 border-[#ffffff20] w-[18rem] h-[5rem] text-center text-white rounded font-bold text-[2rem]" type="number" placeholder="000" v-model="input" maxlength="3" v-model.number="input" onkeyup="this.value = this.value.replace (/[^0-9+]/, '')">
                        <div class="flex flex-col justify-center items-start ml-[30px]">
                            <div class="text-[1.5rem] font-semibold opacity-30 tracking-wide">PAYMENT</div>
                            <div class="text-purple-600 text-[2rem] font-semibold tracking-wide">{{formatThousands(((this.price * this.multi) * this.input).toFixed())}}$</div>
                        </div>
                    </div>
    
                    <div class="flex flex-col justify-center w-[30rem] h-auto mt-[30px] text-white"> 
                        <div class="flex flex-row justify-between items-center w-[33rem]">
                            <div class="flex flex-row items-center w-[16rem] h-[4rem] bg-[#ffffff10] rounded border-2 border-[#a0a0a01e] transition-all hover:bg-[#a0a0a046]" :class = "{'!bg-purple-600 border-purple-700': this.payments[0]}" @click="this.changePayment(0)"> 
                                <div class="ml-[30px]">
                                    <img src="https://i.imgur.com/oYhENgs.png" width="30" height="30">
                                </div>  

                                <button class="flex flex-col justify-center items-start text-left ml-[10px]">
                                    <div class="text-[15px] tracking-wide font-semibold h-[17px]">Payment</div>  
                                    <div class="text-[15px] opacity-50 uppercase tracking-wide h-auto">Card</div>  
                                </button> 
                            </div> 
    
                            <div class="flex flex-row items-center w-[16rem] h-[4rem] bg-[#ffffff10] rounded border-2 border-[#a0a0a01e] transition-all hover:bg-[#a0a0a046]" :class = "{'!bg-purple-600 border-purple-700': this.payments[1]}" @click="this.changePayment(1)"> 
                                <div class="ml-[30px]">
                                    <img src="https://i.imgur.com/IOclzvM.png" width="30" height="30">
                                </div>

                                <button class="flex flex-col justify-center items-start text-left ml-[10px]">
                                    <div class="text-[15px] tracking-wide font-semibold h-[17px]">Payment</div>
                                    <div class="text-[15px] opacity-50 uppercase tracking-wide h-auto">Cash</div>
                                </button> 
 
                            </div> 
                        </div>  

                        <button class="flex justify-center items-center mt-[10px] bg-purple-700 text-white w-[33rem] h-[4rem] text-[22px] font-bold tracking-wide rounded uppercase transition-all hover:bg-green-600 " @click="this.checkout()">PAY AND FILL</button>
 
                    </div> 
                </div> 
            </div> 
        </div> 
    </div>  
</template>
  
<script>  
    export default {
        name: 'GasComponent',

        data: function() 
        {
            return { 
                price: 4,
                input: "",  
                fuel: 100, 
                maxfuel: 120,
                multi: 1, 
                payments:
                {
                    [0]: false,
                    [1]: true
                }
            };
        },    

        mounted()
        { 
            window.GasComponent = this;  
        },

        methods: 
        { 
            open()
            {
                this.input = '';  
                this.fuel = 100;
                this.maxfuel = 120;
                this.multi = 1; 
            },

            changePayment(index)
            { 
                this.payments[0] = this.payments[1] = 0; 
                this.payments[index] = true;
            },
    
            checkout() 
            {   
                if(window.mp) {   
                    return window.e_rpc('server::petrol:checkout', JSON.stringify({ price: (this.price * this.multi) * this.input, amount: this.input, payment: this.payments[0] ? 'card' : 'cash' }));
                } 
            },

            formatThousands(x)
            {
                return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); 
            } 
        } 
    }
</script>