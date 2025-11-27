import './css/style.css';
import { initializePlayers, attack, randomizeShips, resetShips, addShip } from './module/controller.js';

const main = document.querySelector('main');

function initializeDialog() {
    const dialogBox = document.createElement('div');
    dialogBox.classList.add('dialog');
    main.replaceChildren(dialogBox);
    const dialogText = document.createElement('p');
    dialogText.textContent = 'Choose Game Mode!';
    const btn1 = document.createElement('button');
    btn1.textContent = 'Human vs. Human';
    const btn2 = document.createElement('button');
    btn2.textContent = 'Human vs. Computer';
    dialogBox.append(dialogText, btn1, btn2);
    btn1.addEventListener('click', () => {
        const [player1, player2] = initializePlayers('Human');
        main.removeChild(dialogBox);
        initializeBoards(player1, player2, 1);
    });
    btn2.addEventListener('click', () => {
        const [player1, player2] = initializePlayers('Computer');
        main.removeChild(dialogBox);
        initializeBoards(player1, player2, 0);
    });
}

function initializeBoards(player1, player2, num) {
    randomizeShips(player1);

    const topContainer = document.createElement('div');
    topContainer.classList.add('top-container');
    const bottomContainer = document.createElement('div');
    bottomContainer.classList.add('bottom-container');
    const playerInit = document.createElement('div');
    playerInit.classList.add('player-init');
    const h2 = document.createElement('h2');
    h2.textContent = `${player1.name}, ` + 'Place Your Ships';
    document.createElement('h2');
    topContainer.appendChild(h2);
    const boardDiv = document.createElement('div');
    boardDiv.classList.add('board-init');
    playerInit.appendChild(boardDiv);

    populateBoardDiv(player1, boardDiv);

    const dragDrop = document.createElement('div');
    dragDrop.classList.add('drag');
    const dragShips = document.createElement('div');
    dragShips.classList.add('drag-ships');
    const carrier = document.createElement('div');
    carrier.classList.add('carrier');
    const battleship = document.createElement('div');
    battleship.classList.add('battleship');
    const destroyer = document.createElement('div');
    destroyer.classList.add('destroyer');
    const submarine = document.createElement('div');
    submarine.classList.add('submarine');
    const patrolBoat = document.createElement('div');
    patrolBoat.classList.add('patrol-boat');
    dragShips.append(carrier, battleship, destroyer, submarine, patrolBoat);

    const horizontalBtn = document.createElement('button');
    horizontalBtn.textContent = 'Horizontal';
    const verticalBtn = document.createElement('button');
    verticalBtn.textContent = 'Vertical';

    const orientationDiv = document.createElement('div');
    orientationDiv.append(horizontalBtn, verticalBtn);

    dragDrop.append(orientationDiv, dragShips);

    const randomizeBtn = document.createElement('button');
    randomizeBtn.textContent = 'Randomize';
    randomizeBtn.addEventListener('click', () => {
        randomizeShips(player1);;
        boardDiv.replaceChildren();
        populateBoardDiv(player1, boardDiv);
        displayShips(player1);
    });

    const resetBtn = document.createElement('button');
    resetBtn.textContent = 'Reset';
    resetBtn.addEventListener('click', () => {
        resetShips(player1);
        boardDiv.replaceChildren();
        populateBoardDiv(player1, boardDiv);
        displayShips(player1);
    });

    const readyBtn = document.createElement('button');
    readyBtn.textContent = 'Ready';
    readyBtn.addEventListener('click', (e) => {
        if (player1.gameboard.shipInventory.length === 0) {
            e.preventDefault();
            alert('Please place your ships!');
        } else {
            if (num === 1) {
                const changeover = document.createElement('div');
                changeover.classList.add('changeover');
                const msg = document.createElement('button');
                msg.textContent = 'Player 2 Take Over!';
                changeover.appendChild(msg);
                main.replaceChildren(changeover);
                msg.addEventListener('click', () => initializeBoards(player2, player1, 2));
            } else {
                const boards = document.createElement('div');
                boards.classList.add('boards');
                main.replaceChildren(boards);
                if (num === 2) {
                    if (player1.id === 1) {
                        displayBoardDiv(player1);
                        displayBoardDiv(player2);
                        playRound(player1, player2);
                    }
                    else {
                        displayBoardDiv(player2);
                        displayBoardDiv(player1);
                        playRound(player2, player1);
                    }
                } else if (num === 0) {
                    randomizeShips(player2);;
                    displayBoardDiv(player1);
                    displayBoardDiv(player2);
                    playRoundComputer(player1, player2, 1);
                }
            }
        }
    });

    const dragBtn = document.createElement('button');
    dragBtn.textContent = 'Drag & Drop';
    dragBtn.addEventListener('click', () => {
        carrier.draggable = true;
        battleship.draggable = true;
        destroyer.draggable = true;
        submarine.draggable = true;
        patrolBoat.draggable = true;
        const boxes = document.querySelectorAll('.box');
        boxes.forEach(box => {
        console.log('boxes added');
        box.addEventListener('dragover', (e) => e.preventDefault());
        box.addEventListener('dragenter', (e) => {
            box.style.border = '3px solid green';
        });
        box.addEventListener('dragleave', (e) => {
            box.style.border = '1px dotted black';
        });
        box.addEventListener('drop', (e) => {
            const coordinates = box.id.split(',');
            console.log(coordinates);
            let status = addShip(player1, 'Carrier', 'Horizontal', Number(coordinates[1]), Number(coordinates[2]));
            console.log(status);
            if (status === true) displayShips(player1);
        });
    });
    });

    topContainer.append(randomizeBtn, resetBtn, readyBtn, dragBtn);
    bottomContainer.append(playerInit, dragDrop)
    main.replaceChildren(topContainer, bottomContainer);
    displayShips(player1);
}

