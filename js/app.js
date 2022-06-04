//#region Propriedades

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

var canvasID = document.getElementById("canvasID");
var context = canvasID.getContext("2d");
var imagem = new Image();

var angulo = 0;
//#endregion

//#region Eventos de inicialização
window.onload = function () {
    imagem.src = "img/img3.jpg";

    imagem.onload = function () {
        AjustarDesenharImagem(this);
    };
}

function AjustarDesenharImagem(img) {
    var scale = Math.max(canvasID.width / img.width, canvasID.height / img.height);
    context.drawImage(imagem, 0, 0, img.width * scale, img.height * scale);
}
//#endregion

//#region Rotacionar imagem

function CalculoRotacao(graus) {
    return graus * Math.PI / 180;
}

function DefinirWidthHeight() {
    if (angulo == 90 || angulo == 270) {
        canvasID.width = imagem.height;
        canvasID.height = imagem.width;
    } else {
        canvasID.width = imagem.width;
        canvasID.height = imagem.height;
    }
}

function DefinirTranslate() {
    if (angulo == 90 || angulo == 270) {
        context.translate(imagem.height / 2, imagem.width / 2);
    } else {
        context.translate(imagem.width / 2, imagem.height / 2);
    }
}

function RotacionarHorario() {
    angulo += 90 % 360;

    DefinirWidthHeight();
    DefinirTranslate();

    context.rotate(CalculoRotacao(angulo))

    DefiniTipoCor();
    context.drawImage(imagem, -imagem.width / 2, -imagem.height / 2);
}

function RotacionarAntiHorario() {
    if (angulo == 0)
        angulo = 270;
    else
        angulo -= 90 % 360;

    DefinirWidthHeight();
    DefinirTranslate();

    context.rotate(CalculoRotacao(angulo))

    DefiniTipoCor();
    context.drawImage(imagem, -imagem.width / 2, -imagem.height / 2);

}
//#endregion

function DefiniTipoCor() {
    var select = document.getElementById("TipoCorID");
    var result = select.options[select.selectedIndex].value;

    if (result == "1")
        context.filter = 'grayscale(1)';
}

function SalvarImagem() {
    var canvas = document.getElementById("canvasID");
    var dataUrl = canvas.toDataURL();

    // var aLink = document.createElement('a');
    // var evt = document.createEvent("HTMLEvents");
    // evt.initEvent("click");
    // aLink.download = 'image.png';
    // aLink.href = image;
    // aLink.dispatchEvent(evt);

    // var dataURL = canvasID.toDataURL("image/jpg", 1.0);
    // downloadImage(dataURL, 'my-canvas.jpg');
}

function downloadImage(data, filename = 'untitled.jpg') {
    var a = document.createElement('a');
    a.href = data;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
}