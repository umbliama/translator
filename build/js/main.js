window.onload = () => {
  getLangs(
    `https://translate.yandex.net/api/v1.5/tr.json/getLangs?ui=en&key=trnsl.1.1.20190402T120324Z.f79353dd063ad3d1.a87fa23856d925eedcad3be1d14a6cd7e59bc8b2`
  );
  let button = document
    .querySelector(".btn-translate")
    .addEventListener("click", () => {
      let input = document.querySelector(".input");

      textToTranslate = input.value;
      if (textToTranslate === "" || textToTranslate === undefined) {
        alert("Please enter word that need to be translate");
      } else {
        //Call function to translate
        translate(
          `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20190402T120324Z.f79353dd063ad3d1.a87fa23856d925eedcad3be1d14a6cd7e59bc8b2&lang=${
            getLangValues().firstKey
          }-${getLangValues().secondKey}&text=${textToTranslate}&format=plain`
        );
      }
    });
  function translate(url) {
    let textToTranslate = "";
    let result = document.querySelector(".result");
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(jsonResponse => {
        let resultText = jsonResponse["text"];
        result.innerHTML = resultText;
      });
  }
  //Get langs keys from options
  function getLangValues() {
    let firstLang = document.querySelector("#firstlang");
    let secondLang = document.querySelector("#secondlang");

    let keys = {
      firstKey: "",
      secondKey: ""
    };
    //Keys like [az-ru]
    keys.firstKey = firstLang.value;
    keys.secondKey = secondLang.value;
    return keys;
  }

  //Put all langs to select element
  function getLangs(url) {
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(jsonResponse => {
        let langs = Object.keys(jsonResponse["langs"]);
        let selects = document.querySelectorAll("select");
        selects.forEach(select => {
          langs.forEach(key => {
            let value = jsonResponse["langs"][key];
            let option = document.createElement("option");
            option.value = key;
            option.innerHTML = value;
            select.appendChild(option);
          });
        });
      });
  }
};
