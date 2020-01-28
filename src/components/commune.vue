<template>
    <div class="ion-page">
        <Header title="Communes"/>
        <div class="ion-padding">
            <ion-item>
                <ion-label color="medium" position="floating">Code Postal ou Nom de la commune</ion-label>
                <ion-input :value="searchInput" @input="searchInput = $event.target.value"></ion-input>
            </ion-item>
            <div class="ion-padding">
                <ion-button @click="getCommune" expand="full" type="submit" style="margin-top: 10px" class="ion-no-margin">Rechercher
                </ion-button>
                <ion-button @click="clean" expand="full" type="submit" style="margin-top: 10px" color="warning" class="ion-no-margin">
                    Réinitialiser
                </ion-button>
            </div>
        </div>
        <ion-content>
            <ion-list>
                <ion-card v-bind:key="t.id" v-for="(t) in list">
                    <ion-card-header>
                        <ion-card-subtitle color="dark">{{t.nom}}</ion-card-subtitle>
                        <ion-card-subtitle color="medium">Code : {{t.code}}</ion-card-subtitle>
                        <ion-card-subtitle color="medium">Code de départements : {{t.codeDepartement}}
                        </ion-card-subtitle>
                        <ion-card-subtitle color="medium">Code de région : {{t.codeRegion }}</ion-card-subtitle>
                        <ion-card-subtitle color="medium">Code postaux : {{t.codePostaux }}</ion-card-subtitle>
                        <ion-card-subtitle color="medium">Populations : {{t.population }}</ion-card-subtitle>
                    </ion-card-header>
                </ion-card>
            </ion-list>
        </ion-content>


    </div>

</template>

<script>
    import Header from "./header";

    export default {
        components: {Header},
        data() {
            return {
                searchInput: null,
                list: [],

            }
        },
        component: {
            Header
        },
        methods: {
            getCommune() {
                this.list.splice(0, this.list.length)
                let regexInt = /([0-9~@#$^*()_+=[\]{}|\\,.?:])/
                let regexString = /([a-z])/

                let link
                if (this.searchInput !== null) {
                    if (regexInt.test(this.searchInput) && this.searchInput.length === 5) {
                        link = "https://geo.api.gouv.fr/communes?codePostal=" + this.searchInput
                        this.$http.get(link).then((res) => {
                            if (res.data.length !== 0) {
                                res.data.forEach((e) => {
                                    this.list.push(e)
                                })
                            } else {
                                this.PresentAlert("Valeur incorrect")
                            }
                        })
                    } else if (regexString.test(this.searchInput.toLowerCase())) {
                        link = "https://geo.api.gouv.fr/communes?nom=" + this.searchInput
                        this.$http.get(link).then((res) => {
                            if (res.data.length !== 0) {
                                this.list = res.data.map(e => e)
                            } else {
                                this.PresentAlert("Valeur incorrect")
                            }
                        })
                    } else {
                        this.PresentAlert("Valeur incorrect")
                    }
                } else {
                    this.PresentAlert("Champ vide")
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