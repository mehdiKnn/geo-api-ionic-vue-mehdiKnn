<template>
            <div>
                <ion-toolbar>
                    <ion-title size="medium" style="font-family: monospace; font-size: 18px">{{title}} de France</ion-title>
                </ion-toolbar>
                <img class="ion-padding" src="../assets/logo.png" style="width: 200px"/>
            </div>
</template>
<script>
    export default {
            name : 'Header',
        props : {
                title : String,
        }
    }
</script>