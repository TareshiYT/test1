<template>   
    <div class="w-full h-full select-none overflow-hidden">  
        <div v-show="this.modal.status" class="absolute text-white w-full h-full font-inter z-9999 left-0 right-0 overflow-hidden">   
            <div class="global-modal-effect"></div> 

            <div class="absolute w-full h-full flex justify-center items-center text-center flex-col z-50 left-0 right-0">  
             
                <i class="fa-solid fa-triangle-exclamation text-orange-400 text-8xl"></i>
                
                <div class="font-bold text-3xl mt-3 text-orange-400">{{this.modal.title.toUpperCase()}}</div>

                <div class="font-semibold text-normal tracking-wide mt-1 w-1/4"> 
                    {{ this.modal.description }}
                </div> 

                <input v-show="this.modal.option == 'money' || (this.modal.option == 'put' && this.tradeItemSelected && this.tradeItemSelected.count > 1)" spellcheck="false" class="w-[30rem] h-10 bg-[#a0a0a01c] text-white rounded-full text-center font-medium tracking-normal mt-4 border-2 border-[#a0a0a01e] focus:border-[#a0a0a01e]" type="name" placeholder="Enter amount" v-model="this.modal.input" v-model.number="this.modal.input" onkeyup="this.value">
  
                <div v-if="this.modal.option == 'vehicles' && this.offer.vehicles.length" class="mt-2 overflow-y-scroll max-h-[17.5rem]"> 
                    <div v-for="(item) in this.offer.vehicles" :key="item" @click="this.selectTradeVehicle(item)" class="w-[20rem] min-h-[3rem] flex flex-col justify-center items-center bg-[#a0a0a01c] border-2 border-[#a0a0a01e] rounded mt-2 hover:bg-[#a0a0a046]" :class="{'bg-[#a0a0a046]': this.modal.selected != null && this.modal.selected == item}">
                        
                        <div class="tracking-wide text-[15px] font-semibold">
                            #{{ item.id }} {{ item.name.toUpperCase() }}
                        </div>
  
                        <div class="font-semibold tracking-wide text-[12px]">
                            Odometer: {{ this.formatKM(item.odometer) }}km / Days: {{ item.days }}
                        </div>
                    </div>
                </div> 
  
                <div class="font-medium tracking-wider text-base flex flex-row mt-6">  
                    <button @click="this.executeTradeModal();" class="rounded bg-[#7d73bd] text-white font-bold text-[17px] w-40 h-[2.3rem] mx-5"><i class="fa-solid fa-check"></i> Select</button> 
                    <button @click="this.showModal(false, '', '');" class="rounded bg-[#7d73bd] text-white font-bold text-[17px] w-40 h-[2.3rem] mx-5"><i class="fa-solid fa-xmark"></i> Close</button>
                </div> 
            </div> 
        </div>
 
        <div class="absolute w-full h-full" style="zoom: 70%;"> 
            <div class="background-global-effect"></div> 
            
            <div class="flex flex-col justify-center items-center w-full h-full text-white font-inter cursor-pointer"  >  
                <!--  <div class="w-[5rem] h-[2rem] bg-red-500 rounded text-white mt-8 ml-8" @click="this.closeTrade()">Close</div>-->
                  
                <div class="flex flex-row justify-center items-center w-full h-full"> 
                    <div class="flex flex-col items-start text-left w-[38rem] h-[40rem] ml-[20px]">
                        <div class="opacity-90 text-[17px] font-bold tracking-wide ml-2">YOUR ITEMS</div> 
                        <div class="flex justify-start items-start text-center h-[31.5rem]">  
                        
                            <div class="flex justify-start items-start flex-wrap max-w-[40rem] max-h-[30rem] overflow-y-scroll mt-2">
                                <div class="hover-text ml-2 flex flex-col justify-center items-center w-[7rem] h-[7rem] bg-[rgba(120,99,212,0.04)] border-[3px] border-[rgba(120,99,212,0.25)] rounded droppableTrade" v-for="(item, index) in this.offer.inventory" :class="{'!mt-1': index > 4}" v-bind:key="item" v-bind:item="item">    
                                    <div class="flex w-full h-full justify-center items-end">
                                        <img class="w-[64px] h-[64px] bottom-[0.50rem]" width="64" height="64" v-bind:id="item.id" :src="itemsImage[item.image.replace('.png', '')]" draggable="false" v-on:mousedown="this.moveTradeItem($event, item)">   
                                    </div>

                                    <div class="opacity-70 text-[15px] font-bold text-right w-[93%]" :style="{'visibility': item.count == 1 ? 'hidden' : ''}">{{item.count}}</div>  
                                    <span class="tooltip-text absolute font-inter font-bold rounded tracking-wide bg-white text-black flex justify-center items-center mt-[7rem]">{{item.name}}</span>    
                                </div>  
                            </div> 
                        </div> 
                    </div>  

                    <div class="flex flex-col justify-start items-start text-left w-[38rem] h-[40rem] ml-[20px]">
                        
                        <div class="flex flex-col justify-start items-start text-left w-[38rem] h-[25rem]"> 

                            <div class="flex flex-row justify-between items-center opacity-90 text-[17px] font-bold tracking-wide ml-2 w-[37rem]">
                                YOUR TRADE OFFER

                                <div class="text-green-600">${{ this.offer.yourMoney }}</div> 
                            </div> 

                            <div class="flex justify-start items-start text-center h-[31.5rem]">   
                                <div class="flex justify-start items-start flex-wrap max-w-[40rem] max-h-[21.5rem] overflow-y-scroll mt-2">
                                    <div class="hover-text ml-2 flex flex-col justify-center items-center w-[7rem] h-[7rem] bg-[rgba(120,99,212,0.04)] border-[3px] border-[rgba(120,99,212,0.25)] rounded droppableTrade" v-for="(item, index) in 15" :class="{'!mt-1': index > 4}" v-bind:key="item" v-bind:item="item" data-parent="add-item">    
                                        <div v-if="this.offer.yourOffer[index]" class="flex w-full h-full justify-center items-end" :class="{'!items-center': this.vehiclesData.includes(this.offer.yourOffer[index].name.toLowerCase())}">
                                            <img v-if="this.vehiclesData.includes(this.offer.yourOffer[index].name.toLowerCase())" width="70" height="70" v-bind:id="this.offer.yourOffer[index].id" v-bind:src="'https://www.pro-gaming.ro/vehicles/' + this.offer.yourOffer[index].name + '.png'" draggable="false">   
                                            <img v-else-if="!this.vehiclesData.includes(this.offer.yourOffer[index].name.toLowerCase())" class="w-[64px] h-[64px] bottom-[0.50rem]" width="64" height="64" v-bind:id="this.offer.yourOffer[index].id" :src="itemsImage[this.offer.yourOffer[index].image.replace('.png', '')]" draggable="false">   
                                        </div>

 
                                        <div v-if="this.offer.yourOffer[index] && !this.vehiclesData.includes(this.offer.yourOffer[index].name)" class="opacity-70 text-[15px] font-bold text-right w-[93%]" :style="{'visibility': this.offer.yourOffer[index].count == 1 ? 'hidden' : ''}">{{this.offer.yourOffer[index].count}}</div>  
                                        <span v-if="this.offer.yourOffer[index]" class="tooltip-text absolute font-inter font-bold rounded tracking-wide bg-white text-black flex justify-center items-center mt-[7rem]">{{this.offer.yourOffer[index].name}}</span>    
                                    </div>  
                                </div> 
                            </div> 
                        </div>  

                        <div v-show="!this.offer.tradeTime" class="flex flex-row flex-wrap justify-evenly items-start text-left w-[38rem] h-[40rem] font-medium"> 

                            <div @click="this.showModal(true, 'money', 'trade money', 'Enter the amount of money you want to trade.');" class="flex flex-col justify-center items-center w-[10rem] h-[7rem] mt-2 text-green-600 hover:text-green-500"> 
                                <i class="fa-solid fa-sack-dollar text-[3rem]"></i> 
                                <div class="font-semibold text-[18px] tracking-wide">Add money</div> 
                            </div>

                            <div @click="this.showModal(true, 'vehicles', 'trade vehicles', 'Select the vehicle you want to add in trade.');" class="flex flex-col justify-center items-center w-[10rem] h-[7rem] mt-2  text-yellow-600 hover:text-yellow-500"> 
                                <i class="fa-solid fa-car text-[3rem]"></i> 
                                <div class="font-semibold text-[18px] tracking-wide">Add vehicle</div> 
                            </div>

                            <div @click="this.addHouse();" class="flex flex-col justify-center items-center w-[10rem] h-[7rem] mt-2  text-red-400 hover:text-red-500"> 
                                <i class="fa-solid fa-house text-[3rem]"></i> 
                                <div class="font-semibold text-[18px] tracking-wide">Add house</div> 
                            </div>
  
                            <div @click="this.switchTradeStatus();" class="flex flex-col justify-end items-center w-[10rem] h-[7rem] mt-2  text-green-600 hover:text-green-500"> 
                                <i class="fa-solid fa-check text-[3rem]"></i> 
                                <div class="font-semibold text-[18px] tracking-wide">Ready</div> 
                            </div>

                            <div @click="this.showModal(true, 'clear', 'clear offer', 'Are you sure you want to delete the current offer?');" class="flex flex-col justify-end items-center w-[10rem] h-[7rem] mt-2  text-purple-500 hover:text-purple-400"> 
                                <i class="fa-regular fa-handshake text-[3rem]"></i> 
                                <div class="font-semibold text-[18px] tracking-wide">Clear</div> 
                            </div>
                        </div>  
 
                        <div v-show="this.offer.tradeTime > 0" class="flex flex-col justify-center items-center text-center w-[38rem] h-[40rem]">  
                            <i class="fa-solid fa-handshake text-[5rem]"></i>
  
                            <div class="font-medium text-[22px] tracking-wider">
                                Item exchange in <span class="text-yellow-600 font-bold">{{this.formatMinutes(this.offer.tradeTime)}}</span> 
                            </div>

                            <div class="font-medium text-[15px] tracking-wider">Press ESCAPE to cancel.</div>
                        </div>   
                    </div>  

                    <div class="flex flex-col justify-start items-start text-left w-[38rem] h-[40rem] ml-[20px]"> 
                        <div class="flex flex-col justify-start items-start text-left w-[38rem] h-[25rem]">  

                            <div class="flex flex-row justify-between items-center opacity-90 text-[17px] font-bold tracking-wide ml-2 w-[37rem]">
                                {{ this.offer.hisName.toUpperCase() }}'S TRADE OFFER

                                <div class="text-green-600">${{ this.offer.hisMoney }}</div> 
                            </div> 

                            <div class="flex justify-start items-start text-center h-[31.5rem]">   
                                <div class="flex justify-start items-start flex-wrap max-w-[40rem] max-h-[21.5rem] overflow-y-scroll mt-2">
                                    <div class="hover-text ml-2 flex flex-col justify-center items-center w-[7rem] h-[7rem] bg-[rgba(120,99,212,0.04)] border-[3px] border-[rgba(120,99,212,0.25)] rounded droppableTrade" v-for="(item, index) in 15" :class="{'!mt-1': index > 4}" v-bind:key="item" v-bind:item="item">    
                                        <div v-if="this.offer.hisOffer[index]" class="flex w-full h-full justify-center items-end">
                                            <img class="w-[64px] h-[64px] bottom-[0.50rem]" width="64" height="64" v-bind:id="this.offer.hisOffer[index].id" :src="itemsImage[this.offer.hisOffer[index].image.replace('.png', '')]" draggable="false">   
                                        </div>

                                        <div v-if="this.offer.hisOffer[index]" class="opacity-70 text-[15px] font-bold text-right w-[93%]" :style="{'visibility': this.offer.hisOffer[index].count == 1 ? 'hidden' : ''}">{{this.offer.hisOffer[index].count}}</div>  
                                        <span v-if="this.offer.hisOffer[index]" class="tooltip-text absolute font-inter font-bold rounded tracking-wide bg-white text-black flex justify-center items-center mt-[7rem]">{{this.offer.hisOffer[index].name}}</span>    
                                    </div>  
                                </div> 
                            </div> 
                        </div>  
                        
                        <div class="flex flex-col justify-center items-center w-[38rem] h-[40rem] font-medium">  
                            <div class="flex flex-row justify-between items-center opacity-90 text-[17px] font-bold tracking-wide ml-2 w-[37rem]">
                                TRADE CHAT 
                            </div>  

                            <div class="flex justify-start items-start text-left h-[18rem] w-[37rem] border-[3px] border-[rgba(120,99,212,0.25)] rounded-t-md">    
                                
                                <div class="flex flex-col justify-start items-start text-left h-[16.7rem] w-[37rem] p-2 overflow-y-scroll">    
                                    <div class="font-medium opacity-70 text-[17px] tracking-wide w-full" v-for="(item) in this.tradeChat.messages" :key="item">{{item}}</div> 
                                </div>   
                            </div>  

                            <input v-on:keyup.enter="this.sendTradeMessage()" spellcheck="false" class="h-[3.2rem] w-[37rem] border-b-[3px] border-l-[3px] border-r-[3px] border-[rgba(120,99,212,0.25)] rounded-b-md text-white opacity-70 font-semibold tracking-wider text-[16px] bg-transparent px-2" type="name" placeholder="Type your message" v-model="this.tradeChat.input" v-model.number="this.tradeChat.input" onkeyup="this.value">
                        </div>  
                    </div>  
                </div>  
            </div>
        </div>    
    </div>    
