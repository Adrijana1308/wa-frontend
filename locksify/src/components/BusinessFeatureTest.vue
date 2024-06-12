<!-- BusinessFeature.vue -->
<template>
    <div>
      <h1>Business Feature</h1>
      <p>This feature is only available to business users.</p>
    </div>
  </template>
  
  <script>
  import {Auth} from "@/Services"
  export default {
    name: "BusinessFeature",
    data(){
        return {
            user: Auth.getUser(),
        }
    }
  };
  </script>
  
  <style scoped>
  /* Add styles if necessary */
  </style>
  