<template>   
    <div class="absolute flex justify-center items-center w-full h-full cursor-pointer bg-[url('https://i.imgur.com/f88oWuE.jpg')] bg-center bg-cover bg-no-repeat font-inter">
        <div class="authorization-effect"></div>

        <div class="flex justify-center flex-col h-full z-20 text-white" v-if="this.page == 0">
            <div class="flex justify-center flex-col items-center"> 
                <div class="text-[1.8rem] font-semibold">{{this.haveAccount ? 'Authorization' : 'Registration'}}</div>
                <div class="text-[0.9rem] font-medium">Welcome to the server <span class="text-[#4b4a81] font-bold">RAGEMP GAMING</span></div> 
            </div>

            <div class="w-full mt-[15px]">  
                <div class="relative mt-[5px] block">
                    <input class="rounded pl-[40px] w-[18rem] h-[48px] font-semibold text-[14px] tracking-wide transition-opacity leading-[22px] cursor-pointer text-[#c4c3ca] bg-[#202034] border-2 border-[#4b4a81]" spellcheck="false" type="name" name="logname" placeholder="Enter your name" id="logname" v-model="this.input.name" v-model.number="this.data.name" onkeyup="this.value" v-on:keyup.enter="this.loginAccount()">
                    <i class="fas fa-fingerprint absolute left-[10px] h-[57px] text-[24px] mt-[12px] text-left opacity-50"></i> 
                </div>
                
                <div class="relative mt-[5px] block" v-if="!this.haveAccount">
                    <input class="rounded pl-[40px] w-[18rem] h-[48px] font-semibold text-[14px] tracking-wide transition-opacity leading-[22px] cursor-pointer text-[#c4c3ca] bg-[#202034] border-2 border-[#4b4a81]" spellcheck="false" type="email" name="logemail" placeholder="Enter your email" id="logemail" v-model="this.input.email" v-model.number="this.input.email" onkeyup="this.value" v-on:keyup.enter="this.loginAccount()">
                    <i class="fa-solid fa-envelope absolute left-[10px] h-[57px] text-[24px] mt-[12px] text-left opacity-50"></i>
                </div> 

                <div class="relative mt-[5px] block">
                    <input class="rounded pl-[40px] w-[18rem] h-[48px] font-semibold text-[14px] tracking-wide transition-opacity leading-[22px] cursor-pointer text-[#c4c3ca] bg-[#202034] border-2 border-[#4b4a81]" spellcheck="false" type="password" name="logpass" placeholder="Enter your password" id="logpass" v-model="this.input.password" v-model.number="this.input.password" onkeyup="this.value" v-on:keyup.enter="this.loginAccount()">
                    <i class="fas fa-key absolute left-[10px] h-[57px] text-[24px] mt-[12px] text-left opacity-50"></i>
                </div>    
            </div> 

            <div class="flex justify-center items-center w-full h-[3rem] text-[15px] tracking-wide font-semibold mt-[20px] rounded bg-[#5c508d]" @click="this.loginAccount()"> 
                <i class="fa-solid fa-arrow-right-to-bracket" style="margin-right: 10px;"></i> 
                
                {{this.haveAccount ? "LOG IN" : "REGISTER"}} 
            </div>
            
            <div class="flex justify-start items-start w-[10rem] text-[13px] font-medium mt-[7px]" @click="this.changeAccount()">{{this.haveAccount ? "You don't have account?" : "You have account?"}}</div>
        </div>  
    
        <div class="absolute flex w-full h-full justify-center flex-col z-20 text-white cursor-pointer" v-if="this.page == 1"> 
            <div class="flex flex-row justify-center items-center w-full h-full text-[14px] font-semibold">  

                <div @click="this.spawnAccount(0)" style="transform:perspective(800px) rotateY(12deg);" class="w-[18rem] h-[32rem] rounded object-cover origin-center bg-[url('https://i.imgur.com/b1JxDCI.jpg')] bg-center bg-cover opacity-30 bg-no-repeat hover:opacity-80 hover:mb-[2rem] hover:rotate-y-0"> 
                    <div class="flex flex-col justify-evenly items-center w-full h-full z-50">
                        <i class="fa-solid fa-plane text-[2.8rem] [text-shadow:0px_0px_10px_#000]"></i> 
                        <div class="font-semibold text-[24px] [text-shadow:0px_0px_10px_#000]">Airport LS</div> 

                        <i class="fa-solid fa-lock text-[2.8rem] [text-shadow:0px_0px_20px_#000]" style="visibility: hidden;"></i> 
                    </div> 
                </div>

                <div @click="this.spawnAccount(1)" style="transform:perspective(800px) rotateY(-20deg);" class="w-[18rem] h-[32rem] rounded object-cover origin-center bg-[url('https://i.imgur.com/cUMQGlP.jpg')] bg-center bg-cover opacity-30 bg-no-repeat hover:opacity-80 hover:mb-[2rem]"> 
                    <div class="flex flex-col justify-evenly items-center w-full h-full z-50">
                        <i class="fa-solid fa-home text-[2.8rem] [text-shadow:0px_0px_10px_#000]"></i> 
                        <div class="font-semibold text-[24px] [text-shadow:0px_0px_10px_#000]">Home</div> 

                        <i class="fa-solid fa-lock text-[2.8rem] [text-shadow:0px_0px_20px_#000]" :style="{visibility: this.data.house != -1 ? 'hidden' : 'visible'}"></i> 
                    </div> 
                </div>

                <div @click="this.spawnAccount(2)" style="transform:perspective(800px) rotateY(-14deg);" class="w-[18rem] h-[32rem] rounded object-cover origin-center bg-[url('https://i.imgur.com/k3xsnO7.jpg')] bg-center bg-cover opacity-30 bg-no-repeat hover:opacity-80 hover:mb-[2rem]"> 
                    <div class="flex flex-col justify-evenly items-center w-full h-full z-50">
                        <i class="fa-solid fa-building text-[2.8rem] [text-shadow:0px_0px_10px_#000]"></i> 
                        <div class="font-semibold text-[24px] [text-shadow:0px_0px_10px_#000]">Faction</div> 

                        <i class="fa-solid fa-lock text-[2.8rem] [text-shadow:0px_0px_20px_#000]" :style="{visibility: this.data.faction != 0 ? 'hidden' : 'visible'}"></i> 
                    </div> 
                </div>
            </div> 
        </div>  

        <div class="absolute flex justify-start flex-col items-start w-full h-full z-20 text-white cursor-pointer" v-if="this.page == 2"> 
    
            <div class="flex flex-col justify-center items-start ml-[2rem] mt-[8rem]">

                <div class="font-bold text-[1.3rem] tracking-wider h-[25px]">RAGEMP RPG</div>
                <div class="font-medium text-[13px] tracking-wide opacity-70 h-auto">Join or server and dive into the timeless magic of Los Santos.</div>
                <div class="font-medium text-[14px] text-red-500 tracking-wide opacity-70 h-auto"><i class="fa-solid fa-triangle-exclamation"></i> Server is temporarily in Whitelist.</div>
            </div> 
        </div>  
    </div>  
