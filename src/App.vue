<template>
    <div> 
        <RadioComponent v-show="showRadio"/>
        <HousesComponent v-show="showHouse"/> 
        <PlayersComponent v-show="showPlayers"/> 
        <AdminComponent v-show="showAdmin"/>   
        <FactionsComponent v-show="showFactions"/>     
        <ContractsComponent v-show="showContracts"/>
        <DrivingComponent v-show="showDriving"/>
        <InventoryComponent v-show="showInventory"/> 
        <BankingComponent v-show="showBanking"/> 
        <PhoneComponent v-show="showPhone"/> 
        <DealershipComponent v-show="showDealership"/> 
 
        <HudComponent v-show="showHud"/>
        <ProfileComponent v-show="showProfile"/>   

        <ClothingComponent v-show="showClothing"/>
        <TatooComponent v-show="showTatoo"/> 
        <StoreComponent v-show="showStore"/> 
        <GasComponent v-show="showGas"/>
        <GunComponent v-show="showGunShop"/>
        
        <JobMenuComponent v-show="showJobMenu"/>
        <ElectricianComponent v-show="showElectrician"/> 
        <TruckerComponent v-show="showTrucker"/>

        <AuthComponent v-show="showAuth"/>
        <CharacterComponent v-show="showCharacter"/>  
        <ShopComponent v-show="showShop"/> 
        <MarketComponent v-show="showMarket"/>
        <TradeComponent v-show="showTrade"/>

        <TunningComponent v-show="showTunning"/>  

        <WheelComponent v-show="showWheel"/>

        <RobComponent v-show="showRob"/>
    </div>
</template>

<script>  
    import HudComponent from './components/server-hud/index.vue'
    import RadioComponent from './components/vehicle-radio/index.vue' 
    import PlayersComponent from './components/server-players/index.vue' 
    import AdminComponent from './components/server-reports/index.vue' 
    import HousesComponent from './components/server-houses/index.vue' 
    import ProfileComponent from './components/server-profile/index.vue'
    import FactionsComponent from './components/server-factions/index.vue'   
    import JobMenuComponent from './components/server-jobs/job-menu/index.vue'
    import ContractsComponent from './components/server-contracts/index.vue'
    import CharacterComponent from './components/server-character/index.vue' 
    import InventoryComponent from './components/server-inventory/index.vue'
    import BankingComponent from './components/server-banking/index.vue'
      
    import DealershipComponent from './components/server-dealership/index.vue'
    import PhoneComponent from './components/server-phone/index.vue'
 
    import ClothingComponent from './components/server-clothing/index.vue' 
    import TatooComponent from './components/server-tatoo/index.vue'
    import StoreComponent from './components/server-store/index.vue'
    import GasComponent from './components/server-gas/index.vue'
    import GunComponent from './components/server-gunshop/index.vue'

    import ElectricianComponent from './components/server-jobs/electrician-job/index.vue'
    import TruckerComponent from './components/server-jobs/trucker-job/index.vue'

    import AuthComponent from './components/server-auth/index.vue'
    import DrivingComponent from './components/server-driving/index.vue'
    import ShopComponent from './components/server-shop/index.vue'
 
    import MarketComponent from './components/server-market/index.vue'
    import TradeComponent from './components/server-trade/index.vue'

    import RobComponent from './components/server-rob/index.vue'

    import TunningComponent from './components/server-tunning/index.vue' 
    import WheelComponent from './components/wheel/index.vue'
 
    export default {
        name: 'App',
        components: 
        { 
            HudComponent,
            RadioComponent,
            HousesComponent, 
            PlayersComponent,  
            AdminComponent, 
            ProfileComponent, 
            FactionsComponent,   
            JobMenuComponent,
            ContractsComponent,
            CharacterComponent, 
            InventoryComponent,
            BankingComponent,
             
            PhoneComponent, 
            DealershipComponent,
            
            ElectricianComponent,
            TruckerComponent,
 
            ClothingComponent,
            TatooComponent,
            StoreComponent,
            GasComponent,
            GunComponent,

            AuthComponent, 
            DrivingComponent,
            ShopComponent, 
            RobComponent,

            MarketComponent,
            TradeComponent,
            TunningComponent,

            WheelComponent
        },
 
        data() 
        {
            return {
                showHud: false,
                showRadio: false,
                showHouse: false, 
                showPlayers: false,   
                showAdmin: false, 
                showProfile: false, 
                showFactions: false, 
                showStore: false, 
                showJobMenu: false,
                showContracts: false,
                showCharacter: false, 
                showInventory: false,
                showBanking: false,
                showClothing: false,  
                showDealership: false,
                showPhone: false,

                showElectrician: false,
                showTrucker: false,
                showGas: false,

                showAuth: false, 
                showDriving: false, 
                showShop: false,   
                showGunShop: false,

                showMarket: false,
                showTrade: false,
                showTunning: false,
                showTatoo: false,
                showWheel: false,

                showRob: false,
            }
        },

        methods: 
        {
            trigger(component, action) {
                this[component] = action;
            } 
        }
    }
</script>  