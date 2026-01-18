<style>
    @import './assets/css/index.css';
</style>

<template>  
    <div class="store-box-container">
        <div class="store-background-effect"></div>  
        <div class="store-close-button" @click = "exit()">CLOSE <i class="fa-solid fa-right-from-bracket" style="margin: 5px;"></i></div>
        <div class="store-global-elements">  
            <div class="spaces-elements"> 
                <div class="store-element-category">  
                    <div class="store-element-category-item" @click = "selectCategory('instruments')" :class = "{active: category == 'instruments'}"><i class="uil uil-angle-right-b"></i> Instruments</div>
                    <div class="store-element-category-item" @click = "selectCategory('products')" :class = "{active: category == 'products'}"><i class="uil uil-angle-right-b"></i> Products</div>
                </div>

                <div class="store-element-items">
                    <div class="store-element-items-item" v-for="(item, index) in items" v-bind:key="item" v-bind:item="item" @click = "addItem(item.name, index)">
                        <div class="store-element-item-title">{{item.name.toUpperCase()}}</div>
                        <div class="store-element-item-price">${{item.price}}</div>
                        <img class="image" v-bind:src="item.image"/>
                    </div>
                </div>  
            </div> 
        
            <div class="store-element-checkout" v-if = "checkout.length">
                <div class="store-element-checkout-title"><i class="fa-solid fa-cart-shopping" style="margin: 0 5px"></i> YOUR ITEMS</div> 
                <div class="store-element-checkout-line"></div>

                <div class="store-element-checkout-list">
                    <div class="store-element-checkout-list-scroll">
                        <div class="store-element-checkout-list-item" v-for = "(item, index) in checkout" v-bind:key="item" v-bind:item="item">
                        
                            <img class="image" v-bind:src="item.image"/>

                            <div class="item-data">
                                <span class="item">{{item.name}}</span>
                                <span class="amount">{{item.amount}}</span>
                            </div>

                            <div class="delete" @click = "deleteItem(index)"><i class="fa-solid fa-trash"></i></div>
                        </div>
                    </div>  
                    
                    <div class="store-element-checkout-total"> 
                        <div style="margin: 13px;"> 
                            Total cost: <span style ="color: #019e57;">${{formatThousands(total)}}</span> 
                        </div>  
                        <div class="store-element-checkout-button" @click = "purchaseItem()">Purchase</div> 
                    </div>
                </div>
            </div>
        </div>
    </div>     
</template>
  
<script> 
    let market_items = 
    { 
        'products':
        [  
            { 
                name: 'Hamburger',
                image: 'https://i.imgur.com/MCabCzu.png',
                price: 50,

                category: 'products'
            },

            { 
                name: 'Sandwich',
                image: 'https://i.imgur.com/6di2ydO.png',
                price: 50,

                category: 'products'
            }, 
            { 
                name: 'Hotdog',
                image: 'https://i.imgur.com/sC9GnZA.png',
                price: 10,

                category: 'products'
            }, 
            { 
                name: 'Pizza',
                image: 'https://i.imgur.com/OaftGB8.png',
                price: 55,

                category: 'products'
            }, 
            { 
                name: 'Chocolate',
                image: 'https://i.imgur.com/9uoSp86.png',
                price: 10,

                category: 'products'
            },
            { 
                name: 'Cola',
                image: 'https://i.imgur.com/Dn3FngQ.png',
                price: 15,

                category: 'products'
            }, 
            { 
                name: 'Sprite',
                image: 'https://i.imgur.com/jBxmqZU.png',
                price: 10,

                category: 'products'
            }, 
            { 
                name: 'Beer',
                image: 'https://i.imgur.com/pFPYP0m.png',
                price: 12,

                category: 'products'
            }, 
            { 
                name: 'Milk',
                image: 'https://i.imgur.com/izNL69N.png',
                price: 5,

                category: 'products'
            },
        ],

        'instruments':
        [  
            { 
                name: 'Walkie',
                image: 'https://i.imgur.com/HiiDDEp.png',
                price: 150,

                category: 'instruments'
            }, 
            { 
                name: 'Gascan',
                image: 'https://i.imgur.com/2TqOhFX.png',
                price: 20,

                category: 'instruments'
            }, 
            { 
                name: 'Medkit',
                image: 'https://i.imgur.com/BB10QYV.png',
                price: 50,

                category: 'instruments'
            },  
            { 
                name: 'Phone',
                image: 'https://i.imgur.com/2J4pwRJ.png',
                price: 2000,

                category: 'instruments'
            }, 
            { 
                name: 'Sim card',
                image: 'https://i.imgur.com/loIgRJu.png',
                price: 1500,

                category: 'instruments'
            }
        ] 
    } 
    export default {
        name: 'StoreComponent',

        data: function() 
        {
            return { 
                category: 'products', 
                items: market_items['products'], 
                total: 0,
                checkout: []  
            };
        },    

        mounted()
        { 
            window.StoreComponent = this;   
        },
 
        methods: 
        { 
            open()
            {
                this.category = 'products';
                this.items = market_items[this.category];
                this.checkout = [];
                this.total = 0; 
            },

            formatThousands(x)
            {
                return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); 
            },
 
            selectCategory: function(index)
            {
                this.category = index; 
                this.items = market_items[this.category];
            },
    
            addItem: function(item, parameter)
            {  
                const index = this.checkout.findIndex(object => object.name == item);

                if(index != -1)
                {
                    if(this.checkout[index].name == 'Sim card' && this.checkout[index].amount)
                        return;

                    this.checkout[index].amount ++; 
                    this.checkout[index].price += this.items[parameter].price; 
                }
                else 
                {
                    this.checkout.push({name: item, image: this.items[parameter].image, price: this.items[parameter].price, amount: 1})
                } 

                return this.total += this.items[parameter].price;
            },

            deleteItem: function(index)
            { 
                if(this.checkout[index])
                {
                    this.total -= this.checkout[index].price;

                    return this.checkout.splice(index, 1);  
                }  
            },
    
            purchaseItem: function()
            { 
                if(window.mp) {
                    return window.e_rpc('server::store:purchaseItem', JSON.stringify({checkout: this.checkout, total: this.total})); 
                }  
            }, 

            exit: function()
            {
                if(window.mp) 
                {
                    return window.e_trigger("client::store:close"); 
                }  
            }
        } 
    }
</script>