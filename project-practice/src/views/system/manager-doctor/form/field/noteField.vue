<template>
    <div className="w-[30%] ml-[2%]">
           <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Note </label>
           <input
           type="text"
           v-model="noteDoctor"
           @keyup="validateInput"
           @blur="validateInput"
           @input="$emit('update:modelValue', $event.target.value)"
               className="block w-full text-gray-900 border border-gray-300 p-2 rounded-lg bg-gray-50 sm:text-md focus-visible:ring-blue-500 focus-visible:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus-visible:ring-blue-500 dark:focus-visible:border-blue-500"
           />
       </div>
</template>

<script>
import {ref , watch} from "vue"
export default {
    props: {
        note : String
    },
   setup(props , {}) {
       const noteDoctor = ref('')
       watch(() => props.note, (pa, pb) => {
            noteDoctor.value = pa
           })
       return {
        noteDoctor
       }
       }
}
</script>

<style>

</style>