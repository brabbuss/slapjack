https://github.com/brabbuss/slapjack/tree/main/slapjack
---
# SlapJack - A multisensory slapsperience
###### Play a silly game of SlapJack locally with another person!
---
## Table of Contents
* [Introduction](#introduction)
* [Features](#features)
* [Contributors](#contributors)

## Introduction
The SlapJack web app is based on project criteria laid out for Turing Front End students in week 4/5 of their time in Turing, as laid out [here](https://frontend.turing.io/projects/module-1/slapjack.html). The project seeks to challenge the totality of learning of students at this point, pulling together their knowledge of HTML, CSS, and JS (as well as working in the terminal and GitHub) to construct a fully functional web app game from scratch (except for card assets. The project emphasises the difference and proper interactions between the DOM and the Data Model, thusly pushing students to think carefully and critically about their logic to maintain DRY and SRP principles.

The site presents the user with a game of 'SlapJack' that can be played locally by two people using the same keyboard. Winning combinations and controls are presented upon page load to properly orient the users. 

Lastly, be sure to click this here when you see it:
<details>
  <summary>**Under the Hood**</summary>
There's more info under here about the functionality being described!
</details>

## Features
---
* [Game Mechanics](#game-mechanics)
* [Responsive Design](#responsive-design)
* [Local Storage](#local-storage)
* [The Game Referee](#the-game-referee)
* [Fisher-Yates Shuffle Method](#fisher-yates-shuffle-method)
* [UX, Animations and Extensions](#ux-animations-and-extensions)
* [Resources](#resources)
---

#### Game Mechanics
The game is a simple game of traditional slapjack. Players alternate turns playing cards face-up into a central pile until a card that can be 'slapped' appears. A jack or wild can be slapped, winning the hand. When a hand is won, all the cards of the central pile go to the winning players hand, and then their total cards are shuffled. The goal is to collect all the cards to win the round. Other winning slaps include two cards in a row with the same value (includeing king, queen, ace) or two cards with the same value - one on top, one at the third spot below it (a 'sandwich'). When a player is out of cards, they may slap back in on a valid hand, but can no longer deal until they gain a card.

<details>
  <summary>**Under the Hood**</summary>
A host of logic discussed further below powers this web app. Players interact with the game via keypresses - these key presses are attached to an event listener which in turn will create a keyboard event object. This object is passed to the nexessary functions to derive the information we need to help play proceed. Upon keypress, a cascade of functions is called and checked against various flags within the Player and Game classes.
</details>

#### Responsive Design
There was great attention paid to building out the architecture of the HTML and CSS to build out as responsive as a site as possible. CSS follows the spirit of BEM naming conventions, though given the minimal nature of HTML elements, there wasn't a great need for strict naming protocol. 

![Animated gif of responsive design](https://media.giphy.com/media/OWdn6RoN7IGsO56KKq/giphy.gif)

#### Local Storage
Players may quit and close the browser and the game will remember their win count when players return. Below once the game is started, one sees that the win count is updated (seen below the player decks)

![Local Storage in action](https://media.giphy.com/media/7R92FBF3w9yg2iqO53/giphy.gif)

<details>
  <summary>**Under the Hood**</summary>
The Game class contains a property that is an array that will contain players' current win count. That array is updated via a Player method which is called once a round has been won. At that same moment, a Game method is called to push that array to local storage with the aid of JSON stringify. To retrieve game data, a game method is called upon clicking 'start' when visiting the page after a refresh. If that method detects stored game data, the array containing the win count will be updated and the visual elements will then be updated. If there is no data detected, the win count array will be set to zero (technically undefined - an empty array). 
</details>

#### "The Game Referee"
As the game expanded, it became more and more difficult to consult numerous Game and Player properties to deduce what the current state that the game is in (is the player supposed to be losing a card? How do they know it's not their turn? Etc.). It was important for me to be able to look to one flag to be able to tell me what was going, and to also use that flag to update visual elements for better UX (i.e. a bad slap will let the player know they've lost a card, who's turn it is, etc.). I devised something that, in the moment, I named the "Game Referee". 

Below you will see screenshots; at any given change in gameplay, the property "game.referee = player: xxxx" - the Game property .referee is set to evaluate to an object (the given player and what they've done). "Player" is either p1 or p2, and "xxx" is what's occurred (P1: "valid-slap", P2: "not-your-turn", etc.). Having a single source for much of the messaging I needed in game was a huge help in cutting out the effort needed to funnel a piece of logic to where it needed to go through the twists and turns of if statements within if statements.

![game.referee in real-time](https://media.giphy.com/media/2AmMadJjq162RaiCWV/giphy.gif)
![game.referee helping to update visual elements](https://user-images.githubusercontent.com/66697338/93956021-6723f280-fd0e-11ea-8352-73b9d11c7e2f.png)
![game.referee helping to call out what type of event occurred](https://user-images.githubusercontent.com/66697338/93956025-69864c80-fd0e-11ea-8a02-2f20cb24231d.png)

#### Fisher-Yates Shuffle Method
It seems important to call out the shuffle method used. The method being drawn on was first developed by Ronald Fisher and Frank Yates. More can be read [here](https://bost.ocks.org/mike/shuffle/) along with some really cool visualizations. Broken down into steps as originally conceived (on pen and paper), the method goes as follows:

- Write down the numbers from 1 through N.
- Pick a random number k between one and the number of unstruck numbers remaining (inclusive).
- Counting from the low end, strike out the kth number not yet struck out, and write it down at the end of a separate list.
- Repeat from step 2 until all the numbers have been struck out.
- The sequence of numbers written down in step 3 is now a random permutation of the original numbers.

Ultimately that looked like the following for SlapJack (this method is called when a player wins a hand to shuffle their new deck, as well as beginning of gameplay to shuffle and divide the deck):

![Fisher-Yates Shuffle in SlapJack](https://user-images.githubusercontent.com/66697338/93957268-28436c00-fd11-11ea-8483-81f4cc2d5ab4.png)

#### UX, Animations and Extensions

Adding animations with intention was a task happily tackled. The opening instructions with 'start' button sets the tone for the game. CSS :hover was used on the tutorial div to animate it with a keyframe, to make it 'shake' with anticipation of the upcoming game. More keyframes were used to animate a slow pulse to indicate player turns, danger indicator for low cards, and as well as the pulse on the helper header text for any given player action. 

The aim of animations were to aid in UX rather than detract from it with superflous, unhelpful flash. Animations are small calls to action to both help direct game flow and enjoyment, but also helps to enhance enjoyment with relevant and often amusing feedback.

Additionally, sounds were added. Perhaps some of the most enjoyment was had setting up a function to randomly choose from an array of sounds on certain player actions (successful slap, invalid slap or deal). TURN ON YOUR SOUND!

#### Resources

Sound files:
- https://freesound.org/people/javapimp/sounds/439128/
- https://freesound.org/people/WIM/sounds/9020/
- https://freesound.org/people/JonasTisell/sounds/442257/
- https://freesound.org/people/WIM/sounds/9020/
- https://freesound.org/people/travississimo/sounds/457341/

Fisher-Yates Shuffle Method:
- https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
- https://bost.ocks.org/mike/shuffle/

CSS tricks:
- Header text cutout: https://css-tricks.com/lets-look-50-interesting-css-properties-values/
- Rapid animation restart (for when player hits deal or slap quickly in succession): https://css-tricks.com/restart-css-animation/
- Cropping an SVG with a div container to get cards to size correctly without skewing card image: https://www.educative.io/edpresso/how-to-crop-an-image-in-css



## Contributors
<img src="https://avatars1.githubusercontent.com/u/66697338?s=460&u=3d2e338fdeb625c1940a87b1cfdb7ba6e7d16c5c&v=4" alt="Coding Magician"
 width="150" height="auto" style="float: left" />\
**Scott Brabson**

[GitHub Profile](https://github.com/brabbuss)

FE Engineering student at Turing School entering Mod 2 (of 5) who has found no end to the joy that is creating as you speak the language of JS.
