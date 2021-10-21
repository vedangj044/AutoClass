console.log("reader loaded");

try {
  document.addEventListener(
    "click",
    function () {
      readfeed();
    },
    false
  );

  var username;
  setTimeout(function () {
    document.querySelector("#avatar-btn").click();
    document.getElementById("sections").style.display = "none";

    document.getElementById("chips").style.display = "none";

    document.getElementById("comments").style.display = "none";
    document.getElementById("contents").style.display = "none";

    var extensionname = document.createElement("div");
    extensionname.classList.add("ext-title");

    extensionname.innerText = "AutoClass";

    var extensionbutton = document.createElement("div");
    extensionbutton.classList.add("ext-button");
    extensionbutton.innerHTML = `<label class="toggle">
    <input class="toggle-checkbox" type="checkbox">
    <div class="toggle-switch"></div>
    <span class="toggle-label">Typically there is one operation called ______, that simply returns the element at the top of the stack?</span>
  </label>`;

    var checkform = document.createElement("div");
    extensionbutton.classList.add("container");
    checkform.innerHTML = `<div class="form-container">
    <div class="checkbox-container">
      <input type="checkbox" id="apple"/>
      <label class="checkbox" for="apple">Stack</label>
    </div>
    <div class="checkbox-container">
      <input type="checkbox" id="microsoft"/>
      <label class="checkbox" for="microsoft">Push</label>
    </div>
    <div class="checkbox-container">
      <input type="checkbox" id="linux"/>
      <label class="checkbox" for="linux">Pop</label>
    </div>
  </div>`;

    var extensioncont = document.getElementById("scroll-container");
    extensioncont.appendChild(extensionname);
    extensioncont.appendChild(extensionbutton);
    extensioncont.appendChild(checkform);

    document
      .querySelectorAll("ytd-continuation-item-renderer")
      .forEach((element) => {
        element.hidden = true;
      });
    setTimeout(function () {
      username = document.getElementById("account-name").innerText;
      console.log(username);
    }, 2000);
    document.querySelector("#avatar-btn").click();
  }, 3000);

  const readfeed = () => {
    setTimeout(function () {
      console.log("Hello");

      var links = [];
      var contentitems = document.querySelectorAll("[id='contents']");
      var items = contentitems[1].getElementsByTagName("a");
      for (var i = 0; i < items.length; i += 2) {
        links.push(items[i].href);
      }
      console.log(links);

      var linkset = new Set(links);

      var allitems = contentitems[1].querySelectorAll(
        "ytd-compact-video-renderer"
      );

      allitems.forEach((element) => {
        var hrefval = element.getElementsByTagName("a")[0].href;
        if (linkset.has(hrefval)) {
          element.hidden = true;
        }
      });
    }, 6000);
  };

  readfeed();

  const STYLE = document.createElement("style");
  STYLE.innerText = `
  .ext-title {
    font-size: var(--yt-navbar-title-font-size, 1.8rem);
    font-weight: 400;
    line-height: var(--yt-navbar-title-line-height, 2.4rem);
    color: var(--ytd-video-primary-info-renderer-title-color, var(--yt-spec-text-primary));
    font-family: var(--ytd-video-primary-info-renderer-title-font-family, inherit);
    font-size: var(--ytd-video-primary-info-renderer-title-font-size, var(--yt-navbar-title-font-size, inherit));
    font-variant: var(--ytd-video-primary-info-renderer-title-font-variant, inherit);
    transform: var(--ytd-video-primary-info-renderer-title-transform, none);
    text-shadow: var(--ytd-video-primary-info-renderer-title-text-shadow, none);
    padding-bottom: 20px;
  }
  .ext-button {
    padding-bottom: 20px;
  }
  .toggle {
    cursor: pointer;
    display: inline-block;
  }

  .toggle-switch {
    display: inline-block;
    background: #ccc;
    border-radius: 12px;
    width: 45px;
    height: 24px;
    position: relative;
    vertical-align: middle;
    transition: background 0.25s;
  }
  .toggle-switch:before, .toggle-switch:after {
    content: "";
  }
  .toggle-switch:before {
    display: block;
    background: linear-gradient(to bottom, #fff 0%, #eee 100%);
    border-radius: 50%;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25);
    width: 18px;
    height: 18px;
    position: absolute;
    top: 3px;
    left: 2px;
    transition: left 0.25s;
  }
  .toggle:hover .toggle-switch:before {
    background: linear-gradient(to bottom, #fff 0%, #fff 100%);
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.5);
  }
  .toggle-checkbox:checked + .toggle-switch {
    background: #56c080;
  }
  .toggle-checkbox:checked + .toggle-switch:before {
    left: 25px;
  }
  .toggle-checkbox {
    position: absolute;
    visibility: hidden;
  }
  .toggle-label {
    margin-left: 5px;
    position: relative;
    top: 2px;
    color: var(--ytd-video-primary-info-renderer-title-color, var(--yt-spec-text-primary));
    font-family: var(--ytd-video-primary-info-renderer-title-font-family, inherit);
  }
  .container{
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--ytd-video-primary-info-renderer-title-color, var(--yt-spec-text-primary));
    font-family: var(--ytd-video-primary-info-renderer-title-font-family, inherit);
  }
    
  input[type="checkbox"]{
    display:none;
  }
  
  input[type="checkbox"]:hover + label:before{
    opacity: .5;
  }
  
  .checkbox{
    display:inline-block;
    position:relative;
    padding-left:40px;
    line-height: 40px;
    font-size: 20px;
    cursor: pointer;
    color: #111;
    font-weight: 600;
  }
  
  .checkbox:before{
    z-index:15;
    content: '';
    position:absolute;
    left:0;
    top: 6px;
    transition:all 0.3s ease;
    cursor:pointer;
    width:20px;
    border-width: 4px;
    border-style: solid;
    border-color: #444;
    height:20px;
  }
  input[type="checkbox"]:checked + label{
    color:#000;
  }
  
  input[type="checkbox"]:checked +  label:before{
    border-color: transparent;
    border-left-color: #2ecc71;
    border-bottom-color: #2ecc71;
    transform:rotate(-50deg);
    width:22px;
    height:12px;
    top: 3px;
  }
  `;
  document.body.append(STYLE);
} catch (e) {
  console.log("error in reading feed", e);
}
