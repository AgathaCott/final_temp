let addBtn = document.getElementById('button-add');
let inputWord = document.getElementById('input-word');
let wordBox = document.querySelector('.dictionary');
let strings = wordBox.querySelectorAll('.columns');
let stringFirst = strings[0];

addBtn.addEventListener('click', () => {
  createNewString();
});

inputWord.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    createNewString();
  }
});

function createNewString() {
  if (inputWord.value.length > 0) { 
    const rusWord = inputWord.value;
    const engWord = transliter(rusWord);

    let clonedString = stringFirst.cloneNode(true);

    let newEng = clonedString.querySelector('.right-column');
    newEng.style.borderTop = '1px solid #111111';
    newEng.style.borderTopRightRadius = '0px';

    let newRus = clonedString.querySelector('.left-column');
    newRus.style.borderTop = '1px solid #111111';
    newRus.style.borderTopLeftRadius = '0px';

    let newRusText = clonedString.querySelector('.left-word');
    newRusText.innerText = truncate(rusWord);

    let newEngText = clonedString.querySelector('.right-word');
    newEngText.innerText = truncate(engWord);


    let deleteIcon = document.createElement('img');
    deleteIcon.src = 'icons/delete.png';
    deleteIcon.className = 'delete-icon';


    deleteIcon.addEventListener('click', (event) => {
      event.target.closest('.columns').remove();
      numUpdate();
    });

    let strings = wordBox.querySelectorAll('.columns');
    for (let i = 1; i < strings.length; i++) {
      strings[i].style.borderRadius = "0px";
    }

    newEng.appendChild(deleteIcon);
    wordBox.appendChild(clonedString);
    numUpdate();


    if (rusWord.length > 7) {
      let newRusToolTip = document.createElement('div');
      newRusToolTip.innerText = rusWord;

      newRusToolTip.className = 'tooltip'
      newRusToolTip.style.display = 'none';

      newRusText.addEventListener('mouseover', () => {
        newRusToolTip.style.display = 'block'
      });

      clonedString.addEventListener('mouseleave', () => {
        newRusToolTip.style.display = 'none';

        let newEngToolTip = document.createElement('div');
        newEngToolTip.innerText = engWord;

        newEngToolTip.className = 'tooltip'
        newEngToolTip.style.display = 'none';

        newEngText.addEventListener('mouseover', () => {
          newEngToolTip.style.display = 'block';
        });

        clonedString.addEventListener('mouseleave', () => {
          newEngToolTip.style.display = 'none';
        });

        newRus.appendChild(newRusToolTip);
        newEng.appendChild(newEngToolTip);

        if (rusWord.length > 35) {
          newEngToolTip.style.overflowX = 'scroll';
          newRusToolTip.style.overflowX = 'scroll';
        }

      });
    }
  }
}

function numUpdate() {
  inputWord.value = '';
  strings = wordBox.querySelectorAll('.columns');
  let order = document.querySelectorAll('.left-number');
  for (let i = 1; i < order.length; i++) {
    order[i].innerText = `${i + 1}`;
  }
}

let cleanBtn = document.getElementById('delete-all');
cleanBtn.addEventListener('click', () => {
  clean();
});

function clean() {
  let strings = wordBox.querySelectorAll('.columns');
  for (let i = strings.length - 1; i > 0; i--) {
    strings[i].remove();
    numUpdate()
  }
}

function truncate(str) {
  if (str.length > 7) {
    str = `${str.slice(0, 7)}...`;
  }
  return str;
}


let abc = {

  '??': 'a',    '??': 'b',    '??': 'v',    '??': 'g',    '??': 'd',

  '??': 'e',    '??': 'yo',   '??': 'zh',   '??': 'z',    '??': 'i',

  '??': 'y',    '??': 'k',    '??': 'l',    '??': 'm',    '??': 'n',

  '??': 'o',    '??': 'p',    '??': 'r',    '??': 's',    '??': 't',

  '??': 'u',    '??': 'f',    '??': 'h',    '??': 'c',    '??': 'ch',

  '??': 'sh',   '??': 'sch',  '??': '\'',   '??': 'y',    '??': '',

  '??': 'e',    '??': 'yu',   '??': 'ya',

  '??': 'A',    '??': 'B',    '??': 'V',    '??': 'G',    '??': 'D',

  '??': 'E',    '??': 'Yo',   '??': 'Zh',   '??': 'Z',    '??': 'I',

  '??': 'Y',    '??': 'K',    '??': 'L',    '??': 'M',    '??': 'N',

  '??': 'O',    '??': 'P',    '??': 'R',    '??': 'S',    '??': 'T',

  '??': 'U',    '??': 'F',    '??': 'H',    '??': 'C',    '??': 'Ch',

  '??': 'Sh',   '??': 'Sch',  '??': '\'',   '??': 'Y',    '??': '',

  '??': 'E',    '??': 'Yu',   '??': 'Ya'

};

function transliter(word) {
  let russianWord = '';
  for (let i = 0; i < word.length; i++) {
    const currentLetter = word[i]
    if (!abc[currentLetter]) {
      return word;
    } else {
      russianWord += abc[currentLetter];
    }
  }
  return russianWord;
}