</template>
  
<script> 
    const audio = new Audio("http://codeskulptor-demos.commondatastorage.googleapis.com/pang/pop.mp3");

    export default {
        name: 'TradeComponent',

        data: function() {
            return {  

                vehiclesData: ["giulia", "impaler3", "monster4", "monster5", "slamvan6", "issi6", "cerberus2", "cerberus3", "deathbike2", "dominator6", "deathbike3", "impaler4", "slamvan4", "slamvan5", "brutus", "brutus2", "brutus3", "deathbike", "dominator4", "dominator5", "bruiser", "bruiser2", "bruiser3", "rcbandito", "italigto", "cerberus", "impaler2", "monster3", "tulip", "scarab", "scarab2", "scarab3", "issi4", "issi5", "clique", "deveste", "vamos", "imperator", "imperator2", "imperator3", "toros", "deviant", "schlagen", "impaler", "zr380", "zr3802", "zr3803", "dinghy", "dinghy2", "dinghy3", "dinghy4", "jetmax", "marquis", "seashark", "seashark2", "seashark3", "speeder", "speeder2", "squalo", "submersible", "submersible2", "suntrap", "toro", "toro2", "tropic", "tropic2", "tug", "benson", "biff", "hauler", "hauler2", "mule", "mule2", "mule3", "mule4", "packer", "phantom", "phantom2", "phantom3", "pounder", "pounder2", "stockade", "stockade3", "terbyte", "blista", "brioso", "dilettante", "dilettante2", "issi2", "panto", "prairie", "rhapsody", "cogcabrio", "exemplar", "f620", "felon", "felon2", "jackal", "oracle", "oracle2", "sentinel", "sentinel2", "windsor", "windsor2", "zion", "zion2", "bmx", "cruiser", "fixter", "scorcher", "tribike", "tribike2", "tribike3", "ambulance", "fbi", "fbi2", "firetruk", "lguard", "pbus", "police", "police2", "police3", "police4", "policeb", "polmav", "policeold1", "policeold2", "policet", "pranger", "predator", "riot", "riot2", "sheriff", "sheriff2", "akula", "annihilator", "buzzard", "buzzard2", "cargobob", "cargobob2", "cargobob3", "cargobob4", "frogger", "frogger2", "havok", "hunter", "maverick", "savage", "skylift", "supervolito", "supervolito2", "swift", "swift2", "valkyrie", "valkyrie2", "volatus", "bulldozer", "cutter", "dump", "flatbed", "guardian", "handler", "mixer", "mixer2", "rubble", "tiptruck", "tiptruck2", "apc", "barracks", "barracks2", "barracks3", "barrage", "chernobog", "crusader", "halftrack", "khanjali", "rhino", "thruster", "trailersmall2", "akuma", "avarus", "bagger", "bati", "bati2", "bf400", "carbonrs", "chimera", "cliffhanger", "daemon", "daemon2", "defiler", "diablous", "diablous2", "double", "enduro", "esskey", "faggio", "faggio2", "faggio3", "fcr", "fcr2", "gargoyle", "hakuchou", "hakuchou2", "hexer", "innovation", "lectro", "manchez", "nemesis", "nightblade", "oppressor", "oppressor2", "pcj", "ratbike", "ruffian", "sanchez2", "sanctus", "shotaro", "sovereign", "thrust", "vader", "vindicator", "vortex", "wolfsbane", "zombiea", "zombieb", "blade", "buccaneer", "buccaneer2", "chino", "chino2", "coquette3", "dominator", "dominator2", "dukes", "dukes2", "faction", "faction2", "faction3", "gauntlet", "gauntlet2", "hermes", "hotknife", "lurcher", "moonbeam", "moonbeam2", "nightshade", "pheonix", "picador", "ratloader", "ratloader2", "ruiner", "ruiner2", "ruiner3", "sabregt", "sabregt2", "slamvan", "slamvan2", "slamvan3", "stalion", "stalion2", "tampa", "tampa3", "vigero", "virgo", "virgo2", "virgo3", "voodoo", "voodoo2", "yosemite", "bfinjection", "bifta", "blazer", "blazer2", "blazer3", "blazer4", "blazer5", "bodhi2", "brawler", "dloader", "dubsta3", "dune", "dune2", "dune3", "dune4", "dune5", "freecrawler", "insurgent", "insurgent2", "insurgent3", "kalahari", "marshall", "mesa3", "monster", "menacer", "nightshark", "rancherxl", "rancherxl2", "rebel", "rebel2", "riata", "sandking", "sandking2", "technical", "technical2", "technical3", "trophytruck", "trophytruck2", "alphaz1", "avenger", "besra", "blimp", "blimp2", "blimp3", "bombushka", "cargoplane", "cuban800", "dodo", "duster", "howard", "hydra", "jet", "lazer", "luxor", "luxor2", "mammatus", "microlight", "miljet", "mogul", "molotok", "nimbus", "nokota", "pyro", "rogue", "seabreeze", "shamal", "starling", "strikeforce", "stunt", "titan", "tula", "velum", "velum2", "vestra", "volatol", "baller", "baller2", "baller3", "baller4", "baller5", "baller6", "bjxl", "cavalcade", "cavalcade2", "contender", "dubsta", "dubsta2", "fq2", "granger", "gresley", "habanero", "huntley", "landstalker", "mesa", "mesa2", "patriot", "patriot2", "radi", "rocoto", "seminole", "serrano", "xls", "xls2", "asea", "asea2", "asterope", "cog55", "cog552", "cognoscenti", "cognoscenti2", "emperor", "emperor2", "emperor3", "fugitive", "glendale", "ingot", "intruder", "limo2", "premier", "primo", "primo2", "regina", "romero", "schafter2", "schafter5", "schafter6", "stafford", "stanier", "stratum", "stretch", "superd", "surge", "tailgater", "warrener", "washington", "airbus", "brickade", "bus", "coach", "pbus2", "rallytruck", "rentalbus", "taxi", "tourbus", "trash", "trash2", "wastelander", "alpha", "banshee", "bestiagts", "blista2", "blista3", "buffalo", "buffalo2", "buffalo3", "carbonizzare", "comet2", "comet3", "comet4", "coquette", "elegy", "elegy2", "feltzer2", "furoregt", "fusilade", "futo", "jester", "jester2", "khamelion", "kuruma", "kuruma2", "lynx2", "massacro", "massacro2", "neon", "ninef", "ninef2", "omnis", "pariah", "penumbra", "raiden", "rapidgt", "rapidgt2", "raptor", "revolter", "ruston", "schafter3", "schafter4", "schwarzer", "sentinel3", "seven70", "specter", "specter2", "streiter", "sultan", "surano", "tampa2", "tropos", "verlierer2", "ardent", "btype", "btype2", "btype3", "casco", "cheetah2", "coquette2", "deluxo", "feltzer3", "gt500", "infernus2", "jb700", "mamba", "manana", "monroe", "peyote", "pigalle", "rapidgt3", "retinue", "savestra", "stinger", "stingergt", "stromberg", "swinger", "torero", "tornado", "tornado2", "tornado3", "tornado4", "tornado5", "tornado6", "turismo2", "viseris", "ztype", "adder", "autarch", "banshee2", "bullet", "cheetah", "cyclone", "entityxf", "fmj", "gp1", "infernus", "italigtb", "italigtb2", "le7b", "nero", "nero2", "osiris", "penetrator", "pfister811", "prototipo", "reaper", "sc1", "scramjet", "sheava", "sultanrs", "t20", "tempesta", "turismor", "tyrus", "vacca", "vagner", "vigilante", "visione", "voltic", "voltic2", "xa21", "zentorno", "armytanker", "armytrailer2", "baletrailer", "boattrailer", "cablecar", "docktrailer", "graintrailer", "proptrailer", "raketrailer", "tr2", "tr3", "tr4", "trflat", "tvtrailer", "tanker", "tanker2", "trailerlogs", "trailersmall", "trailers", "trailers2", "trailers3", "freight", "freightcar", "freightcont1", "freightcont2", "freightgrain", "tankercar", "airtug", "caddy", "caddy2", "caddy3", "docktug", "forklift", "mower", "ripley", "sadler", "sadler2", "scrap", "towtruck", "towtruck2", "tractor", "tractor2", "tractor3", "utillitruck", "utillitruck2", "utillitruck3", "bison", "bison2", "bison3", "bobcatxl", "boxville", "boxville2", "boxville3", "boxville4", "boxville5", "burrito", "burrito2", "burrito3", "burrito4", "burrito5", "camper", "gburrito", "gburrito2", "journey", "minivan", "minivan2", "paradise", "pony", "pony2", "rumpo", "rumpo2", "rumpo3", "speedo", "speedo2", "speedo4", "surfer", "surfer2", "taco", "youga", "youga2", "rs7c8", "bmwm4cs", "zx10r22", "senna", "camry70", "lhuracan", "2021jettasel", "e34", "mercedesbenz", "G770", "priustaxi", "m4comp", "octavia", "lx2018"],
                itemsImage: {  
                    'hat':       'https://i.imgur.com/ONJ5uJB.png', 'jacket':    'https://i.imgur.com/xMCo5jW.png',
                    'jeans':     'https://i.imgur.com/U9NGDVM.png', 'watch':     'https://i.imgur.com/WX6U5ph.png',
                    'mask':      'https://i.imgur.com/O6yWn79.png', 'glasses':   'https://i.imgur.com/ykB4P4a.png',
                    'bracelet':  'https://i.imgur.com/a1XLkEY.png', 'shoes':     'https://i.imgur.com/cJKdDr3.png', 
                    'gift':      'https://i.imgur.com/V26fbn4.png', 'gascan':    'https://i.imgur.com/ua4Tc7G.png',
                    'cola':      'https://i.imgur.com/msEEn2v.png', 'chocolate': 'https://i.imgur.com/f7Mi7GW.png',
                    'beer':      'https://i.imgur.com/5ZPla12.png', 'aspirine':  'https://i.imgur.com/nq4swPu.png', 
                    'hamburger': 'https://i.imgur.com/xyFGhdh.png', 'hotdog':    'https://i.imgur.com/TtaXw0G.png',
                    'medkit':    'https://i.imgur.com/Noy29bM.png', 'milk':      'https://i.imgur.com/f85bibg.png', 
                    'phone':     'https://i.imgur.com/XjH9kpx.png', 'pizza':     'https://i.imgur.com/hlrJkSs.png',
                    'repairkit': 'https://i.imgur.com/6BN4gSO.png', 'sandwich':  'https://i.imgur.com/4VQH3vw.png',
                    'seeds':     'https://i.imgur.com/kaINC4E.png', 'phonebook': 'https://i.imgur.com/t8jV1e8.png',
                    'sprite':    'https://i.imgur.com/YLKS3XA.png', 'walkie':    'https://i.imgur.com/kxgZvGH.png', 
                }, 
  
                tradeChat: {
                    input: '',
                    messages: [], 
                },

                offer: {
                    inventory: [],
                    vehicles: [],

                    yourName: 'undefined',
                    yourOffer: [],
                    yourMoney: 0,
                    house: null,
                      
                    hisName: 'undefined',
                    hisOffer: [],
                    hisMoney: 0,

                    ready: false,
                    tradeInterval: null,
                    tradeTime: 0
                },
 
                modal: { 
                    status: false, 
                    title: '',
                    description: '',
                    input: '',
                    option: '',
                    selected: null,
                },
 
                itemSelectedTwo: null,   
                tradeState: { droppable: null },    
                tradeItemSelected: {} 
            };
        },    

        mounted() { 
            window.TradeComponent = this;  

            if(window.mp) 
            {
                window.e_rpc.add('web::trade::reloadYourOffer', (data) => {   
                    this.offer = JSON.parse(data);

                    this.$forceUpdate(); 
                }); 

                window.e_rpc.add('web::trade::pushMessage', (message) => { 
                    message = JSON.parse(message);

                    this.tradeChat.messages.push(message);
                }); 

                window.e_rpc.add('web::trade::changeTradeTimer', (time) => {  
                    this.offer.tradeTime = time;
                });  
            } 
        },

        methods: 
        { 
            open(items) {
                this.offer = items;

                this.tradeChat = {
                    input: '',
                    messages: [] 
                };

                this.modal = { 
                    status: false, 
                    title: '',
                    description: '',
                    input: '',
                    option: '',
                    selected: null,
                };
 
                this.itemSelectedTwo = null;   
                this.tradeState = { droppable: null }; 
                this.tradeItemSelected = {};
            },

            addHouse() {
                if(this.offer.house == null && window.mp)
                    return window.e_trigger('client::hud:sendNotify', 'error', 'You dont have a house.', 'Trade:');

                return this.showModal(true, 'house', 'trade house', `Are you sure you want to put house #${this.offer.house} in trade?`);
            },

            showModal(status, option = '', title = '', description = '') {
                this.modal = { 
                    status: status, 
                    title: title,
                    description: description,
                    option: option, 
                    
                    input: '',
                    selected: null,
                };
            },
            
            moveTradeItem(event, item) { 
                event.preventDefault();
 
                if(event.which != 1 || !Object.keys(item).length)
                    return;
 
                const element = document.getElementById(item.id); 
                let clone = element.cloneNode(true);
                clone.canDrop = true;
                  
                clone.style.position = 'absolute'
                clone.style.zIndex = 1000 

                document.body.append(clone);

                let that = this;
                that.tradeState.droppable = null; 
                this.itemSelectedTwo = item;    
 
                moveAt(event.clientX, event.clientY);
                    
                function moveAt(offsetX, offsetY) { 
                    clone.style.left = offsetX - 20 + 'px'
                    clone.style.top = offsetY + 'px'
                } 

                function onMouseMoveTrade(event) {
                    moveAt(event.clientX, event.clientY);
 
                    clone.hidden = true;
                    let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
                    clone.hidden = false;
                      
                    if(!elemBelow) return;

                    let droppableBelow = elemBelow.closest('.droppableTrade')
                    let currentDroppable = that.tradeState.droppable;
  
                    if(currentDroppable !== droppableBelow) {
                        if(currentDroppable) {
                            that.tradeState.droppable = null; 
                        }

                        currentDroppable = droppableBelow

                        if(currentDroppable) {
                            that.tradeState.droppable = currentDroppable;
                        }
                    } 
                }

                document.addEventListener('mousemove', onMouseMoveTrade);   
                document.onmouseup = function() {
                    try 
                    {
                        if(clone.canDrop) {   
                            document.removeEventListener('mousemove', onMouseMoveTrade);
                            clone.onmouseup = null;
                            clone.canDrop = false; 
                            clone.remove(); 

                            that.dropTradeItem();   
                            that.itemSelectedTwo = null;  
                        }
                    }
                    catch(error) { console.log(error) }
                };
            }, 

            dropTradeItem() 
            { 
                try 
                {
                    if(!this.tradeState.droppable) 
                        return console.log('DnD Inventory: Incorrect droppable element.');

                    audio.play();
                    audio.volume = 0.3;
  
                    const item = this.itemSelectedTwo; 
                    switch(this.tradeState.droppable.dataset.parent)
                    { 
                        case 'add-item': {
                            this.tradeItemSelected = item;
                            this.showModal(true, 'put', 'TRADE OFFER', `You're about to put this ${item.name} in trade offer. Are you sure you want to do this?`); 
                            break;   
                        }  
                    } 
                } 
                catch(error) {console.log('error')}
            },

            executeTradeModal() {  
                if(this.modal.option == 'money' && window.mp) {
                    window.e_rpc('server::trade:addMoney', this.modal.input);
                }

                if(this.modal.option == 'clear' && window.mp) {
                    window.e_rpc('server::trade:clearOffer');
                }

                if(this.modal.option == 'house' && window.mp) {
                    if(this.offer.house == null && window.mp)
                        return window.e_trigger('client::hud:sendNotify', 'error', 'You dont have a house.', 'Trade:');

                    window.e_rpc('server::trade:addHouse');
                }

                if(this.modal.option == 'vehicles' && window.mp) {

                    let raw = this.modal.selected; 
                    let index = this.offer.yourOffer.findIndex(object => object.name == raw.name && object.odometer == raw.odometer && object.days == raw.days && object.id == raw.id);
  
                    if(index != -1 && window.mp) {
                        this.showModal(false, '', '');
                        return window.e_trigger('client::hud:sendNotify', 'error', 'This vehicle is already in offer.', 'Trade:');
                    } 

                    window.e_rpc('server::trade:addVehicle', JSON.stringify(this.modal.selected));
                }
 
                if(!this.tradeItemSelected)
                    return;

                if(this.tradeItemSelected.id != null) {
                    switch(this.modal.option)
                    {
                        case 'put': { 

                            if(this.tradeItemSelected.count > 1 && !this.modal.input)
                                return;

                            if(this.tradeItemSelected.count < this.modal.input && window.mp)
                                return window.e_trigger('client::hud:sendNotify', 'error', 'You dont have this amount.', 'Trade:');
   
                            if(window.mp) {
                                window.e_rpc('server::trade:putItem', JSON.stringify({ item: this.tradeItemSelected, count: (this.tradeItemSelected.count > 1 ? this.modal.input : this.tradeItemSelected.count) }));
                            }
                            break;
                        }  
                    }
                }
 
                this.showModal(false, '', '');
            },

            closeTrade()
            {  
                if(window.mp) {
                    window.e_rpc('server::trade:close');  
                }
            },

            switchTradeStatus()
            {
                if(window.mp) {
                    window.e_rpc('server::trade:switchTradeStatus');  
                } 
            },

            selectTradeVehicle(item)
            {
                if(this.modal.selected == item) {
                    return this.modal.selected = null;
                }
 
                return this.modal.selected = item;
            },
 
            sendTradeMessage() {
                let value = this.tradeChat.input;

                if(value && value.length > 0 && window.mp) { 
                    window.e_rpc('server::trade:sendTradeMessage', value);   
                }

                this.tradeChat.input = '';
            },

            formatKM(x) { 
                return x.toString().replace(/\B(?=(\d{2})+(?!\d))/g, ".")
            },

            formatMinutes(seconds) {
                return [ parseInt(seconds / 60 % 60), parseInt(seconds % 60) ].join(":").replace(/\b(\d)\b/g, "0$1")
            }, 
        } 
    }
</script>