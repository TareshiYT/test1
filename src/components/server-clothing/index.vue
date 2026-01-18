<template> 
    <!-- eslint-disable vue/no-use-v-if-with-v-for,vue/no-confusing-v-for-v-if -->
 
    <div class="absolute w-full h-full flex-col items-center justify-between font-inter select-none">
        <div v-show="this.modal.status" class="absolute text-white w-full h-full font-inter z-1 left-0 right-0">   
            <div class="global-modal-effect"></div> 

            <div class="absolute w-full h-full flex justify-center items-center text-center flex-col z-50 left-0 right-0">  
             
                <i class="fa-solid fa-triangle-exclamation text-orange-400 text-8xl"></i>
                
                <div class="font-bold text-normal mt-3 ">You're about to buy <b>{{this.modal.count}}</b> items for <b style="color:green;">${{formatThousands(this.modal.price)}}.</b></div>

                <div class="font-semibold text-normal tracking-wide mt-1 w-1/4"> 
                    Select your payment method: 
                </div> 
  
                <div class="font-medium tracking-wider text-base flex flex-row mt-6">  
                    <button @click="this.executeModal('card')" class="rounded bg-yellow-600 hover:bg-yellow-500 w-40 h-[2.2rem] mx-5 font-semibold">CREDIT CARD</button> 
                    <button @click="this.executeModal('cash')" class="rounded bg-yellow-600 hover:bg-yellow-500 w-40 h-[2.2rem] mx-5 font-semibold">CASH</button>
                    <button @click="this.closeModal()" class="rounded bg-yellow-600 hover:bg-yellow-500 w-40 h-[2.2rem] mx-5 font-semibold">CANCEL</button>
                </div> 
            </div> 
        </div>
 
        <div class="w-full h-[87%] flex flex-col items-start justify-start">
 
            <div class="flex flex-row justify-between w-full h-[6rem]">  
                <div class="flex flex-col text-white h-full ml-7">  
                    <div class="text-[#6b6bfa] tracking-wide text-[2rem] font-extrabold">LOS SANTOS</div>
                    <div class="text-white tracking-wide text-[1.5rem] font-semibold mt-[-15px]">CLOTHING STORE</div>   
                </div> 
            </div>  


            <div class="w-[30%] h-[28.5rem] ml-7 mt-[2rem] overflow-y-auto text-white">  
                <div class="w-full h-full flex flex-col justify-start items-cebter">
                    <div class="w-[20rem] min-h-[3rem] flex flex-col justify-center items-start bg-[#a0a0a01c] border-2 border-[#a0a0a01e] rounded mt-2 hover:bg-[#a0a0a046]" v-for="(item) in clothingItems.filter(condition => condition.category == category && condition.gender == gender)" :class="{'!bg-gradient-to-r from-purple-600 !border-none': this.isItemInChecout(item)}" v-bind:key="item" @click="this.addItem(item)"> 
                        <div class="font-semibold text-[15px] tracking-wide ml-2">{{item.name}}</div>
                        <div class="font-semibold text-[13px] tracking-wide ml-2 text-green-500">${{formatThousands(item.price)}}</div> 
                    </div> 
                </div>  
            </div>
    
            <div class="flex flex-col justify-start items-start text-[15px] ml-7 font-semibold tracking-wide w-[30rem] mt-[2rem] cursor-pointer">
                <div class="font-semibold text-[14px] text-white">
                    <i class="fa-solid fa-palette"></i> Item color
                </div>
 
                <div class="flex flex-row justify-between items-center mt-[20px] w-[20rem]">  
                    <div class="flex justify-center items-center text-[17px] font-bold w-[30px] h-[30px] rounded bg-white text-black" @click="changeColor('back')"><i class="fa-solid fa-chevron-left"></i></div>
                    
                    <div class="font-semibold text-[14px] text-white">
                        {{chartItems[category] ? chartItems[category].color : ''}}
                    </div>

                    <div class="flex justify-center items-center text-[17px] font-bold w-[30px] h-[30px] rounded bg-white text-black" @click="changeColor('next')"><i class="fa-solid fa-chevron-right"></i></div>
                </div>
    
                <div class="flex justify-center items-center w-[20rem] h-[2.2rem] bg-white text-black rounded tracking-wide font-semibod text-[15px] mt-4" @click="this.showModal()"><i style="margin-right: 3px;" class="fa-solid fa-cart-shopping"></i> Checkout</div> 
                <div class="flex justify-center items-center w-[20rem] h-[2.2rem] bg-white text-black rounded tracking-wide font-semibod text-[15px] mt-4" @click="this.closeMenu()"><i style="margin-right: 3px;" class="fa-solid fa-right-from-bracket"></i> Exit</div>
            </div>  
        </div>  

        <div class="w-full h-[13%] flex flex-col items-center justify-center cursor-pointer">

            <div class="w-full h-full flex flex-row justify-center items-center text-white  "> 
                <div class="flex flex-col justify-center items-center w-[7rem] h-[6rem] opacity-95 rounded text-[15px] ml-2 bg-[rgba(59,52,98,0.77)] border-[3px] border-[rgba(120,99,212,0.90)]" :class="{'!bg-[rgba(98,72,212,0.55)] !border-[rgba(120,99,212,0.90)]': category == 'hat'}" style="zoom: 90%;" @click="changeCategory('hat')">
                    <img src="https://i.imgur.com/7C43ZXP.png" width="50" height="50" style="opacity: 0.7;"> 
                    <div class="font-semibold text-[14px] tracking-wide">Hat</div>
                </div>
 
                <div class="flex flex-col justify-center items-center w-[7rem] h-[6rem] opacity-95 rounded text-[15px] ml-2 bg-[rgba(59,52,98,0.77)] border-[3px] border-[rgba(120,99,212,0.90)]" :class="{'!bg-[rgba(98,72,212,0.55)] !border-[rgba(120,99,212,0.90)]': category == 'shoes'}" style="zoom: 90%;" @click="changeCategory('shoes')">
                    <img src="https://i.imgur.com/ZEhd3ks.png" width="50" height="50" style="opacity: 0.7;"> 
                    <div class="font-semibold text-[14px] tracking-wide">Shoes</div>
                </div>

                <div class="flex flex-col justify-center items-center w-[7rem] h-[6rem] opacity-95 rounded text-[15px] ml-2 bg-[rgba(59,52,98,0.77)] border-[3px] border-[rgba(120,99,212,0.90)]" :class="{'!bg-[rgba(98,72,212,0.55)] !border-[rgba(120,99,212,0.90)]': category == 'jeans'}" style="zoom: 90%;" @click="changeCategory('jeans')">
                    <img src="https://i.imgur.com/g2BD8Hr.png" width="50" height="50" style="opacity: 0.7;"> 
                    <div class="font-semibold text-[14px] tracking-wide">Jeans</div>
                </div>

                <div class="flex flex-col justify-center items-center w-[7rem] h-[6rem] opacity-95 rounded text-[15px] ml-2 bg-[rgba(59,52,98,0.77)] border-[3px] border-[rgba(120,99,212,0.90)]" :class="{'!bg-[rgba(98,72,212,0.55)] !border-[rgba(120,99,212,0.90)]': category == 'jacket'}" style="zoom: 90%;" @click="changeCategory('jacket')">
                    <img src="https://i.imgur.com/p6QI52G.png" width="50" height="50" style="opacity: 0.7;"> 
                    <div class="font-semibold text-[14px] tracking-wide">Jacket</div>
                </div> 
            
                <div class="flex flex-col justify-center items-center w-[7rem] h-[6rem] opacity-95 rounded text-[15px] ml-2 bg-[rgba(59,52,98,0.77)] border-[3px] border-[rgba(120,99,212,0.90)]" :class="{'!bg-[rgba(98,72,212,0.55)] !border-[rgba(120,99,212,0.90)]': category == 'glasses'}" style="zoom: 90%;" @click="changeCategory('glasses')">
                    <img src="https://i.imgur.com/PtkyXJo.png" width="50" height="50" style="opacity: 0.7;"> 
                    <div class="font-semibold text-[14px] tracking-wide">Glasses</div>
                </div>

                <div class="flex flex-col justify-center items-center w-[7rem] h-[6rem] opacity-95 rounded text-[15px] ml-2 bg-[rgba(59,52,98,0.77)] border-[3px] border-[rgba(120,99,212,0.90)]" :class="{'!bg-[rgba(98,72,212,0.55)] !border-[rgba(120,99,212,0.90)]': category == 'watch'}" style="zoom: 90%;" @click="changeCategory('watch')">
                    <img src="https://i.imgur.com/9uDby2A.png" width="50" height="50" style="opacity: 0.7; transform: rotate(-90deg);"> 
                    <div class="font-semibold text-[14px] tracking-wide">Watches</div>
                </div>

                <div class="flex flex-col justify-center items-center w-[7rem] h-[6rem] opacity-95 rounded text-[15px] ml-2 bg-[rgba(59,52,98,0.77)] border-[3px] border-[rgba(120,99,212,0.90)]" :class="{'!bg-[rgba(98,72,212,0.55)] !border-[rgba(120,99,212,0.90)]': category == 'bracelet'}" style="zoom: 90%;" @click="changeCategory('bracelet')">
                    <img src="https://i.imgur.com/Bqgzk5W.png" width="50" height="50" style="opacity: 0.7;"> 
                    <div class="font-semibold text-[14px] tracking-wide">Bracelets</div>
                </div> 
            </div> 
        </div>
    </div>  
