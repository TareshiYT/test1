<template>   
    <div class="absolute w-full h-full flex justify-center items-center text-center flex-col left-0 right-0 font-inter cursor-pointer select-none">  
        <div class="background-global-effect" :style="{'z-index': this.page != 0 ? '-1' : '0'}" v-show="this.page != 0"></div> 
 
        <div class="flex flex-row items-center h-full w-full">
             
            <div class="flex flex-row justify-center items-center h-full w-[23%] text-white"> 
                <div class="flex flex-col items-start w-full h-auto ml-6">
                    
                    <div class="flex flew-row items-center w-full h-auto font-semibold text-[17px] text-yellow-500">
                        <i class="fa-solid fa-vault mr-1"></i> Robbery progress
                    </div>

                    <div class="w-full h-auto text-left font-medium text-[12px] mt-[1px] tracking-wide">You have {{this.fmtMSS(this.time)}} to complete the following steps.</div>
                      
                    <div class="flex flex-col justify-center items-center text-left mt-1"> 
                        <div :class="{'!text-green-500': this.steps[0]}" class="w-full h-auto text-left font-medium text-[13px] mt-[1px] tracking-wide">• Cutt the power off <i v-show="this.steps[0]" class="fa-solid fa-circle-check"></i></div>
                        <div :class="{'!text-green-500': this.steps[1]}" class="w-full h-auto text-left font-medium text-[13px] mt-[1px] tracking-wide">• Kill the guard from the door <i v-show="this.steps[1]" class="fa-solid fa-circle-check"></i></div>
                        <div :class="{'!text-green-500': this.steps[2]}" class="w-full h-auto text-left font-medium text-[13px] mt-[1px] tracking-wide">• Plant the bomb on door <i v-show="this.steps[2]" class="fa-solid fa-circle-check"></i></div>
                        <div :class="{'!text-green-500': this.steps[3]}" class="w-full h-auto text-left font-medium text-[13px] mt-[1px] tracking-wide">• Get security code from the guard 
                             
                            <i v-show="this.steps[3]" class="fa-solid fa-circle-check"></i>

                            <span v-if="!this.steps[4] && this.steps[3] && this.securityCode != null" class="text-purple-600 ml-1">(code: {{ this.securityCode }})</span>   
                        </div>
                        <div :class="{'!text-green-500': this.steps[4]}" class="w-full h-auto text-left font-medium text-[13px] mt-[1px] tracking-wide">• Input security code to door <i v-show="this.steps[4]" class="fa-solid fa-circle-check"></i></div>
                        <div :class="{'!text-green-500': this.steps[5]}" class="w-full h-auto text-left font-medium text-[13px] mt-[1px] tracking-wide">• Steal all the money from the table <i v-show="this.steps[5]" class="fa-solid fa-circle-check"></i></div>
                        <div :class="{'!text-green-500': this.steps[6]}" class="w-full h-auto text-left font-medium text-[13px] mt-[1px] tracking-wide">• Go to Mickey and give him the loot  <i v-show="this.steps[6]" class="fa-solid fa-circle-check"></i></div>
                    </div> 
                </div> 
            </div>
              
            <div class="flex flex-col justify-center items-center w-[60%] h-full text-white" v-show="this.page != 0">    
                <div class="flex flex-col justify-center items-center w-full h-[12rem]">  
                    <i class="fa-solid fa-vault text-[5rem]"></i>

                    <div class="font-bold text-[1.7rem] tracking-wide mt-1 h-[35px]">Bank Robbery</div>
                    <div class="font-semibold text-[0.95rem] tracking-wide h-auto"> 
                        {{ this.page == 0 ? 'Cut the power down to continue.' : 'Enter the secure code received from the manager.'}} 
                    </div>
                </div>
    
                <div class="flex flex-row items-center bg-[#3b485e] w-[32rem] h-[22rem] rounded flex-wrap mt-4"  v-show="this.page == 1"> 
                    <div class="flex justify-center items-center bg-[#989ea3] rounded w-[4rem] h-[8rem] mt-[2px] ml-[32px]"> 
                        <div class="flex justify-center items-center w-[5px] h-[80%] bg-[#616568] rounded-full"></div> 

                        <div class="absolute flex justify-end items-end bg-[#f8535a] w-[4.8rem] h-[1.3rem] rounded z-8 translate-y-[45px] ease-in-out duration-300 hover:bg-red-500" @click="this.changeFuse(0);" :class="{'!-translate-y-[45px]': this.panelFuses[0]}"></div>
                    </div>

                    <div class="flex justify-center items-center bg-[#989ea3] rounded w-[4rem] h-[8rem] mt-[2px] ml-[32px]">
                        <div class="flex justify-center items-center w-[5px] h-[80%] bg-[#616568] rounded-full"></div>

                        <div class="absolute flex justify-end items-end bg-blue-600 w-[4.8rem] h-[1.3rem] rounded z-8 translate-y-[45px] ease-in-out duration-300 hover:bg-blue-500" @click="this.changeFuse(1);" :class="{'!-translate-y-[45px]': this.panelFuses[1]}"></div>
                    </div>

                    <div class="flex justify-center items-center bg-[#989ea3] rounded w-[4rem] h-[8rem] mt-[2px] ml-[32px]">
                        <div class="flex justify-center items-center w-[5px] h-[80%] bg-[#616568] rounded-full"></div>

                        <div class="absolute flex justify-end items-end bg-green-600 w-[4.8rem] h-[1.3rem] rounded z-8 translate-y-[45px] ease-in-out duration-300 hover:bg-green-500" @click="this.changeFuse(2);" :class="{'!-translate-y-[45px]': this.panelFuses[2]}"></div>
                    </div>

                    <div class="flex justify-center items-center bg-[#989ea3] rounded w-[4rem] h-[8rem] mt-[2px] ml-[32px]">
                        <div class="flex justify-center items-center w-[5px] h-[80%] bg-[#616568] rounded-full"></div>

                        <div class="absolute flex justify-end items-end bg-purple-600 w-[4.8rem] h-[1.3rem] rounded z-8 translate-y-[45px] ease-in-out duration-300 hover:bg-purple-500" @click="this.changeFuse(3);" :class="{'!-translate-y-[45px]': this.panelFuses[3]}"></div>
                    </div>

                    <div class="flex justify-center items-center bg-[#989ea3] rounded w-[4rem] h-[8rem] mt-[2px] ml-[32px]">
                        <div class="flex justify-center items-center w-[5px] h-[80%] bg-[#616568] rounded-full"></div>

                        <div class="absolute flex justify-end items-end bg-orange-600 w-[4.8rem] h-[1.3rem] rounded z-8 translate-y-[45px] ease-in-out duration-300 hover:bg-orange-500" @click="this.changeFuse(4);" :class="{'!-translate-y-[45px]': this.panelFuses[4]}"></div>
                    </div>

                    <div class="flex justify-center items-center bg-[#989ea3] rounded w-[4rem] h-[8rem] mt-[2px] ml-[32px]"> 
                        <div class="flex justify-center items-center w-[5px] h-[80%] bg-[#616568] rounded-full"></div> 

                        <div class="absolute flex justify-end items-end bg-[#f8535a] w-[4.8rem] h-[1.3rem] rounded z-8 translate-y-[45px] ease-in-out duration-300 hover:bg-red-500" @click="this.changeFuse(5);" :class="{'!-translate-y-[45px]': this.panelFuses[5]}"></div>
                    </div>

                    <div class="flex justify-center items-center bg-[#989ea3] rounded w-[4rem] h-[8rem] mt-[2px] ml-[32px]">
                        <div class="flex justify-center items-center w-[5px] h-[80%] bg-[#616568] rounded-full"></div>

                        <div class="absolute flex justify-end items-end bg-blue-600 w-[4.8rem] h-[1.3rem] rounded z-8 translate-y-[45px] ease-in-out duration-300 hover:bg-blue-500" @click="this.changeFuse(6);" :class="{'!-translate-y-[45px]': this.panelFuses[6]}"></div>
                    </div>

                    <div class="flex justify-center items-center bg-[#989ea3] rounded w-[4rem] h-[8rem] mt-[2px] ml-[32px]">
                        <div class="flex justify-center items-center w-[5px] h-[80%] bg-[#616568] rounded-full"></div>

                        <div class="absolute flex justify-end items-end bg-green-600 w-[4.8rem] h-[1.3rem] rounded z-8 translate-y-[45px] ease-in-out duration-300 hover:bg-green-500" @click="this.changeFuse(7);" :class="{'!-translate-y-[45px]': this.panelFuses[7]}"></div>
                    </div>

                    <div class="flex justify-center items-center bg-[#989ea3] rounded w-[4rem] h-[8rem] mt-[2px] ml-[32px]">
                        <div class="flex justify-center items-center w-[5px] h-[80%] bg-[#616568] rounded-full"></div>

                        <div class="absolute flex justify-end items-end bg-purple-600 w-[4.8rem] h-[1.3rem] rounded z-8 translate-y-[45px] ease-in-out duration-300 hover:bg-purple-500" @click="this.changeFuse(8);" :class="{'!-translate-y-[45px]': this.panelFuses[8]}"></div>
                    </div>

                    <div class="flex justify-center items-center bg-[#989ea3] rounded w-[4rem] h-[8rem] mt-[2px] ml-[32px]">
                        <div class="flex justify-center items-center w-[5px] h-[80%] bg-[#616568] rounded-full"></div>

                        <div class="absolute flex justify-end items-end bg-orange-600 w-[4.8rem] h-[1.3rem] rounded z-8 translate-y-[45px] ease-in-out duration-300 hover:bg-orange-500" @click="this.changeFuse(9);" :class="{'!-translate-y-[45px]': this.panelFuses[9]}"></div>
                    </div> 
                </div>  

                <div class="flex flex-col justify-start items-start bg-[rgba(59,52,98,0.54)] w-[20rem] h-[25rem] rounded flex-wrap mt-4" v-show="this.page == 2"> 
 
                    <div class="flex justify-center items-center w-full h-[4rem] select-none text-center bg-transparent font-bold text-[3rem] tracking-wide mt-2 text-white">{{ this.input }}</div>
                    <div class="w-full h-[2px] bg-[rgba(59,52,98,0.8)] rounded-full"></div>
 
                    <div class="flex justify-center items-center flex-row flex-wrap w-full mt-2"> 
                        <div @click="this.appendCode(0)" class="flex justify-center items-center bg-[rgba(59,52,98,0.8)] rounded w-[3rem] h-[3rem] font-bold text-[22px] mt-2 hover:bg-[rgba(59,52,98,0.27)]">0</div> 
                        <div @click="this.appendCode(1)" class="flex justify-center items-center bg-[rgba(59,52,98,0.8)] rounded w-[3rem] h-[3rem] font-bold text-[22px] ml-3 mt-2 hover:bg-[rgba(59,52,98,0.27)]">1</div>
                        <div @click="this.appendCode(2)" class="flex justify-center items-center bg-[rgba(59,52,98,0.8)] rounded w-[3rem] h-[3rem] font-bold text-[22px] ml-3 mt-2 hover:bg-[rgba(59,52,98,0.27)]">2</div>
                        <div @click="this.appendCode(3)" class="flex justify-center items-center bg-[rgba(59,52,98,0.8)] rounded w-[3rem] h-[3rem] font-bold text-[22px] ml-3 mt-2 hover:bg-[rgba(59,52,98,0.27)]">3</div>
                        <div @click="this.appendCode(4)" class="flex justify-center items-center bg-[rgba(59,52,98,0.8)] rounded w-[3rem] h-[3rem] font-bold text-[22px] ml-3 mt-2 hover:bg-[rgba(59,52,98,0.27)]">4</div> 
                          
                        <div @click="this.appendCode(5)" class="flex justify-center items-center bg-[rgba(59,52,98,0.8)] rounded w-[3rem] h-[3rem] font-bold text-[22px] mt-2 hover:bg-[rgba(59,52,98,0.27)]">5</div> 
                        <div @click="this.appendCode(6)" class="flex justify-center items-center bg-[rgba(59,52,98,0.8)] rounded w-[3rem] h-[3rem] font-bold text-[22px] ml-3 mt-2 hover:bg-[rgba(59,52,98,0.27)]">6</div>
                        <div @click="this.appendCode(7)" class="flex justify-center items-center bg-[rgba(59,52,98,0.8)] rounded w-[3rem] h-[3rem] font-bold text-[22px] ml-3 mt-2 hover:bg-[rgba(59,52,98,0.27)]">7</div>
                        <div @click="this.appendCode(8)" class="flex justify-center items-center bg-[rgba(59,52,98,0.8)] rounded w-[3rem] h-[3rem] font-bold text-[22px] ml-3 mt-2 hover:bg-[rgba(59,52,98,0.27)]">8</div>
                        <div @click="this.appendCode(9)" class="flex justify-center items-center bg-[rgba(59,52,98,0.8)] rounded w-[3rem] h-[3rem] font-bold text-[22px] ml-3 mt-2 hover:bg-[rgba(59,52,98,0.27)]">9</div>
                         
                        <div class="flex flex-row justify-center items-center h-[6rem] w-full mt-4">
                            <i class="fa-solid fa-lock text-[5rem] text-[rgba(59,52,98,0.8)]"></i> 
                        </div>

                        <div class="flex flex-row justify-center items-end h-auto w-full mt-5">
                     
                            <div @click="this.executeCode()" class="flex justify-center items-center bg-green-600 rounded w-[72%] h-[2.5rem] text-[20px] mt-2 hover:bg-green-700">
                                <i class="fa-solid fa-check"></i>
                            </div>

                            <div @click="this.deleteCode()" class="flex justify-center items-center bg-[rgba(59,52,98,0.8)] rounded w-[2.8rem] h-[2.5rem] text-[20px] ml-3 mt-2 hover:bg-[rgba(59,52,98,0.27)]">
                                <i class="fa-solid fa-delete-left"></i>
                            </div>
                        </div> 
                    </div>
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

                securityCode: null,
                input: '',

                time: 120,
                page: 0, 
                panelFuses: [
                    true, true, true, true, true, true, true, true, true, true
                ],

                steps: [
                    false, false, false, false, false
                ]
            };
        },    

        mounted()
        { 
            window.WheelComponent = this;   
        },

        methods: 
        {   
            changeRobPage(page, data)
            { 
                if(page == 0)
                {
                    this.securityCode = null;
                    this.input = '';
 
                    this.panelFuses = [
                        true, true, true, true, true, true, true, true, true, true
                    ];

                    this.steps = [
                        false, false, false, false, false
                    ];
                }

                this.page = page;
                this.steps = data;
 
                if(this.steps[3] && this.securityCode == null) { 
                    this.securityCode = Math.floor(1000 + Math.random() * 9000)
                }
            },

            getFusesStatus()
            { 
                for(let x = 0; x < this.panelFuses.length; x++) {
                    if(this.panelFuses[x]) {
                        return false
                    }
                } 
                return true;
            },

            changeFuse(index)
            {
                this.panelFuses[index] = !this.panelFuses[index];
  
                if(this.getFusesStatus()) {

                    this.steps[0] = true; 
                    this.page = 0;

                    if(window.mp) {
                        return window.e_rpc('server::rob::update', JSON.stringify( { index: 0 } ));
                    }    
                } 
            },
 
            appendCode(number)
            {
                if(this.input.length >= 4)
                    return;

                this.input += number;
            },

            deleteCode()
            {
                this.input = '';  
            },

            executeCode()
            {
                if(window.mp && this.securityCode != this.input) {
                    return window.e_trigger('client::hud:sendNotify', 'info', 'This code is not correct.', 'Rob:');  
                }

                if(this.securityCode == this.input) {
                    if(window.mp) {
                        return window.e_rpc('server::rob::update', JSON.stringify( { index: 4 } ));
                    } 
                }
            },

            fmtMSS: function(s) {
                return(s-(s%=60))/60+(9<s?':':':0')+s
            },  
        } 
    }
</script>