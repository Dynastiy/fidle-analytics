<template>
    <div>
      <div class="d-flex align-items-center justify-content-center mt-3" style="gap:10px">
        <button
          type="button"
          class="btn btn-sm btn-outline-secondary"
          v-if="meta.page != 1"
          @click="prevPage"
        >
          Back
        </button>
        <div>
          <span class="small">
            Showing {{ meta.page }} of {{ meta.pages.length }}
          </span>
        </div>
        <button
          type="button"
          @click="nextPage"
          v-if="meta.page < meta.pages.length"
          class="btn btn-sm btn-outline-secondary"
        >
          >>
        </button>
      </div>
    </div>
  </template>
  
  <script>
  // import helpers from '@/helpers/index.js'
  export default {
    props: ["meta"],
    data() {
      return {
      };
    },
    methods: {
      nextPage(page) {
        this.$emit("next", page);
      },
      prevPage(page) {
        this.$emit("prev", page);
      },
    },
    async created() {
      // this.getPages();
    },
  };
  </script>
  
  <style>
  .paged a.first::after {
    content: "...";
  }
  
  .paged a.last::before {
    content: "...";
  }
  </style>