</template>
  
<script> 
    const audio = new Audio("http://codeskulptor-demos.commondatastorage.googleapis.com/pang/pop.mp3");
    export default {
        name: 'ClothingComponent',

        data: function() 
        {
            return { 

                category: 'jacket', 
                modal: { status: false, items: [], price: 0, count: 0 },
                gender: 'male',
                chartItems: [], 
                clothingItems:
                [
                    { name: 'Jacket One', price: 40, category: 'jacket', component: 11, variation: 0, color: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], gender: 'male' },  
                    { name: 'Jacket Two', price: 40, category: 'jacket', component: 11, variation: 1, color: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], gender: 'male' },  
                    { name: 'Jacket New', price: 40, category: 'jacket', component: 11, variation: 2, color: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], gender: 'male' },
                    { name: 'Jacket New', price: 40, category: 'jacket', component: 11, variation: 3, color: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], gender: 'male' },  
                    { name: 'Jacket New', price: 40, category: 'jacket', component: 11, variation: 4, color: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], gender: 'male' },  
                    { name: 'Jacket One', price: 40, category: 'jacket', component: 11, variation: 5, color: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], gender: 'male' },  
                    { name: 'Jacket Two', price: 40, category: 'jacket', component: 11, variation: 6, color: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], gender: 'male' },  
                    { name: 'Jacket New', price: 40, category: 'jacket', component: 11, variation: 7, color: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], gender: 'male' },
                    { name: 'Jacket New', price: 40, category: 'jacket', component: 11, variation: 8, color: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], gender: 'male' },  
                    { name: 'Jacket New', price: 40, category: 'jacket', component: 11, variation: 9, color: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], gender: 'male' },  
                    { name: 'Jacket One', price: 40, category: 'jacket', component: 11, variation: 10, color: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], gender: 'male' },  
                    { name: 'Jacket Two', price: 40, category: 'jacket', component: 11, variation: 11, color: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], gender: 'male' },  
                    { name: 'Jacket New', price: 40, category: 'jacket', component: 11, variation: 12, color: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], gender: 'male' },
                    { name: 'Jacket New', price: 40, category: 'jacket', component: 11, variation: 13, color: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], gender: 'male' },  
                    { name: 'Jacket New', price: 40, category: 'jacket', component: 11, variation: 14, color: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], gender: 'male' },  
                    { name: 'Jacket One', price: 40, category: 'jacket', component: 11, variation: 15, color: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], gender: 'male' },  
                    { name: 'Jacket Two', price: 40, category: 'jacket', component: 11, variation: 16, color: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], gender: 'male' },  
                    { name: 'Jacket New', price: 40, category: 'jacket', component: 11, variation: 17, color: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], gender: 'male' },
                    { name: 'Jacket New', price: 40, category: 'jacket', component: 11, variation: 18, color: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], gender: 'male' },  
                    { name: 'Jacket New', price: 40, category: 'jacket', component: 11, variation: 19, color: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], gender: 'male' },  
                    { name: 'Jacket New', price: 40, category: 'jacket', component: 11, variation: 20, color: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], gender: 'male' }, 
                ] 
            };
        },    

        mounted()
        { 
            window.ClothingComponent = this;  
        },

        methods: 
        {
            openMenu(data, gender)
            { 
                this.gender = gender;
                this.category = 'jacket';
                this.modal = { status: false, items: [], price: 0, count: 0 } 
                this.chartItems = []; 
                this.clothingItems = data; 
            },

            closeMenu()
            {
                if(window.mp) { 
                    window.e_trigger("client::clothing:closeMenu"); 
                } 
            },

            showModal()
            {
                let categorys = ['bracelet','jacket', 'jeans', 'shoes', 'watch', 'mask', 'glasses', 'hat'];
                let price = 0;
                let jsItems = [];

                for(let x = 0; x < categorys.length; x++)
                {
                    if(this.chartItems[categorys[x]]) {
                        price += this.chartItems[categorys[x]].price;
                        jsItems.push(this.chartItems[categorys[x]]);
                    }
                }

                audio.play();
                audio.volume = 0.3;
 
                this.modal = { status: true, count: Object.keys(this.chartItems).length, price: price, items: jsItems } 
            },

            executeModal(option)
            {  
                if(window.mp) { 
                    window.e_trigger("client::clothing:buyItems", option, this.modal.price, JSON.stringify(this.modal.items)); 
                } 

                audio.play();
                audio.volume = 0.3;

                return this.modal.status = false;
            },

            closeModal()
            {
                audio.play();
                audio.volume = 0.3;

                return this.modal = { status: false, count: 0, price: 0 }
            },
 
            addItem(item)
            {    
                audio.play();
                audio.volume = 0.3;

                if(this.chartItems[this.category] && this.chartItems[this.category].name == item.name) {
                    if(window.mp) { 
                        window.e_trigger("client::clothing:removeItem", JSON.stringify(this.chartItems[this.category]));  
                        delete this.chartItems[this.category]; 
                    } 
                    return true;
                }
                 
                this.chartItems[this.category] = {name: item.name, price: item.price, category: item.category, component: item.component, variation: item.variation, stepColor: 0, color: item.color[0], gender: item.gender}; 
               
                if(window.mp) { 
                    window.e_trigger("client::clothing:addItem", JSON.stringify(this.chartItems[this.category])); 
                }    
            },
 
            isItemInChecout(item) {  

                if(this.chartItems[this.category] == undefined || !this.chartItems[this.category])
                    return;
 
                return (this.chartItems[this.category].name == item.name && this.chartItems[this.category].price == item.price && this.chartItems[this.category].variation == item.variation && this.chartItems[this.category].gender == item.gender && this.chartItems[this.category].component == item.component) ? true : false; 
            },

            changeColor(option)
            { 
                if(!this.chartItems[this.category])
                    return;

                const index = this.clothingItems.findIndex(object => object.name === this.chartItems[this.category].name && object.category === this.chartItems[this.category].category);

                switch(option)
                {
                    case 'back':
                    {
                        if(this.chartItems[this.category].stepColor <= 0)
                            return;

                        this.chartItems[this.category].stepColor --;

                        console.log(this.chartItems[this.category].stepColor)
                        break;
                    }

                    case 'next':
                    {
                        if(this.chartItems[this.category].stepColor >= (this.clothingItems[index].color.length - 1))
                            return;

                        this.chartItems[this.category].stepColor ++;
                        console.log(this.chartItems[this.category].stepColor)
                        break;
                    }
                }
 
                this.chartItems[this.category].color = this.clothingItems[index].color[this.chartItems[this.category].stepColor]; 
 
                if(window.mp) { 
                    return window.e_trigger("client::clothing:addItem", JSON.stringify(this.chartItems[this.category])); 
                } 
            },
  
            changeCategory(category)
            {
                this.category = category;

                audio.play();
                audio.volume = 0.3;
 
                if(window.mp) { return window.e_trigger("client::clothing:changeCategory", category); } 
            },
 
            formatThousands(x)
            {
                return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); 
            },
        } 
    }
</script>