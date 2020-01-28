<template>
    <div class="ion-page">
        <Header title="Régions"></Header>
        <div class="ion-padding">
            <ion-item>
                <ion-label color="medium" position="floating">Selectionnez une région</ion-label>
                <ion-select :value="searchInput" @ionChange="searchInput= $event.target.value">
                    <ion-select-option v-bind:key="number.regionCode" v-for="(number) in region"
                                       :value="number.regionCode">{{number.regionName}}
                    </ion-select-option>
                </ion-select>
            </ion-item>
            <ion-button  style="margin-top: 10px" @click="getRegion" expand="full"  type="submit" class="ion-no-margin">Rechercher</ion-button>
            <ion-button @click="clean" expand="full" type="submit" color="warning" style="margin-top: 10px" class="ion-no-margin">
                Réinitialiser
            </ion-button>
        </div>
        <ion-content>
            <ion-list>
                <ion-card v-bind:key="t.id" v-for="(t) in list">
                    <ion-card-header>
                        <ion-card-title>{{t.nom}}</ion-card-title>
                        <ion-card-subtitle>Code : {{t.code}}</ion-card-subtitle>
                        <ion-card-subtitle>Code de région : {{t.codeRegion}}</ion-card-subtitle>
                    </ion-card-header>
                </ion-card>
            </ion-list>
        </ion-content>

    </div>
</template>

<script>

    import Header from "./header";
    import region from "../assets/ressources/region.json"

    export default {
        components: {Header},
        data() {
            return {
                searchInput: null,
                list: [],
                region: region,

            }
        },
        methods: {
            getRegion() {
                let index = this.region.map((el) => el.regionCode).indexOf(this.searchInput)
                if (index !== -1) {

                    this.list.splice(0, this.list.length)
                    let link = "https://geo.api.gouv.fr/regions/" + this.searchInput + "/departements"
                    this.$http.get(link).then((res) => {
                        res.data.forEach((e) => {
                            this.list.push(e)
                        })
                        console.log(this.list)
                    })
                } else {
                    this.PresentAlert("Valeur incorrect")
                }
            },

            PresentAlert(message) {
                return this.$ionic.alertController
                    .create({
                        header: 'Erreur',
                        message: message,
                        buttons: ['OK'],
                    })
                    .then(a => a.present())
            },

            clean() {
                this.searchInput = null
                this.list.splice(0, this.list.length)
            }
        }

    };


</script>