function populateBoardDiv(player, boardDiv) {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const box = document.createElement('div');
            box.id = `${player.id},${[i, j]}`;
            box.classList.add('box');
            box.classList.add(`box${player.id}`);
            boardDiv.appendChild(box);
        }
    }
}

function displayBoardDiv(player) {
    const boardsDiv = document.querySelector('.boards');
    const playerDiv = document.createElement('div');
    playerDiv.classList.add(`player${player.id}`);
    const playerName = document.createElement('h2');
    playerName.textContent = `${player.name}`;
    playerDiv.appendChild(playerName);
    const boardDiv = document.createElement('div');
    boardDiv.classList.add(`board${player.id}`);
    playerDiv.appendChild(boardDiv);
    populateBoardDiv(player, boardDiv);
    boardsDiv.append(playerDiv);
    displayShips(player);
}

function displayShips(player) {
    const shipInventory = player.gameboard.shipInventory;
    let box;
    for (let i = 0; i < shipInventory.length; i++) {
        for (let j = 0; j < shipInventory[i].position.length; j++) {
            const index = shipInventory[i].position[j];
            box = document.getElementById(`${player.id},${index}`);
            box.classList.add(`ship${player.id}`);
        }
    }
}

function playRound(attacker, defender) {
    const changeover = document.createElement('div');
    changeover.classList.add('changeover');
    const msg = document.createElement('button');
    msg.textContent = `${attacker.name} Take Over!`;
    changeover.appendChild(msg);
    main.appendChild(changeover);
    let attackerShips = document.querySelectorAll(`.ship${attacker.id}`);
    attackerShips.forEach(ship => ship.classList.remove('invisible'));
    let attackerBoxes = document.querySelectorAll(`.box${attacker.id}`);
    attackerBoxes.forEach(box => box.classList.remove('hover-enabled'));
    let defenderShips = document.querySelectorAll(`.ship${defender.id}`);
    let defenderBoxes = document.querySelectorAll(`.box${defender.id}`);
    msg.addEventListener('click', () => {
        defenderShips.forEach(ship => ship.classList.add('invisible'));        
        defenderBoxes.forEach(box => {
            box.classList.add('hover-enabled');
            box.addEventListener('click', () => {
                const coordinates = box.id.split(',');
                const status = attack(defender, coordinates);
                if (status === 'hit' || status === 'sunk') {
                    box.classList.add('hit');
                    if (status === 'sunk') {
                        const sunk = document.createElement('div');
                        sunk.classList.add('sunk');
                        sunk.textContent = `${defender.name}'s ship sunk!`;
                        main.appendChild(sunk);
                        setTimeout(() => {
                            main.removeChild(sunk);
                        }, 1000);
                    }
                    if (defender.gameboard.checkSunk()) {
                        const gameOver = document.createElement('div');
                        gameOver.classList.add('.game-over');
                        gameOver.textContent = `Game Over! ${defender.name}'s Fleet Has Been Sunk!`;
                        const restart = document.createElement('button');
                        restart.textContent = 'New Game';
                        restart.addEventListener('click', () => {
                            initializeDialog();
                        });
                        main.replaceChildren(gameOver, restart);
                    }
                } else if (status === 'miss') {
                    box.classList.add('miss');
                    defenderBoxes.forEach(box => box.replaceWith(box.cloneNode(true)));
                    const handoff = document.createElement('button');
                    handoff.textContent = `Hand Off to ${defender.name}`;
                    main.appendChild(handoff);
                    handoff.addEventListener('click', () => {
                        main.removeChild(handoff);
                        playRound(defender, attacker);
                    });
                } else return false;
            });
        });
        main.removeChild(changeover);
    });
}

