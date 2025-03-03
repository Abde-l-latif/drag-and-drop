let LIST = document.querySelector(".list");
let PLUS = document.querySelector(".plus");
let INPUT = document.querySelector("input");

let ARRAY = [];

function GETSTORAGE() {
  LIST.innerHTML = "";
  if (JSON.parse(window.localStorage.getItem("DATA"))) {
    let INITIAL = JSON.parse(window.localStorage.getItem("DATA"));
    if (INITIAL) {
      ARRAY = INITIAL;
      INITIAL.forEach((x) => {
        let BUTTON = document.createElement("button");
        let DIV = document.createElement("DIV");
        DIV.classList.add("note");
        DIV.setAttribute("id", x.id);
        DIV.innerHTML = `
                  <i class="fa-solid fa-xmark"></i>
              <textarea placeholder=" write your note ..."> ${x.value} </textarea>
        `;
        DIV.style.left = x.x;
        DIV.style.top = x.y;
        DIV.addEventListener("click", (e) => {
          if (e.target.tagName == "I") {
            e.target.parentElement.remove();
            ARRAY = ARRAY.filter((ITEM) => {
              return ITEM.id != x.id;
            });
            setStorage(ARRAY);
          }
        });
        BUTTON.style.backgroundColor = x.color;
        BUTTON.innerText = "add";
        DIV.appendChild(BUTTON);
        DIV.style.borderTop = `30px solid ${x.color}`;
        LIST.appendChild(DIV);
      });
    }
  }
}

GETSTORAGE();

function CREATENOTE() {
  LIST.innerHTML = "";
  ARRAY.forEach((e) => {
    let BUTTON = document.createElement("button");
    let DIV = document.createElement("DIV");
    DIV.classList.add("note");
    DIV.setAttribute("id", e.id);
    DIV.innerHTML = `
              <i class="fa-solid fa-xmark"></i>
          <textarea placeholder=" write your note ...">${e.value}</textarea>
    `;
    BUTTON.style.backgroundColor = e.color;
    BUTTON.innerText = "add";
    DIV.appendChild(BUTTON);
    DIV.style.borderTop = `30px solid ${e.color}`;
    LIST.appendChild(DIV);
    DIV.style.left = e.x;
    DIV.style.top = e.y;
    DIV.addEventListener("click", (e) => {
      if (e.target.tagName == "I") {
        e.target.parentElement.remove();
        ARRAY = ARRAY.filter((x) => {
          return x.id != e.target.parentElement.id;
        });
        setStorage(ARRAY);
      }
    });
    BUTTON.onclick = () => {
      ARRAY = ARRAY.map((x) => {
        if (BUTTON.parentElement.id == x.id) {
          x.value = BUTTON.parentElement.children[1].value;
        }
        return x;
      });
      setStorage(ARRAY);
    };
  });
}

let setStorage = (VALUE) => {
  window.localStorage.setItem("DATA", JSON.stringify(VALUE));
};

PLUS.onclick = () => {
  if (JSON.parse(window.localStorage.getItem("DATA"))) {
    ARRAY = JSON.parse(window.localStorage.getItem("DATA"));
  } else {
    ARRAY = [];
  }
  let data = {
    color: INPUT.value,
    value: "",
    id: new Date().getTime(),
    x: null,
    y: null,
  };
  ARRAY.push(data);
  setStorage(ARRAY);
  CREATENOTE();
};

/*DRAG AN DROP*/

let position = {
  x: null,
  y: null,
};

let noty = {
  Dom: null,
  x: null,
  y: null,
};

document.onmousedown = (e) => {
  if (e.target.classList.contains("note")) {
    position = {
      x: e.clientX,
      y: e.clientY,
    };
    noty = {
      Dom: e.target,
      x: e.target.getBoundingClientRect().x,
      y: e.target.getBoundingClientRect().y,
    };
  }
};

document.onmousemove = (e) => {
  if (noty.Dom == null) {
    return;
  }

  let currentPos = {
    x: e.clientX,
    y: e.clientY,
  };

  let distance = {
    x: currentPos.x - position.x,
    y: currentPos.y - position.y,
  };

  ARRAY = JSON.parse(localStorage.getItem("DATA"));

  ARRAY.map((event) => {
    if (event.id == e.target.id) {
      event.x = noty.x + distance.x + "px";
      event.y = noty.y + distance.y + "px";
    }
  });

  setStorage(ARRAY);

  noty.Dom.style.left = noty.x + distance.x + "px";
  noty.Dom.style.top = noty.y + distance.y + "px";
  noty.Dom.style.cursor = "grab";
};

document.onmouseup = () => {
  if (noty.Dom == null) return;
  noty.Dom.style.cursor = "auto";
  noty.Dom = null;
};

// localStorage.clear();
