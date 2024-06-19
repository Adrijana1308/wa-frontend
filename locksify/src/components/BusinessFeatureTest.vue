<template>
  <div class="create-post-container">
    <h1>Create a Post</h1>
    <form @submit.prevent="createPost">
      <input v-model="name" type="text" placeholder="Salon Name" required />
      <input v-model="location" type="text" placeholder="Location" required />
      <input v-model="open" type="time" placeholder="Open Time" required />
      <input v-model="close" type="time" placeholder="Close Time" required />
      <input v-model="source" type="text" placeholder="Image URL" required />

      <div class="hairstyles">
        <h3>Hairstyles</h3>
        <div v-for="type in hairTypes" :key="type">
          <h4>{{ type.charAt(0).toUpperCase() + type.slice(1) }}</h4>
          <div v-for="(hairstyle, index) in hairstyles[type]" :key="index">
            <input v-model="hairstyle.type" type="text" placeholder="Type" required />
            <input v-model="hairstyle.price" type="number" placeholder="Price" required />
            <input v-model="hairstyle.duration" type="number" placeholder="Duration (minutes)" required />
          </div>
          <button type="button" @click="addHairstyle(type)">Add {{ type }} Hairstyle</button>
        </div>
      </div>

      <button type="submit">Create Post</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
  name: 'CreatePost',
  setup() {
    const name = ref('');
    const location = ref('');
    const open = ref('');
    const close = ref('');
    const source = ref('');
    const hairTypes = ['short', 'medium', 'long', 'other'];
    const hairstyles = ref({
      short: [],
      medium: [],
      long: [],
      other: []
    });

    const addHairstyle = (type) => {
      hairstyles.value[type].push({ type: '', price: 0, duration: 0 });
    };

    const createPost = async () => {
      const postData = {
        name: name.value,
        location: location.value,
        open: open.value,
        close: close.value,
        source: source.value,
        hairstyles: hairstyles.value
      };

      try {
        const response = await axios.post('http://localhost:3000/posts', postData);
        console.log('Post created successfully:', response.data);
      } catch (error) {
        console.error('Error creating post:', error);
      }
    };

    return {
      name,
      location,
      open,
      close,
      source,
      hairTypes,
      hairstyles,
      addHairstyle,
      createPost
    };
  }
};
</script>

<style scoped>
.create-post-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

form {
  display: flex;
  flex-direction: column;
}

input {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #0056b3;
}

.hairstyles {
  margin-top: 20px;
}

.hairstyles h4 {
  margin-bottom: 5px;
}

.hairstyles div {
  display: flex;
  flex-direction: column;
}

.hairstyles div input {
  margin-bottom: 5px;
}

.hairstyles button {
  align-self: flex-start;
  margin-top: 10px;
}
</style>
