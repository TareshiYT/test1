<style>@import './assets/style.css';</style>

<template> 
    <body>  
        <div class="character-container">
            <div class="character-creator-effect"></div>

            <div class="character-title"> 
                <div class="title">CHARACTER</div>
                <div class="subtitle">CREATOR</div> 
            </div>

            <div class="character-creator-scrollable"> 
                <div class="character-gender"> 
                    <div class="title">Gender</div>
                    <div class="subtitle">Select your character's gender.</div> 

                    <div class="buttons"> 
                        <div class="button" @click="changeGender(true)" :class="{active: gender}"><i style="margin-right: 3px;" class="fa-solid fa-mars-stroke"></i> Male</div>
                        <div class="button" @click="changeGender(false)" :class="{active: !gender}" style="margin-left: 10px;"><i style="margin-right: 3px;" class="fa-solid fa-venus"></i> Female</div>
                    </div>
                </div>
    
                <div class="character-parents"> 
                    <div class="title">Parents</div>
                    <div class="subtitle">Select your character's parents. This will allow you to dictate what trails your character is inheriting.</div> 

                    <div class="character-parents-image"> 
                        <img :src="parentsImages['mother'][mother]"> 
                        <img :src="parentsImages['father'][father]"> 
                    </div>
    
                    <div class="character-parents-change"> 
                        <div class="buttons"> 
                            <div class="button-click" @click="changeParents('back', 'mother')"><i class="fa-solid fa-angle-left"></i></div> 
                            <div class="button">{{mothersData[mother]}}</div> 
                            <div class="button-click" @click="changeParents('next', 'mother')"><i class="fa-solid fa-angle-right"></i></div>
                        </div> 

                        <div class="buttons"> 
                            <div class="button-click" @click="changeParents('back', 'father')"><i class="fa-solid fa-angle-left"></i></div> 
                            <div class="button">{{fathersData[father]}}</div> 
                            <div class="button-click" @click="changeParents('next', 'father')"><i class="fa-solid fa-angle-right"></i></div>
                        </div>
                    </div> 

                    <div class="character-parents-resemblance"> 
                        <div class="title">Resemblance:</div>

                        <div class="buttons"> 
                            <div class="button"><i class="fa-solid fa-venus"></i> </div> 
                            <input class="character-slider" type="range" step="0.1" min="0" max="1.0" v-model="resemblance" @change="updateSlider($event, 'resemblance')"> 
                            <div class="button"><i class="fa-solid fa-mars-stroke"></i></div> 
                        </div> 
                    </div>
                </div> 

                <div class="character-eyes"> 
                    <div class="title">Eyes</div>
                    <div class="subtitle">Pick your favorite eye color and size.</div> 


                    <div class="character-parents-eyes-scale"> 
                        <div class="title">Scale:</div>

                        <div class="buttons"> 
                            <div class="button"><i class="fa-solid fa-circle-minus"></i></div> 

                            <input class="character-slider" type="range" step="0.1" min="-1" max="1" v-model="eyeScale" @change="updateSlider($event, 'eyeScale')">

                            <div class="button"><i class="fa-solid fa-circle-plus"></i></div>
                        </div> 
                    </div>

                    <div class="character-parents-eyes-color"> 
                        <div class="title">Color:</div>
    
                        <div class="buttons">  
                            <div class="button" @click="updateEyeColor(0)" id="Green" style="background-color: #009933;"><i v-if="eyeColor == 0" class="fa-solid fa-check"></i></div>
                            <div class="button" @click="updateEyeColor(1)" id="Emerald" style="background-color: #50c878;"><i v-if="eyeColor == 1" class="fa-solid fa-check"></i></div>
                            <div class="button" @click="updateEyeColor(2)" id="Cyan" style="background-color: #00FFFF;"><i v-if="eyeColor == 2" class="fa-solid fa-check"></i></div>
                            <div class="button" @click="updateEyeColor(3)" id="Blue" style="background-color: #1a75ff;"><i v-if="eyeColor == 3" class="fa-solid fa-check"></i></div>
                            <div class="button" @click="updateEyeColor(4)" id="Brown" style="background-color: #964B00;"><i v-if="eyeColor == 4" class="fa-solid fa-check"></i></div>
                            <div class="button" @click="updateEyeColor(5)" id="Black" style="background-color: #000;"><i v-if="eyeColor == 5" class="fa-solid fa-check"></i></div>
                            <div class="button" @click="updateEyeColor(6)" id="Hazel" style="background-color: #eee8aa;"><i v-if="eyeColor == 6" class="fa-solid fa-check"></i></div>
                            <div class="button" @click="updateEyeColor(7)" id="Dark Grey" style="background-color: #5A5A5A;"><i v-if="eyeColor == 7" class="fa-solid fa-check"></i></div>  
                            <div class="button" @click="updateEyeColor(9)" id="Pink" style="background-color: #FF69B4;"><i v-if="eyeColor == 9" class="fa-solid fa-check"></i></div>
                            <div class="button" @click="updateEyeColor(10)" id="Yellow" style="background-color: #FFFF00;"><i v-if="eyeColor == 10" class="fa-solid fa-check"></i></div>  
                        </div> 
                    </div>
                </div>

                <div class="character-eyebrow"> 
                    <div class="title">Eyebrow</div>
                    <div class="subtitle">Choose your favorite eyebrow style.</div> 

                    <div class="character-eyebrow-change">

                        <div class="eyebrow-style">
                            <div class="title">Eyebrow:</div>

                            <div class="buttons"> 
                                <div class="button-click" @click="changeEyeBrow('back')"><i class="fa-solid fa-angle-left"></i></div> 
                                <div class="button">{{gender ? eyebrowMData[eyebrow] : eyebrowFData[eyebrow]}}</div> 
                                <div class="button-click" @click="changeEyeBrow('next')"><i class="fa-solid fa-angle-right"></i></div>
                            </div> 
                        </div> 

                        <div class="eyebrow-height">
                            <div class="title">Height:</div>

                            <div class="buttons"> 
                                <div class="button"><i class="fa-solid fa-circle-minus"></i></div> 

                                <input class="character-slider" type="range" step="0.1" min="-1" max="1" v-model="eyeBrowHeight" @change="updateSlider($event, 'eyeBrowHeight')">

                                <div class="button"><i class="fa-solid fa-circle-plus"></i></div>
                            </div> 
                        </div>
                        
                        <div class="eyebrow-height">
                            <div class="title">Dept:</div>

                            <div class="buttons"> 
                                <div class="button"><i class="fa-solid fa-circle-minus"></i></div> 

                                <input class="character-slider" type="range" step="0.1" min="-1" max="1" v-model="eyeBrowDept" @change="updateSlider($event, 'eyeBrowDept')">

                                <div class="button"><i class="fa-solid fa-circle-plus"></i></div>
                            </div> 
                        </div>
                    </div>
                </div>

                <div class="character-hair"> 
                    <div class="title">Hair</div>
                    <div class="subtitle">Choose your favorite hairstyle and beard shape.</div> 
 
                    <div class="character-hair-change">
                        <div class="hair-style">
                            <div class="title" style="font-size: 12px;">Hair Style:</div>

                            <div class="buttons"> 
                                <div class="button-click" @click="changeHair('back', 'hair')"><i class="fa-solid fa-angle-left"></i></div> 
                                <div class="button">{{gender ? hairMData[hairStyle] : hairFData[hairStyle]}}</div> 
                                <div class="button-click" @click="changeHair('next', 'hair')"><i class="fa-solid fa-angle-right"></i></div>
                            </div> 
                        </div> 

                        <div class="hair-style" style="margin-top: 20px;">
                            <div class="title" style="font-size: 12px;">Beard:</div>

                            <div class="buttons"> 
                                <div class="button-click" @click="changeHair('back', 'beard')"><i class="fa-solid fa-angle-left"></i></div> 
                                <div class="button">{{beardData[beardStyle]}}</div> 
                                <div class="button-click" @click="changeHair('next', 'beard')"><i class="fa-solid fa-angle-right"></i></div>
                            </div> 
                        </div> 

                        <div class="hair-style-color" style="margin-top: 20px;">
                            <div class="title" style="font-size: 12px;">Color:</div>

                            <div class="buttons-colors">
                                <div class="button" v-for="(item, index) in hairColorData" :key="item.id" :style="{'background-color': item.hex}" @click="changeHairColor(index)"><i v-if="hairColor == index" class="fa-solid fa-check"></i></div> 
                            </div> 
                        </div>   
                    </div>
                </div>

                <div class="character-nose-lip"> 
                    <div class="title">Nose & Lip</div>
                    <div class="subtitle">Edit your nose characteristics.</div>  
 
                    <div class="character-parents-nose-width" style="margin-top: 15px; "> 
                        <div class="title" style="font-size: 13px;">Nose Width:</div>

                        <div class="buttons"> 
                            <div class="button"><i class="fa-solid fa-circle-minus"></i></div>  
                            <input class="character-slider" type="range" step="0.1" min="-1" max="1" v-model="noseWidth" @change="updateSlider($event, 'noseWidth')"> 
                            <div class="button"><i class="fa-solid fa-circle-plus"></i></div>
                        </div> 
                    </div>

                    <div class="character-parents-nose-width" style="margin-top: 15px; "> 
                        <div class="title" style="font-size: 13px;">Nose Height:</div>

                        <div class="buttons"> 
                            <div class="button"><i class="fa-solid fa-circle-minus"></i></div>  
                            <input class="character-slider" type="range" step="0.1" min="-1" max="1" v-model="noseHeight" @change="updateSlider($event, 'noseHeight')"> 
                            <div class="button"><i class="fa-solid fa-circle-plus"></i></div>
                        </div> 
                    </div>

                    <div class="character-parents-nose-width" style="margin-top: 15px; "> 
                        <div class="title" style="font-size: 13px;">Nose Tip Length:</div>

                        <div class="buttons"> 
                            <div class="button"><i class="fa-solid fa-circle-minus"></i></div>  
                            <input class="character-slider" type="range" step="0.1" min="-1" max="1" v-model="noseTipLength" @change="updateSlider($event, 'noseTipLength')"> 
                            <div class="button"><i class="fa-solid fa-circle-plus"></i></div>
                        </div> 
                    </div>

                    <div class="character-parents-nose-width" style="margin-top: 15px; "> 
                        <div class="title" style="font-size: 13px;">Nose Tip Height:</div>

                        <div class="buttons"> 
                            <div class="button"><i class="fa-solid fa-circle-minus"></i></div>  
                            <input class="character-slider" type="range" step="0.1" min="-1" max="1" v-model="noseTipHeight" @change="updateSlider($event, 'noseTipHeight')"> 
                            <div class="button"><i class="fa-solid fa-circle-plus"></i></div>
                        </div> 
                    </div>

                    <div class="character-parents-nose-width" style="margin-top: 15px; "> 
                        <div class="title" style="font-size: 13px;">Nose Depth:</div>

                        <div class="buttons"> 
                            <div class="button"><i class="fa-solid fa-circle-minus"></i></div>  
                            <input class="character-slider" type="range" step="0.1" min="-1" max="1" v-model="noseDepth" @change="updateSlider($event, 'noseDepth')"> 
                            <div class="button"><i class="fa-solid fa-circle-plus"></i></div>
                        </div> 
                    </div>

                    <div class="character-parents-nose-width" style="margin-top: 15px; "> 
                        <div class="title" style="font-size: 13px;">Nose Broke:</div>

                        <div class="buttons"> 
                            <div class="button"><i class="fa-solid fa-circle-minus"></i></div>  
                            <input class="character-slider" type="range" step="0.1" min="-1" max="1" v-model="noseBroke" @change="updateSlider($event, 'noseBroke')"> 
                            <div class="button"><i class="fa-solid fa-circle-plus"></i></div>
                        </div> 
                    </div>

                    <div class="character-parents-nose-width" style="margin-top: 15px; "> 
                        <div class="title" style="font-size: 13px;">Lip Thickness:</div>

                        <div class="buttons"> 
                            <div class="button"><i class="fa-solid fa-circle-minus"></i></div>  
                            <input class="character-slider" type="range" step="0.1" min="-1" max="1" v-model="lipThickness" @change="updateSlider($event, 'lipThickness')"> 
                            <div class="button"><i class="fa-solid fa-circle-plus"></i></div>
                        </div> 
                    </div>
                </div>

                <div class="character-nose-lip"> 
                    <div class="title">Cheekbone</div>
                    <div class="subtitle">Edit your cheeckbone characteristics.</div>  
 
                    <div class="character-parents-nose-width" style="margin-top: 15px; "> 
                        <div class="title" style="font-size: 13px;">Cheeckbone Width:</div>

                        <div class="buttons"> 
                            <div class="button"><i class="fa-solid fa-circle-minus"></i></div>  
                            <input class="character-slider" type="range" step="0.1" min="-1" max="1" v-model="cheekboneWidth" @change="updateSlider($event, 'cheekboneWidth')"> 
                            <div class="button"><i class="fa-solid fa-circle-plus"></i></div>
                        </div> 
                    </div>

                    <div class="character-parents-nose-width" style="margin-top: 15px; "> 
                        <div class="title" style="font-size: 13px;">Cheeckbone Height:</div>

                        <div class="buttons"> 
                            <div class="button"><i class="fa-solid fa-circle-minus"></i></div>  
                            <input class="character-slider" type="range" step="0.1" min="-1" max="1" v-model="cheekboneHeight" @change="updateSlider($event, 'cheekboneHeight')"> 
                            <div class="button"><i class="fa-solid fa-circle-plus"></i></div>
                        </div> 
                    </div>

                    <div class="character-parents-nose-width" style="margin-top: 15px; "> 
                        <div class="title" style="font-size: 13px;">Cheeckbone Depth:</div>

                        <div class="buttons"> 
                            <div class="button"><i class="fa-solid fa-circle-minus"></i></div>  
                            <input class="character-slider" type="range" step="0.1" min="-1" max="1" v-model="cheekDepth" @change="updateSlider($event, 'cheekDepth')"> 
                            <div class="button"><i class="fa-solid fa-circle-plus"></i></div>
                        </div> 
                    </div>
                </div>

                <div class="character-nose-lip"> 
                    <div class="title">Lower Face</div>
                    <div class="subtitle">Edit your lower face characteristics.</div>  
 
                    <div class="character-parents-nose-width" style="margin-top: 15px; "> 
                        <div class="title" style="font-size: 13px;">Neck:</div>

                        <div class="buttons"> 
                            <div class="button"><i class="fa-solid fa-circle-minus"></i></div>  
                            <input class="character-slider" type="range" step="0.1" min="-1" max="1" v-model="eyeScale" @change="updateSlider($event, 'neckWidth')"> 
                            <div class="button"><i class="fa-solid fa-circle-plus"></i></div>
                        </div> 
                    </div>

                    <div class="character-parents-nose-width" style="margin-top: 15px; "> 
                        <div class="title" style="font-size: 13px;">Jaw Width:</div>

                        <div class="buttons"> 
                            <div class="button"><i class="fa-solid fa-circle-minus"></i></div>  
                            <input class="character-slider" type="range" step="0.1" min="-1" max="1" v-model="jawWidth" @change="updateSlider($event, 'jawWidth')"> 
                            <div class="button"><i class="fa-solid fa-circle-plus"></i></div>
                        </div> 
                    </div>

                    <div class="character-parents-nose-width" style="margin-top: 15px; "> 
                        <div class="title" style="font-size: 13px;">Jaw Shape:</div>

                        <div class="buttons"> 
                            <div class="button"><i class="fa-solid fa-circle-minus"></i></div>  
                            <input class="character-slider" type="range" step="0.1" min="-1" max="1" v-model="jawShape" @change="updateSlider($event, 'jawShape')"> 
                            <div class="button"><i class="fa-solid fa-circle-plus"></i></div>
                        </div> 
                    </div>

                    <div class="character-parents-nose-width" style="margin-top: 15px; "> 
                        <div class="title" style="font-size: 13px;">Chin Height:</div>

                        <div class="buttons"> 
                            <div class="button"><i class="fa-solid fa-circle-minus"></i></div>  
                            <input class="character-slider" type="range" step="0.1" min="-1" max="1" v-model="chinHeight" @change="updateSlider($event, 'chinHeight')"> 
                            <div class="button"><i class="fa-solid fa-circle-plus"></i></div>
                        </div> 
                    </div>

                    <div class="character-parents-nose-width" style="margin-top: 15px; "> 
                        <div class="title" style="font-size: 13px;">Chin Depth:</div>

                        <div class="buttons"> 
                            <div class="button"><i class="fa-solid fa-circle-minus"></i></div>  
                            <input class="character-slider" type="range" step="0.1" min="-1" max="1" v-model="chinDepth" @change="updateSlider($event, 'chinDepth')"> 
                            <div class="button"><i class="fa-solid fa-circle-plus"></i></div>
                        </div> 
                    </div>

                    <div class="character-parents-nose-width" style="margin-top: 15px; "> 
                        <div class="title" style="font-size: 13px;">Chin Width:</div>

                        <div class="buttons"> 
                            <div class="button"><i class="fa-solid fa-circle-minus"></i></div>  
                            <input class="character-slider" type="range" step="0.1" min="-1" max="1" v-model="chinWidth" @change="updateSlider($event, 'chinWidth')"> 
                            <div class="button"><i class="fa-solid fa-circle-plus"></i></div>
                        </div> 
                    </div>

                    <div class="character-parents-nose-width" style="margin-top: 15px; "> 
                        <div class="title" style="font-size: 13px;">Chin Indent:</div>

                        <div class="buttons"> 
                            <div class="button"><i class="fa-solid fa-circle-minus"></i></div>  
                            <input class="character-slider" type="range" step="0.1" min="-1" max="1" v-model="chinIndent" @change="updateSlider($event, 'chinIndent')"> 
                            <div class="button"><i class="fa-solid fa-circle-plus"></i></div>
                        </div> 
                    </div>
                </div>
            </div>

            <div class="character-container-buttons"> 
                <div class="button" @click="saveCharacter();"><i style="margin-right: 5px;" class="fa-solid fa-angles-down"></i> Finish</div>
                <div class="button" @click="createRandom();"><i style="margin-right: 5px;" class="fa-solid fa-dice"></i> Random</div>
            </div> 
        </div> 
    </body>
