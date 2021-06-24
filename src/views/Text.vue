<template>
  <div id="app">
    <button class="btn" @click="downloadPDF">Download PDF</button>
    <div id="content" ref="pdf">
      <div
        v-for="chapterContent in chapterContents"
        v-bind:key="chapterContent.id"
      >
        <div class="page">
          <img src="../assets/logo.png" alt="" class="logo">
          <div class="frontHeader">
            <div class="frontHeaderLeft" :style="bgColor">
              <p id="bgNo"></p>
              <p id="headNo">{{ chapterContent[0] }}</p>
              <p :style="titleColor" id="headTitleBr" v-if="chapterContent[1].includes('<br>')" v-html="chapterContent[1]"></p>
              <p :style="titleColor" id="headTitle" v-else-if="chapterContent[1].length < 8" v-html="chapterContent[1]"></p>
              <p :style="titleColor" id="headTitleSh" v-else-if="chapterContent[1].length >= 8 && chapterContent[1].length < 9" v-html="chapterContent[1]"></p>
              <p :style="titleColor" id="headTitleBr" v-else-if="getByteLength(chapterContent[1]) >= 9" v-html="chapterContent[1]"></p>
            </div>
            <div class="frontHeaderRight">
              <p id="eTitleBr" :style="[bgColor, titleColor]" v-if="chapterContent[2].includes('<br>')" v-html="chapterContent[2]"></p>
              <p id="eTitle" :style="[bgColor, titleColor]" v-else-if="getByteLength(chapterContent[1]) < 21" v-html="chapterContent[2]"></p>
              <p id="eTitleSh" :style="[bgColor, titleColor]" v-else-if="getByteLength(chapterContent[1]) >= 21 && getByteLength(chapterContent[1]) < 30" v-html="chapterContent[2]"></p>
              <p id="eTitleBr" :style="[bgColor, titleColor]" v-else-if="getByteLength(chapterContent[1]) >= 30" v-html="chapterContent[2]"></p>
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
                <p class="firstEsentenceBr" v-if="firstPageContent[1].includes('<br>')" v-html="firstPageContent[1]"></p>
                <p class="firstEsentence" v-else v-html="firstPageContent[1]"></p>
                <p class="firstJsentenceBr" v-if="firstPageContent[1].includes('<br>')">{{firstPageContent[3]}}</p>
                <p class="firstJsentence" v-else>{{firstPageContent[3]}}</p>
                <p class="dotline" :style="dotLine"  v-if="firstPageContent[0] !== '10'">--------------------------------------------------------------------------------------------------------------------------</p>
              </div>
            </div>
            <p class="solidLine" :style="bgColor"  id="firstBottomLine"></p>
          </div>
          <footer>24/7English</footer>
          <p class="pageNumOne">p.1</p>
        </div>
        <div class="page" id="secondPage">
          <!-- <img src="../assets/back.png" alt="" class="pic"> -->
          <div class="backHeader" :style="bgColor">
            <div class="backTitle" :style="titleColor">
              {{ chapterContent[2] }}
            </div>
            <div class="wboxOne"></div>
            <div class="wboxTwo"></div>
            <p id="bgNotwo"></p>
            <div class="backNum">
              {{ chapterContent[0] }}
            </div>
          <p class="solidLine" :style="bgColor" id="secondPageLine"></p>
          </div>
          <div class="backBody">
            <div
              class="eachSentenceBack"
              v-for="secondPageContent in chapterContent.slice(5, 16)"
              v-bind:key="secondPageContent.id"
            >
              <div class="secondFlex">            
                <div class="eachHead" id="eachSecondHead">
                  <p class="square" id="secondSquare">□</p>
                  <p class="eachNum" id="secondEachNum">{{ secondPageContent[0] }}</p>
                </div>
                <div class="eachContent" id="backEachContent">
                  <p id="longBackJsentence" v-if="secondPageContent[2].includes('<br>')" v-html="secondPageContent[2]"></p>
                  <p id="shortBackJsentence" v-else-if="getByteLength(secondPageContent[2]) < 78" v-html="secondPageContent[2]"></p>
                  <p id="backJsentence" v-else-if="getByteLength(secondPageContent[2]) >= 78 && getByteLength(secondPageContent[2]) <= 81" v-html="secondPageContent[2]"></p>
                  <p id="longBackJsentence" v-else-if="getByteLength(secondPageContent[2]) > 81" v-html="secondPageContent[2]"></p>
                </div>
                <div class="eachHint" :style="dotLine">
                  <!-- <p id="hintone" v-html="secondPageContent[5]"></p> -->

                  <p id="hintoneSh" v-if="secondPageContent[5].includes('<b>') && !secondPageContent[6].includes('<br>') && !secondPageContent[6].includes('<a>')" v-html="secondPageContent[5]"></p>
                  <p id="hintoneTwolineBrSh" v-else-if="secondPageContent[5].includes('<b>') && (secondPageContent[6].includes('<br>') || secondPageContent[6].includes('<a>'))" v-html="secondPageContent[5]"></p>
                  <p id="hintoneBothBr" v-else-if="(secondPageContent[5].includes('<br>') || secondPageContent[5].includes('<a>')) && (secondPageContent[6].includes('<br>') || secondPageContent[6].includes('<a>'))" v-html="secondPageContent[5]"></p>
                  <p id="hintoneTwolineBr" v-else-if="(secondPageContent[5].includes('<br>') || secondPageContent[5].includes('<a>')) && (!secondPageContent[6].includes('<br>') || !secondPageContent[6].includes('<a>'))" v-html="secondPageContent[5]"></p>
                  <p id="hintoneOnelineBr" v-else-if="(!secondPageContent[5].includes('<br>') || !secondPageContent[5].includes('<a>')) && (secondPageContent[6].includes('<br>') || secondPageContent[6].includes('<a>'))" v-html="secondPageContent[5]"></p>
                  <p id="hintone" v-else v-html="secondPageContent[5]"></p>

                  <!-- <p id="hinttwo" v-html="secondPageContent[6]"></p> -->

                  <p id="hinttwoSh" v-if="secondPageContent[6].includes('<b>') && !secondPageContent[5].includes('<br>') && !secondPageContent[5].includes('<a>')" v-html="secondPageContent[6]"></p>
                  <p id="hinttwoOnelineBrSh" v-else-if="secondPageContent[6].includes('<b>') && (secondPageContent[5].includes('<br>') || secondPageContent[5].includes('<a>'))" v-html="secondPageContent[6]"></p>
                  <p id="hinttwoBothBr" v-else-if="(secondPageContent[6].includes('<br>') || secondPageContent[6].includes('<a>')) && (secondPageContent[5].includes('<br>') || secondPageContent[5].includes('<a>'))" v-html="secondPageContent[6]"></p>
                  <p id="hinttwoTwolineBr" v-else-if="(secondPageContent[6].includes('<br>') || secondPageContent[6].includes('<a>')) && (!secondPageContent[5].includes('<br>') || !secondPageContent[5].includes('<a>'))" v-html="secondPageContent[6]"></p>
                  <p id="hinttwoOnelineBr" v-else-if="(!secondPageContent[6].includes('<br>') || !secondPageContent[6].includes('<a>'))&& (secondPageContent[5].includes('<br>') || secondPageContent[5].includes('<a>'))" v-html="secondPageContent[6]"></p>
                  <p id="hinttwo" v-else v-html="secondPageContent[6]"></p>

                </div>
              </div>
              <p class="dotline" id="secondDot" :style="dotLine" v-if="secondPageContent[0] !== '10'">--------------------------------------------------------------------------------------------------------------------------</p>
            </div>
            <div class="topicHead">Simulation</div>
            <div class="topic" v-html="chapterContent[4]">
            </div>
            <div class="topic" id="simulationBar" :style="bgColor"></div>
            <div class="topic" id="cTopic" :style="bgColor"></div>
            <div class="topic" id="wTopic"></div>
            <div class="triangleUpLeft"></div>
            <div class="triangleUpRight"></div>
            <img src="../assets/string.png" alt="">
            <div class="hole"></div>
          </div>
          <p class="solidLine" :style="bgColor" id="lastLine"></p>
          <footer id="lastFooter">24/7English</footer>
          <p class="pageNumTwo">p.2</p>
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
  },
  methods: {
    getByteLength(str){
      str = (str==null)?"":str;
      return encodeURI(str).replace(/%../g, "*").length;
    },
    downloadPDF() {
      console.log("start download");
      const source = this.$refs.pdf;
      
      html2canvas(source,{
        scale: 3,
        logging: true,
        letterRendering: 1,
        useCORS: true,
        allowTaint: false
      }).then((canvas) => {
        //! MAKE YOUR PDF
        var pdf = new jsPDF("p", "pt", "b5", true);

        console.log(i <= source.offsetHeight / 980);

        for (var i = 0; i <= (source.offsetHeight / 980) -1; i++) {
          console.log("start for" + i);
          //! This is all just html2canvas stuff
          var srcImg = canvas;
          var sX = 0;
          var sY = 1120 * 3 * i; // start 980 pixels down for every new page
          var sWidth = 778*3;
          var sHeight = 1120*3;
          var dX = 0;
          var dY = 0;
          var dWidth = 778*3;
          var dHeight = 1120*3;

          const onePageCanvas = document.createElement("canvas");
          onePageCanvas.setAttribute("width", 778*3);
          onePageCanvas.setAttribute("height", 1120*3);
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
          pdf.addImage(canvasDataURL, "PNG", 50/3, 50/3, width * 0.71/3, height * 0.8/3, "", "FAST");

          if ((i+1) % 2 == 0) {
            pdf.save(this.pageSetting[0] + "-" + this.chapterContents[((i+1)/2)-1][0].slice( -2 ) + ".pdf");
            pdf = new jsPDF("p", "pt", "b5", true);
            pdf.deletePage(1);
            // pdf.deletePage(1);
          }
        }
        //! after the for loop is finished running, we save the pdf.
        // pdf.save("result.pdf");
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

.page {
  height: 257mm;
  margin-right: 20px;
  padding: 17px 47px 40px 35px;
  margin-bottom: 70px;
  font-family: "メイリオ", Meiryo;
}

#bgNo {
  background-color: #ffffff;
  border-radius: 50%;
  margin: 18px 11px 14px 17px;
  height: 55px;
  width: 53px;
  position: absolute;
}

#headNo {
  position: relative;
  top: 13px;
  left: 19px;
  font-size: 17px;
  font-weight: 700;
}

#headTitle {
  font-size: 23px;
  text-align: left;
  width: 171px;
  position: relative;
  font-weight: 700;
  left: 39px;
  top: 0;
  padding-right: 0px;
}

#headTitleSh {
  font-size: 23px;
  text-align: left;
  width: 171px;
  position: relative;
  font-weight: 700;
  left: 39px;
  top: 0;
  padding-right: 0px;
  letter-spacing: -2px;
}

