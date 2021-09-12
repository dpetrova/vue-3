v-bind with arguments:
<template>
  <!-- src and alt are arguments passed to v-bind -->
  <img v-bind:src="imageAttrs.source" v-bind:alt="imageAttrs.text" />
</template>
<script>
export default {
  data() {
    return {
      imageAttrs: {
        src: '/vue-mastery-logo.png',
        text: 'Vue Mastery Logo'
      }
    }
  }
}
</script>

v-bind with no arguments:
<template>
  <!-- by passing in an argument to v-bind, we bind a specific property to this particular attribute -->
  <img v-bind="{ src: imageAttrs.source, alt: imageAttrs.text }" />
</template>

or more abstracted:
<template>
  <img v-bind="imageAttrs" />
</template>


v-on with arguments:
<template>
  <!-- the event name we define (click and mouseover) is actually an argument being passed to v-on -->
  <img v-on:click="openGallery" v-on:mouseover="showTooltip" />
</template>
<script>
export default {
  methods: {
    openGallery() { ... },
    showTooltip() { ... }
  }
}
</script>

v-on with no arguments:
<template>
  <!-- when pass an object to v-on, key is mapped to the event that is listen to, 
  and value is mapped to the method that we want to assign to that event  -->
  <img v-on="{ click: openGallery, mouseover: showTooltip }" />
</template>

or more abstracted:
<template>
  <img v-on="inputEvents" />
</template>
<script>
export default {
  computed: {
    inputEvents: {
      click: this.openGallery,
      mouseover: this.showTooltip
    }
  },
  methods: {
    openGallery() { ... },
    showTooltip() { ... }
  }
}
</script>

Simple components with an easy to understand structure has little reason to use an abstracted syntax. 
However, as our components become more complex and difficult to understand, the newly acquired technique
has a lot of applications.

For example, let’s consider the scenario where you are building a NewsFeed component 
where the API will pass a series of components that changes based on what the editors want. 
This means that sometimes you will get NewsArticle components, but sometimes you’ll get NewsAd components.
1.render either the NewsArticle or NewsAd component using the "is" attribute that is defined with content.type
2.binding dynamic attributes for the NewsArticle component: article-title and article-content
3.binding dynamic attributes for the NewsAd component: ad-image and ad-heading
<template>
  <main>
    <Component
      v-for="content in apiResponse"
      :key="content.id"
      :is="content.type"
      :article-title="content.title"
      :article-content="content.body"
      :ad-image="content.image"
      :ad-heading="content.heading"
      @click="content.type === 'NewsArticle' ? openArticle : openAd"
      @mouseover="content.type === 'NewsArticle' ? showPreview : trackAdEvent"
    />
  </main>
</template>

Refactoring NewsFeed:
<template>
  <main>
    <Component
      v-for="content in apiResponse"
      :key="content.id"
      :is="content.type"
      v-bind="feedItem(content).attrs"
      v-on="feedItem(content).events"
    />
  </main>
</template>
<script>
export default {
  methods: {
    feedItem(item) {
      if (item.type === 'NewsArticle') {
        return {
          attrs: {
            'article-title': item.title,
            'article-content': item.content
          },
          events: {
            click: this.openArticle,
            mouseover: this.showPreview
          }
        }
      } else if (item.type === 'NewsAd') {
        return {
          attrs: {
            'ad-image': item.image,
            'ad-heading': item.heading
          },
          events: {
            click: this.openAd,
            mouseover: this.trackAdEvent
          }
        }
      }
    }
  }
}
</script>
