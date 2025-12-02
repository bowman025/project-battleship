import './css/style.css';
import humanImg from './img/human.svg';
import humanImg2 from './img/human-2.svg';
import robotImg from './img/robot.svg';
import fightImg from './img/fight.svg';
import horizontalImg from './img/pan-horizontal.svg';
import verticalImg from './img/pan-vertical.svg';
import { initializePlayers, attack, randomizeShips, resetShips, addShip } from './module/controller.js';
import { ComputerPlayer } from './module/player.js';

const main = document.querySelector('main');

function initializeDialog() {
    if (main.classList.contains('game-over')) main.classList.remove('game-over');
    const dialogBox = document.createElement('div');
    dialogBox.classList.add('dialog');
    main.replaceChildren(dialogBox);
    const btn1 = document.createElement('button');
    const human1 = document.createElement('img');
    human1.src = humanImg;
    const versus = document.createElement('img');
    versus.src = fightImg;
    const human2 = document.createElement('img');
    human2.src = humanImg2;
    btn1.append(human1, versus, human2);
    const btn2 = document.createElement('button');
    const human3 = document.createElement('img');
    human3.src = humanImg;
    const versus2 = document.createElement('img');
    versus2.src = fightImg;
    const robot = document.createElement('img');
    robot.src = robotImg;
    btn2.append(human3, versus2, robot);
    dialogBox.append(btn1, btn2);
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

    const mainContainer = document.createElement('div');
    mainContainer.classList.add('main-container');
    const topContainer = document.createElement('div');
    topContainer.classList.add('top-container');
    const topBtns = document.createElement('div');
    topBtns.classList.add('top-btns');
    const bottomContainer = document.createElement('div');
    bottomContainer.classList.add('bottom-container');
    const h2 = document.createElement('h2');
    const playerIcon = document.createElement('img');
    if (num === 1 || num === 0) playerIcon.src = humanImg;
    else if (num === 2) playerIcon.src = humanImg2;
    playerIcon.classList.add('player-icon');
    h2.textContent = 'Place Your Ships';
    h2.prepend(playerIcon);
    topContainer.appendChild(h2);
    const boardDiv = document.createElement('div');
    boardDiv.classList.add('board-init');

    populateBoardDiv(player1, boardDiv);

    const dragDrop = document.createElement('div');
    dragDrop.classList.add('drag');
    const dragShips = document.createElement('div');
    dragShips.classList.add('drag-ships');
    const carrier = document.createElement('div');
    carrier.classList.add('drag-ship', 'carrier', 'horizontal');
    const battleship = document.createElement('div');
    battleship.classList.add('drag-ship', 'battleship', 'horizontal');
    const destroyer = document.createElement('div');
    destroyer.classList.add('drag-ship', 'destroyer', 'horizontal');
    const submarine = document.createElement('div');
    submarine.classList.add('drag-ship', 'submarine', 'horizontal');
    const patrolBoat = document.createElement('div');
    patrolBoat.classList.add('drag-ship', 'patrol-boat', 'horizontal');
    dragShips.append(carrier, battleship, destroyer, submarine, patrolBoat);

    const horizontalBtn = document.createElement('button');
    const horizontalImage = document.createElement('img');
    horizontalImage.src = horizontalImg;
    horizontalBtn.appendChild(horizontalImage);
    horizontalBtn.addEventListener('click', () => {
        const ships = document.querySelectorAll('.drag-ship');
        ships.forEach(ship => {
            ship.classList.add('horizontal');
            dragShips.style.flexDirection = 'column';
            if (ship.classList.contains('vertical')) ship.classList.remove('vertical');
        });
    });
    const verticalBtn = document.createElement('button');
    const verticalImage = document.createElement('img');
    verticalImage.src = verticalImg;
    verticalBtn.appendChild(verticalImage);
    verticalBtn.addEventListener('click', () => {
        const ships = document.querySelectorAll('.drag-ship');
        ships.forEach(ship => {
            ship.classList.add('vertical');
            dragShips.style.flexDirection = 'row';
            if (ship.classList.contains('horizontal')) ship.classList.remove('horizontal');
        });
    });
    const orientationDiv = document.createElement('div');
    orientationDiv.classList.add('orientation-btns');
    orientationDiv.append(horizontalBtn, verticalBtn);
    dragDrop.append(orientationDiv, dragShips);

    const randomizeBtn = document.createElement('button');
    randomizeBtn.textContent = 'Randomize';
    randomizeBtn.addEventListener('click', () => {
        randomizeShips(player1);;
        boardDiv.replaceChildren();
        populateBoardDiv(player1, boardDiv);
        displayShips(player1);
        const allShips = [carrier, battleship, destroyer, submarine, patrolBoat];
        allShips.forEach(ship => {
            if (ship.classList.contains('vertical')) {
                ship.classList.remove('vertical');
                ship.classList.add('horizontal');
            }
        });
        dragShips.style.flexDirection = 'column';
        dragShips.replaceChildren(...allShips);
        dragBtn.classList.remove('unclickable');
    });

    const resetBtn = document.createElement('button');
    resetBtn.textContent = 'Reset';
    resetBtn.addEventListener('click', () => {
        resetShips(player1);
        boardDiv.replaceChildren();
        populateBoardDiv(player1, boardDiv);
        displayShips(player1);
        const allShips = [carrier, battleship, destroyer, submarine, patrolBoat];
        allShips.forEach(ship => {
            if (ship.classList.contains('vertical')) {
                ship.classList.remove('vertical');
                ship.classList.add('horizontal');
            }
        });
        dragShips.style.flexDirection = 'column';
        dragShips.replaceChildren(...allShips);
        dragBtn.classList.remove('unclickable');
    });

    const dragBtn = document.createElement('button');
    dragBtn.classList.add('drag-btn');
    dragBtn.textContent = 'Drag & Drop';
    dragBtn.addEventListener('click', () => {
        dragDrop.setAttribute('active', 'on');
        resetShips(player1);
        boardDiv.replaceChildren();
        populateBoardDiv(player1, boardDiv);
        displayShips(player1);
        const allShips = [carrier, battleship, destroyer, submarine, patrolBoat];
        allShips.forEach(ship => {
            ship.draggable = true;
            if (ship.classList.contains('vertical')) {
                ship.classList.remove('vertical');
                ship.classList.add('horizontal');
            }
        });
        dragShips.style.flexDirection = 'column';
        dragShips.replaceChildren(...allShips);
        carrier.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('type', 'carrier');
        });
        battleship.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('type', 'battleship');
        });
        destroyer.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('type', 'destroyer');
        });
        submarine.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('type', 'submarine');
        });
        patrolBoat.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('type', 'patrol-boat');
        });
        const boxes = document.querySelectorAll('.box');
        boxes.forEach(box => {
            box.addEventListener('dragover', (e) => e.preventDefault());
            box.addEventListener('dragenter', (e) => {
                box.style.border = '3px solid rgb(18, 30, 59)';
            });
            box.addEventListener('dragleave', (e) => {
                box.style.border = '1px dotted black';
            });
            box.addEventListener('drop', (e) => {
                box.style.border = '1px dotted black';
                const coord = box.id.split(',');
                const type = e.dataTransfer.getData('type');
                const ship = document.querySelector(`.${type}`);
                let orientation;
                if (ship.classList.contains('horizontal')) orientation = 'horizontal';
                else if (ship.classList.contains('vertical')) orientation = 'vertical';
                let status = addShip(player1, type, orientation, coord[1], coord[2]);
                if (status === true) {
                    displayShips(player1);
                    ship.remove();
                }
            });
        });
        dragBtn.classList.add('unclickable');
    });

    const readyBtn = document.createElement('button');
    readyBtn.classList.add('ready-btn');
    readyBtn.textContent = 'Ready';
    readyBtn.addEventListener('click', (e) => {
        if (player1.gameboard.shipInventory.length !== 5) {
            e.preventDefault();
            alert('Please place your ships!');
        } else {
            if (num === 1) {
                const changeover = document.createElement('div');
                changeover.classList.add('changeover');
                const msg = document.createElement('button');
                const p2Img = document.createElement('img');
                p2Img.src = humanImg2;
                msg.textContent = 'Take Over!';
                msg.prepend(p2Img);
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

    topBtns.append(randomizeBtn, resetBtn, dragBtn);
    topContainer.append(topBtns);
    bottomContainer.append(boardDiv, dragDrop)
    mainContainer.append(topContainer, bottomContainer, readyBtn);
    main.replaceChildren(mainContainer);
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
    const playerIcon = document.createElement('img');
    playerIcon.classList.add('player-icon');
    if (player.name === 'Player 1') playerIcon.src = humanImg;
    else if (player instanceof ComputerPlayer) playerIcon.src = robotImg;
    else playerIcon.src = humanImg2;
    playerDiv.appendChild(playerIcon);
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
    const msgImg = document.createElement('img');
    if (attacker.id === 1) msgImg.src = humanImg;
    else msgImg.src = humanImg2;
    msg.textContent = 'Take Over!';
    msg.prepend(msgImg);
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
                        const sunkMsg = document.createElement('div');
                        sunkMsg.classList.add('sunk-msg');
                        const opponentImg = document.createElement('img');
                        if (defender.id === 1) opponentImg.src = humanImg;
                        else if (defender.id === 2 && defender instanceof ComputerPlayer) opponentImg.src = robotImg;
                        else opponentImg.src = humanImg2;
                        sunkMsg.textContent = '\'s ship sunk!';
                        sunkMsg.prepend(opponentImg);
                        main.appendChild(sunkMsg);
                        setTimeout(() => {
                            main.removeChild(sunkMsg);
                        }, 1200);
                    }
                    if (defender.gameboard.checkSunk()) setTimeout(() => {
                        const ggDiv = document.createElement('div');
                        ggDiv.classList.add('gg');
                        const gameOverMsg = document.createElement('div');
                        gameOverMsg.textContent = 'GAME OVER!';
                        const gameOverText = document.createElement('div');
                        gameOverText.textContent = '\'s Fleet Has Been Sunk!';
                        const gameOverImg = document.createElement('img');
                        if (defender.id === 1) gameOverImg.src = humanImg;
                        else gameOverImg.src = humanImg2;
                        gameOverText.prepend(gameOverImg);
                        ggDiv.append(gameOverMsg, gameOverText);
                        const restart = document.createElement('button');
                        restart.classList.add('new-game-btn');
                        restart.textContent = 'New Game';
                        restart.addEventListener('click', () => {
                            initializeDialog();
                        });
                        main.replaceChildren(ggDiv, restart);
                        main.classList.add('game-over');
                    }, 2000);
                } else if (status === 'miss') {
                    box.classList.add('miss');
                    defenderBoxes.forEach(box => box.replaceWith(box.cloneNode(true)));
                    const handoff = document.createElement('button');
                    handoff.classList.add('handoff-btn');
                    const handoffImg = document.createElement('img');
                    if (defender.id === 1) handoffImg.src = humanImg;
                    else handoffImg.src = humanImg2;
                    const handoffText = document.createElement('div');
                    handoffText.textContent = 'Hand Off to';
                    handoff.append(handoffText, handoffImg);
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
                    if (status === 'sunk') {
                        const sunkMsg = document.createElement('div');
                        sunkMsg.classList.add('sunk-msg');
                        const opponentImg = document.createElement('img');
                        opponentImg.src = robotImg;
                        sunkMsg.textContent = '\'s ship sunk!';
                        sunkMsg.prepend(opponentImg);
                        main.appendChild(sunkMsg);
                        setTimeout(() => {
                            main.removeChild(sunkMsg);
                        }, 1200);
                    }
                    if (computer.gameboard.checkSunk()) {
                        setTimeout(() => {
                            const ggDiv = document.createElement('div');
                            ggDiv.classList.add('gg');
                            const gameOverMsg = document.createElement('div');
                            gameOverMsg.textContent = 'GAME OVER!';
                            const gameOverText = document.createElement('div');
                            gameOverText.textContent = '\'s Fleet Has Been Sunk!';
                            const gameOverImg = document.createElement('img');
                            gameOverImg.src = robotImg;
                            gameOverText.prepend(gameOverImg);
                            ggDiv.append(gameOverMsg, gameOverText);
                            const restart = document.createElement('button');
                            restart.classList.add('new-game-btn');
                            restart.textContent = 'New Game';
                            restart.addEventListener('click', () => initializeDialog());
                            main.replaceChildren(ggDiv, restart);
                            main.classList.add('game-over');
                        }, 2000);
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
            if (status === 'sunk') {
                const sunkMsg = document.createElement('div');
                sunkMsg.classList.add('sunk-msg');
                const opponentImg = document.createElement('img');
                opponentImg.src = humanImg;
                sunkMsg.textContent = '\'s ship sunk!';
                sunkMsg.prepend(opponentImg);
                main.appendChild(sunkMsg);
                setTimeout(() => {
                    main.removeChild(sunkMsg);
                }, 1200);
            }
            if (player.gameboard.checkSunk()) {
                setTimeout(() => {
                    const ggDiv = document.createElement('div');
                    ggDiv.classList.add('gg');
                    const gameOverMsg = document.createElement('div');
                    gameOverMsg.textContent = 'GAME OVER!';
                    const gameOverText = document.createElement('div');
                    gameOverText.textContent = '\'s Fleet Has Been Sunk!';
                    const gameOverImg = document.createElement('img');
                    gameOverImg.src = humanImg;
                    gameOverText.prepend(gameOverImg);
                    ggDiv.append(gameOverMsg, gameOverText);
                    const restart = document.createElement('button');
                    restart.classList.add('new-game-btn');
                    restart.textContent = 'New Game';
                    restart.addEventListener('click', () => initializeDialog());
                    main.replaceChildren(ggDiv, restart);
                    main.classList.add('game-over');
                }, 2000); 
            } else setTimeout(playRoundComputer, 200, player, computer, 2);
        } else if (status === 'miss') {
            document.querySelector(`[id="${player.id},${[x, y]}"]`).classList.add(status);
            setTimeout(playRoundComputer, 200, player, computer, 1);
        }
    }
}

initializeDialog();