.frontHeader {
  display: flex;
  width: 100%;
  height: 9%;
}

#eTitle {
  font-size: 18px;
  position: relative;
  top: 0;
  right: 1px;
  margin: 0;
  padding: 27px 0 22px 0px;
  text-align: left;
  font-weight: 700;
  height: 38.5px;
  width: 323px;
}

#eTitleBr {
  font-size: 18px;
  position: relative;
  top: 0;
  right: 1px;
  margin: 0;
  padding: 27px 0 22px 0px;
  text-align: left;
  font-weight: 700;
  height: 38.5px;
  width: 323px;
  line-height: 19px;
}

#eTitleSh {
  font-size: 18px;
  position: relative;
  top: 0;
  right: 1px;
  margin: 0;
  padding: 27px 0 22px 0px;
  text-align: left;
  font-weight: 700;
  height: 38.5px;
  width: 323px;
  letter-spacing: -1px;
}

.deleteDot {
  color: black;
}

.frontHeaderLeft {
  display: flex;
  font-size: 30px;
  width: 263px;
}

.solidLine {
  height: 2px;
  position: relative;
  display: block;
  padding: 0;
  margin: 19px 0 5px 0;
  width: 100%;
}


.square {
  margin: 10px 5px 2px 4px;
  font-size: 17px;
  font-weight: bold;
} 

