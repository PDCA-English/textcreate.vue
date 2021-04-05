<template>
  <div id="app">
    <div class="frontHeader">
      <div class="frontHeaderLeft">
        <p>{{chapterContents[0][0]}}</p>
        <p>{{chapterContents[0][1]}}</p>
      </div>
      <div class="frontHeaderRight">
        <p>{{chapterContents[0][2]}}</p>
        <p>{{chapterContents[0][3]}}</p>
      </div>
    </div>
    <div class="frontBody">
      <div class="eachSentence">
        <div class="eachHead">
          <p>□</p>
          <p>01</p>
        </div>
        <div class="eachContent">
          <p>{{chapterContents[0][5][1]}}</p>
          <p>{{chapterContents[0][5][5]}}</p>
        </div>
      </div>
      <div class="eachSentence">
        <div class="eachHead">
          <p>□</p>
          <p>02</p>
        </div>
        <div class="eachContent">
          <p>{{chapterContents[0][6][1]}}</p>
          <p>{{chapterContents[0][6][5]}}</p>
        </div>
      </div>
      <div class="eachSentence">
        <div class="eachHead">
          <p>□</p>
          <p>03</p>
        </div>
        <div class="eachContent">
          <p>{{chapterContents[0][7][1]}}</p>
          <p>{{chapterContents[0][7][5]}}</p>
        </div>
      </div>
      <div class="eachSentence">
        <div class="eachHead">
          <p>□</p>
          <p>04</p>
        </div>
        <div class="eachContent">
          <p>{{chapterContents[0][8][1]}}</p>
          <p>{{chapterContents[0][8][5]}}</p>
        </div>
      </div>
      <div class="eachSentence">
        <div class="eachHead">
          <p>□</p>
          <p>05</p>
        </div>
        <div class="eachContent">
          <p>{{chapterContents[0][9][1]}}</p>
          <p>{{chapterContents[0][9][5]}}</p>
        </div>
      </div>
      <div class="eachSentence">
        <div class="eachHead">
          <p>□</p>
          <p>06</p>
        </div>
        <div class="eachContent">
          <p>{{chapterContents[0][10][1]}}</p>
          <p>{{chapterContents[0][10][5]}}</p>
        </div>
      </div>
      <div class="eachSentence">
        <div class="eachHead">
          <p>□</p>
          <p>07</p>
        </div>
        <div class="eachContent">
          <p>{{chapterContents[0][11][1]}}</p>
          <p>{{chapterContents[0][11][5]}}</p>
        </div>
      </div>
      <div class="eachSentence">
        <div class="eachHead">
          <p>□</p>
          <p>08</p>
        </div>
        <div class="eachContent">
          <p>{{chapterContents[0][12][1]}}</p>
          <p>{{chapterContents[0][12][5]}}</p>
        </div>
      </div>
      <div class="eachSentence">
        <div class="eachHead">
          <p>□</p>
          <p>09</p>
        </div>
        <div class="eachContent">
          <p>{{chapterContents[0][13][1]}}</p>
          <p>{{chapterContents[0][13][5]}}</p>
        </div>
      </div>
      <div class="eachSentence">
        <div class="eachHead">
          <p>□</p>
          <p>10</p>
        </div>
        <div class="eachContent">
          <p>{{chapterContents[0][14][1]}}</p>
          <p>{{chapterContents[0][14][5]}}</p>
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
      bgColor: "",
      titleColor: "",
    }
  },
  async created() {
    this.pageSetting = this.$route.query.pageSetting;
    this.chapterContents = this.$route.query.chapterContents;
    this.bgColor = this.pageSetting[2];
    this.titleColor = this.pageSetting[3];
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

</style>