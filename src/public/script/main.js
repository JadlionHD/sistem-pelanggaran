(() => {
  var e = {
      931: (e) => {
        e.exports = function (e) {
          const r = document.querySelector("input#password"),
            t = document.querySelector("input#username");
          "4" === e.value
            ? ((t.placeholder = "NIS"), (r.name = "tgl_lahir"), (t.type = "number"), (r.type = "date"))
            : ((t.placeholder = "Username"), (r.name = "Password"), (t.type = "text"), (r.type = "password"));
        };
      }
    },
    r = {};
  function t(o) {
    var a = r[o];
    if (void 0 !== a) return a.exports;
    var n = (r[o] = { exports: {} });
    return e[o](n, n.exports, t), n.exports;
  }
  (() => {
    const e = t(931);
    document.querySelector("#sebagai").addEventListener("change", (r) => {
      var t = document.querySelector("#sebagai");
      e(t), console.log(t.value);
    });
  })();
})();
