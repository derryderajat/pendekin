const QRLogo = require("qr-with-logo");

(async () => {
  const data = JSON.stringify({
    name: "Zacharie Happel",
    job: "Student/Intern",
  });
  const opts = {
    errorCorrectionLevel: "H",
    rendererOpts: { quality: 0.1 },
  };
  await QRLogo.generateQRWithLogo(
    data,
    "flotypus.png",
    opts,
    "PNG",
    `public/qr/${Date.now()}.png`
  );
})();
