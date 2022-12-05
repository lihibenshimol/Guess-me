'use strict'

var gQuestsTree
var gCurrQuest
var gPrevQuest = null

const STORAGE_KEY = 'questDB'

function createQuestsTree() {
  gQuestsTree = loadFromStorage(STORAGE_KEY)
  if (!gQuestsTree) {
    gQuestsTree = createQuest('Male?')
    console.log('gQuestsTree = ', gQuestsTree)
    gQuestsTree.yes = createQuest('Gandhi')
    gQuestsTree.no = createQuest('Rita')
    _saveQuestToStorage()
  }
  gCurrQuest = gQuestsTree
  gPrevQuest = null
}

function createQuest(txt) {
  return {
    txt: txt,
    yes: null,
    no: null,
  }
}

function isChildless(node) {
  return node.yes === null && node.no === null
}

function moveToNextQuest(res) {
  // DONE: update the gPrevQuest, gCurrQuest global vars
  gPrevQuest = gCurrQuest
  gCurrQuest = gCurrQuest[res]
  console.log('gPrevQuest = ', gPrevQuest)
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
  // DONE: Create and Connect the 2 Quests to the quetsions tree
  
  const newQuest = createQuest(newQuestTxt)
  newQuest.yes = createQuest(newGuessTxt)
  newQuest.no = gCurrQuest

  gPrevQuest[lastRes] = newQuest
  _saveQuestToStorage()
}

function getCurrQuest() {
  console.log('gCurrQuest = ', gCurrQuest)
  return gCurrQuest
}


function _saveQuestToStorage() {
  saveToStorage(STORAGE_KEY, gQuestsTree)
}