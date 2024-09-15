<template>
  <div class="create-post-container">
    <h1>Create a Post</h1>
    <form @submit.prevent="createPost">
      <label class="createPostLabel" for="name">Salon Name</label>
      <input
        id="name"
        v-model="name"
        type="text"
        placeholder="Salon Name"
        required
      />
      <label class="createPostLabel" for="location">Location</label>
      <input
        id="location"
        v-model="location"
        type="text"
        placeholder="Location"
        required
      />
      <label class="createPostLabel" for="open">Open Time</label>
      <input
        id="open"
        v-model="open"
        type="time"
        placeholder="Open Time"
        required
      />
      <label class="createPostLabel" for="close">Close Time</label>
      <input
        id="close"
        v-model="close"
        type="time"
        placeholder="Close Time"
        required
      />
      <label class="createPostLabel" for="source">Image URL</label>
      <input
        id="source"
        v-model="source"
        type="text"
        placeholder="Image URL"
        required
      />

      <div class="hairstyles">
        <h3>Hairstyles</h3>
        <div v-for="type in hairTypes" :key="type">
          <h4>{{ type.charAt(0).toUpperCase() + type.slice(1) }}</h4>
          <div v-for="(hairstyle, index) in hairstyles[type]" :key="index">
            <label :for="'hairstyleType' + index" class="createPostLabel"
              >Type</label
            >
            <input
              :id="'hairstyleType' + index"
              v-model="hairstyle.type"
              type="text"
              placeholder="Type"
              required
            />

            <label :for="'hairstylePrice' + index" class="createPostLabel"
              >Price</label
            >
            <input
              :id="'hairstylePrice' + index"
              v-model="hairstyle.price"
              type="number"
              placeholder="Price"
              required
            />

            <label :for="'hairstyleDuration' + index" class="createPostLabel"
              >Duration (minutes)</label
            >
            <input
              :id="'hairstyleDuration' + index"
              v-model="hairstyle.duration"
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

      <button type="submit">Create Post</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const name = ref("");
const location = ref("");
const open = ref("");
const close = ref("");
const source = ref("");
const hairTypes = ["short", "medium", "long", "other"];
const hairstyles = ref({
  short: [],
  medium: [],
  long: [],
  other: [],
});

const addHairstyle = (type) => {
  hairstyles.value[type].push({ type: "", price: 0, duration: 0 });
};

const createPost = async () => {
  const postData = {
    name: name.value,
    location: location.value,
    open: open.value,
    close: close.value,
    source: source.value,
    hairstyles: hairstyles.value,
    userId: store.getters.currentuserId, // Attach current user ID to the post
  };

  try {
    const response = await store.dispatch("add", postData);
    console.log("Post created successfully:", response);
    await store.dispatch("fetchPosts");
    router.push({ name: "home" }); // Redirect to home after successful post creation
  } catch (error) {
    console.error("Error creating post:", error);
  }
};
</script>

<style scoped>
.create-post-container {
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

.createPostLabel {
  text-align: left;
  margin-top: 10px;
}

.dark .create-post-container {
  background: #000000ad;
  color: #fff;
  border-color: #000;
}

.dark .create-post-container #name,
.dark .create-post-container #location,
.dark .create-post-container #open,
.dark .create-post-container #close,
.dark .create-post-container #source,
.dark .create-post-container #hairstyleType0,
.dark .create-post-container #hairstylePrice0,
.dark .create-post-container #hairstyleDuration0 {
  background-color: #000000ad;
  color: #fff;
}

.dark button {
  color: #fff;
}
</style>
