<template>
    <div class="card card-body">
        <h5>Einkaufsliste</h5>
        <div class="hide-overflow">
            <div class="ms-2 form-check" v-for="(item, index) in this.shoppingList">
                <input class="form-check-input" type="checkbox" value="" :id="'formCheckShopping' + index"
                    v-model="this.shoppingList[index]" @click="this.onDeleteElementFromList(item.name, item.unit)" />
                <label class="form-check-label" :for="'formCheckShopping' + index" :ref="'label' + index">
                    {{ item.name }}
                    <div class="text-muted d-inline">{{ item.amount }} {{ item.unit }}</div>
                </label>
            </div>
        </div>
        <div class="input-group input-group-sm mt-2">
            <input type="text" placeholder="Artikel" class="form-control" v-model="this.listElement.name" />
            <input type="number" placeholder="Anzahl" class="form-control" v-model="this.listElement.amount" />
            <select class="form-select text-muted" placeholder="Einheit" v-model="this.listElement.unit">
                <option class="text-muted" selected disabled hidden>Einheit</option>
                <option>Gramm</option>
                <option>Milliliter</option>
                <option>Esslöffel</option>
                <option>Teelöffel</option>
                <option>Tasse</option>
                <option>Glas</option>
                <option>Bund</option>
                <option>Packung</option>
                <option>Stück</option>
            </select>
            <button class="btn btn-outline-success" type="button" @click="this.onAddToShoppingList()"><i
                    class="bi bi-bag-plus"></i></button>
        </div>
    </div>
</template>

<script>
import { getList, removeFromList, addToList } from '../api/shoppingListHandling';
export default {
    data() {
        return {
            shoppingList: [],
            listElement: {
                name: null,
                amount: null,
                unit: "Einheit",
            },
        };
    },
    methods: {
        async onAddToShoppingList() {
            // Add to DB
            let res = await addToList(this.listElement);
            this.shoppingList = res;
        },
        async onDeleteElementFromList(name, unit) {
            // Delete from DB
            let res = await removeFromList(name, unit);
            this.shoppingList = res;
        },
    },
    async mounted() {
        this.shoppingList = await getList();
    }
}
</script>

<style scoped>
.hide-overflow {
    overflow-y: scroll;
}

/* https://www.w3schools.com/howto/howto_css_custom_scrollbar.asp */
::-webkit-scrollbar {
    width: 10px;
}

::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
}

::-webkit-scrollbar-thumb {
    background: rgb(194, 193, 193);
    border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
    background: #555;
}
</style>