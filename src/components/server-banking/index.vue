<style>@import './assets/style.css';</style>

<template> 
    <body> 
        <div class="box-banking-container">
            <div class="background-banking-effect"></div>

            <div class="banking-modal-container" v-show="modal.status"> 
                <div class="banking-modal-effect"></div> 
                <div class="items"> 
                    <i class="fa-solid fa-triangle-exclamation" style="color: #d68b00; font-size: 55px;"></i>
                    <div class="title">{{modal.title}}</div> 
                    <div class="description">{{modal.description}}</div>   
 
                    <input type="name" class="banking-box-input" placeholder="AMOUNT" v-model="input" v-model.number="input" onkeyup="this.value"> 
                    <input v-show="modal.title === 'TRANSFER'" type="name" class="banking-box-input" placeholder="PLAYER" v-model="inputUser" v-model.number="inputUser" onkeyup="this.value">
 
                    <div class="buttons">  
                        <div class="button" @click="finishTransaction()">{{modal.title}}</div>
                        <div class="button" @click="closeModal()">CLOSE</div>
                    </div>
                </div> 
            </div> 

            <div class="box-banking-left-container"> 
                <div class="clothing-title"> 
                    <div class="title">LOS SANTOS</div>
                    <div class="subtitle">BANKING</div>  
                </div>  

                <div class="clothing-informations"> 
                    <div class="icon">ESC</div>
                    <div class="text">Press ESC for close menu</div>  
                </div>  
            </div>  

            <div class="box-banking-center-container">
                
                <div class="container-header"> 
                    <div class="item"> 
                        <div class="description"> 
                            <div class="title" style="font-weight: 500; font-size: 15px; opacity: 0.7;">FOUNDER</div>
                            <div class="name" style="margin-top: 5px; font-size: 17px; opacity: 0.9;">{{founder.name}}</div>
                        </div>

                        <div class="icon">
                            <i class="fa-solid fa-user" style="font-size: 30px; opacity: 0.9;"></i>
                        </div> 
                    </div>

                    <div class="item"> 
                        <div class="description"> 
                            <div class="title" style="font-weight: 500; font-size: 15px; opacity: 0.7;">CARD</div>
                            <div class="name" style="margin-top: 5px; font-size: 17px; opacity: 0.9; color: #019e57;">${{formatThousands(founder.bank)}}</div>
                        </div>
                         
                        <div class="icon"> 
                            <i class="fa-solid fa-credit-card" style="font-size: 30px; opacity: 0.9;"></i>
                        </div> 
                    </div>

                    <div class="item"> 
                        <div class="description"> 
                            <div class="title" style="font-weight: 500; font-size: 15px; opacity: 0.7;">CASH</div>
                            <div class="name" style="margin-top: 5px; font-size: 17px; opacity: 0.9; color: #019e57;">${{formatThousands(founder.cash)}}</div>
                        </div>
                         
                        <div class="icon">
                            <i class="fa-solid fa-wallet" style="font-size: 30px; opacity: 0.9;"></i>
                        </div>  
                    </div>

                    <div class="item" v-if="this.founder.business != -1"> 
                        <div class="description"> 
                            <div class="title" style="font-weight: 500; font-size: 15px; opacity: 0.7;">BUSINESS</div>
                            <div class="name" style="margin-top: 5px; font-size: 17px; opacity: 0.9; color: #019e57;">${{formatThousands(founder.bsafe)}}</div>
                        </div>
                     
                        <div class="icon">
                            <i class="fa-solid fa-briefcase" style="font-size: 30px; opacity: 0.9;"></i>
                        </div>  
                    </div>

                    <div class="item"> 
                        <div class="description"> 
                            <div class="title" style="font-weight: 500; font-size: 15px; opacity: 0.7;">ACCOUNT NUMBER</div>
                            <div class="name" style="margin-top: 5px; font-size: 17px; opacity: 0.9;">#{{founder.number}}</div>
                        </div>
                     
                        <div class="icon">
                            <i class="fa-solid fa-receipt" style="font-size: 30px; opacity: 0.9;"></i>
                        </div>  
                    </div> 
                </div>  

                <div class="container-footer"> 
                    <div class="item"> 
                        <div class="description"> 
                            <div class="title" style="font-size: 20px;">DEPOSIT</div>
                            <div class="name" style="margin-top: 10px; font-weight: 500; font-size: 15px; opacity: 0.7;">{{titles['deposit']}}</div>
                        </div> 
                        <div class="button" @click="executeModal('deposit')">DEPOSIT</div> 
                    </div>

                    <div class="item"> 
                        <div class="description"> 
                            <div class="title" style="font-size: 20px;">TRANSFER</div>
                            <div class="name" style="margin-top: 10px; font-weight: 500; font-size: 15px; opacity: 0.7;">{{titles['transfer']}}</div>
                        </div> 
                        <div class="button" @click="executeModal('transfer')">TRANSFER</div> 
                    </div>

                    <div class="item"> 
                        <div class="description"> 
                            <div class="title" style="font-size: 20px;">WITHDRAW</div>
                            <div class="name" style="margin-top: 10px; font-weight: 500; font-size: 15px; opacity: 0.7;">{{titles['withdraw']}}</div>
                        </div> 
                        <div class="button" @click="executeModal('withdraw')">WITHDRAW</div> 
                    </div> 

                    <div class="item"> 
                        <div class="description"> 
                            <div class="title" style="font-size: 20px;">BUSINESS SAFEBOX</div>
                            <div class="name" style="margin-top: 10px; font-weight: 500; font-size: 15px; opacity: 0.7;">{{titles['business']}}</div>
                        </div> 
                        <div class="button" @click="executeModal('business')">WTHDRAW</div> 
                    </div> 
                </div>
            </div>
        </div> 
    </body> 
</template>
  
<script>  
    export default {
        name: 'BankingComponent',

        mounted() { window.BankingComponent = this; },
        data: function() 
        {
            return { 
                
                input: '', 
                inputUser: null,
                modal: { status: false, title: '', description: '', option: '' },
                titles:
                { 
                    'deposit': 'Depoziteaza o suma de bani in contul tau bancar.',
                    'transfer': 'Transfera o suma de bani din contul tau unei persoane de pe server.',
                    'withdraw': 'Retrage o suma de bani din contul tau bancar.',
                    'deposit2': 'Depoziteaza o suma de bani in contul tau bancar.',
                    'business': 'Retrage o suma de bani din seiful businessului tau.'
                },
 
                founder: 
                {
                    name: 'MihaiADV', bank: 1000, cash: 1000, number: 11223, business: -1, bsafe: 0
                } 
            };
        },    
 
        methods: 
        { 
            open(data) 
            {
                this.input = '';
                this.inputUser = null; 
                this.modal = {status: false, title: '', description: '', option: ''};

                this.founder = data;
            },

            executeModal(option)
            {
                this.modal = {status: true, title: option.toUpperCase(), description: this.titles[option], option: option}; 
            },
 
            closeModal()
            {
                this.input = '';
                this.inputUser = null;

                this.modal = {status: false, title: '', description: '', option: ''};
            },

            finishTransaction()
            {
                if(!this.input || (this.modal.option == 'transfer' && !this.inputUser))
                    return;
                     
                if(window.mp) 
                { 
                    window.e_trigger("client:banking::finishTransaction", this.modal.option, this.inputUser, this.input);
                } 

                return this.closeModal();
            },
 
            formatThousands(x) { return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); },
        }, 
    }
</script>