</template>
  
<script>  
    export default {
        name: 'AuthComponent',

        mounted() 
        { 
            window.AuthComponent = this; 
 
            if(window.mp) {
                window.e_rpc.add('reloadAuthData', (data) =>
                {
                    const raw = JSON.parse(data)

                    this.data = raw.data; 
                    this.page = raw.page;
                }); 
            }
        },
        data: function() 
        {
            return { 
 
                haveAccount: true,
                page: 0, 
 
                input: {
                    password: '',
                    name: '',
                    email: ''
                },

                data: {
                    name: '',
                    socialclub: null,

                    house: -1,
                    faction: 0
                }
            };
        },    
 
        methods: 
        {    
            showAuthData(data, status) { 
                this.data = data;
 
                if(!status) {
                    this.page = 2;
                }

                this.input.name = this.data.name;
            },

            changePage(option) {
                return this.page = option;
            },

            changeAccount() {
                return this.haveAccount = !this.haveAccount;
            },

            loginAccount() {
                if(!this.haveAccount && !this.isValidEmail(this.input.email))
                    return window.e_trigger('client::hud:sendNotify', 'info', 'Your email is not valid.', 'Email:');  
 
                if(this.haveAccount) {
                    if(window.mp) {
                        return window.e_rpc('server:authorization::login', JSON.stringify({haveAccount: this.haveAccount, data: this.input}));
                    }
                }
                else {
                    if(window.mp) {
                        return window.e_rpc('server:authorization::register', JSON.stringify({haveAccount: this.haveAccount, data: this.input}));
                    }
                }
            },

            isValidEmail(email) { 
                return /\S+@\S+\.\S+/.test(email); 
            },
            
            spawnAccount(option) {
                if((option == 1 && this.data.house == -1) || (option == 2 && !this.data.faction))
                    return;

                if(window.mp) {
                    return window.e_rpc('server:authorization::spawn', option);
                }
            }
        } 
    }
</script>