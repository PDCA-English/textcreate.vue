<template>
  <div id="app">
    <div class="frontHeader" :style="[bgColor, titleColor]">
      <div class="frontHeaderLeft">
        <p>{{chapterContents[0][0]}}</p>
        <p :style="titleColor">{{chapterContents[0][1]}}</p>
      </div>
      <div class="frontHeaderRight" :style="titleColor">
        <p>{{chapterContents[0][2]}}</p>
        <p>{{chapterContents[0][3]}}</p>
      </div>
    </div>
    <div class="frontBody">
      <div class="eachSentence" v-for="eachContents in chapterContents" v-bind:key="eachContents.id">
        <div class="eachHead" v-for="eachSentence in eachContents" v-bind:key="eachSentence.id">
          <p>□</p>
          <p>{{eachSentence[0]}}</p>
        </div>
        <div class="eachContent">
          <p v-html="chapterContents[0][5][1]"></p>
          <p>{{chapterContents[0][5][2]}}</p>
        </div>
      </div>
      <div class="eachSentence">
        <div class="eachHead">
          <p>□</p>
          <p>02</p>
        </div>
        <div class="eachContent">
          <p>{{chapterContents[0][6][1]}}</p>
          <p>{{chapterContents[0][6][2]}}</p>
        </div>
      </div>
      <div class="eachSentence">
        <div class="eachHead">
          <p>□</p>
          <p>03</p>
        </div>
        <div class="eachContent">
          <p>{{chapterContents[0][7][1]}}</p>
          <p>{{chapterContents[0][7][2]}}</p>
        </div>
      </div>
      <div class="eachSentence">
        <div class="eachHead">
          <p>□</p>
          <p>04</p>
        </div>
        <div class="eachContent">
          <p>{{chapterContents[0][8][1]}}</p>
          <p>{{chapterContents[0][8][2]}}</p>
        </div>
      </div>
      <div class="eachSentence">
        <div class="eachHead">
          <p>□</p>
          <p>05</p>
        </div>
        <div class="eachContent">
          <p>{{chapterContents[0][9][1]}}</p>
          <p>{{chapterContents[0][9][2]}}</p>
        </div>
      </div>
      <div class="eachSentence">
        <div class="eachHead">
          <p>□</p>
          <p>06</p>
        </div>
        <div class="eachContent">
          <p>{{chapterContents[0][10][1]}}</p>
          <p>{{chapterContents[0][10][2]}}</p>
        </div>
      </div>
      <div class="eachSentence">
        <div class="eachHead">
          <p>□</p>
          <p>07</p>
        </div>
        <div class="eachContent">
          <p>{{chapterContents[0][11][1]}}</p>
          <p>{{chapterContents[0][11][2]}}</p>
        </div>
      </div>
      <div class="eachSentence">
        <div class="eachHead">
          <p>□</p>
          <p>08</p>
        </div>
        <div class="eachContent">
          <p>{{chapterContents[0][12][1]}}</p>
          <p>{{chapterContents[0][12][2]}}</p>
        </div>
      </div>
      <div class="eachSentence">
        <div class="eachHead">
          <p>□</p>
          <p>09</p>
        </div>
        <div class="eachContent">
          <p>{{chapterContents[0][13][1]}}</p>
          <p>{{chapterContents[0][13][2]}}</p>
        </div>
      </div>
      <div class="eachSentence">
        <div class="eachHead">
          <p>□</p>
          <p>10</p>
        </div>
        <div class="eachContent">
          <p>{{chapterContents[0][14][1]}}</p>
          <p>{{chapterContents[0][14][2]}}</p>
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
      firstPageContents: [],
      secondPageContents: [],
      bgColor: "",
      titleColor: "",
    }
  },
  async created() {
    this.pageSetting = this.$route.query.pageSetting;
    this.chapterContents = this.$route.query.chapterContents;
    this.bgColor = { background: this.pageSetting[2] };
    this.titleColor = { color: this.pageSetting[3]};

    /* １ページ目のコンテンツまとめ */
    for (let i = 0; i < this.chapterContents.length; i++) {
      for (let j = 0; j < 10; j++) {
        this.firstPageContents.push(this.chapterContents[i][j+5].slice(0, 3))
      }
    }
    /* ２ページ目のコンテンツまとめ */
    for (let k = 0; k < this.chapterContents.length; k++) {
      for (let l = 0; l < 10; l++) {
        this.secondPageContents.push(this.chapterContents[k][l+5].slice(2, 5))
      }
    }



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