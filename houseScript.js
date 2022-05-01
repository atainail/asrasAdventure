
class Game {

  constructor(state) {
    this.state = state
  }

  // start game
  ready() {
    const word = this.state.words[this.state.followingWrd]
    this.ftrWd(word.word)
  }

  // to filter the mystery words
  ftrWd(word) {
    console.log(this.state)
    this.state.highScore = this.getHighScore()

    let letters = word.split('')
    let chars = []
    let r_WdLetters = []

    const rNum = randNum(letters.length)

    letters.map((letter, i) => {
      chars.push({
        letter: letter,
        isSame: i === rNum[0] || i === rNum[1] ? true : false
      })
    })

    const randomText = generateMixText(letters, rNum)

    randomText.map(ran => {
      r_WdLetters.push({
        letter: ran,
        isClicked: false
      })
    })

    this.state.letters.letters = chars
    this.state.rdm_ltrs = r_WdLetters
    this.render()

  }


  getHighScore() {
    let storage = localStorage.getItem('highscore')
    const now = new Date().getTime()
    if (storage) {
      storage = JSON.parse(storage)
      if (storage.exp > now) {
        return storage
      }
    }
  }


  // to check word letter
  chkLttr(l) {

    let random_WdLttrs = this.state.rdm_ltrs
    let letters = this.state.letters.letters
    let letra = this.state.letters.letters.map(l => {
      return l.letter
    })

    random_WdLttrs.map(ran => {
      if (ran.letter === l) {
        ran.isClicked = true
      }
    })

    letters.map(letter => {
      if (letter.letter === l) {
        this.state.letters.length = this.state.letters.length + 1
        letter.isSame = true
      }
    })

    const n = letra.includes(l)
    n ? this.state.recordScore = this.state.recordScore + 1 : this.state.chances = this.state.chances - 1

    this.state.letters.letters = letters
    this.state.rdm_ltrs = random_WdLttrs

    this.render();
    gameScore = this.state.recordScore;
    checkIfIWon();
    

  }


  render() {


    const header = document.querySelector('.header')
    header.innerHTML = `<h1></h1>`


    const keyPlacer = document.querySelector('.keysPlacer')
    const l = document.querySelector('.letters')

    keyPlacer.innerHTML = this.state.rdm_ltrs.map(t =>
      `<div class="keyText ${t.isClicked ? 'clicked' : ''}" 
          data-letter="${t.letter}">${t.letter.toUpperCase(0)}</div>`
    ).join('')

    const keyText = document.querySelectorAll('.keyText')

    keyText.forEach(k => {
      k.addEventListener('click', () => {
        if (!k.classList.contains('clicked')) {
          this.chkLttr(k.dataset.letter, k)
        }
      })
    })


    l.innerHTML = this.state.letters.letters.map(l =>
      `<div class="letter">
        <div>${l.isSame ? l.letter.toUpperCase() : ''}</div>
        <div></div>
      </div>`).join('')


    worddefinitions(this.state)


    if (this.state.letters.length === this.state.letters.letters.length - 2) {
      this.state.letters.length = 0
      this.state.followingWrd = this.state.followingWrd + 1
      setTimeout(() => {
        this.ready()
      }, 800)
    }

    if (this.state.chances == 0) {

      header.innerHTML = `<h1>Game Over!</h1>`

      setLocalStorage(this.state.highScore, this.state.recordScore)


      this.state.letters.length = 0
      this.state.followingWrd = 0
      this.state.recordScore = 0
      this.state.chances = 10

      setTimeout(() => {
        this.ready()
      }, 2000)
    }

  }

}

const setLocalStorage = (hs, val) => {
  if (hs == null) {
    const time = new Date().getTime()
    const highScore = {
      recordScore: val,
      exp: time + 3600000
    }
    localStorage.setItem('highscore', JSON.stringify(highScore))
    return
  }
  if (hs) {
    if (val > hs.recordScore) {
      const time = new Date().getTime()
      const highScore = { recordScore: val, exp: time + 3600000 }
      localStorage.setItem('highscore', JSON.stringify(highScore))
    }
    return
  }
}




const worddefinitions = (state) => {
  if (state.chances >= 0) {

    const type = document.querySelector('.type')
    const chances = document.querySelector('.chances')
    const synonyms = document.querySelector('.synonyms')
    const recordScore = document.querySelector('.scores')
    const definition = document.querySelector('.definition')


    chances.textContent = state.chances
    recordScore.textContent = state.recordScore
    type.textContent = state.words[state.followingWrd].type
    definition.textContent = state.words[state.followingWrd].definition
    synonyms.textContent = state.words[state.followingWrd].synonyms.map(s => `${s},`).join(' ')

    if (state.highScore) {
      const now = new Date().getTime()

      if (state.highScore.exp > now) {
        const highscore = document.querySelector('.highscore')
        highscore.textContent = state.highScore.recordScore
      }
    }
  }
}

const randNum = (num) => {
  const n = []
  const n1 = Math.floor(Math.random() * num)

  n.push(n1)
  let n2 = (n1 - 2)
  n2 < 0 ? n2 = num - 2 : n2
  n.push(n2)

  return n.sort()

}



// to generate random text
const generateMixText = (letters, rand) => {

  // this deletes the array from any random number
  let z = letters.filter((l, i) => {
    return rand.indexOf(i) == -1
  })

  // this filter duplicate values in array
  let c = z.filter((l, i) => {
    return z.indexOf(l) === i
  })

  const l = new Words().words(ABCs)

  // will filter alphabets from being duplicated
  let d = l.filter(x => {
    return !letters.includes(x)
  })

  let n = 12 - c.length

  for (var x = 0; x < n; x++) {
    c.push(d[x])
  }

  // returns scrambled word
  return new Words().words(c)

}


class State {

  constructor(words, chances, recordScore, highScore, followingWrd, letters, rdm_ltrs) {
    this.words = words;
    this.chances = chances;
    this.letters = letters;
    this.rdm_ltrs = rdm_ltrs;
    this.highScore = highScore;
    this.recordScore = recordScore;
    this.followingWrd = followingWrd;

  }

  static generateWords() {
    return new Words().words(words)
  }



  static words() {
    const letters = {
      letters: [{
        letter: '',
        isSame: false
      }],
      length: 0,
      correctLength: 0
    }
    return letters
  }

  static ready() {
    return new State(this.generateWords(), 10, 0, {}, 0, this.words(), [])
  }

}


class Words {
  words(words) {
    words.sort(() => Math.random() - 0.5)
    return words
  }
}

// start Game
const starting = new Game(State.ready()).ready()

function houseRedirect() {
  stopMusic(houseMusic);
  drawHouse2();
  clearId('houseGame');
  sceneMusic.play();
  restartDialogue();
}

function checkIfIWon(){
  if(gameScore == 15){
    document.getElementById('houseGameScore').innerHTML += 'YOU WIN!!';
    gamesCompleted++;
    houseVisited = 1;
    winMusic.play();
    setTimeout(houseRedirect, 4000);
    
  }
}

var gameScore = 0;


console.log(recordScore)