.eachNum {
  margin: 10px 28px 2px 2px;
  font-size: 17px;
  font-weight: 900;
}

.frontBody {
  position: relative;
}

.dotline {
  width: 690px;
  position: relative;
  right: 81px;
  top: 5px;
  margin: 0;
  height: 5px;
  z-index: 10;
  text-align: left;
  font-size: 0.5px;
  font-weight: 900;
}

.frontBody .dotline {
  padding-left: 12px;
}


.eachSentence {
  display: flex;
  margin: 8.5px 0;
}

.eachHead {
  display: flex;
}

.eachContent {
  width: 506px;
  height: 60px;
}

.backBody .eachContent {
  width: 70%;
}

.backBody {
  position: relative;
  top: 10px;
}

.firstEsentence {
  text-align: left;
  margin-bottom: 0;
  margin-top: 5px;
  font-size: 16.5px;
  font-weight: 600;
  letter-spacing: -0.2px;
}

.firstEsentenceBr {
  text-align: left;
  margin-bottom: 0;
  margin-top: 5px;
  font-size: 16.5px;
  font-weight: 600;
  letter-spacing: -0.2px;
  line-height: 18px;
  margin-top: -3px;
}

.firstJsentence {
  text-align: left;
  margin-top: 0;
  margin-bottom: 0;
  font-size: 12px;
  position: relative;
  top: -1px;
  font-weight: 700;
}

