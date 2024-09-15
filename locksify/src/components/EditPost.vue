<template>
  <div class="edit-post">
    <h1>Edit Post</h1>
    <form @submit.prevent="submitPost">
      <label for="editedPostName" class="EditPostLabel">Salon Name</label>
      <input
        id="editedPostName"
        v-model="editedPost.name"
        type="text"
        placeholder="Salon Name"
        required
      />

      <label for="editedPostLocation" class="EditPostLabel">Location</label>
      <input
        id="editedPostLocation"
        v-model="editedPost.location"
        type="text"
        placeholder="Location"
        required
      />

      <label for="editedPostOpen" class="EditPostLabel">Open Time</label>
      <input
        id="editedPostOpen"
        v-model="editedPost.open"
        type="time"
        placeholder="Open Time"
        required
      />

      <label for="editedPostClose" class="EditPostLabel">Close Time</label>
      <input
        id="editedPostClose"
        v-model="editedPost.close"
        type="time"
        placeholder="Close Time"
        required
      />

      <label for="editedPostSource" class="EditPostLabel">Image URL</label>
      <input
        id="editedPostSource"
        v-model="editedPost.source"
        type="text"
        placeholder="Image URL"
      />

      <div class="hairstyles">
        <h3>Hairstyles</h3>
        <div v-for="(type, index) in hairTypes" :key="index">
          <h4>{{ type.charAt(0).toUpperCase() + type.slice(1) }}</h4>
          <div
            v-for="(hairstyle, idx) in editedPost.hairstyles[type]"
            :key="idx"
          >
            <label :for="'hairstyleType' + idx" class="EditPostLabel"
              >Type</label
            >
            <input
              :id="'hairstyleType' + idx"
              v-model="hairstyle.type"
              type="text"
              placeholder="Type"
              required
            />

            <label :for="'hairstylePrice' + idx" class="EditPostLabel"
              >Price</label
            >
            <input
              :id="'hairstylePrice' + idx"
              v-model.number="hairstyle.price"
              type="number"
              placeholder="Price"
              required
            />

            <label :for="'hairstyleDuration' + idx" class="EditPostLabel"
              >Duration (minutes)</label
            >
            <input
              :id="'hairstyleDuration' + idx"
              v-model.number="hairstyle.duration"
              type="number"
              placeholder="Duration (minutes)"
              required
            />
          </div>
          <button type="button" @click="addHairstyle(type)">
            Add {{ type }} Hairstyle
          </button>
        </div>
      </div>

      <button type="submit">Save Changes</button>
    </form>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { mapActions } from "vuex"; // Import mapActions to handle Vuex actions
import { Posts } from "../Services/index.js";
import { useRouter } from "vue-router";

export default {
  name: "EditPost",
  props: {
    postId: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const editedPost = ref({
      name: "",
      location: "",
      open: "",
      close: "",
      source: "",
      hairstyles: {
        short: [],
        medium: [],
        long: [],
        other: [],
      },
    });

    const hairTypes = ["short", "medium", "long", "other"];
    const router = useRouter();

    const fetchPostDetails = async () => {
      try {
        const postData = await Posts.getPostById(props.postId);
        editedPost.value = postData;
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };

    const addHairstyle = (type) => {
      editedPost.value.hairstyles[type].push({
        type: "",
        price: 0,
        duration: 0,
      });
    };

    const submitPost = async () => {
      try {
        const response = await Posts.updatePost(props.postId, editedPost.value);
        console.log("Post updated successfully:", response.data);
        emit("postUpdated", response); // Emit event after successful update
        router.push({ name: "home" });
      } catch (error) {
        console.error("Error submitting post:", error);
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
  },
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
  margin: 7px;
  padding: 10px;
  background: #d890f530;
  color: black;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  color: rgba(0, 0, 0, 1);
  transform: scale(1.1);
  transition: 0.1s ease-in-out;
}

.EditPostLabel {
  text-align: left;
  margin-top: 10px;
}

.dark .edit-post {
  background: #000000ad;
  color: #fff;
  border-color: #000;
}

.dark .edit-post #editedPostName,
.dark .edit-post #editedPostLocation,
.dark .edit-post #editedPostOpen,
.dark .edit-post #editedPostClose,
.dark .edit-post #editedPostSource,
.dark .edit-post #hairstyleType0,
.dark .edit-post #hairstylePrice0,
.dark .edit-post #hairstyleDuration0 {
  background-color: #000000ad;
  color: #fff;
}

.dark button {
  color: #fff;
}
</style>
