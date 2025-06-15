import { BlueFoxJs } from "/modules/BlueFoxJs/bluefox-js.es.min.js";
(async () => {
  let sleep = (msec) => {
    return new Promise((resolve) => setTimeout(resolve, msec));
  };
  await BlueFoxJs.Walker.walkHorizontally(
    {
      _scope_: document,
      "[FloatTip]": async ($) => {
        let button = $.element.querySelector("button");
        let icon = $.element.querySelector("[icon]");
        let text = $.element.querySelector("[text]");

        let options = {
          threshold: 1.0,
        };
        let observer = new IntersectionObserver(async (entries, observer) => {
          await Promise.all(button.getAnimations().map((animation) => animation.finished));
          await Promise.all(text.getAnimations().map((animation) => animation.finished));
          await Promise.all(icon.getAnimations().map((animation) => animation.finished));

          if (entries[0].isIntersecting) {
            text.style.display = "inline";
            icon.animate(
              [
                {
                  rotate: "0deg",
                  easing: "ease-in-out"
                },
                {
                  rotate: "-360deg",
                  easing: "ease-in-out"
                }
              ],
              {
                duration: 500,
                delay: 100,
                fill: "forwards",
              }
            );
            button.animate(
              [
                {
                  width: text.style.width,
                  easing: "ease-in-out"
                },
                {
                  width: "180px",
                  easing: "ease-in-out"
                }
              ],
              {
                duration: 200,
                delay: 100,
                fill: "forwards",
              }
            );
            await Promise.all(icon.getAnimations().map((animation) => animation.finished));
            text.animate(
              [
                {
                  opacity: text.style.opacity,
                  easing: "ease-in-out"
                },
                {
                  opacity: "1",
                  easing: "ease-in-out"
                }
              ],
              {
                duration: 500,
                fill: "forwards",
              }
            );
          } else {
            text.animate(
              [
                {
                  opacity: text.style.opacity,
                  easing: "ease-in-out"
                },
                {
                  opacity: "0",
                  easing: "ease-in-out"
                }
              ],
              {
                duration: 500,
                delay: 200,
                fill: "forwards",
              }
            );
            await Promise.all(text.getAnimations().map((animation) => animation.finished));
            icon.animate(
              [
                {
                  rotate: "-360deg",
                  easing: "ease-in-out"
                },
                {
                  rotate: "0deg",
                  easing: "ease-in-out"
                }
              ],
              {
                duration: 500,
                delay: 200,
                fill: "forwards",
              }
            );
            button.animate(
              [
                {
                  width: text.style.width,
                  easing: "ease-in-out"
                },
                {
                  width: "70px",
                  easing: "ease-in-out"
                }
              ],
              {
                duration: 500,
                delay: 200,
                fill: "forwards",
              }
            );
            await Promise.all(icon.getAnimations().map((animation) => animation.finished));
            text.style.display = "none";
          }
        }, options);
        observer.observe(document.querySelector("[TopNav]>[NonStick]"));

        $.element.addEventListener("click", (event) => {
          document.querySelector("[inquiry]").scrollIntoView({ behavior: "smooth", block: "start" });
        });
      },
      "[OpenNav]": async ($) => {
        $.element.addEventListener("click", (event) => {
          let cover = document.querySelector("[Cover]");
          let sideNav = document.querySelector("[SideNav]");
          sideNav.animate(
            [
              {
                left: "-256px",
                easing: "ease-in-out"
              },
              {
                left: "0px",
                easing: "ease-in-out"
              }
            ],
            {
              duration: 200,
              fill: "forwards",
            }
          );
          cover.animate(
            [
              {
                opacity: "0",
                pointerEvents: "all",
                easing: "ease-in-out"
              },
              {
                opacity: "0.3",
                pointerEvents: "all",
                easing: "ease-in-out"
              }
            ],
            {
              duration: 200,
              fill: "forwards",
            }
          );
          let closer = async (event) => {
            sideNav.animate(
              [
                {
                  left: "0px",
                  easing: "ease-in-out"
                },
                {
                  left: "-256px",
                  easing: "ease-in-out"
                }
              ],
              {
                duration: 200,
                fill: "forwards",
              }
            );
            cover.animate(
              [
                {
                  opacity: "0.3",
                  pointerEvents: "none",
                  easing: "ease-in-out"
                },
                {
                  opacity: "0",
                  pointerEvents: "none",
                  easing: "ease-in-out"
                }
              ],
              {
                duration: 200,
                fill: "forwards",
              }
            );
            cover.removeEventListener("click", closer);
          };
          cover.addEventListener("click", closer);
        });
      },
      "form[Contact]": async ($) => {
        $.element.querySelector("button[CheckForm]").addEventListener("click", async (event) => {

          for (let element of $.element.querySelectorAll("[name]")) {
            if (!element.checkValidity()) {
              element.scrollIntoView({ behavior: "instant", block: "center" });
              await sleep(300);
              element.reportValidity();
              return;
            }
          }

          UIkit.modal(document.querySelector("#Modal-CheckForm")).show();
        });
      },
    }
  );
})();