function playRoundComputer(player, computer, num) {
    let computerShips = document.querySelectorAll(`.ship${computer.id}`);
    computerShips.forEach(ship => ship.classList.add('invisible'));
    let computerBoxes = document.querySelectorAll(`.box${computer.id}`);
    if (num === 1) {
        computerBoxes.forEach(box => {
            box.classList.add('hover-enabled');
            box.addEventListener('click', () => {
                const coordinates = box.id.split(',');
                const status = attack(computer, coordinates);
                if (status === 'hit' || status === 'sunk') {
                    box.classList.add('hit');
                    if (computer.gameboard.checkSunk()) {
                        const gameOver = document.createElement('div');
                        gameOver.classList.add('.game-over');
                        gameOver.textContent = `Game Over! ${computer.name}'s Fleet Has Been Sunk!`;
                        const restart = document.createElement('button');
                        restart.textContent = 'New Game';
                        restart.addEventListener('click', () => {
                            initializeDialog();
                        });
                        main.replaceChildren(gameOver, restart);
                    }
                } else if (status === 'miss') {
                    box.classList.add(status);
                    setTimeout(playRoundComputer, 200, player, computer, 2);
                } else return false;
            });
        })
    } else if (num === 2) {
        const [x, y, status] = computer.attack(player);
        console.log([x, y], status);
        if (status === 'hit'|| status === 'sunk') {
            document.querySelector(`[id="${player.id},${[x, y]}"]`).classList.add('hit');
            if (player.gameboard.checkSunk()) {
                const gameOver = document.createElement('div');
                gameOver.classList.add('.game-over');
                gameOver.textContent = `Game Over! ${player.name}'s Fleet Has Been Sunk!`;
                const restart = document.createElement('button');
                restart.textContent = 'New Game';
                restart.addEventListener('click', () => {
                    initializeDialog();
                });
                main.replaceChildren(gameOver, restart);
            } else setTimeout(playRoundComputer, 200, player, computer, 2);
        } else if (status === 'miss') {
            document.querySelector(`[id="${player.id},${[x, y]}"]`).classList.add(status);
            setTimeout(playRoundComputer, 200, player, computer, 1);
        }
    }
}

initializeDialog();
