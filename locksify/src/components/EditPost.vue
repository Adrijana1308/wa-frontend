<template>
  <div class="edit-post">
    <h1>Edit Post</h1>
    <form @submit.prevent="submitPost">
      <input v-model="editedPost.name" type="text" placeholder="Salon Name" required />
      <input v-model="editedPost.location" type="text" placeholder="Location" required />
      <input v-model="editedPost.open" type="time" placeholder="Open Time" required />
      <input v-model="editedPost.close" type="time" placeholder="Close Time" required />
      <input v-model="editedPost.source" type="text" placeholder="Image URL" />

      <div class="hairstyles">
        <h3>Hairstyles</h3>
        <div v-for="(type, index) in hairTypes" :key="index">
          <h4>{{ type.charAt(0).toUpperCase() + type.slice(1) }}</h4>
          <div v-for="(hairstyle, idx) in editedPost.hairstyles[type]" :key="idx">
            <input v-model="hairstyle.type" type="text" placeholder="Type" required />
            <input v-model.number="hairstyle.price" type="number" placeholder="Price" required />
            <input v-model.number="hairstyle.duration" type="number" placeholder="Duration (minutes)" required />
          </div>
          <button type="button" @click="addHairstyle(type)">Add {{ type }} Hairstyle</button>
        </div>
      </div>

      <button type="submit">Save Changes</button>
    </form>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { mapActions } from 'vuex'; // Import mapActions to handle Vuex actions
import { Posts } from '../Services/index.js';

export default {
  name: 'EditPost',
  props: {
    postId: {
      type: String,
      required: true
    }
  },
  setup(props, { emit }) {
    const editedPost = ref({
      name: '',
      location: '',
      open: '',
      close: '',
      source: '',
      hairstyles: {
        short: [],
        medium: [],
        long: [],
        other: []
      }
    });

    const hairTypes = ['short', 'medium', 'long', 'other'];

    const fetchPostDetails = async () => {
      try {
        const postData = await Posts.getPostById(props.postId);
        editedPost.value = postData;
      } catch (error) {
        console.error('Error fetching post details:', error);
      }
    };

    const addHairstyle = (type) => {
      editedPost.value.hairstyles[type].push({ type: '', price: 0, duration: 0 });
    };

    const submitPost = async () => {
      try {
        const response = await Posts.updatePost(props.postId, editedPost.value);
        console.log('Post updated successfully:', response.data);
        emit('postUpdated', response); // Emit event after successful update
        router.push({name: 'home'});
      } catch (error) {
        console.error('Error submitting post:', error);
      }
    };

    onMounted(() => {
      fetchPostDetails();
    });

    return {
      editedPost,
      hairTypes,
      addHairstyle,
      submitPost,
    };
  }
};
</script>
  
  <style scoped>
  .edit-post {
    max-width: 600px;
    margin: 140px auto;
    padding: 20px;
    background: blanchedalmond;
    border: 10px solid #d890f530;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  form {
    margin: 20px;
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
    background: #d890f530;
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
  