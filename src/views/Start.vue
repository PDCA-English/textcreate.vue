<template>
  <div id="app">
    <input type="file" @change="loadCsvFile" />
    <p>{{ message }}</p>
    <button @click="nextPage()">変換</button>

 
    <table border="1">
      <tr v-for="(worker, index) in workers" :key="index">
        <td v-for="(column, index) in worker" :key="index">{{ column }}</td>
      </tr>
    </table>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      message: "",
      workers: [],
      pageSetting: [],
      chapterContents: [],
    };
  },
  methods: {
    loadCsvFile(e) {
      let vm = this;
      vm.workers = [];
      vm.message = "";
      vm.pageSetting = [];
      vm.chapterContents = [];
      let file = e.target.files[0];
 
      let reader = new FileReader();
      reader.readAsText(file);
 
      reader.onload = () => {
        let lines = reader.result.split("\n");
        lines.shift();
        let linesArr = [];
        for (let i = 0; i < lines.length; i++) {
          linesArr[i] = lines[i].split("\t");
        }
        vm.workers = linesArr;

        // vm.workersのそれぞれの配列の10〜18までを全て削除したい
        for (let h = 0; h < vm.workers.length; h++) {
          vm.workers[h].splice(10, 9);
        }
        console.log("vm.workers",vm.workers);
        
        // ページ情報を取得s
        for (let j = 0; j < 4; j++) {
          vm.pageSetting.push(linesArr[0].[j]);
        }
        console.log("pageSetting",vm.pageSetting);

        // 登録されたチャプター情報のみを取得
        let chapterUnique = [];
        for (let k = 0; k < linesArr.length; k++) {
          chapterUnique.push(linesArr[k].[4],linesArr[k].[5],linesArr[k].[6],linesArr[k].[7],linesArr[k].[8]);
          // console.log("chapterUnique",chapterUnique)
        }
        chapterUnique = chapterUnique.filter(function (x, i, self) {
          return self.indexOf(x) === i;
          });
        // console.log("chapterUnique",chapterUnique);

        // それぞれのチャプターの内容のみ抽出
        let eachChapter = [];
        let mulNum = 5;
        for (let l = 0; l < chapterUnique.length/mulNum; l++) {
          eachChapter.push(chapterUnique.slice(mulNum*l, (l+1)*mulNum));
        }
          // console.log("eachChapter",eachChapter);
          // console.log("eachChapter.length",eachChapter.length);

        // 登録された例文のみを取得
        let sentenceUnique = [];
        for (let m = 0; m < linesArr.length; m++) {
          sentenceUnique.push(linesArr[m].slice(9, 22));
        }
          console.log("sentenceUnique",sentenceUnique);

        // 登録された例文をそれぞれのチャプターへ挿入
        let eachContent = [];
        for (let n = 0; n < eachChapter.length; n++) {
          eachContent.push(sentenceUnique.slice(10*n, (n+1)*10));
        }
        // console.log("eachContent",eachContent);

        // 例文とチャプターの情報をまとめてchapterContentsへ格納
        for (let n = 0; n < eachChapter.length; n++) {
          vm.chapterContents.push(eachChapter[n].concat(eachContent[n]));
        }
        console.log("vm.chapterContents",vm.chapterContents)
      };
    },
    nextPage: function() {
      this.$router.push({ name: "Text", query: { pageSetting: this.pageSetting, chapterContents: this.chapterContents } });
    }
  }
};
</script>