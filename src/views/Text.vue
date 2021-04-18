<template>
  <div id="app">
    <button class="btn" @click="downloadPDF">Download PDF</button>
    <div id="content" ref="pdf">
      <div
        v-for="chapterContent in chapterContents"
        v-bind:key="chapterContent.id"
      >
        <div class="page">
          <div class="frontHeader">
            <div class="frontHeaderLeft" :style="bgColor">
              <p id="bgNo"></p>
              <p id="headNo">{{ chapterContent[0] }}</p>
              <p :style="titleColor" id="headTitle">{{ chapterContent[1] }}</p>
            </div>
            <div class="frontHeaderRight">
              <p id="eTitle" :style="[bgColor, titleColor]">{{ chapterContent[2] }}</p>
              <p  id="intro">{{ chapterContent[3] }}</p>
            </div>
            
          </div>
          <div class="frontBody">
            <p class="solidLine" :style="bgColor"></p>
            <div
              class="eachSentence"
              v-for="firstPageContent in chapterContent.slice(5, 15)"
              v-bind:key="firstPageContent.id"
            >
              <div class="eachHead">
                <p class="square">□</p>
                <p class="eachNum">{{ firstPageContent[0] }}</p>
              </div>
              <div class="eachContent">
                <p class="firstEsentence" v-html="firstPageContent[1]"></p>
                <p class="firstJsentence">{{ firstPageContent[2] }}</p>
                <p class="dotline" :style="dotLine">--------------------------------------------------------------------------------------------------------------------------------</p>
              </div>
            </div>
            <p class="solidLine" :style="bgColor"  id="firstBottomLine"></p>
          </div>
          <footer>24/7English</footer>
        </div>
        <div class="page">
          <div class="backHeader" :style="bgColor">
            <div class="backTitle" :style="titleColor">
              {{ chapterContent[2] }}
            </div>
            <p id="bgNotwo"></p>
            <div class="backNum">
              {{ chapterContent[0] }}
            </div>
          <p class="solidLine" :style="bgColor" id="secondPageLine"></p>
          </div>
          <div class="backBody">
            <div
              class="eachSentenceBack"
              v-for="secondPageContent in chapterContent.slice(5, 15)"
              v-bind:key="secondPageContent.id"
            >
              <div class="eachHead">
                <p class="square">□</p>
                <p class="eachNum">{{ secondPageContent[0] }}</p>
              </div>
              <div class="eachContent">
                <p id="backJsentence">{{ secondPageContent[2] }}</p>
              </div>
              <div class="eachHint">
                <p id="hintone">◉ {{ secondPageContent[3] }}</p>
                <p id="hinttwo">{{ secondPageContent[4] }}</p>
              </div>
            </div>
            <div class="topic">
              {{ chapterContent[4] }}
            </div>
          </div>
          <p class="solidLine" :style="bgColor"></p>
          <footer>24/7English</footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import jsPDF from 'jspdf'
import html2canvas from "html2canvas"

