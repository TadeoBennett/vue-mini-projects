<template>
    <!-- make sure that only when you click of the modal(its backdrop) does it run the closeModal function -->
  <div class="backdrop" @click.self="closeModal"> 
        <div class="modal" :class="{ sale: theme === 'sale', nostock: theme === 'nostock',  }">
            <slot>default content</slot>

            <!-- reads the slot content provided to the component instance of the parent -->
            <div class="actions">
                <!-- ensure that wherever you use want the slot content, use the "slot" tag and assign it the matching name to that in your parent -->
                <slot name="links"></slot>
            </div>

            <p>theme is {{ theme }}</p>
        </div>
  </div>
</template>

<script setup>
    import defineEmits from 'vue'

    //can easily get the props passed to the component from the parent
    const props = defineProps([
        'theme'
    ])

    //define the emit 
    const emit = defineEmits(['close'])

    //emits a close event back to the parent
    const closeModal = ()=>{
        console.log("close modal")
        emit('close')
    }

    

</script>

<style>
.modal{
    width: 400px;
    padding: 20px;
    margin: 100px auto;
    background: white;
    border-radius: 10px;
}
.backdrop{
    top: 0;
    position: fixed;
    background: rgba(0,0,0, 0.5);
    width: 100%;
    height: 100%;
}
/* utilizes a more specific selector, OVERWRITES THE GLOBAL STYLES */ 
.modal h1{ 
    color: #03cfb4;
    border: none;
    padding: 0;
}
.modal p{
    font-style: normal;
}
.modal .actions{
    text-align: center;
    margin: 30px 0px 10px 0;
}
.modal .actions a{
    color: #333;
    padding: 8px;
    border: 1px solid #eee;
    border-radius: 4px;
    text-decoration: none;
    margin: 10px;
}
.modal.sale{
    background: crimson;
    color: white;
}
.modal.sale h1{
    color: white;
}
.modal.sale .actions{
    color: white;
}
.modal.sale .actions a{
    color: white;
}


.modal.nostock{
    background: rgb(255, 208, 0);
    color: black;
}
.modal.nostock h1{
    color: black;
}
.modal.nostock .actions{
    color: black;
}
.modal.nostock .actions a{
    color: black;
}

</style>