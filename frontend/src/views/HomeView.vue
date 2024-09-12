<script>
//import composers from '../assets/composers.json';
import { useComposerStore } from '@/stores/composers';
import ContactData from "@/components/ContactData.vue";

const pageSize = 20;

export default {
  name: 'HomeView',
  components: {ContactData},
  data() {
    return {
      composers: [],
      isLoading: true,
      activeComposerIndex: 0,
      pageIndex: 0,
    }
  },
  computed: {
    activeComposer: (that) => that.composersForPage[that.activeComposerIndex],
    maxPages: (that) => that.composers.length / 20,
    composersForPage() {
      return this.composers.slice(this.pageIndex * pageSize, this.pageIndex * pageSize + pageSize);
    }
  },
  mounted() {
    const composerStore = useComposerStore();
    composerStore.fetchComposers().then(() => {
      this.composers = composerStore.composers;
      this.isLoading = composerStore.isLoading;
      this.error = composerStore.error;
    });
  }
};
</script>

<template>
  <main v-if="!isLoading" class="mx-auto mb-20">
    <div class="composer-detail flex rounded mt-10 mb-10 p-4">
      <div class="profile ">
        <img :src="activeComposer?.img" class="profile-img rounded"/>
      </div>
      <div class="details flex flex-row ml-5">
        <div class="person-details mr-10">
          <h2 class="name">{{ activeComposer?.name }}</h2>

          <div><span class="item-label">Born</span>: {{ activeComposer?.dateOfBirth }}</div>
        </div>
        <ContactData :composer-id="activeComposer?.id" :key="activeComposer?.id"/>
      </div>
    </div>

    <div>
      <table class="composer-list">
        <thead>
        <tr>
          <th>Composer Name</th>
          <th>Date of Birth</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(composer, i) in composersForPage" :key="i"
            class="item cursor-pointer"
            @click="activeComposerIndex = i">

          <td class="p-2">{{ composer.name }}</td>
          <td class="p-2">{{ composer.dateOfBirth }}</td>
        </tr>
        </tbody>
      </table>

      <div class="mt-5">
        <button v-for="(p, i) in maxPages"
                @click="pageIndex = i"
                class="page-number-btn rounded bg-zinc-100 py-2 px-3 mr-2 text-zinc-600"
                :class="{'bg-zinc-200 text-blue-600': i === pageIndex}">
          {{ p }}
        </button>
      </div>
    </div>


  </main>
</template>

<style lang="scss">

main {
  width: 1280px;
}

.composer-detail {
  background: darken(whitesmoke, 20%);
  //height: 400px;

  .profile {
    .profile-img {
      filter: grayscale(1);
    }
  }

  .name {
    font-size: 1.4em;
    font-weight: bold;
  }
}

.composer-list {
  width: 100%;

  thead tr {
    background: darken(whitesmoke, 20%);
  }

  th {
    font-weight: bold;
    font-size: 1.1em;
  }

  .item {
    transition: background .5s ease;

    &:nth-child(even) {
      background: whitesmoke;
    }

    &:hover {
      background: darken(whitesmoke, 8%);
    }
  }
}

.page-number-btn {
  font-weight: bold;
  transition: background .5s ease;

  &:hover {
    background: darken(whitesmoke, 8%);
  }
}

.item-label {
  font-weight: 600;
}

h4, h5 {
  font-weight: bold;
}

h4 {
  font-size: 1.2em;
}

</style>