export default {
  data() {
    return {
      pageSetting: [],
      chapterContents: [],
      // firstPageContents: [],
      // secondPageContents: [],
      bgColor: "",
      dotLine: "",
      titleColor: "",
    }
  },
  async created() {
    this.pageSetting = this.$route.query.pageSetting;
    this.chapterContents = this.$route.query.chapterContents;
    this.bgColor = { background: this.pageSetting[2] };
    this.titleColor = { color: this.pageSetting[3]};
    this.dotLine = { color: this.pageSetting[2]};




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
  methods: {
    downloadPDF() {
      console.log("start download");
      const source = this.$refs.pdf;
      // html2canvas(source).then((capture) => {
      //   const imgData = capture.toDataURL("image/png");
      //   // ここから追記
      //   const doc = new jsPDF();
      //   const width = doc.internal.pageSize.width;
      //   doc.addImage(imgData, "PNG", 10, 10, width * 0.9, 0);
      //   doc.addPage();
      //   doc.addImage(imgData, "PNG", 10, 10, width * 0.9, 0);
      //   doc.save("sample.pdf");
      // });
      html2canvas(source).then((canvas) => {
        //! MAKE YOUR PDF
        var pdf = new jsPDF("p", "pt", "b5");

        console.log(i <= source.offsetHeight / 980);

        for (var i = 0; i <= source.offsetHeight / 980; i++) {
          console.log("start for" + i);
          //! This is all just html2canvas stuff
          var srcImg = canvas;
          var sX = 0;
          var sY = 1120 * i; // start 980 pixels down for every new page
          var sWidth = 778;
          var sHeight = 1120;
          var dX = 0;
          var dY = 0;
          var dWidth = 778;
          var dHeight = 1120;

          const onePageCanvas = document.createElement("canvas");
          onePageCanvas.setAttribute("width", 778);
          onePageCanvas.setAttribute("height", 1120);
          var ctx = onePageCanvas.getContext("2d");
          // details on this usage of this function:
          // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images#Slicing
          ctx.drawImage(
            srcImg,
            sX,
            sY,
            sWidth,
            sHeight,
            dX,
            dY,
            dWidth,
            dHeight
          );

          // document.body.appendChild(canvas);
          var canvasDataURL = onePageCanvas.toDataURL("image/png", 1.0);

          var width = onePageCanvas.width;
          var height = onePageCanvas.clientHeight;

          //! If we're on anything other than the first page,
          // add another page
          if (i > 0) {
            pdf.addPage();
          }
          //! now we add content to that page!
          pdf.addImage(canvasDataURL, "PNG", 50, 50, width * 0.72, height * 0.71);
        }
        //! after the for loop is finished running, we save the pdf.
        pdf.save("result.pdf");
        console.log("end download");
      });
    },
}
}
</script>

<style>
#app {
  width: 182mm;
}

#content {
  transform: scale(0.81);
}

.page {
  height: 257mm;
}

#bgNo {
  background-color: #ffffff;
  border-radius: 50%;
  margin: 14px;
  height: 50px;
  width: 70px;
}

#headNo {
  position: relative;
  top: 9px;
  left: -59px;
  font-size: 18px;
  font-weight: 700;
}

#headTitle {
  font-size: 20px;
  text-align: left;
  width: 200px;
  position: relative;
  font-weight: 700;
  left: -45px;
  top: 4px;
}

.frontHeader {
  display: flex;
  width: 100%;
  height: 9%;
}

#eTitle {
  font-size: 20px;
  position: relative;
  top: 0;
  right: 1px;
  margin: 0;
  padding: 5px;
  padding-left: 15px;
  text-align: left;
  font-weight: 700;

}

.frontHeaderLeft {
  display: flex;
  font-size: 30px;
  width: 250px;
  border-radius: 0 0 10px 0;
}

.solidLine {
  height: 2px;
  position: relative;
  display: block;
  padding: 0;
  margin: 10px 0 5px 0; 
  width: 100%;
}


.square {
  margin: 14px 5px 2px 5px;
} 

.eachNum {
  margin: 16px 10px 2px 0;

}

.frontBody {
  position: relative;
}

.dotline {
  width: 690px;
  position: relative;
  right: 60px;
  top: 5px;
  margin: 0;
  z-index: 10;
}

#firstBottomLine {
  top: -18px;
  z-index: 10;
}

.eachSentence {
  display: flex;
  margin: 12px 0;
}

.eachHead {
  display: flex;
}

.eachContent {
  margin-left: 15px;
}

.firstEsentence {
  font-weight: bold;
  text-align: left;
  margin-bottom: 0;
  margin-top: 5px;
}

.firstJsentence {
  text-align: left;
  margin-top: 0;
  margin-bottom: 0;
}

#intro {
  font-size: 0.3px;
  text-align: left;
  padding-top: 2px;
  padding-left: 15px;
}

.backHeader {
  width: 100%;
  height: 5%;
  font-size: 20px;
  font-weight: 800;
  margin-bottom: 30px;
  margin-top: 420px;
}

.backTitle {
  text-align: center;
  position: relative;
  top: 10px;
}

.backNum {
  position: relative;
  top: -93px;
  left: 316px;
  font-size: 15px;
}

#bgNotwo {
  background-color: #FFFF;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  position: relative;
  top: -43px;
  left: 640px;

}

#secondPageLine {
  position: relative;
  top: -80px;
}

.eachSentenceBack {
  display: flex;
  margin: 1px 0;
  justify-content: space-between;
}

#hintone {
  margin-top: 9px;
  margin-bottom: 2px;

}

#hinttwo {
  margin-top: 2px;
  margin-bottom: 9px;
}

#backJsentence {
  text-align: left;
}

.eachHint {
  font-size: 12px;
}


</style>