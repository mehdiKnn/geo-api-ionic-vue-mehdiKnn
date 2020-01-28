<template>
    <div id="app">
        <ion-app>
            <ion-tabs>
                <ion-tab tab="departement">
                    <Departement/>
                </ion-tab>
                <ion-tab tab="communes">
                    <Commune/>
                </ion-tab>

                <ion-tab tab="regions">
                    <Region/>
                </ion-tab>

                <ion-tab-bar slot="bottom">
                    <ion-tab-button tab="communes">
                        <ion-label>Communes</ion-label>
                        <ion-icon ios="ios-bicycle" md="md-bicycle"></ion-icon>
                    </ion-tab-button>
                    <ion-tab-button tab="departement">
                        <ion-label>Département</ion-label>
                        <ion-icon ios="ios-car" md="md-car"></ion-icon>
                    </ion-tab-button>
                    <ion-tab-button tab="regions">
                        <ion-label>Régions</ion-label>
                        <ion-icon ios="ios-jet" md="md-jet"></ion-icon>
                    </ion-tab-button>
                </ion-tab-bar>
            </ion-tabs>
        </ion-app>
    </div>
</template>

<style lang="scss">
    * {
        font-family: monospace;
        font-size: 16px;
    }


    #app {
        font-family: monospace;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    #nav {
        padding: 30px;

        a {
            font-weight: bold;
            color: #2c3e50;

            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }
</style>
<script>
    import Departement from '@/components/departement.vue'
    import Region from '@/components/region.vue'
    import Commune from '@/components/commune.vue'

    export default {
        components: {
            Departement,
            Region,
            Commune
        },
    }


</script>

