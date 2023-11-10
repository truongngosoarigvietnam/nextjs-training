<template>
  <main className="user-redux-container">
            <div className="text-center uppercase font-bold text-xl mt-4 text-[#0071ba]">TẠO THÔNG TIN BLOG</div>
            <div className="user-redux-body">
                <div className="mx-[2%] flex gap-x-4">
                    <input v-model="title" class="w-full text-5xl font-medium focus-within:outline-none" placeholder="TIEU DE" />
                    <div class="w-[36%]">
                        <imageField @change="previewImage" v-bind:preview="preview" />
                         </div>
                         <div> 
                            <label>Chủ đề</label>
                            <input v-model="topic" class="w-full text-5xl font-medium focus-within:outline-none" placeholder="Chủ đề" />
                         </div>
                </div>
              <div class="px-6 mt-4">
                <markdown v-model="content"/>
              </div>
            </div>
            
            <div class="pt-6 float-right mr-10">
                <button @click="handleCreateBlog" :disabled="isDisabled" class="disabled:opacity-60 py-2 px-4 bg-[#0071BA] font-medium text-white rounded-3xl">Xuất bản</button>
            </div>

          
        </main>
</template>

<script>

import markdown from '../manager-doctor/form/markdown/markdown.vue';
import { ref, computed , inject } from "vue"
import useBlogs from "@/services/apiBlogs"
import imageField from '../manager-user/form/Field/imageField.vue';
import { useStore } from 'vuex';
import {useLoading} from 'vue-loading-overlay'

export default {
    setup() {
        const title = ref('')
        const topic = ref('')
        const content = ref('')
        const thumb = ref('')
        const preview = ref('')
        const store = useStore();
        const swal = inject('$swal');
        const id = computed(() => store.state.profile.id);
        const $loading = useLoading({
        // options
        color :'#009B00'
    });
        const Toast = swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', swal.stopTimer);
                toast.addEventListener('mouseleave', swal.resumeTimer);
            },
        });
        const {createBlog , messege} = useBlogs()
    const isDisabled = computed(() => {
      return !title.value || !content.value;
    });
        const handleCreateBlog = async () => {
            const loader = $loading.show({
            // Optional parameters
        });
            const res = await createBlog({
                userId : id.value ,
                title: title.value,
                content: content.value,
                thumb: thumb.value,
                topic : topic.value
            })
            if (res.errCode === 0) {
                loader.hide()
                Toast.fire({
                    icon: 'success',
                    title: res.errMessage,
                });
                title.value = ''
                content.value = ''
                thumb.value = ''
                preview.value = ''
                topic.value = ''

            } else {
                loader.hide()
                Toast.fire({
                    icon: 'error',
                    title: res.errMessage,
                });
         }
        }
        function previewImage(event) {
            var input = event.target;
            thumb.value = event.target.files[0];

            if (input.files) {
                var input = event.target;
                if (input.files) {
                    var reader = new FileReader();
                    reader.onload = (e) => {
                        preview.value = e.target.result;
                        input.value = "";
                    };
                    reader.readAsDataURL(input.files[0]);
                }
            }
        }



        return { title , content , isDisabled , handleCreateBlog , previewImage , thumb , topic , preview}
    },
    components: {
        markdown,
        imageField
    }
}
</script>

<style>

</style>