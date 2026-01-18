<style> 
    .tooltip-text {
        visibility: hidden; 

        padding: 2px 10px; 
        text-align: center;
    
        z-index: 9999;
    }
    
    .hover-text:hover .tooltip-text {
        visibility: visible;
        position: fixed;
    }
    
    .hover-text {
        position: relative; 
    }  
</style>

<template> 
    <!-- eslint-disable vue/no-use-v-if-with-v-for,vue/no-confusing-v-for-v-if -->   
    <div class="w-full h-full">   
        <div class="absolute text-white w-full h-full font-inter z-1 left-0 right-0" v-show="modal.status"> 
            <div class="global-modal-effect"></div> 
            
            <div class="absolute w-full h-full flex justify-center items-center text-center flex-col z-50 left-0 right-0" v-show="modal.option == 'drop'"> 
                <i class="fa-solid fa-triangle-exclamation text-orange-400 text-8xl"></i>
                <div class="font-bold text-3xl mt-3 text-orange-400">{{modal.title}}</div>  
                <div class="font-inter font-semibold text-normal tracking-wide mt-2 w-[24%]">{{modal.description}}</div> 
 
                <input spellcheck="false" type="number" placeholder="Enter amount" class="w-[23rem] h-10 bg-darkPurple text-white rounded-lg text-center font-medium tracking-normal mt-2 focus:border-2 border-violet-500 focus:rounded-full" v-model="this.modal.input" v-model.number="this.modal.input" onkeyup="this.value"> 
 
                <div class="flex flex-row justify-center items-center mt-6">  
                    <div class="flex justify-center items-center w-[9rem] h-[2.3rem] ml-2 rounded font-montserrat text-[15px] tracking-wide font-bold bg-orange-400 text-white" @click="executeModal()">YES</div>
                    <div class="flex justify-center items-center w-[9rem] h-[2.3rem] ml-2 rounded font-montserrat text-[15px] tracking-wide font-bold bg-orange-400 text-white" @click="closeModal()">NO</div>
                </div>   
            </div> 

            <div class="absolute w-full h-full flex justify-center items-center text-center flex-col z-50 left-0 right-0" v-if = "modal.category != '' && modal.option == 'inspect'"> 
                <img class="w-[5rem] h-[5rem]" v-if = "modal.category != ''" :src="itemsImage[modal.category][1]">
                <div class="text-[#d68b00] font-bold text-[25px] mt-2 tracking-wide">{{modal.title.toUpperCase()}}</div> 

                <div class="flex flex-row justify-center items-center mt-2">  
                    <div class="flex justify-center items-center w-[7.5rem] h-[2.2rem] ml-2 rounded font-montserrat text-[17px] font-bold bg-orange-600 text-black" @click="executeModal()">USE ITEM</div>
                    <div class="flex justify-center items-center w-[7.5rem] h-[2.2rem] ml-2 rounded font-montserrat text-[17px] font-bold bg-orange-600 text-black" @click="closeModal()">CLOSE</div>
                </div>
            </div> 
        </div> 

        <div class="w-full h-full flex justify-center items-center text-white" style="zoom: 80%;">    
            <div class="background-global-effect"></div> 
     
            <div class="flex flex-col justify-between w-full h-full pointer select-none font-montserrat"> 
                <div class="flex justify-center flex-row h-full w-full mt-[14%]">  
                    <div class="flex flex-col items-start text-left h-[35rem] mr-[20px]">
                        <div class="opacity-70 text-[17px] font-bold tracking-wide ">YOUR CHARACTER</div> 
                        <div class="flex justify-center items-center text-center h-[31.5rem]">   
                            <div class="flex flex-col text-center justify-center items-center"> 
                                <div class="flex justify-center items-center w-[7rem] h-[7rem] bg-[rgba(120,99,212,0.14)] border-[3px] border-[rgba(120,99,212,0.41)] rounded droppable hat" data-parent="equip" data-columns="hat">    
                                    <img class="w-[64px] h-[64px]" :src="itemsImage['hat'][Object.keys(attachedItems['hat']).length ? 1 : 0]" :style="{opacity: Object.keys(attachedItems['hat']).length ? '1': '0.2'}" draggable="false" v-on:mousedown="onMousedown($event, attachedItems['hat'], 'attached')">  
                                </div> 
                    
                                <div class="mt-2 flex justify-center items-center w-[7rem] h-[7rem] bg-[rgba(120,99,212,0.14)] border-[3px] border-[rgba(120,99,212,0.41)] rounded droppable droppable-jacket" data-parent="equip" data-columns="jacket">    
                                    <img class="w-[64px] h-[64px]" :src="itemsImage['jacket'][Object.keys(attachedItems['jacket']).length ? 1 : 0]" :style="{opacity: Object.keys(attachedItems['jacket']).length ? '1': '0.2'}" draggable="false" v-on:mousedown="onMousedown($event, attachedItems['jacket'], 'attached')">  
                                </div> 
                
                                <div class="mt-2 flex justify-center items-center w-[7rem] h-[7rem] bg-[rgba(120,99,212,0.14)] border-[3px] border-[rgba(120,99,212,0.41)] rounded droppable droppable-jeans" data-parent="equip" data-columns="jeans">   
                                    <img class="w-[64px] h-[64px]" :src="itemsImage['jeans'][Object.keys(attachedItems['jeans']).length ? 1 : 0]" :style="{opacity: Object.keys(attachedItems['jeans']).length ? '1': '0.2'}" draggable="false" v-on:mousedown="onMousedown($event, attachedItems['jeans'], 'attached')">  
                                </div> 
                    
                                <div class="mt-2 flex justify-center items-center w-[7rem] h-[7rem] bg-[rgba(120,99,212,0.14)] border-[3px] border-[rgba(120,99,212,0.41)] rounded droppable droppable-watch" data-parent="equip" data-columns="watch">   
                                    <img class="w-[64px] h-[64px]" :src="itemsImage['watch'][Object.keys(attachedItems['watch']).length ? 1 : 0]" :style="{opacity: Object.keys(attachedItems['watch']).length ? '1': '0.2'}" draggable="false" v-on:mousedown="onMousedown($event, attachedItems['watch'], 'attached')">  
                                </div> 
                            </div> 
    
                            <img class="w-[40rem] h-[75rem]" style="zoom: 40%;" src="https://i.imgur.com/9vMZEog.png"/>

                            <div class="flex flex-col text-center justify-center items-center"> 
                                <div class="flex justify-center items-center w-[7rem] h-[7rem] bg-[rgba(120,99,212,0.14)] border-[3px] border-[rgba(120,99,212,0.41)] rounded droppable droppable-mask" data-parent="equip" data-columns="mask">    
                                    <img class="w-[64px] h-[64px]" :src="itemsImage['mask'][Object.keys(attachedItems['mask']).length ? 1 : 0]" :style="{opacity: Object.keys(attachedItems['mask']).length ? '1': '0.2'}" draggable="false" v-on:mousedown="onMousedown($event, attachedItems['mask'], 'attached')">  
                                </div> 
                    
                                <div class="mt-2 flex justify-center items-center w-[7rem] h-[7rem] bg-[rgba(120,99,212,0.14)] border-[3px] border-[rgba(120,99,212,0.41)] rounded droppable droppable-glasses" data-parent="equip" data-columns="glasses">   
                                    <img class="w-[64px] h-[64px]" :src="itemsImage['glasses'][Object.keys(attachedItems['glasses']).length ? 1 : 0]" :style="{opacity: Object.keys(attachedItems['glasses']).length ? '1': '0.2'}" draggable="false" v-on:mousedown="onMousedown($event, attachedItems['glasses'], 'attached')">  
                                </div> 
                
                                <div class="mt-2 flex justify-center items-center w-[7rem] h-[7rem] bg-[rgba(120,99,212,0.14)] border-[3px] border-[rgba(120,99,212,0.41)] rounded droppable droppable-bracelet" data-parent="equip" data-columns="bracelet">   
                                    <img class="w-[64px] h-[64px]" :src="itemsImage['bracelet'][Object.keys(attachedItems['bracelet']).length ? 1 : 0]" :style="{opacity: Object.keys(attachedItems['bracelet']).length ? '1': '0.2'}" draggable="false" v-on:mousedown="onMousedown($event, attachedItems['bracelet'], 'attached')">  
                                </div> 
            
                                <div class="mt-2 flex justify-center items-center w-[7rem] h-[7rem] bg-[rgba(120,99,212,0.14)] border-[3px] border-[rgba(120,99,212,0.41)] rounded droppable droppable-shoes" data-parent="equip" data-columns="shoes">   
                                    <img class="w-[64px] h-[64px]" :src="itemsImage['shoes'][Object.keys(attachedItems['shoes']).length ? 1 : 0]" :style="{opacity: Object.keys(attachedItems['shoes']).length ? '1': '0.2'}" draggable="false" v-on:mousedown="onMousedown($event, attachedItems['shoes'], 'attached')">  
                                </div> 
                            </div> 
                        </div>
                    </div>
    
                    <div class="flex flex-col items-start text-left w-[38rem] h-[40rem] ml-[5px]">
                        <div class="opacity-70 text-[17px] font-bold tracking-wide ml-2">YOUR ITEMS</div> 
                        <div class="flex justify-start items-start text-center h-[31.5rem]">  
                        
                            <div class="flex justify-start items-start flex-wrap max-w-[40rem] max-h-[30rem] overflow-y-scroll mt-2">
                                <div class="hover-text ml-2 mt-2 flex flex-col justify-center items-center w-[7rem] h-[7rem] bg-[rgba(120,99,212,0.14)] border-[3px] border-[rgba(120,99,212,0.41)] rounded droppable" v-for="(item) in this.playerItems" v-bind:key="item" v-bind:item="item" data-parent="unequip">    
                                    <div class="flex w-full h-full justify-center items-end">
                                        <img class="w-[64px] h-[64px] bottom-[0.50rem]" width="64" height="64" v-bind:id="item.id" :src="itemsImage[item.image.replace('.png', '')][1]" draggable="false" @click.right.prevent="clickRightItem(item)" v-on:mousedown="onMousedown($event, item, 'detached', index)">   
                                    </div>

                                    <div class="opacity-70 text-[15px] font-bold text-right w-[93%]" :style="{'visibility': item.count == 1 ? 'hidden' : ''}">{{item.count}}</div>  
                                    <span class="tooltip-text absolute font-inter font-bold rounded tracking-wide bg-white text-black flex justify-center items-center mt-[7rem]">{{item.name}}</span>    
                                </div>  
                            </div> 
                        </div>
    
                        <div class=" flex flex-col justify-center items-center h-[3rem] w-[40rem]"> 
                            <div class="opacity-70 text-[16px] font-bold">{{playerItems.length}} / 50 SLOTS USED</div>  
                        
                            <div class="flex h-[1rem] flex-row justify-center items-center">
                                <div class="w-[25rem] h-[7px] bg-[rgba(65,59,180,0.411)] rounded ">
                                    <div :style="{width: playerItems.length * 8 + 'px'}" class="w-[10rem] h-[7px] bg-[#6b6bfa] rounded"></div>
                                </div>
                                <img src="https://i.imgur.com/Jnu6rTD.png" class="opacity-50 w-[2.5rem] ml-[10px]"> 
                            </div>  
                        </div>  
                    </div> 
 
                    <div class="flex flex-col items-start text-left w-[38rem] h-[45rem] ml-[22px]">
                        <div class="opacity-70 text-[17px] font-bold tracking-wide ml-2">NEARBY ITEMS</div> 
                        <div class="flex justify-start items-start text-center w-full h-[31.5rem]">  

                            <div class="flex justify-start items-start flex-wrap max-w-[40rem] max-h-[30rem] overflow-y-scroll mt-2"> 
                                <div class="ml-2 mt-2 flex flex-col justify-center items-center w-[7rem] h-[7rem] bg-[rgba(120,99,212,0.14)] border-[3px] border-[rgba(120,99,212,0.41)] rounded droppable" v-for="(item) in foundsObject" v-bind:key="item" v-bind:item="item" data-parent="pulamea"> 
                                    <div class="flex w-full h-full justify-center items-end">
                                        <img class="w-[64px] h-[64px] bottom-[0.50rem]" width="64" height="64" v-bind:id="item.id" :src="itemsImage[item.image.replace('.png', '')][1]" draggable="false" v-on:mousedown="onMousedown($event, item, 'found')">  
                                    </div>

                                    <div class="opacity-70 text-[15px] font-bold text-right w-[93%]" :style="{'visibility': item.count == 1 ? 'hidden' : ''}">{{item.count}}</div> 
                                    <span class="tooltip-text absolute font-inter font-bold rounded tracking-wide bg-white text-black flex justify-center items-center mt-[7rem]">{{item}}</span>      
                                </div>  
                            </div> 
                        </div> 
    
                        <div class="flex flex-col justify-center items-center w-full h-[10rem] border-4 border-dashed border-[#ffffff15] rounded droppable" data-parent="drop"> 
                            <img class="w-[5rem] opacity-30" src="https://i.imgur.com/3v1WaAb.png" width="64" height="64"> 
                            <div class="opacity-30 text-[20px] font-bold mt-[10px]">DROP ITEMS</div>
                        </div> 
                    </div>  
                </div> 
 
                <div class="flex justify-end items-end h-[15rem] w-[99%] ">
                    <div class="flex justify-center items-center rounded w-[30rem] h-[3rem] bg-[rgb(120,99,212,0.40)] font-montserrat font-semibold text-[17px] tracking-wide">
  
                        <div class="flex flex-row justify-center items-center h-full mx-[10px]"> 
                            <img src="https://i.imgur.com/5MKaLBv.png" width="32" height="32"> 
                            <div class="title">Move Items</div>
                        </div>

                        <div class="flex flex-row justify-center items-center h-full mx-[10px]"> 
                            <img src="https://i.imgur.com/PcN9Irt.png" width="32" height="32"> 
                            <div class="title">Item Options</div>
                        </div>

                        <div class="flex flex-row justify-center items-center h-full mx-[10px]"> 
                            <div class="flex justify-center items-center w-[60px] h-[30px] font-bold bg-white text-black rounded mr-[5px]">ESC</div>
                            <div class="title">Close</div>
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
        name: 'InventoryComponent',
  
        mounted() 
        { 
            window.InventoryComponent = this; 

            if(window.mp)
            {
                window.e_rpc.add('reloadInventory', (data) =>
                {
                    const raw = JSON.parse(data)
 
                    this.openInventory(raw.stock, raw.attached, raw.nearby)
                }); 
            } 
        },
        data: function() 
        {
            return { 
 
                itemSelected: null,  
                itemSelectedStatus: null,
                itemSelectedModal: {id: null, name: '', slot: '', index: null}, 
                state: { droppable: null },    
                modal: { status: false, title: '', option: '', description: '', category: '', input: '' },
  
                attachedItems: { 
                    'hat': {}, 'jacket': {}, 'jeans': {}, 'watch': {}, 'mask': {}, 'glasses': {}, 'bracelet': {}, 'shoes': {},
                },

                itemsImage: { 
                    //0 - default  //1 - item
                    'hat':       ['https://i.imgur.com/7C43ZXP.png', 'https://i.imgur.com/ONJ5uJB.png'],
                    'jacket':    ['https://i.imgur.com/p6QI52G.png', 'https://i.imgur.com/xMCo5jW.png'],
                    'jeans':     ['https://i.imgur.com/g2BD8Hr.png', 'https://i.imgur.com/U9NGDVM.png'],
                    'watch':     ['https://i.imgur.com/9uDby2A.png', 'https://i.imgur.com/WX6U5ph.png'],
                    'mask':      ['https://i.imgur.com/aKl3pzi.png', 'https://i.imgur.com/O6yWn79.png'],
                    'glasses':   ['https://i.imgur.com/PtkyXJo.png', 'https://i.imgur.com/ykB4P4a.png'],
                    'bracelet':  ['https://i.imgur.com/Bqgzk5W.png', 'https://i.imgur.com/a1XLkEY.png'],
                    'shoes':     ['https://i.imgur.com/ZEhd3ks.png', 'https://i.imgur.com/cJKdDr3.png'],
                     
                    'gift':      ['', 'https://i.imgur.com/V26fbn4.png'], 'gascan':    ['', 'https://i.imgur.com/ua4Tc7G.png'],
                    'cola':      ['', 'https://i.imgur.com/msEEn2v.png'], 'chocolate': ['', 'https://i.imgur.com/f7Mi7GW.png'],
                    'beer':      ['', 'https://i.imgur.com/5ZPla12.png'], 'aspirine':  ['', 'https://i.imgur.com/nq4swPu.png'], 
                    'hamburger': ['', 'https://i.imgur.com/xyFGhdh.png'], 'hotdog':    ['', 'https://i.imgur.com/TtaXw0G.png'],
                    'medkit':    ['', 'https://i.imgur.com/Noy29bM.png'], 'milk':      ['', 'https://i.imgur.com/f85bibg.png'], 
                    'phone':     ['', 'https://i.imgur.com/XjH9kpx.png'], 'pizza':     ['', 'https://i.imgur.com/hlrJkSs.png'],
                    'repairkit': ['', 'https://i.imgur.com/6BN4gSO.png'], 'sandwich':  ['', 'https://i.imgur.com/4VQH3vw.png'],
                    'seeds':     ['', 'https://i.imgur.com/kaINC4E.png'], 'phonebook': ['', 'https://i.imgur.com/t8jV1e8.png'],
                    'sprite':    ['', 'https://i.imgur.com/YLKS3XA.png'], 'walkie':    ['', 'https://i.imgur.com/kxgZvGH.png'], 
                }, 

                foundsObject: [], 
                playerItems: [{ id: 0, name: 'Jacket', count: 20, slot: 'jacket', image: 'jacket.png', status: false}]
            };   
        },   
          
        methods: 
        {   
            clickRightItem(item)
            {  
                this.itemSelectedModal = {id: item.id, name: item.name, slot: item.slot }, 

                this.showModal(true, 'inspect', item.name, `You're about to drop this ${item.name}. Are you sure you want to do this? Others will be able to pick it.`, item.image.replace('.png', '')); 
            },
  
            openInventory(data, attacheds, nearbys)
            {
                this.playerItems = data;
                this.attachedItems = attacheds; 
                this.foundsObject = nearbys;
            },
 
            drop() 
            { 
                try 
                {
                    if(!this.state.droppable) 
                        return console.log('DnD Inventory: Incorrect droppable element.');
 
                    const item = this.itemSelected;
                    const category = this.state.droppable;

                    audio.play();
                    audio.volume = 0.3;
 
                    switch(this.state.droppable.dataset.parent)
                    {
                        case 'drop':
                        {    
                            if(this.itemSelectedStatus === 'found' || this.item.slot === 'phone')
                                return;

                            //if(Object.keys(this.attachedItems[item.slot]).length)
                                //return;

                            this.itemSelectedModal = {id: item.id, name: item.name, slot: item.slot }; 
                            this.showModal(true, 'drop', 'DROP ITEM', `You're about to drop this ${item.name}. Are you sure you want to do this? Others will be able to pick it.`, '');
                            break;  
                        }

                        case 'equip':
                        {   
                            if(category.dataset.columns == item.slot) {   
                                if(window.e_rpc) {
                                    window.e_rpc('server:inventory::attachItem', item.id);
                                }
                            } 
                            break;   
                        } 
                        
                        case 'unequip':
                        {   
                            if(this.itemSelectedStatus === 'attached') {  
                                if(window.e_rpc) {
                                    window.e_rpc('server:inventory::unequipItem', item.id);
                                }
                            } 

                            if(this.itemSelectedStatus === 'found') { 
                                if(window.e_rpc) {
                                    window.e_rpc('server:inventory::pickItem', item.id);
                                }
                            }
                            break;
                        } 
                    } 
                } 
                catch(error) {console.log('error')}
            },

            onMousedown(event, item, statusAttach) 
            { 
                event.preventDefault();
 
                if(event.which != 1 || !Object.keys(item).length)
                    return;
 
                const element = document.getElementById(item.id); 
                let clone = element.cloneNode(true)
                clone.canDrop = true;
                  
                clone.style.position = 'absolute'
                clone.style.zIndex = 1000 

                document.body.append(clone);

                let that = this;
                that.state.droppable = null; 
                this.itemSelected = item;   
                this.itemSelectedStatus = statusAttach;
 
                moveAt(event.clientX, event.clientY);
                    
                function moveAt(offsetX, offsetY) 
                { 
                    clone.style.left = offsetX - 20 + 'px'
                    clone.style.top = offsetY + 'px'
                } 

                function onMouseMove(event) {
                    moveAt(event.clientX, event.clientY);
 
                    clone.hidden = true;
                    let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
                    clone.hidden = false;
                      
                    if(!elemBelow) return

                    let droppableBelow = elemBelow.closest('.droppable')
                    let currentDroppable = that.state.droppable;
  
                    if(currentDroppable !== droppableBelow) 
                    {
                        if(currentDroppable) {
                            that.state.droppable = null; 
                        }

                        currentDroppable = droppableBelow

                        if(currentDroppable) {
                            that.state.droppable = currentDroppable;
                        }
                    } 
                }

                document.addEventListener('mousemove', onMouseMove);  
                document.onmouseup = function() {
                    try 
                    {
                        if(clone.canDrop) 
                        {   
                            document.removeEventListener('mousemove', onMouseMove);
                            clone.onmouseup = null;
                            clone.canDrop = false; 
                            clone.remove(); 
                            that.drop();  
 
                            that.itemSelected = null;  
                        }
                    }
                    catch(error) { console.log(error) }
                };
            }, 
 
            showModal(status, option, title, description, category)
            {
                return this.modal = { status: status, option: option, title: title, description: description, category: category }
            },

            executeModal()
            { 
                if(this.itemSelectedModal.id != null)
                {
                    switch(this.modal.option)
                    {
                        case 'drop':
                        { 
                            if(!this.modal.input)
                                return;

                            this.modal.status = false;
                            console.log('dropped')
                            
                            audio.play();
                            audio.volume = 0.3;

                            console.log(this.modal.input)
  
                            if(window.e_rpc) {
                                window.e_rpc('server:inventory::dropItem', JSON.stringify({ item: this.itemSelectedModal, count: this.modal.input }));
                            }
 
                            this.itemSelectedModal = {id: null, name: '', slot: '', index: null};
                            break;
                        }

                        case 'inspect':
                        { 
                            this.modal.status = false;
                            
                            audio.play();
                            audio.volume = 0.3;
  
                            if(window.e_rpc) {
                                window.e_rpc('server:inventory::useitem', JSON.stringify(this.itemSelectedModal));
                            }
                            
                            this.itemSelectedModal = {id: null, name: '', slot: '', index: null};
                            break;
                        }
                    }
                } 
            },

            closeModal()
            {
                audio.play();
                audio.volume = 0.3;
                this.modal = false;
            },
        } 
    }
</script>