</template>

<script> 
    export default {
        name: 'CharacterComponent',

        mounted() { window.CharacterComponent = this; },
        data: function() 
        {
            return {

                fathersData: ["Benjamin", "Daniel", "Joshua", "Noah", "Andrew", "Juan", "Alex", "Isaac", "Evan", "Ethan", "Vincent", "Angel", "Diego", "Adrian", "Gabriel", "Michael", "Santiago", "Kevin", "Louis", "Samuel", "Anthony", "Claude", "Niko"],
                mothersData: ["Hannah", "Aubrey", "Jasmine", "Gisele", "Amelia", "Isabella", "Zoe", "Ava", "Camila", "Violet", "Sophia", "Evelyn", "Nicole", "Ashley", "Gracie", "Brianna", "Natalie", "Olivia", "Elizabeth", "Charlotte", "Emma"],
                hairMData: ["None", "Haircut", "Faux Hawk", "Hipster", "Side Parting", "Cropped", "Biker", "Ponytail", "Pigtails", "Sleek", "Bob Haircut", " Spiky", 'Caesar', 'Chopped', 'Dreadlocks', 'Long Hair', 'Shaggy Curls', 'Surfer', 'Short Side Part', 'High Smooth Sides', 'Long Smooth', 'Hipster Youth', 'Mullet', 'Classic Braids', 'Palm Braids', 'Lightning Braids', 'Whipped Braids', 'Zigzag Braids', 'Snail Braids', 'High Top', 'Loose Comb Back', "Undercut Comb Back", "Cutted Combed Side", "Studded Mohawk", "Mod", "Layer Mod", "Flat Top"], //37
                hairFData: ["None", "Short", "Layered Bob", "Pigtails", "Ponytail", "Braided Mohawk", "Braids", "Bob", "Faux Hawk", "French Twist", "Long Bob", 'Loose Knotted', 'Pixie', 'Shaved Bangs', 'Top Knot', 'Wavy Bob', 'Messy Bun', 'Pinned Girl', 'Tight Bun', 'Twisted Bob', 'Flapper Bob', 'Big Bangs', 'Braided Top Knot', 'Mullet', 'Pinched Braids', 'Leaf Braids', 'Zigzag Braids', 'Braided Bangs', 'Wavy Braids', 'Spiral Braids', 'Curled Bangs', "Loose Slicked Back", "Cutted Swept Back", "Cutted Side Swept", "Studded Mohawk", "Bandana & Braid", "Layer Mod"], 
                beardData :["None", "Light Stubble", "Balbo", "Round Beard", "Goatee", "Chin", "Chin Down", "Chin Strap", "Sloppy", "Musketeer", "Moustache", "Corn beard", "Stubble", "Thin round beard", "Horseshoe", "Pencil and Chops", "Chin beard", "Balbo and Sideburns", "Lamb chops", "Sloppy beard", 'Curly', 'Deep Stranger', 'Helm', 'Faustic', 'Otto and Patch', 'Otto Stranger', 'Light Franz', 'Hampstead', 'Ambrose', "Lincoln's Curtain"],
  
                eyebrowMData: ["None", "Posed", "Trendy", "Cleopatra", "Mysterious", "Feminine", "Seductive", "Squeezed", "Chola", "Triumph", "Carefree", "Puffy", " Rodent", "Double Tram", "Slim", "Pencil", "Pinch Mother", "Straight & Narrow", "Natural", "Fluffy", "Untidy", "Caterpillar", "Regular", "Mediterranean", "Groomed", "Busheli", "Feathered", "Prickly", "One-browed", "Winged", "Triple Tram", "Arched Tram", "Cutouts", "Disappearing", "Solo Tram"] ,
                eyebrowFData: ["None", "Balanced", "Trendy", "Cleopatra", "Mysterious", "Female", "Seductive", "Squeezed", "Chola", "Triumph", "Carefree", "Puffy", " Rodent", "Double Tram", "Slim", "Pencil", "Pinch Mother", "Straight & Narrow", "Natural", "Fluffy", "Untidy", "Caterpillar", "Regular", "Mediterranean ", "Groomed", "Busheli", "Feathered", "Prickly", "One-browed", "Winged", "Triple tram", "Arched tram", "Cutouts", "Disappearing", "Solo tram"],
 
                hairColorData:  
                [ 
                   {id: 0,	hex: '#1c1f21'}, {id: 1,  hex: '#272a2c'}, {id: 2,	hex: '#312e2c'}, {id: 3,  hex: '#35261c'},	
                   {id: 4,	hex: '#4b321f'}, {id: 5,  hex: '#5c3b24'}, {id: 6,	hex: '#6d4c35'}, {id: 7,  hex: '#6b503b'},	
                   {id: 8,	hex: '#765c45'}, {id: 9,  hex: '#7f684e'}, {id: 10,	hex: '#99815d'}, {id: 11, hex: '#a79369'},
                   {id: 12,	hex: '#af9c70'}, {id: 13, hex: '#bba063'}, {id: 14,	hex: '#d6b97b'}, {id: 15, hex: '#dac38e'},
                   {id: 16,	hex: '#9f7f59'}, {id: 17, hex: '#845039'}, {id: 18,	hex: '#682b1f'}, {id: 19, hex: '#61120c'},
                   {id: 20,	hex: '#640f0a'}, {id: 21, hex: '#7c140f'}, {id: 22,	hex: '#a02e19'}, {id: 23, hex: '#b64b28'},	
                   {id: 24,	hex: '#a2502f'}, {id: 25, hex: '#aa4e2b'}, {id: 26,	hex: '#626262'}, {id: 27, hex: '#808080'},	
                   {id: 28,	hex: '#aaaaaa'}, {id: 29, hex: '#c5c5c5'}, {id: 30,	hex: '#463955'}, {id: 31, hex: '#5a3f6b'},
                   {id: 32,	hex: '#763c76'}, {id: 33, hex: '#ed74e3'}, {id: 34,	hex: '#eb4b93'}, {id: 35, hex: '#f299bc'},
                   {id: 36,	hex: '#04959e'}, {id: 37, hex: '#025f86'}, {id: 38,	hex: '#023974'}, {id: 39, hex: '#3fa16a'},
                   {id: 40,	hex: '#217c61'}, {id: 41, hex: '#185c55'}, {id: 42,	hex: '#b6c034'}, {id: 43, hex: '#70a90b'},
                   {id: 44,	hex: '#439d13'}, {id: 45, hex: '#dcb857'}, {id: 46,	hex: '#e5b103'}, {id: 47, hex: '#e69102'},
                   {id: 48,	hex: '#f28831'}, {id: 49, hex: '#fb8057'}, {id: 50,	hex: '#e28b58'}, {id: 51, hex: '#d1593c'},
                   {id: 52,	hex: '#ce3120'}, {id: 53, hex: '#ad0903'}, {id: 54,	hex: '#880302'}, {id: 55, hex: '#1f1814'},
                   {id: 56,	hex: '#291f19'}, {id: 57, hex: '#2e221b'}, {id: 58,	hex: '#37291e'}, {id: 59, hex: '#2e2218'},
                   {id: 60,	hex: '#231b15'}, {id: 61, hex: '#020202'}, {id: 62,	hex: '#706c66'}, {id: 63, hex: '#9d7a50'},
                ],

                parentsImages:
                { 
                    'mother':
                    [
                        'https://i.imgur.com/Ml3UpUt.png', 'https://i.imgur.com/lJJcFJb.png',
                        'https://i.imgur.com/7LpOUGv.png', 'https://i.imgur.com/mOK3Zl0.png',
                        'https://i.imgur.com/luzm6Qd.png', 'https://i.imgur.com/PovpwXx.png',
                        'https://i.imgur.com/czOtrk1.png', 'https://i.imgur.com/rZKDe1g.png',  
                        'https://i.imgur.com/ZbaGzFN.png', 'https://i.imgur.com/Tvwqbl5.png',
                        'https://i.imgur.com/8gltOrq.png', 'https://i.imgur.com/08nGedT.png',
                        'https://i.imgur.com/d7MzO7t.png', 'https://i.imgur.com/ChaHxdQ.png',
                        'https://i.imgur.com/qEgBkX0.png', 'https://i.imgur.com/hf8ijxE.png', 
                        'https://i.imgur.com/3mr8hcg.png', 'https://i.imgur.com/LATZNsC.png',
                        'https://i.imgur.com/JsnNI4f.png', 'https://i.imgur.com/gGZhP46.png',
                        'https://i.imgur.com/ootG7G4.png'
                    ],

                    'father':
                    [
                        'https://i.imgur.com/5rS8w74.png', 'https://i.imgur.com/f7iCOuh.png', 
                        'https://i.imgur.com/ciciB6J.png', 'https://i.imgur.com/8FlLoVW.png',
                        'https://i.imgur.com/iCsclhy.png', 'https://i.imgur.com/3ATSYl5.png',
                        'https://i.imgur.com/xBPKMsP.png', 'https://i.imgur.com/Q2I6y73.png',
                        'https://i.imgur.com/4eUFXEG.png', 'https://i.imgur.com/e58h2hm.png',
                        'https://i.imgur.com/lLFWP30.png', 'https://i.imgur.com/Q1Kg5hG.png',
                        'https://i.imgur.com/B9XmmHE.png', 'https://i.imgur.com/dibebet.png',
                        'https://i.imgur.com/RL2VCqQ.png', 'https://i.imgur.com/BoAwDnl.png',
                        'https://i.imgur.com/FyqUubN.png', 'https://i.imgur.com/KqRLA6Z.png',
                        'https://i.imgur.com/sq4hsWE.png', 'https://i.imgur.com/hauxf8k.png',
                        'https://i.imgur.com/PZbSgCn.png', 'https://i.imgur.com/JYUSnd8.png',
                        'https://i.imgur.com/327uWfw.png'
                    ] 
                },
  
                gender: true,
                resemblance: 0.5,

                mother: 0,
                father: 0,

                eyeScale: 0.1,
                eyeColor: 0, 

                eyebrow: 0,
                eyeBrowHeight: 0.1,
                eyeBrowDept: 0.1, 

                hairStyle: 0, 
                beardStyle: 0,
                hairColor: 0,

                noseWidth: 0.1,
                noseHeight: 0.1,
                noseTipLength: 0.1,
                noseTipHeight: 0.1,
                noseDepth: 0.1,
                noseBroke: 0.1,
                lipThickness: 0.1,
                cheekboneWidth: 0.1,
                cheekboneHeight: 0.1,
                cheekDepth: 0.1,
                neckWidth: 0.1, 
                jawWidth: 0.1,
                jawShape: 0.1,
                chinHeight: 0.1,
                chinDepth: 0.1,
                chinWidth: 0.1,
                chinIndent: 0.1
            };
        },    

         
        methods: 
        { 
            changeGender(gender)
            {
                this.gender = gender;

                if(gender == 0)
                {
                    this.beardStyle = 0;
                }

                return window.e_trigger('client::character:changeGender', (gender ? "Male" : 'Female'));
            },

            changeParents(option, parent)
            { 
                if(parent == 'father')
                {
                    if(option == 'back' && this.father > 0)
                    {
                        this.father --; 
                    } 

                    if(option == 'next' && this.father < this.fathersData.length - 1)
                    {
                        this.father ++;
                    }

                    return window.e_trigger('client::character:editCharacter', 'father', this.father);
                }
 
                if(parent == 'mother')
                {
                    if(option == 'back' && this.mother > 0)
                    {
                        this.mother --;
                    } 

                    if(option == 'next' && this.mother < this.mothersData.length - 1)
                    {
                        this.mother ++;
                    }

                    return window.e_trigger('client::character:editCharacter', 'mother', this.mother);
                } 
            },

            changeHair(option, parent)
            { 
                if(parent === 'hair')
                {
                    if(option === 'back' && this.hairStyle > 0)
                    {
                        this.hairStyle --;
                    }

                    if(option === 'next' && this.hairStyle < (this.gender ? this.hairMData.length - 1 : this.hairFData.length - 1))
                    {
                        this.hairStyle ++;
                    }  
 
                    return window.e_trigger('client::character:editCharacter', 'hair', this.hairStyle); 
                }
 
                if(parent === 'beard')
                {
                    if(option == 'back' && this.beardStyle > 0)
                    {
                        this.beardStyle --;
                    } 

                    if(option == 'next' && this.beardStyle < this.beardData.length - 1)
                    {
                        this.beardStyle ++;
                    } 

                    return window.e_trigger('client::character:editCharacter', 'beard', this.beardStyle);
                }  
            },

            changeHairColor(color)
            {
                this.hairColor = color;

                return window.e_trigger('client::character:editCharacter', 'hairColor', this.hairColor);
            },

            updateEyeColor(color)
            {
                this.eyeColor = color;

                return window.e_trigger('client::character:editCharacter', 'eyeColor', this.eyeColor);
            },

            changeEyeBrow(option)
            {
                if(option == 'back' && this.eyebrow > 0)
                {
                    this.eyebrow --;
                } 

                if(option == 'next' && this.eyebrow < (this.gender ? this.eyebrowMData.length - 1 : this.eyebrowFData.length - 1))
                {
                    this.eyebrow ++;
                } 

                return window.e_trigger('client::character:editCharacter', 'eyebrows', this.eyebrow);
            },
 
            updateSlider(event, component) 
            {
                switch(component)
                {
                    case 'resemblance': this.resemblance = event.target.value; break; 
                    case 'eyeScale': this.eyeScale = event.target.value; break; 
                    case 'eyeBrowHeight': this.eyeBrowHeight = event.target.value; break;  
                    case 'eyeBrowDept': this.eyeBrowDept = event.target.value; break;

                    case 'noseWidth': this.noseWidth = event.target.value; break; 
                    case 'noseHeight': this.noseHeight = event.target.value; break; 
                    case 'noseTipLength': this.noseTipLength = event.target.value; break;  
                    case 'noseTipHeight': this.noseTipHeight = event.target.value; break; 
                    case 'noseDepth': this.noseDepth = event.target.value; break; 
                    case 'noseBroke': this.noseBroke = event.target.value; break; 

                    case 'lipThickness': this.lipThickness = event.target.value; break;  
                   
                    case 'cheekboneWidth': this.cheekboneWidth = event.target.value; break;
                    case 'cheekboneHeight': this.cheekboneHeight = event.target.value; break;
                    case 'cheekDepth': this.cheekDepth = event.target.value; break;

                    case 'neckWidth': this.neckWidth = event.target.value; break;

                    case 'jawWidth': this.jawWidth = event.target.value; break;
                    case 'jawShape': this.jawShape = event.target.value; break;
                    
                    case 'chinHeight': this.chinHeight = event.target.value; break;
                    case 'chinDepth': this.chinDepth = event.target.value; break;
                    case 'chinWidth': this.chinWidth = event.target.value; break;
                    case 'chinIndent': this.chinIndent = event.target.value; break; 
                } 

                return window.e_trigger('client::character:editCharacter', component, event.target.value);
            },

            saveCharacter()
            {
                return window.e_trigger('client::character:saveData');
            },

            createRandom()
            {
                function random() 
                {
                    return (Math.random() * (1 - -1) + -1).toFixed(1);
                } 
    
                function randomInteger(min, max)
                {
                    let rand = min + Math.random() * (max - min);
                    return Math.round(rand);
                }

                try
                { 
                    this.resemblance = Number(random());
        
                    this.mother = randomInteger(0, 19);
                    this.father = randomInteger(0, 21);  

                    this.eyeBrowHeight = Number(random());
                    this.eyeBrowDept = Number(random());

                    this.noseWidth = Number(random())
                    this.noseHeight = Number(random())
                    this.noseTipLength = Number(random())
                    this.noseTipHeight = Number(random())
                    this.noseDepth = Number(random())
                    this.noseBroke = Number(random());

                    this.lipThickness = Number(random());
                
                    this.cheekboneWidth = Number(random());
                    this.cheekboneHeight = Number(random())
                    this.cheekDepth = Number(random())

                    this.neckWidth = Number(random()); 
                    
                    this.jawWidth = Number(random()); 
                    this.jawShape = Number(random());
                        
                    this.chinWidth = Number(random());
                    this.chinHeight = Number(random());
                    this.chinDepth = Number(random());
                    this.chinIndent = Number(random());

                    this.eyeScale = Number(random());
                    this.eyeColor = randomInteger(0, 10);
                    this.eyebrow = randomInteger(0, 34);

                    this.hairStyle = randomInteger(0, 36);
                    this.hairColor = randomInteger(0, 62);
                    this.beardStyle = (this.gender ? randomInteger(0, 29) : 0); 

                    let data = 
                    {
                        resemblance: this.resemblance, mother: this.mother, father: this.father, 
                        eyeBrowHeight: this.eyeBrowHeight, eyeBrowDept: this.eyeBrowDept, 
                        noseWidth: this.noseWidth, noseHeight: this.noseHeight,
                        noseTipLength: this.noseTipLength, noseTipHeight: this.noseTipHeight,
                        noseDepth: this.noseDepth, noseBroke: this.noseBroke, 
                        lipThickness: this.lipThickness, neckWidth: this.neckWidth, 
                        cheekboneWidth: this.cheekboneWidth, cheekboneHeight: this.cheekboneHeight, cheekDepth: this.cheekDepth, 
                        jawWidth: this.jawWidth, jawShape: this.jawShape, 
                        chinWidth: this.chinWidth, chinHeight: this.chinHeight, chinDepth: this.chinDepth, chinIndent: this.chinIndent, 
                        eyeScale: this.eyeScale, eyeColor: this.eyeColor, eyebrow: this.eyebrow, 
                        hairStyle: this.hairStyle, hairColor: this.hairColor, beardStyle: this.beardStyle,
                    }

                    return window.e_trigger('client::character:createRandom', JSON.stringify(data));
                } 
                catch(error) 
                {
                    console.log(error);
                }
            }
        }
    } 
</script> 