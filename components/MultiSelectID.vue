<template>
  <div class="multiContainer">
      <form @submit.prevent="pressed">
        <input type="text" :list="placeholder" v-model="text" :placeholder="placeholder">
        <datalist :id="placeholder">
            <option v-for="(x, index) in items" :key="index" :value="x.text"></option>
        </datalist>
      </form>
      <div class="selected">
          <div class="item" v-for="(item, index) in selectedItems" :key="index" @click="()=>{returnItem(item.text)}">
              {{ item.text }}
          </div>
          <div class="item custom" v-for="(item, index) in customItems" :key="index+selectedItems.length" @click="()=>{returnCustomItem(item)}">
              {{ item }}
          </div>
      </div>
      
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import IDPair from '../classes/IDPair';

export default Vue.extend({
    props: {
        data: Array as ()=> IDPair[],
        getItems: Array,
        placeholder: String,
        getCustom:{
            type: Array,
            default: null
        }
    },
    data() {
        return {
            items: this.data as IDPair[],
            text: "",
            customItems: [] as string[],
            selectedItems: [] as IDPair[]
        }
    },
    mounted() {
        console.log("hello from select");
        console.log(this.items);
    },
    methods: {
        pressed(){
            console.log(this.customItems);
            this.addItem(this.text); 
            this.text = "";
        },
        addItem(name: string){
            let index = this.items.findIndex(x=>x.text.toLowerCase() == name.toLowerCase());
            //exact match      
            if(index>-1){
                console.log("exact match!!")
                this.selectedItems.push(this.items.splice(index,1)[0]);
            }
            //not exact
            else{
                console.log("not exact match");
                if(this.getCustom && name!==""){
                    this.customItems.push(name);
                    this.$emit('update:getCustom', this.customItems);
                }
                else{
                    index = this.items.findIndex((x)=> x.text.toLowerCase().includes(name.toLowerCase()));
                    if(index>-1)
                        this.selectedItems.push(this.items.splice(index,1)[0]);
                }
            }
            console.log(this.selectedIDS);
            this.$emit('update:getItems', this.selectedIDS);
        },
        returnItem(name: string){
            let index =this.selectedItems.findIndex(x=>x.text.toLowerCase() === name.toLowerCase());
            if(index>-1){
                let item = this.selectedItems.splice(index,1)[0];
                    this.items.push(item);
            }
            this.$emit('update:getItems', this.selectedIDS);
        },
        returnCustomItem(name: string){
            let index =this.customItems.findIndex(x=>x.toLowerCase() === name.toLowerCase());
            if(index>-1){
                this.customItems.splice(index,1)[0];
            }
            this.$emit('update:getItems', this.selectedIDS);
        },
    },
    computed: {
        selectedIDS():Array<string>{
            return this.selectedItems.map(x=>{
                return x.id;
            })
        },
        filteredItems():Array<Object>{
            return this.items.filter((x:{id:string, text: string})=>{
                return x.text.toLowerCase().includes(this.text.toLowerCase());
            })
        }
    },
})
</script>
<style scoped>
    .multiContainer{
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        width: 300px;
        border-radius: 5px;
        margin: 10px auto;
    }
    .multiContainer form{
        width: 100%;
    }
    .selected{
        background: #eee;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        padding: 5px;
        width: 80%;
        margin-top:-10px;
        min-height: 10px;
        display: flex;
        flex-flow: row wrap;
    }
    .selected .item{
        background: #50ce50;
        color: white;
        border-radius: 5px;
        width: fit-content;
        margin: 3px;
        padding: 2px;
        cursor: pointer;
        user-select: none;
    }
    .custom{
        background: #cec150!important;
    }
</style>