.firstJsentenceBr {
  text-align: left;
  margin-top: 0;
  margin-bottom: 0;
  font-size: 12px;
  position: relative;
  top: -1px;
  font-weight: 700;
  margin-top: 5px;
  margin-bottom: -8px;
}

#intro {
  font-size: 0.3px;
  text-align: left;
  padding-top: 2px;
  padding-left: 15px;
  display: none;
}

.backHeader {
  width: 100%;
  height: 79px;
  font-size: 20px;
  font-weight: 800;
  POSITION: relative;
  top: -10px;
}

.backTitle {
  text-align: center;
  position: relative;
  top: 0px;
  font-size: 24px;
}

.backNum {
  position: relative;
  font-size: 13px;
  width: 60px;
  margin: 0 0 0 auto;
  top: -64px;
  right: 16px;
}

.wboxOne {
 position: absolute;
  width: 100%;
  height: 29px;
  background-color: #ffffff;
  top: 50px;
  opacity: 0.2;
}

.wboxTwo {
  position: absolute;
  width: 100%;
  height: 19px;
  background-color: #ffffff;
  top: 60px;
  opacity: 0.4;

}

#bgNotwo {
  background-color: #FFFF;
  border-radius: 50%;
  width: 41px;
  height: 40px;
  position: relative;
  margin: 0 26px 0 auto;
  top: -29px;
  padding: 0;
}

#secondPageLine {
  position: relative;
  top: -12px;
  width: 584px;
  margin-left: 2.5px;
}

#eachSecondHead {
  height: 52px;
  width: 66px;
}

#secondSquare {
  font-size: 17px;
  font-weight: bold;
  height: 22px;
  position: relative;
  top: 6px;
  right: -4px;
  margin-right: 9px;
}

#secondEachNum {
  margin: 16px 28px 2px 2px;
  font-size: 17px;
  font-weight: 900;
}

.eachSentenceBack {
  margin: 0;
  height: 51px;
  position: relative;
  top: 11px;
}

.secondFlex {
  display: flex;
  height: 52px;
}

#secondDot {
  position: relative;
  top: -6px;
  left: 9px;
}

#backEachContent {
  height: 51px;
  width: 326px;
  font-size: 13px;
  padding: 5px 0 0 1px;
  font-weight: 700;
}

#hintone {
  margin-top: 9px;
  margin-bottom: 2px;
}

#hintoneSh {
  margin-top: 9px;
  margin-bottom: 2px;
  letter-spacing: -1px;
}

#hintoneBothBr {
  margin-top: 9px;
  margin-bottom: 2px;
  margin-top: 1px;
  line-height: 12px;
}

#hintoneTwolineBr {
  margin-top: 9px;
  margin-bottom: 2px;
  margin-top: 5px;
  line-height: 11px;
}

#hintoneTwolineBrSh {
  margin-top: 9px;
  margin-bottom: 2px;
  margin-top: 5px;
  line-height: 11px;
  letter-spacing: -1px;
}

