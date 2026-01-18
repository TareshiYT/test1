<style>
    @import './assets/css/main.css'; 
</style>
  
<template> 
    <!-- eslint-disable vue/no-use-v-if-with-v-for,vue/no-confusing-v-for-v-if -->  
    <div class="flex justify-end items-end w-full h-full absolute box-border select-none"> 
        <div class="absolute text-white w-full h-full font-inter z-1 left-0 right-0" v-show="this.modal == 23">   
            <div class="global-modal-effect"></div> 

            <div class="absolute w-full h-full flex justify-center items-center text-center flex-col z-50 left-0 right-0">  
                
                <i class="fa-solid fa-triangle-exclamation text-purple-500 text-8xl"></i>
                
                <div class="font-bold text-3xl mt-3 text-purple-500">CHANGE NUMBER PLATE</div>

                <div class="font-semibold text-normal tracking-wide mt-1 w-1/4"> 
                    Please enter the name of the new vehicle number plate
                </div> 

                <input v-model="this.searchLocation" v-model.number="this.searchLocation" spellcheck="false" class="w-[30rem] h-10 bg-[#a0a0a01c] text-white rounded-lg text-center font-medium tracking-normal mt-4 border-2 border-[#a0a0a01e] focus:rounded-full" type="name" placeholder="Enter new number" onkeyup="this.value">

                <div class="font-medium tracking-wider text-base flex flex-row mt-6">  
                    <button @click="this.changeNumberPlate();" class="rounded bg-purple-600 w-40 h-10 mx-5 hover:bg-green-600"><i class="fa-solid fa-check"></i> Change</button> 
                    <button @click="this.modal = 8;" class="rounded bg-purple-600 hover:bg-red-700 w-40 h-10 mx-5"><i class="fa-solid fa-xmark"></i> Close</button>
                </div> 
            </div> 
        </div>

        <div class="iphone-container" :style="{'z-index': this.modal == 23 ? '-1' : '111'}"> 
            <div class="iphone-mobile">
                <div class="iphone-background" v-bind:style="{'z-index': this.page == 0 ? '-2' : '-2', 'background-image': 'url(' +  this.wallpapers[settings.wallpaper] + ')' }"></div>
 
                    <div class="iphone-top">
                        <div class="iphone-body-camera" v-show="this.call.status != 'incoming'"> 
                            <i class="fa-solid fa-lock" :style="{'visibility': this.locked ? 'visible' : 'hidden'}" style="color: #fff; margin: 0 10px; font-size: 12px;"></i> 
                            <div class="iphone-camera"></div>
                        </div>

                        <div class="iphone-hour-signal" :style="{visibility: this.call.status == 'incoming' || !this.isOpened || this.page == 6 ? 'hidden' : 'visible'}">
                            <div class="iphone-hour">
 
                                <p class="font-medium" :style="{color: this.page == 0 || this.page == 9 || this.page == 10 || (this.page == 4 && this.modal == 20) ? 'white' : 'black'}">{{time}}</p>
                            </div>
        
                            <div class="iphone-battery-signal" :style="{color: this.page == 0 || this.page == 9 || this.page == 10 || (this.page == 4 && this.modal == 20) ? 'white' : 'black', 'font-weight': this.page != 0 ? 500 : 500}">
                                <div class="operator-signal">
                                    <i class="fa-solid fa-signal"></i>
                                </div>
                                
                                <div class="operator-battery mt-[5px]">
                                    <i class="fa-solid fa-battery-full"></i>
                                </div>
                            </div> 
                        </div>

                        <div class="iphone-body-camera" :class="{expand: this.call.status == 'incoming' && !this.isOpened}"  v-show="this.call.status == 'incoming' && !this.isOpened">  
                         
                            <div class="profile">
    
                                <div class="icon">
                                    <img :src="this.call.photo" width="35" height="35" style="border-radius: 50px;">
                                </div>
    
                                <div class="details">
                                    <div class="name" style="font-weight: 600;">{{this.formatPhoneNumber(this.call.caller == this.user.number ? this.call.receiver : this.call.caller)}}</div>
                                    <div class="number" style="opacity: 0.5; font-size: 12px;">Calling...</div>
                                </div> 
                            </div>
    
                            <div class="buttons"> 
                                <div class="accept" style="background-color: #00cc00;" @click="this.acceptCall()" v-show="this.call.status === 'incoming'"> 
                                    <i class="fa-solid fa-phone"></i>
                                </div>
    
                                <div class="decline" @click="this.declineCall()">
                                    <i class="fa-solid fa-phone" style="transform: rotate(135deg);"></i>
                                </div> 
                            </div> 
                        </div>
                    </div> 
               
                    <!---------------------------------------------- [ PHONE APPLICATION ] ---------------------------------------------->  
                    <div class="application-phone-container" v-show="this.modal == 20" v-bind:style="{'background': 'linear-gradient(90deg, rgba(43,73,92,1) 0%, rgba(43,73,92,1) 49%, rgba(26,39,62,1) 100%)'}">
                    
                        <div class="application-phone-header-call"> 

                            <div class="photo">
                                <img :src="this.call.photo" width="70" height="70" style="border-radius: 50px;">
                            </div>

                            <div class="title">{{this.formatPhoneNumber(this.call.caller == this.user.number ? this.call.receiver : this.call.caller)}} </div>
                            <div class="status">  
                                {{ this.call.status === 'incoming' ? 'Incoming call' : this.call.status == 'rigning' ? 'Calling' : 'In call' }} 
                            </div> 
                        </div>

                        <div class="application-phone-footer-call"> 
                            <div class="button-decline" @click="declineCall()">  
                                <div class="icon">
                                    <i class="fa-solid fa-phone" style="transform: rotate(135deg);"></i>  
                                </div>  
                                
                                <div class="title">Decline</div>
                            </div> 

                            <div class="button-decline" @click="acceptCall()" v-show="this.call.status == 'incoming' && this.call.status != 'ongoing'"> 
                            
                                <div class="icon" style="background-color: green;">
                                    <i class="fa-solid fa-phone"></i>  
                                </div>    

                                <div class="title">Answer</div>
                            </div> 
                        </div>
                    </div> 
    
                    <div class="application-phone-container" v-show="this.page == 4 && this.modal != 20">
    
                        <div class="application-phone-middle">
                            <!---------- [ PHONE FOOTER ] ---------->
                            <div class="application-phone-footer" :style="{border: this.modal == 4 || this.modal == 5 ? 'none': ''}"> 
                                
                                <div class="aplication-phone-footer-row">
    
                                    <div class="application-phone-back" :style="{visibility: this.modal == 6 || this.modal == 7 ? 'visible' : 'hidden'}" @click="clickPhone(5)">
                                        <i class="fa-solid fa-angle-left"></i>
                                        <span style="font-size: 13px; margin-left: 5px;">Back</span>
                                    </div>

                                    <div class="application-phone-title" v-show="this.modal == 3 || this.modal == 5 || this.modal == 7">
                                    
                                        {{this.modal == 5 ? 'Contacts' : this.modal == 7 ? 'New Contact' :  this.modal == 3 ? 'Recent Calls' : ''}}
                                    </div>  
    
                                    <div class="application-phone-add" :style="{visibility: this.modal == 5 || this.modal == 7 ? 'visible' : 'hidden'}" @click="clickPhone(7)"> 
                                        <i v-show = "this.modal == 5" class="fa-solid fa-plus"></i>

                                        <span v-show = "this.modal == 7" style="font-size: 13px; margin-right: 5px;" @click="createContact()">Done</span>
                                        <i v-show = "this.modal == 7" class="fa-solid fa-check"></i> 
                                    </div> 
                                </div>

                                <div class="application-search-bar" v-show="this.modal == 5">
                                    <div class="search">
                                        <div class="search-button"><i class="fa fa-search"></i></div> 
                                        <input type="text" class="searchTerm" placeholder="Search" @keyup="searchContact()" v-model="viewContactData.searchContact" v-model.number="viewContactData.searchContact" onkeyup="this.value"> 
                                    </div>
                                </div>  
                            </div> 
    
                            <!---------- [ PHONE APPLICATION KEYPAD ] ---------->
                            <div class="application-phone-center" v-show ="this.modal == 4">  
                                <input type="number" class="application-phone-number" v-model="this.call.input" autofocus> 
                                <div class="application-phone-keys"> 
                                    <div class="key" @click="inputNumber(1)">1</div>
                                    <div class="key" @click="inputNumber(2)">2</div>
                                    <div class="key" @click="inputNumber(3)">3</div>
                                    <div class="key" @click="inputNumber(4)">4</div>
                                    <div class="key" @click="inputNumber(5)">5</div>
                                    <div class="key" @click="inputNumber(6)">6</div>
                                    <div class="key" @click="inputNumber(7)">7</div>
                                    <div class="key" @click="inputNumber(8)">8</div>
                                    <div class="key" @click="inputNumber(9)">9</div>  
                                    <div class="key" @click="inputNumber(99)">✱</div> 
                                    <div class="key" @click="inputNumber(0)">0</div> 
                                    <div class="key" @click="inputNumber(99)">#</div>  
                                </div> 
                                
                                <div class="phone-key-calling" @click="this.startCalling(this.call.input)">
                                    <i class="fa-solid fa-phone"></i>
                                </div>
                            </div>
                            <!-------------------------------------------------->
                            

                            <!---------- [ PHONE APPLICATION CONTACTS ] -------->
                            <div class="application-phone-center" v-show ="this.modal == 5">  

                                <div class="phone-contact" v-for="(item, index) in contacts" v-bind:key="item">
                                    <div class="phone-name">{{item.name}}</div>
                                    <div class="phone-icon" @click="viewContact(index)">
                                        <i class="fa-solid fa-circle-info"></i>
                                    </div>
                                </div>  
                            </div>
                            <!-------------------------------------------------->

                            <!------- [ PHONE APPLICATION VIEW CONTACTS ] ------>
                            <div class="application-phone-center" v-show="this.modal == 6">
                            
                                <div class="phone-details-header">
                                    <div class="phone-details-icon"> 
                                        <img :src="this.viewContactData.photo" width="60" height="60" style="border-radius: 50px;">
                                    </div>

                                    <div class="phone-details-name">{{this.viewContactData.name}}</div>
                                </div>

                                <div class="phone-details-footer"> 
                                    <div class="phone-details-button-border">
                                        <div class="phone-details-button" @click="this.startCalling(this.viewContactData.number)">
                                            <i class="fa-solid fa-phone"></i> Call {{this.viewContactData.name}}
                                        </div>
                                    </div>
    
                                    <div class="phone-details-button-border">
                                        <div class="phone-details-button" @click="openMessagePhoneBook(this.viewContactData.number, this.viewContactData.name)">
                                            <i class="fa-solid fa-envelope"></i> Send Message
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-------------------------------------------------->

                            <div class="application-phone-center" v-show="this.modal == 7">
                                <div class="phone-details-header">
                                    <div class="phone-details-icon" style="background-color: #c0c0c0b6; font-size: 30px;"> 
                                        <i class="fa-solid fa-user"></i>
                                    </div> 
                                </div>

                                <div class="application-search-bar" style="margin-top: 30px;">
                                    <div class="search">
                                        <div class="search-button"><i class="fa-solid fa-fingerprint"></i></div> 
                                        <input type="text" class="searchTerm" placeholder="Contact name" v-model="viewContactData.newContactName"> 
                                    </div>
                                </div>  

                                <div class="application-search-bar" style="margin-top: 10px;">
                                    <div class="search">
                                        <div class="search-button"><i class="fa-solid fa-phone"></i></div> 
                                        <input type="number" class="searchTerm" placeholder="Phone number" v-model="viewContactData.newContactNumber" v-model.number="viewContactData.newContactNumber"> 
                                    </div>
                                </div>  
                            </div>
                            

                            <!-------- [ PHONE APPLICATION RECENT CALLS ] ------> 
                            <div class="flex flex-col justify-start items-center mt-[10px] w-full h-[98%] font-bold text-inter overflow-y-scroll" v-show="this.modal == 3">

                                <div class="flex flex-row w-[95%] h-[3.3rem] rounded bg-[#c0c0c0b6] text-white" v-for="(item, index) in this.recentCalls" :key="item" :class="{'!mt-2': index > 0}">
                                    <div class="h-full w-[3rem] flex items-center text-center justify-center"> 
                                        <i class="fa-solid fa-circle-minus text-green-600 text-[22px]" :class="{'!text-red-600': !item.duration }"></i> 
                                    </div>

                                    <div class="h-full w-full flex flex-col text-left items-start justify-center text-black"> 
                                        <div class="text-bold text-[16px] h-auto opacity-80 tracking-wide">{{ this.user.number == item.caller ? item.receiver : item.caller }}</div>
                                        <div class="text-bold text-[13px] h-auto opacity-50">{{ this.formatMinutes(item.duration) }}</div> 
                                    </div> 

                                    <div class="h-full w-[4rem] text-[13px] flex flex-col text-center items-center justify-center text-black opacity-50"> 
                                        {{ item.date }}
                                    </div> 
                                </div> 
                            </div>
                            <!-------------------------------------------------->


                            <!----------------- [ PHONE HEADER ] --------------->
                            <div class="application-phone-header cursor-pointer">
                                <div class="item" :class="{active: this.modal == 3}" @click="clickPhone(3)">
                                    <div class="icon"><i class="fa-solid fa-clock"></i></div>
                                    <div class="subtitle">Recent</div>
                                </div>

                                <div class="item" :class="{active: this.modal == 4}" @click="clickPhone(4)" style="width: 100px;">
                                    <div class="icon"><i class="fa-solid fa-grip"></i></div>
                                    <div class="subtitle">Keypad</div>
                                </div>

                                <div class="item" :class="{active: this.modal == 5}" @click="clickPhone(5)">
                                    <div class="icon"><i class="fa-solid fa-user-group"></i></div>
                                    <div class="subtitle">Contacts</div>
                                </div>
                            </div>
                        </div> 
                    </div>  
                    <!------------------------------------------------------------------------------------------------------------------->

    
                    <!-------------------------------------------- [ PHONEBOOK APPLICATION ] --------------------------------------------> 
                    <div class="application-phonebook-container" v-show="this.page == 2">

                        <div class="application-header">
                            <div class="title"><i class="fa-solid fa-address-book"></i> Phonebook</div>

                            <div class="application-search-bar">
                                <div class="search">
                                    <div class="search-button"><i class="fa fa-search"></i></div> 
                                    <input type="text" class="searchTerm" placeholder="Search user" @keyup="searchPhonebook()" v-model="this.searchPlayer" v-model.number="this.searchPlayer" onkeyup="this.value"> 
                                </div>
                            </div> 
                        </div>

                        <div class="application-footer">

                            <div class="search-list">
    
                                <div class="item" v-for="(item) in players" v-bind:key="item">
                                    <div class="icon"> 
                                        <i class="fa-solid fa-user"></i> 
                                    </div> 

                                    <div class="description">
                                        <div class="name" style="letter-spacing: 0.5px; font-size: 14px; font-weight: 500;">{{item.name}}</div>
                                        <div class="number" style="opacity: 0.5; font-size: 13px;">{{ !item.number ? 'no sim card' : formatPhoneNumber(item.number) }}</div>
                                    </div>

                                    <div class="buttons">
                                        <i class="fa-solid fa-phone icon-phonebook"></i>
                                        <i class="fa-solid fa-message icon-phonebook" @click="openMessagePhoneBook(item.number, item.name)"></i>
                                        <i class="fa-solid fa-user-plus icon-phonebook" @click="openPageNewContact(item.number)"></i>
                                    </div>
                                </div> 
                            </div> 
                        </div> 
                    </div>
                    <!------------------------------------------------------------------------------------------------------------------->

    
                    <!---------------------------------------------- [ DARKWEB APPLICATION ] --------------------------------------------> 
                    <div class="application-darkweb-container" v-show="this.page == 10">

                        <div class="application-darkweb-container-first" v-if="hitman.page == 0">
                            <div class="application-title">Hitman Agency</div>
                            <div class="application-description">
                                Hitmen are a group of highly instructed individuals who provide certain services in a very professional maneuver in order to satisfy the consumer.
                                Their area of expertise in helping people deal with potential threats in either complete silence, without leaving any whiness, or if it comes to 
                                a more simple case, they can be ordered to execute the comand on sight no matter what the circumstances are.
                            </div>
        
                            <div class="application-button-contract" @click="placeContract('first')">Place a contract</div>
                        </div> 

                        <div class="application-darkweb-container-first" v-if="hitman.page == 1">
                            <div class="application-title">Hitman Agency</div>
                            
                            <div class="application-search-bar">
                                <div class="search">
                                    <div class="searchButton"><i class="fa fa-search"></i></div> 
                                    <input type="text" class="searchTerm" placeholder="Search player" @keyup="searchData()" v-model="hitman.input" v-model.number="hitman.input" onkeyup="this.value"> 
                                </div>
                            </div> 

                            <div class="application-search-results">

                                <div class="item" v-if="resultPlayers.length" v-for="(item) in resultPlayers" v-bind:key="item" @click="placeContract('clickuser', item.name, item.faction)"> 
                                    <div class="details" style="margin: 5px 10px;">
                                        <div class="user" style="font-size: 15px; font-weight: 600; opacity: 0.9;">{{item.name}}</div>
                                        <div class="faction" style="font-size: 13px; font-weight: 600; opacity: 0.8;"><i class="fa-solid fa-circle-chevron-up"></i> {{item.faction}}</div>
                                    </div>

                                    <div class="icon"> 
                                        <i class="fa-solid fa-user"></i> 
                                    </div> 
                                </div>  
                            </div>
                        </div> 

                        <div class="application-darkweb-container-place" v-if="hitman.page == 2">

                            <div class="application-title">Hitman Agency</div>

                            <div class="application-target">Target</div>
    
                            <div class="application-target-item"> 
                                <div class="details" style="margin: 5px 10px;">
                                    <div class="user" style="font-size: 15px; font-weight: 600; opacity: 0.9;">{{hitman.user}}</div>
                                    <div class="faction" style="font-size: 13px; font-weight: 600; opacity: 0.8;"><i class="fa-solid fa-circle-chevron-up"></i> {{hitman.faction}}</div>
                                </div> 
                            </div>  
    
                            <div class="application-target-center"> 
                                <div class="price" style="font-size: 18px;">${{formatThousands(hitman.price)}}</div> 
                                <input class="slider-money" type="range" min="1000" max="3000" v-model="hitman.price" @change="changeHitmanData($event, 'price')"> 
                            </div>

                            <div class="aplication-target-checked">
                                <input class ="contract-checkbox" type="checkbox" id="myCheck" v-model="hitman.silent" @change="changeHitmanData($event, 'contracttype')">
                                <span style="font-size: 15px; font-weight: 500;">Eliminate target without witnesses.</span> 
                            </div>

                            <div class="application-centered-button">
                                <div class="application-place-contract" @click="sendContract()">Place contract</div>
                            </div> 
                        </div>
                    </div> 
                    <!------------------------------------------------------------------------------------------------------------------->


                    <!---------------------------------------------- [ MESSAGES APPLICATION ] -------------------------------------------> 
                    <div class="application-messages-container" v-show="this.page == 3"> 
                        <div class="application-header"> 

                            <div class="application-title">
                                <span class="action" @click = "backMessages()" :style="{visibility: this.modal == 10 ? 'visible' : 'hidden'}"><i class="fa-solid fa-chevron-left"></i></span>  
                                <span class="title">{{this.modal == 10 ? 'Compose' : 'Messages'}}</span>  
                                <span class="action" @click="startNewConversation()" :style="{visibility: this.modal == 10 ? 'hidden' : 'visible'}"><i class="fa-solid fa-plus"></i></span>  
                            </div> 

                            <div class="application-search-bar">
                                <div class="search">
                                    <div class="search-button"><i class="fa fa-search"></i></div> 
                                    <input v-show="this.modal != 10" type="text" class="searchTerm" placeholder="Search" @keyup="searchConversation('list')" v-model="this.searchConversationInput" v-model.number="this.searchConversationInput" onkeyup="this.value"> 
                                    <input v-show="this.modal == 10" type="text" class="searchTerm" placeholder="To:" @keyup="searchConversation('new conversation')" v-model="this.searchConversationInput" v-model.number="this.searchConversationInput" onkeyup="this.value"> 
                                </div>
                            </div> 
                        </div> 

                        <div class="application-footer" v-show="this.modal == 10">

                            <div class="item-with-border" v-for="(item) in newConversation" v-bind:key="item">
                                <div class="item" @click="openConversation('new', item)">

                                    <div class="icon">
                                        <i class="fa-solid fa-user"></i>
                                    </div>

                                    <div class="details">
                                        <div class="title">{{item.name}}</div>
                                        <div class="message">{{!item.number ? 'no sim card' : formatPhoneNumber(item.number)}}</div>
                                    </div> 
                                </div>  
                            </div>  
                        </div> 

                        <div class="application-footer" v-show="!this.modal">

                            <div class="item-with-border" v-if="conversations.length" v-for="(item) in conversations" v-bind:key="item" @click="openConversation('exist', item);">
                                <div class="item">

                                    <div class="icon">
                                        <i class="fa-solid fa-user"></i>
                                    </div>

                                    <div class="details">
                                        <div class="title">{{item.senderNumber == this.user.number ? formatPhoneNumber(item.receiverNumber) : formatPhoneNumber(item.senderNumber)}}</div>
                                        <div class="message">{{truncate(item.messages[item.messages.length - 1].text, 27, '...')}}</div>
                                    </div>
                                </div>  
                            </div>  
                        </div> 
                    </div>

                    <div class="application-messages-container" v-show="this.page == 3 && this.conversation.entered"> 
                        <div class="application-header">  
                            <div class="application-title">
                                <span class="action" @click="backMessages()"><i class="fa-solid fa-chevron-left"></i></span>   
                                <span class="title">{{formatPhoneNumber(this.conversation.name)}}</span> 
                                <span class="action" style="visibility: hidden;"><i class="fa-solid fa-plus"></i></span>  
                            </div>  
                        </div> 

                        <div class="application-footer-messages"> 
                            <div class="conversation" v-if="this.conversations[this.conversation.index]" v-for="(item) in this.conversations[this.conversation.index].messages" v-bind:key="item">
                                <div class="messages-group" :class="{ my: item.sender == this.user.name}">
                                    <div class="message" :class="{ my: item.sender == this.user.name}">{{ item.text }}</div> 
                                </div> 
                            </div> 
                        </div> 

                        <div class="application-input-messages">
                            <div class="input-group">
                                <input class="input-message" type="text" placeholder="Text Message" style=" font-size: 15px; font-weight: 500;" v-model="this.conversation.input">
                                
                                <div class="icon" @click="sendMessage()" v-on:keyup.enter="sendMessage()">
                                    <i class="fa-solid fa-circle-up" style="color: #46ca16;"></i>
                                </div> 
                            </div> 

                            <div class="iphone-bar-menu bg-black mt-[35px]" @click="clickBarPhone()"></div>
                        </div>
                    </div> 
                    <!------------------------------------------------------------------------------------------------------------------->
    

                    <!----------------------------------------------- [ GARAGE APPLICATION ] --------------------------------------------> 
                    <div class="application-emergency-container bg-[#0a0c10]" v-show="this.page == 9" style="z-index:1;"> 
                     
                        <div class="flex flex-col justify-start items-start w-[94%] h-[12%] mt-[50px] ml-[10px]" v-show="!this.modal"> 
                            <div class="text-white font-bold text-[22px]">Vehicles</div>
  
                            <div class="w-full relative flex">  
                                <div class="flex items-center justify-center w-[35px] h-[32px] rounded-bl-xl rounded-tl-xl bg-[#8d8d8d59] text-white font-medium text-[15px] cursor-pointer">
                                    <i class="fa fa-search ml-2"></i>
                                </div>  
                                <input class="w-full h-[32px] border-none rounded-br-xl rounded-tr-xl bg-[#8d8d8d59] text-white placeholder-white placeholder-inter placeholder-medium text-[15px] font-medium tracking-wide" type="text" spellcheck="false" placeholder="Search vehicle" @keyup="searchVehicleFunc()" v-model="this.searchVehicle" v-model.number="this.searchVehicle" onkeyup="this.value">
                            </div> 
                        </div> 
                         
                        <div class="flex flex-row justify-between items-center w-[67.4%] h-[3.2%] mt-[48px] ml-[10px] cursor-pointer" v-show="this.modal == 8 || this.modal == 9"> 
                           
                            <div class="flex flex-row items-center text-white hover:text-blue-500" @click="backGarage()">
                                <i class="fa-solid fa-angle-left text-[22px]"></i> 
                            </div>
   
                            <div class="flex flex-row justify-center items-center w-[7.97rem]" v-if="this.inspectVehicleIndex != null && this.vehicles.length">
                                <div class="flex justify-center items-center"> 
                                    <div class="w-[15px] h-[15px] rounded-full bg-red-500 shadow-[0px_0px_10px_rgb(239,68,68)]" :class="{'!bg-green-500 !shadow-[0px_0px_10px_rgb(34,197,94)]': this.vehicles[this.inspectVehicleIndex].status == 'spawned'}"></div>  
                                </div> 

                                <div class="text-white font-bold text-[22px] ml-[5px]">{{this.vehicles[this.inspectVehicleIndex].name}}</div> 
                            </div>
                        </div> 
                         
                        <div class="w-[94%] h-full ml-[10px] cursor-pointer"> 
                            <div class="flex flex-col text-center w-full h-[75.4%] overflow-x-hidden overflow-y-scroll mt-2" v-show="!this.modal">
                           
                                <div class="flex flex-row justify-start text-left items-center w-full h-[3rem] rounded-t-lg bg-[#2c2c32] text-white mt-[10px] border-[3px] border-l-0 border-t-0 border-r-0 border-b-indigo-500" v-if="vehicles.length" v-for="(item, index) in vehicles" v-bind:key="item" @click="this.inspectVehicle('normal', index)">  
                                    <div class="flex justify-center items-center w-[3rem] h-[3rem]"> 
                                        <div class="w-[15px] h-[15px] rounded-full bg-red-500 shadow-[0px_0px_10px_rgb(239,68,68)]" :class="{'!bg-green-500 !shadow-[0px_0px_10px_rgb(34,197,94)]': item.status == 'spawned'}"></div>  
                                    </div> 
   
                                    <div class="flex flex-col w-auto justify-center items-center h-full">
                                        <div class="text-[14px] font-semibold opacity-90 w-auto h-auto">
                                            {{item.name}}
                                        </div>

                                        <div class="text-[13px] font-semibold opacity-50 w-auto h-auto">
                                            {{ this.formatOdometer(item.odometer) }} km
                                        </div> 
                                    </div>  
                                </div> 
                            </div> 
                            
                            <div class="flex flex-col text-center w-full h-[32rem] overflow-x-hidden overflow-y-scroll mt-2" v-show="this.modal == 8 || this.modal == 9" v-if="this.inspectVehicleIndex != null && this.vehicles.length">  
                                <div class="flex justify-center items-center w-full h-auto mt-[4rem]">
                                    <img v-bind:src="'https://www.pro-gaming.ro/vehicles/' + this.vehicles[this.inspectVehicleIndex].name + '.png'" width="170" height="170"/> 
                                </div>

                                <div class="flex flex-col justify-between items-start w-full h-full"> 
                                    
                                    <div class="flex flex-col justify-end items-start w-full h-[60%]"> 
                                        <div class="flex flex-row justify-between w-full font-medium text-white text-[14px] tracking-wide" v-show="this.modal == 9"> 
                                            <div class="w-auto"> <i class="fa-solid fa-database"></i> Server ID: </div> 
                                            <div class="w-auto"> {{this.vehicles[this.inspectVehicleIndex].id}} </div>  
                                        </div>
                              
                                        <div class="flex flex-row justify-between w-full font-medium text-white text-[14px] tracking-wide" v-show="this.modal == 9"> 
                                            <div class="w-auto"> <i class="fa-solid fa-file-signature"></i> Model: </div> 
                                            <div class="w-auto"> {{this.vehicles[this.inspectVehicleIndex].name}} </div>  
                                        </div>
                           
                                        <div class="flex flex-row justify-between w-full font-medium text-white text-[14px] tracking-wide" v-show="this.modal == 9"> 
                                            <div class="w-auto"> <i class="fa-solid fa-bars"></i> Status: </div> 
                                            <div class="w-auto text-red-500" :class="{'!text-green-500': this.vehicles[this.inspectVehicleIndex].status == 'spawned'}"> {{this.vehicles[this.inspectVehicleIndex].status}} </div>  
                                        </div>
                            
                                        <div class="flex flex-row justify-between w-full font-medium text-white text-[14px] tracking-wide" v-show="this.modal == 9"> 
                                            <div class="w-auto"> <i class="fa-solid fa-hashtag"></i> Plate: </div> 
                                            <div class="w-auto">
                                            
                                                {{this.vehicles[this.inspectVehicleIndex].number}} 
                                                <i @click="this.changePlate()" class="fa-solid fa-pen-to-square text-green-500 ml-1 hover:text-green-600"></i>
                                            
                                            </div>  
                                        </div>

                                        <div class="flex flex-row justify-between w-full font-medium text-white text-[14px] tracking-wide" v-show="this.modal == 9"> 
                                            <div class="w-auto"> <i class="fa-solid fa-gauge"></i> Odometer: </div> 
                                            <div class="w-auto"> {{formatOdometer(this.vehicles[this.inspectVehicleIndex].odometer)}} KM </div>  
                                        </div>

                                        <div class="flex flex-row justify-between w-full font-medium text-white text-[14px] tracking-wide" v-show="this.modal == 9"> 
                                            <div class="w-auto"> <i class="fa-solid fa-brush"></i> Colors: </div> 
                                            <div class="w-auto h-auto flex flex-row"> 
                                                <div class="w-[20px] h-[20px] rounded" :style="{'background-color': `rgb(${this.vehicles[this.inspectVehicleIndex].primarycolor});`}"></div>
                                                <div class="w-[20px] h-[20px] rounded" :style="{'background-color': `rgb(${this.vehicles[this.inspectVehicleIndex].secondarycolor});`}"></div>
                                            </div>  
                                        </div>
   
                                        <div class="flex flex-row justify-evenly items-center w-full h-[4rem] bg-[#181b20] rounded text-white mt-1" v-show="this.modal == 8">
    
                                            <div @click="chooseActionVehicle('lock', this.inspectVehicleIndex)" class="w-[2.5rem] h-full flex flex-col justify-center items-center hover:text-indigo-500">
                                                <i class="fa-solid fa-lock text-[20px]" :class="{'!fa-solid fa-lock-open': !this.vehicles[this.inspectVehicleIndex].locked}"></i>  
                                                <div class="font-medium text-[13.5px] tracking-wider mt-1">{{ this.vehicles[this.inspectVehicleIndex].locked ? 'Locked' : 'Unlocked' }}</div> 
                                            </div>   

                                            <div @click="chooseActionVehicle('despawn', this.inspectVehicleIndex)" v-show="this.vehicles[this.inspectVehicleIndex].status == 'spawned'" class="w-[2.5rem] h-full flex flex-col justify-center items-center hover:text-indigo-500">
                                                <i class="fa-solid fa-warehouse text-[20px]"></i>  
                                                <div class="font-medium text-[13.5px] tracking-wider mt-1">Despawn</div> 
                                            </div> 
    
                                            <div @click="chooseActionVehicle('tow', this.inspectVehicleIndex)" v-show="this.vehicles[this.inspectVehicleIndex].status == 'despawned'" class="w-[2.5rem] h-full flex flex-col justify-center items-center hover:text-indigo-500">
                                                <i class="fa-solid fa-square-parking text-[20px]"></i>  
                                                <div class="font-medium text-[13.5px] tracking-wider mt-1">Spawn</div> 
                                            </div>   

                                            <div @click="chooseActionVehicle('locate', this.inspectVehicleIndex)" class="w-[2.5rem] h-full flex flex-col justify-center items-center hover:text-indigo-500">
                                                <i class="fa-solid fa-location-crosshairs text-[20px]"></i>  
                                                <div class="font-medium text-[13.5px] tracking-wider mt-1">Location</div> 
                                            </div>  
                                        </div>
                                        
                                        <div class="w-full h-[2.5rem] flex flex-row justify-center items-center bg-indigo-500 text-white rounded font-bold text-[15px] tracking-wide uppercase mt-[20px] hover:shadow-[0px_0px_10px_rgb(99,102,241)]" v-show="this.modal == 8">
                                            <i class="fa-solid fa-sack-dollar text-[16px] mr-1 font-semibold"></i> Sell to state
                                        </div>
                                    </div> 

                                    <div class="flex flex-row justify-evenly items-center w-full h-[4rem] text-white mt-1 border-[3px] border-l-0 border-b-0 border-r-0 border-t-gray-500"> 
                                         
                                        <div class="w-[20px] h-[20px]" @click="this.inspectVehicle('s')">
                                            <i class="fa-solid fa-house text-[22px] hover:text-indigo-500" :class="{'!text-indigo-500': this.modal != 9}"></i> 
                                        </div>  
 
                                        <div class="w-[20px] h-[20px]" @click="this.inspectVehicle('s')">
                                            <i class="fa-solid fa-bars text-[22px] hover:text-indigo-500" :class="{'!text-indigo-500': this.modal == 10}"></i>  
                                        </div>  
 
                                        <div class="w-[20px] h-[20px]" @click="this.inspectVehicle('advance')">
                                            <i class="fa-solid fa-circle-info text-[22px] hover:text-indigo-500" :class="{'!text-indigo-500': this.modal == 9}"></i> 
                                        </div>   
                                    </div>  
                                </div> 
                            </div>  
                        </div>  

                        <div class="iphone-bar-menu bg-white  mt-[38rem] ml-[90px]" @click="this.clickBarPhone()"></div>
                    </div>   
                    <!------------------------------------------------------------------------------------------------------------------->

    
                    <!---------------------------------------------- [ SETTINGS APPLICATION ] -------------------------------------------> 
                    <div class="application-settings-container" v-show="this.page == 1">  
                        <div class="application-title">Settings</div>
    
                        <div class="application-settings-profile">

                            <div class="icon">
                                <img :src="this.settings.photo" width="60" height="60" style="border-radius: 50px;">
                            </div>

                            <div class="details">
                                <div class="name">{{this.user.name}}</div>
                                <div class="number">{{!this.user.number ? 'no sim card' : this.formatPhoneNumber(this.user.number)}}</div>
                            </div> 
                        </div> 

                        <div class="application-settings-items">
    
                            <div class="setting">
                                <div class="setting-footer">
                                    <div class="setting-title">
                                        
                                        <div class="icon-22" style="background-color: rgb(255,139,2); color: #fff;">
                                            <i class="fas fa-plane"></i>
                                        </div>
    
                                        <div class="title">Airplane Mode</div> 
                                    </div>
                                    
                                    <div class="setting-option"> 
                                        <input class="checkbox-settings" type="checkbox" id="switch-airplane" v-model="this.settings.airplane" @click="changeSettings('airplane', $event)"/><label class="label-settings" for="switch-airplane">Toggle</label>
                                    </div>
                                </div> 
                            </div> 
    
                            <div class="setting">
                                <div class="setting-footer">
                                    <div class="setting-title">
                                        
                                        <div class="icon-22" style="background-color: rgb(17, 177, 163); color: #fff;">
                                            <i class="fa-solid fa-phone"></i>
                                        </div>
    
                                        <div class="title">Ignore Calls</div> 
                                    </div>
                                    
                                    <div class="setting-option"> 
                                        <input class="checkbox-settings" type="checkbox" id="switch-ignorecalls" v-model="this.settings.ignoreCalls" @click="changeSettings('ignore calls', $event)"/><label class="label-settings" for="switch-ignorecalls">Toggle</label>
                                    </div>
                                </div> 
                            </div> 

                            <div class="setting" style="border: none;">
                                <div class="setting-footer">
                                    <div class="setting-title"> 
                                        <div class="icon-22" style="background-color: rgb(17, 177, 163); color: #fff;"><i class="fa-solid fa-people-group"></i></div> 
                                        <div class="title">Ignore Unknow</div> 
                                    </div>
                                    
                                    <div class="setting-option"> 
                                        <input class="checkbox-settings" type="checkbox" id="switch-ignore-unknow" v-model="this.settings.ignore" @click="changeSettings('ignore unknow', $event)"/><label class="label-settings" for="switch-ignore-unknow">Toggle</label>
                                    </div>
                                </div> 
                            </div>  
                        </div>

                        <div class="application-settings-items">
                            <div class="setting clickable" @click="openSettings('wallpaper')">
                                <div class="setting-footer">
                                    <div class="setting-title"> 
                                        <div class="icon-22" style="background-color: rgb(74, 189, 21); color: #fff;"><i class="fa-regular fa-image"></i></div> 
                                        <div class="title">Wallpaper</div> 
                                    </div>
                                    
                                    <div class="setting-option" style="opacity: 0.9;"> 
                                        <i class="fa-solid fa-chevron-right"></i>
                                    </div>
                                </div> 
                            </div>  

                            <div class="setting clickable" style="border: none;">
                                <div class="setting-footer" @click="openSettings('ringtone')">
                                    <div class="setting-title"> 
                                        <div class="icon-22" style="background-color: rgb(0, 112, 253); color: #fff;"><i class="fa-solid fa-music"></i></div> 
                                        <div class="title">Ringtone</div> 
                                    </div>
                                    
                                    <div class="setting-option" style="opacity: 0.9;"> 
                                        <i class="fa-solid fa-chevron-right"></i>
                                    </div>
                                </div> 
                            </div>  
                        </div>
                    </div>
                    
                    <div class="application-settings-container" v-show="this.page == 1 && this.modal == 1">  

                        <div class="application-settings-header">
                            <div class="back" @click="backSettings()">
                                <i class="fa-solid fa-chevron-left"></i>  
                                <span style="font-size: 15px; font-weight: 500; letter-spacing: 0.5px;">Settings</span> 
                            </div>

                            <div class="title">Wallpaper</div>
                        </div> 

                        <div class="application-settings-footer">
                            
                            <div class="item" v-for="(item, index) in this.wallpapers" v-bind:key="index"> 
                                <div class="checked" v-show="this.settings.wallpaper == index">
                                    <i class="fa-solid fa-check"></i>
                                </div>

                                <img v-bind:src="item" @click="changeSettings('wallpaper', index)">    
                            </div> 
                        </div> 
                    </div>
    
                    <div class="application-settings-container" v-show="this.page == 1 && this.modal == 2">   
                        <div class="application-settings-header">
                            <div class="back" @click="backSettings()">
                                <i class="fa-solid fa-chevron-left"></i>  
                                <span style="font-size: 15px; font-weight: 500; letter-spacing: 0.5px;">Settings</span> 
                            </div>

                            <div class="title">Ringtones</div>
                        </div> 
    
                        <div class="application-settings-footer ringtones">
                            
                            <div class="item-sound">
                                <div class="title" style="margin: 0 7px;">Default iPhone</div>

                                <div class="buttons-sounds"> 
                                    <div class="play start-sound" :class="{played: this.audioRingtone.index != undefined && this.audioRingtone.index == 0}" style="margin: 0 7px;" @click="startRingtone(0)">
                                        <i v-show = "this.audioRingtone.index == undefined || this.audioRingtone.index != 0" class="fa-solid fa-play"></i>
                                        <i v-show = "this.audioRingtone.index != undefined && this.audioRingtone.index == 0" class="fa-solid fa-stop"></i> 
                                    </div>

                                    <div class="play set-sound" style="margin: 0 7px; background-color: rgb(255,139,2);" @click="changeSettings('ringtone', 0)"> 
                                        <i class="fa-solid fa-check"></i>
                                    </div>
                                </div>  
                            </div>  

                            <div class="item-sound">
                                <div class="title" style="margin: 0 7px;">iPhone New</div>

                                <div class="buttons-sounds"> 
                                    <div class="play start-sound" :class="{played: this.audioRingtone.index != undefined && this.audioRingtone.index == 1}" style="margin: 0 7px;" @click="startRingtone(1)">
                                        <i v-show = "this.audioRingtone.index == undefined || this.audioRingtone.index != 1" class="fa-solid fa-play"></i>
                                        <i v-show = "this.audioRingtone.index != undefined && this.audioRingtone.index == 1" class="fa-solid fa-stop"></i> 
                                    </div>

                                    <div class="play set-sound" style="margin: 0 7px; background-color: rgb(255,139,2);" @click="changeSettings('ringtone', 1)"> 
                                        <i class="fa-solid fa-check"></i>
                                    </div>
                                </div>  
                            </div>   

                            <div class="item-sound">
                                <div class="title" style="margin: 0 7px;">iPhone Remix Bass</div>

                                <div class="buttons-sounds"> 
                                    <div class="play start-sound" :class="{played: this.audioRingtone.index != undefined && this.audioRingtone.index == 2}"  style="margin: 0 7px;" @click="startRingtone(2)">
                                        <i v-show = "this.audioRingtone.index == undefined || this.audioRingtone.index != 2" class="fa-solid fa-play"></i>
                                        <i v-show = "this.audioRingtone.index != undefined && this.audioRingtone.index == 2" class="fa-solid fa-stop"></i> 
                                    </div>

                                    <div class="play set-sound" style="margin: 0 7px; background-color: rgb(255,139,2);" @click="changeSettings('ringtone', 2)"> 
                                        <i class="fa-solid fa-check"></i>
                                    </div>
                                </div>  
                            </div>  

                            <div class="item-sound">
                                <div class="title" style="margin: 0 7px;">iPhone Remix Bass 2</div>

                                <div class="buttons-sounds"> 
                                    <div class="play start-sound" :class="{played: this.audioRingtone.index != undefined && this.audioRingtone.index == 3}"  style="margin: 0 7px;" @click="startRingtone(3)">
                                        <i v-show = "this.audioRingtone.index == undefined || this.audioRingtone.index != 3" class="fa-solid fa-play"></i>
                                        <i v-show = "this.audioRingtone.index != undefined && this.audioRingtone.index == 3" class="fa-solid fa-stop"></i> 
                                    </div>

                                    <div class="play set-sound" style="margin: 0 7px; background-color: rgb(255,139,2);" @click="changeSettings('ringtone', 3)"> 
                                        <i class="fa-solid fa-check"></i>
                                    </div>
                                </div>  
                            </div>  

                            <div class="item-sound">
                                <div class="title" style="margin: 0 7px;">iPhone Remix Spatial</div>

                                <div class="buttons-sounds"> 
                                    <div class="play start-sound" :class="{played: this.audioRingtone.index != undefined && this.audioRingtone.index == 4}"  style="margin: 0 7px;" @click="startRingtone(4)">
                                        <i v-show = "this.audioRingtone.index == undefined || this.audioRingtone.index != 4" class="fa-solid fa-play"></i>
                                        <i v-show = "this.audioRingtone.index != undefined && this.audioRingtone.index == 4" class="fa-solid fa-stop"></i> 
                                    </div>

                                    <div class="play set-sound" style="margin: 0 7px; background-color: rgb(255,139,2);" @click="changeSettings('ringtone', 4)"> 
                                        <i class="fa-solid fa-check"></i>
                                    </div>
                                </div>
                            </div>  
                        </div> 
                    </div> 
                    <!------------------------------------------------------------------------------------------------------------------->

                    <div class="application-maps-container" v-show="this.page == 8">
                        <div class="application-header">
    
                            <div class="application-title">  
                                <div class="application-title-back" v-show="this.modal == 11" @click="backMaps()"> 
                                    <i class="fa-solid fa-chevron-left"></i>
                                    <div class="title" style="margin-left: 3px;">Maps</div> 
                                </div>

                                <div class="application-title-final" v-show="this.modal != 11">
                                    <i class="fa-solid fa-map"></i> 
                                    
                                    <div class="title" style="margin-left: 5px;">Maps</div>  
                                </div> 
                            </div>

                            <div class="application-search-bar" v-show="this.modal == 11">
                                <div class="search">
                                    <div class="search-button"><i class="fa fa-search"></i></div> 
                                    <input type="text" class="searchTerm" placeholder="Search location" @keyup="searchLocationFunc()" v-model="this.searchLocation" v-model.number="this.searchLocation" onkeyup="this.value"> 
                                </div>
                            </div> 
                        </div>

                        <div class="application-footer">

                            <div class="application-list-items" v-show = "this.modal != 11">
                                <div class="item hover" @click="openMap('house')"> 
                                    <div class="title">House</div>

                                    <div class="icon"> 
                                        <i class="fa-solid fa-chevron-right"></i>
                                    </div>
                                </div> 

                                <div class="item hover" @click="openMap('businesses')"> 
                                    <div class="title">Businesses</div>

                                    <div class="icon"> 
                                        <i class="fa-solid fa-chevron-right"></i>
                                    </div>
                                </div> 

                                <div class="item hover" @click="openMap('jobs')"> 
                                    <div class="title">Jobs</div>

                                    <div class="icon"> 
                                        <i class="fa-solid fa-chevron-right"></i>
                                    </div>
                                </div> 

                                <div class="item hover" @click="openMap('factions')">
                                    <div class="title">Factions</div>

                                    <div class="icon"> 
                                        <i class="fa-solid fa-chevron-right"></i>
                                    </div>
                                </div> 

                                <div class="item hover" @click="openMap('atm')">
                                    <div class="title">ATM</div>

                                    <div class="icon"> 
                                        <i class="fa-solid fa-chevron-right"></i>
                                    </div>
                                </div> 
                            </div> 
        
                            <div class="application-list-items" :style="{'style.hover': 'box-shadow: none'}" v-if = "this.modal == 11 && !Object.keys(this.searchLocation).length && this.mapsSelected != -1">
                                <div class="item" v-for="(item) in this.locations[this.mapsSelected]" v-bind:key="item" @click="findLocation(item)">
                                    
                                    <div class="row-title">
                                        <div class="title" style="font-size: 15px;">{{ item.name }}</div>
                                        <div class="description">{{ this.capitalizeFirstLetter(this.mapsSelected) }}</div>
                                    </div>
                                    
                                    <div class="distance">  
                                        <i class="fa-solid fa-location-dot" style="color: #0375FF;"></i>
                                        <div class="number">{{this.calculateDistance({x: item.position.x, y: item.position.y, z: item.position.z}, {x: this.user.position.x, y: this.user.position.y, z: this.user.position.z}).toFixed(0)}} M</div>
                                    </div>
                                </div> 
                            </div>  
                            
                            <div class="application-list-items" :style="{'style.hover': 'box-shadow: none'}" v-if = "this.modal == 11 && Object.keys(this.searchLocation).length && this.mapsSelected != -1 && this.locations.length">
                                <div class="item" v-for="(item) in this.locations" v-bind:key="item" @click="findLocation(item)">
                                    
                                    <div class="row-title">
                                        <div class="title" style="font-size: 15px;">{{ item.name }}</div>
                                        <div class="description">{{ this.capitalizeFirstLetter(this.mapsSelected) }}</div>
                                    </div>
                                    
                                    <div class="distance">  
                                        <i class="fa-solid fa-location-dot" style="color: #0375FF;"></i>
                                        <div class="number">{{this.calculateDistance({x: item.position.x, y: item.position.y, z: item.position.z}, {x: this.user.position.x, y: this.user.position.y, z: this.user.position.z}).toFixed(0)}} M</div>
                                    </div>
                                </div> 
                            </div>  
                        </div>
                    </div>
    
                    <div class="application-banking-container" v-show="this.page == 5">
    
                        <div class="application-banking-welcome" v-show="!this.modal"> 
                            <div class="application-banking-header">
                                <div class="avatar">M</div>
                                <div class="description">Hello, {{ this.user.name }}</div>
                            </div>

                            <div class="application-banking-footer">
                                <div class="title">Unlock using your fingerpoint</div>
                                <div class="icon" @click="changPageBanking(21)"> 
                                    <i class="fa-solid fa-fingerprint"></i> 
                                </div>
                            </div> 
                        </div> 
    
                        <div class="application-banking-homepage" :style="{height: this.modal == 21 ? '80%' : '78.3%'}">
                            <div class="application-banking-account" v-show="this.modal == 21"> 
                                <div class="application-banking-header"> 
                                    <div class="account-owner">
                                        <div class="title" style="font-size: 14px; font-weight: 500; opacity: 0.5; ">Hello</div>
                                        <div class="owner">{{ this.user.name }}</div>
                                    </div>
        
                                    <div class="account-banking-card">
                                        <div class="header-banking-card">
                                            <div class="title" style="font-size: 14px; font-weight: 500; opacity: 0.5; letter-spacing: 0.5px;">Balance</div>
                                            <div class="title" style="font-size: 16px; letter-spacing: 1px;">${{ this.formatThousands(this.user.money) }}</div>
                                        </div>

                                        <div class="footer-banking-card">
                                            <div class="owner" style="font-size: 20px; letter-spacing: 1px;">{{ this.user.name }}</div>
                                            <div class="title">**** **** **** **** 0144</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="application-banking-recents-header" v-show="this.modal == 21"> 
                                <div class="title"><i class="fa-solid fa-clock-rotate-left"></i> Recent transactions</div> 
                                <div class="recent-items">

                                    <div class="item" v-if="transactions.length" v-for="(item) in this.transactions.slice(this.transactions.length - 3).sort((a, b) => b.id - a.id)" v-bind:key="item"> 
                                        <div class="icon-transaction">
                                            <i v-show ="item.option == 'received'" class="fa-solid fa-arrow-left"></i> 
                                            <i v-show ="item.option == 'send'" class="fa-solid fa-arrow-right"></i> 
                                        </div>

                                        <div class="description">
                                            <div class="title-description">{{ item.option == 'received' ? 'Transfer from' : 'Transfer to'}}</div>
                                            <div class="sub-title-description">{{ item.title }}</div>
                                        </div>

                                        <div class="description-two">
                                            <div class="amount-two" :style="{color: item.option == 'received' ? '#218d00' : '#ac1e05'}">${{ this.formatThousands(item.amount) }}</div>
                                            <div class="sub-title-two">{{ this.getTimeAgo(item.date)}}</div>
                                        </div>
                                    </div> 
                                </div> 
                            </div>

                            <div class="application-transfer-page" v-show="this.modal == 22">

                                <div class="title"><i class="fa-solid fa-right-left"></i> Transfer</div> 

                                <div class="application-search-bar" v-if="this.selectTransfer.name == ''">
                                    <div class="search">
                                        <div class="search-button"><i class="fa fa-search"></i></div> 
                                        <input type="text" class="searchTerm" placeholder="Search user" @keyup="searchData()" v-model="hitman.input" v-model.number="hitman.input" onkeyup="this.value"> 
                                    </div>
                                </div>  
    
                                <div class="application-transfer-results" v-if="this.selectTransfer.name == ''" style="height: 25rem;"> 
                                    <div class="item-recipient" v-if="resultPlayers.length" v-for="(item) in resultPlayers"  @click="selectUserTransfer(item.name, item.card)" v-bind:key="item">
                                        <div class="name">{{item.name}}</div>
    
                                        <div class="card-recipient"  style="opacity: 0.5; font-weight: 500; font-size: 14px; marging-top: 5px;">
                                            <i class="fa-solid fa-circle-chevron-up"></i> **** {{item.card}}
                                        </div>
                                    </div> 
                                </div>

                                <div class="title" style="margin-top: 20px;" v-if="this.selectTransfer.name != ''"><i class="fa-solid fa-user"></i> Recipient:</div>
                                <div class="application-transfer-results" v-if="this.selectTransfer.name != ''" style="height: 20rem;"> 
    
                                    <div class="item-recipient">
                                        <div class="name">{{this.selectTransfer.name}}</div>
    
                                        <div class="card-recipient" style="opacity: 0.5; font-weight: 500; font-size: 14px; marging-top: 5px;">
                                            <i class="fa-solid fa-circle-chevron-up"></i> **** {{this.selectTransfer.card}}
                                        </div>
                                    </div> 
    
                                    <div class="item-amount"> 
                                        <div class="item-amount-row"> 
                                            <div class="button" @click="updateTransferAmount('down')"> 
                                                <i class="fa-solid fa-circle-chevron-left" style="opacity: 0.5;"></i>
                                            </div> 
                                            
                                            <div class="amount-div">${{ this.formatThousands(selectTransfer.amount) }}</div> 
                                        
                                            <div class="button" @click="updateTransferAmount('pulse')"> 
                                                <i class="fa-solid fa-circle-chevron-right" style="opacity: 0.5;"></i>
                                            </div>
                                        </div>

                                        <input class="slide-banking-amount" type="range" min="1" :max="this.user.money" v-model="this.selectTransfer.amount" @change="updateTransferAmount('slide', $event)">

                                        <div class="available-amount">Available: ${{ this.formatThousands(this.user.money) }} </div>
                                    </div> 

                                    <div class="button-send-trasnfer" @click="executeTransfer()">
                                        Transfer
                                    </div>
                                </div> 
                            </div>
                        </div>
    
                        <div class="application-banking-tools-header" v-show="this.modal == 21 || this.modal == 22"> 
                            <div class="application-banking-tools">  
                                <div class="option" :class="{active: this.modal == 21}" @click="this.changPageBanking(21)">
                                    <i class="fa-solid fa-house"></i>
                                </div>

                                <div class="option" :class="{active: this.modal == 22}" @click="this.changPageBanking(22)"> 
                                    <i class="fa-solid fa-right-left"></i>
                                </div> 
                            </div>

                            <div class="iphone-bar-menu bg-black mt-[5.5rem]" @click="clickBarPhone()"></div>
                        </div>
                    </div>

                    <div class="application-emergency-container font-inter cursor-pointer" v-show="this.page == 20">  
                        <div class="flex flex-col justify-center w-[94%] mt-[50px] ml-[10px]"> 
                            <div class="text-[22px] font-semibold tracking-wide">Emergency</div>
                            <div class="opacity-50 font-medium mt-[5px]">Which incident you want to report?</div>
                        </div> 
    
                        <div class="flex flex-col w-[94%] h-[78%] ml-[10px] mt-[10px]" v-if="this.crime.killer != undefined">  
                            <div class="flex flex-row items-center justify-between w-full h-[3rem] bg-[#68686846] text-black rounded hover:bg-red-500 hover:text-white" @click="this.reportCrime()">
                                <div class="column-one">
                                    <div class="text-[14px] font-bold mx-1">{{ this.crime.reason }}</div>
                                    <div class="text-[13px] font-bold tracking-wide opacity-50 mx-1"><i class="fa-solid fa-location-dot"></i> {{ this.crime.location }}</div>
                                </div>
  
                                <div class="column-one ml-1">
                                    <div class="text-[14px] font-bold mx-1 text-right">{{ this.crime.killer }}</div>
                                    <div class="text-[13px] font-bold tracking-wide opacity-50 mx-1">{{ this.crime.date }} <i class="fa-solid fa-clock"></i></div>
                                </div>
                            </div>
                        </div>
                    </div> 

                    <div class="application-emergency-container items-center" v-show="this.page == 6" style="background-image: url('https://i.imgur.com/Rb5FxW9.png'); background-size: cover; background-position: center;">
                        <div class="bg-zinc-200 text-black w-[96.5%] h-72 rounded mt-72" v-if="this.faction == 3" style="z-index: 5;"> 
                            <div class="text-blue-600 font-semibold ml-2 mt-2">
                                <i class="fa-solid fa-taxi"></i> Taxi requests
                            </div> 
    
                            <div class="footer-taxi w-full h-[15rem] overflow-y-scroll flex justify-start items-center flex-col cursor-pointer">  
                                <div v-for="(item) in this.taxiRequests" :key="item" class="item bg-neutral-300 hover:bg-neutral-400 rounded-lg w-[96.5%] h-12 mt-2 flex items-center flex-row justify-between border-[3px] border-[#0000001e]"> 
                                    <div class="rounded-full w-10 h-10 ml-4 flex justify-center items-center"> 
                                        <img :src="this.settings.photo" class="rounded-full">
                                    </div>  

                                    <div class="flex flex-col w-2/4"> 
                                        <span class="text-sm font-semibold tracking-wide">{{ item.name }}</span>
                                        <span class="text-sm font-semibold tracking-wide opacity-70">
                                            <i class="fa-solid fa-location-dot"></i> {{(this.calculateDistance({x: item.position.x, y: item.position.y, z: item.position.z}, {x: this.user.position.x, y: this.user.position.y, z: this.user.position.z}) / 1000).toFixed(2)}} km
                                        </span>
                                    </div>
    
                                    <div class="text-green-700 text-sm font-semibold tracking-wide mr-4">
                                        ${{(this.calculateDistance({x: item.position.x, y: item.position.y, z: item.position.z}, {x: this.user.position.x, y: this.user.position.y, z: this.user.position.z}) / 1000).toFixed(2) * 20}}
                                    </div>
                                </div>   
                            </div> 
                        </div>
    
                        <div style="z-index: 5;" class="bg-zinc-200 text-black w-full h-[12rem] rounded-br-[36px] rounded-bl-[36px] rounded-tr-md rounded-tl-md mt-[27.3rem]" v-if="this.faction != 3 && this.taxiCommand.have">  
                            <div class="absolute w-full flex justify-start items-center flex-col cursor-pointer mt-[-2.5rem]">  
                                <img :src="this.taxiCommand.photo" width="80" height="80" class="rounded-full border-[3px] border-white">

                                <div class="flex flex-col justify-center items-center w-full mt-2">

                                    <div class="font-bold text-[22px] text-black">{{this.taxiCommand.name}}</div>
                                    <div class="font-bold text-[17px] opacity-60">
                                        <i class="fa-solid fa-road"></i> {{(this.calculateDistance({x: this.taxiCommand.position.x, y: this.taxiCommand.position.y, z: this.taxiCommand.position.z}, {x: this.user.position.x, y: this.user.position.y, z: this.user.position.z}) / 1000).toFixed(2)}}KM
                                    </div>
                                    <button @click="executeplm()" class="w-[12rem] h-[2.5rem] bg-black text-white rounded text-[15px] font-bold mt-4 hover:bg-[#3a3636c2]">CANCEL</button>
                                
                                    <div class="iphone-bar-menu bg-black mt-[9.5rem]" @click="clickBarPhone()"></div>
                                </div> 
                            </div>
                        </div>
                    </div> 
    
                    <div class="application-emergency-container bg-[#f8f8f8f3]" v-show="this.page == 21" style="z-index:1;"> 
                        <div class="flex flex-row justify-between items-center w-[94%] h-[3rem] mt-[35px] ml-[10px]" style="z-index: 5;">  
                            <div class="flex flex-row items-center h-[3rem] w-auto">
                                <img class width="40" height="40" src="https://i.imgur.com/pZlFtMz.png"> 
                                <div class="font-bold text-[20px] tracking-wide ml-2">YouTube Music</div>  
                            </div>

                            <div v-if="this.youtube.player !== null || this.youtube.showSearch" @click="this.showSearchBar()" class="flex items-center h-[3rem] w-auto mr-1 cursor-pointer"> 
                                <i class="fa-solid fa-magnifying-glass text-[20px] font-bold hover:text-[#374151]"></i> 
                            </div> 
                        </div> 

                        <div id="app" v-show="false">
                            <div id="player"></div>
                        </div>
    
                        <div class="footer flex flex-col w-[94%] h-full mt-[5px] ml-[10px] font-inter" style="z-index: 5;">
    
                            <div v-if="this.youtube.player == null || this.youtube.showSearch" class="w-full relative flex">  
                                <div class="flex items-center justify-center w-[35px] h-[32px] rounded-bl-xl rounded-tl-xl bg-[#8d8d8d59] text-[rgba(97,97,97,0.521)] font-medium text-[15px] cursor-pointer">
                                    <i class="fa fa-search ml-2" @click="this.searchVideo(this.youtube.input, 10)"></i>
                                </div>  
                                <input id="search" spellcheck="false" class="w-full h-[32px] border-none rounded-br-xl rounded-tr-xl bg-[#8d8d8d59] text-[rgba(97,97,97,0.521)] text-[15px] font-medium tracking-wide" type="name" placeholder="Search song" v-model="this.youtube.input" v-model.number="this.youtube.input" onkeyup="this.value">
                            </div>
    
                            <div v-if="this.youtube.player != null" class="flex flex-col justify-center items-center w-full max-h-[12rem] mt-2 cursor-pointer">
                        
                                <div class="font-semibold text-[16px] text-[#434f5e]" id="title"></div> 

                                <div class="flex flex-row justify-center items-center w-full h-auto mt-2">
    
                                    <div class="flex items-center justify-center w-[45px] h-[45px] text-white mr-4 rounded-full" @click="this.playPrevMusic()">
                                        <i class="fa-solid fa-circle-chevron-left text-[#434f5e] text-[42px] hover:text-[#374151]"></i>
                                    </div> 
    
                                    <i v-if="this.youtube.started != null && this.youtube.started == 1" @click="this.manageVideo('stop')" 
                                    class="fa-solid fa-circle-pause text-[#374151] text-[35px] hover:text-[#252c38]"></i>

                                    <i v-if="this.youtube.started != null && this.youtube.started == 2" @click="this.manageVideo('play')" 
                                    class="fa-solid fa-circle-play text-[#374151] text-[35px] hover:text-[#252c38]"></i>
    
                                    <div class="flex items-center justify-center w-[45px] h-[45px] text-white ml-4 rounded-full" @click="this.playNextMusic()">
                                        <i class="fa-solid fa-circle-chevron-right text-[#434f5e] text-[42px] hover:text-[#374151]"></i>
                                    </div> 
                                </div>

                                <div class="flex flex-col justify-center items-center w-full h-[2rem] mt-[1.8rem] font-inter">

                                    <input @change="this.updateYoutubeVolume($event, 'position')" id="videoDurationInput" value="0" class="cursor-pointer w-full h-[10px] appearance-none [&::-webkit-slider-runnable-track]:rounded-full bg-[#8d8d8d59] rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[18px] [&::-webkit-slider-thumb]:w-[18px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#374151]" type="range" min="0" max="100">

                                    <div class="flex flex-row justify-between items-center w-[98%] h-auto mt-1"> 
                                    
                                        <span id="videoDuration" class="text-[#374151] font-semibold text-[13px]">00:00:00</span> 
                                        <span id="videoLength" class="text-[#374151] font-semibold text-[13px]">00:00:00</span>
                                    </div> 
                                </div> 
    
                                <div class="flex flex-row justify-center items-center w-full h-[2rem] mt-1">

                                    <i class="fa-solid fa-volume-low text-[#434f5e] text-[22px] mr-2"></i>
    
                                    <input @change="this.updateYoutubeVolume($event, 'volume')" id="volumeYT" value="2"  class="cursor-pointer w-[80%] h-[10px] appearance-none [&::-webkit-slider-runnable-track]:rounded-full bg-[#8d8d8d59] rounded-full    
                                        [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[20px] [&::-webkit-slider-thumb]:w-[20px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#374151]" type="range" min="0" max="100">
    
                                    <i class="fa-solid fa-volume-high text-[#434f5e] text-[22px] ml-2"></i> 
                                </div> 
                            </div>
    
                            <div v-if="this.youtube.results.length" :class="{'!max-h-[17rem] !min-h-[15rem] !mt-[1.8rem]': this.youtube.player != null}" class="flex flex-col items-center w-full overflow-y-scroll min-h-[30em] max-h-[30em] mt-1">
                            
                                <div @click ="this.initYoutube(item, index)" class="cursor-pointer mt-1 flex flex-row items-center justify-between w-full min-h-[4rem] max-h-[4rem] bg-[#8d8d8d59] text-black rounded hover:bg-[#8d8d8dce]" v-for="(item, index) in this.youtube.results" :key="item">  
                                    <div class="flex flex-col items-start ml-2">
                                        <div class="text-[15px] font-semibold opacity-70">{{ item.snippet.title.length > 25 ? (item.snippet.title.substring(0, 25) + '...') : item.snippet.title }}</div>
                                        <div class="text-[13px] font-semibold opacity-70">
                                            {{item.snippet.channelTitle}}
                                        </div>
                                    </div>
    
                                    <div class="w-[3rem] mr-2"> 
                                        <img style="border-radius: 50px; width: 50px; height: 50px;" :src="item.snippet.thumbnails.default.url"> 
                                    </div> 
                                </div>   
                            </div>  
                        </div>
                    </div>
 
                    <div class="iphone-middle" style="flex-direction: column;">  
                        <div class="iphone-blocked-hour" style="margin-top: 50px;" v-show="this.locked && this.call.status == 'no call'">  
                            <div class="iphone-blocked-hour-content">
                                <span>{{time}}</span>
                            </div> 

                            <div class="iphone-blocked-date-content">
                                <span>{{date}}</span>
                            </div> 
                        </div> 
 
                        <!--YOUTUBE BACKED-->
                        <div class="w-[17rem] h-[8rem] bg-[rgba(156,156,156,0.29)] rounded text-white mt-6 flex flex-col justify-start items-center" v-if="this.locked && this.youtube.player != null"> 
                            <div class="w-[95%] h-[3.5rem] flex flex-row justify-center items-start mt-2">
                                <div class="w-auto h-auto"> 
                                    <img style="border-radius: 5px; width: 50px; height: 50px;" :src="'https://yt3.ggpht.com/eicZEeYjcmH3t8HZQrYZlg4Nk8nTXCEZLvIql0sP459usBeCmJOe4tn1OT1-XDzcBvPzl7H7=s48-c-k-c0x00ffffff-no-nd-rj'"> 
                                </div> 

                                <div class="flex flex-col items-start ml-2">
                                    <div class="text-[13px] font-medium opacity-70 tracking-wider" id="title2" v-if="this.youtube.player != null">
                                        {{(this.youtube.player.getVideoData().title.length > 25 ? (this.youtube.player.getVideoData().title.substring(0, 25) + '...') : this.youtube.player.getVideoData().title)}}
                                    </div>

                                    <div class="text-[13px] font-medium opacity-70 tracking-wide" v-if="this.youtube.player != null">
                                        {{(this.youtube.player.getVideoData().author.length > 25 ? (this.youtube.player.getVideoData().author.substring(0, 25) + '...') : this.youtube.player.getVideoData().author)}}
                                    </div>
                                </div>
                            </div>
  
                            <div class="flex flex-row justify-center items-center w-[95%] h-auto mt-2"> 
                                <i class="fa-solid fa-chevron-left text-[20px] hover:text-[#374151] mr-6" @click="this.playPrevMusic()"></i>

                                <i v-if="this.youtube.started != null && this.youtube.started == 1" @click="this.manageVideo('stop')" class="fa-solid fa-pause text-[20px] hover:text-[#252c38]"></i>
                                <i v-if="this.youtube.started != null && this.youtube.started == 2" @click="this.manageVideo('play')" class="fa-solid fa-play text-[20px] hover:text-[#252c38]"></i>
                                
                                <i class="fa-solid fa-chevron-right text-[20px] hover:text-[#374151] ml-6" @click="this.playNextMusic()"></i>                          
                            </div>
                            
                            <div class="flex flex-col justify-center items-center w-[95%] h-auto mt-1">

                                <input @change="this.updateYoutubeVolume($event, 'position')" id="videoDurationInput2" value="0" class="cursor-pointer w-full h-[5px] appearance-none [&::-webkit-slider-runnable-track]:rounded-full bg-[#8d8d8d59] rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[15px] [&::-webkit-slider-thumb]:w-[15px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500" type="range" min="0" max="100">

                                <div class="flex flex-row justify-between items-center w-[98%] h-auto mt-[5px]"> 

                                    <span id="videoDuration2" class="text-white font-medium text-[12px] tracking-wide">
                                        {{ this.fmHoursMinutesSeconds((this.youtube.player.getCurrentTime())) }}
                                    </span> 

                                    <span id="videoLength" class="text-white font-medium text-[12px] tracking-wide">
                                        {{ this.fmHoursMinutesSeconds((this.youtube.player.getDuration())) }}
                                    </span>
                                </div> 
                            </div>  
                        </div>
                        
                        <div class="iphone-global-applications cursor-pointer" v-show="!this.locked && this.page == 0 && this.call.status == 'no call'"> 
                            <div class="iphone-app-global-content" @click="openApplication('darkweb', 10)">
                                <img class = "phone-app-global-img" width="45" height="45" src="https://i.imgur.com/SpqkaRJ.png">
                                <span>DarkWeb</span>
                            </div>  

                            <div class="iphone-app-global-content" @click="openApplication('garage', 9)">
                                <img class = "phone-app-global-img" width="45" height="45" src="https://i.imgur.com/vodPtDG.png">
                                <span>Garage</span>
                            </div>

                            <div class="iphone-app-global-content" @click="openApplication('maps', 8)">
                                <img class = "phone-app-global-img" width="45" height="45" src="https://i.imgur.com/Zxy6KmI.png">
                                <span>Maps</span>
                            </div>
    
                            <div class="iphone-app-global-content" @click="openApplication('taxi', 6)">
                                <img class = "phone-app-global-img" width="45" height="45" src="https://i.imgur.com/sxz1x6X.png">
                                <span>Taxi</span>
                            </div>
    
                            <div class="iphone-app-global-content" @click="openApplication('emergency', 20)">
                                <img class = "phone-app-global-img" width="45" height="45" src="https://i.imgur.com/wjLCg8Y.png">
                                <span>Emergency</span>
                            </div>   

                            <div class="iphone-app-global-content" @click="openApplication('bank', 5)">
                                <img class = "phone-app-global-img" width="45" height="45" src="https://i.imgur.com/ThxSDZv.png">
                                <span>Bank</span>
                            </div>   

                            <div class="iphone-app-global-content" @click="openApplication('phonebook', 2)">
                                <img class = "phone-app-global-img" width="45" height="45" src="https://i.imgur.com/t8jV1e8.png">
                                <span>Phonebook</span>
                            </div>   

                            <div class="iphone-app-global-content" @click="openApplication('youtube', 21)">
                                <img class = "phone-app-global-img" width="45" height="45" src="https://i.imgur.com/pZlFtMz.png">
                                <span>Youtube</span>
                            </div>   
                        </div>
                    </div> 
    
                <div class="iphone-bottom cursor-pointer" :style="{'z-index': this.modal == 21 || this.modal == 22 || this.page == 6 || this.page == 3 || this.page == 9 ? '-5' : 1}">

                    <!-- main menu buttons -->
                    <div class="iphone-app-menu" v-show="!this.locked && this.page == 0 && this.call.status == 'no call'">  
                        <div class="iphone-app-content" @click="openApplication('phone', 4)"><img class = "phone-app-img" width="45" height="45" src="https://i.imgur.com/rHoEDJ4.png"></div> 
                        <div class="iphone-app-content" @click="openApplication('messages', 3)"><img class = "phone-app-img" width="45" height="45" src="https://i.imgur.com/aAPoIl3.png"></div> 
                        <div class="iphone-app-content" @click="openApplication('contacts', 2)"><img class = "phone-app-img" width="45" height="45" src="https://i.imgur.com/t8jV1e8.png"></div> 
                        <div class="iphone-app-content" @click="openApplication('settings', 1)"><img class = "phone-app-img" width="45" height="45" src="https://i.imgur.com/jzovgPH.png"></div> 
                    </div> 

                    <div class="iphone-bar-menu-header" :style="{'margin-top': this.locked ? '12%' : '16%'}">
                        <span class="span-pulse-iphone font-medium text-base tracking-wide text-zinc-300" v-if="this.locked" @click="this.clickBarPhone()">Touch to open</span>
                        <div class="iphone-bar-menu" :style="{'background-color': (this.page != 0 && this.page != 4 && this.page != 10 && this.page != 6 && this.page == 21 || this.page == 5 || this.page == 6 || this.page == 20 || this.page == 2 || this.page == 1 || this.page == 3 || this.page == 4 || this.page == 8) ? 'black' : 'silver'}" v-show="page != 0 || this.locked && this.call.status == 'no call'" @click="clickBarPhone()"></div>
                    </div> 
                </div>    
            </div> 
        </div>  
    </div>
</template> 
   

<script>  
    import $ from "jquery";  

    //Youtube
    var tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  
    var hoursArea = new Date().getHours();
    var minutesArea = new Date().getMinutes();

    const yearMonts = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const daysWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
       
    var API_KEY = "AIzaSyD4p2REDKHuopqQfnijkLxuZHWndEzdU6M"; 
  
    export default {
        name: 'PhoneComponent',

        data: function() 
        {
            return { 
 
                user: {
                    name: '',
                    position: { x: 114.252, y: -1961.107, z: 21.334 },
                    number: 512069,
                    money: 0 
                },

                youtube: { 
                    player: null, 
                    input: '',
                    showSearch: false,

                    results: [],
                    started: null
                },
  
                isOpened: false, 
                locked: true,  
                page: 0, 
                modal: 0,
 
                time: (hoursArea < 10 ? '0' + hoursArea : hoursArea) +':'+ (minutesArea < 10 ? '0'+ minutesArea : minutesArea),
                date: daysWeek[new Date().getDay()] + ', ' + yearMonts[new Date().getMonth()] + ' ' + new Date().getDay(),
         
                settings: { wallpaper: 4, airplane: false, ignoreCalls: true, ignore: false, ringtone: 0, photo: 'https://i.imgur.com/DP7NqWU.png' }, 
 
                audioRingtone: { src: undefined, index: undefined }, 
                multipleSounds: [
                    'sound-one.mp3', 'sound-two.mp3', 'sound-three.mp3', 'sound-four.mp3', 'sound-five.mp3', 'sound-calling.mp3'
                ],
                wallpapers: [
                    'https://i.imgur.com/IR9t0PR.png', 'https://i.imgur.com/6FdXZ5D.png', 'https://i.imgur.com/gmWIIH8.png', 'https://i.imgur.com/WCCAviF.png', 'https://i.imgur.com/Z0FIkZ8.jpg', 'https://i.imgur.com/YySSW8j.jpg'
                ],

                hitman: { page: 0, input: '', user: '', faction: '', price: 0, silent: false }, 
                resultPlayers: [],
 
                searchConversationInput: '',
                conversation: { index: null, entered: false, input: '', name: '', new: false}, 
                conversations: [], 
                newConversation: [],
 
                viewContactData: { id: 0, name: '', number: 0, newContactName: '', newContactNumber: '', searchContact: '', photo: '' },
                contacts: [],

                recentCalls: [
                    {
                        id: 1,
                        receiver: 512069,
                        caller: 369069,
                        duration: 200,
                        date: '14:37'
                    } 
                ],

                searchVehicle: '',
                inspectVehicleIndex: null, 
                vehicles: [],

                searchPlayer: '',
                players: [],

                searchLocation: '',
                mapsSelected: null,
                locations: { businesses: [], factions: [], house: [], jobs: [], atm: [] },

                callingRingtone: { src: undefined, index: undefined },
                call: { caller: '', receiver: '', input: '', time: 0, status: 'no call', photo: 'https://i.imgur.com/DP7NqWU.png' },
 
                transactions: [],
                selectTransfer: { name: '', amount: 0, card: -1 },
             
                crime: { killer: 'MihaiADV', reason: 'Driving with car', date: '2 hours ago', location: 'Los Santos Palace' },
 
                faction: 1,
                taxiRequests:
                [
                    {
                        name: 'Mihai',
                        photo: 'https://i.imgur.com/DP7NqWU.png',
 
                        position: { x: -120.006, y: -1574.573, z: 34.176 },
                        accepted: false 
                    }  
                ],

                taxiCommand:
                {
                    have: false,

                    name: 'Mihai',
                    photo: 'https://i.imgur.com/DP7NqWU.png',
                    position: { x: -120.006, y: -1574.573, z: 34.176 }
                }
            };
        },    
 
        mounted()
        { 
            window.PhoneComponent = this;  
             
            setInterval(() => { 
                this.time = (hoursArea < 10 ? '0' + hoursArea : hoursArea) + ':' + (minutesArea < 10 ? '0' + minutesArea : minutesArea);
                this.date = daysWeek[new Date().getDay()] + ', ' + yearMonts[new Date().getMonth()] + ' ' + new Date().getDay(); 
            }, 6000);   

            addEventListener('keydown', () => 
            {
                //if(event.keyCode === 38) { document.querySelector('.iphone-container').style = 'animation: phone-slide-up 0.5s linear forwards'; }  
                //if(event.keyCode === 40) { this.closePhone() } 

                if(event.keyCode === 13 && !this.locked && this.page == 21 && (this.youtube.input).length > 5) {
                    return this.searchVideo(this.youtube.input, 10);
                }
            }); 
             
            if(window.mp) 
            {
                window.e_rpc.add('reloadBanking', (data) => {
                    const raw = JSON.parse(data)

                    this.transactions = raw.transactions;
                    this.user.money = raw.cash;
    
                    this.selectTransfer = { name: '', amount: 0, card: -1 },
                    this.hitman.input = '';
                    this.resultPlayers = [];
                    this.modal = 21;
                }); 
          
                window.e_rpc.add('reloadCrimes', (data) => {
                    this.crime = data;
                }); 
        
                window.e_rpc.add('reloadPhoneData', (data) => {
                    const raw = JSON.parse(data)

                    this.locations = raw.locations; 
                    this.vehicles = JSON.parse(raw.vehicles);
                });
        
                window.e_rpc.add('reloadPlayerContacts', (data) => {
                    const raw = JSON.parse(data);
                
                    this.contacts = raw.contacts;
                    this.viewContactData = { id: 0, name: '', number: 0, newContactName: '', newContactNumber: '' } 
                    return this.modal = 5;
                });
        
                window.e_rpc.add('reloadPhonebook', (data) => {
                    const raw = JSON.parse(data); 
                    
                    this.players = raw.results;
                });
        
                window.e_rpc.add('reloadContacts', (data) => {
                    const raw = JSON.parse(data); 
                    this.contacts = raw.results;
                });
         
                window.e_rpc.add('openConversationFinish', (data) => {
                    const raw = JSON.parse(data)

                    this.searchConversationInput = ''; 
                    this.conversation = { entered: true, new: raw.new, index: raw.index, input: '', name: raw.name } 

                    this.page = 3;

                    return this.scrollMessages();
                });
         
                window.e_rpc.add('updateMessages', (data) => { 
                    const raw = JSON.parse(data)

                    if(raw.option) {
                        this.newConversation = raw.messages;
                    }

                    if(!raw.option) {
                        this.conversations = raw.messages;
                    }  
                    
                    return this.scrollMessages(); 
                });
      
                window.e_rpc.add('reloadDarkWeb', (data) => {
                    const raw = JSON.parse(data); 
                    this.resultPlayers = raw.results;
                });
            } 
        },
 
        methods: 
        {    
            async fetchUser(search, maxResults) {

                let items = [];
 
                await $.get("https://www.googleapis.com/youtube/v3/search?key=" + API_KEY + "&type=video&part=snippet&maxResults=" + maxResults + "&q=" + search, function(datas) { 
                     
                    datas.items.forEach(item => {
                        items.push(item)
                    }); 
                }); 

                return items; 
            },
            
            updateCall(data, status) 
            {
                this.call = data;

                if(status)
                {
                    this.modal = 0;
                }
 
                this.locked = false;

                if(this.callingRingtone.src != undefined)
                {
                    this.callingRingtone.src.pause();   
                    this.callingRingtone.src = undefined;
                    this.callingRingtone.index = null;
                }
            },   

            startCallRigning()
            { 
                if(this.callingRingtone.src != undefined) { this.callingRingtone.src.pause(); }
  
                let audio = (this.call.status === 'incoming' ? this.settings.ringtone : 5);
 
                this.callingRingtone.src = new Audio('https://www.pro-gaming.ro/sounds/' + audio);
                this.callingRingtone.src.play(); 
                this.callingRingtone.src.volume = 0.2;  
            },

            declineCall()
            { 
                this.modal = 0; 
                this.call = { caller: '', receiver: '', input: '', time: 0, status: 'no call', photo: '' }; 
 
                if(window.mp) {
                    return window.e_rpc('server::phone:calling:decline');
                }   
            },

            acceptCall()
            { 
                if(window.mp) {
                    return window.e_rpc('server::phone:calling:accept');
                }
            },
 
            /*------------------------------------------------------------------- [ GLOBAL FUNCTIONS ] ------------------------------------------------------------------*/ 
            open(settings, conversations, contacts, vehicles, locations, transactions, calls, isOpened, crimes, user)
            { 
                this.user = user;
  
                this.settings = settings; 
                this.conversations = conversations;
                this.contacts = contacts; 
                this.vehicles = vehicles;
                this.transactions = transactions;
 
                this.call = calls;

                this.searchConversationInput = this.newConversation = '';
                this.conversation = { index: null, new: false, entered: false, input: '', name: '' }

                this.hitman = { page: 0, input: '', user: '', faction: '', price: 0, silent: false }
                this.resultPlayers = [];
                
                this.page = this.modal = 0;  
                this.locked = true;

                this.isOpened = isOpened;
 
                this.searchLocation = '';
                this.mapsSelected = -1;
                this.locations = locations; 
 
                this.searchVehicle = '';
                this.inspectVehicleIndex = null;

                this.crime = crimes;

                if(this.call.status === 'no call')
                {
                    return document.querySelector('.iphone-container').style = 'animation: phone-slide-up 0.5s linear forwards';
                }
  
                if(this.call.status === 'rigning' || this.call.status === 'ongoing')
                {
                    this.modal = 20;
                    this.locked = false;
                    document.querySelector('.iphone-container').style = 'animation: phone-slide-up 0.5s linear forwards';
                }
 
                if(this.call.status === 'incoming') 
                {
                    if(isOpened)
                    { 
                        this.modal = 20;
                        document.querySelector('.iphone-container').style = 'animation: phone-slide-up-call-two 0.5s linear forwards';
                    }
                    else 
                    {
                        document.querySelector('.iphone-container').style = 'animation: phone-slide-up-call 0.5s linear forwards';
                    }
                }  
            },

            closePhone()
            {   
                document.querySelector('.iphone-container').style = (this.call.status === 'incoming' && !this.isOpened) ? 'animation: phone-slide-down-call 0.5s linear forwards' : 'animation: phone-slide-down 0.5s linear forwards';   
 
                this.searchConversationInput = this.newConversation = '';
                this.conversation = { index: null, new: false, entered: false, input: '', name: '' }

                this.hitman = {page: 0, input: '', user: '', faction: '', price: 0, silent: false}
                this.resultPlayers = [];
                this.page = 0;
                this.modal = 0;
 
                this.searchLocation = '';
                this.mapsSelected = -1;

                this.searchVehicle = '';
                this.inspectVehicleIndex = null;

                this.call = { caller: 0, receiver: 0, input: '', time: 0, status: 'no call' };

                this.locked = true;
                this.destroyRightone();
 
                setTimeout(() => { 

                    this.isOpened = false;

                    if(window.mp) {
                        return window.e_trigger("client::phone:closeNow"); 
                    } 
                }, 1000);    
            },
 
            clickBarPhone()
            {
                this.isOpened = true;

                if(this.page > 0 && !this.locked)
                {
                    this.searchConversationInput = '';
                    this.conversation = { index: null, new: false, entered: false, input: '', name: '' }

                    this.hitman = {page: 0, input: '', user: '', faction: '', price: 0, silent: false}
                    this.resultPlayers = [];

                    this.modal = 0;
                    this.destroyRightone();
 
                    this.mapsSelected = -1;
                    this.searchLocation = '';

                    this.searchVehicle = '';
                    this.inspectVehicleIndex = null;
                     

                    if(window.mp) { 
                        window.e_rpc('server::phone::maps:goBack', this.locked); 
                    }

                    return this.page = 0;
                }

                return this.locked = !this.locked;
            },
 
            openApplication(application, index)
            {
                if(application == 'phone') {
                    this.modal = 4; 
                }

                this.page = index;
            },

            formatThousands(x) {
                return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); 
            }, 

            formatOdometer(x) { 
                return x.toString().replace(/\B(?=(\d{2})+(?!\d))/g, ".")
            },

            formatPhoneNumber(x) {
                return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "-"); 
            }, 

            truncate(text, length, suffix) {
                if(text.length > length) 
                {
                    return text.substring(0, length) + suffix;
                } 
                else return text; 
            }, 

            capitalizeFirstLetter(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            },
 
            calculateDistance(p1, p2) {
                var a = p2.x - p1.x;
                var b = p2.y - p1.y;
                var c = p2.z - p1.z;

                return Math.sqrt(a * a + b * b + c * c);
            }, 
            /*-----------------------------------------------------------------------------------------------------------------------------------------------------------*/
 
            /*------------------------------------------------------------------- [ CALL / CONTACTS ] -------------------------------------------------------------------*/

            openPageNewContact(number)
            { 
                this.viewContactData = { id: 0, name: '', number: number, newContactName: '', newContactNumber: number }

                this.page = 4;
                this.modal = 7;  

                return this.searchPlayer = '';
            },

            clickPhone(page)
            { 
                if(page == 5) {
                    this.viewContactData = { id: 0, name: '', number: 0, newContactName: '', newContactNumber: '' }
                }

                this.modal = page;
            },

            viewContact(index)
            {
                this.modal = 6;

                return this.viewContactData = this.contacts[index];
            },

            inputNumber(number)
            {
                if(this.call.input.length >= 6) return;
                this.call.input += number; 
            },
 
            createContact()
            {
                if(!this.viewContactData.newContactName || !this.viewContactData.newContactNumber)
                    return;
 
                if(window.mp) {  
                    return window.e_rpc('server::phone::contact:create', JSON.stringify(this.viewContactData));
                } 
            },

            updateContacts(data)
            {
                this.contacts = data;
                this.viewContactData = { id: 0, name: '', number: 0, newContactName: '', newContactNumber: '' }

                return this.modal = 5;
            },

            searchContact()
            { 
                if(window.mp) {   
                    return window.e_rpc('server::phone::contact:search', this.viewContactData.searchContact);
                }
            },

            searchPhonebook()
            { 
                if(window.mp) { 
                    return window.e_rpc('server::phone::phonebook:search', this.searchPlayer);
                }
            },
 
            /*--------------------------------- [CALL FUNCTIONS] ---------------------*/
            startCalling(number)
            {  
                if(window.mp) { 
                    return window.e_rpc('server::phone::contacts:startCalling', number);
                }
            }, 
            /*-----------------------------------------------------------------------------------------------------------------------------------------------------------*/


            /*--------------------------------------------------------------------- [ DARK WEB ] ------------------------------------------------------------------------*/
            searchData()
            {  
                if(window.mp) { 
                    return window.e_rpc('server::phone::darkweb:search', this.hitman.input);
                }
            },
 
            placeContract(option, user, faction)
            {
                if(option == 'first') {
                    return this.hitman = {page: 1, user: '', faction: '', price: 0, silent: false}
                }

                if(option == 'clickuser') {
                    return this.hitman = {page: 2, user: user, faction: faction, price: 1000, silent: false}
                } 
            },

            sendContract()
            { 
                if(window.mp) { 
                    return window.e_rpc('server::phone::darkweb:placeContract', JSON.stringify(this.hitman));
                } 
            },
 
            changeHitmanData(event, option)
            {
                if(option == 'price') {
                    this.hitman.price = event.target.value;
                }
                else 
                {
                    this.hitman.silent = event.target.checked; 
                }  
            },
            /*-----------------------------------------------------------------------------------------------------------------------------------------------------------*/


            /*--------------------------------------------------------------------- [ MESSAGES ] ------------------------------------------------------------------------*/

            openMessagePhoneBook(number, name)
            { 
                this.openConversation('verify', {name: name, number: number});
            },
 
            openConversation(option, conversation)
            {  
                if(window.mp) { 
                    return window.e_rpc('server::phone:::messages:openConversation', JSON.stringify({ data: conversation, option: option }));  
                }
            },
 
            openConversationFinish(raw)
            {  
                this.searchConversationInput = ''; 
                this.conversation = { entered: true, new: raw.new, index: raw.index, input: '', name: raw.name } 

                this.page = 3;

                return this.scrollMessages();
            },

            backMessages()
            { 
                this.searchConversationInput = '';
                this.conversation = { entered: false, new: false, index: null, input: '', name: '' } 
                this.newConversation = '';

                this.modal = 0;
            },

            sendMessage()
            {  
                if(!this.conversation.input.length || !this.conversation.input.trim().length)
                    return;
    
                if(window.mp) { 
                    window.e_rpc('server::phone::messages:send', JSON.stringify(this.conversation));  
                }
 
                return this.conversation.input = '';
            },

            searchConversation(option)
            { 
                if(window.mp) { 
                    return window.e_rpc('server::phone:::messages:search', JSON.stringify({ options: option, input: this.searchConversationInput })); 
                }
            },

            startNewConversation()
            {
                this.modal = 10; 
            },
 
            scrollMessages()
            {
                setTimeout(() => {
                    var elementbyClass = document.getElementsByClassName("messages-group");
                    let messageRender = elementbyClass[elementbyClass.length - 1];
                    if(messageRender) 
                    {
                        messageRender.scrollIntoView(true);
                    }
                }, 100);
            },

            updateMessages(option, data)
            { 
                if(option) {
                    this.newConversation = data;
                }

                if(!option) {
                    this.conversations = data;
                }  
                
                return this.scrollMessages();
            },
            /*-----------------------------------------------------------------------------------------------------------------------------------------------------------*/
 

            /*----------------------------------------------------------------------- [ SETTINGS ] ----------------------------------------------------------------------*/
            openSettings(setting)
            {  
                this.modal = (setting == 'wallpaper' ? 1 : 2);
            },

            backSettings()
            {
                if(this.modal) {
                    this.modal = 0;
                } 
                
                return this.destroyRightone();
            },

            changeSettings(option, status) 
            {
                switch(option)
                {
                    case 'wallpaper':
                    {
                        this.settings.wallpaper = status;
                        break;
                    }

                    case 'airplane':
                    {
                        this.settings.airplane = status.target.checked;   
                        break;
                    }

                    case 'ignore calls':
                    {
                        this.settings.ignoreCalls = status.target.checked;  
                        break;
                    }

                    case 'ignore unknow':
                    {
                        this.settings.ignore = status.target.checked; 
                        break;
                    }

                    case 'ringtone':
                    {
                        this.settings.ringtone = status;
                        break;
                    }
                } 

                if(window.mp) { 
                    return window.e_rpc('server::phone::settings:change', JSON.stringify(this.settings)); 
                }
            },
 
            startRingtone(sound) 
            { 
                try
                {
                    if(this.audioRingtone.src != undefined)
                    {
                        this.audioRingtone.src.pause(); 
                        return this.audioRingtone.src = this.audioRingtone.index = undefined;
                    }
 
                    this.audioRingtone.src = new Audio('https://www.pro-gaming.ro/sounds/' + this.multipleSounds[sound]);
                    this.audioRingtone.src.play(); 
                    this.audioRingtone.src.volume = 0.2;
                    this.audioRingtone.index = sound;

                    console.log(sound)
                }
                catch(v) { console.log(v) }
            },

            destroyRightone()
            {
                if(this.audioRingtone.src != undefined) {
                    this.audioRingtone.src.pause();  
                    this.audioRingtone = { src: undefined, index: undefined }
                }
            },
            /*-----------------------------------------------------------------------------------------------------------------------------------------------------------*/



            /*-------------------------------------------------------------------- [ GARAGE APPLICATION ] ---------------------------------------------------------------*/
            changePlate()
            {
                this.modal = 23;
            },
            
            changeNumberPlate()
            { 
                if(!this.searchLocation || this.searchLocation.length < 3 || this.searchLocation.length > 6)
                    return;

                if(window.mp) { 
                    window.e_rpc('server::phone::vehicles:changePlate', JSON.stringify({ vehicle: this.inspectVehicleIndex, number: this.searchLocation })); 
                }

                this.searchLocation = '';
                this.modal = 8;
            },

            backGarage()
            { 
                this.searchVehicle = '';
                this.modal = 0;
            },

            inspectVehicle(option, vehicle)
            { 
                console.log('go to inspect vehicle')

                if(option == 'normal')
                {
                    this.modal = 8;  
                    this.inspectVehicleIndex = vehicle;
    
                    if(window.mp) { 
                        return window.e_rpc('server::phone::vehicles:inspect', vehicle); 
                    }
                } 

                return this.modal = (option == 'advance' ? 9 : 8)
            },

            chooseActionVehicle(option, vehicle)
            { 
                if(window.mp) { 
                    return window.e_rpc('server::phone::vehicles:' + option, vehicle); 
                }
            },

            searchVehicleFunc()
            { 
                if(window.mp) { 
                    return window.e_rpc('server::phone::vehicles:search', this.searchVehicle); 
                }
            },
            /*-----------------------------------------------------------------------------------------------------------------------------------------------------------*/


            /*-------------------------------------------------------------------- [ MAPS APPLICATION ] -----------------------------------------------------------------*/
            openMap(type)
            {
                this.modal = 11;
                this.mapsSelected = type;
                this.searchLocation = '';  
            },

            backMaps()
            { 
                this.mapsSelected = -1;
                this.searchLocation = '';
 
                if(window.mp)
                { 
                    window.e_rpc('server::phone::maps:goBack'); 
                }
 
                return this.modal = 0;
            },

            findLocation(item)
            { 
                if(window.mp) { 
                    return window.e_rpc('server::phone::maps:findLocation', JSON.stringify(item));
                }
            },

            searchLocationFunc()
            { 
                if(window.mp) { 
                    return window.e_rpc('server::phone::maps:search', JSON.stringify({category: this.mapsSelected, input: this.searchLocation}));
                } 
            },
            /*-----------------------------------------------------------------------------------------------------------------------------------------------------------*/


            /*----------------------------------------------------------------- [ EMERGENCY APPLICATION ] ---------------------------------------------------------------*/
            reportCrime()
            {
                if(window.mp) { 
                    return window.e_rpc('server::phone::emergency:reportCrime', JSON.stringify(this.crime)); 
                }
            },
            /*-----------------------------------------------------------------------------------------------------------------------------------------------------------*/


            /*------------------------------------------------------------------ [ BANKING APPLICATION ] ----------------------------------------------------------------*/
            executeTransfer()
            { 
                if(window.mp) { 
                    return window.e_rpc('server::phone::banking:executeTransfer', JSON.stringify(this.selectTransfer)); 
                }
            },
 
            changPageBanking(modal)
            {   
                if(modal == 21)
                {
                    this.selectTransfer = { name: '', amount: 0, card: -1 }
                    this.resultPlayers = [];
                    this.hitman.input = ''
                } 
 
                return this.modal = modal;
            },

            selectUserTransfer(name, card)
            {
                this.selectTransfer = { name: name, card: card, amount: 0 } 
                this.resultPlayers = [];
                this.hitman.input = ''
            },

            updateTransferAmount(option, event)
            {
                switch(option)
                {
                    case 'pulse':
                    {
                        if(this.selectTransfer.amount >= this.user.money)
                            return;

                        this.selectTransfer.amount ++;
                        break;
                    }

                    case 'down':
                    {
                        if(this.selectTransfer.amount <= 0)
                            return;

                        this.selectTransfer.amount --;
                        break;
                    }

                    case 'slide':
                    {
                        this.selectTransfer.amount = event.target.value;
                        break;
                    }
                } 
            },

            getTimeAgo(databaseTimestamp) 
            {
                const timestamp = new Date(databaseTimestamp);
                const now = new Date();
                const diffInMilliseconds = now - timestamp;
                const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
            
                if(diffInMinutes < 1) 
                {
                    return 'just now';
                } 
                else if(diffInMinutes === 1) 
                {
                    return '1 minute ago';
                } 
                else if(diffInMinutes < 60) 
                {
                    return `${diffInMinutes} minutes ago`;
                } 
                else if(diffInMinutes < 1440) 
                {
                    const diffInHours = Math.floor(diffInMinutes / 60);
                    return `${diffInHours} hour ${diffInHours > 1 ? 's' : ''} ago`;
                } 
                else 
                {
                    const diffInDays = Math.floor(diffInMinutes / 1440);
                    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
                }
            },
            /*-----------------------------------------------------------------------------------------------------------------------------------------------------------*/ 
 
            async searchVideo(search, maxResults)
            { 
                try 
                { 
                    const result = await this.fetchUser(search, maxResults);
                    this.youtube.results = result; 
    
                    if(this.youtube.player != null)
                    {
                        const index = this.youtube.results.indexOf(this.youtube.results[0]);
    
                        this.youtube.prevSong = -1;
                        this.youtube.nextSong = index;
                    }
                }
                catch(e) { return console.log(e) }   
            }, 
 
            initYoutube(item, index) 
            { 
                try 
                { 
                    if(!item)
                        return;
    
                    this.youtube.actualSong = index;

                    this.youtube.prevSong = index - 1;
                    this.youtube.nextSong = index + 1;
    
                    if(this.youtube.player != null) {
                        clearInterval(this.youtube.player.interval)
                        this.youtube.player.interval = null; 
                    }

                    if(this.youtube.player != null) {
                        this.youtube.player.stopVideo();

                        this.youtube.player.destroy();
                        this.youtube.player = null; 
                    }
    
                    this.youtube.player = new window.YT.Player("player", {
                        width: 600,
                        height: 400,
                        videoId: item.id.videoId, 
                        playerVars: {
                            color: 'white', 
                        },
                        events: {
                            onReady: this.onPlayerReady,
                            onStateChange: this.onPlayerStateChange
                        }
                    }); 
                }
                catch(e) { return console.log(e) }    
            },

            onPlayerReady(evt) 
            { 
                try 
                {
                    if(this.youtube.player == null)
                        return;

                    evt.target.setVolume(2);
                    evt.target.playVideo();
    
                    setTimeout(() => {
                        this.youtube.player.interval = setInterval(() => { this.updateYoutubeVideo() }, 1000);
                    }, 1000);   
                }
                catch(e) { return console.log(e) }   
            },

            onPlayerStateChange() 
            {
                try 
                { 
                    if(this.youtube.player.getPlayerState() == 1) { 
                        document.getElementById("title").innerText = (this.youtube.player.getVideoData().title.length > 30 ? (this.youtube.player.getVideoData().title.substring(0, 30) + '...') : this.youtube.player.getVideoData().title);
                    } 

                    this.youtube.started = this.youtube.player.getPlayerState();

                    document.getElementById("volumeYT").value = (this.youtube.player.getVolume()); 
                    document.getElementById("videoDuration").innerText = this.fmHoursMinutesSeconds((this.youtube.player.getCurrentTime()));
                    document.getElementById("videoLength").innerText = this.fmHoursMinutesSeconds((this.youtube.player.getDuration()));
                    document.getElementById('videoDurationInput').max = this.youtube.player.getDuration(); 


                    if(this.locked) {
                        document.getElementById("title2").innerText = (this.youtube.player.getVideoData().title.length > 30 ? (this.youtube.player.getVideoData().title.substring(0, 30) + '...') : this.youtube.player.getVideoData().title);

                        document.getElementById("videoDuration2").innerText = this.fmHoursMinutesSeconds((this.youtube.player.getCurrentTime()));
                        document.getElementById('videoDurationInput2').max = this.youtube.player.getDuration(); 
                    } 
                }
                catch(e) { return console.log(e) }   
            },
  
            manageVideo(option)
            {
                try 
                {
                    var state = this.youtube.player.getPlayerState();

                    if(state == 2 && option === 'play') { 
                        return this.youtube.player.playVideo();
                    } 

                    if(state && option == 'stop') { 
                        return this.youtube.player.pauseVideo();
                    }  
                }
                catch(e) { return console.log(e) }   
            },

            updateYoutubeVolume(event, option)
            {  
                try 
                {
                    if(this.youtube.player != null && option == 'volume') {
                        return this.youtube.player.setVolume(event.target.value);
                    } 

                    if(this.youtube.player != null && option == 'position')
                    { 
                        this.youtube.player.seekTo(event.target.value)

                        if(this.youtube.player.getCurrentTime().toFixed() == (this.youtube.player.getDuration() - 1) || this.youtube.player.getCurrentTime().toFixed() == (this.youtube.player.getDuration()))
                            return this.initYoutube(this.youtube.results[this.youtube.nextSong], this.youtube.nextSong); 
                    } 
                }
                catch(e) { return console.log(e) }    
            },
 
            updateYoutubeVideo()
            { 
                try 
                {
                    if(this.youtube.player == null && this.youtube.player.getPlayerState() != 1)
                        return;

                    document.getElementById("videoDuration").innerText = this.fmHoursMinutesSeconds((this.youtube.player.getCurrentTime())); 
                    document.getElementById("videoDurationInput").value = parseInt((this.youtube.player.getCurrentTime()).toFixed());  

                    if(this.locked) {
                        document.getElementById("videoDuration2").innerText = this.fmHoursMinutesSeconds((this.youtube.player.getCurrentTime())); 
                        document.getElementById("videoDurationInput2").value = parseInt((this.youtube.player.getCurrentTime()).toFixed());  
                    }
 
                    if(this.youtube.player.getCurrentTime().toFixed() == (this.youtube.player.getDuration() - 1) || this.youtube.player.getCurrentTime().toFixed() == (this.youtube.player.getDuration())) {
                        this.initYoutube(this.youtube.results[this.youtube.nextSong], this.youtube.nextSong);
                    }
                }
                catch(e) { return console.log(e) }    
            },

            playPrevMusic() {
                if(this.youtube.player == null)
                    return;

                return this.initYoutube(this.youtube.results[this.youtube.prevSong], this.youtube.prevSong);
            },

            playNextMusic() {
                if(this.youtube.player == null)
                    return;

                return this.initYoutube(this.youtube.results[this.youtube.nextSong], this.youtube.nextSong);
            },

            showSearchBar() {
                return this.youtube.showSearch = !this.youtube.showSearch;
            },
 
            fmHoursMinutesSeconds(seconds) {
                return [parseInt(seconds / 60 / 60), parseInt(seconds / 60 % 60), parseInt(seconds % 60)].join(":").replace(/\b(\d)\b/g, "0$1")
            },

            formatMinutes(s) {
                return (s-(s%=60))/60+(9<s?':':':0') + s
            },

            executeplm()
            {
                console.log('sadasasd')
            }
        },

        unmounted() { 
            if(this.youtube.player != null) {
                this.youtube.player.stopVideo();

                if(this.youtube.player.interval != null) {
                    clearInterval(this.youtube.player.interval)
                    this.youtube.player.interval = null; 
                }
 
                this.youtube.player.destroy();
                this.youtube.player = null;   
            }
        }
    } 
</script> 