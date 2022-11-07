let scoreDiv = document.querySelectorAll('.userScore');
let passTemp = document.querySelector('#pass');
let failTemp = document.querySelector('#fail');
let certificate = document.querySelector('#certificate');
let printBtn = document.querySelector('#print-cert');
let certificateDate = document.querySelector('#certificate .date');

let username;


let userScoreSaved = +localStorage.getItem('quantum_score');

if(userScoreSaved < 6){
    passTemp.style.display = 'none';
    failTemp.style.display = 'block'
} else {
    username = prompt('Enter your name. this will be used for your certificate');
    passTemp.style.display = 'block';
    failTemp.style.display = 'none';
}

scoreDiv.forEach(item => {
    item.textContent = `You scored ${userScoreSaved} / 10`;
})


// set certificate date 
let date = new Date();
let day = date.getDay();
let month = date.getMonth();
let year = date.getFullYear();
let monthArray = ['january', 'febuary', 'march', 'april' , 'may' , 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

let issueDate = `On <br> <span class="fw-bold">${day}, ${monthArray[month]} ${year} </span>`;
certificateDate.innerHTML = issueDate;
document.querySelector('.username').textContent = username;



// download certificate function 

$("#download-cert").click(function () {
    getScreenshotOfElement(
      $("#certificate").get(0),
      0,
      0,
      $("#certificate").width() + 35, // added 45 because the container's (content2) width is smaller than the image, if it's not added then the content from right side will get cut off
      $("#certificate").height() + 35, // same issue as above. if the container width / height is changed (currently they are fixed) then these values might need to be changed as well.
      function (data) {
        var pdf = new jsPDF("l", "pt", [
          $("#certificate").width(),
          $("#certificate").height()
        ]);
  
        pdf.addImage(
          "data:image/png;base64," + data,
          "PNG",
          0,
          0,
          $("#certificate").width(),
          $("#certificate").height()
        );
        pdf.save("qiskit-certificate.pdf");
      }
    );
  });
  
  // this function is the configuration of the html2cavas library (https://html2canvas.hertzen.com/)
  // $("#content2").removeClass('ml-215'); is the only custom line here, the rest comes from the library.
  function getScreenshotOfElement(element, posX, posY, width, height, callback) {
    html2canvas(element, {
      onrendered: function (canvas) {
        // $("#content2").removeClass('ml-215');  // uncomment this if resorting to ml-125 to resolve the issue
        var context = canvas.getContext("2d");
        var imageData = context.getImageData(posX, posY, width, height).data;
        var outputCanvas = document.createElement("canvas");
        var outputContext = outputCanvas.getContext("2d");
        outputCanvas.width = width;
        outputCanvas.height = height;
  
        var idata = outputContext.createImageData(width, height);
        idata.data.set(imageData);
        outputContext.putImageData(idata, 0, 0);
        callback(outputCanvas.toDataURL().replace("data:image/png;base64,", ""));
      },
      width: width,
      height: height,
      useCORS: true,
      taintTest: false,
      allowTaint: false
    });
  }
  