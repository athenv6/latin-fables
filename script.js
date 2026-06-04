<script>
document.addEventListener("DOMContentLoaded", function () {

  window.g = function (w) {

    let t = "";

    if (w === "fimum") t = "terram";
    else if (w === "escam") t = "cibum";
    else if (w === "iaspis") t = "sapientia / lapis preciosus";
    else if (w === "sorde") t = "immunditia";
    else if (w === "messis") t = "fructus";
    else if (w === "repertor") t = "inventor";
    else if (w === "nitor") t = "splendor";
    else if (w === "conuenio") t = "congruo / aptus sum";
    else if (w === "prosum") t = "utilis sum";
    else if (w === "prodes") t = "utilis es";
    else if (w === "cara") t = "pretiosa";
    else if (w === "stolido") t = "stulto / insipiente";

    document.getElementById("gloss").innerHTML = t;
  };

});
</script>