#hintoneOnelineBr {
  margin-top: 9px;
  margin-bottom: 2px;
  margin-top: 3px;
}

#hinttwo {
  margin: 2px 0 9px 12px;
}

#hinttwoSh {
  margin: 2px 0 9px 12px;
  letter-spacing: -1.2px;
}

#hinttwoBothBr {
  margin: 2px 0 9px 12px;
  margin-top: -1px;
  line-height: 10px;
}

#hinttwoTwolineBr {
  margin: 2px 0 9px 12px;
  line-height: 12px;
}

#hinttwoOnelineBr {
  margin: 2px 0 9px 12px;
}

#hinttwoOnelineBrSh {
  margin: 2px 0 9px 12px;
  letter-spacing: -1.2px;
}

#backJsentence {
  text-align: left;
  padding: auto 0;
  height: 60px;
  width: 326px;
  letter-spacing: -1px;
}

#longBackJsentence {
  text-align: left;
  margin: auto 0;
  padding-top: 5px;
  height: 60px;
  width: 326px;
}

#shortBackJsentence {
  text-align: left;
  padding: auto 0;
  height: 60px;
  width: 326px;
}

.eachHint {
  font-size: 10px;
  width: 303px;
  padding: 5px 0 0 0;
  text-align: left;
  font-weight: 700;
}

footer {
  position: relative;
  top: 7px;
  font-size: 12px;
  right: -222px;
}

.topic {
  text-align: left;
  width: 422px;
  height: 80px;
  margin: 0 0 0 52px;
  padding: 55px 14px 0 97px;
  border-radius: 1px;
  position: relative;
  top: 10px;
  font-size: 11px;
  z-index: 8;
  font-weight: 600;
}

.topicHead {
  display: inline;
  position: relative;
  font-weight: 600;
  top: 48px;
  z-index: 10;
  left: -156px;
  font-size: 19px;
}

#cTopic {
  z-index: 7;
  position: absolute;
  top: 549px;
}

#wTopic {
  background-color: #ffffff;
  opacity: 0.7;
  z-index: 7;
  position: absolute;
  top: 549px;
}

#simulationBar {
  z-index: 9;
  top: -99px;
  height: 0px;
  padding: 8px;
  width: 92px;
  left: 31px;
}

.triangleUpLeft {
  width: 0;
  height: 0;
  border-top: 12px solid #ffffff;
  border-bottom: 12px solid transparent;
  border-left: 12px solid #ffffff;
  border-right: 12px solid transparent;
  position: absolute;
  z-index: 10;
  top: 549px;
  right: 510px;
}

.triangleUpRight {
  width: 0;
  height: 0;
  border-top: 12px solid transparent;
  border-bottom: 12px solid #ffffff;
  border-left: 12px solid #ffffff;
  border-right: 12px solid transparent;
  position: absolute;
  z-index: 10;
  top: 660px;
  right: 510px;
}

#lastLine {
  top: 8px;
  left: 2px;
}

#lastFooter {
  top: 16px;
  font-size: 12px;
  right: -222px;
}

.pic {
  opacity: 0.5;
  z-index: 10;
  position: absolute;
  width: 62%;
  left: 43px;
  top: 1217px;;
}

#secondPage {
  margin-bottom: 34px;
  padding-top: 97px;
}

.hole {
  border-radius: 50%;
  background-color: #ffffff;
  width: 14px;
  height: 14px;
  z-index: 9;
  position: absolute;
  top: 609.5px;
  left: 66px;
}

img {
  position: absolute;
  width: 64px;
  z-index: 10;
  left: 9px;
  top: 607px;
}

.logo {
  position: relative;
  z-index: 10;
  width: 124px;
  top: 7px;
  left: 236px;
}

.pageNumOne {
  display: inline;
  position: relative;
  left: 278px;
  top: -16px;
  font-size: 12px;
}

.pageNumTwo {
  display: inline;
  position: relative;
  left: 278px;
  top: -7px;
  font-size: 12px;
}

#headTitleBr {
  font-size: 23px;
  text-align: left;
  width: 162px;
  position: relative;
  font-weight: 700;
  left: 39px;
  top: 0;
  padding-right: 0px;
  line-height: 27px;
  margin-top: 17px;
}

</style>