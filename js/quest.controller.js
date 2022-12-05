'use strict'

// NOTE: This is a global used only in the controller
var gLastRes = null

$(document).ready(init)
$('.btn-start').click(onStartGuessing)
$('.btn-yes').click({ ans: 'yes' }, onUserResponse)
$('.btn-no').click({ ans: 'no' }, onUserResponse)
$('.btn-add-guess').click(onAddGuess)

function init() {
  console.log('Started...')
  createQuestsTree()
}

function onStartGuessing() {
  $('.game-start').hide()
  // DONE: hide the game-start section
  createQuestsTree()
  renderQuest()
  $('.quest').show()
  // DONE: show the quest section
}

function renderQuest() {
  // DONE: select the <h2> inside quest and update
  var $elQuest = $('.quest')
  $elQuest.find('h2').text(gCurrQuest.txt)
  // its text by the currQuest text
}

function onUserResponse(ev) {
  console.log('ev', ev)
  var res = ev.data.ans
  console.log('res = ', res)
  // If this node has no children
  if (isChildless(getCurrQuest())) {
    if (res === 'yes') {
      alert('Yes, I knew it!')
      onRestartGame()
      // TODO: improve UX
    } else {
      alert('I dont know...teach me!')
      $('.quest').hide()
      $('.new-quest').css("display", "block" )
      // TODO: hide and show new-quest section
    }
  } else {
    // TODO: update the lastRes global var
    gLastRes = res
    moveToNextQuest(res)
    renderQuest()
  }


}

function onAddGuess(ev) {
  ev.preventDefault()
  var newGuess = $('#newGuess').val()
  var newQuest = $('#newQuest').val()

  // TODO: Get the inputs' values
  // TODO: Call the service addGuess
  addGuess(newQuest, newGuess, gLastRes)

  onRestartGame()
}

function onRestartGame() {
  $('.new-quest').hide()
  $('.game-start').show()
  $('.quest').hide()
  $('img').css("opacity" , "1")
  gLastRes = null
}
