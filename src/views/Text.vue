<template>
  <div id="app">
    <div id="content" v-for="chapterContent in chapterContents" v-bind:key="chapterContent.id">
      <div class="frontHeader" :style="[bgColor, titleColor]">
        <div class="frontHeaderLeft">
          <p>{{chapterContent[0]}}</p>
          <p :style="titleColor">{{chapterContent[1]}}</p>
        </div>
        <div class="frontHeaderRight" :style="titleColor">
          <p>{{chapterContent[2]}}</p>
          <p>{{chapterContent[3]}}</p>
        </div>
      </div>
      <div class="frontBody">
        <div class="eachSentence" v-for="firstPageContent in chapterContent.slice(5, 15)" v-bind:key="firstPageContent.id">
          <div class="eachHead">
            <p>□</p>
            <p>{{firstPageContent[0]}}</p>
          </div>
          <div class="eachContent">
            <p v-html="firstPageContent[1]"></p>
            <p>{{firstPageContent[2]}}</p>
          </div>
        </div>
      </div>
      <footer>24/7English</footer>
      <div class="backHeader" :style="[bgColor, titleColor]">
        <div class="backTitle">
          {{chapterContent[2]}}
        </div>
        <div class="backNum">
          {{chapterContent[0]}}
        </div>
      </div>
      <div class="backBody">
        <div class="eachSentence" v-for="secondPageContent in chapterContent.slice(5, 15)" v-bind:key="secondPageContent.id">
          <div class="eachHead">
            <p>□</p>
            <p>{{secondPageContent[0]}}</p>
          </div>
          <div class="eachContent">
            <p>{{secondPageContent[2]}}</p>
          </div>
          <div class="eachHint">
            <p>{{secondPageContent[3]}}</p>
            <p>{{secondPageContent[4]}}</p>
          </div>
        </div>
        <div class="topic">
          {{chapterContent[4]}}
        </div>
      </div>

    </div>



  </div>
</template>

<script>
export default {
  data() {
    return {
      pageSetting: [],
      chapterContents: [],
      // firstPageContents: [],
      // secondPageContents: [],
      bgColor: "",
      titleColor: "",
    }
  },
  async created() {
    this.pageSetting = this.$route.query.pageSetting;
    this.chapterContents = this.$route.query.chapterContents;
    this.bgColor = { background: this.pageSetting[2] };
    this.titleColor = { color: this.pageSetting[3]};

    // /* １ページ目のコンテンツまとめ */
    // for (let i = 0; i < this.chapterContents.length; i++) {
    //   for (let j = 0; j < 10; j++) {
    //     this.firstPageContents.push(this.chapterContents[i][j+5].slice(0, 3))
    //   }
    // }
    // /* ２ページ目のコンテンツまとめ */
    // for (let k = 0; k < this.chapterContents.length; k++) {
    //   for (let l = 0; l < 10; l++) {
    //     this.secondPageContents.push(this.chapterContents[k][l+5].slice(2, 5))
    //   }
    // }



  },
}
</script>

<style>
.frontHeader {
  display: flex;
  width: 100%;
}

.frontHeaderLeft {
  display: flex;
  font-size: 30px;
  width: 50%;
}

.eachSentence {
  display: flex;
}

.eachHead {
  display: flex;
}

.strong {
  font-weight: 800;
}

</style>