<template>
    <div class="ion-page">
        <Header title="Départements"/>
        <div class="ion-padding">
            <ion-item>
                <ion-label color="medium" position="floating">Code Postal</ion-label>
                <ion-input @input="searchInput = $event.target.value"></ion-input>
            </ion-item>
                <ion-button @click="getDepartement" expand="full" type="submit"  style="margin-top: 10px" class="ion-no-margin">Rechercher
                </ion-button>
                <ion-button @click="clean" expand="full" type="submit" color="warning" style="margin-top: 10px" class="ion-no-margin">
                    Réinitialiser
                </ion-button>
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
        methods: {
            getDepartement() {
                let regexInt = /([a-zA-Z~@#$^*()_+=[\]{}|\\,.?:]{2})/
                let value = this.searchInput
                if (!regexInt.test(value) && this.searchInput.length === 2) {
                    this.list.splice(0, this.list.length)
                    if (this.searchInput !== null) {
                        let link = "https://geo.api.gouv.fr/departements/" + this.searchInput + "/communes"
                        this.$http.get(link).then((res) => {
                            console.log(res)
                            res.data.forEach((e) => {
                                this.list.push(e)
                            })
                            console.log(this.list)
                        })
                    } else {
                        this.PresentAlert("champ vide ou incorrect")
                    }
                } else {
                    this.PresentAlert("champ incorrect")
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