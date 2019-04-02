window.onload = () => {
  getLangs(
    `https://translate.yandex.net/api/v1.5/tr.json/getLangs?ui=en&key=trnsl.1.1.20190402T120324Z.f79353dd063ad3d1.a87fa23856d925eedcad3be1d14a6cd7e59bc8b2`
  );

  let firstLang = document.querySelector("#firstLang");
  let firstLangValues = firstLang.options;
  firstLangValues.forEach(option => {
    console.log(option);
  });

  let textToTranslate = "";
  let input = document.querySelector(".input");
  let result = document.querySelector(".result");
  let resultText = "";
  let button = document
    .querySelector(".btn-translate")
    .addEventListener("click", () => {
      textToTranslate = input.value;
      if (textToTranslate === "" || textToTranslate === undefined) {
        alert("Please enter word that need to be translate");
      } else {
        translate(
          `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20190402T120324Z.f79353dd063ad3d1.a87fa23856d925eedcad3be1d14a6cd7e59bc8b2&lang=en-ru&text=${textToTranslate}&format=plain`
        );
      }
    });
  function translate(url) {
    let xhr = new XMLHttpRequest();
    // let token = 'trnsl.1.1.20190402T120324Z.f79353dd063ad3d1.a87fa23856d925eedcad3be1d14a6cd7e59bc8b2';

    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4 && xhr.status === 200) {
        let json = JSON.parse(xhr.response);
        let resultText = json["text"];
        result.innerHTML = resultText;
      } else if (xhr.status === 400 || xhr.status === 403) {
        alert("Request error");
        xhr.abort();
      }
    };
    xhr.open("get", url);

    xhr.send();
  }

  function getLangs(url) {
    let xhr = new XMLHttpRequest();
    // let token = 'trnsl.1.1.20190402T120324Z.f79353dd063ad3d1.a87fa23856d925eedcad3be1d14a6cd7e59bc8b2';

    xhr.onload = () => {
      if (xhr.status === 200) {
        let json = JSON.parse(xhr.responseText);
        let keys = Object.keys(json["langs"]);
        let selects = document.querySelectorAll("select");
        selects.forEach(select => {
          keys.forEach(key => {
            let option = document.createElement("option");
            option.value = key;
            option.innerHTML = key;
            select.appendChild(option);
          });
        });
      } else {
      }
    };
    xhr.open("get", url);

    xhr.send();
  }
};
