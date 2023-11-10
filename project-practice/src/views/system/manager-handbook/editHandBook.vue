<template>
    <main className="user-redux-container">
              <div className="text-center uppercase font-bold text-xl mt-4 text-[#0071ba]">TẠO THÔNG TIN BLOG</div>
              <div className="user-redux-body">
                  <div className="mx-[2%] flex gap-x-4">
                      <input v-model="title" class="w-full text-5xl font-medium focus-within:outline-none" placeholder="TIEU DE" />
                      <div class="w-[50%]">
                          <imageField @change="previewImage" v-bind:preview="thumb" />
                           </div>
                  </div>
                <div class="px-6 mt-4">
                  <markdown v-model="content"/>
                </div>
              </div>
              
              <div class="pt-6 float-right mr-10">
                  <button @click="handleEditBlog" :disabled="isDisabled" class="disabled:opacity-60 py-2 px-4 bg-[#0071BA] font-medium text-white rounded-3xl">Sửa đổi</button>
              </div>
  
            
          </main>
  </template>
  
  <script>
  
  import markdown from '../manager-doctor/form/markdown/markdown.vue';
  import { ref, computed , inject , watch } from "vue"
  import useBlogs from "@/services/apiBlogs"
  import imageField from '../manager-user/form/Field/imageField.vue';
  import { useStore } from 'vuex';
  import { useRoute } from 'vue-router';
  import useDetailBlog from "@/services/apiDetailBlog"

  export default {
      setup() {
          const title = ref('')
          const content = ref('')
          const thumb = ref('')
          const store = useStore();
          const swal = inject('$swal');
          const id = computed(() => store.state.profile.id);
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
          const route = useRoute();
          const {dataDetail , errorData , fetchDetailBlog} = useDetailBlog()
          const handleData = async (id) => {
            const res = await fetchDetailBlog(id);
                if (res && res.errCode === 0) {
                  title.value = res.blog.title,
                      content.value = res.blog.content,
                      thumb.value = res.blog.thumb
                
            }
        };
        if (route.params.id) {
            handleData(route.params.id);
            watch(route, (pa, pb) => {
                console.log('check ', pa.params.id);
                handleData(pa.params.id);
            });
        }

         const isDisabled = computed(() => {
        return !title.value || !content.value;
      });
          function previewImage(event) {
              var input = event.target;
              if (input.files) {
                  var input = event.target;
                  if (input.files) {
                      var reader = new FileReader();
                      reader.onload = (e) => {
                          thumb.value = e.target.result;
                          input.value = "";
                      };
                      reader.readAsDataURL(input.files[0]);
                  }
              }
          }
            const handleEditBlog = () => {
            
          }
  
  
  
          return { title , content , isDisabled  , previewImage , thumb , handleEditBlog}
      },
      components: {
          markdown,
          imageField
      }
  }
  </script>
  
  <style>
  
  </style>