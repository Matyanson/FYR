<template>
  <div class="background">
      <form @submit.prevent="pressed">
            <div :class="`tagsContainer ${focused?'focused': ''}`" @click="()=>{focus()}">
                <div class="tag" v-for="(item, index) in selectedItems" :key="index" @click="()=>{deleteItem(index)}">
                    {{ item.data.text }}
                </div>
                <input autocomplete="off" ref="input" id="input" v-model="text" :placeholder="placeholder" @input="pointer=-1" @keydown.down="()=>{pointerDown()}" @keydown.up="()=>{pointerUp()}" @keydown.delete="()=>{deleteLast()}" @blur="()=>{unfocus()}">
            </div>
            <div :class="`options ${focused?'opened':''}`">
                <div :class="`option ${pointer === index?'selected':''}`" v-for="(x, index) in filteredItems" :key="index" @mousedown="()=>{addItem(index)}">
                    {{ x.text }}
                </div>
            </div>
      </form>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import IDPair from '../classes/IDPair';
import divInput from '@/components/divInput.vue';

export default Vue.extend({
    props: {
        data: Array as ()=> IDPair[],
        placeholder: String,
        custom: {
            type: Boolean,
            default: false
        },
        getText:{
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            text: "",
            allItems: this.data as IDPair[],
            items: this.data as IDPair[],
            selectedItems: [] as {
                custom: boolean,
                data: IDPair
            }[],
            customItems: [] as string[],
            focused: false,
            pointer: -1
        }
    },
    fetch() {
        console.log(this.selectedItems);
        console.log("setting selected to empty");
        this.text = "";
        this.selectedItems = [];
        this.update();
    },
    methods: {
        pressed(){
            if(this.custom && this.pointer <0 && this.text!=="")
                this.addCustomItem(this.text);
            else if(this.pointer>-1)
                this.addItem(this.pointer);
            else
                this.addItem(0);
            this.pointer = -1;
            this.text = "";
        },
        pointerDown(){
            let lastIndex = this.filteredItems.length-1;
            if(this.pointer >= lastIndex)
                this.pointer = 0;
            else
                this.pointer++;
            console.log(this.pointer);
        },
        pointerUp(){
            let lastIndex = this.filteredItems.length-1;
            if(this.pointer == 0)
                this.pointer = lastIndex;
            else
                this.pointer--;
            console.log(this.pointer);
        },
        addCustomItem(text: string){
            let index = this.filteredItems.findIndex(x=>x.text.toLowerCase() == text.toLowerCase());
            //exact match
            if(index>-1){
                this.addItem(index);
            }
            else{
                this.selectedItems.push({
                    custom: true,
                    data:{
                        text: text,
                        id: text
                    }
                })
            }
        },
        addItem(index:number){
            if(this.filteredItems[index]){
                let id = this.filteredItems[index].id;
                let newIndex = this.items.findIndex(x=>x.id === id);
                this.selectedItems.push({
                    custom: false,
                    data: this.items.splice(newIndex,1)[0]
                });
                this.text= "";
            }            
        },
        deleteLast(){
            if(this.text.length<1)
                this.deleteItem(this.selectedItems.length-1);
        },
        deleteItem(index:number = 0){
            let item = this.selectedItems[index];
            if(item){
                if(item.custom)
                    this.selectedItems.splice(index,1)[0];
                else{
                    this.items.push(this.selectedItems.splice(index,1)[0].data);
                }
            }
        },
        focus(){
            let input: any = this.$refs.input;
            input.focus();
            this.focused = true;
        },
        unfocus(){
            this.focused = false;
        },
        update(){
            if(this.getText)
                this.$emit('update:data', this.selectedNames);
            else
                this.$emit('update:data', this.selectedIDS);
        }
    },
    computed: {
        
        selectedIDS():Array<string>{
            return this.selectedItems.map(x=>{
                return x.data.id;
            })
        },
        selectedNames():Array<string>{
            return this.selectedItems.map(x=>{
                return x.data.text;
            })
        },
        filteredItems():IDPair[]{
            return this.items.filter((x)=>{
                return x.text.toLowerCase().includes(this.text.toLowerCase());
            })
        }
    },
    watch: {
        selectedItems: 'update',
    },
    components: {
        divInput
    }
})
</script>
<style scoped>
    form, .background{
        width: fit-content;
    }
    .background{
        margin:5px;
        position: relative;
    }
    .options{
        background: #999999c5;
        border-radius: 5px;
        overflow:hidden;
        overflow-y: auto;
        padding: 0;
        position: absolute;
        max-height: 0px;
        min-width: 100%;
        width: fit-content;
        transition: all ease 0.3s;
        z-index: 1;
        scrollbar-width: none;
        -ms-overflow-style: none;
    }
    .options::-webkit-scrollbar{
        display: none;
    }
    .options.opened{
        max-height: 100px;
    }
    .option:hover{
        background: #535353ea;
        color: #eee;
        cursor: pointer;
    }
    .option.selected{
        background: #535353ea;
        color: #eee;
    }
    .tagsContainer{
        width: fit-content;
        min-width: 50px;
        max-width: 600px;
        height: fit-content;
        display: flex;
        flex-flow: row wrap;
        align-items: center;
        background: #eee;
        border: solid #999 1px;
        border-radius: 5px;
    }
    .focused{
        border-color: #5c73f7;
        border-width: 1px;
    }
    #input{
        width:100px;
        height: calc(1rem + 8px);
        padding: 0;
        margin: 0;
        border: none;
        background: none;
        outline: none;
    }
    #input:focus{
        border: none;
        outline: none;
    }
    .tag{
        display: inline-block;
        background: #50ce50;
        color: white;
        border-radius: 5px;
        width: fit-content;
        margin: 3px;
        padding: 4px;
        cursor: pointer;
        user-select: none;
    }
    .custom{
        background: #cec150!important;
    }
</style>
