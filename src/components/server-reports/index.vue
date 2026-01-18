<template>   
    <div class="absolute w-full h-full flex justify-center items-center text-center flex-col z-50 left-0 right-0 font-inter text-white">  
        <div class="background-global-effect"></div> 
 
        <i v-if="this.page == 0" class="fa-solid fa-list text-8xl"></i>
        <i v-else class="fa-solid fa-pen text-8xl"></i>  

        <div class="font-bold text-3xl mt-3 text-white">Report</div> 
        <div class="font-semibold text-normal tracking-wide mt-1 w-1/4 text-white"> 
            {{this.page == 0 ? 'Select the type of report you want to send.' : page == 1 ? 'Write the name of the player suspected of cheater' : 'Describe your problem in the box bellow.'}}
        </div> 

        <div v-if="this.page == 0" class="w-full flex flex-col items-center mt-3 text-white text-lg">  
            <div :class="{'bg-[#a0a0a0cc]': selected == index}" class="w-[18rem] h-[2.8rem] flex flex-col justify-center items-center bg-[#a0a0a066] rounded mt-2 hover:bg-[#a0a0a0cc]" v-for = "(item, index) in this.reasons" v-bind:key="item" v-bind:item="item" @click = "this.selectReason(index)">
                <div class="font-semibold text-[14px]">{{item[0]}}</div> 
                <div class="font-medium tracking-[1px] text-xs">
                    {{item[1]}}
                </div>  
            </div>   
        </div>  

        <input v-if="this.page == 1" spellcheck="false" type="number" class="w-[23rem] h-10 bg-darkPurple text-white rounded-lg text-center font-medium tracking-normal mt-2 focus:border-2 border-violet-500 focus:rounded-full" v-model="input" v-model.number="input" onkeyup="this.value"> 
        <input v-if="this.page == 2" spellcheck="false" type="text" class="w-[23rem] h-10 bg-darkPurple text-white rounded-lg text-center font-medium tracking-normal mt-2 focus:border-2 border-violet-500 focus:rounded-full" maxlength="50" v-model="input" v-model.number="input" onkeyup="this.value"> 

        <div class="font-medium tracking-wider text-base flex flex-row mt-6 text-white">  
            <button @click="this.sendAction()" :class="{'!bg-green-700': this.selected != null}" class="rounded bg-purple-600 w-40 h-10 mx-5"><i class="fa-solid fa-check"></i> {{this.page == 0 ? 'SELECT' : 'SUBMIT'}}</button> 
            <button @click = "this.cancelMenu()" class="rounded bg-purple-600 hover:bg-purple-700 w-40 h-10 mx-5"><i class="fa-solid fa-xmark"></i> CANCEL</button>
        </div> 
    </div>    
</template>
 
<script>
    export default {
        name: 'AdminComponent',

        data: function() {
            return {
                selected: null, 
                page: 0,
                input: '',
                reasons:
                [  
                    ["I'M STUCK", "SUNT BLOCAT"],
                    ["REPORT A CHEATER", "RAPORTEAZA UN CHEATER"],
                    ["OTHER REASON", "ALTA PROBLEMA"]
                ]
            };
        },    

        mounted()
        { 
            window.AdminComponent = this;  
        },

        methods: 
        { 
            open()
            { 
                this.selected = null;
                this.page = 0;
                this.input = ''; 
            },

            cancelMenu()
            { 
                this.active = false;
                this.selected = null;
                this.page = 0;
                this.input = '';
    
                if(window.mp) window.e_trigger("client::report:closeMenu"); 
            },

            selectReason(index)
            {
                return this.selected = index;
            },

            sendAction()
            {
                if(this.selected != null && this.page == 0)
                {
                    //I'M STUCK
                    if(this.selected == 0)
                    {
                        if(window.mp) 
                        {
                            return window.e_trigger("client::report:sendReport", this.page, this.input);
                        } 
                    }

                    //OTHER PROBLEM
                    if(this.selected == 1 || this.selected == 2)
                    {
                        this.page = this.selected;
                    }
                    return;
                }

                if(this.page == 1 || this.page == 2)
                { 
                    if(window.mp) 
                    {
                        return window.e_trigger("client::report:sendReport", this.page, this.input);
                    } 
                }
            }  
        }, 
    }
</script>